import http from 'k6/http';
import { check, sleep } from 'k6';

// Options for a stress test with aggressive load ramp-up and down
export const options = {
    stages: [
        // Rapidly increase to 1000 users over 10 seconds
        { duration: '10s', target: 1000 },
        // Hold 1000 users for 30 seconds
        { duration: '30s', target: 1000 },
        // Gradually ramp down to 0 users over 20 seconds
        { duration: '20s', target: 0 },
    ],
    thresholds: {
        // Higher thresholds to capture performance during stress
        http_req_duration: ['p(95)<1000'],  // 95% of requests should complete under 1000ms
        http_req_failed: ['rate<0.05'],     // Less than 5% of requests should fail
    },
};

// Parameterized base URL to make the test more flexible
const BASE_URL = __ENV.BASE_URL || 'https://test.k6.io';

export default function () {
    // Send GET requests and check status
    const resHome = http.get(`${BASE_URL}/`);
    check(resHome, {
        'Home page status is 200': (r) => r.status === 200,
    });

    sleep(Math.random() * 2 + 1);  // Randomized sleep time between 1 and 3 seconds

    const resContact = http.get(`${BASE_URL}/contact.php`);
    check(resContact, {
        'Contact page status is 200': (r) => r.status === 200,
    });

    sleep(Math.random() * 2 + 1);

    const resNews = http.get(`${BASE_URL}/news.php`);
    check(resNews, {
        'News page status is 200': (r) => r.status === 200,
    });

    sleep(Math.random() * 2 + 1);
}
