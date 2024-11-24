import ContentItem from './pages/content-item.js';
import { getListOfRestaurants, getDetailOfRestaurant, searchRestaurants } from '../data/restaurant-api';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import Detail from './pages/detail.js';

class App {
  constructor({ content }) {
    this._content = content;
    this._initialAppShell();
    this._initSearch();
  }

  _initialAppShell() {

  }

  _initSearch() {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('keyup', async () => {
      const query = searchInput.value.trim();
      if (query) {
        console.log('Searching for:', query);
        const results = await searchRestaurants(query);
        console.log('Search results:', results);
        this._displaySearchResults(results);
      } else {

        this._hideSearchResults();
      }
    });
  }

  _hideSearchResults() {
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.style.display = 'none';
  }

  toggleSearchResultsVisibility(results) {
    const searchResultsContainer = document.getElementById('searchResults');

    if (!results || results.founded === 0) {
      searchResultsContainer.style.display = 'none';
    } else {
      searchResultsContainer.style.display = 'block';
      searchResultsContainer.style.backgroundColor = 'none';
    }
  }

  _displaySearchResults(results) {
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = '';


    if (results.error || results.founded === 0) {
      searchResultsContainer.innerHTML = '<p>No restaurants found.</p>';
      return;
    }
    this.toggleSearchResultsVisibility(results);

    results.restaurants.forEach((restaurant) => {
      const restaurantElement = document.createElement('div');
      restaurantElement.classList.add('search_restaurant-card');
      restaurantElement.innerHTML = `
                <div class="search_restaurant-card__image">
                    <img src="https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}" alt="${restaurant.name}" class="search_restaurant-image">
                </div>
                <div class="search_restaurant-card__info">
                    <h4 class="search_restaurant-name">${restaurant.name}</h4>
                    <p class="search_restaurant-description">${restaurant.description.slice(0, 100)}...</p> <!-- Membatasi deskripsi -->
                    <div class="search_restaurant-details">
                        <span class="search_restaurant-rating"><span class="material-symbols--star"></span> ${restaurant.rating}</span>
                        <span class="search_restaurant-location">  <span class="search-mdi-location"></span>
                           ${restaurant.city}</span>
                    </div>
                    <button class="search_view-details-btn" data-id="${restaurant.id}">Lihat</button>
                </div>
            `;
      searchResultsContainer.appendChild(restaurantElement);
    });

    searchResultsContainer.addEventListener('click', (event) => {
      if (event.target && event.target.classList.contains('search_view-details-btn')) {
        const restaurantId = event.target.getAttribute('data-id');
        window.location.hash = `#/restaurant/${restaurantId}`;
        const searchInput = document.getElementById('searchInput');
        searchInput.value = '';

        searchResultsContainer.style.display = 'none';
      }
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url] || routes['/'];
    const isDetailPage = (page === Detail);
    const heroElement = document.querySelector('.hero-section');

    if (heroElement) {
      heroElement.style.display = isDetailPage ? 'none' : 'block';
    }

    if (!page || typeof page.render !== 'function') {
      console.error('Page not found or render function missing:', url);
      this._content.innerHTML = '<h2>Page Not Found</h2>';
      return;
    }

    let restaurantData = null;

    if (page === ContentItem) {
      restaurantData = await getListOfRestaurants();
      if (restaurantData.length === 0) {
        this._content.innerHTML = '<h2>No Restaurants Found</h2>';
        return;
      }
    } else if (page === Detail) {
      const { id } = UrlParser.parseActiveUrlWithoutCombiner();
      restaurantData = await getDetailOfRestaurant(id);
      if (!restaurantData) {
        this._content.innerHTML = '<h2>Restaurant not found</h2>';
        return;
      }
    } else if (page === 'search') {
      const query = UrlParser.parseQuery();
      const results = await searchRestaurants(query);
      this._displaySearchResults(results);
      return;
    }

    this._content.innerHTML = await page.render(restaurantData);
    if (page.afterRender) await page.afterRender();

    // Tambahkan skrip skip to content
    const skipLinkElem = document.querySelector('.skip-to-content');
    skipLinkElem.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#maincontent').focus();
    });
  }
}

const app = new App({
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});

export default App;