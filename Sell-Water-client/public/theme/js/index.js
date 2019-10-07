/*
Get the opensource admin theme at bootadmin.org
*/

// $(document).ready(function(e) {
//   $("#addProduct").submit(function(e) {
//     e.preventDefault();
//   });
// });

$("#filter").change(function(e) {
  window.location.replace("http://localhost:3000/?" + e.target.value);
  // alert(e.target.value);
});
