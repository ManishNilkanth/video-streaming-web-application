import { FileSystemFileEntry } from 'ngx-file-drop';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { uploadvideoResponse } from './upload-video/uploadvideoResponse';
import { VideoDto } from './video-dto';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpsClient: HttpClient) { 
  }

  uploadvideo(fileEntry:File) :Observable<uploadvideoResponse>
  {

    const formData = new FormData()
          formData.append('file', fileEntry, fileEntry.name)


    // Http post call to uplaod the video
    return this.httpsClient.post<uploadvideoResponse>("http://localhost:2022/api/videos/",formData);

 
  }
  uploadThumbnail(fileEntry:File,videoId:string) :Observable<string>
  {

    const formData = new FormData()
          formData.append('file', fileEntry, fileEntry.name);
          formData.append('videoId',videoId);



    // Http post call to uplaod the Thumbnil
    return this.httpsClient.post("http://localhost:2022/api/videos/thumbnail",formData,{
      responseType:'text'
    });

 
  }
  getVideo(VideoId:string):Observable<VideoDto>{
      return this.httpsClient.get<VideoDto>("http://localhost:2022/api/videos/"+ VideoId);
  }
  saveVideo(videoMetaData:VideoDto):Observable <VideoDto>{
    return this.httpsClient.put<VideoDto>("http://localhost:2022/api/videos/",videoMetaData);
  }
  getAllVideos():Observable<Array<VideoDto>>
  {
   return this.httpsClient.get<Array<VideoDto>>("http://localhost:2022/api/videos");
  }
  LikeVideo(videoId:string):Observable<VideoDto> {
    return this.httpsClient.post<VideoDto>("http://localhost:2022/api/videos"+videoId+"/iLke",null);
  }
  disLikeVideo(videoId:string):Observable<VideoDto> {
    return this.httpsClient.post<VideoDto>("http://localhost:2022/api/videos"+videoId+"/disLike",null);
  }
}
