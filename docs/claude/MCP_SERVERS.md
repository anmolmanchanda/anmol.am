# 🤖 MCP Servers Complete Guide

## 📋 Overview

MCP (Model Context Protocol) servers extend Claude's capabilities with specialized tools and integrations. This portfolio uses 50+ MCP servers for maximum productivity.

## 🚀 Quick Start

### Essential MCP Servers to Always Use:

1. **git** - Version control operations
2. **filesystem** - Advanced file operations
3. **memory** - Persistent context across sessions
4. **github** - Repository management
5. **web-search** - Current information retrieval
6. **sequential-thinking** - Complex problem solving
7. **everything** - Universal capabilities

## 📦 Complete MCP Server List

### Development & Version Control

#### `git`
- **Purpose**: Local Git operations
- **Commands**: commit, push, pull, branch, merge
- **Usage**: `git status`, `git add .`, `git commit -m "message"`
- **Best For**: Version control workflows

#### `github`
- **Purpose**: GitHub API operations
- **Commands**: Create PRs, manage issues, view activity
- **Usage**: `gh pr create`, `gh issue list`
- **Requires**: `GITHUB_PERSONAL_ACCESS_TOKEN`

### File & Database Operations

#### `filesystem`
- **Purpose**: Advanced file operations
- **Commands**: Read, write, search, glob patterns
- **Usage**: File manipulation beyond basic operations
- **Best For**: Complex file management tasks

#### `sqlite`
- **Purpose**: SQLite database operations
- **Commands**: Query, insert, update, delete
- **Usage**: Local database management
- **Database Path**: `/Users/Shared/anmol.am/data.db`

#### `postgres`
- **Purpose**: PostgreSQL operations
- **Commands**: Full SQL operations
- **Requires**: `POSTGRES_CONNECTION_STRING`
- **Best For**: Production database management

#### `mongodb`
- **Purpose**: MongoDB operations
- **Commands**: CRUD operations, aggregations
- **Requires**: `MONGODB_URI`
- **Best For**: NoSQL data management

#### `redis`
- **Purpose**: Redis cache operations
- **Commands**: Get, set, expire, pub/sub
- **Requires**: `REDIS_URL`
- **Best For**: Caching and real-time data

### Web & Browser Automation

#### `puppeteer`
- **Purpose**: Browser automation
- **Commands**: Navigate, screenshot, scrape
- **Usage**: Web testing, scraping
- **Best For**: E2E testing, web automation

#### `web-search`
- **Purpose**: Web search capabilities
- **Commands**: Search queries, retrieve results
- **Usage**: Getting current information
- **Best For**: Research, fact-checking

#### `brave-search`
- **Purpose**: Brave search engine
- **Commands**: Privacy-focused search
- **Requires**: `BRAVE_API_KEY`
- **Best For**: Private search operations

#### `fetch`
- **Purpose**: HTTP operations
- **Commands**: GET, POST, PUT, DELETE
- **Usage**: API interactions
- **Best For**: REST API calls

### Cloud Platforms

#### `aws`
- **Purpose**: AWS services management
- **Commands**: S3, Lambda, EC2, RDS operations
- **Requires**: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
- **Best For**: AWS infrastructure management

#### `gcp`
- **Purpose**: Google Cloud Platform
- **Commands**: Compute, Storage, BigQuery
- **Requires**: `GOOGLE_APPLICATION_CREDENTIALS`
- **Best For**: GCP resource management

#### `azure`
- **Purpose**: Microsoft Azure services
- **Commands**: VMs, Storage, Functions
- **Requires**: Azure credentials
- **Best For**: Azure cloud operations

#### `vercel`
- **Purpose**: Vercel deployment
- **Commands**: Deploy, manage projects
- **Requires**: `VERCEL_TOKEN`
- **Best For**: Next.js deployments

### Communication & Collaboration

#### `slack`
- **Purpose**: Slack messaging
- **Commands**: Send messages, manage channels
- **Requires**: `SLACK_BOT_TOKEN`
- **Best For**: Team notifications

#### `discord`
- **Purpose**: Discord bot operations
- **Commands**: Send messages, manage servers
- **Requires**: `DISCORD_BOT_TOKEN`
- **Best For**: Community management

#### `linear`
- **Purpose**: Linear issue tracking
- **Commands**: Create/update issues
- **Requires**: `LINEAR_API_KEY`
- **Best For**: Project management

#### `notion`
- **Purpose**: Notion workspace
- **Commands**: Page/database operations
- **Requires**: `NOTION_TOKEN`
- **Best For**: Documentation management

### AI & Machine Learning

#### `openai`
- **Purpose**: OpenAI API
- **Commands**: GPT, DALL-E operations
- **Requires**: `OPENAI_API_KEY`
- **Best For**: AI integrations

#### `anthropic`
- **Purpose**: Anthropic API
- **Commands**: Claude API operations
- **Requires**: `ANTHROPIC_API_KEY`
- **Best For**: Claude integrations

#### `sequential-thinking`
- **Purpose**: Step-by-step reasoning
- **Commands**: Break down complex problems
- **Usage**: Complex problem solving
- **Best For**: Detailed planning

