import reddit from './redditapi';

const SearchForm = document.getElementById('search-form');
const SearchInput = document.getElementById('search-input');

SearchForm.addEventListener('submit', e => {
    //console.log(123);
    const SearchTerm = SearchInput.value;
    //console.log(SearchTerm);

    //This gets all the input fields called 'sortby' that are checked and retrieves there value
    const SortBy = document.querySelector('input[name="sortby"]:checked').value;
    //console.log(SortBy);

    const SearchLimit = document.getElementById('limit').value;
    //console.log(SearchLimit);

    //Check input
    if(SearchTerm === ''){
        ShowMessage('Please add a search term', 'alert-danger');
    }
    //Clear input
    SearchInput.value = '';

    //Search Reddit
    reddit.search(SearchTerm, SearchLimit, SortBy).then(results => {
        let output = '<div class="card-columns">';
        results.forEach(post => {
            //Check for an image
            const image = post.preview ? post.preview.images[0].source.url : null;  
            output +=`
            <div class="card">
            <img class="card-img-top" src="${image}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${truncateText(post.selftext, 100)}</p>
              <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
              <hr>
              <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
              <span class="badge badge-dark">Score: ${post.score}</span>
              
              </div>
          </div>`;
         });
        output += '</div>';
        document.getElementById('results').innerHTML = output;
    });

    e.preventDefault();
});


//The function that is called show message
function ShowMessage(message, type_alert){

    const div = document.createElement('div');
    div.className = `alert ${type_alert}` ;

    div.appendChild(document.createTextNode(message));

    const searchContainer = document.getElementById('search-container');

    const search = document.getElementById('search');

    searchContainer.insertBefore(div, search);
    console.log("the function is working");

    // A timeout alert to get rid of the message
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
};

//truncate text
function truncateText(text, limit){
    const shortened = text.indexOf(' ', limit);
    if(shortened == -1) return text;
    return text.substring(0, shortened);
}