import http from "k6/http";
import { check } from "k6";
import { Counter, Rate } from "k6/metrics";
import { Gauge } from "k6/metrics";
import { Trend } from "k6/metrics";


export const options = {
vus: 1,
duration: "3s",
thresholds: {
    http_req_failed: ['rate < 0.01'],
    http_req_duration: ['p(95) < 200', 'p(90) < 400', 'p(99) < 2000']
}

}

const chamadas = new Counter('quantidade_de_chamadas');
const myGauge = new Gauge('tempo_bloqueado');
const myRate = new Rate('taxa_raq_200');
const myTrend = new Trend('taxa_de_espera');

export default function () {
const req = http.get('http://test.k6.io');
//métrica do tipo contador
chamadas.add(1);
//métrica do tipo medidor
myGauge.add(req.timings.blocked);
//métrica do tipo taxa
myRate.add(req.status === 200);
//métrica do tipo tendência
myTrend.add(req.timings.waiting);

}