import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ObjetivoGeralPage } from './objetivo-geral';
import { PipesModule } from '../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ObjetivoGeralPage,
  ],
  imports: [
    IonicPageModule.forChild(ObjetivoGeralPage),
    PipesModule,
    TranslateModule.forChild()

  ],
})
export class ObjetivoGeralPageModule {}
