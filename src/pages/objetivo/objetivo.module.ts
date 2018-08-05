import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ObjetivoPage } from './objetivo';
import { PipesModule } from '../../pipes/pipes.module';
import { OpcoesObjetivoPageModule } from '../opcoes-objetivo/opcoes-objetivo.module';

@NgModule({
  declarations: [
    ObjetivoPage,
  ],
  imports: [
    IonicPageModule.forChild(ObjetivoPage),
    PipesModule,
    OpcoesObjetivoPageModule
  ],
})
export class ObjetivoPageModule {}
