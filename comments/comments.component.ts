import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../user.service';
import { Component, Input, OnInit } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
// import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
 
  @Input()
  videoId: string = '';
commentsForm:FormGroup;
  commentService: any;
// commentsDto: commentDto[] = [];


  constructor(private userService: UserService,/* private commentService: commentService,*/
    private MatSnackBar: MatSnackBar) { 
    this.commentsForm = new FormGroup({
      comment : new FormControl('comment'),
    });
   
  }

  ngOnInit(): void {
   this.getComments();
  }

  postComment(){
  const comment = this.commentsForm.get('comment')?.value;

  const commentDto = {
    "commentText": comment,
    "authorId": this.userService.getUserId()
  }
  this.commentService.postComment(commentDto,this.videoId).subscribe(() =>{
    this.MatSnackBar.open("comment Posted Successfully","OK");

    this.commentsForm.get('comment')?.reset();
    this.getComments();
  })
  }

  getComments(){
    // this.commentService.getAllComments(this.videoId).subscribe( data =>{
    //   this.commentsDto = data;
    // });
  }

}

