const container=document.querySelector('.container');
const seats=document.querySelectorAll('.row .seat:not(.occupied)');
const count=document.getElementById('count');
const total=document.getElementById('total');
const movieSelect=document.getElementById('movie');
//console.log(seats);
let ticketPrice= +movieSelect.value;
populateUI();
//save selected movie index and price
function setMovieData(movieIndex,moviePrice){
  localStorage.setItem('selectMovieIndex',movieIndex);
  localStorage.setItem('selectMoviePrice',moviePrice);
}
//update total & count
function updateSelectedCount(){
  const selectedSeats=document.querySelectorAll('.row .seat.selected');
  //copy selected seats int arr 
  //map through array
  //return a new array index
  const seatsIndex=[...selectedSeats].map(seat=>[...seats].indexOf(seat)); //creats an array of selected seat index
  localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
  //console.log(seatsIndex);
  const selectedSeatsCount=selectedSeats.length;
  count.innerText=selectedSeatsCount;
  total.innerText=selectedSeatsCount*ticketPrice;
 // console.log(selectedSeats);
}
//Get data from localstroage and populate UI
function populateUI(){
const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));
if(selectedSeats!==null && selectedSeats.length>0){
  seats.forEach((seat,index)=>{
    if(selectedSeats.indexOf(index)>-1)
    {seat.classList.add('selected');}
  });
}
const selectedMovieIndex=localStorage.getItem('selectedMovieIndex');
if(selectedMovieIndex!==null){
  movieSelect.selectedIndex=selectedMovieIndex;
}
}
//movie select event
movieSelect.addEventListener('change',e=>{
  ticketPrice=+e.target.value;
  setMovieData(e.target.selectedIndex,e.target.value);
  updateSelectedCount();
});
//seat click event
container.addEventListener('click',e => {
 
  if(e.target.classList.contains('seat')&& 
  !e.target.classList.contains('occupied')){
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});
//Initial count and total set
updateSelectedCount();

/*
What are the main ideas?
use querySelector to select the container so later we can add event listner to seats toggle the classes from unselected to selected using classList.contains and classList.toggle
use querySelectorAll to select all the seats that are not occupied
updateselectedcount gets all the seats length and multiply it with ticket price and using innerText update the value of price and count of seats
populateui is for using saved localstorage
gets index of all the selected seats
If I implemented one idea from this book right now, which one would it be?
How would I describe the book to a friend?
*/