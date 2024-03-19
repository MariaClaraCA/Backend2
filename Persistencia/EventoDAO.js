import conectar from "../Persistencia/Conexao.js";
import Evento from "../Modelos/Evento.js";

export default class EventoDAO {
    async gravar(evento) {
        const conexao = await conectar();
        try {
            const sql = `INSERT INTO evento (nomeevent, dataehora, localevent, preco, quant_ingres) 
                         VALUES (?, ?, ?, ?, ?)`;
            const parametros = [
                evento.nomeevent,
                evento.dataehora,
                evento.localevent,
                evento.preco,
                evento.quant_ingres,
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
            const sql = `UPDATE evento SET nomeevent = ?, dataehora = ?, localevent = ?, preco = ?, quant_ingres = ? WHERE id = ?`;
            const parametros = [
                evento.codigo,
                evento.nomeevent,
                evento.dataehora,
                evento.localevent,
                evento.preco,
                evento.quant_ingres,

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
                sql = `SELECT * FROM evento WHERE nomeevent LIKE ?`;
                parametros = [`%${termoDePesquisa}%`];
            } else {
                sql = `SELECT * FROM evento WHERE id = ?`;
                parametros = [termoDePesquisa];
            }

            const [registros] = await conexao.execute(sql, parametros);
            return registros.map(registro => new Evento(
                registro.id,
                registro.nomeevent,
                registro.dataehora,
                registro.localevent,
                registro.preco,
                registro.quant_ingres

            ));
        } finally {
            if (conexao && conexao.release) conexao.release();
        }
    }
}