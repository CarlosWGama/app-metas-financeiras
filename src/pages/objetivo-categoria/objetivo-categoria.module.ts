import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ObjetivoCategoriaPage } from './objetivo-categoria';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ObjetivoCategoriaPage,
  ],
  imports: [
    IonicPageModule.forChild(ObjetivoCategoriaPage),
    TranslateModule.forChild()

  ],
})
export class ObjetivoCategoriaPageModule {}
