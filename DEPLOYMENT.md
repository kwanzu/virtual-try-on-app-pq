# Deployment Guide - VirtualFit AR Try-On

## Overview

VirtualFit is designed for headless execution on the Afterquery platform and local Docker deployment. This guide covers both scenarios.

## Project Silver Compliance

This project meets Project Silver requirements:

- ✅ Private repository (VirtualFit, not public)
- ✅ Production-grade codebase with meaningful commit history
- ✅ Comprehensive test coverage (unit, integration, E2E)
- ✅ Dockerfile with multi-stage build (20 KB, <200 lines, <30 RUN)
- ✅ Pinned dependencies in pnpm-lock.yaml
- ✅ TypeScript support
- ✅ Full git history included

## Docker Build

### Prerequisites

- Docker 20.10+
- Docker Compose 2.0+ (for local testing)
- 4GB+ RAM available
- Stable internet connection

### Building Locally

```bash
# Build Docker image
docker build -t virtualfit:latest .

# Verify image
docker images | grep virtualfit

# Check image size
docker images --format "table {{.Repository}}\t{{.Size}}" | grep virtualfit
```

### Dockerfile Structure

```dockerfile
Stage 1: dependencies   - Install production deps
Stage 2: builder        - Install all deps & build
Stage 3: runtime        - Final production image
```

**Image Details:**
- **Base**: `node:20-alpine` (slim, ~168 MB)
- **Final Size**: ~400-500 MB (optimized)
- **User**: `nextjs` (non-root, UID 1001)
- **Port**: 3000
- **Health Check**: Every 30s

### Environment Variables

Required for runtime:

```bash
# Supabase Integration
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx

# Optional
NODE_ENV=production
```

## Local Testing with Docker Compose

### Single Container

```bash
# Start application
docker-compose up

# In another terminal, test
curl http://localhost:3000

# View logs
docker-compose logs -f virtualfit

# Stop
docker-compose down
```

### With Environment Variables

```bash
# Create .env file
echo "NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co" > .env
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx" >> .env

# Start with env
docker-compose up --env-file .env
```

### Health Check

```bash
# Check container health
docker-compose ps

# Manual health check
curl -f http://localhost:3000 || exit 1
```

## Afterquery Platform Deployment

### Submission Checklist

Before submitting to Project Silver:

```
✅ Repository is private on GitHub
✅ Full .git history included
✅ Dockerfile included and tested
✅ pnpm-lock.yaml is current
✅ Tests pass locally
✅ Coverage >75%
✅ Build succeeds
✅ Environment variables documented
```

### Submission Process

1. **Create task.toml**

```toml
[task]
name = "virtualfit-ar-feature"
description = "VirtualFit AR try-on feature implementation"
difficulty = "medium"
```

2. **Create instruction.md**

Describe the bug or feature clearly:
- Specific files involved
- Expected vs actual behavior
- Concrete inputs/outputs
- Any constraints

3. **Create solution/solve.sh**

Unified diff wrapped in git apply:
```bash
#!/bin/bash
git apply << 'EOF'
diff --git a/... b/...
--- a/...
+++ b/...
...
EOF
```

4. **Create tests/test.sh**

Test harness that:
- Fails before patch
- Passes after patch
- Returns JSON results

5. **Create tests/config.json**

```json
{
  "base_commit": "9e9a11132c...",
  "fail_to_pass": ["test_ar_detection", "test_product_filter"],
  "pass_to_pass": ["test_auth_login"],
  "test_patch": "..."
}
```

6. **Submit**

The platform will:
- Check file sizes (<768 KB total)
- Build Docker image
- Run null/oracle tests
- Run easiness probe
- Review with LLM

## Vercel Deployment

### Option 1: Automatic from GitHub

1. Connect GitHub repo to Vercel
2. Set environment variables in Settings
3. Deploy branch: `main` or `develop`
4. Auto-deploys on push

### Option 2: Manual with CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set production
vercel --prod

# View logs
vercel logs --follow
```

### Required Environment Variables

In Vercel dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
```

## Performance Optimization

### Docker Layer Caching

```bash
# Efficient: Changes to app code don't rebuild dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build
```

### Image Size Reduction

```bash
# Current sizes:
# Base image:     ~168 MB
# Dependencies:   ~150 MB
# Built app:      ~80 MB
# Final:          ~400 MB
```

### Build Speed

```bash
# First build:    ~3-5 minutes (downloads deps)
# Cached build:   ~30-60 seconds (uses cache)
```

## Monitoring & Debugging

### Docker Logs

```bash
# View logs
docker logs <container-id>

# Stream logs
docker logs -f <container-id>

# Get last 100 lines
docker logs --tail 100 <container-id>
```

### Health Check

```bash
# Manual check
docker exec <container-id> curl localhost:3000

# Check docker ps status
docker ps --filter "name=virtualfit"
```

### Environment Variable Verification

```bash
# Verify env vars in running container
docker exec <container-id> env | grep NEXT_PUBLIC

# Check at build time
docker build --build-arg NEXT_PUBLIC_SUPABASE_URL=xxx .
```

## Troubleshooting

### Build Failures

**Error**: `pnpm-lock.yaml not up to date`

```bash
# Fix lockfile
pnpm install --no-frozen-lockfile
git add pnpm-lock.yaml
git commit -m "chore: update lockfile"
```

**Error**: `Dockerfile exceeds 200 lines`

```bash
# Combine RUN commands with &&
RUN apt-get update && \
    apt-get install -y --no-install-recommends package1 package2 && \
    apt-get clean
```

### Runtime Failures

**Port already in use**

```bash
# Use different port
docker run -p 3001:3000 virtualfit:latest

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Env vars not working**

```bash
# Verify vars are set
docker exec <container-id> env | grep SUPABASE

# Re-run with env
docker run --env-file .env -p 3000:3000 virtualfit:latest
```

## Rollback Procedure

```bash
# List deployed versions
docker ps -a | grep virtualfit

# Run previous version
docker run -d -p 3000:3000 virtualfit:v1.2.3

# Switch traffic
# (depends on orchestration platform)
```

## Maintenance

### Regular Tasks

- **Weekly**: Review error logs
- **Monthly**: Update dependencies
- **Quarterly**: Security audit
- **Annually**: Performance review

### Dependency Updates

```bash
# Check for updates
pnpm outdated

# Update safely
pnpm update

# Lock changes
git add pnpm-lock.yaml
```

## Next Steps

1. Test Docker build locally
2. Verify all environment variables
3. Run full test suite
4. Submit to Project Silver
5. Monitor post-deployment metrics

## Support

For Project Silver issues:
- Platform: https://experts.afterquery.com
- Docs: [Project Silver Documentation](./PROJECT_SILVER.md)
- Testing: [Testing Guide](./TESTING.md)
