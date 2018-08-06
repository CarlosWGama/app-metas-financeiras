import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ObjetivoEdicaoPage } from './objetivo-edicao';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ObjetivoEdicaoPage,
  ],
  imports: [
    IonicPageModule.forChild(ObjetivoEdicaoPage),
    TranslateModule.forChild()

  ],
})
export class ObjetivoEdicaoPageModule {}
