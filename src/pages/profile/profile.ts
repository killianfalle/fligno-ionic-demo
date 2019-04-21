import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { UpdateProfilePage } from '../update-profile/update-profile';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  data:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public authService: AuthProvider,
              private toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public modal:ModalController,
              public alertCtrl: AlertController) {
    this.data = navParams.get('data');
}

  ionViewDidLoad() {
    console.log(this.data);
  }

  updateProfile(){
    this.modal.create(UpdateProfilePage,{
      data: this.data,
    }).present();
  }

  logout(){
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

}
