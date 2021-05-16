const missingPhotoURL = "https://tinyurl.com/tv-missing";

async function searchShows(query) {
  let showRequest = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`);
  let showArray = [];

  for(let show of showRequest.data){
    let showObj = {
      id: show.show.id,
      name: show.show.name,
      summary: show.show.summary,
      image: show.show.image ? show.show.image.medium : missingPhotoURL
    };

    showArray.push(showObj)
  }
  console.log(showRequest);
  console.log(showArray);
  return showArray; //returns array of show objects
  }

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $show = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body" id = "showCard">
             <img class="card-img-top" src=${show.image}>
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button class="btn btn-outline-primary get-episodes" id="episodeButton" data-bs-toggle="modal" data-bs-target="#episodeModal">Show Episodes</button>
           </div>
         </div>
       </div>
      `
    );
    
    $showsList.append($show);
    
  }
}

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});

async function getEpisodes(id) {
  let episodesRequest = await axios.get(
    `http://api.tvmaze.com/shows/${id}/episodes`
  );
  console.log(episodesRequest);
  let episodeArray = [];

  for(let episode of episodesRequest.data){
    let episodeObj = {
      id: episode.id,
      name: episode.name,
      season: episode.season,
      number: episode.number,
    };
    episodeArray.push(episodeObj);
  }
  console.log(episodeArray);
  return episodeArray;
}

async function populateEpisodes(episodes){
  const $episodesList = $('#episodes-list')
  $episodesList.empty();

  for(let episode of episodes){
    let $episodeListItems = $(
      `<li> ${episode.name} (Season: ${episode.season} Episode: ${episode.number})</li>`
    );

    $episodesList.append($episodeListItems);
  }
  $('#episodes-area').show();
}

$('#shows-list').on('click', '.get-episodes', async function episodeClick(e){
  let showID = $(e.target).closest('.Show').data('show-id');
  let episodes = await getEpisodes(showID);
  populateEpisodes(episodes);
})