import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, ViewController } from 'ionic-angular';
import { CrudProvider } from '../../providers/crud/crud';
import { Camera, CameraOptions } from '@ionic-native/camera';
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
  base64Image:string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public crudService: CrudProvider,
              private toastCtrl: ToastController,
              public view: ViewController,
              private camera: Camera,
              public authService: AuthProvider,
              public alertCtrl: AlertController) {
    this.data = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ID: ' , this.data.id)
  }

  openCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

  openGallery(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
    this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

  submitUpdate(data){
    this.crudService.updateUser(data);
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
