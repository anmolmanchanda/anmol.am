# API Documentation

## Overview

This document provides comprehensive documentation for all API endpoints available in the anmol.am portfolio application.

## Base URL

- **Production**: `https://anmol.am/api`
- **Development**: `http://localhost:3000/api`

## Authentication

Currently, all public-facing APIs are unauthenticated. Internal APIs use environment variables for service authentication.

---

## Endpoints

### 1. Analytics API

#### Get Analytics Data
```http
GET /api/analytics
```

**Response:**
```json
{
  "totalVisits": 12345,
  "uniqueVisitors": 8901,
  "monthlyVisits": 3456,
  "weeklyVisits": 892,
  "todayVisits": 123,
  "onlineNow": 12,
  "avgSessionDuration": "3m 45s",
  "bounceRate": 32.5,
  "topPages": [
    { "path": "/", "visits": 4567 },
    { "path": "/projects", "visits": 2345 },
    { "path": "/blog", "visits": 1890 }
  ]
}
```

---

### 2. View Tracking API

#### Track Single View
```http
POST /api/views/track
Content-Type: application/json

{
  "slug": "blog-post-slug",
  "referrer": "https://google.com" // optional
}
```

**Response:**
```json
{
  "success": true,
  "views": 124
}
```

#### Get View Count
```http
GET /api/views/[slug]
```

**Response:**
```json
{
  "slug": "blog-post-slug",
  "views": 123,
  "lastViewed": "2025-08-18T12:00:00Z"
}
```

#### Batch View Count
```http
POST /api/views/batch
Content-Type: application/json

{
  "slugs": ["slug1", "slug2", "slug3"]
}
```

**Response:**
```json
{
  "slug1": 123,
  "slug2": 456,
  "slug3": 789
}
```

---

### 3. Contact Form API

#### Submit Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'm interested in discussing a potential project...",
  "company": "Tech Corp" // optional
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "id": "msg_2a3b4c5d"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid email format"
}
```

**Validation Rules:**
- Name: Required, 2-100 characters
- Email: Required, valid email format
- Subject: Required, 5-200 characters
- Message: Required, 10-5000 characters
- Company: Optional, max 100 characters

---

### 4. RSS Feed

#### Get RSS Feed
```http
GET /api/rss
```

**Response:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Anmol Manchanda - Blog</title>
    <description>Technical articles and insights</description>
    <link>https://anmol.am/blog</link>
    <lastBuildDate>Sun, 18 Aug 2025 12:00:00 GMT</lastBuildDate>
    <item>
      <title>Article Title</title>
      <description>Article excerpt...</description>
      <link>https://anmol.am/blog/article-slug</link>
      <pubDate>Sun, 18 Aug 2025 10:00:00 GMT</pubDate>
      <guid>https://anmol.am/blog/article-slug</guid>
    </item>
  </channel>
</rss>
```

---

### 5. External API Integrations

#### Duolingo Stats
```http
GET /api/duolingo?username=manchandaanmol
```

**Response:**
```json
{
  "success": true,
  "data": {
    "streak": 1,
    "totalXP": 3870,
    "languages": [
      {
        "name": "French",
        "xp": 1182,
        "level": "A2",
        "crowns": 45
      }
    ],
    "lastActivity": "2025-08-18T10:30:00Z"
  }
}
```

#### Letterboxd Films
```http
GET /api/letterboxd?username=anmolmanchanda
```

**Response:**
```json
{
  "success": true,
  "data": {
    "filmsThisYear": 8,
    "totalFilms": 156,
    "avgRating": 4.3,
    "watchlist": 23,
    "recentFilms": [
      {
        "title": "Spirited Away",
        "rating": 5,
        "date": "2021-10-15",
        "link": "https://letterboxd.com/anmolmanchanda/film/spirited-away/"
      }
    ],
    "favoriteFilms": []
  }
}
```

#### GitHub Activity
```http
GET /api/github-activity?username=anmolmanchanda
```

**Response:**
```json
{
  "success": true,
  "data": {
    "publicRepos": 50,
    "followers": 234,
    "totalStars": 456,
    "totalForks": 89,
    "estimatedLOC": 1200000,
    "contributions": 1234,
    "recentActivity": [
      {
        "type": "PushEvent",
        "repo": "anmolmanchanda/anmol.am",
        "date": "2025-08-18T11:00:00Z",
        "commits": 3
      }
    ]
  }
}
```

#### Test Duolingo (Development Only)
```http
GET /api/test-duolingo
```

