import Evento from "./Modelos/Evento.js";

const evento = new Evento(0, "Descrição do Evento", "Nome do Evento", "2022-01-01 10:00", "Local do Evento", "100.00", "100");

evento.gravar().then(() => {
  console.log("Gravou com sucesso!");
});