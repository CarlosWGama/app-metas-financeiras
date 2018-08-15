import { Component, OnInit, OnChanges } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { Meta } from '../../models/Meta';

/**
 * @author Carlos W. Gama
 */

@IonicPage()
@Component({
  selector: 'page-objetivo-geral',
  templateUrl: 'objetivo-geral.html',
})
export class ObjetivoGeralPage {

  meta: Meta = new Meta();

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private alertCtrl: AlertController, private events: Events) {
  }

  ionViewDidLoad() {    
    //Ajuste de Bug do Ionic
    this.events.subscribe("meta:inicia", (meta) => {
      this.meta.initialize(meta);
      console.log("Meta iniciada em Objetivo Geral");
    });
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
