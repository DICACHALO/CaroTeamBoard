import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private env: string;
  constructor(private _http: HttpClient, private _router: Router) {
    this.env = environment.APP_URL;
  }

  registerUser(user: any) {
    // user es el JSON con name, email, password y es lo que va a ir en el body
    // Se indica que se va ha consumir una API con servicio POST
    // this.env = http://localhost:3001/api/
    return this._http.post<any>(this.env + 'user/registerUser', user);
  }

  login(user: any) {
    return this._http.post<any>(this.env + 'user/login', user);
  }

  // Para saber si un uusario está logueado o no
  loggedIn() {
    //Validación solo cuando quiero saber si es true o false
    return !!localStorage.getItem('token');
  }

  // Para obtener el token que está guardado
  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
