import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPageModule } from '../pages/login/login.module';
import { ConfiguracoesPageModule } from '../pages/configuracoes/configuracoes.module';
import { ObjetivoPageModule } from '../pages/objetivo/objetivo.module';
import { ObjetivoEdicaoPageModule } from '../pages/objetivo-edicao/objetivo-edicao.module';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '../../node_modules/@angular/common/http';
import { createTranslateLoader } from '../util/createTranslateLoader';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { MetaProvider } from '../providers/meta/meta';
import { AdMobFree } from '@ionic-native/admob-free';
import { AjudaPageModule } from '../pages/ajuda/ajuda.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    LoginPageModule,
    ConfiguracoesPageModule,
    ObjetivoPageModule,
    ObjetivoEdicaoPageModule,
    ComponentsModule,
    PipesModule,
    HttpClientModule,
    AjudaPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    UsuarioProvider,
    MetaProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    MetaProvider,
    AdMobFree
  ]
})
export class AppModule {}
