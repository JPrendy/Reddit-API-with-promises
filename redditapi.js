//this is es6 javascript not normal javascript
export default{
    search: function(SearchTerm, SearchLimit, SortBy){
        //console.log('Search...');
        return fetch(`http://www.reddit.com/search.json?q=${SearchTerm}&sort=${SortBy}&limit=${SearchLimit}`)
        .then(res => res.json())
        .then(data => data.data.children.map(data => data.data))
        .catch(err => console.log(err));
    }
};