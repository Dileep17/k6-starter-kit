import http from 'k6/http';
import { check } from 'k6';

// Options: Smoke test with 1 user for 30 seconds
export const options = {
    vus: 1,
    duration: '30s',
};

// Parameterized base URL to make the test more flexible
const BASE_URL = __ENV.BASE_URL || 'https://test.k6.io';

// Main test logic executed by the single virtual user (VU)
export default function () {
    // Check the home page
    let homeRes = http.get(`${BASE_URL}/`);
    check(homeRes, {
        'Home page status is 200': (r) => r.status === 200,
    });

    // Check the contact page
    let contactRes = http.get(`${BASE_URL}/contact.php`);
    check(contactRes, {
        'Contact page status is 200': (r) => r.status === 200,
    });

    // Check the news page
    let newsRes = http.get(`${BASE_URL}/news.php`);
    check(newsRes, {
        'News page status is 200': (r) => r.status === 200,
    });

    // Optionally sleep for a short time to simulate a short user delay
    sleep(1); // Reduce sleep to 1 second or remove entirely
}
