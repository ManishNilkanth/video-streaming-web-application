import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private  userId: string = '';
  constructor(private httpClient:HttpClient) { }

  subscribeToUser(userId:string):Observable<Boolean>{
return this.httpClient.post<Boolean>("http://localhost:2022/api/user/subscribe/"+userId,null);
  }

  unSubscribeUser(userId:string):Observable<Boolean>{
    return this.httpClient.post<Boolean>("http://localhost:2022/api/user/unSubscribe/"+userId,null);
      }

  registerUser(){
    this.httpClient.get("http://loclahost:2022/api/user/register",{responseType: "text"}).subscribe(data =>{
      this.userId = data;
    })
  }

  getUserId(): string{
    return this.userId;
  }
}
