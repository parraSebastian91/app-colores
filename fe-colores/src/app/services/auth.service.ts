import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Usuario } from '../interfaces/usuario'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = '';
  credenciales: Usuario;
  constructor(private http: HttpClient) {
    this.url = environment.servieUrl;
    this.credenciales = environment.credenciales;
  }

   createSession(){
    const resp = new Promise(async (resolve,reject)=>{
      let token = this.getTokenSession();
      if(!token){
        token = await this.getToken(this.credenciales).then((t: any) => t.token);
        localStorage.setItem('TOKEN',token)
      }
      resolve(token)
    })
    return resp;
  }

  async getToken(usuario: Usuario) {
    const pathValidation = `${this.url}/auth/getToken`;
    const request = await this.http.post(pathValidation, usuario).toPromise();
    return request;
  }

  getTokenSession() {
    let token = localStorage.getItem('TOKEN');
    if (token) {
      return token
    } else {
      return undefined;
    }
  }

}
