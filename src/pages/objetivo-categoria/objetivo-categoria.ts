import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Meta } from '../../models/Meta';
import { Chart } from 'chart.js';

/**
 * @author Carlos W. Gama
 */

@IonicPage()
@Component({
  selector: 'page-objetivo-categoria',
  templateUrl: 'objetivo-categoria.html',
})
export class ObjetivoCategoriaPage {

  @ViewChild('categoriasGrafico')
  grafico: ElementRef;

  meta: Meta = new Meta();

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private events: Events) {
  }

  ionViewDidLoad() {
    this.meta.initialize(this.navParams.get("meta"));
    console.log(this.meta);
    this.events.subscribe("meta:atualiza", (meta) => {
      this.meta.initialize(meta);
      this.criarGrafico();
    });
    this.criarGrafico();
    console.log('ionViewDidLoad ObjetivoCategoriaPage');
  }

  private criarGrafico() {
    console.log("Teste");
    console.log(this.grafico);

    let data = {
      labels:[], 
      datasets: [{
        data:[],
        backgroundColor: []
      }]
    }
    
    this.meta.categorias.forEach((cat) => {
      data.labels.push(cat.categoria);
      data.datasets[0].data.push(cat.total);
      data.datasets[0].backgroundColor.push(this.randomColor());
    });

    this.grafico = new Chart(this.grafico.nativeElement, {
        type: 'doughnut',
        data: data,
        options: {
          tooltips: {enabled: true},
          animation: {animateRotate: false},
          cutoutPercentage: 65
        }
    });
  }

  private randomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) 
        color += letters[Math.floor(Math.random() * 16)];
      return color;
  }
}
