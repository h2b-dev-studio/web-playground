/**
 * Package Card Contract per design spec
 */
export interface PackageCard {
  /** Display name (e.g., "React Sample") */
  name: string;
  /** Brief technology description */
  description: string;
  /** Relative path: {package-name}/index.html or external URL */
  href: string;
  /** Optional rel attribute for external links */
  rel?: string;
}

export type PackageRegistry = readonly PackageCard[];
