import { Component, OnInit } from '@angular/core';

//Servicio que se va ha comunicar con backend con los datos que se recogen en el JSON
import { UserService } from '../../services/user.service';

// Para que cuando nos registremos nos lleve luego a la sección de registrar tarea
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerData: any;
  message: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerData = {};
    this.message = '';
  }

  ngOnInit(): void {}

  // No es necesario el const para declarar los métodos

  // Aquí se va ha capturar la información que viene del formulario en JSON y luego la envíe al servicio
  // Vamos a validar que lleguen todos los datos necesarios del formulario
  registerUser() {
    if (
      !this.registerData.name ||
      !this.registerData.email ||
      !this.registerData.password
    ) {
      console.log('Failed process: Incomplete data');
      this.message = 'Failed process: Incomplete data';
      this.openSnackBarError();
      this.registerData = {}; // Para limpiar nuevamente el JSON
    } else {
      this._userService.registerUser(this.registerData).subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem('token', res.jwtToken);
          // Para redireccionar automáticamente a la URL saveTask
          this._router.navigate(['/saveTask']);
          this.message = 'Successfull user registration';
          this.openSnackBarSuccessfull();
          this.registerData = {};
        },
        (err) => {
          console.log(err);
          this.message = err.console.error; //Aquí se captura el mensaje de error del backend
          this.openSnackBarError();
        }
      );
    }
  }

  // Para la barra de los mensajes que indican que todo está bien
  openSnackBarSuccessfull() {
    this._snackBar.open(this.message, 'X', {
      // X para cerrar manual la ventana emergente
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue'], // Los estilos definidos en frontend\src\styles.css
    });
  }

  // Para los mensajes de error
  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'],
    });
  }
}
