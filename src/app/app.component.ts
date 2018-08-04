import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular/umd';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ConfiguracoesPage } from '../pages/configuracoes/configuracoes';
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

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
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

