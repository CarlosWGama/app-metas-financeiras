import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ObjetivoGeralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-objetivo-geral',
  templateUrl: 'objetivo-geral.html',
})
export class ObjetivoGeralPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ObjetivoGeralPage');
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
                {name: 'data', type:'date', placeholder:'Data da transação'},
                {name: 'data', type:'text', placeholder:'Categoria (Opcional): Ações, Poupança...'}
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

  remover() {
    this.alertCtrl.create({
      message: "Deseja remover essa transação?",
      buttons: [
        {text:"Cancelar", role: "cancel"},
        {text: "Ok", handler:() => {
          
        }}
      ]
    }).present();   
  }
}
