import EventoDAO from "../Persistencia/EventoDAO.js";
export default class Evento {
    #codigo;
    #nomeevent;
    #dataehora;
    #localevent;
    #preco;
    #quant_ingres;

    constructor(codigo = 0, nomeevent = "", dataehora = "", localevent = "", preco = "", quant_ingres = "") {
        this.#codigo = codigo;
        this.#nomeevent = nomeevent;
        this.#dataehora = dataehora;
        this.#localevent = localevent;
        this.#preco = preco;
        this.#quant_ingres = quant_ingres;
    }

    
    get codigo() {
        return this.#codigo;
    }

    get nomeevent() {
        return this.#nomeevent;
    }

    get dataehora() {
        return this.#dataehora;
    }

    get localevent() {
        return this.#localevent;
    }

    get preco() {
        return this.#preco;
    }

    get quant_ingres() {
        return this.#quant_ingres;
    }
    
    set codigo(newValue) {
        this.#codigo = newValue;
    }

    set nomeevent(newValue) {
        this.#nomeevent = newValue;
    }

    set dataehora(newValue) {
        this.#dataehora = newValue;
    }

    set localevent(newValue) {
        this.#localevent = newValue;
    }

    set preco(newValue) {
        this.#preco = newValue;
    }

    set quant_ingres(newValue) {
        this.#quant_ingres = newValue;
    }

  
    async gravar(){
        const dao = new EventoDAO();
        await dao.gravar(this); 
    }

    async atualizar(){
        const dao = new EventoDAO();
        await dao.atualizar(this);
    }

    async excluir(){
        const dao = new EventoDAO();
        await dao.excluir(this);
    }

    async consultar(termoDePesquisa){
        const dao = new EventoDAO();
        return await dao.consultar(termoDePesquisa);
    }


    toString(){
        return `Evento código: ${this.#codigo} -  nome: ${this.#nomeevent}`;
    }
    

    
    toJSON() {
        return {
            codigo: this.#codigo,
            nomeevent: this.#nomeevent,
            dataehora: this.#dataehora,
            localevent: this.#localevent,
            preco: this.#preco,
            quant_ingres: this.#quant_ingres,
        }
    }
}