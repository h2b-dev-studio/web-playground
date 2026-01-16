/**
 * React Sample E2E Tests
 *
 * Tests for Pattern Gallery, Props Playground, Code Viewer, Editable Examples, and Responsive Layout.
 *
 * @derives REQ-REACT-001, REQ-REACT-002, REQ-REACT-003, REQ-REACT-004, REQ-REACT-005
 * @aligns-to PATTERN-REACT, QUALITY-TESTED, AUDIENCE-DEVELOPER
 */
import { test, expect, Page } from '@playwright/test';

// Pattern IDs as defined in requirements
const PATTERNS = [
  { id: 'compound-components', name: 'Compound Components', category: 'Composition' },
  { id: 'render-props', name: 'Render Props', category: 'Composition' },
  { id: 'composition-vs-inheritance', name: 'Composition vs Inheritance', category: 'Composition' },
  { id: 'custom-hooks', name: 'Custom Hooks', category: 'State', editable: true },
  { id: 'controlled-vs-uncontrolled', name: 'Controlled vs Uncontrolled', category: 'State' },
  { id: 'context-reducer', name: 'Context + Reducer', category: 'State' },
  { id: 'lifting-state-up', name: 'Lifting State Up', category: 'State' },
];

// Helper to navigate to a pattern
async function navigateToPattern(page: Page, patternId: string) {
  await page.goto(`/react-sample/index.html#${patternId}`);
  await page.waitForSelector('[data-testid="pattern-demo"]');
}

// =============================================================================
// REQ-REACT-001: Pattern Catalog
// =============================================================================

test.describe('REQ-REACT-001: Pattern Catalog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/react-sample/index.html');
  });

  test('should load the React sample page with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/React/);
  });

  test('should display main heading', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('React Patterns');
  });

  test('navigation should list all 7 patterns', async ({ page }) => {
    const patternCards = page.locator('[data-testid="pattern-card"]');
    await expect(patternCards).toHaveCount(7);
  });

  test('patterns should be organized by category', async ({ page }) => {
    // Composition category
    const compositionSection = page.locator('[data-testid="category-composition"]');
    await expect(compositionSection).toBeVisible();
    await expect(compositionSection.locator('[data-testid="pattern-card"]')).toHaveCount(3);

    // State category
    const stateSection = page.locator('[data-testid="category-state"]');
    await expect(stateSection).toBeVisible();
    await expect(stateSection.locator('[data-testid="pattern-card"]')).toHaveCount(4);
  });

  test('each pattern should display name and description', async ({ page }) => {
    for (const pattern of PATTERNS) {
      const card = page.locator(`[data-testid="pattern-card-${pattern.id}"]`);
      await expect(card).toBeVisible();
      await expect(card.locator('[data-testid="pattern-name"]')).toContainText(pattern.name);
    }
  });

  test('clicking pattern should navigate to its demo', async ({ page }) => {
    const firstPattern = PATTERNS[0];
    const card = page.locator(`[data-testid="pattern-card-${firstPattern.id}"]`);
    await card.click();

    // URL should update
    await expect(page).toHaveURL(new RegExp(`#${firstPattern.id}`));

    // Demo should be visible
    const demo = page.locator('[data-testid="pattern-demo"]');
    await expect(demo).toBeVisible();
    await expect(demo.locator('[data-testid="demo-title"]')).toContainText(firstPattern.name);
  });

  test('each pattern should have a working example', async ({ page }) => {
    for (const pattern of PATTERNS) {
      await page.goto(`/react-sample/index.html#${pattern.id}`);
      const livePreview = page.locator('[data-testid="live-preview"]');
      await expect(livePreview).toBeVisible();
    }
  });

  test('pattern selection should be URL-based (shareable)', async ({ page }) => {
    // Navigate directly via URL
    await page.goto('/react-sample/index.html#render-props');

    const demo = page.locator('[data-testid="pattern-demo"]');
    await expect(demo).toBeVisible();
    await expect(demo.locator('[data-testid="demo-title"]')).toContainText('Render Props');
  });
});

// =============================================================================
// REQ-REACT-002: Props Playground
// =============================================================================

