import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ConfiguracoesPage } from '../pages/configuracoes/configuracoes';
import { TranslateService } from '../../node_modules/@ngx-translate/core';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  paginas: {descricao: string, icon: string, page: any}[] = [
    {descricao: 'Dashboard', icon: 'checkbox', page: HomePage},
    {descricao: 'Configurações', icon: 'settings', page: ConfiguracoesPage}
  ];


  @ViewChild('nav')
  nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, 
    splashScreen: SplashScreen, screenOrientation: ScreenOrientation, 
    private translate: TranslateService, private storage: Storage) {

    //Escolhe o idioma
    this.storage.get('idioma').then((val) => {
      if (val == null)
        this.translate.setDefaultLang('en');
      else
        this.translate.setDefaultLang(val);
    });
    

    //Trava a camera em modo retrato
    screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  abrirPagina(page) {
    this.nav.setRoot(page);
  }

  sair() {
    this.nav.setRoot(LoginPage);
  }
}

