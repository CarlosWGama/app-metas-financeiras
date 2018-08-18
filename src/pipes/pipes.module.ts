import { NgModule } from '@angular/core';
import { DataBrasilPipe } from './data-brasil/data-brasil';
import { DinheiroPipe } from './dinheiro/dinheiro';
@NgModule({
	declarations: [DataBrasilPipe,
    DinheiroPipe],
	imports: [],
	exports: [DataBrasilPipe,
    DinheiroPipe]
})
export class PipesModule {}
