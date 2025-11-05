# Express Sample Project Specification

## Overview

A sample Express.js server application demonstrating backend API development with TypeScript. This project showcases a minimal REST API server with health check and greeting endpoints.

## Purpose

- Demonstrate Express.js server setup with TypeScript
- Provide backend API example in the monorepo
- Showcase JSON API endpoints
- Test backend development workflow with hot reload

## Technology Stack

- **Framework**: Express.js 4.19.2
- **Language**: TypeScript 5.5.4
- **Runtime**: Node.js 18.x+
- **Dev Runner**: tsx 4.16.2 (TypeScript execution with watch mode)
- **Module System**: ES2022 modules

## Project Structure

```
packages/express-sample/
├── package.json        # Package configuration
├── tsconfig.json       # TypeScript configuration
└── src/
    └── index.ts        # Server entry point with routes
```

## Key Features

1. **REST API Endpoints**:
   - `GET /` - Root endpoint with API documentation
   - `GET /health` - Health check endpoint
   - `GET /hello/:name` - Parameterized greeting endpoint

2. **Express Middleware**:
   - JSON body parser (`express.json()`)
   - Request/Response type safety with TypeScript

3. **Development Features**:
   - Hot reload with `tsx watch`
   - TypeScript compilation with type checking
   - Source maps for debugging

4. **Production Ready**:
   - Compiled to JavaScript for production
   - Configurable port via environment variable
   - Clean separation of concerns

## API Endpoints

### GET /

Root endpoint providing API overview.

**Response:**
```json
{
  "message": "Welcome to Express Sample!",
  "endpoints": {
    "health": "/health",
    "hello": "/hello/:name"
  }
}
```

### GET /health

Health check endpoint for monitoring.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### GET /hello/:name

Personalized greeting endpoint.

**Parameters:**
- `name` (path parameter) - Name to greet

**Example:** `GET /hello/World`

**Response:**
```json
{
  "message": "Hello, World!"
}
```

## Development

### Prerequisites

- Node.js 18.x or higher
- pnpm 8.x or higher

### Available Commands

```bash
# Development server with watch mode
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Clean build artifacts
pnpm clean
```

### Development Server

- **Default Port**: 3001
- **Environment Variable**: `PORT` (configurable)
- **Hot Reload**: Enabled via `tsx watch`
- **TypeScript**: Direct execution without compilation
- **Console Output**: Server URL logged on startup

### Running from Monorepo Root

```bash
# Development
pnpm dev:express

# Build
pnpm build:express

# Using filter
pnpm --filter express-sample dev
```

## Build Process

### Build Steps

1. **TypeScript Compilation**: `tsc` compiles TypeScript to JavaScript
2. **Type Checking**: Full type checking during build
3. **Output**: JavaScript files with source maps and declarations

### Build Configuration (tsconfig.json)

```json
{
  "target": "ES2022",
  "module": "ES2022",
  "outDir": "../../dist/express-sample",
  "rootDir": "./src",
  "strict": true,
  "declaration": true,
  "sourceMap": true
}
```

### Build Output

- **Directory**: `/dist/express-sample/` (at repository root)
- **Format**: ES2022 JavaScript modules
- **Includes**:
  - Compiled JavaScript (`.js`)
  - Source maps (`.js.map`)
  - Type declarations (`.d.ts`)

### Production Execution

After building:
```bash
node dist/express-sample/index.js
```

Or using package script:
```bash
pnpm start
```

## Configuration

### Port Configuration

Port can be configured via environment variable:

```bash
# Development
PORT=4000 pnpm dev

# Production
PORT=4000 pnpm start
```

**Default:** 3001

### TypeScript Configuration

Key settings:
- **Target**: ES2022 (modern JavaScript)
- **Module**: ES2022 (native ES modules)
- **Strict Mode**: Enabled for type safety
- **Module Resolution**: Node.js style
- **Source Maps**: Enabled for debugging

## Dependencies

### Production Dependencies

- **express**: ^4.19.2 - Fast, minimalist web framework

### Development Dependencies

- **@types/express**: ^4.17.21 - TypeScript definitions for Express
- **@types/node**: ^20.14.12 - TypeScript definitions for Node.js
- **tsx**: ^4.16.2 - TypeScript execute and watch
- **typescript**: ^5.5.4 - TypeScript compiler

