import { Component } from '@angular/core';
import { NavController, AlertController, MenuController, LoadingController, Platform } from 'ionic-angular';
import { ObjetivoEdicaoPage } from '../objetivo-edicao/objetivo-edicao';
import { ObjetivoPage } from '../objetivo/objetivo';
import { Meta } from '../../models/Meta';
import { MetaProvider } from '../../providers/meta/meta';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';
import { AdMobFree } from '@ionic-native/admob-free';

declare var firebase;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  metas: Meta[] = [];


  totalInvestido = 0;
  totalAlcancar:number = 0;
  porcentagem = 0;
  totalMetas = 0;
  metasAlcancada = 0;

  //Conteudos de tradução
  transBtnCancelar;
  transBtnOK;
  transMsgDeletar;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, 
    private menuCtrl: MenuController, private metaProvider: MetaProvider,
    private translate: TranslateService, private loadCtrl: LoadingController, 
    private admobFree: AdMobFree, private plataform: Platform) {

  }

  ionViewDidLoad() {
    if (!this.plataform.is('core') && !this.plataform.is('mobileweb')) {
      //Propaganda
      this.admobFree.banner.config({
        isTesting: false,
        autoShow: true,
        id: 'ca-app-pub-8890411738087560/2702346234'
      });
      this.admobFree.banner.prepare();
    }
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.atualizaMetas();
    this.translate.get("CANCEL").toPromise().then((msg) => this.transBtnCancelar = msg);
    this.translate.get("OK").toPromise().then((msg) => this.transBtnOK = msg);
    this.translate.get("REMOVE_GOAL").toPromise().then((msg) => this.transMsgDeletar = msg);
  }

  /**
   * Aatualiza a lista de metas sempre que é chamado
   */
  private atualizaMetas() {
    let loading = this.loadCtrl.create({enableBackdropDismiss: true});
    loading.present();

    this.metaProvider.buscarTodos(firebase.auth().currentUser.uid).then((metas) => {
      this.metas = metas;
      this.totalMetas = 0;
      this.metasAlcancada = 0;
      this.totalAlcancar = 0;
      this.totalInvestido = 0;
      
      //Recupera os dados a serem preechidos
      this.metas.forEach((meta: Meta) => {
        console.log(meta);
        this.totalAlcancar += (meta.objetivo);
        this.totalInvestido += (meta.acumulado);
        this.totalMetas++;
        if (meta.acumulado >= meta.objetivo)
          this.metasAlcancada++;
      });

      if (this.totalAlcancar > 0)
        this.porcentagem = parseInt(((this.totalInvestido * 100) / this.totalAlcancar).toFixed(0));
      
        loading.dismiss();
    });
  }

  /**
   * Abre uma meta
   * @param meta 
   */
  abrir(meta) {
    this.navCtrl.push(ObjetivoPage, {meta: meta});
  }

  /**
   * Cria uma nova Meta
   */
  novo() {
    this.navCtrl.push(ObjetivoEdicaoPage, {meta: new Meta()});
  }

  /**
   * Edita a meta existente
   */
  editar(meta) {
    this.navCtrl.push(ObjetivoEdicaoPage, {meta: meta});
  }

  /**
   * Apaga uma meta do usuário
   */
  remover(meta) { 
      this.alertCtrl.create({
        message: this.transMsgDeletar,
        buttons: [
          {text: this.transBtnCancelar, role: 'cancel'},
          {text: this.transBtnOK, handler:() => {
            this.metaProvider.removerMeta(meta);
            this.atualizaMetas();
          }}
        ]
      }).present();
     
  }

}
