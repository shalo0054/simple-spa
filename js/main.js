//app is for general control over the application
//and connections between the other components
const log = console.log;

const APP = {
   KEY: "67a8835b5b606f17a40522e9ff643ea8",
   baseURL: 'https://api.themoviedb.org/3/',
   get urlConfig() {
      return `${this.baseURL}configuration?api_key=${this.KEY}`
   },
   IMG_BASE_URL: 'https://image.tmdb.org/t/p/',

   init: () => {
      //this function runs when the page loads
      // input.addEventListener('input', SEARCH);
      let searchBtn = document.querySelector('#btnSearch');
      searchBtn.addEventListener('click', SEARCH.search);
   },
}; // end this.nameSpace

//search is for anything to do with the fetch api
const SEARCH = {
   search(ev) {
      ev.preventDefault()
      let input = document.querySelector('input');
      let url = `${APP.baseURL}search/person?api_key=${APP.KEY}&query=${input.value}&language=en-US`;
      //log(url);
      if (input.value) {
         document.getElementById('instructions').style.display = 'none';

         fetch(url)
            .then(resp => {
               if (resp.ok) {
                  return resp.json();
               } else {
                  //did not get a HTTP 200 Status
                  throw new Error(`ERROR: ${resp.status_code} ${resp.status_message}`);
               }
            })
            .then(data => {
               ACTORS.showActors(data.results);
               // log(data.results[0]);
            })
            .catch(err => {
               //handle the error
               alert(err);
            });
      } else {
         alert(`Please enter an actor's name.`);
      }
   }
}; // end SEARCH nameSpace

//actors is for changes connected to content in the actors section
const ACTORS = {
   showActors(results) {
      let content = document.querySelector('section#actors div.content');
      let df = document.createDocumentFragment();

      results.forEach(async (result) => {

         if (result.profile_path) {
            log('creating cardDiv');
            let cardDiv = document.createElement('div');
            cardDiv.className = "card";
            cardDiv.setAttribute('data-actorID', result.id);
            let imageDiv = document.createElement('div');
            imageDiv.className = "image";

            let img = document.createElement('img');
            img.className = "actorImage"
            img.src = APP.IMG_BASE_URL + 'w154' + result.profile_path;
            img.alt = `${result.name}'s image`;
            imageDiv.append(img);

            let h3 = document.createElement('h3');
            h3.className = "actorName";
            h3.innerHTML = result.name;

            let popularity = document.createElement('p');
            popularity.className = "popularity";
            popularity.innerHTML = `Popularity: ${result.popularity}`;

            cardDiv.append(imageDiv, h3, popularity);
            df.append(cardDiv);
            // content.append(cardDiv);
         }
      });
      content.innerHTML = '';
      content.append(df);
      document.getElementById('actors').style.display = 'flex';
      document.querySelector('#actors h2').style.display = 'block';
      content.addEventListener('click', MEDIA.showMedia)

   }
}; // end this.nameSpace

//media is for changes connected to content in the media section
const MEDIA = {
   showMedia(ev) {
      if (ev.target.className === 'card' ||
         ev.target.parentElement.className === 'card' ||
         ev.target.className === 'actorImage') {
         document.getElementById('actors').style.display = 'none';
         document.getElementById('media').style.display = 'flex';
         let mediaTitle = document.querySelector('#media h2')
         mediaTitle.style.display = 'block';

         // goes back to Actors page
         mediaTitle.addEventListener('click', () => {
            document.getElementById('media').style.display = 'none';
            document.getElementById('actors').style.display = 'flex';
            document.querySelector('#actors h2').style.display = 'block';
         });
      } // end if
   } // end func
}; // end this.nameSpace

//storage is for working with localstorage
const STORAGE = {
   //this will be used in Assign 4
}; // end this.nameSpace

//nav is for anything connected to the history api and location
const NAV = {
   //this will be used in Assign 4
};

//Start everything running
document.addEventListener('DOMContentLoaded', APP.init);