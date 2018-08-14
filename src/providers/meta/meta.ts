import { Injectable, ViewChild } from '@angular/core';
import { Meta } from '../../models/Meta';
import { Usuario } from '../../models/Usuario';

declare var firebase;
/**
 * @author Carlos W. Gama
 * 
*/
@Injectable()
export class MetaProvider {

  private ref;
  /**
   * Referencia ded usuários com suas meetas
   */
  private refUM;

  constructor() {
    this.ref = firebase.database().ref('metas');
    this.refUM = firebase.database().ref('metas-usuarios');
  }

  /**
   * Cadastrar uma nova meta
   * @param meta Classe Meta
   */
  cadastrar(meta: Meta) {
    let key = this.ref.push().key;
    meta.id = key;
    this.vinculaUsuario(meta);
    this.ref.child(key).set(meta);
  }

  /**
   * Vincula a meta aos usuários
   * @param meta 
   */
  private vinculaUsuario(meta: Meta) {
    meta.membros.forEach((membro: Usuario) => {
      this.refUM.child(membro.uid).child(meta.id).set(true);
    });
  } 

  /**
   * Atualiza uma lista existente
   * @param meta Classe Meta
   */
  atualizar(meta: Meta) {
    this.vinculaUsuario(meta);

    this.ref.child(meta.id).set(meta);
  }

  /**
   * Recupera todas as metas do usuário
   */
  buscarTodos(uid: string) {
    return this.refUM.child(uid).once('value').then((snapshot) => {
               
        if (snapshot.exists()) {
          let promises = [];

          //Junta todas as promises
          Object.keys(snapshot.val()).forEach((metaID) => {
            promises.push(this.ref.child(metaID).once('value'));
          });

          //Executa todoas de uma vez
          return Promise.all(promises).then((snapshots) => {
            let metas: Meta[] = [];
            snapshots.forEach((res) => {
              metas.push(res.val() as Meta);
            })
            return metas;
          });
        } else 
          return [];
    });
  }

}
