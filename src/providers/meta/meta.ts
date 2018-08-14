import { Injectable, ViewChild } from '@angular/core';
import { Meta } from '../../models/Meta';

declare var firebase;
/**
 * @author Carlos W. Gama
 * 
*/
@Injectable()
export class MetaProvider {

  private ref;

  constructor() {
    this.ref = firebase.database().ref('metas');
  }

  /**
   * Cadastrar uma nova meta
   * @param meta Classe Meta
   */
  cadastrar(meta: Meta) {
    let key = this.ref.push().key;
    meta.id = key;
    this.ref.child(key).set(meta);
  }

  /**
   * Atualiza uma lista existente
   * @param meta Classe Meta
   */
  atualizar(meta: Meta) {
    this.ref.child(meta.id).set(meta);
  }

}
