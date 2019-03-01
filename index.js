'use strict';

const store = {
  results: []
};
// this works with the api key but it is not actually necessary.
// The query works without authentication.
const apiKey = 'LXP6NyRlJxITE1ohgo7rkTcFq3WgKlBrrBA0GU1t';

function handleSearch() {
  $('form').submit(function(event) {
    event.preventDefault();
    const states = $('#searching-states').val().split(' ').join('');
    const maxResults = $('#max-results').val();

    fetch(`https://api.nps.gov/api/v1/parks?stateCode=${states}&limit=${maxResults}&api_key=${apiKey}`)
      .then(result => result.json())
      .then(data => {
        store.results = [];
        for (let i = 0; i < maxResults && i < data.total; i++) {
          console.log(i, maxResults, data.total, store.results.length); 
          store.results.push({
            name: data.data[i].name,
            description: data.data[i].description,
            url: data.data[i].url
          });
        }
        render();
      });
  });
}

function generateHtml(ele) {
  return `<li>Name: ${ele.name}<br>Description: ${ele.description}<br>Link:<a href="${ele.url}">${ele.url}</a></li>`;
}

function render() {
  let htmlStr = '';
  let count = 0;
  store.results.forEach(function(ele) {
    htmlStr += generateHtml(ele);
    count++;
    console.log(count);
  });
  $('#search-results').html(htmlStr);
  console.log(htmlStr);
}

function main() {
  handleSearch();
  render();
}

$(main);

