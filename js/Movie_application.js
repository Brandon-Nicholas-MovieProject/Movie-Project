    //--- Special Variables
    const URL = 'https://cuboid-standing-scribe.glitch.me/movies';

    // Creates each post of every movie in the JSON
    const outPutMovie = '';
    const renderPost = (posts) => {posts.forEach(movie => {
    outputMovie = `
                        <section class="bg-dark text-white m-3 p-3 h-fit-content" d id="mainContainer">
                            <img src="${movie.poster}" class="rounded">\
                            <h4 class="pt-3 text-capitalize movieTitle">${movie.title}</h4>
                            <p class="p-0 m-0 movie-header year">${movie.year}</p>
                            <p class="p-0 m-0 rating">${movie.rating}</p>
                            <p class="p-0 m-0 genre">${movie.genre}</p>
                            <p class="p-0 m-0 director">${movie.director}</p>
                            <button  class="btn btn-primary" data-id=${movie.id} id="edit-post">Edit</button>
                            <button class="btn btn-secondary" data-id=${movie.id}  id="delete-post">Delete</button>
                        </section>`
    $('#post').append(outputMovie);
})}

    //--- Read
    fetch(URL)
    .then(res => res.json())
    .then(data => renderPost(data))

    //--Create Insert new post with a click of the submit button
    $("#submitButton").click((e)=>{
    e.preventDefault();
    alert('Thank you for your response! We will be adding your movie to your list')
    const titleInput = $('#movieTitle').val();
    const yearInput = $('#yearMovie').val();
    const ratingInput = $('#ratingMovie').val();
    const genreInput = $('#genreMovie').val();
    const directorInput = $('#directorMovie').val();

    fetch(URL, {
    method:'POST',
    headers:{
    'Content-Type':'application/json'
},
    body:JSON.stringify({
    title: titleInput,
    rating: ratingInput,
    year: yearInput,
    genre: genreInput,
    director: directorInput
})
})
    .then( response => response.json())
    .then( movie => {
    $('#post').append(
    `<section class='bg-dark text-white m-3 p-3 h-fit-content' id="mainContainer">
                        <img src="${movie.poster}" class="rounded">
                        <section class="">
                        <h4 class='pt-3 text-capitalize'>${movie.title}</h4>
                        <p class='p-0 m-0'>${movie.year}</p>
                        <p class='p-0 m-0'>${movie.rating} Stars</p>
                        <p class='p-0 m-0'>${movie.genre}</p>
                        <p class='p-0 m-0'>${movie.director}</p>
                        <button id="edit" class="btn btn-primary">Edit</button>
                        <button id="save" class="btn btn-warning d-none">Save</button>
                        <button id="delete" class="btn btn-secondary">Delete</button>
                    </section>`
    )
})
})

    // //--Delete & Edit
    $('#post').click((e)=> {
    console.log(e.target);
    let targetID = e.target.dataset.id
    console.log(e.target.id);
    //--Creates if statements
    let editButtonIsPressed = (e.target.id == 'edit-post')
    let deleteButtonIsPressed = (e.target.id == 'delete-post')
    //If del button is pushed
    if (deleteButtonIsPressed) {
    fetch(`${URL}/${targetID}`, {
    method: 'DELETE',
})
    .then(response => response.json())
    .then(data => location.reload())

}
    //If edit button is pushed
    if(editButtonIsPressed){
    $('#saveButton').removeClass('d-none');
    $("#submitButton").addClass('d-none');

    let parent = e.target.parentElement;

    const TitleContent = parent.querySelector('.movieTitle').textContent;
    const YearContent = parent.querySelector('.year').textContent;
    const RatingContent = parent.querySelector('.rating').textContent;
    const GenreContent = parent.querySelector('.genre').textContent;
    const directorContent = parent.querySelector('.director').textContent;

    let movietitleValue  = $('#movieTitle');
    let ratingValue  = $('#ratingMovie');
    let yearValue  =  $('#yearMovie');
    let genreValue  =  $('#genreMovie');
    let directorValue  =   $('#directorMovie');

    movietitleValue.val(TitleContent);
    yearValue.val(YearContent);
    ratingValue.val(RatingContent);
    genreValue.val(GenreContent)
    directorValue.val(directorContent)

    $("#saveButton").click((e)=>{
    e.preventDefault();
    alert('Thank you for your edit! We will be adding your movie')
    const titleInput = $('#movieTitle').val();
    const yearInput = $('#yearMovie').val();
    const ratingInput = $('#ratingMovie').val();
    const genreInput = $('#genreMovie').val();
    const directorInput = $('#directorMovie').val();

    fetch(`${URL}/${targetID}`, {
    method:'PATCH',
    headers:{
    'Content-Type':'application/json'
},
    body:JSON.stringify({
    title: titleInput,
    rating: ratingInput,
    year: yearInput,
    genre: genreInput,
    director: directorInput
})
})
    .then( response => response.json())
    .then(data => location.reload())
})

}
})




