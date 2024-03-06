// Evento.js
export default class Evento {
    #codigo;
    #Nome_Evento;
    #Data_Hora;
    #Local_Evento;
    #Preco;
    #Quantidade_ingresso;


    constructor(codigo = 0, Nome_Evento = "", Data_Hora = "", Local_Evento = "", Preco = "", Quantidade_ingresso = "") {
        this.#codigo = codigo;
        this.#Nome_Evento = Nome_Evento;
        this.#Data_Hora = Data_Hora;
        this.#Local_Evento = Local_Evento;
        this.#Preco = Preco;
        this.#Quantidade_ingresso = Quantidade_ingresso;
    }

    // Getters
    get codigo() {
        return this.#codigo;
    }

    get Nome_Evento() {
        return this.#Nome_Evento;
    }

    get Data_Hora() {
        return this.#Data_Hora;
    }

    get Local_Evento() {
        return this.#Local_Evento;
    }

    get Preco() {
        return this.#Preco;
    }

    get Quantidade_ingresso() {
        return this.#Quantidade_ingresso;
    }
    // Setters
    set codigo(newValue) {
        this.#codigo = newValue;
    }

    set Nome_Evento(newValue) {
        this.#Nome_Evento = newValue;
    }

    set Data_Hora(newValue) {
        this.#Data_Hora = newValue;
    }

    set Local_Evento(newValue) {
        this.#Local_Evento = newValue;
    }

    set Preco(newValue) {
        this.#Preco = newValue;
    }

    set Quantidade_ingresso(newValue) {
        this.#Quantidade_ingresso = newValue;
    }

    // Método para representar o objeto Evento como string
    toString() {
        return `Evento [${this.#codigo}]: ${this.#Nome_Evento}, Data: ${this.#Data_Hora}`;
    }
    gravar() {
        return new Promise((resolve, reject) => {
          // Simulando a gravação em um banco de dados
          setTimeout(() => {
            if (Math.random() < 0.5) {
              resolve();
            } else {
              reject(new Error('Falha ao gravar o evento'));
            }
          }, 1000);
        });
      }
    

    // Método para converter o objeto Evento para um formato JSON
    toJSON() {
        return {
            codigo: this.#codigo,
            Nome_Evento: this.#Nome_Evento,
            Data_Hora: this.#Data_Hora,
            Local_Evento: this.#Local_Evento,
            Preco: this.#Preco,
            Quantidade_ingresso: this.#Quantidade_ingresso,
        }
    }
}