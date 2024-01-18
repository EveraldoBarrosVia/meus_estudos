// 1 - Inicialização
import { sleep } from "k6";
;

// 2 - Configuração
export const option = {
    vus: 1,
    duration: "10s"
}

// 3 - Execução ou código vu
export default function(){
    console.log("Testando k6");
    sleep(1);
}

// 4 Desmontagem
export function teardown(data){
    console.log(data)
}