# NestJS Sample Project Specification

## Overview

A sample NestJS server application demonstrating enterprise-grade backend development with TypeScript. This project showcases NestJS's opinionated architecture with decorators, dependency injection, and modular structure.

## Purpose

- Demonstrate NestJS framework setup with TypeScript
- Showcase enterprise-level backend architecture
- Provide example of decorators and dependency injection
- Compare opinionated framework approach to minimal Express.js

## Technology Stack

- **Framework**: NestJS 10.3.10
- **Language**: TypeScript 5.5.4
- **Runtime**: Node.js 18.x+
- **Platform**: Express.js (via @nestjs/platform-express)
- **Module System**: CommonJS
- **Design Patterns**: Dependency Injection, Decorators, Modules

## Project Structure

```
packages/nest-sample/
├── nest-cli.json       # NestJS CLI configuration
├── package.json        # Package configuration
├── tsconfig.json       # TypeScript configuration
└── src/
    ├── main.ts             # Application entry point
    ├── app.module.ts       # Root module
    ├── app.controller.ts   # Main controller with routes
    └── app.service.ts      # Business logic service
```

## Key Features

1. **NestJS Architecture**:
   - Modular structure with `@Module` decorator
   - Controllers for routing (`@Controller`)
   - Services for business logic (`@Injectable`)
   - Dependency injection container

2. **REST API Endpoints**:
   - `GET /` - Root endpoint with API documentation
   - `GET /health` - Health check endpoint
   - `GET /hello/:name` - Parameterized greeting endpoint

3. **TypeScript Decorators**:
   - `@Module()` - Define modules
   - `@Controller()` - Define route controllers
   - `@Injectable()` - Mark as injectable service
   - `@Get()`, `@Post()`, etc. - HTTP method decorators
   - `@Param()` - Extract route parameters

4. **Development Features**:
   - Watch mode with automatic restart
   - Built-in CLI for code generation
   - Source maps for debugging

## NestJS Architecture

### Module (app.module.ts)

Root module organizing the application:

```typescript
@Module({
  imports: [],           // Other modules to import
  controllers: [AppController],  // Controllers in this module
  providers: [AppService],       // Services available via DI
})
```

### Controller (app.controller.ts)

Handles HTTP requests:

```typescript
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello/:name')
  getHello(@Param('name') name: string) {
    return this.appService.getHello(name)
  }
}
```

### Service (app.service.ts)

Contains business logic:

```typescript
@Injectable()
export class AppService {
  getHello(name: string): { message: string } {
    return { message: `Hello, ${name}!` }
  }
}
```

### Main (main.ts)

Application bootstrap:

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3002)
}
```

## API Endpoints

### GET /

Root endpoint providing API overview.

**Response:**
```json
{
  "message": "Welcome to NestJS Sample!",
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

# Start production server (explicit)
pnpm start:prod

# Clean build artifacts
pnpm clean
```

### Development Server

- **Default Port**: 3002
- **Environment Variable**: `PORT` (configurable)
- **Watch Mode**: Enabled (`nest start --watch`)
- **Hot Reload**: Automatic restart on file changes
- **Console Output**: Server URL logged on startup

### Running from Monorepo Root

```bash
# Development
pnpm dev:nest

# Build
pnpm build:nest

# Using filter
pnpm --filter nest-sample dev
```

## Build Process

### Build Steps

1. **NestJS Build**: `nest build` compiles TypeScript
2. **Type Checking**: Full decorator and type validation
3. **Output**: JavaScript files with source maps and declarations

### Build Configuration (nest-cli.json)

```json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}
```

### TypeScript Configuration (tsconfig.json)

Key settings for NestJS:
- **module**: "commonjs" (NestJS uses CommonJS)
- **experimentalDecorators**: true (enable decorators)
- **emitDecoratorMetadata**: true (emit decorator metadata)
- **target**: ES2021
- **outDir**: "../../dist/nest-sample"

### Build Output

- **Directory**: `/dist/nest-sample/` (at repository root)
- **Format**: CommonJS modules
- **Includes**:
  - Compiled JavaScript (`.js`)
  - Source maps (`.js.map`)
  - Type declarations (`.d.ts`)

### Production Execution

After building:
```bash
node dist/nest-sample/main.js
```

Or using package script:
```bash
pnpm start:prod
```

## Configuration

### Port Configuration

Port can be configured via environment variable:

```bash
# Development
PORT=4000 pnpm dev

# Production
PORT=4000 pnpm start:prod
```

**Default:** 3002

## Dependencies

### Production Dependencies

- **@nestjs/common**: ^10.3.10 - Core NestJS decorators and utilities
- **@nestjs/core**: ^10.3.10 - NestJS framework core
- **@nestjs/platform-express**: ^10.3.10 - Express adapter for NestJS
- **reflect-metadata**: ^0.2.2 - Required for decorator metadata
- **rxjs**: ^7.8.1 - Reactive extensions (used internally by NestJS)

### Development Dependencies

- **@nestjs/cli**: ^10.4.2 - NestJS command-line interface
- **@nestjs/schematics**: ^10.1.2 - Code generation schematics
- **@types/express**: ^4.17.21 - TypeScript definitions for Express
- **@types/node**: ^20.14.12 - TypeScript definitions for Node.js
- **ts-node**: ^10.9.2 - TypeScript execution for Node.js
- **typescript**: ^5.5.4 - TypeScript compiler

## NestJS Core Concepts

### Dependency Injection

Services are injected via constructor:

```typescript
constructor(private readonly appService: AppService) {}
```

NestJS automatically resolves and provides dependencies.

### Decorators

- **@Module()**: Define a module
- **@Controller()**: Define a controller
- **@Injectable()**: Mark class as injectable
- **@Get()**, **@Post()**, **@Put()**, **@Delete()**: HTTP methods
- **@Param()**: Extract route parameters
- **@Body()**: Extract request body
- **@Query()**: Extract query parameters

### Modular Architecture

- **Root Module**: AppModule ties everything together
- **Feature Modules**: Can be added for organization
- **Shared Modules**: Reusable across features
- **Dynamic Modules**: Configured at runtime

## NestJS CLI

The NestJS CLI provides code generation:

```bash
# Generate module
nest generate module users