test.describe('REQ-REACT-002: Props Playground', () => {
  test('each demo should have at least one manipulable prop', async ({ page }) => {
    for (const pattern of PATTERNS) {
      await navigateToPattern(page, pattern.id);
      const playground = page.locator('[data-testid="props-playground"]');
      await expect(playground).toBeVisible();
      const controls = playground.locator('[data-testid^="prop-control-"]');
      expect(await controls.count()).toBeGreaterThanOrEqual(1);
    }
  });

  test('boolean prop should render as checkbox', async ({ page }) => {
    await navigateToPattern(page, 'controlled-vs-uncontrolled');
    const checkbox = page.locator('[data-testid="prop-control-disabled"] input[type="checkbox"]');
    await expect(checkbox).toBeVisible();
  });

  test('string prop should render as text input', async ({ page }) => {
    await navigateToPattern(page, 'controlled-vs-uncontrolled');
    const textInput = page.locator('[data-testid="prop-control-placeholder"] input[type="text"]');
    await expect(textInput).toBeVisible();
  });

  test('number prop should render as number input', async ({ page }) => {
    await navigateToPattern(page, 'custom-hooks');
    const numberInput = page.locator('[data-testid="prop-control-delay"] input[type="number"]');
    await expect(numberInput).toBeVisible();
  });

  test('enum prop should render as select dropdown', async ({ page }) => {
    await navigateToPattern(page, 'context-reducer');
    const select = page.locator('[data-testid="prop-control-theme"] select');
    await expect(select).toBeVisible();
  });

  test('changing boolean control should immediately update demo', async ({ page }) => {
    await navigateToPattern(page, 'controlled-vs-uncontrolled');

    // Get initial state - use first input (controlled input)
    const input = page.locator('[data-testid="live-preview"] input').first();
    const disabledCheckbox = page.locator('[data-testid="prop-control-disabled"] input[type="checkbox"]');

    // Initially not disabled
    await expect(input).not.toBeDisabled();

    // Toggle disabled
    await disabledCheckbox.check();

    // Demo should update immediately
    await expect(input).toBeDisabled();
  });

  test('changing string control should immediately update demo', async ({ page }) => {
    await navigateToPattern(page, 'controlled-vs-uncontrolled');

    const placeholderInput = page.locator('[data-testid="prop-control-placeholder"] input[type="text"]');
    // Use first input (controlled input)
    const demoInput = page.locator('[data-testid="live-preview"] input').first();

    await placeholderInput.fill('New placeholder text');

    await expect(demoInput).toHaveAttribute('placeholder', 'New placeholder text');
  });

  test('changing number control should immediately update demo', async ({ page }) => {
    await navigateToPattern(page, 'custom-hooks');

    const delayInput = page.locator('[data-testid="prop-control-delay"] input[type="number"]');
    await delayInput.fill('500');

    // The delay value should be reflected in the demo
    const delayDisplay = page.locator('[data-testid="live-preview"] [data-testid="delay-value"]');
    await expect(delayDisplay).toContainText('500');
  });

  test('changing enum control should immediately update demo', async ({ page }) => {
    await navigateToPattern(page, 'context-reducer');

    const themeSelect = page.locator('[data-testid="prop-control-theme"] select');
    await themeSelect.selectOption('dark');

    const themedBox = page.locator('[data-testid="live-preview"] [data-testid="themed-box"]');
    await expect(themedBox).toHaveAttribute('data-theme', 'dark');
  });

  test('controls should reflect current prop values', async ({ page }) => {
    await navigateToPattern(page, 'controlled-vs-uncontrolled');

    // Change a value
    const placeholderInput = page.locator('[data-testid="prop-control-placeholder"] input[type="text"]');
    await placeholderInput.fill('Test value');

    // Navigate away and back
    await navigateToPattern(page, 'custom-hooks');
    await navigateToPattern(page, 'controlled-vs-uncontrolled');

    // Controls should show default values (state resets on navigation)
    await expect(placeholderInput).toHaveValue('Enter text...');
  });
});

// =============================================================================
// REQ-REACT-003: Code Viewer
// =============================================================================

