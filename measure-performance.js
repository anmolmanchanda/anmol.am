const puppeteer = require('puppeteer');

async function measureWebsitePerformance(url) {
  console.log(`\n🔍 Analyzing ${url}...\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Track all network requests
  const resources = [];
  let totalSize = 0;

  page.on('response', async (response) => {
    try {
      const url = response.url();
      const status = response.status();
      const headers = response.headers();
      const contentLength = headers['content-length'];

      // Try to get actual size
      let size = 0;
      try {
        const buffer = await response.buffer();
        size = buffer.length;
      } catch (e) {
        // If buffer fails, use content-length
        size = contentLength ? parseInt(contentLength) : 0;
      }

      totalSize += size;

      resources.push({
        url: url,
        status: status,
        type: response.request().resourceType(),
        size: size
      });
    } catch (e) {
      // Some responses might fail to get buffer (like redirects)
    }
  });

  // Measure navigation time
  const startTime = Date.now();

  await page.goto(url, {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  const loadTime = Date.now() - startTime;

  // Get performance metrics from the browser
  const performanceMetrics = await page.evaluate(() => {
    const timing = performance.timing;
    const navigation = performance.getEntriesByType('navigation')[0];

    return {
      // Basic timings
      domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
      loadComplete: timing.loadEventEnd - timing.navigationStart,

      // Detailed metrics from Navigation Timing API
      dns: timing.domainLookupEnd - timing.domainLookupStart,
      tcp: timing.connectEnd - timing.connectStart,
      request: timing.responseStart - timing.requestStart,
      response: timing.responseEnd - timing.responseStart,
      domProcessing: timing.domComplete - timing.domLoading,

      // Modern metrics if available
      firstPaint: navigation && navigation.domContentLoadedEventEnd || 0,
      transferSize: navigation && navigation.transferSize || 0,
      encodedSize: navigation && navigation.encodedBodySize || 0,
      decodedSize: navigation && navigation.decodedBodySize || 0
    };
  });

  await browser.close();

  // Analyze resources by type
  const resourcesByType = resources.reduce((acc, resource) => {
    const type = resource.type;
    if (!acc[type]) {
      acc[type] = { count: 0, size: 0 };
    }
    acc[type].count++;
    acc[type].size += resource.size;
    return acc;
  }, {});

  // Print results
  console.log('═══════════════════════════════════════════════════════');
  console.log('                  LOAD TIME METRICS                    ');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`Total Load Time:        ${loadTime} ms (${(loadTime/1000).toFixed(2)}s)`);
  console.log(`DOM Content Loaded:     ${performanceMetrics.domContentLoaded} ms`);
  console.log(`Load Complete:          ${performanceMetrics.loadComplete} ms`);
  console.log('');
  console.log('Breakdown:');
  console.log(`  DNS Lookup:           ${performanceMetrics.dns} ms`);
  console.log(`  TCP Connection:       ${performanceMetrics.tcp} ms`);
  console.log(`  Request Time:         ${performanceMetrics.request} ms`);
  console.log(`  Response Time:        ${performanceMetrics.response} ms`);
  console.log(`  DOM Processing:       ${performanceMetrics.domProcessing} ms`);
  console.log('');

  console.log('═══════════════════════════════════════════════════════');
  console.log('                 TRANSFER SIZE METRICS                 ');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`Total Transfer Size:    ${(totalSize / 1024).toFixed(2)} KB (${totalSize.toLocaleString()} bytes)`);
  console.log(`Total Transfer Size:    ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log('');
  console.log(`Total Resources:        ${resources.length} files`);
  console.log('');

  console.log('By Resource Type:');
  const sortedTypes = Object.entries(resourcesByType).sort((a, b) => b[1].size - a[1].size);
  for (const [type, data] of sortedTypes) {
    const sizeKB = (data.size / 1024).toFixed(2);
    const percentage = ((data.size / totalSize) * 100).toFixed(1);
    console.log(`  ${type.padEnd(15)} ${data.count.toString().padStart(3)} files  ${sizeKB.padStart(10)} KB  (${percentage}%)`);
  }

  console.log('');
  console.log('═══════════════════════════════════════════════════════');
  console.log('                    TOP 10 LARGEST FILES               ');
  console.log('═══════════════════════════════════════════════════════');

  const sortedResources = resources
    .filter(r => r.size > 0)
    .sort((a, b) => b.size - a.size)
    .slice(0, 10);

  sortedResources.forEach((resource, index) => {
    const sizeKB = (resource.size / 1024).toFixed(2);
    const filename = resource.url.split('/').pop().slice(0, 50);
    console.log(`${(index + 1).toString().padStart(2)}. ${sizeKB.padStart(8)} KB  [${resource.type}] ${filename}`);
  });

  console.log('');
  console.log('═══════════════════════════════════════════════════════\n');

  return {
    loadTime,
    totalSize,
    resourceCount: resources.length,
    performanceMetrics,
    resourcesByType
  };
}

// Run the measurement
const url = process.argv[2] || 'https://anmol.am';
measureWebsitePerformance(url)
  .then(() => {
    console.log('✅ Analysis complete!');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
