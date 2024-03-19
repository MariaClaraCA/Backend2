import express from "express";
import rotaEvento from "./Backend2/Rotas/rotaEvento.js";

const host = '0.0.0.0';
const porta = 3000;

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/eventos',rotaEvento);

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});