## Development Workflow

### Hot Reload with tsx

The `tsx watch` command:
1. Watches for file changes in `src/`
2. Automatically restarts server on changes
3. Executes TypeScript directly without compilation
4. Provides fast feedback loop

### Type Safety

Full TypeScript support:
- **Request typing**: `Request` from Express
- **Response typing**: `Response` from Express
- **Parameter extraction**: Type-safe with `req.params`
- **JSON responses**: Type-checked objects

## Express.js Concepts

### Middleware

```typescript
app.use(express.json())  // Parse JSON request bodies
```

### Route Handlers

```typescript
app.get('/path', (req: Request, res: Response) => {
  // Handle request
  res.json({ data: 'value' })
})
```

### Route Parameters

```typescript
app.get('/hello/:name', (req: Request, res: Response) => {
  const { name } = req.params  // Extract URL parameter
})
```

## Integration Points

### Monorepo Integration

- Part of pnpm workspace
- Consistent TypeScript configuration with other projects
- Centralized build output (`/dist/`)
- Can be consumed by frontend projects
- Demonstrates backend development in monorepo

### CORS and Frontend Integration

Currently no CORS configuration. To integrate with frontend:

```typescript
import cors from 'cors'
app.use(cors())  // Enable CORS for all origins
```

Then install:
```bash
pnpm add cors
pnpm add -D @types/cors
```

## Testing

Currently no tests configured. Can be extended with:
- **Jest** or **Vitest** for unit tests
- **Supertest** for HTTP endpoint testing
- **Playwright** for E2E API tests (available at root)

Example test structure:
```typescript
import request from 'supertest'
import app from './index'

test('GET /health returns ok', async () => {
  const response = await request(app).get('/health')
  expect(response.status).toBe(200)
  expect(response.body.status).toBe('ok')
})
```

## Future Enhancements

Potential additions:
- **Database integration**: PostgreSQL, MongoDB, etc.
- **Authentication**: JWT, OAuth, session-based
- **Validation**: express-validator, Zod
- **Logging**: Winston, Pino
- **Error handling**: Centralized error middleware
- **API documentation**: Swagger/OpenAPI
- **Rate limiting**: express-rate-limit
- **Security**: Helmet.js for security headers
- **Environment config**: dotenv for configuration
- **ORM/Query builder**: Prisma, TypeORM, Drizzle

## Error Handling

Currently basic error handling. Production apps should add:

```typescript
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})
```

## Deployment

### Production Considerations

1. **Build the project**: `pnpm build`
2. **Set environment variables**: `PORT`, `NODE_ENV`, etc.
3. **Run with Node.js**: `node dist/express-sample/index.js`
4. **Process manager**: Use PM2 or similar for production
5. **Reverse proxy**: Nginx or similar for production

### Docker Example

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --prod
COPY dist/express-sample ./dist/express-sample
CMD ["node", "dist/express-sample/index.js"]
EXPOSE 3001
```

## Performance Considerations

- **ES Modules**: Native module system for better performance
- **Minimal dependencies**: Only Express.js in production
- **Type safety**: Catch errors at compile time
- **Source maps**: Debug production issues

## Comparison to NestJS

This Express sample demonstrates:
- **Minimal setup**: Simple, straightforward configuration
- **Manual routing**: Explicit route definitions
- **Lightweight**: Minimal abstractions

NestJS (in nest-sample) provides:
- **Opinionated structure**: Decorators, modules, DI
- **Enterprise features**: Built-in validation, guards, pipes
- **More overhead**: Heavier framework

Choose Express for:
- Simple APIs
- Microservices
- Learning backend basics
- Full control over architecture

## Notes

- Uses **Express.js 4** with TypeScript for type safety
- **tsx** provides fast TypeScript execution without build step
- Configured for **ES2022 modules** (modern JavaScript)
- **Minimal setup** for quick prototyping
- Easy to extend with middleware, databases, authentication
- Perfect starting point for learning backend development
- Complements frontend samples in monorepo
- Port 3001 avoids conflicts with frontend dev servers (port 3000)