# Generate controller
nest generate controller users

# Generate service
nest generate service users

# Generate complete resource
nest generate resource users
```

## Integration Points

### Monorepo Integration

- Part of pnpm workspace
- Consistent TypeScript patterns (with NestJS specifics)
- Centralized build output (`/dist/`)
- Demonstrates enterprise backend architecture
- Complements Express.js sample for comparison

### CORS and Frontend Integration

To integrate with frontend projects:

```typescript
// In main.ts
app.enableCors()  // Enable CORS for all origins
```

Or with configuration:
```typescript
app.enableCors({
  origin: 'http://localhost:3000',
  credentials: true,
})
```

## Testing

NestJS has built-in testing support. Can be extended with:

- **Jest**: Unit and integration tests (NestJS default)
- **Supertest**: HTTP endpoint testing
- **@nestjs/testing**: Testing utilities

Example test structure:

```typescript
import { Test } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('getHello', () => {
    it('should return hello message', () => {
      expect(appController.getHello('World').message).toBe('Hello, World!')
    })
  })
})
```

## Future Enhancements

Potential additions:

- **Database**: TypeORM, Prisma, Mongoose integration
- **Authentication**: Passport, JWT guards
- **Validation**: class-validator with DTOs
- **Configuration**: @nestjs/config for env management
- **Logging**: Built-in logger or Winston
- **Documentation**: Swagger/OpenAPI integration
- **Microservices**: NestJS microservice patterns
- **GraphQL**: @nestjs/graphql integration
- **WebSockets**: @nestjs/websockets
- **Caching**: @nestjs/cache-manager
- **Task Scheduling**: @nestjs/schedule

## Comparison to Express.js

### NestJS Advantages

- **Structure**: Opinionated, modular architecture
- **Scalability**: Built for large applications
- **Dependency Injection**: Automatic resolution
- **Type Safety**: Decorators provide compile-time checks
- **Features**: Guards, pipes, interceptors, middleware
- **Testing**: Built-in testing utilities
- **CLI**: Code generation and scaffolding

### Express.js Advantages

- **Simplicity**: Minimal, straightforward
- **Flexibility**: No imposed structure
- **Lightweight**: Smaller footprint
- **Control**: Full control over architecture

### When to Use NestJS

- Enterprise applications
- Large teams needing consistent structure
- Microservices architecture
- GraphQL APIs
- Applications requiring extensive testing
- Projects benefiting from code generation

### When to Use Express.js

- Simple REST APIs
- Microservices (when you want minimal overhead)
- Learning backend basics
- Projects requiring full architectural control

## Deployment

### Production Build

1. **Build**: `pnpm build` or `nest build`
2. **Output**: `/dist/nest-sample/`
3. **Run**: `node dist/nest-sample/main.js`

### Production Considerations

- Set `NODE_ENV=production`
- Use process manager (PM2, systemd)
- Configure reverse proxy (Nginx)
- Enable logging
- Set up monitoring
- Configure environment variables

### Docker Example

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --prod
COPY dist/nest-sample ./dist/nest-sample
CMD ["node", "dist/nest-sample/main.js"]
EXPOSE 3002
```

## Performance Considerations

- **Platform**: Uses Express under the hood
- **DI Container**: Minimal overhead for dependency resolution
- **Decorators**: Compile-time, no runtime penalty
- **RxJS**: Only used where needed

## Advanced Features

NestJS provides many advanced features:

### Guards

Protect routes with authentication/authorization:
```typescript
@UseGuards(AuthGuard)
@Get('protected')
getProtected() { }
```

### Pipes

Transform and validate input:
```typescript
@Get('user/:id')
getUser(@Param('id', ParseIntPipe) id: number) { }
```

### Interceptors

Transform responses, handle side effects:
```typescript
@UseInterceptors(LoggingInterceptor)
@Get()
findAll() { }
```

### Middleware

Express-compatible middleware:
```typescript
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Request...')
    next()
  }
}
```

## Notes

- Uses **NestJS 10** with modern TypeScript decorators
- **Opinionated architecture** enforces best practices
- **Dependency Injection** makes code testable and maintainable
- **CommonJS modules** (NestJS standard)
- Configured for **monorepo** with centralized dist output
- Perfect for learning enterprise backend patterns
- Port 3002 avoids conflicts with other servers
- Built on top of Express.js but provides higher-level abstractions
- Extensive ecosystem with official packages for common needs
- Strong TypeScript support with decorators and metadata
