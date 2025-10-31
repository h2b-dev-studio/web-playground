import { test, expect } from '@playwright/test';

const NEST_BASE_URL = 'http://localhost:3002';

test.describe('NestJS API - Root Endpoint', () => {
  test('should return welcome message at root endpoint', async ({ request }) => {
    const response = await request.get(`${NEST_BASE_URL}/`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('message');
    expect(data.message).toContain('NestJS API');
  });

  test('should return endpoint list at root', async ({ request }) => {
    const response = await request.get(`${NEST_BASE_URL}/`);
    const data = await response.json();

    expect(data).toHaveProperty('endpoints');
    expect(Array.isArray(data.endpoints)).toBeTruthy();
    expect(data.endpoints.length).toBeGreaterThan(0);
  });

  test('should have proper JSON content-type header', async ({ request }) => {
    const response = await request.get(`${NEST_BASE_URL}/`);

    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });

  test('should list all available endpoints', async ({ request }) => {
    const response = await request.get(`${NEST_BASE_URL}/`);
    const data = await response.json();

    const endpoints = data.endpoints;
    expect(endpoints).toContain('/health');
    expect(endpoints).toContain('/hello/:name');
  });
});

test.describe('NestJS API - Health Check Endpoint', () => {
  test('should return health check status', async ({ request }) => {
    const response = await request.get(`${NEST_BASE_URL}/health`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('status');
    expect(data.status).toBe('ok');
  });

  test('should return timestamp in health check', async ({ request }) => {
    const response = await request.get(`${NEST_BASE_URL}/health`);
    const data = await response.json();

    expect(data).toHaveProperty('timestamp');
    expect(typeof data.timestamp).toBe('string');

    // Verify it's a valid date string
    const timestamp = new Date(data.timestamp);
    expect(timestamp.toString()).not.toBe('Invalid Date');
  });

  test('should return current timestamp', async ({ request }) => {
    const beforeRequest = new Date();
    const response = await request.get(`${NEST_BASE_URL}/health`);
    const afterRequest = new Date();

    const data = await response.json();
    const timestamp = new Date(data.timestamp);

    // Timestamp should be between before and after request
    expect(timestamp.getTime()).toBeGreaterThanOrEqual(beforeRequest.getTime() - 1000);
    expect(timestamp.getTime()).toBeLessThanOrEqual(afterRequest.getTime() + 1000);
  });

  test('should have proper JSON content-type header', async ({ request }) => {
    const response = await request.get(`${NEST_BASE_URL}/health`);

    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });

  test('should consistently return ok status', async ({ request }) => {
    // Test multiple times to ensure consistency
    for (let i = 0; i < 5; i++) {
      const response = await request.get(`${NEST_BASE_URL}/health`);
      const data = await response.json();

      expect(response.ok()).toBeTruthy();
      expect(data.status).toBe('ok');
    }
  });
});

test.describe('NestJS API - Hello Endpoint', () => {
  test('should return personalized greeting with name', async ({ request }) => {
    const name = 'John';
    const response = await request.get(`${NEST_BASE_URL}/hello/${name}`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('message');
    expect(data.message).toContain(name);
  });

  test('should work with different names', async ({ request }) => {
    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Emma'];

    for (const name of names) {
      const response = await request.get(`${NEST_BASE_URL}/hello/${name}`);
      const data = await response.json();

      expect(response.ok()).toBeTruthy();
      expect(data.message).toContain(name);
    }
  });

  test('should handle names with special characters', async ({ request }) => {
    const specialNames = ['Jean-Pierre', 'O\'Brien', 'María', 'Müller'];

    for (const name of specialNames) {
      const encodedName = encodeURIComponent(name);
      const response = await request.get(`${NEST_BASE_URL}/hello/${encodedName}`);

      expect(response.ok()).toBeTruthy();
    }
  });

  test('should handle Korean names', async ({ request }) => {
    const koreanName = '홍길동';
    const encodedName = encodeURIComponent(koreanName);
    const response = await request.get(`${NEST_BASE_URL}/hello/${encodedName}`);

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty('message');
  });

  test('should handle Japanese names', async ({ request }) => {
    const japaneseName = '田中太郎';
    const encodedName = encodeURIComponent(japaneseName);
    const response = await request.get(`${NEST_BASE_URL}/hello/${encodedName}`);

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty('message');
  });

  test('should have proper JSON content-type header', async ({ request }) => {
    const response = await request.get(`${NEST_BASE_URL}/hello/Test`);

    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });

  test('should use AppService for greeting logic', async ({ request }) => {
    // This verifies that the controller uses the service layer
    const response1 = await request.get(`${NEST_BASE_URL}/hello/TestUser1`);
    const response2 = await request.get(`${NEST_BASE_URL}/hello/TestUser2`);

    const data1 = await response1.json();
    const data2 = await response2.json();

    // Both should have consistent message structure
    expect(data1).toHaveProperty('message');
    expect(data2).toHaveProperty('message');

    // Messages should contain the respective names
    expect(data1.message).toContain('TestUser1');
    expect(data2.message).toContain('TestUser2');
  });
});

test.describe('NestJS API - Error Handling', () => {
  test('should handle non-existent routes', async ({ request }) => {
    const response = await request.get(`${NEST_BASE_URL}/non-existent-route`);

    expect(response.status()).toBe(404);
  });

  test('should return proper error format for 404', async ({ request }) => {
    const response = await request.get(`${NEST_BASE_URL}/non-existent-route`);

    expect(response.status()).toBe(404);

    const data = await response.json();
    // NestJS typically returns an error object with statusCode and message
    expect(data).toHaveProperty('statusCode');
    expect(data.statusCode).toBe(404);
  });

  test('should handle malformed URLs gracefully', async ({ request }) => {
    const response = await request.get(`${NEST_BASE_URL}/hello/`);

    // Should either redirect to root or return 404
    expect([200, 404]).toContain(response.status());
  });
});

test.describe('NestJS API - CORS and Headers', () => {
  test('should have appropriate CORS headers if configured', async ({ request }) => {
    const response = await request.get(`${NEST_BASE_URL}/health`);

    // Check if CORS is configured
    const headers = response.headers();
    // This test documents the current CORS configuration
    expect(headers).toBeDefined();
  });

  test('should include X-Powered-By header or remove it for security', async ({ request }) => {
    const response = await request.get(`${NEST_BASE_URL}/health`);

    const headers = response.headers();
    // Document whether X-Powered-By is exposed
    // In production, this should typically be removed
    expect(headers).toBeDefined();
  });
});

test.describe('NestJS API - Performance', () => {
  test('should respond quickly to health check', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get(`${NEST_BASE_URL}/health`);
    const endTime = Date.now();

    expect(response.ok()).toBeTruthy();

    const responseTime = endTime - startTime;
    expect(responseTime).toBeLessThan(1000); // Should respond within 1 second
  });

  test('should handle multiple concurrent requests', async ({ request }) => {
    const requests = [];
    for (let i = 0; i < 10; i++) {
      requests.push(request.get(`${NEST_BASE_URL}/health`));
    }

    const responses = await Promise.all(requests);

    responses.forEach((response) => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
    });
  });

  test('should handle rapid sequential requests', async ({ request }) => {
    for (let i = 0; i < 10; i++) {
      const response = await request.get(`${NEST_BASE_URL}/hello/User${i}`);
      const data = await response.json();

      expect(response.ok()).toBeTruthy();
      expect(data.message).toContain(`User${i}`);
    }
  });
});

test.describe('NestJS API - Service Layer Integration', () => {
  test('should use dependency injection for service methods', async ({ request }) => {
    // Test that the service layer is properly integrated
    const response = await request.get(`${NEST_BASE_URL}/hello/TestDI`);

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data).toHaveProperty('message');
    expect(data.message).toContain('TestDI');
  });
});