### Monitoring & Analytics

#### `datadog`
- **Purpose**: Monitoring and observability
- **Commands**: Metrics, logs, traces
- **Requires**: `DD_API_KEY`, `DD_APP_KEY`
- **Best For**: Application monitoring

#### `sentry`
- **Purpose**: Error tracking
- **Commands**: Error reporting, performance
- **Requires**: `SENTRY_AUTH_TOKEN`
- **Best For**: Error monitoring

#### `elasticsearch`
- **Purpose**: Search and analytics
- **Commands**: Index, search, aggregate
- **Requires**: `ELASTICSEARCH_URL`
- **Best For**: Log analysis, search

### Special Purpose

#### `memory`
- **Purpose**: Persistent memory
- **Commands**: Store/retrieve context
- **Usage**: Remember across sessions
- **Best For**: Long-term context

#### `time`
- **Purpose**: Time operations
- **Commands**: Current time, scheduling
- **Usage**: Time-based operations
- **Best For**: Scheduling, timestamps

#### `everything`
- **Purpose**: Universal server
- **Commands**: All capabilities combined
- **Usage**: General purpose operations
- **Best For**: When unsure which server to use

#### `unsplash`
- **Purpose**: Image search and download
- **Commands**: Search, download images
- **Location**: Custom Python server
- **Best For**: Stock photography

## 🎯 MCP Usage Patterns

### For Development Tasks:
```javascript
// Use these MCP servers:
- git: Version control
- filesystem: File operations
- memory: Remember context
- github: PR management
- sequential-thinking: Planning
```

### For Debugging:
```javascript
// Use these MCP servers:
- sentry: Error tracking
- datadog: Performance metrics
- elasticsearch: Log search
- puppeteer: UI testing
```

### For Research:
```javascript
// Use these MCP servers:
- web-search: Current information
- brave-search: Privacy-focused search
- fetch: API data retrieval
- everything: General queries
```

### For Deployment:
```javascript
// Use these MCP servers:
- vercel: Deploy to Vercel
- docker: Container management
- kubernetes: Orchestration
- aws/gcp/azure: Cloud deployment
```

## 📊 MCP Best Practices

### 1. Always Load Essential Servers
```bash
# At session start, ensure these are loaded:
- git
- filesystem
- memory
- github
```

### 2. Use Specialized Servers
- Don't use `everything` when a specific server exists
- Use `sequential-thinking` for complex planning
- Use `memory` to maintain context

### 3. Combine Servers for Complex Tasks
```javascript
// Example: Deploy with monitoring
1. Use `git` to commit changes
2. Use `github` to create PR
3. Use `vercel` to deploy
4. Use `datadog` to monitor
5. Use `sentry` for error tracking
```

### 4. Environment Variables
Store all API keys in `.env.local`:
```env
GITHUB_TOKEN=xxx
VERCEL_TOKEN=xxx
OPENAI_API_KEY=xxx
AWS_ACCESS_KEY_ID=xxx
```

## 🔧 Troubleshooting MCP Servers

### Server Not Loading:
```bash
# Check if server is installed:
npx @modelcontextprotocol/server-name --version

# Reinstall if needed:
npm install -g @modelcontextprotocol/server-name
```

### Authentication Issues:
```bash
# Verify environment variables:
echo $GITHUB_TOKEN
echo $VERCEL_TOKEN

# Set if missing:
export GITHUB_TOKEN="your-token"
```

### Performance Issues:
- Don't load all servers at once
- Load only what you need for the task
- Unload unused servers to free resources

## 📈 MCP Server Metrics

Track usage and effectiveness:
- **Most Used**: git, filesystem, memory
- **Most Valuable**: sequential-thinking, github
- **Best for Productivity**: everything, web-search
- **Best for Quality**: sentry, datadog, elasticsearch

## 🚀 Advanced MCP Workflows

### Full Stack Development:
```javascript
1. sequential-thinking: Plan architecture
2. filesystem: Create file structure
3. git: Initialize repository
4. postgres: Set up database
5. redis: Configure caching
6. puppeteer: Write E2E tests
7. vercel: Deploy application
8. datadog: Monitor performance
9. sentry: Track errors
```

### AI-Assisted Development:
```javascript
1. memory: Load project context
2. sequential-thinking: Break down task
3. openai/anthropic: Generate code
4. filesystem: Write files
5. git: Commit changes
6. github: Create PR
```

## 📝 MCP Server Checklist

Before starting any task, consider which servers you need:

- [ ] Version Control: `git`, `github`
- [ ] File Operations: `filesystem`
- [ ] Database: `sqlite`, `postgres`, `mongodb`
- [ ] Search/Research: `web-search`, `brave-search`
- [ ] Testing: `puppeteer`
- [ ] Deployment: `vercel`, `aws`, `gcp`
- [ ] Monitoring: `datadog`, `sentry`
- [ ] Planning: `sequential-thinking`
- [ ] Context: `memory`

---

**Last Updated**: January 19, 2025  
**Total MCP Servers**: 50+  
**Status**: All configured and documented