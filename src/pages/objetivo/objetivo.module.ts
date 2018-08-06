import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ObjetivoPage } from './objetivo';
import { PipesModule } from '../../pipes/pipes.module';
import { OpcoesObjetivoPageModule } from '../opcoes-objetivo/opcoes-objetivo.module';
import { ObjetivoGeralPageModule } from '../objetivo-geral/objetivo-geral.module';
import { ObjetivoCategoriaPageModule } from '../objetivo-categoria/objetivo-categoria.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ObjetivoPage,
  ],
  imports: [
    IonicPageModule.forChild(ObjetivoPage),
    OpcoesObjetivoPageModule,
    ObjetivoGeralPageModule,
    ObjetivoCategoriaPageModule,
    TranslateModule.forChild()

  ],
})
export class ObjetivoPageModule {}
