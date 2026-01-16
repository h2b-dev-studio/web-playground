/**
 * Entry Page Main Script
 *
 * Renders package cards dynamically from the generated registry.
 *
 * @derives REQ-ENTRY-002, REQ-ENTRY-003, REQ-ENTRY-009
 */
import './style.css';
import { packages } from './generated/registry.js';
import type { PackageCard } from './types/index.js';

/**
 * Renders a single package card as an anchor element
 */
function renderCard(pkg: PackageCard): string {
  return `
    <a href="${pkg.href}" class="project-card">
      <h3>${pkg.name}</h3>
      <p>${pkg.description}</p>
    </a>
  `;
}

/**
 * Renders all package cards into the grid
 */
function renderCards(): void {
  const grid = document.querySelector('.project-grid');
  if (!grid) return;

  // Clear any existing content (noscript fallback)
  grid.innerHTML = packages.map(renderCard).join('');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  renderCards();
  console.log(`Entry page loaded with ${packages.length} package(s)`);
});
