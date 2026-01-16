import type { PackageRegistry } from '../types';

/**
 * Static package registry for the Web Playground landing page.
 * This serves as the single source of truth for all sample packages.
 */
export const packages: PackageRegistry = [
  {
    name: 'React Sample',
    description: 'Rsbuild로 구성된 React 애플리케이션',
    href: '/react-sample/index.html',
  },
  {
    name: 'Preact Sample',
    description: '경량화된 React 대안',
    href: '/preact-sample/index.html',
  },
  {
    name: 'Next.js Sample',
    description: '풀스택 React 프레임워크',
    href: '/next-sample/index.html',
  },
  {
    name: 'Express Sample',
    description: 'Node.js 웹 프레임워크',
    href: 'http://localhost:3001',
    rel: 'noopener noreferrer',
  },
  {
    name: 'Nest.js Sample',
    description: 'TypeScript 기반 서버사이드 프레임워크',
    href: 'http://localhost:3002',
    rel: 'noopener noreferrer',
  },
] as const;
