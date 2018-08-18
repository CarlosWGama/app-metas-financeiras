import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ObjetivoCategoriaPage } from './objetivo-categoria';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ObjetivoCategoriaPage,
  ],
  imports: [
    IonicPageModule.forChild(ObjetivoCategoriaPage),
    TranslateModule.forChild(),
    PipesModule

  ],
})
export class ObjetivoCategoriaPageModule {}
