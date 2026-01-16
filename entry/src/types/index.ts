/**
 * Package Registry Types
 *
 * @derives REQ-ENTRY-009
 */

/** Display metadata for a package card */
export interface PackageCard {
  /** Display name (e.g., "React Sample") */
  name: string;
  /** Brief technology description */
  description: string;
  /** Relative path: {package-name}/index.html */
  href: string;
}

/** Immutable collection of package cards */
export type PackageRegistry = readonly PackageCard[];

/** Optional package.json extension for custom display metadata */
export interface PlaygroundMeta {
  title?: string;
  description?: string;
}

/** Package.json structure with optional playground metadata */
export interface PackageJson {
  name: string;
  description?: string;
  playgroundMeta?: PlaygroundMeta;
}
