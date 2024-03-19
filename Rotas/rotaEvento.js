//Rota é uma micro aplicação express que se encarrega de processar
//requisições em um determinado endpoint
//Por exemplo: http://localhost:3000/cliente  <-- cliente é um endpoint
//            domínio da aplicação   endpoint 

import { Router } from 'express';
import EventoCtrl from '../Controles/EventoCtrl.js';

const rotaEvento = new Router();
const cliCtrl = new EventoCtrl();

rotaEvento
.get('/', cliCtrl.consultar)
.get('/:termo', cliCtrl.consultar)  //atribuindo a função consultar como parâmetro do que executar quando receber um método get na rota
.post('/', cliCtrl.gravar)
.put('/:codigo', cliCtrl.atualizar)
.patch('/:codigo', cliCtrl.atualizar)
.delete('/:codigo', cliCtrl.excluir);


export default rotaEvento;