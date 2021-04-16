import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from './../../environments/environment';
import { Usuario } from '../interfaces/usuario';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

  usuario: Usuario;

  constructor(
    private authService: AuthService
  ) {
    this.usuario = environment.credenciales;
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let request = req;
    let token = this.authService.getTokenSession();
    request = req.clone({
      setHeaders: {
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(request);

  }
}
