import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPageModule } from '../pages/login/login.module';
import { ConfiguracoesPageModule } from '../pages/configuracoes/configuracoes.module';
import { ObjetivoPageModule } from '../pages/objetivo/objetivo.module';
import { ObjetivoEdicaoPageModule } from '../pages/objetivo-edicao/objetivo-edicao.module';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    ConfiguracoesPageModule,
    ObjetivoPageModule,
    ObjetivoEdicaoPageModule,
    ComponentsModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
