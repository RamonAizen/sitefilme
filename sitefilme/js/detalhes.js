
// Api Config

const api_key = 'afac7b9fcf7a86ef7c44b15ffb938014'
const imageurl = 'https://image.tmdb.org/t/p/original'

const main = document.getElementById('main')


// Pegar id do parametro da url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

async function getDetails(api_key, id) {
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=pt-BR`

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        renderMovies(data)
    })


}


function renderMovies(data) {
    main.innerHTML = '';


    const {
        title,
        poster_path,
        overview,
        release_date,
        original_title,
        homepage,
        genres
    } = data


    // Transformar genres em uma array com os nomes dos generos e transformar em string
    let generos = []
    genres.forEach(function (item) {
        generos.push(item.name) 
    });    
    generos = generos.toString().replace(/,/g, ', ')


    // em caso de sinopse maior que a media
    let fontsize = "14px" 
    if(overview.length > 700) {
        fontsize = "10px" 
    } else if (overview.length > 500) {
        fontsize = "12px"
    }

    // Criar HTML e renderizar na pagina com os dados do filme
    const moviehtml = document.createElement('div');
    moviehtml.setAttribute('id', 'movie')
    moviehtml.innerHTML = `
        <div width="100%" id ="detalhes">
            <img src="${imageurl+poster_path}" id="cartaz">
            <p id="title"><h5><b>${title}</b></h5></p>
            <p id="data"><b>Data de Lancamento: </b>${release_date}</p>
            <p id="tituloen"><b>Titulo em Ingles: </b>${original_title}</p>
            <p id="sinopse" style="font-size:${fontsize}"><b>Sinopse: </b> ${overview}</p>
            <p id="generos"><b>Generos do Filme: </b>${generos}</p>
            <p id="link"><b>Pagina do Filme: </b><a href="${homepage}">${homepage}</a></p>

        </div>
    `

    main.appendChild(moviehtml);
}

getDetails(api_key, id)


