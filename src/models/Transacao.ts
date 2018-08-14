

/**
 * @author Carlos W. Gama
 * Classe responsável por armazenar cada transação realizada
 */
export class Transacao {

    constructor(public id: string, public autor: string, public deposito: boolean, public valor: number, public categoria?: string) {

    }

}