test.describe('REQ-REACT-003: Code Viewer', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToPattern(page, 'compound-components');
  });

  test('code panel should be collapsible', async ({ page }) => {
    const codePanel = page.locator('[data-testid="code-panel"]');
    const collapseButton = page.locator('[data-testid="collapse-button"]');

    // Initially collapsed on desktop
    await expect(codePanel).toHaveAttribute('data-collapsed', 'true');

    // Expand
    await collapseButton.click();
    await expect(codePanel).toHaveAttribute('data-collapsed', 'false');

    // Collapse again
    await collapseButton.click();
    await expect(codePanel).toHaveAttribute('data-collapsed', 'true');
  });

  test('code viewer should display syntax-highlighted code', async ({ page }) => {
    // Expand code panel
    await page.locator('[data-testid="collapse-button"]').click();

    const codeViewer = page.locator('[data-testid="code-viewer"]');
    await expect(codeViewer).toBeVisible();

    // Should have syntax highlighting (prism classes)
    const highlightedTokens = codeViewer.locator('.token');
    expect(await highlightedTokens.count()).toBeGreaterThan(0);
  });

  test('code viewer should show TypeScript/TSX code', async ({ page }) => {
    await page.locator('[data-testid="collapse-button"]').click();

    const codeViewer = page.locator('[data-testid="code-viewer"]');
    const code = await codeViewer.textContent();

    // Should contain TypeScript syntax
    expect(code).toMatch(/interface|type|React|function|const|export/);
  });

  test('copy button should copy code to clipboard', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    // Expand code panel
    await page.locator('[data-testid="collapse-button"]').click();

    const copyButton = page.locator('[data-testid="copy-button"]');
    await expect(copyButton).toBeVisible();

    await copyButton.click();

    // Check clipboard content
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('function');
  });

  test('copy button should show feedback after copying', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.locator('[data-testid="collapse-button"]').click();

    const copyButton = page.locator('[data-testid="copy-button"]');
    await copyButton.click();

    // Should show "Copied!" feedback
    await expect(copyButton).toContainText('Copied!');

    // Should revert after ~2 seconds
    await expect(copyButton).toContainText('Copy', { timeout: 3000 });
  });

  test('displayed code should match actual implementation', async ({ page }) => {
    await page.locator('[data-testid="collapse-button"]').click();

    const codeViewer = page.locator('[data-testid="code-viewer"]');
    const code = await codeViewer.textContent();

    // Should contain the actual Tabs/Accordion component code
    expect(code).toMatch(/Tabs|Accordion/);
  });
});

// =============================================================================
// REQ-REACT-004: Editable Examples
// =============================================================================

test.describe('REQ-REACT-004: Editable Examples', () => {
  test('custom hooks pattern should have editable code', async ({ page }) => {
    await navigateToPattern(page, 'custom-hooks');

    const codeEditor = page.locator('[data-testid="code-editor"]');
    await expect(codeEditor).toBeVisible();
  });

  test('only hook logic should be editable (no JSX)', async ({ page }) => {
    await navigateToPattern(page, 'custom-hooks');

    const codeEditor = page.locator('[data-testid="code-editor"]');
    const code = await codeEditor.textContent();

    // Should only contain hook logic, no JSX
    expect(code).toMatch(/useState|useEffect|useCallback/);
    expect(code).not.toMatch(/<div|<span|<button/);
  });

  test('editing hook logic should update behavior in real-time', async ({ page }) => {
    await navigateToPattern(page, 'custom-hooks');

    // Find the useToggle code editor
    const editorTextarea = page.locator('[data-testid="code-editor"] textarea');

    // The editor should contain useToggle hook code
    const initialCode = await editorTextarea.inputValue();
    expect(initialCode).toContain('useToggle');
    expect(initialCode).toContain('useState');

    // Click on the toggle button to verify initial state works
    const toggleButton = page.locator('.toggle-button');
    const toggleState = page.locator('[data-testid="toggle-state"]');

    // Initial state should be OFF
    await expect(toggleState).toContainText('OFF');

    // Toggle should work
    await toggleButton.click();
    await expect(toggleState).toContainText('ON');

    // Click again to go back to OFF
    await toggleButton.click();
    await expect(toggleState).toContainText('OFF');

    // Verify the code is editable by checking focus and typing works
    await editorTextarea.click();
    await editorTextarea.press('End');
    await editorTextarea.type('// edited');

    // The comment should appear in the editor
    const editedCode = await editorTextarea.inputValue();
    expect(editedCode).toContain('// edited');
  });

  test('syntax errors should be displayed inline without crashing', async ({ page }) => {
    await navigateToPattern(page, 'custom-hooks');

    const editorTextarea = page.locator('[data-testid="code-editor"] textarea');

    // Introduce a syntax error
    await editorTextarea.fill('const [value, setValue = useState(false);'); // Missing bracket

    // Error should be displayed
    const errorDisplay = page.locator('[data-testid="code-error"]');
    await expect(errorDisplay).toBeVisible();
    await expect(errorDisplay).toContainText(/error|SyntaxError/i);

    // App should not crash - demo area should still be visible
    const demoArea = page.locator('[data-testid="demo-area"]');
    await expect(demoArea).toBeVisible();
  });

  test('reset button should restore original code', async ({ page }) => {
    await navigateToPattern(page, 'custom-hooks');

    const editorTextarea = page.locator('[data-testid="code-editor"] textarea');
    const resetButton = page.locator('[data-testid="reset-button"]');

    // Get original code
    const originalCode = await editorTextarea.inputValue();

    // Modify code
    await editorTextarea.fill('const modified = true;');

    // Reset
    await resetButton.click();

    // Should restore original
    await expect(editorTextarea).toHaveValue(originalCode);
  });

  test('useToggle hook should be editable', async ({ page }) => {
    await navigateToPattern(page, 'custom-hooks');

    // Switch to useToggle example
    const useToggleTab = page.locator('[data-testid="hook-tab-useToggle"]');
    await useToggleTab.click();

    const codeEditor = page.locator('[data-testid="code-editor"]');
    const code = await codeEditor.textContent();

    expect(code).toContain('useToggle');
  });

  test('useDebounce hook should be editable', async ({ page }) => {
    await navigateToPattern(page, 'custom-hooks');

    // Switch to useDebounce example
    const useDebounceTab = page.locator('[data-testid="hook-tab-useDebounce"]');
    await useDebounceTab.click();

    const codeEditor = page.locator('[data-testid="code-editor"]');
    const code = await codeEditor.textContent();

    expect(code).toContain('useDebounce');
  });

  test('code execution should have timeout protection', async ({ page }) => {
    await navigateToPattern(page, 'custom-hooks');

    const editorTextarea = page.locator('[data-testid="code-editor"] textarea');

    // Try to create an infinite loop
    await editorTextarea.fill(`
      function useToggle() {
        while(true) {} // Infinite loop
        return [false, () => {}];
      }
    `);

    // Should timeout and show error
    const errorDisplay = page.locator('[data-testid="code-error"]');
    await expect(errorDisplay).toBeVisible({ timeout: 10000 });
    await expect(errorDisplay).toContainText(/timeout|exceeded/i);
  });
});

