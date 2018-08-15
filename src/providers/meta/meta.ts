import { Injectable, ViewChild } from '@angular/core';
import { Meta } from '../../models/Meta';
import { Usuario } from '../../models/Usuario';
import { Transacao } from '../../models/Transacao';

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
   * Remove a meta informada
   * @param meta 
   */
  removerMeta(meta:Meta) {
    let usuarioID = firebase.auth().currentUser.uid;
    let email = firebase.auth().currentUser.email;
    let metaID = meta.id;

    //Atualiza membros
    let novosMembros = [];
    meta.membros.forEach((membro: Usuario) => {
      if (membro.uid != usuarioID) 
        novosMembros.push(membro)
    });
    
    if (novosMembros.length > 0) {
      meta.membros = novosMembros;

      if (meta.transacoes != undefined) {
        //Atualiza transações
        let total = 0;
        let novasTransacoes: Transacao[] = [];
        meta.transacoes.forEach((transacao) => {
          if (transacao.usuario != email) {
            novasTransacoes.push(transacao);
            total += (transacao.deposito ? transacao.valor : -transacao.deposito);
          }
        });
          
        meta.transacoes = novasTransacoes;
        meta.acumulado = total;
      }
    } else 
      meta = null; //Não tem nenhum membro
    
    //Atualiza meta
    this.ref.child(metaID).set(meta);

    //Desvincula
    this.refUM.child(usuarioID).child(metaID).set(null);
  }

  /**
   * Remove uma transação existente
   * @param meta 
   * @param transacao 
   */
  removerTransacao(meta: Meta, transacao: Transacao): Meta {

    //Atualiza transações
    let total = 0;
    let novasTransacoes: Transacao[] = [];
    meta.transacoes.forEach((t) => {
      if (t.id != transacao.id) {
        novasTransacoes.push(t);
        total += (t.deposito ? t.valor : -t.deposito);
      }
    });
      
    meta.transacoes = novasTransacoes;
    meta.acumulado = total;

    this.ref.child(meta.id).set(meta);

    return meta;
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
              let novaMeta:Meta = new Meta();
              novaMeta.initialize(res.val());
              metas.push(novaMeta);
            })
            return metas;
          });
        } else 
          return [];
    });
  }

}
