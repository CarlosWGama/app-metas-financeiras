import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular/umd';
import { DataUtil } from '../../util/DataUtil';

@IonicPage()
@Component({
  selector: 'page-objetivo-edicao',
  templateUrl: 'objetivo-edicao.html',
})
export class ObjetivoEdicaoPage {

  meta: number = 0;

  prazo: boolean = false;

  membros: string[] = [];

  dataFinal: string = "";
  total: number = 100;
  valorAtual: number = 0; 
  valorRecomendado: number = 0;
  frequencia:number = 1; 

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private toastCtrl: ToastController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.meta = this.navParams.get("meta") as number;
    console.log('ionViewDidLoad ObjetivoEdicaoPage');
  }

  adicionarMembro() {
    this.alertCtrl.create({
      title:"Adicionar membro",
      message: "Apenas usuários do Minhas Metas Financeiras podem ser adicionados. Uma vez adicionado, apenas o próprio usuário poderá pedir para sair da meta",
      inputs:[
        {name: "email", type:"email", placeholder: "Informe o email do usuário"}
      ], 
      buttons: [
        {text: "Cancelar", role: "cancel"},
        {text: "Adicionar", handler:(dados) => {
          if (dados.email == "") {
            this.alertCtrl.create({
              title: "Erro",
              message: "Adicione um email",
              buttons: ["Ok"]
            }).present();
          } else {
            this.membros.push(dados.email);
          }
        }}
      ]

    }).present();
  }

  recomendado() {
    let resta = this.total - this.valorAtual;
    if (resta <= 0)
      this.valorRecomendado = 0;
    else {
      if (this.dataFinal != "") {
        let dias = DataUtil.diferencaDias(this.dataFinal);

        let valorAoDia = parseFloat((resta/dias).toFixed(2));
        if (this.frequencia == 1) this.valorRecomendado = valorAoDia;
        if (this.frequencia == 2) this.valorRecomendado = valorAoDia * 7;
        if (this.frequencia == 3) this.valorRecomendado = valorAoDia * 30;
        if (this.frequencia == 4) this.valorRecomendado = valorAoDia * 30 * 6;
        if (this.frequencia == 5) this.valorRecomendado = valorAoDia * 365;
      }
    }
  }

  salvar() {
    this.toastCtrl.create({
      message: "Meta salva com sucesso",
      duration: 3000
    }).present();
    this.navCtrl.pop();
  }


}
