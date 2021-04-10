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

}
