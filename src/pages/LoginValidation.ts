import { TranslateService } from "@ngx-translate/core";
import { AlertController } from "ionic-angular";

/**
 * Validação de Login como firebase
 */
export abstract class LoginValidation {

    public constructor(protected translate: TranslateService, protected alertCtrl: AlertController) {
    }

    /**
   * Exibe uma mensagem de erro para o usuário
   * @param erro código do erro enviado pelo Firebase
   */
  protected chamarErro(erro): void {
 
    switch(erro) {
      case "auth/invalid-email": 
        this.translate.get("AUTH_INVALID_EMAIL").toPromise().then((msg) => { this.chamarAlerta(msg) });
        break;
      case "auth/user-not-found":
        this.translate.get("AUTH_NOT_FOUND").toPromise().then((msg) => { this.chamarAlerta(msg) });
        break; 
      case "auth/weak-password":
        this.translate.get("AUTH_WEAK_PASSWORD").toPromise().then((msg) => { this.chamarAlerta(msg) });
        break;
      case "auth/wrong-password":
        this.translate.get("AUTH_WRONG_PASSWORD").toPromise().then((msg) => { this.chamarAlerta(msg) });
        break;
      case "auth/email-already-in-use":
      this.translate.get("AUTH_ALREADY_IN_USE").toPromise().then((msg) => { this.chamarAlerta(msg) });
      break;
      case "auth/requires-recent-login":
      this.translate.get("AUTH_RECENT_LOGIN").toPromise().then((msg) => { this.chamarAlerta(msg) });
      break;
      default:
        this.translate.get("AUTH_FAIL").toPromise().then((msg) => { this.chamarAlerta(msg) });
    }
  }
  /**
   * Cria um Alerte padrão para envio de mensagens
   * @param mensagem mensagem a ser enviada para o alerta
   */
  protected chamarAlerta(mensagem: string): void {
    this.alertCtrl.create({
      message: mensagem,
      buttons: ["Ok"]
    }).present();
  }

}