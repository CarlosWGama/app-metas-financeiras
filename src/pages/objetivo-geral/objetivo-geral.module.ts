import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ObjetivoGeralPage } from './objetivo-geral';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ObjetivoGeralPage,
  ],
  imports: [
    IonicPageModule.forChild(ObjetivoGeralPage),
    PipesModule
  ],
})
export class ObjetivoGeralPageModule {}
