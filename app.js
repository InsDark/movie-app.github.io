const form = document.querySelector('.searcher')
form.addEventListener('submit', e => {
    e.preventDefault();
    const searchBox = document.querySelector('.searchBox').value;
    getMovies(searchBox)
    form.reset();
})



const getMovies = (search) => {  
    
    fetch(`https://imdb8.p.rapidapi.com/title/find?q=${search}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key": "42f9f0d4cfmsh41f38bd0b9c3cddp183322jsnbf52e97e9421"
        }
    })
    .then(res => res.json())
    .then(data => {
        renderSearch(data)
        console.log(data)
    })
    .catch(err => console.error(err))
}

const showError = (err) => {
    console.error(err)
}

const renderSearch = ({results}) => {
    const app = document.querySelector('.main')
    const allResults = [...results]
    const filter = allResults.filter(movie => !movie.akas && !movie.disambiguation && !movie.legacyNameText && movie.image && movie.titleType !== 'videoGame')
    filter.forEach((movieFilter) => {
        const movie = document.createElement('div') 
        const {image: {url}, title} = movieFilter
        movie.innerHTML = `<img src="${url}"></img><h3>${(title)}</h3>`
        app.appendChild(movie)
    })
}