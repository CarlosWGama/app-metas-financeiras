import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController, Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';

//Serve para chamar a API do Firebase 
declare var firebase;
/**
 * @author Carlos W. Gama
 *
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login: string = "";
  senha: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, 
      private alertCtrl: AlertController, private menuCtrl: MenuController,
    public translate: TranslateService, private events: Events) {
  }
  
  /**
   * Configurações iniciais 
   */
  ionViewDidLoad() {
    this.menuCtrl.enable(false);
  }

  /**
   * Metodo responsável por realizar o login com email e senha
   */
  logar(): void {
    firebase.auth().signInWithEmailAndPassword(this.login, this.senha).then(() => {
      this.atualizarEmailMenu();
      this.navCtrl.setRoot(HomePage);
    }).catch((error) => {
      this.chamarErro(error.code);
    }); 
  }

  /**
   * Metodo responsável por realizar o cadastro com email e senha
   */
  cadastrar(): void {
    //Realiza o cadastro no Firebase
    firebase.auth().createUserWithEmailAndPassword(this.login, this.senha).then(() => {
      this.atualizarEmailMenu();
      this.navCtrl.setRoot(HomePage);
    }).catch((error) => {
      this.chamarErro(error.code);
    });
  }

  /**
   * Metodo responsável por realizar o login com o Facebook
   */
  loginFacebook() {

  }

  /**
   * Metodo responsável por realizar o login com o Google
   */
  loginGoogle() {

  }

   /**
   * Exibe uma mensagem de erro para o usuário
   * @param erro código do erro enviado pelo Firebase
   */
  private chamarErro(erro): void {
 
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
      default:
        this.translate.get("AUTH_FAIL").toPromise().then((msg) => { this.chamarAlerta(msg) });
    }
  }
  /**
   * Cria um Alerte padrão para envio de mensagens
   * @param mensagem mensagem a ser enviada para o alerta
   */
  private chamarAlerta(mensagem: string): void {
    this.alertCtrl.create({
      message: mensagem,
      buttons: ["Ok"]
    }).present();
  }

  /**
   * Envia para o app.component o email atualizado do usuário
   */
  private atualizarEmailMenu() {
    this.events.publish("login", firebase.auth().currentUser.email);
  }
}
