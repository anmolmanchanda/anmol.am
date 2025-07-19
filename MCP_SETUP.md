# MCP Server Setup Guide

This guide helps you set up useful MCP (Model Context Protocol) servers for enhanced development workflow with Claude Code.

## Quick Setup

1. **GitHub MCP Server**
   ```bash
   # Get GitHub Personal Access Token from: https://github.com/settings/tokens
   export GITHUB_PERSONAL_ACCESS_TOKEN="your_token_here"
   uvx mcp-server-github
   ```

2. **Filesystem MCP Server**
   ```bash
   npx -y @modelcontextprotocol/server-filesystem /Users/Shared/anmol.am
   ```

3. **Memory MCP Server**
   ```bash
   npx -y @modelcontextprotocol/server-memory
   ```

4. **Web Search MCP Server**
   ```bash
   npx -y @modelcontextprotocol/server-web-search
   ```

5. **Puppeteer MCP Server** (for browser automation)
   ```bash
   npx -y @modelcontextprotocol/server-puppeteer
   ```

## Recommended MCP Servers for Development

### Essential Servers
- **GitHub**: Repository management, commit history, issue tracking
- **Filesystem**: Local file operations and project navigation  
- **Memory**: Persistent context across sessions
- **Web Search**: Real-time information gathering

### Advanced Servers
- **Puppeteer**: Browser automation and testing
- **PostgreSQL**: Database operations
- **Slack**: Team communication integration
- **Notion**: Documentation and project management

## Configuration

The `.mcp-config.json` file contains server configurations. Update environment variables:

```json
{
  "mcpServers": {
    "github": {
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_actual_token"
      }
    }
  }
}
```

## Benefits for This Portfolio

1. **GitHub Integration**: Track repository activity, manage issues, analyze commit patterns
2. **File Management**: Efficient code navigation and file operations
3. **Memory Persistence**: Maintain context across development sessions
4. **Browser Testing**: Automated testing of portfolio features
5. **Search Capabilities**: Research and gather inspiration from web sources

## Installation Commands

```bash
# Install Python MCP tools
pip install mcp

# Install Node.js MCP servers
npm install -g @modelcontextprotocol/server-filesystem
npm install -g @modelcontextprotocol/server-memory
npm install -g @modelcontextprotocol/server-web-search
npm install -g @modelcontextprotocol/server-puppeteer

# Install specialized servers via uvx
uvx mcp-server-github
uvx mcp-server-postgres
```

## Usage Tips

1. **Start with essential servers**: GitHub, Filesystem, Memory
2. **Add specialized servers**: Based on project needs
3. **Configure environment variables**: For authenticated services
4. **Test connections**: Verify server functionality before heavy usage
5. **Monitor performance**: Some servers may impact system resources

## Troubleshooting

- Ensure all required dependencies are installed
- Check environment variable configurations
- Verify network connectivity for remote services
- Review server logs for connection issues
- Update servers regularly for latest features

## Next Steps

1. Configure authentication tokens
2. Test server connections
3. Integrate with development workflow
4. Explore advanced server capabilities
5. Customize configurations for specific needs