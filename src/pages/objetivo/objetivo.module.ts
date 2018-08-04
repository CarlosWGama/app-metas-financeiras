import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular/umd';
import { ObjetivoPage } from './objetivo';

@NgModule({
  declarations: [
    ObjetivoPage,
  ],
  imports: [
    IonicPageModule.forChild(ObjetivoPage),
  ],
})
export class ObjetivoPageModule {}