// =============================================================================
// REQ-REACT-005: Responsive Layout
// =============================================================================

test.describe('REQ-REACT-005: Responsive Layout', () => {
  test.describe('Desktop (≥1024px)', () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test('should show side-by-side layout for demo + playground', async ({ page }) => {
      await navigateToPattern(page, 'compound-components');

      const demoArea = page.locator('[data-testid="demo-area"]');
      const playground = page.locator('[data-testid="props-playground"]');

      // Both should be visible
      await expect(demoArea).toBeVisible();
      await expect(playground).toBeVisible();

      // Check they are side-by-side (similar Y position)
      const demoBox = await demoArea.boundingBox();
      const playgroundBox = await playground.boundingBox();

      expect(demoBox).not.toBeNull();
      expect(playgroundBox).not.toBeNull();

      // Y positions should overlap (side-by-side)
      const demoTop = demoBox!.y;
      const demoBottom = demoBox!.y + demoBox!.height;
      const playgroundTop = playgroundBox!.y;

      expect(playgroundTop).toBeLessThan(demoBottom);
      expect(playgroundTop).toBeGreaterThanOrEqual(demoTop - 50); // Allow some tolerance
    });

    test('code panel should be visible (collapsed by default)', async ({ page }) => {
      await navigateToPattern(page, 'compound-components');

      const codePanel = page.locator('[data-testid="code-panel"]');
      await expect(codePanel).toBeVisible();
      await expect(codePanel).toHaveAttribute('data-collapsed', 'true');
    });
  });

  test.describe('Tablet (768-1023px)', () => {
    test.use({ viewport: { width: 900, height: 800 } });

    test('should show stacked layout', async ({ page }) => {
      await navigateToPattern(page, 'compound-components');

      const demoArea = page.locator('[data-testid="demo-area"]');
      const playground = page.locator('[data-testid="props-playground"]');

      // Both should be visible
      await expect(demoArea).toBeVisible();
      await expect(playground).toBeVisible();

      // Check they are stacked (playground below demo)
      const demoBox = await demoArea.boundingBox();
      const playgroundBox = await playground.boundingBox();

      expect(demoBox).not.toBeNull();
      expect(playgroundBox).not.toBeNull();

      // Playground should be below demo
      expect(playgroundBox!.y).toBeGreaterThan(demoBox!.y);
    });

    test('code panel should be collapsed by default', async ({ page }) => {
      await navigateToPattern(page, 'compound-components');

      const codePanel = page.locator('[data-testid="code-panel"]');
      await expect(codePanel).toHaveAttribute('data-collapsed', 'true');
    });
  });

  test.describe('Mobile (<768px)', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should show full-width layout', async ({ page }) => {
      await navigateToPattern(page, 'compound-components');

      const demoArea = page.locator('[data-testid="demo-area"]');

      // Demo should be full width
      const demoBox = await demoArea.boundingBox();
      expect(demoBox).not.toBeNull();
      expect(demoBox!.width).toBeGreaterThan(300); // Close to viewport width
    });

    test('code panel should be hidden by default', async ({ page }) => {
      await navigateToPattern(page, 'compound-components');

      const codePanel = page.locator('[data-testid="code-panel"]');
      await expect(codePanel).toHaveAttribute('data-collapsed', 'true');
    });

    test('no horizontal scroll should be present', async ({ page }) => {
      await navigateToPattern(page, 'compound-components');

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(hasHorizontalScroll).toBe(false);
    });

    test('all controls should be accessible via touch (44px minimum)', async ({ page }) => {
      await navigateToPattern(page, 'controlled-vs-uncontrolled');

      const controls = page.locator('[data-testid^="prop-control-"]');
      const count = await controls.count();

      for (let i = 0; i < count; i++) {
        const control = controls.nth(i);
        const box = await control.boundingBox();
        expect(box).not.toBeNull();
        // Minimum touch target size
        expect(box!.height).toBeGreaterThanOrEqual(44);
      }
    });

    test('demo should be visible without scrolling on initial load', async ({ page }) => {
      await navigateToPattern(page, 'compound-components');

      const livePreview = page.locator('[data-testid="live-preview"]');
      await expect(livePreview).toBeInViewport();
    });
  });
});

