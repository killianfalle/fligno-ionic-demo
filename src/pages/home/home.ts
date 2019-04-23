import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, 
              public authService: AuthProvider,
              public modalController: ModalController) {

  }

  guest(){
    console.log('Guest');
  }

  login(){
    this.navCtrl.push(LoginPage)
  }

  signUp(){
    this.navCtrl.push(RegisterPage)
  }
}
