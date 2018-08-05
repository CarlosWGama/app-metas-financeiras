import { Component, Input, OnInit } from '@angular/core';

/**
 * @author Carlos W. Gama
 */
@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent implements OnInit {

  @Input()
  max: number;

  @Input()
  atual: number;

  porcentagem: number;

  cor: string;

  constructor() {
    
  }

  ngOnInit() {
    this.porcentagem = parseFloat(((this.atual*100)/this.max).toFixed(2));
    this.cor = 'red';
    if (this.porcentagem > 33) this.cor = 'yellow';
    if (this.porcentagem > 70) this.cor = 'green';
  }

}
