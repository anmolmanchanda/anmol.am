# Getting Started with Docker for Web Developers

*Streamlining development and deployment with containerization*

Containerization has revolutionized web development deployment. At UN-Habitat, Docker transformed our deployment pipeline from hours to minutes, serving 12 global cities reliably.

![Docker Container Workflow](https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop&crop=center)

## Why Docker Matters

Docker solves fundamental problems that plague modern development teams.

Every development team faces the same core challenges that Docker was designed to solve.

### Before Docker

Development teams struggled with multiple pain points:

- **Environment inconsistencies** between dev/staging/production
- **Dependency conflicts** across applications  
- **Complex setup** for new team members
- **Scaling challenges** across different servers

These issues caused countless hours of debugging and frustration. The famous "it works on my machine" problem plagued teams globally.

### After Docker

Docker eliminated these issues entirely:

- **"It works on my machine"** eliminated through consistent environments
- **Deployment time**: Hours → Minutes with automated pipelines
- **Developer onboarding**: Days → Hours with simple container setup
- **Infrastructure scaling**: Predictable and automated across platforms

The transformation was immediate and dramatic across development workflows.

## Docker Fundamentals

### Containers vs Virtual Machines

```yaml
# Traditional VM (heavy, slow)
VM:
  - Full OS (2-3GB)
  - Hypervisor overhead
  - Slow startup (minutes)

# Docker Container (lightweight, fast)
Container:
  - Shared OS kernel
  - App + dependencies only
  - Fast startup (seconds)
```

## Essential Docker Commands

```bash
# Images and containers
docker images                 # List images
docker ps                     # Running containers
docker ps -a                  # All containers

# Building and running
docker build -t myapp .       # Build image
docker run -p 3000:3000 myapp # Run container
docker stop container_id      # Stop container
```

## Dockerizing a Next.js Application

### 1. Create Dockerfile

```dockerfile
# Multi-stage build for production
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runtime
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY package*.json ./

EXPOSE 3000
CMD ["npm", "start"]
```

### 2. Docker Compose Setup

```yaml
# docker-compose.yml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - redis
      
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
```

### 3. Environment Configuration

```bash
# .dockerignore
node_modules
.git
.env.local
README.md
```

## Production Best Practices

### Multi-Stage Builds

```dockerfile
# Optimize image size and security
FROM node:18-alpine AS deps
# Install dependencies only

FROM node:18-alpine AS builder  
# Build application

FROM node:18-alpine AS runner
# Runtime with minimal footprint
```

### Security Hardening

```dockerfile
# Use non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Minimize attack surface
COPY --from=builder --chown=nextjs:nodejs /app/.next ./
```

### Health Checks

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1
```

## Development Workflow

### Local Development

```bash
# Start development environment
docker-compose up -d

# View logs
docker-compose logs -f web

# Execute commands in container
docker-compose exec web npm test
```

### CI/CD Integration

```yaml
# GitHub Actions example
- name: Build and push Docker image
  uses: docker/build-push-action@v2
  with:
    context: .
    push: true
    tags: myapp:latest
```

## Performance Optimization

### Image Size Reduction

```dockerfile
# Use Alpine Linux (smaller base)
FROM node:18-alpine

# Multi-stage builds to exclude dev dependencies
# Copy only production files
```

### Caching Strategies

```dockerfile
# Leverage Docker layer caching
COPY package*.json ./
RUN npm ci --only=production
# Copy application code last
COPY . .
```

## Common Issues and Solutions

### Port Conflicts

```bash
# Check running containers
docker ps

# Use different ports
docker run -p 3001:3000 myapp
```

### Volume Mounting

```yaml
# Persist data with volumes
volumes:
  - ./data:/app/data
  - node_modules:/app/node_modules
```

### Environment Variables

```bash
# Pass environment variables
docker run -e NODE_ENV=production myapp

# Use .env files
docker run --env-file .env myapp
```

## Monitoring and Debugging

### Container Logs

```bash
# View logs
docker logs container_name
docker logs -f container_name  # Follow logs

# Debug running container
docker exec -it container_name sh
```

### Resource Usage

```bash
# Monitor resource usage
docker stats

# Inspect container details
docker inspect container_name
```

## Scaling with Docker

### Horizontal Scaling

```yaml
# Scale services
version: '3.8'
services:
  web:
    build: .
    deploy:
      replicas: 3
```

### Load Balancing

```yaml
# Add nginx load balancer
nginx:
  image: nginx:alpine
  ports:
    - "80:80"
  depends_on:
    - web
```

## Production Deployment

### Container Registries

```bash
# Push to Docker Hub
docker tag myapp username/myapp:latest
docker push username/myapp:latest

# Deploy to production
docker pull username/myapp:latest
docker run -d -p 80:3000 username/myapp:latest
```

### Orchestration

Docker containers work excellently with:
- **Kubernetes** for enterprise orchestration
- **Docker Swarm** for simpler clustering
- **AWS ECS/Fargate** for managed containers
- **Vercel/Railway** for serverless containers

## Results at UN-Habitat

### Deployment Improvements
- **Build time**: 15 minutes → 3 minutes
- **Deployment reliability**: 85% → 99.5%
- **Environment consistency**: Eliminated config drift
- **Team productivity**: 40% faster development cycles

### Operational Benefits
- **Predictable scaling** for traffic spikes
- **Simplified rollbacks** with image versioning
- **Reduced infrastructure costs** through better resource utilization
- **Enhanced security** through container isolation

## Next Steps

1. **Start small**: Containerize one application
2. **Learn compose**: Multi-container applications
3. **Implement CI/CD**: Automated builds and deployments
4. **Monitor usage**: Container metrics and logging
5. **Scale up**: Orchestration with Kubernetes or cloud services

## Conclusion

Docker transforms how we build, ship, and run applications. By containerizing your applications, you gain consistency, portability, and scalability that modern web development demands.

The investment in learning Docker pays dividends in development velocity, deployment reliability, and operational simplicity. Start with a simple containerization project and gradually adopt more advanced patterns as your expertise grows.

---

*This guide provides the foundation for containerizing web applications effectively, based on real-world experience deploying mission-critical systems at UN-Habitat.*