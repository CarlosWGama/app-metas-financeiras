import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare var firebase;

/**
* @author Carlos W. Gama
*/
@Injectable()
export class UsuarioProvider {

  private ref;

  constructor(public http: HttpClient) {
    this.ref = firebase.database().ref('usuarios');
  }

  /**
   * Cadastrar um novo usuário
   * @param uid 
   * @param email 
   */
  public cadastrar(uid: string, email: string) {
    this.ref.child(uid).set({
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

}
