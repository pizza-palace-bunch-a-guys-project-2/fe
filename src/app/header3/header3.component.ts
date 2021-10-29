import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  template: `
 <!--   <nav class="navbar" > -->

      <!-- logo --> 
   <!--  <div class="navbar-brand"> -->
   <div class="navbar">Pizza App
   
       
      </div>
  <!--  </nav> -->
  `,
  styleUrls:['./header3.component.css']
})
export class Header3Component implements OnInit {

  constructor() { }
 var1='Pizza';
  ngOnInit(): void {
  }

}