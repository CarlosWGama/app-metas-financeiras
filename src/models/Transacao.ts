
/**
 * @author Carlos W. Gama
 * Classe responsável por armazenar cada transação realizada
 */
export class Transacao {

    constructor(public id: string, public usuario: string, public deposito: boolean, public valor: number = 0, public data:string = '', public categoria?: string) {

    }

}