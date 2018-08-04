

/**
 * @author Carlos W. Gama
 */

export class DataUtil {

    /**
     * Checa se um ano é bissexto
     * @param ano 
     */
    public static anoIsBissexto(ano: number): boolean {
        return (ano % 4 == 0 && ano % 100 != 0);
    }

    /**
     * transforma anos em dias
     * @param ano 
     */
    public static anoToDias(ano: number): number {
        return (DataUtil.anoIsBissexto(ano) ? 366 : 365);
    }

    /**
     * Transforma meses em dias
     * @param mes 
     * @param bissexto 
     */
    public static mesToDias(mes: number, bissexto: boolean = false): number {
        let dias = 0;
        switch(mes) {
            case 1: dias = 31; break;
            case 2: (bissexto ? dias = 29 : dias = 28); break;
            case 3: dias = 31; break;
            case 4: dias = 30; break;
            case 5: dias = 31; break;
            case 6: dias = 30; break;
            case 7: dias = 31;
            case 8: dias = 31; break;
            case 9: dias = 30; break;
            case 10: dias = 31; break;
            case 11: dias = 30; break;
            case 12: dias = 31; break;
        }
        return dias;
    }

    /**
     * Recuper a diferença entre dois dias
     * @param dataFinal (YYY-MM-DD)
     * @param dataInicio (YYY-MM-DD) se não informado irá recuperar o dia atual
     */
    public static diferencaDias(dataFinal: string, dataInicio?: string) {
        let dataF, dataI;
        if (dataInicio == null) {
            //dataInicio = new Date().toDateString();
            dataInicio = '2018-08-04';
        }
        dataF = dataFinal.split('-'); //0 - ano | 1 - mes | 2 - dias
        dataI = dataInicio.split('-');//0 - ano | 1 - mes | 2 - dias

        let total = 0;
        //Soma os dias dos anos 
        for (let i = dataI[0]; dataI[0] < dataF[0]; i++) 
            total += DataUtil.anoToDias(i);
        
        let bissexto;
        if (dataI[0] != dataF[0]) {
            //Ano inicial
            bissexto = DataUtil.anoIsBissexto(dataI[0]);
            for (let i = dataI[1]; i <= 12; i++) 
                total += DataUtil.mesToDias(i, bissexto);
            total -= dataI[2]; 

            //Ano final
            bissexto = DataUtil.anoIsBissexto(dataF[0]);
            for (let i = 1; i < dataF[1]; i++) 
                total += DataUtil.mesToDias(i, bissexto);
            total += dataI[2]; 
        } else {
            if (dataI[1] < dataF[1]) {
                //Ano inicial
                bissexto = DataUtil.anoIsBissexto(dataI[0]);
                for (let i = dataI[1]; i < dataF[1]; i++) 
                    total += DataUtil.mesToDias(i, bissexto);
                total -= dataI[2];
                total += dataF[2];  
            }
        }

        return total;
    }
}