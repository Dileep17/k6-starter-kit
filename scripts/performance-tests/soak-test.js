import http from 'k6/http';
import { check, sleep } from 'k6';

// Options for a soak test with ramp-up, steady load, and ramp-down stages
export const options = {
    stages: [
        // Ramp up to 1000 users over 5 minutes
        { duration: '5m', target: 1000 },
        // Hold at 1000 users for 24 hours
        { duration: '24h', target: 1000 },
        // Ramp down to 0 users over 5 minutes
        { duration: '5m', target: 0 },
    ],
    thresholds: {
        // Set performance criteria for the test
        http_req_duration: ['p(95)<500'],  // 95% of requests should be under 500ms
        http_req_failed: ['rate<0.01'],    // Less than 1% of requests should fail
    },
};

// Parameterized base URL to make the test more flexible
const BASE_URL = __ENV.BASE_URL || 'https://test.k6.io';

// Main test function executed by virtual users (VUs)
export default function () {
    // Request the home page
    const homeRes = http.get(`${BASE_URL}/`);
    check(homeRes, {
        'Home page status is 200': (r) => r.status === 200,
    });

    // Randomize sleep duration between 1 and 3 seconds
    sleep(Math.random() * 2 + 1);

    // Request the contact page
    const contactRes = http.get(`${BASE_URL}/contact.php`);
    check(contactRes, {
        'Contact page status is 200': (r) => r.status === 200,
    });

    sleep(Math.random() * 2 + 1);

    // Request the news page
    const newsRes = http.get(`${BASE_URL}/news.php`);
    check(newsRes, {
        'News page status is 200': (r) => r.status === 200,
    });

    sleep(Math.random() * 2 + 1);
}
