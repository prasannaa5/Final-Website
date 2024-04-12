      // to get data from server

//   get dom
let movie_img = document.getElementById("movie_img_url");
let movie_title = document.getElementById("movie_title");
let movie_input = document.getElementById("movie_input");
let movie_search = document.getElementById("movie_search");

movie_search.onclick = function () {
  let movie_input = document.getElementById("movie_input");
  if (movie_input.value == "") {
    alert("please enter movie name");
    return;
  }
  getMovie(movie_input.value);
  movie_input.value = "";
};

//   let url = `https://www.omdbapi.com/?t=${movie_name}&plot=full`;
//   let imgUrl =
let api_key = "8ecd2518";
async function getMovie(name) {
  // s parameter
  let url = `http://www.omdbapi.com/?apikey=${api_key}&s=${name}`;
  try {
    document.getElementById("error_handle").style.display = "none";
    document.getElementById("search_result").style.display = "block";
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error("data not get");
    }
    let data = await response.json();
    let movie_structure = "";
    for (let i = 0; i < data.Search.length; i++) {
      let movie = `
            <div class='float'>
            <div  id="movie_img">
          <img
            width="200px"
            height="250px"
            id="movie_img_url"
            src=${data.Search[i].Poster}
            alt="movie ko image hai"
          />
        </div>
        <div id="movie_details">
          <h5 id="movie_title">${data.Search[i].Title}</h5>
          <h5 id="movie_title">${data.Search[i].Year}</h5>
        </div>
      </div>`;
      movie_structure += movie;
    }

    console.log(data);
    document.getElementById("search_result").innerHTML = movie_structure;
  } catch (err) {
    document.getElementById("error_handle").style.display = "block";
    document.getElementById("search_result").style.display = "none";
    console.log(err);
  }
}

//   getMovie();
