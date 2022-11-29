import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient: HttpClient) { }

  postComment(commentDto:any, videoId:string): Observable<any>{
  return  this.httpClient.post("http://localhost:2022/api/videos/"+ videoId +"/comment", commentDto);

  }
  // getAllComments(videoId: string): Observable<Array<CommentDto>> {
  // return  this.httpClient.get<CommentDto[]>("http://localhost:2022/api/videos/"+ videoId +"/comment");
  // }
}
