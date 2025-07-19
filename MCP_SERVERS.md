# MCP Servers Configuration

This project is configured with multiple Model Context Protocol (MCP) servers to enhance development capabilities.

## Available MCP Servers

### Core Development
- **git** - Git repository operations and version control
- **sqlite** - Database operations and SQL queries
- **filesystem** - Advanced file system operations
- **memory** - Persistent memory for context across sessions

### Web Development
- **puppeteer** - Browser automation and web scraping
- **fetch** - Advanced HTTP requests and API interactions
- **web-search** - Web search capabilities
- **browser** - Browser-based MCP operations

### Search & Research
- **brave-search** - Brave search API integration (requires API key)
- **firecrawl** - Web crawling and content extraction

### Productivity & Automation
- **astrotask** - Task and project management
- **sequential-thinking** - Enhanced reasoning capabilities
- **tools-memory** - Advanced memory management
- **upstash-context** - Context management with Upstash

### Development Tools
- **apidog** - API development and testing
- **everart** - AI art generation (requires API key)
- **time** - Time and date operations
- **postgres** - PostgreSQL database operations

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