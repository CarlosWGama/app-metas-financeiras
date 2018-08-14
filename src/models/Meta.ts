import { Frequencia } from "./Frequencia";
import { Transacao } from "./Transacao";

/**
 * @author Carlos W. Gama
 * Guarda os dados de cada meta
 */
export class Meta {

    constructor(public id: string = '', public titulo: string = '', public objetivo: number = 0, public acumulado = 0, public temPrazo: boolean = false, public prazo?: string, public frequencia: number = Frequencia.DIARIA, public valorRecomendado: number = 0, public membros: string[] = [], public transacoes: Transacao[] = []) {
    }

    /**
     * Adiciona um membro sem repetir o existente
     * @param membro 
     */
    addMembro(membro: string): void {
        if (this.membros.indexOf(membro) === -1)
            this.membros.push(membro);
    }
}