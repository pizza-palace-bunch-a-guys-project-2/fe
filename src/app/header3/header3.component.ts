import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  template: `
 <!--   <nav class="navbar" > -->

      <!-- logo --> <!---->
   <!--  <div class="navbar-brand"> -->

   <div class="navbar">Pizza Palace</div><div id="im1"> </div>
  <!--

   <div class="navbar"><div class="cartico"></div><div class="title1"> 2020 Hwy 100 <br>City, RI 17330</div> <div class="mendiv"><table><tr><td><a routerLink="child-a"  routerLinkActive="active">Locations</a></td><td width="30"></td> <td>About Us</td><td width="30"></td> <td>Directions</td><td width="30"></td> <td>Search</td><td width="30"></td> <td>
   
   
   
   <form name="search" id="form"> 
   <input type="search" id="query" name="q" placeholder="Search...">
   <input id="inp1" type="submit" value="Search"> <!--Search</button>-->
 <!--</form> 

 

     
 
 
 
 </td></tr></table></div>
   
       
      </div><div id="im1"> </div>-->
   
  <!--  </nav> <img src= "(./header3/80generated.jpg)">-->
  `,
  styleUrls:['./header3.component.css'],
  
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