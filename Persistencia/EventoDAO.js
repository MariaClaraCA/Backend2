import conectar from "../Persistencia/Conexao.js";
import Evento from "../Modelos/Evento.js";

export default class EventoDAO {
    async gravar(evento) {
        const conexao = await conectar();
        try {
            const sql = `INSERT INTO evento (nome_evento, data_hora, local_evento, preco, Quantidade_ingresso) 
                         VALUES (?, ?, ?, ?, ?)`;
            const parametros = [
                evento.Nome_Evento,
                evento.Data_Hora,
                evento.Local_Evento,
                evento.Preco,
                evento.Quantidade_ingresso,
            ];
            const [resultados] = await conexao.execute(sql, parametros);
            evento.codigo = resultados.insertId;
        } finally {
            if (conexao && conexao.release) conexao.release();
        }
    }

    async atualizar(evento) {
        const conexao = await conectar();
        try {
            const sql = `UPDATE evento SET sobre_evento = ?, nome_evento = ?, data_hora = ?, local_evento = ?, preco = ?, Quantidade_ingresso = ?, WHERE id = ?`;
            const parametros = [
                evento.codigo,
                evento.Nome_Evento,
                evento.Data_Hora,
                evento.Local_Evento,
                evento.Preco,
                evento.Quantidade_ingresso,

            ];
            await conexao.execute(sql, parametros);
        } finally {
            if (conexao && conexao.release) conexao.release();
        }
    }

    async excluir(evento) {
        const conexao = await conectar();
        try {
            const sql = `DELETE FROM evento WHERE id = ?`;
            const parametros = [evento.codigo];
            await conexao.execute(sql, parametros);
        } finally {
            if (conexao && conexao.release) conexao.release();
        }
    }

    async consultar(termoDePesquisa) {
        const conexao = await conectar();
        try {
            let sql = "";
            let parametros = [];
            if (isNaN(termoDePesquisa)) {
                sql = `SELECT * FROM evento WHERE nome_evento LIKE ?`;
                parametros = [`%${termoDePesquisa}%`];
            } else {
                sql = `SELECT * FROM evento WHERE id = ?`;
                parametros = [termoDePesquisa];
            }

            const [registros] = await conexao.execute(sql, parametros);
            return registros.map(registro => new Evento(
                registro.id,
                registro.nome_evento,
                registro.data_hora,
                registro.local_evento,
                registro.preco,
                registro.quantidade_ingresso

            ));
        } finally {
            if (conexao && conexao.release) conexao.release();
        }
    }
}