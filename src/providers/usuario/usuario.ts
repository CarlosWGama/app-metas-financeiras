import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { FCM } from '@ionic-native/fcm';

declare var firebase;

/**
* @author Carlos W. Gama
*/
@Injectable()
export class UsuarioProvider {

  private ref;

  constructor(public http: HttpClient, private fcm: FCM) {
    this.ref = firebase.database().ref('usuarios');
  }

  /**
   * Cadastrar um novo usuário
   * @param uid 
   * @param email 
   */
  public cadastrar(uid: string, email: string) {
    this.ref.child(uid).set({
      "uid": uid,
      'email':  email,
      'cadastro': new Date().toISOString().slice(0, 10)
    });
  }

  /**
   * Checa se um usuário existe, retorna a consulta
   */
  public exist(email: string): Promise<boolean> {
    return new Promise<boolean>((resolve, erro) => {
      resolve(this.ref.orderByChild('email').equalTo(email).once('value').then((snapshot) =>  {
        return (snapshot.exists());
      }));
    });
  }

  /**
   * Retorna um usuário caso ele exista
   * @param email 
   */
  public getUsuarioByEmail(email: string): Promise<Usuario> { 
    return this.ref.orderByChild('email').equalTo(email).once('value').then((snapshot) =>  {
      if (snapshot.exists()) {
        let chaves = Object.keys(snapshot.val());
        return snapshot.val()[chaves[0]] as Usuario;
      }
        
      return null;
    });
  }

  /**
   * Atualiza o token do usuário
   * @param uid 
   * @param token 
   */
  public atualizarDevideToken(uid: string) {
    this.fcm.getToken().then(token => {
      this.ref.child(uid).child('device_token').set(token);
    });
  }



}
