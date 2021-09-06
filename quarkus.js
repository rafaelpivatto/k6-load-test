import http from "k6/http";
import { check, sleep } from "k6";
export let options = {
    vus: 1000,
    duration: "10s",
    thresholds: {
      http_req_duration: ['p(99)<2000'], // 99% of requests must complete below 2.0s
    },
  };
export default function() {
   
    let res = http.get("http://localhost:8080/people?status=ATIVO");

    if (res.status !== 200) {
        console.log(`Status: ${res.status} - Duration: ${res.timings.duration}`)
    }

    check(res, {
        "success": (r) => r.status == 200
    });
};