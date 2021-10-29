import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

// THIS SERVICE IS USED TO CONNECT FRONTEND WITH BACKEND*** NEED TO ADD SPRING BOOT IMPLEMENTATION ONCE AVAILABLE
// DON'T FORGET DEPENDENCIES FOR POM
export class ImageService {
  constructor(private https: HttpClient) { }
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', 'http://localhost:8080/uploadFile', data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.https.request(newRequest);
  }
}



// EVERYTHING BELOW NEEDS TO BE ADDED TO THE COMPONENT IN WHICH WE ARE USING FOR MENU/ITEM.COMPONENT.TS -- SELECTOR -APP-MENU-ITEM
/*
import { Component } from '@angular/core'; //should already be in imports
import { ImageService } from './Services/image.service';
import { HttpClient } from '@angular/common/http'; //should already be in imports
@Component({
  selector: 'app-menu-item',
  templateUrl: './app.menu-item.html',
  styleUrls: ['./app.menu-item.css']
})
export class MenuItemComponent {
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;
  file:string;
  constructor(private imageService: ImageService, private https:HttpClient){}
  viewFile(){
window.open('https://bucketName.s3.cloudLocation.amazonaws.com/'+this.file);
  }
  deleteFile()
  {
    this.https.post<string>('http://localhost:8080/deleteFile',this.file).subscribe(
      res => {
        this.file = res;
      }
    );
  }
  change(event) {
    this.changeImage = true;
  }
  changedImage(event) {
    this.selectedFile = event.target.files[0];
  }
  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
this.imageService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      this.selectedFiles = undefined;
    });
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
} */
