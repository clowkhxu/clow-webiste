import storage from "../../utils/localStorage.js"
import handleAddMovieToWatchLater from "./handleAddMovieToWatchLater.js"
import handleRemoveMovieToWatchLater from "./handleRemoveMovieToWatchLater.js"
import { handleMovie } from "./handleContent.js"

const renderButton = (movie) => {
    const listOfMoviesToWatchLaterStorage = storage.get('listMoviesToWatchLater')
    const isMovieSaved = listOfMoviesToWatchLaterStorage.find(item => item.slug === movie.slug)
    const activeClass = isMovieSaved ? 'active' : ''
    return `
        <button 
            data-slug="${movie.slug}"
            class="add-movie ${activeClass}">
                <i onclick="handleAddMovieToWatchLater(this)" class="icon-add fa-light fa-plus"></i>
                <i onclick="handleRemoveMovieToWatchLater(this)" class="icon-remove fa-light fa-minus"></i>
        </button>
    `
}

const Movies = (data) => {
    return data.map(movie => `
        <div
            onclick="handleMovie(this)" 
            class="movie" 
            data-slug="https://phimapi.com/phim/${movie?.slug}"
        >
            <figure>
                <a href="./infoMovie-page.html">
                    <img 
                        loading="lazy" 
                        src="${movie?.poster_url.includes('https://img.phimapi.com') ? 
                            movie.poster_url : 
                            'https://img.phimapi.com/' + movie?.poster_url}" 
                        alt="${movie?.name}"
                    >
                    <div class="icon-play">
                        <i class="fa-duotone fa-play fa-bounce"></i>
                    </div>
                </a>
                ${renderButton(movie)}
                <span class="status">${movie?.lang}</span>
            </figure>
            <a href="./infoMovie-page.html" class="movie-name">${movie?.name}</a>
        </div>
    `).join('')
}
export default Movies
