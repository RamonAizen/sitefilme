
// Api Config

const api_key = 'afac7b9fcf7a86ef7c44b15ffb938014'
const main = document.getElementById('resultados')



async function getDetails(api_key, pesquisa) {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=pt-BR&query=${pesquisa}`

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data.results)
        renderMovies(data.results)
    })


}


function renderMovies(data) {

    main.innerHTML = '';

    data.forEach(movie => {

        let imageurl = 'https://image.tmdb.org/t/p/original'

        let {title,backdrop_path,id} = movie
    

        if (backdrop_path == null) {
            imageurl = ""
            backdrop_path = "./imagem.png"
            console.log(imageurl)
        }

        console.log(imageurl)

        // Criar HTML e renderizar na pagina com os dados do filme
        const moviehtml = document.createElement('div');
        moviehtml.classList.add('movie');
        moviehtml.setAttribute('id', 'movie')
        moviehtml.innerHTML = `
        <a href="./detalhes.html?id=${id}">
        <div class="col-3" id="destaque">
        <div class="card" id="card" width="100%">
            <img src="${imageurl+backdrop_path}"  id="cartaz">
            <div id="details">
                <h5><b id="title">${title}</b></h5>
            </div>
        </div>
        </div>
        </a>
        `
        main.appendChild(moviehtml);
    })

    
}


// Pegar id do parametro da url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pesquisa = urlParams.get('pesquisa')

if (urlParams.get('pesquisa')) {
    getDetails(api_key, pesquisa)
}



