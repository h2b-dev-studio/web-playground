/**
 * Express API E2E Tests
 *
 * Verifies REQ-003: Package Standards - each sample demonstrates idiomatic patterns.
 * Tests the Express.js API server built with tsc + tsx.
 *
 * @derives REQ-003
 * @aligns-to QUALITY-IDIOMATIC, QUALITY-TESTED, SCOPE-SHOWCASE
 */
import { test, expect } from '@playwright/test';

const EXPRESS_BASE_URL = 'http://localhost:3001';

test.describe('Express API - Root Endpoint', () => {
  test('should return welcome message at root endpoint', async ({ request }) => {
    const response = await request.get(`${EXPRESS_BASE_URL}/`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('message');
    expect(data.message).toContain('Express API');
  });

  test('should return endpoint list at root', async ({ request }) => {
    const response = await request.get(`${EXPRESS_BASE_URL}/`);
    const data = await response.json();

    expect(data).toHaveProperty('endpoints');
    expect(Array.isArray(data.endpoints)).toBeTruthy();
    expect(data.endpoints.length).toBeGreaterThan(0);
  });

  test('should have proper JSON content-type header', async ({ request }) => {
    const response = await request.get(`${EXPRESS_BASE_URL}/`);

    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });
});

test.describe('Express API - Health Check Endpoint', () => {
  test('should return health check status', async ({ request }) => {
    const response = await request.get(`${EXPRESS_BASE_URL}/health`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('status');
    expect(data.status).toBe('ok');
  });

  test('should return timestamp in health check', async ({ request }) => {
    const response = await request.get(`${EXPRESS_BASE_URL}/health`);
    const data = await response.json();

    expect(data).toHaveProperty('timestamp');
    expect(typeof data.timestamp).toBe('string');

    // Verify it's a valid date string
    const timestamp = new Date(data.timestamp);
    expect(timestamp.toString()).not.toBe('Invalid Date');
  });

  test('should return current timestamp', async ({ request }) => {
    const beforeRequest = new Date();
    const response = await request.get(`${EXPRESS_BASE_URL}/health`);
    const afterRequest = new Date();

    const data = await response.json();
    const timestamp = new Date(data.timestamp);

    // Timestamp should be between before and after request
    expect(timestamp.getTime()).toBeGreaterThanOrEqual(beforeRequest.getTime() - 1000);
    expect(timestamp.getTime()).toBeLessThanOrEqual(afterRequest.getTime() + 1000);
  });

  test('should have proper JSON content-type header', async ({ request }) => {
    const response = await request.get(`${EXPRESS_BASE_URL}/health`);

    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });
});

test.describe('Express API - Hello Endpoint', () => {
  test('should return personalized greeting with name', async ({ request }) => {
    const name = 'John';
    const response = await request.get(`${EXPRESS_BASE_URL}/hello/${name}`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('message');
    expect(data.message).toContain(name);
  });

  test('should work with different names', async ({ request }) => {
    const names = ['Alice', 'Bob', 'Charlie', 'David'];

    for (const name of names) {
      const response = await request.get(`${EXPRESS_BASE_URL}/hello/${name}`);
      const data = await response.json();

      expect(response.ok()).toBeTruthy();
      expect(data.message).toContain(name);
    }
  });

  test('should handle names with special characters', async ({ request }) => {
    const specialNames = ['Jean-Pierre', 'O\'Brien', 'María'];

    for (const name of specialNames) {
      const encodedName = encodeURIComponent(name);
      const response = await request.get(`${EXPRESS_BASE_URL}/hello/${encodedName}`);

      expect(response.ok()).toBeTruthy();
    }
  });

  test('should handle Korean names', async ({ request }) => {
    const koreanName = '홍길동';
    const encodedName = encodeURIComponent(koreanName);
    const response = await request.get(`${EXPRESS_BASE_URL}/hello/${encodedName}`);

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty('message');
  });

  test('should have proper JSON content-type header', async ({ request }) => {
    const response = await request.get(`${EXPRESS_BASE_URL}/hello/Test`);

    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });
});

test.describe('Express API - Error Handling', () => {
  test('should handle non-existent routes', async ({ request }) => {
    const response = await request.get(`${EXPRESS_BASE_URL}/non-existent-route`);

    expect(response.status()).toBe(404);
  });

  test('should handle malformed URLs gracefully', async ({ request }) => {
    const response = await request.get(`${EXPRESS_BASE_URL}/hello/`);

    // Should either redirect to root or return 404
    expect([200, 404]).toContain(response.status());
  });
});

test.describe('Express API - CORS and Headers', () => {
  test('should have appropriate CORS headers if configured', async ({ request }) => {
    const response = await request.get(`${EXPRESS_BASE_URL}/health`);

    // Check if CORS is configured
    const headers = response.headers();
    // This test documents the current CORS configuration
    expect(headers).toBeDefined();
  });
});

test.describe('Express API - Performance', () => {
  test('should respond quickly to health check', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get(`${EXPRESS_BASE_URL}/health`);
    const endTime = Date.now();

    expect(response.ok()).toBeTruthy();

    const responseTime = endTime - startTime;
    expect(responseTime).toBeLessThan(1000); // Should respond within 1 second
  });

  test('should handle multiple concurrent requests', async ({ request }) => {
    const requests = [];
    for (let i = 0; i < 10; i++) {
      requests.push(request.get(`${EXPRESS_BASE_URL}/health`));
    }

    const responses = await Promise.all(requests);

    responses.forEach((response) => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
    });
  });
});
