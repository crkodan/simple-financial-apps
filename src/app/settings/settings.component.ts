import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { MainService } from '../main.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(public main:MainService, private router:Router, private activeRoute:ActivatedRoute, public auth:AuthService) {
    // this.nama = this.user[0]['nama'];
    // this.uname = this.user[0]['uname'];
   }

  username = localStorage.getItem("current_user");
  nama:string;
  famNam:string;
  famCode:string;
  uname:string;
  user=[];
  ngOnInit() {
    this.auth.getUserDetail(this.username).subscribe(
      (data)=>{
        this.user = data;
        console.log(this.user)
        console.log(this.username)
      }
    )
  }

}
