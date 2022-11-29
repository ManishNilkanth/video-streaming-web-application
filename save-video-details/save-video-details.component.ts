import { VideoDto } from './../video-dto';
import { VideoService } from './../video.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/Chips';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css'],
})
export class SaveVideoDetailsComponent implements OnInit {
  [x: string]: any;

  saveVideoDetailsForm: FormGroup;
  title: FormControl = new FormControl();
  description: FormControl = new FormControl();
  videoStatus: FormControl = new FormControl();
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [] as const; //here should be ENTER,COMMA
  tags: string[] = [];
  selectedFile!: File;
  selectedFileName = '';
  videoId:any = '';
  fileSelected = false;
  videoUrl!: string;
  thumbnailUrl!: string;

  v = {
    title : '',
    description : ''
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService,
    private matSnackBar: MatSnackBar
  ) {
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    console.log(this.videoId);
    
    this.videoService
      .getVideo(this.videoId)
      .subscribe((data: { thumbnailUrl: any; videoUrl: string }) => {
        this.videoUrl = data.videoUrl;
        this.thumbnailUrl = data.thumbnailUrl;
      });
    this.saveVideoDetailsForm = new FormGroup({
      title: this.title,
      description: this.description,
      videoStatus: this.videoStatus,
    });
  }
  ngOnInit(): void {}

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(value: string): void {
    const index = this.tags.indexOf(value);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
  onFileSelected($event: Event) {
    //@ts-ignore
    this.selectedFile = $event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
    this.fileSelected = true;
  }
  onUpload() {
    this.videoService
      .uploadThumbnail(this.selectedFile, this.videoId)
      .subscribe(
        (data) => {
          console.log(data);
          //show and Upload success notification.
          this.matSnackBar.open('Thumbnail Upload Successful', 'OK');
        },
        (error) => {
          console.log('Failed');
        }
      );
  }
  saveVideo() {
    //Make a call to video service to make a http call to our backend
    const videoMetData: VideoDto = {
      id: this.videoId,
      title: this.v.title,
      description: this.v.description,
      tags: this.tags,
      videoStatus: 'PUBLIC',
      videoUrl: this.videoUrl,
      thumbnailUrl: this.thumbnailUrl,
      likeCount: 0,
      disLikeCount: 0,
      viewCount: 0,
    };
    this.videoService.saveVideo(videoMetData).subscribe((data) => {
      this.matSnackBar.open('video Metadata Updated succesfully', 'OK');
    });
  }
}