**Response:**
```json
{
  "success": true,
  "data": {
    "streak": 1,
    "totalXP": 3870,
    "languages": [
      {
        "name": "French",
        "xp": 1182
      }
    ]
  }
}
```

---

### 6. Newsletter API

#### Subscribe to Newsletter
```http
POST /api/newsletter/subscribe
Content-Type: application/json

{
  "email": "subscriber@example.com",
  "name": "Jane Doe" // optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "id": "sub_abc123"
}
```

#### Unsubscribe from Newsletter
```http
POST /api/newsletter/unsubscribe
Content-Type: application/json

{
  "email": "subscriber@example.com",
  "token": "unsub_token_xyz" // from email link
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully unsubscribed"
}
```

---

### 7. Search API

#### Global Search
```http
GET /api/search?q=typescript&type=all&limit=10
```

**Parameters:**
- `q`: Search query (required)
- `type`: Filter by type (`all`, `blog`, `project`, `page`)
- `limit`: Maximum results (default: 10, max: 50)

**Response:**
```json
{
  "results": [
    {
      "type": "blog",
      "title": "TypeScript Best Practices",
      "description": "Learn advanced TypeScript patterns...",
      "url": "/blog/typescript-best-practices",
      "score": 0.95
    },
    {
      "type": "project",
      "title": "TypeScript Library",
      "description": "Open source TypeScript utilities...",
      "url": "/projects/ts-utils",
      "score": 0.87
    }
  ],
  "total": 15,
  "query": "typescript"
}
```

---

### 8. Sitemap

#### Get XML Sitemap
```http
GET /sitemap.xml
```

**Response:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://anmol.am/</loc>
    <lastmod>2025-08-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://anmol.am/projects</loc>
    <lastmod>2025-08-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

---

## Error Handling

All API endpoints follow a consistent error response format:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {} // optional additional information
}
```

### Common Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `INVALID_REQUEST` | Malformed request data | 400 |
| `MISSING_PARAMS` | Required parameters missing | 400 |
| `NOT_FOUND` | Resource not found | 404 |
| `RATE_LIMITED` | Too many requests | 429 |
| `INTERNAL_ERROR` | Server error | 500 |
| `SERVICE_UNAVAILABLE` | External service down | 503 |

---

## Rate Limiting

Public APIs are rate limited to prevent abuse:

- **Default**: 100 requests per minute per IP
- **Contact Form**: 5 submissions per hour per IP
- **Newsletter**: 3 subscribe attempts per hour per email

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1692360000
```

---

## CORS Configuration

The API supports CORS for the following origins:
- `https://anmol.am`
- `http://localhost:3000` (development)
- `http://localhost:3001` (development)
- `http://localhost:3002` (development)

Custom headers allowed:
- `Content-Type`
- `Authorization`
- `X-Requested-With`

---

## Webhooks

Webhook support for real-time updates (coming soon):

```json
{
  "event": "contact.submitted",
  "timestamp": "2025-08-18T12:00:00Z",
  "data": {
    "id": "msg_123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## SDK Support

### JavaScript/TypeScript
```typescript
import { AnmolAPI } from '@anmol/api-client';

const api = new AnmolAPI({
  baseURL: 'https://anmol.am/api'
});

// Track view
await api.views.track('blog-post-slug');

// Get analytics
const analytics = await api.analytics.get();

// Submit contact
await api.contact.submit({
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Hello',
  message: 'Great portfolio!'
});
```

### Python
```python
from anmol_api import Client

client = Client(base_url="https://anmol.am/api")

# Track view
client.views.track("blog-post-slug")

# Get analytics
analytics = client.analytics.get()

# Submit contact
client.contact.submit(
    name="John Doe",
    email="john@example.com",
    subject="Hello",
    message="Great portfolio!"
)
```

---

## Changelog

### v2.1.0 (2025-08-18)
- Added Duolingo integration endpoint
- Added Letterboxd RSS parsing
- Added test endpoints for development
- Improved error handling

### v2.0.0 (2025-08-17)
- Initial API release
- Analytics, views, contact, RSS endpoints
- Rate limiting implementation
- CORS configuration

---

## Support

For API support or questions:
- Email: api@anmol.am
- GitHub Issues: [github.com/anmolmanchanda/anmol.am/issues](https://github.com/anmolmanchanda/anmol.am/issues)
- Documentation: [anmol.am/docs/api](https://anmol.am/docs/api)