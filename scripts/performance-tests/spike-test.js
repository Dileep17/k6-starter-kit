import http from 'k6/http';
import { check, sleep } from 'k6';

// Options to simulate a spike test
export const options = {
    stages: [
        // Ramp-up to 1000 users over 2 minutes
        { duration: '2m', target: 1000 },
        // Drop to 0 users immediately after spike
        { duration: '1m', target: 0 },
    ],
    thresholds: {
        // Ensure 95% of requests complete within 500ms during spike
        http_req_duration: ['p(95)<500'],
        // Ensure less than 1% of requests fail during spike
        http_req_failed: ['rate<0.01'],
    },
};

// Parameterized base URL to make the test more flexible
const BASE_URL = __ENV.BASE_URL || 'https://test.k6.io';

export default function () {
    // Perform the GET request
    const res = http.get(`${BASE_URL}/`);
    
    // Basic check to ensure the response is successful
    check(res, {
        'status is 200': (r) => r.status === 200,
        'response time is < 500ms': (r) => r.timings.duration < 500,
    });
    
    // Randomize sleep time between 1 and 3 seconds
    sleep(Math.random() * 2 + 1);
}
