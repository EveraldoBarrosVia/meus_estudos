CONTEÚDO DA AULA 9 - MÃO NA MASSA

Esse código está relacionado ao uso da ferramenta de teste de carga chamada k6, que é uma ferramenta de código aberto usada para testar o desempenho de APIs e sistemas em escala. Vamos explicar cada parte do código:

Inicialização:

import { sleep } from "k6";

Aqui, o código importa a função sleep do módulo "k6". A função sleep é usada para pausar a execução do script por um determinado período de tempo.

Configuração:

export const options = {
    vus: 1,
    duration: "10s"
}

Nesta seção, as opções de configuração para a execução do teste são definidas. vus representa a quantidade de usuários virtuais (virtual users) simultâneos, e duration é a duração total do teste. No exemplo, está configurado para um usuário virtual (vus: 1) e uma duração de 10 segundos.

Execução ou código do usuário virtual:

export default function(){
    console.log("Testando k6");
    sleep(1);
}

Aqui está a função principal que representa a execução de um usuário virtual. No exemplo, ela apenas imprime "Testando k6" no console e pausa a execução por 1 segundo usando sleep(1).

Desmontagem:

export function teardown(data){
    console.log(data)
}

A função teardown é opcional e será chamada após a conclusão da execução de todos os usuários virtuais. Ela recebe um parâmetro data que pode conter informações sobre a execução do teste. Neste exemplo, ela imprime data no console.

Portanto, este script básico de k6 realiza um teste de carga simulando um único usuário virtual que executa a função definida por 10 segundos, com uma pausa de 1 segundo a cada iteração, e exibe mensagens no console. O resultado do teste (dados) será impresso no console no final da execução de todos os usuários virtuais.

CONTEÚDO DA AULA 10 - MÃO NA MASSA

Nesta aula, o código simplesmente faz uma solicitação GET para a URL 'http://test.k6.io' usando o módulo http do K6. 

import http from "k6/http";

export default function(){
    http.get('http://test.k6.io');
}

import http from "k6/http";: Esta linha importa o módulo http do framework K6, que fornece funções para realizar solicitações HTTP durante os testes de carga.

export default function() { ... }: Define uma função exportada que representa um único "script de usuário virtual" ou uma iteração de teste. Tudo dentro desta função será executado quando o script for executado.

http.get('http://test.k6.io');: Dentro da função, há uma única instrução que realiza uma solicitação GET para a URL 'http://test.k6.io'. Isso simula um usuário virtual acessando essa URL durante um teste de carga.

CONTEÚDO DA AULA 11 - MÃO NA MASSA

Importação de Módulos:

import http from "k6/http";
import { check } from "k6";

Aqui, os módulos http e check da biblioteca k6 são importados. O módulo http é usado para realizar solicitações HTTP, enquanto o check é usado para verificar as respostas dessas solicitações.

Configuração de Opções:

export const options = {
  vus: 1,
  duration: "3s"
}

Nesta seção, as opções de configuração para a execução do teste são definidas. vus representa a quantidade de usuários virtuais simultâneos, e duration é a duração do teste. Neste exemplo, há apenas 1 usuário virtual e o teste dura 3 segundos.

Função de Teste:

export default function(){
  http.get('http://test.k6.io')

  const res = http.get('http://test.k6.io');
  check(res, {
      'status code é 200': (r) => r.status === 200
  })
}

Aqui, a função padrão (export default function(){}) é definida, representando a ação principal do teste. Dentro dessa função:

http.get('http://test.k6.io'): Realiza uma solicitação GET para o URL fornecido (http://test.k6.io). Esta linha não está sendo usada para verificar nada, apenas para fazer uma solicitação.

const res = http.get('http://test.k6.io');: Realiza outra solicitação GET para o mesmo URL e armazena a resposta no objeto res.

check(res, { 'status code é 200': (r) => r.status === 200 }): Utiliza o método check para verificar se o código de status da resposta (r.status) é igual a 200. Se a condição não for atendida, o teste será considerado falho.

Portanto, esse script executa um teste de carga simples com um usuário virtual, fazendo duas solicitações GET para o mesmo URL e verificando se o código de status da resposta é 200. Esse é um exemplo básico, e os testes podem ser expandidos e personalizados conforme necessário.