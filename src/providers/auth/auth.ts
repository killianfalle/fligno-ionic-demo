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

  apiUrl: string = 'http://816d4d2f.ngrok.io/';

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

 //UPDATE
  updateUser(credentials):any {
    console.log(credentials.id)
    console.log(credentials)
    return new Promise((resolve, reject) => {
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let params = 'name='+credentials.name+'&email='+credentials.email
                    +'&age='+credentials.age+'&address='+credentials.address

      this.http.put(this.apiUrl+'api/user/update/'+credentials.id, params, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  //DELETE
  deleteUser(id):any {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      this.http.delete(this.apiUrl+'api/user/delete/'+id,{headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
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


  //-----------------CRUD------------------------
  //GET
  getData(){
    let headers = new Headers();

    return this.http.get(this.apiUrl+'api/data', {headers: headers});
    }

  //CREATE
  postCreate(myPost):any {

    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let params = 'postedByEmail='+myPost.postedByEmail+'&post='+myPost.post+'&postedByName='+myPost.postedByName

      this.http.post(this.apiUrl+'api/data/create', params, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
  });
  }

  //UPDATE
  updatePost(newPost, id):any {
    console.log(newPost)
    console.log(id)
    return new Promise((resolve, reject) => {
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let params = 'post='+newPost


      this.http.put(this.apiUrl+'api/data/update/'+id, params, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  //DELETE
  deletePost(item):any {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      this.http.delete(this.apiUrl+'api/data/delete/'+item,{headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

}
