import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private UserService:UserService, private router: Router) {
    this.UserService.registerUser();
    this.router.navigateByUrl('');
   }

  ngOnInit(): void {
  }

}
