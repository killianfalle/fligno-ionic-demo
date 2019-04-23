import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { UpdateProfilePage } from '../update-profile/update-profile';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  apiUrl: string = 'http://f34ea005.ngrok.io/';
  data:any;
  base64img: string;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public authService: AuthProvider,
              private toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public modal:ModalController,
              private camera: Camera,
              private transfer: FileTransfer,
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

  openCamera(){
    const options:CameraOptions={
      quality:70,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((ImageData=>{
       this.base64img="data:image/jpeg;base64,"+ImageData;
    }),error=>{
      console.log(error);
    })
  }

  openGallery(){
    const options:CameraOptions={
      quality:70,
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }
    this.camera.getPicture(options).then((ImageData=>{
       this.base64img="data:image/jpeg;base64,"+ImageData;
    }),error=>{
      console.log(error);
    })
  }

  clear(){
    this.base64img='';
  }

  upload(){
      let loader = this.loadingCtrl.create({
        content: "Uploading...."
      });
      loader.present();
  
      const fileTransfer: FileTransferObject = this.transfer.create();
  
      let options: FileUploadOptions = {
        fileKey: "photo",
        fileName: "test3.jpg",
        chunkedMode: false,
        mimeType: "image/jpeg",
        headers: {}
      }
  
      fileTransfer.upload(this.base64img, this.apiUrl+'api/login/avatar' , options).then(data => {
        alert(JSON.stringify(data));
        loader.dismiss();
      }, error => {
        alert("error");
        alert("error" + JSON.stringify(error));
        loader.dismiss();
      });
  
  }

  logout(){
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

}
