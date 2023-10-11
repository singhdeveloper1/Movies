const searchForm = document.querySelector("form")
const movieContainer=document.querySelector(".movie-container")
const inputBox = document.querySelector(".inputBox")


searchForm.addEventListener("submit",(e)=>{
    e.preventDefault()

    const movieName = inputBox.value.trim()
    // console.log(movieName)
    if(movieName!==''){
        showErrorMessage("Fetching Information..")
    getMovieInfo(movieName)
    }
    else{
     showErrorMessage("Enter movie name to get the movie data")
    }
    

})


const getMovieInfo = async(movie)=>{


    try{
    const myApiKey = "4b05afbd"
    const url = `https://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`

    // const data = await fetch(`${url}`).then(response=>response.json())

    const response= await fetch(url)

    if(!response.ok){
        throw new Error("Unable to fetch movie data")
    }
    const data = await response.json()

        // console.log(data)
        showMovieData(data)
    }
    catch(error){
           showErrorMessage("No Movie Found!!!")
    }

}

const showMovieData= (data)=>{

    movieContainer.innerHTML=""
    movieContainer.classList.remove("no-background")

    const {Title , imdbRating ,Genre , Released ,Runtime , Actors , Plot, Poster}= data

    const movieElement =document.createElement("div")
    movieElement.classList.add("movie-info")
    movieElement.innerHTML =`<h2>${Title}</h2
                             <p><strong>Rating: &#11088</strong>${imdbRating}</p>`


    const movieGenreElement = document.createElement("div")
    movieGenreElement.classList.add("movie-genre")

    Genre.split(",").forEach(element => {
        const p = document.createElement("p")
        p.innerText = element
        movieGenreElement.appendChild(p)
    });
    
    movieElement.appendChild(movieGenreElement)
    movieElement.innerHTML +=` <p><strong>Release Date: </strong>${Released}</p>
    <p><strong>RunTime: </strong>${Runtime}</p>
    <p><strong>Actors: </strong>${Actors}</p>
    <p><strong>Plot: </strong>${Plot}</p>`



    const MovieElementPoster = document.createElement("div")
    MovieElementPoster.classList.add("movie-poster")
    MovieElementPoster.innerHTML=`<img src="${Poster}"/>`



    movieContainer.appendChild(MovieElementPoster)

    movieContainer.appendChild(movieElement)


}



const showErrorMessage = (message)=>{

    movieContainer.innerHTML = `<h2>${message}</h2>`
    movieContainer.classList.add("no-background")
}
