import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpcoesObjetivoPage } from './opcoes-objetivo';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OpcoesObjetivoPage,
  ],
  imports: [
    IonicPageModule.forChild(OpcoesObjetivoPage),
    TranslateModule.forChild()

  ],
})
export class OpcoesObjetivoPageModule {}
