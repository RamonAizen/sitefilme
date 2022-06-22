
// Api Config

const api_key = 'afac7b9fcf7a86ef7c44b15ffb938014'
const apiurl = 'https://api.themoviedb.org/3'
const imageurl = 'https://image.tmdb.org/t/p/original'

const main = document.getElementById('destaques')

async function mostPopular(apiurl, api_key) {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&with_watch_monetization_types=flatrate&language=pt-BR`

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data.results)
        renderMovies(data.results)
    })


}


function renderMovies(data) {
    main.innerHTML = '';

    // Renderizar os primeiros 3 filmes
    data.forEach(movie => {
        // dados do json da api

       const {title,poster_path,overview,release_date,id} = movie

       // em caso de sinopse maior que a media
       let fontsize = "14px" 
       if(overview.length > 700) {
            fontsize = "10px" 
       } else if (overview.length > 500) {
            fontsize = "12px"
       }
       
        // Criar HTML e renderizar na pagina com os dados do filme
        const moviehtml = document.createElement('div');
        moviehtml.classList.add('movie');
        moviehtml.innerHTML = `
            <div class="col-3" id="destaque">
            <div class="card" id="card" width="100%">
                <img src="${imageurl+poster_path}" class="card-img-top" id="cartaz">
                <div id="details">
                    <p class="card-text" id="title"><h5>${title}</h5></p>
                    <p class="card-text"id="data">Data de Lancamento: <b>${release_date}</b></p>
                    <p class="card-text"id="sinopse" style="font-size:${fontsize}">Sinopse: ${overview}</p>
                    <a class="btn btn-primary" href="/detalhes.html?id=${id}">Mais Detalhes</a>
                </div>
            </div>
            </div>
        `

        main.appendChild(moviehtml);
    })
}

data = mostPopular(apiurl, api_key)
console.log

