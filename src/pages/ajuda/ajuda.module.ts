import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjudaPage } from './ajuda';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AjudaPage,
  ],
  imports: [
    IonicPageModule.forChild(AjudaPage),
    TranslateModule.forChild()
  ],
})
export class AjudaPageModule {}
