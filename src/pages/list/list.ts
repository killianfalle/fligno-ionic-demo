import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  data: any;
  name: string;
  email: string;
  age: string;
  avatar: string;
  id:number;
  address: string;

  postData={post:''}
  post: any=[];
  postedByEmail: any;
  myPost:any; 

  postCont: any=[];
  pastname: any;

  public toggle: boolean = false;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public authService: AuthProvider,
              private toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {

                for (let i = 0; i < 10; i++) {
                  this.post.push( this.post.length );
                }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
    this.doGetUser()
    this.getPosts()
  }

  //LOAD MORE DATA
  getPosts(){
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Please Wait...'
    });
      loading.present();
    this.authService.getData()
    .subscribe( result => {
      if (result.json()){
        this.post = result.json();
        
        if(this.post != null){
          loading.dismiss();    
        }else{
          this.alertCtrls('Could not fetch data.');
        }
     } else {
        this.alertCtrls('Server error');
     }      
    });
  }

  //VIEW POST
  viewPost(post, index){
    //VIEW, UPDATE, DELETE
    if(this.email == post.postedByEmail){
      let alert = this.alertCtrl.create({
        message: '"'+post.post+'"',
        buttons: [
          {
            text: 'Delete',
            handler: () => {
              this.deleteP(post, index);
            }
          },
          {
            text: 'Update',
            handler: () => {
              let alert = this.alertCtrl.create({
                title: "What's on your mind?",
                inputs: [
                  {
                    name: 'postInp',
                    placeholder: post.post
                  },
                ],
                buttons: [
                  {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                      const toast = this.toastCtrl.create({
                        message: 'Cancelled!',
                        duration: 3000
                        });
                      toast.present();
                    }
                  },
                  {
                    text: 'Post',
                    handler: (inputPost) => {
                      this.authService.updatePost(inputPost.postInp, post.id);
                      post.post=inputPost.postInp;

                      const toast = this.toastCtrl.create({
                        message: 'Successfully updated post',
                        duration: 3000
                        });
                      toast.present();
                    }
                  },
                ]
              });
              alert.present();
            }
          },
        ]
      });
      alert.present();
    
    //VIEW ONLY
    }else{
      let alert = this.alertCtrl.create({
        message: '"'+post.post+'"',
        buttons: [
          {
            text: 'Done',
            handler: () => {
              console.log('done');
            }
          },
        ]
      });
      alert.present();
    }
  }

  create(post){
    let i = {'post': post , 'postedByEmail': this.email, 'postedByName': this.name};
    this.authService.postCreate(i).then((result) => {
    this.data = result;

      if (this.data.postedByEmail == this.email){
        //push the new data to mysql
        this.post.push(i);
        //to load again the data from mysql
        this.getPosts();
        
        this.successAlertCtrls(i.post);  
      } else {
        this.alertCtrls('There was an Error');  
      }
    }, (err) => {
      this.alertCtrls(err);
    });
    this.postData.post='';
  }

  // update(post){
  //   console.log(post);
  //   let result = this.authService.updatePost(post.id);
  //   console.log(result);
  //   this.toggle = false;
  // }

  edit(post){
    console.log(post);
    this.toggle = true;
    this.postData.post = post.post;
  }

  deleteP(post, index){
    let alert = this.alertCtrl.create({
      title: 'Confirm delete item',
      message: 'Are you sure you want to permanently delete this post?',
      buttons: [
          {
            text: 'Yes',
              handler: () => {
                this.post.splice(index, 1)
                let result = this.authService.deletePost(post.id);
                console.log(result);

                const toast = this.toastCtrl.create({
                  message: 'Successfully deleted post',
                  duration: 3000
                  });
                toast.present();
              }
          },
          {
              text: 'No',
              handler: () => {
                const toast = this.toastCtrl.create({
                  message: 'Cancelled!',
                  duration: 3000
                  });
                toast.present();
              }
          }
        ]
      })
    alert.present();
  }

  doGetUser() {
    this.authService.getuser()
    .subscribe( result => {
      if (result.json()){
        this.data = result.json();
     } else {
        this.alertCtrls("Invalid credentials. Try with another username or password.");
     }      
      console.log('ID : ',this.data);
      this.id = this.data.id;
      this.email = this.data.email;
      this.name = this.data.name;
      this.avatar = this.data.avatar;
    }, err => {
      this.alertCtrls(err);
    });
  }

  async alertCtrls(msg) {
    const alert = await this.alertCtrl.create({
      title: 'Warning!',
      message: msg,
      buttons: ['Ok']
    });
    await alert.present();
  }

  async successAlertCtrls(msg) {
    const alert = await this.alertCtrl.create({
      title: 'Successfully Posted!',
      message: msg,
      buttons: ['Ok']
    });
    await alert.present();
  }

  goToProfile(){
    console.log(this.data)
    this.navCtrl.push(ProfilePage,{
      data: this.data
    })
  }

  selectOption(post, index){
    let alert = this.alertCtrl.create({
      title: 'Select an Option',
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            this.deleteP(post, index);
          }
        },
        {
          text: 'Update',
          handler: () => {
            let alert = this.alertCtrl.create({
              title: "What's on your mind?",
              inputs: [
                {
                  name: 'postInp',
                  placeholder: post.post
                },
              ],
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => {
                    const toast = this.toastCtrl.create({
                      message: 'Cancelled!',
                      duration: 3000
                      });
                    toast.present();
                  }
                },
                {
                  text: 'Update',
                  handler: (inputPost) => {
                    this.authService.updatePost(inputPost.postInp, post.id);
                    //To update directly to the list
                    post.post=inputPost.postInp;

                    const alert = this.alertCtrl.create({
                      title: 'Successfully Posted!',
                      message: "'"+ inputPost.postInp + "'",
                      buttons: ['Ok']
                    });
                   alert.present();
                  }
                },
              ]
            });
            alert.present();
          }
        },
      ]
    });
    alert.present();
  }

  createByFab(post){
    let alert = this.alertCtrl.create({
      title: "What's on your mind?",
      inputs: [
        {
          name: 'postInp',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            const toast = this.toastCtrl.create({
              message: 'Cancelled!',
              duration: 3000
              });
            toast.present();
          }
        },
        {
          text: 'Post',
          handler: (inputPost) => {
            post = inputPost.postInp
            this.create(post);
          }
        },
      ]
    });
    alert.present();
  }

  logout(){
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

}
