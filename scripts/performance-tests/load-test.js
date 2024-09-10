import http from 'k6/http';
import { sleep, check } from 'k6';

// Test configuration for load stages
export const options = {
    stages: [
        // Ramp-up: Start with 0 users, ramp up to 10 over 10 seconds
        { duration: '10s', target: 10 },
        // Steady state: Keep 10 users for 30 seconds
        { duration: '30s', target: 10 },
        // Ramp-down: Reduce back to 0 users over 10 seconds
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        // Define success criteria for response time and error rates
        http_req_duration: ['p(95)<500'], // 95% of requests should complete within 500ms
        http_req_failed: ['rate<0.01'],   // Less than 1% of requests should fail
    },
};

// Parameterized base URL to make the test more flexible
const BASE_URL = __ENV.BASE_URL || 'https://test.k6.io';

// Main test function executed by each virtual user (VU)
export default function () {
    // Request the home page and check the response
    const homeRes = http.get(`${BASE_URL}/`);
    check(homeRes, {
        'Home page status is 200': (r) => r.status === 200,
        'Home page loaded within 500ms': (r) => r.timings.duration < 500,
    });
    sleep(Math.random() * 2 + 1); // Random sleep between 1-3 seconds

    // Request the contact page and check the response
    const contactRes = http.get(`${BASE_URL}/contact.php`);
    check(contactRes, {
        'Contact page status is 200': (r) => r.status === 200,
        'Contact page loaded within 500ms': (r) => r.timings.duration < 500,
    });
    sleep(Math.random() * 2 + 1); // Random sleep between 1-3 seconds

    // Request the news page and check the response
    const newsRes = http.get(`${BASE_URL}/news.php`);
    check(newsRes, {
        'News page status is 200': (r) => r.status === 200,
        'News page loaded within 500ms': (r) => r.timings.duration < 500,
    });
    sleep(Math.random() * 2 + 1); // Random sleep between 1-3 seconds
}