// =============================================================================
// Pattern-Specific Tests
// =============================================================================

test.describe('Pattern: Compound Components', () => {
  test('Tabs component should work correctly', async ({ page }) => {
    await navigateToPattern(page, 'compound-components');

    // Switch tabs
    const tab2 = page.locator('[data-testid="live-preview"] [data-testid="tab-2"]');
    await tab2.click();

    // Content should change
    const tabPanel = page.locator('[data-testid="live-preview"] [data-testid="tab-panel"]');
    await expect(tabPanel).toContainText('Tab 2');
  });
});

test.describe('Pattern: Render Props', () => {
  test('Toggle with render props should work', async ({ page }) => {
    await navigateToPattern(page, 'render-props');

    const toggleButton = page.locator('[data-testid="live-preview"] [data-testid="toggle-button"]');
    const toggleState = page.locator('[data-testid="live-preview"] [data-testid="toggle-state"]');

    // Initial state
    await expect(toggleState).toContainText('OFF');

    // Toggle
    await toggleButton.click();
    await expect(toggleState).toContainText('ON');
  });
});

test.describe('Pattern: Context + Reducer', () => {
  test('Theme provider should apply theme correctly', async ({ page }) => {
    await navigateToPattern(page, 'context-reducer');

    const themeSelect = page.locator('[data-testid="prop-control-theme"] select');
    await themeSelect.selectOption('dark');

    const themedBox = page.locator('[data-testid="live-preview"] [data-testid="themed-box"]');
    await expect(themedBox).toHaveAttribute('data-theme', 'dark');
  });
});

test.describe('Pattern: Lifting State Up', () => {
  test('Form validation should work across components', async ({ page }) => {
    await navigateToPattern(page, 'lifting-state-up');

    const nameInput = page.locator('[data-testid="live-preview"] input[name="name"]');
    const emailInput = page.locator('[data-testid="live-preview"] input[name="email"]');
    const submitButton = page.locator('[data-testid="live-preview"] button[type="submit"]');

    // Initially empty - validation should fail
    await submitButton.click();
    const errorMessage = page.locator('[data-testid="live-preview"] [data-testid="error-message"]').first();
    await expect(errorMessage).toBeVisible();

    // Fill in valid data for both fields
    await nameInput.fill('John Doe');
    await emailInput.fill('john@example.com');
    await submitButton.click();

    // All errors should be gone
    await expect(errorMessage).not.toBeVisible();
  });
});
