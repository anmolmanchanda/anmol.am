# MCP Servers Configuration

This project is configured with multiple Model Context Protocol (MCP) servers to enhance development capabilities.

## Available MCP Servers (25+ Configured)

### Core Development
- **git** - Git repository operations and version control
- **sqlite** - Database operations and SQL queries
- **filesystem** - Advanced file system operations
- **memory** - Persistent memory for context across sessions
- **everything** - Multi-tool server with comprehensive capabilities

### Web Development & APIs
- **puppeteer** - Browser automation and web scraping
- **fetch** - Advanced HTTP requests and API interactions
- **web-search** - Web search capabilities
- **browser** - Browser-based MCP operations
- **browserbase** - Cloud browser automation
- **apollo** - GraphQL API management and development

### Databases & Data
- **sqlite** - Lightweight database operations
- **postgres** - PostgreSQL database management
- **astra-db** - DataStax Astra DB vector database
- **chroma** - Embeddings and vector search operations

### Documentation & Content
- **archbee** - Documentation writing and publishing
- **builtwith** - Technology stack identification
- **firecrawl** - Web crawling and content extraction

### CI/CD & Development Tools
- **circleci** - CI/CD pipeline management and debugging
- **apidog** - API development and testing
- **buildable** - Task management and project tracking

### Productivity & Automation
- **astrotask** - Task and project management
- **sequential-thinking** - Enhanced reasoning capabilities
- **tools-memory** - Advanced memory management
- **upstash-context** - Context management with Upstash

### Utilities
- **everart** - AI art generation (requires API key)
- **time** - Time and date operations
- **brave-search** - Brave search API integration (requires API key)

## Configuration

MCP servers are configured in `.mcp-config.json`. To use servers that require API keys:

1. Set environment variables for API keys
2. Update the server configuration with your credentials

## Usage

These MCP servers provide enhanced capabilities for:
- Advanced file operations beyond basic read/write
- Git operations and repository management
- Database operations and queries
- Web scraping and browser automation
- API testing and development
- Enhanced search and research capabilities
- Task management and productivity tools

## Setup Requirements

Some servers require additional setup:
- **GitHub**: Set `GITHUB_PERSONAL_ACCESS_TOKEN`
- **Brave Search**: Set `BRAVE_API_KEY`
- **EverArt**: Set `EVERART_API_KEY`
- **PostgreSQL**: Configure `POSTGRES_CONNECTION_STRING`

## Why Use MCPs?

MCPs provide specialized functionality that goes beyond standard development tools:
- **Specialized APIs**: Direct integration with services like GitHub, databases, etc.
- **Enhanced Capabilities**: Advanced features not available in basic tools
- **Context Preservation**: Memory and state management across sessions
- **Automation**: Complex workflows and browser automation
- **Productivity**: Task management and project organization tools

This configuration makes the development environment significantly more powerful for web development, automation, and research tasks.

## Recently Added Servers

### Enterprise-Grade Development
- **everything** - Comprehensive multi-tool server for diverse development tasks
- **apollo** - GraphQL API management and schema development
- **browserbase** - Cloud-based browser automation for testing
- **chroma** - Vector database for AI/ML projects and embeddings

### Content & Documentation
- **archbee** - Professional documentation writing and publishing
- **builtwith** - Technology stack analysis for competitive research
- **buildable** - Advanced project management and task tracking

### Database & Analytics
- **astra-db** - Vector database for AI applications
- **circleci** - CI/CD pipeline debugging and management

These additions bring the total to 25+ MCP servers, providing enterprise-level development capabilities for portfolio projects, client work, and advanced development workflows.