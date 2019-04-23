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
export class CrudProvider {

  apiUrl: string = 'http://f34ea005.ngrok.io/';

  body: object=[];

  constructor(public http: Http) {
   
  }

  //-----------------CRUD------------------------

  
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
