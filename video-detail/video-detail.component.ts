import { UserService } from './../user.service';
import { VideoService } from './../video.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {

  videoId!:string;
   videoUrl!:string;
   videoTitle!:string;
   videoDescription!:string;
   userId!:string;
   tags: Array<string> = [];
   videoAvailable:boolean = false;
   likeCount:number = 0;
   dislikeCount:number = 0;
  viewCount: any;
  showSubscribeButton: boolean = true;
  showUnSubscribeButton: boolean = false;

  
  
  constructor(private activatedRoute:ActivatedRoute,
    private videoService:VideoService,private UserService:UserService) { 
      
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe((data: {
      disLikeCount: number;
      viewCount: any;
      likeCount: number;
      tags: any;
      description: string;
      title: string;
      thumbnailUrl: any; videoUrl: string; 
}) => {
      this.videoUrl = data.videoUrl;
      this.videoTitle = data.title;
      this.videoDescription = data.description;
      this.tags = data.tags;
      this.videoAvailable = true;
      this.likeCount = data.likeCount;
      this.dislikeCount = data.disLikeCount;
      this.viewCount = data.viewCount;
       
    })
  }

  ngOnInit(): void {
  }
  LikeVideo(){
   this.videoService.LikeVideo(this.videoId).subscribe( data =>{
    this.likeCount= data.likeCount;
    this.dislikeCount = data.disLikeCount;
   })
  }
  disLikeVideo(){
    this.videoService.disLikeVideo(this.videoId).subscribe( data =>{
     this.likeCount= data.likeCount;
     this.dislikeCount = data.disLikeCount;
    })
   }
   subscribeToUser(){
     let userId = this.UserService.getUserId();
    this.UserService.subscribeToUser(userId).subscribe(data=>{
          this.showUnSubscribeButton = true;
          this.showSubscribeButton = false;
    })
   }

   UnSubscribeToUser(){
    let userId = this.UserService.getUserId();
   this.UserService.unSubscribeUser(userId).subscribe(data=>{
         this.showUnSubscribeButton = false;
         this.showSubscribeButton = true;
   })
  }
}
