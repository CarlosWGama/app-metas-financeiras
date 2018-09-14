import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController, Events, ToastController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { AppConfig } from '../../models/AppConfig';
import { GooglePlus } from '@ionic-native/google-plus';
import { LoginValidation } from '../LoginValidation';

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
export class LoginPage extends LoginValidation {

  usuario: {login: string, senha: string} = {login: "", senha: ""};

  versao = AppConfig.VERSAO;

  transResetTitle: string;
  transResetMsg: string;
  transResetEmailEnviado: string;
  transBtnOk;
  transBtnCancelar;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
      alertCtrl: AlertController, private menuCtrl: MenuController,
    translate: TranslateService, private events: Events,
    private usuarioProvider: UsuarioProvider, private toastCtrl: ToastController,
    private googlePlus: GooglePlus, private plataform: Platform) {
      super(translate, alertCtrl);
  }
  
  /**
   * Configurações iniciais 
   */
  ionViewDidLoad() {
    this.translate.get("RESET_PASSWORD").toPromise().then((msg) => this.transResetTitle = msg );
    this.translate.get("MSG_RESET_PASSWORD").toPromise().then((msg) => this.transResetMsg = msg );
    this.translate.get("RESET_EMAIL_SEND").toPromise().then((msg) => this.transResetEmailEnviado = msg );
    this.translate.get("OK").toPromise().then((msg) => this.transBtnOk = msg );
    this.translate.get("CANCEL").toPromise().then((msg) => this.transBtnCancelar = msg );
    this.menuCtrl.enable(false);
  }

  /**
   * Metodo responsável por realizar o login com email e senha
   */
  logar(): void {
    firebase.auth().signInWithEmailAndPassword(this.usuario.login, this.usuario.senha).then(() => {
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
    firebase.auth().createUserWithEmailAndPassword(this.usuario.login, this.usuario.senha).then(() => {
      this.atualizarEmailMenu();
      let user = firebase.auth().currentUser;
      //this.usuarioProvider.cadastrar(user.uid, user.email);
      this.navCtrl.setRoot(HomePage);
    }).catch((error) => {
      console.log(error);
      this.chamarErro(error.code);
    });
  }

  /**
   * Método responsável por enviar um email para resetar a senha do usuário
   */
  resetarSenha() {
    this.alertCtrl.create({
      title: this.transResetTitle,
      inputs: [{name: 'email', placeholder: this.transResetMsg, type: 'email'}],
      enableBackdropDismiss: false,
      buttons: [
        {text: this.transBtnCancelar },
        {text: this.transBtnOk, handler: (data) => {
          firebase.auth().sendPasswordResetEmail(data.email).then(() => {
            this.toastCtrl.create({
              duration: 3000,
              message: this.transResetEmailEnviado
            }).present();
          }).catch((error) => {
            this.chamarErro(error.code);
          });
        }}
      ]
    }).present();
  }

  /**
   * Metodo responsável por realizar o login com o Google
   */
  loginGoogle() {

    //Login Nativo
    if (!this.plataform.is('core') && !this.plataform.is('mobileweb') && !document.URL.startsWith("http://metasfinanceiras.carloswgama.com.br")) {
      console.log("Login Nativo");
      this.googlePlus.login({
        'webClientId': '321841158263-5tu9202t26ac77bom3njsaqepf8e1c7r.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      }).then(res => {   
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then((result) => {
          //this.usuarioProvider.cadastrar(result.user.uid, result.user.email);
          this.atualizarEmailMenu();
          this.navCtrl.setRoot(HomePage);
        }).catch((error) => {
          this.chamarErro(error.code);
        }); 
      });

    } else { //Login pela web
      console.log("Login Web");
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
        //this.usuarioProvider.cadastrar(result.user.uid, result.user.email);
        this.atualizarEmailMenu();
        this.navCtrl.setRoot(HomePage);
      }).catch((error) => {
        console.log(error);
        this.chamarErro(error.code);
      }); 
    }
  }

  /**
   * Envia para o app.component o email atualizado do usuário
   */
  private atualizarEmailMenu() {
    this.events.publish("login", firebase.auth().currentUser.email, firebase.auth().currentUser.uid);
  }
}
