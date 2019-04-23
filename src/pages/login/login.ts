import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ListPage } from '../list/list';
import { Http } from '@angular/http';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: any;
  loginData = { email:'', password:'', role:''};
  data: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http,
              public authService: AuthProvider,
              private toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  myLogIn(){

    if(this.loginData.email == '' || this.loginData.password == ''){
      this.alertCtrls('Please fill in that is provided.');  
      return false;
    }else{
      this.authService.login(this.loginData).then((result) => {
        this.data = result;
        if (this.data.status=='ok'){
          localStorage.setItem('token', this.data.token);
  
          const alert = this.toastCtrl.create({
            message: 'Logged in as ' + this.loginData.email,
            duration: 1500
          });
  
          alert.present();
          console.log(this.data);
          this.navCtrl.setRoot(ListPage);
        } else {
          this.alertCtrls(this.data.message);  
        }
      }, (err) => {
        this.alertCtrls(err);
      });
    }
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  async alertCtrls(msg) {
    const alert = await this.alertCtrl.create({
      message: msg,
      buttons: ['Ok']
    });

    await alert.present();
  }


}
