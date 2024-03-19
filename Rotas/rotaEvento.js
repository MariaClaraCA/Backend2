
import { Router } from 'express';
import EventoCtrl from '../Controles/EventoCtrl.js';

const rotaEvento = new Router();
const cliCtrl = new EventoCtrl();

rotaEvento
.get('/', cliCtrl.consultar)
.get('/:termo', cliCtrl.consultar)
.post('/', cliCtrl.gravar)
.put('/:codigo', cliCtrl.atualizar)
.patch('/:codigo', cliCtrl.atualizar)
.delete('/:codigo', cliCtrl.excluir);


export default rotaEvento;