# web-playground
웹 기술을 탐색하고 실험하기 위한 개인 공간입니다.

## Monorepo Structure

이 저장소는 pnpm workspaces를 사용한 모노레포로 구성되어 있습니다. 다양한 웹 프레임워크와 라이브러리의 샘플 프로젝트를 포함합니다.

### Projects

```
packages/
├── ReactSample/     - React with Vite
├── PreactSample/    - Preact with Vite
├── NextSample/      - Next.js with App Router
├── ExpressSample/   - Express.js server
└── NestSample/      - NestJS server
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm 8.x or higher

### Installation

프로젝트 루트에서 의존성을 설치합니다:

```bash
pnpm install
```

이 명령은 모든 워크스페이스의 의존성을 자동으로 설치합니다.

## Build System

### Build All Projects

모든 프로젝트를 한번에 빌드:

```bash
pnpm build
```

### Build Individual Projects

특정 프로젝트만 빌드:

```bash
pnpm build:react     # React 프로젝트 빌드
pnpm build:preact    # Preact 프로젝트 빌드
pnpm build:next      # Next.js 프로젝트 빌드
pnpm build:express   # Express 프로젝트 빌드
pnpm build:nest      # Nest 프로젝트 빌드
```

### Development Mode

모든 프로젝트를 개발 모드로 실행 (병렬):

```bash
pnpm dev
```

특정 프로젝트만 개발 모드로 실행:

```bash
pnpm dev:react     # React 개발 서버 (기본 포트: 5173)
pnpm dev:preact    # Preact 개발 서버 (기본 포트: 5173)
pnpm dev:next      # Next.js 개발 서버 (기본 포트: 3000)
pnpm dev:express   # Express 서버 (기본 포트: 3001)
pnpm dev:nest      # NestJS 서버 (기본 포트: 3002)
```

### Clean Build Artifacts

빌드 결과물 정리:

```bash
pnpm clean
```

### Testing

테스트 실행:

```bash
pnpm test
```

## Project Details

### ReactSample

- Framework: React 18
- Build Tool: Vite
- Port: 5173 (dev)
- Build Output: `packages/ReactSample/dist`

### PreactSample

- Framework: Preact 10
- Build Tool: Vite
- Port: 5173 (dev)
- Build Output: `packages/PreactSample/dist`

### NextSample

- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Port: 3000 (dev)
- Build Output: `packages/NextSample/.next`

### ExpressSample

- Framework: Express.js
- Language: JavaScript (ES Modules)
- Port: 3001 (dev/prod)
- Features: JSON API, Health check endpoint

### NestSample

- Framework: NestJS
- Language: TypeScript
- Port: 3002 (dev/prod)
- Build Output: `packages/NestSample/dist`
- Features: Decorators, Dependency Injection

## Workspace Commands

워크스페이스 특정 명령 실행:

```bash
pnpm --filter <workspace-name> <script>
```

예시:

```bash
pnpm --filter ReactSample build
pnpm --filter ExpressSample add axios
```

모든 워크스페이스에서 실행:

```bash
pnpm -r <script>  # recursive
```

## License

MIT
