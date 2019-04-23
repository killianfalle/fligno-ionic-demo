import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HTTP } from '@ionic-native/http';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  apiUrl: string = 'http://f34ea005.ngrok.io/';
  base64img:string='';
  body: object=[];

  constructor(public http: Http) {
    // this.http.get('https://jsonplaceholder.typicode.com/todos/1',{},{})
    // .then( response => {
    //   console.log(response.data)
    // })
  }

  //LOGIN USER
  login(credentials) {
    return new Promise((resolve, reject) => {
      
      let headers = new Headers({
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'application/x-www-form-urlencoded'
      });
      let params = 'email='+credentials.email+'&password='+credentials.password;
      //headers.append('Content-Type', 'application/json');

      //this.http.post(this.apiUrl+'login', JSON.stringify(credentials), {headers: headers})
      this.http.post(this.apiUrl+'api/login', params, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  //REGISTER USER
  register(data) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let params = 'name='+data.name+'&email='+data.email+'&password='+data.password+
        '&address='+data.address+'&age='+data.age

        this.http.post(this.apiUrl+'api/register', params, {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  uploadImage(urlImage){
    let headers = new Headers();
    headers.append('file', urlImage);
    
    this.http.post(this.apiUrl+'api/login/avatar', {headers: headers})
    .subscribe(res => {
      console.log(res)
    }, (err) => {
      console.log(err)
    });
  }

  setImage(img){
    this.base64img=img;
  }
  getImage(){
    return this.base64img;
  }

  //LOGOUT USER
  logout(){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http.post(this.apiUrl+'api/logout',{headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }  

  //GET USER
  getuser(){
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    
    return this.http.get(this.apiUrl+'api/user',{headers: headers});
  }  

}
