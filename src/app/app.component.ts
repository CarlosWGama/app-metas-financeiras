import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Storage } from '@ionic/storage';


import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ConfiguracoesPage } from '../pages/configuracoes/configuracoes';
import { TranslateService } from '../../node_modules/@ngx-translate/core';
import { AppConfig } from '../models/AppConfig';
import { AjudaPage } from '../pages/ajuda/ajuda';
import { GooglePlus } from '@ionic-native/google-plus';
import { UsuarioProvider } from '../providers/usuario/usuario';


declare var firebase;
/**
 * @author Carlos W. Gama
 */
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  pageHome = HomePage;
  pageConfiguracoes = ConfiguracoesPage;
  pageAjuda = AjudaPage;
  
  versao = AppConfig.VERSAO;

  @ViewChild('nav')
  nav: NavController;

  email: string = "";

  constructor(platform: Platform, statusBar: StatusBar, 
    splashScreen: SplashScreen, screenOrientation: ScreenOrientation, 
    private translate: TranslateService, private storage: Storage, private events: Events,
    private googlePlus: GooglePlus, private usuarioProvider: UsuarioProvider) {

    //Escolhe o idioma
    this.storage.get('idioma').then((val) => {
      if (val == null) {
        let idioma = 'en';
        if (window.navigator.language != "undefined") {
          idioma = window.navigator.language;  
          idioma = idioma.split("-", 1)[0];
          //Não está nas disponiveis
          if (AppConfig.IDIOMAS_DISPONIVEIS.map((id) => id.sigla).indexOf(idioma) === -1) 
            idioma = 'en'; 
        }
        console.log("Idioma padrão: " + idioma);
        this.translate.setDefaultLang(idioma);
      } else
        if(val == 'pt-BR') val = 'pt'; //Ajustes
        this.translate.setDefaultLang(val);
    });

    //Se o usuário tiver logado vai para a Home Pagase
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.nav.setRoot(HomePage);
        this.email = firebase.auth().currentUser.email;
        this.usuarioProvider.cadastrar(firebase.auth().currentUser.uid, firebase.auth().currentUser.email);
      } else 
        this.nav.setRoot(LoginPage);
    });

    // Cordova Carregado, já pode usar recursos nativos
    platform.ready().then(() => {

      if (!platform.is('core') && !platform.is('mobileweb')) {  
        //Trava a camera em modo retrato
        screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
      }


      statusBar.styleDefault();
      splashScreen.hide();
    });

    //Atualiza o login o email sempre que houver um login
    this.events.subscribe("login", (email) => {
      this.email = email;
    });
  }

  /**
   * Abre uma pagina do Drawer Menu
   * @param page Pagina a ser aberta no menu
   */
  abrirPagina(page): void {
    this.nav.setRoot(page);
  }

  /**
   * Realiza o logout do aplicativo
   */
  sair(): void {
    this.googlePlus.logout();
    firebase.auth().signOut().then(() => {
      this.nav.setRoot(LoginPage);
    });
  }
}

