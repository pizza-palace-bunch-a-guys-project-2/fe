
document.addEventListener("DOMContentLoaded", function() {

const f = document.getElementById('form');

   const q = document.getElementById('query');
   
   const google = 'https://www.google.com/search?q=site%3A+';
   const site = 'http://localhost:4200/';
  
   function submitted(event) {

   // alert('Clicked');
     event.preventDefault();
     const url = google + site + '+' + q.value;
     const win = window.open(url, '_blank');
     win.focus();
     
   }
   f.addEventListener('submit', submitted);
 //f.onclick(submitted());
});