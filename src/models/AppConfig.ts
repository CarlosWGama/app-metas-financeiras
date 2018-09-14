
/**
 * Classe que gerencia as configurações gerais do Aplicativo
 */
export class AppConfig {

    static readonly VERSAO: string = '1.0.0';

    static readonly IDIOMAS_DISPONIVEIS: {lingua:string, sigla: string}[] = [
        {lingua: 'English', sigla: 'en'},
        {lingua: 'Português', sigla: 'pt'}
    ];
}