const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = parseInt(movieSelect.value);

populateUI();

//store movie name and price
function setMovieData(movieIndex, moviePrice) {

    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

//show move and price on UI from local storage on UI
function populateUI() {

    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    console.log(selectedSeats);

    if (selectedSeats !== null && selectedSeats.length > 0) {

        seats.forEach((seat, index) => {

            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex !== null) {
        movieSelect.selectIndex = selectedMovieIndex;
    }
}

//calculate total ticket price
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    const selectIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

    localStorage.setItem("selectedSeats", JSON.stringify(selectIndex));

    const numberOfSelectedSeats = selectedSeats.length;
    const totalPrice = numberOfSelectedSeats * ticketPrice;

    count.innerHTML = numberOfSelectedSeats;
    total.innerHTML = totalPrice;
}

//Seat Click Event
container.addEventListener("click", (e) => {

    if (e.target.classList.contains("seat") &&
        !(e.target.classList.contains("occupied"))) {

        e.target.classList.toggle("selected");

        updateSelectedCount();
    }
});

//Movie change Event
movieSelect.addEventListener("change", (e) => {

    let ticketPrice = parseInt(e.target.value);
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

//initial count
updateSelectedCount();