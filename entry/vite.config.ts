import { defineConfig, Plugin } from 'vite';
import { packages } from './src/data/packages';

/**
 * Vite plugin that generates project cards from the package registry at build time.
 * This ensures HTML works without JavaScript (REQ-ENTRY-007) while keeping
 * the package registry as the single source of truth.
 */
function packageRegistryPlugin(): Plugin {
  const generateCardHtml = (): string => {
    return packages
      .map((pkg) => {
        const relAttr = pkg.rel ? ` rel="${pkg.rel}"` : '';
        return `          <a href="${pkg.href}" class="card"${relAttr}>
            <h3>${pkg.name}</h3>
            <p>${pkg.description}</p>
          </a>`;
      })
      .join('\n\n');
  };

  return {
    name: 'package-registry',
    transformIndexHtml(html) {
      const cardsHtml = generateCardHtml();
      return html.replace('<!-- PACKAGE_CARDS -->', cardsHtml);
    },
  };
}

export default defineConfig({
  plugins: [packageRegistryPlugin()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
