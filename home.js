const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const moviesList = document.getElementById('moviesList')
const playlists = document.getElementById('playlists')
const removeplaylistsBtn = document.getElementsByClassName('remove-playlists-btn')
const cardplaylistsBtn = document.getElementsByClassName('playlists-btn')
const readMore = document.getElementsByClassName('read-more')
const readMorePlot = document.getElementsByClassName('read-more-plot')
const movieKey = document.getElementsByClassName('movie-key')
const localStorageKeys = Object.keys(localStorage)

if (searchBtn) {
    searchBtn.addEventListener('click', searchMovies)
}

async function searchMovies() {
    // Hide default elements
    if (moviesList.children) {
        let children = moviesList.children
        let childrenArr = Array.prototype.slice.call(children)
        childrenArr.forEach((child) => child.remove())
    }

    let res = await fetch(`https://www.omdbapi.com/?s=${searchInput.value.trim()}&apikey=e53ac3af`)
    let data = await res.json()

    const movies = data.Search

    // Get and display search results
    movies.forEach(async (movie) => {
        let response = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=e53ac3af`)
        let moviesListData = await response.json()

        const readMoreMovieID = moviesListData.imdbID + 'more'
        const hideReadMore = moviesListData.imdbID + 'hide'

        const summaryPlot = `${moviesListData.Plot.substring(0, 110)}<span id=${hideReadMore}>...<button class="black read-more" onclick="showCompletePlot(${readMoreMovieID}, ${hideReadMore})">Read more</button></span>`

        const readMorePlot = `<span class="read-more-plot" id=${readMoreMovieID} >${moviesListData.Plot.substring(110, moviesListData.Plot.length)}</span>`

        const completePlot = moviesListData.Plot
        const longPlot = summaryPlot + readMorePlot
        const movieID = moviesListData.imdbID
        const movieIDkey = moviesListData.imdbID + 'key'
        const playlistsBtnKey = moviesListData.imdbID + 'playlistsBtn'
        const removeBtnKey = moviesListData.imdbID + 'removeBtn'

        moviesList.innerHTML += `
                <div class="cards">
                    <div class="card" id=${movieID}>
                        <span id=${movieIDkey} class="hide movie-key">${movieIDkey}</span>
                        <img src=${moviesListData.Poster} class="card-poster" />

                        <div class="card-header">
                            <h2 class="card-title">${moviesListData.Title}</h2>
                            <img src="images/star-icon.svg" class="star-icon" />
                            <span class="card-rating">${moviesListData.imdbRating}</span>
                        </div>
                        
                        <div class="card-meta">
                            <span class="card-runtime">${moviesListData.Runtime}</span>
                            <span>${moviesListData.Genre}</span>

                            <button class="card-btn card-playlists playlists-btn" id="${playlistsBtnKey}" onclick="addToplaylists(${movieIDkey}, ${movieID}, ${playlistsBtnKey}, ${removeBtnKey})"><img src="images/playlists-icon.svg" alt="Add film to playlists" class="card-playlists-plus-icon" />&nbsp;playlists</button>

                            <button class="card-btn card-playlists remove-playlists-btn" id="${removeBtnKey}" onclick="removeFromplaylists(${movieIDkey}, ${removeBtnKey}, ${playlistsBtnKey}, ${removeBtnKey})"><img src="images/remove-icon.svg" alt="Remove film to playlists" class="card-playlists-plus-icon" />&nbsp;Remove</button>
                        </div>
                        <p class="card-plot">${completePlot.length < 110 ? completePlot : longPlot}</p>
                    </div>
                </div>
            `

        displayplaylistsOrRemoveBtn()
    })
}

function displayplaylistsOrRemoveBtn() {
    for (let movie of movieKey) {
        const removeBtnID = movie.id.slice(0, 9) + 'removeBtn'
        const removeBtn = document.getElementById(removeBtnID)

        const playlistsBtnID = movie.id.slice(0, 9) + 'playlistsBtn'
        const playlistsBtn = document.getElementById(playlistsBtnID)

        localStorageKeys.forEach((key) => {
            if (movie.id === key) {
                removeBtn.style.display = 'inline'
                playlistsBtn.style.display = 'none'
            }
        })
    }
}

function showCompletePlot(readMoreMovieID, hideReadMore) {
    readMoreMovieID.style.display = 'inline'
    hideReadMore.style.display = 'none'
}

function addToplaylists(movieIDkey, movieID, playlistsBtnKey, removeBtnKey) {
    localStorage.setItem(movieIDkey.innerHTML, movieID.innerHTML)
    playlistsBtnKey.style.display = 'none'
    removeBtnKey.style.display = 'inline'
}

function removeFromplaylists(movieIDkey, removeBtnKey, playlistsBtnKey, removeBtnKey) {
    localStorage.removeItem(movieIDkey.innerHTML)

    // Get parent element (the movie card div) and remove it
    if (playlists) {
        localStorage.removeItem(movieIDkey.innerHTML)

        const parentEl = document.getElementById(movieIDkey.innerHTML).parentElement
        parentEl.remove()
    }

    playlistsBtnKey.style.display = 'inline'
    removeBtnKey.style.display = 'none'

    // Display default elements if local storage empty
    if (playlists && localStorage.length === 0) {
        if (playlists.children) {
            const children = playlists.children
            const childrenArr = Array.prototype.slice.call(children)
            childrenArr.forEach((child) => (child.style.display = 'flex'))
        }
    }
}

// Hide default elements if data is in local storage
if (playlists && localStorage.length > 0) {
    if (playlists.children) {
        const children = playlists.children
        const childrenArr = Array.prototype.slice.call(children)
        childrenArr.forEach((child) => (child.style.display = 'none'))
    }
}

for (let i = 0; i < localStorage.length; i++) {
    const getLocalStorage = localStorage.getItem(localStorage.key(i))

    // Display every key's value to the playlists
    if (playlists) {
        playlists.innerHTML += `<div class="card">${getLocalStorage}</div>`

        // Hide the 'add to playlists' button
        for (let button of cardplaylistsBtn) {
            button.style.display = 'none'
        }

        // Display the 'remove from playlists' button
        for (let button of removeplaylistsBtn) {
            button.style.display = 'inline'
        }
    }
}
