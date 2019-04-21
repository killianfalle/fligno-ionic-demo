import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Http } from '@angular/http';

import { LoginPage } from '../login/login';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  regData = { name:'', email:'', password:'', address:'', age:''};
  data: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http,
              public authService: AuthProvider,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  doReg(){
    if(this.regData.email == ''||this.regData.name == ''||this.regData.password == ''||this.regData.address == ''||this.regData.age == ''){
      const alert = this.alertCtrl.create({
        title: 'Ooops!',
        message: 'Please fill in everything.',
        buttons: ['Ok']
      });
      alert.present();
    }else{
      this.authService.register(this.regData).then((result) => {
        this.data = result;
        if (this.data.status=='ok'){
          this.navCtrl.push(LoginPage);
          this.alertCtrls('Register successful');  
        } else {
          this.alertCtrls(this.data.message);  
        }
        
      }, (err) => {
        this.alertCtrls(err);
      });
    }
  }

  async alertCtrls(msg) {
    const alert = await this.alertCtrl.create({
      message: msg,
      buttons: ['Ok']
    });

    await alert.present();
  }


}