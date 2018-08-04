import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular/umd';
import { ConfiguracoesPage } from './configuracoes';

@NgModule({
  declarations: [
    ConfiguracoesPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfiguracoesPage),
  ],
})
export class ConfiguracoesPageModule {}
