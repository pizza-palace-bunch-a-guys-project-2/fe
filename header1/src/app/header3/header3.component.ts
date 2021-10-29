import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  template: `
 <!--   <nav class="navbar" > -->

      <!-- logo --> 
   <!--  <div class="navbar-brand"> -->
   < div class="navbar">Pizza App
   
       
      </div>
  <!--  </nav> -->
  `,
  styleUrls:['./styles.css']
})
export class Header3Component implements OnInit {

  constructor() { }
 var1='Pizza';
  ngOnInit(): void {
  }

}