import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
import { OpcoesObjetivoPage } from '../opcoes-objetivo/opcoes-objetivo';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar';

/**
 * @author Carlos W. Gama
 */

@IonicPage()
@Component({
  selector: 'page-objetivo',
  templateUrl: 'objetivo.html',
})
export class ObjetivoPage {

  meta: number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private popoverCtrl: PopoverController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ObjetivoPage');
  }

  opcoes(event, meta) {
    this.popoverCtrl.create(OpcoesObjetivoPage, {meta: meta}).present({ev: event});
  }

  adicionarTransacao() {
    this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: "Adicionar transação",
      inputs: [
        {name: 'deposito', type:'radio', value:'true', checked: true, label:'Deposito'},
        {name: 'deposito', type:'radio', value:'false', label:'Saque'}
      ], 
      buttons:[
        {text: "Cancelar", role: 'cancel'},
        {text: "Adicionar", handler: (data) => {

          let isDeposito = data;

          this.alertCtrl.create({
              enableBackdropDismiss: false,
              title: "Adicionar transação",
              inputs: [
                {name: 'valor', type:'number',  placeholder:'Valor da transação'},
                {name: 'data', type:'date', placeholder:'Data da transação'}
              ], 
              buttons:[
                {text: "Cancelar", role: 'cancel'},
                {text: "Adicionar", handler: (data) => {
                  
                }}
              ] 
            }).present();


        }}
      ] 
    }).present();
  }
}
