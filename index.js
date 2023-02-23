"use strict";

let movieData = {
  "The Darjeeling Limited": {
    plot: "A year after their father's funeral, three brothers travel across India by train in an attempt to bond with each other.",
    cast: ["Jason Schwartzman", "Owen Wilson", "Adrien Brody"],
    runtime: 151,
    rating: 7.2,
    year: 2007,
    link: "https://th.bing.com/th/id/OIP.MU6gTrz7HGKpQYuO6kzPtgAAAA?w=195&h=277&c=7&r=0&o=5&dpr=1.5&pid=1.7",
  },
  "The Royal Tenenbaums": {
    plot: "The eccentric members of a dysfunctional family reluctantly gather under the same roof for various reasons",
    rating: 7.6,
    year: 2001,
    cast: ["Gene Hackman", "Gwnyeth Paltrow", "Anjelica Huston"],
    runtime: 170,
    link: "https://posters.movieposterdb.com/08_12/2001/265666/l_265666_0060743c.jpg",
  },
  "Fantastic Mr. Fox": {
    year: 2009,
    plot: "An urbane fox cannot resist returning to his farm raiding ways and then must help his community survive the farmers' retaliation.",
    cast: [
      "George Clooney",
      "Meryl Streep",
      "Bill Murray",
      "Jason Schwartzman",
    ],
    runtime: 147,
    rating: 7.9,
    link: "https://posters.movieposterdb.com/10_03/2009/432283/l_432283_61b84724.jpg",
  },
  "The Grand Budapest Hotel": {
    rating: 8.1,
    runtime: 159,
    year: 2014,
    plot: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
    cast: ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric"],
    link: "https://posters.movieposterdb.com/14_08/2014/2278388/l_2278388_52b919fb.jpg",
  },
};
// Dom
const container = document.querySelector(".movies");
const form = document.querySelector(".movie");
const title = document.querySelector("#title");
const year = document.querySelector("#year");
const rating = document.querySelector("#rating");
const imageLink = document.querySelector("#link");
const sortBtnUp = document.querySelector(".btn__up");
const sortBtnDown = document.querySelector(".btn__down");
let newMovie = [];
let newMovieObj;
// movieData;
// let htmlMarkup;

const movie = Object.entries(movieData);
// movie.forEach((movie, i) => {
//   newMovie.push({
//     title: movie[i][0],
//     plots: movie[i][1].plot,
//     year: movie[i][1].year,
//     ratings: movie[i][1].rating,
//     images: movie[i][1].link,
//   });
// });
console.log(newMovie);
for (let i = 0; i < movie.length; i++) {
  newMovie.push({
    title: movie[i][0],
    plots: movie[i][1].plot,
    year: movie[i][1].year,
    ratings: movie[i][1].rating,
    images: movie[i][1].link,
  });
}
const AddMovie = () => {
  let newUpdatedMovie = [];
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log(title.value);
    newUpdatedMovie = {
      title: title.value,
      year: Number(year.value),
      ratings: rating.value,
      // plot: "something about the movie",
      images: imageLink.value,
    };

    localStorage.setItem("newMovie", JSON.stringify(newUpdatedMovie));
    newMovie.push(newUpdatedMovie);
    console.log(newMovie);
    const htmlMarkup = `
    <div class="card">
        <img
          src="${newUpdatedMovie.images}"
          alt="movie poster"
        />
        <h3 class="title">${newUpdatedMovie.title}</h3>
        <p class="plot">
          ${newUpdatedMovie.plot}
        </p>
        <span class="year">${newUpdatedMovie.year}</span>
        <span class="rating"> <ion-icon name="star"></ion-icon>${newUpdatedMovie.ratings} </span>
    </div>

  `;
    container.insertAdjacentHTML("beforeend", htmlMarkup);

    title.value = "";
    year.value = "";
    rating.value = "";
    imageLink.value = "";
  });
};
AddMovie();
// localStorage.clear();
// local storage
const savedNewMovie = JSON.parse(localStorage.getItem("newMovie"));
if (savedNewMovie) newMovie.push(savedNewMovie);

let sorted = false;

// movie dom handler

const MovieHandler = (movieARR, sort = false) => {
  container.innerHTML = "";
  const movies = sort
    ? movieARR.slice().sort((a, b) => (a.year > b.year ? 1 : -1))
    : movieARR;
  movies.forEach((movie) => {
    const htmlMarkup = `
          <div class="card">
              <img
                src="${movie.images}"
                alt="movie poster"
              />
              <h3 class="title">${movie.title}</h3>
              <p class="plot">
                ${movie.plots}
              </p>
              <span class="year">${movie.year}</span>
              <span class="rating"> <ion-icon name="star"></ion-icon>${movie.ratings} </span>
          </div>
  
  `;
    container.insertAdjacentHTML("beforeend", htmlMarkup);
  });
};

MovieHandler(newMovie);
// ---------------------------------
function sortFunc() {
  // const sorted = newMovie.;
  MovieHandler(newMovie, !sorted);
  sorted = !sorted;
  console.log(sorted, "------", newMovie);
}

sortBtnUp.addEventListener("click", sortFunc);

const sortFuncUp = () => {
  let sortARRNew = newMovie.slice().sort((a, b) => (b.year > a.year ? 1 : -1));
  MovieHandler(sortARRNew, !sorted);
  sorted = !sorted;
};
// console.log(typeof movieData);
sortBtnDown.addEventListener("click", sortFuncUp);
