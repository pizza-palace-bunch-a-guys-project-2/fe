import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  template: `
 <!--   <nav class="navbar" > -->

      <!-- logo --> <!---->
   <!--  <div class="navbar-brand"> -->
   <div class="navbar"><div class="title1"> </div> <div class="mendiv"><table><tr><td>Menu</td><td width="20"></td> <td>About Us</td><td width="20"></td> <td>Directions</td><td width="20"></td> <td>Search</td></tr></table></div>
   
       
      </div><div id="im1"> </div>
  <!--  </nav> <img src= "(./header3/80generated.jpg)">-->
  `,
  styleUrls:['./header3.component.css']
})
export class Header3Component implements OnInit {

  constructor() { }
 
 
 //document.getElementById("./header3/80_generated.jpg") as HTMLImageElement;
  ngOnInit(): void {
  }
  var1='Pizza';
 // url= document.getElementById("./header3/80generated.jpg") as HTMLImageElement;
  //url ="./app/assets/80generated.jpg";


}