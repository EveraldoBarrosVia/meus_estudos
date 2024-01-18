import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

export const options = {
    stages: [
        { duration: '5s', target: 5 }, // run pup 
        { duration: '5s', target: 5 }, // carga
        { duration: '2s', target: 50 }, // subida de usuário
        { duration: '2s', target: 50 }, // carga
        { duration: '5s', target: 0 }, // caída de usuário
    ],

    thresholds: {
        http_req_failed: ['rate<0.01'],
    },
};

const csvData = new SharedArray('User data', function () {
    return papaparse.parse(open('./usuarios.csv'), { header: true }).data;
});

export default function () {
    const userData = csvData[Math.floor(Math.random() * csvData.length)];
    const USERNAME = userData.email;
    const PASSWORD = 'User@123';
    const BASE_URL = 'https://test-api.k6.io';

    const response = http.post(`${BASE_URL}/auth/token/login/`, {
        username: USERNAME,
        password: PASSWORD,
    });

    check(response, {
        'o status é 200': (r) => r.status === 200,
        'Token gerado': (r) => r.json('access') !== '',
        'Verficar se há erros': (r) => !r.error,
    });

    sleep(1);
}