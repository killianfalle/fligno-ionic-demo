import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, ViewController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the UpdateProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfilePage {

  data:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public authService: AuthProvider,
              private toastCtrl: ToastController,
              public view: ViewController,
              public alertCtrl: AlertController) {
    this.data = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ID: ' , this.data.id)
  }

  submitUpdate(data){
    this.authService.updateUser(data);
    this.view.dismiss();

    const toast = this.toastCtrl.create({
      message: 'Successfully updated post',
      duration: 3000
      });
    toast.present();
    // post.post=inputPost.postInp;
  }

  closeModal(){
    this.view.dismiss();
  }

}
