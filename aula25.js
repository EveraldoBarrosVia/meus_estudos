// Import required modules
import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

// Load data from a JSON file into a shared array
const data = new SharedArray('leitura_do_json', function () {
    return JSON.parse(open('/arquivo.json')).crocodiles;
});

// Define the test configuration options
export const options = {
    // Define test stages
    stages: [
        { duration: '10s', target: 10 },
        { duration: '10s', target: 10 },
        { duration: '10s', target: 0 }
    ],
    
    // Define performance thresholds
    thresholds: {
        http_req_duration: ['p(95) < 200']
    },

    // Define external integrations (Load Impact in this case)
    ext: {
        loadimpact: {
            projectID: '3677867',
            name: 'POC K6'
        }
    },
};

// Define the main test function
export default function () {
    // Select a random crocodile from the shared data
    const crocodilo = data[Math.floor(Math.random() * data.length)].id;

    // Construct the URL using the selected crocodile ID
    const BASE_URL = `http://test-api.k6.io/public/crocodiles/`;
    
    // Send an HTTP GET request to the constructed URL
    const res = http.get(BASE_URL);

    // Check if the response status code is 200
    check(res, {
        'status code é 200': (r) => r.status === 200
    });

    // Introduce a delay of 1 second
    sleep(1);
}
