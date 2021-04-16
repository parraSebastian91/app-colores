import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Color } from '../interfaces/color'

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  url = "";
  constructor(private http: HttpClient) {
    this.url = environment.servieUrl;
  }

  async getColorList(limite,pagina){
    const path = `${this.url}/colores?limite=${limite}&pagina=${pagina}&doc=json`;
    const request = await this.http.get(path).toPromise();
    return request;
  }

  setColor(color: Color){
    const path = `${this.url}/colores`;
    const request =  this.http.post(path,color).toPromise();
    return request;
  }

  updColor(color: Color){
    const path = `${this.url}/colores/${color.id}`;
    const request =  this.http.put(path,color).toPromise();
    return request;
  }

  deleteColor(color: Color){
    const path = `${this.url}/colores/${color.id}`;
    const request =  this.http.delete(path).toPromise();
    return request;
  } 

}
