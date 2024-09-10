import http from 'k6/http';
import { sleep, check } from 'k6';

// Test configuration for performance stages
export const options = {
    stages: [
        // Ramp up to 10000 virtual users over 2 hours
        { duration: '2h', target: 10000 },
    ],
    thresholds: {
        // Set success criteria for performance
        http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
        http_req_failed: ['rate<0.01'],   // Less than 1% of requests should fail
    },
};

// Base URL as a parameter to make the test flexible
const BASE_URL = __ENV.BASE_URL || 'https://test.k6.io';

// Main test logic for each virtual user
export default function () {
    // Make a GET request to the base URL
    const res = http.get(`${BASE_URL}/`);

    // Check if the request was successful (Status 200)
    check(res, {
        'status was 200': (r) => r.status === 200,
        'response time was < 500ms': (r) => r.timings.duration < 500,
    });

    // Log error if request fails (optional, can be removed in production)
    if (res.status !== 200) {
        console.error(`Request failed with status ${res.status}`);
    }

    // Random sleep between 1 and 3 seconds to simulate user think time.If you're strictly focused on high-load breakpoint testing, 
    //where you want to push the system to its limits without any delays between requests, 
    //you can safely remove the sleep() function. 
    sleep(Math.random() * 2 + 1);
}
