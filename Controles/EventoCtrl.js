import Evento from "../Modelos/Evento.js";

export default class EventoCtrl{

    //Esta Classe terá a responsabilidade de traduzir pedidos HTTP em 
    //comandos internos da aplicação
    //A nossa aplicação sabe gravar, atualizar, excluir e consultar clientes 
    //no banco de dados

    //Será necessário manipular requisições HTTP
    //Requisições HTTP (GET, POST, PUT ou PATCH, DELETE)

    //Camada de controle será síncrona, então iremos resolver os métodos assíncronos (promises)

    gravar(requisicao, resposta){

        //prepar o método gravar para produzir respostas no formato JSON
        resposta.type('application/json');

        //HTTP gravar um cliente é enviar uma requisição do tipo POST
        //trazendo dados no formato JSON
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body; //extrair dados do corpo da requisição
            const localevent = dados.localevent;
            const nomeevent = dados.nomeevent;
            const dataehora = dados.dataehora;
            const quant_ingres = dados.quant_ingres;


            //pseudo validação nos dados
            if (localevent && nomeevent && dataehora && quant_ingres){
                const evento = new Evento(0, localevent, nomeevent, dataehora, quant_ingres);
                evento.gravar().then(()=>{
                    resposta.status(201);
                    resposta.json({
                        "status":true,
                        "mensagem": "Cliente gravado com sucesso!",
                        "codigo_cliente": evento.codigo
                    });
                }).catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível armazenar o cliente! " + erro.message
                    })
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe todos os dados do cliente, conforme documentação da API"
                });
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método POST e dados no formato JSON para gravar um cliente!"
            })
        }
    }

    atualizar(requisicao, resposta){
        resposta.type('application/json');
        if ((requisicao.method === "PATCH" || requisicao.method === "PUT") && requisicao.is('application/json')){
            const dados = requisicao.body; //extrair dados do corpo da requisição
            //o código será extraído da url, exemplo: http://localhost:3000/cliente/1  1 é o código
            const codigo = requisicao.params.codigo;
            const localevent = dados.localevent;
            const nomeevent = dados.nomeevent;
            const dataehora = dados.dataehora;
            const quant_ingres = dados.quant_ingres;

            if (codigo && codigo > 0 && localevent && nomeevent && dataehora && quant_ingres)
            {
                const evento = new Evento(codigo, localevent, dataehora, quant_ingresl);
                evento.atualizar()
                .then(()=>{
                    resposta.status(200);
                    resposta.json({
                        "status":true,
                        "mensagem": "Cliente atualizado com sucesso!",
                    })
                })
                .catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível atualizar o cliente! " + erro.message
                    })
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe todos os dados do cliente, conforme documentação da API"
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método PATCH, PUT e dados no formato JSON para atualizar um cliente!"
            })
        }
    }

    excluir(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === "DELETE"){
            //o código do cliente que será excluído será extraído da url
            const codigo = requisicao.params.codigo;
            if (codigo && codigo > 0){
                const evento = new Evento(codigo);
                evento.excluir()
                .then(()=>{
                    resposta.status(200);
                    resposta.json({
                        "status":true,
                        "mensagem": "Cliente excluído com sucesso!",
                    })
                })
                .catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível excluir o cliente! " + erro.message
                    })
                })
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe o código do cliente que deseja excluir, conforme documentação da API"
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método DELETE para excluir um cliente!"
            })
        }
    }

    consultar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === "GET"){
            const termoDePesquisa = requisicao.params.termo;
            const evento = new Evento(0);
            evento.consultar(termoDePesquisa)
            .then((evento)=>{
                resposta.status(200);
                resposta.json(evento);
            })
            .catch((erro) =>{
                resposta.status(500);
                resposta.json({
                    "status":false,
                    "mensagem": "Não foi possível consultar os clientes! " + erro.message
                })
            })
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método GET para consultar os clientes!"
            })
        }
    }

}