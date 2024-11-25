class FavoriteRestaurantSearchPresenter {
    constructor({ favoriteRestaurants }) {
      this._favoriteRestaurants = favoriteRestaurants;
      this._latestQuery = '';
      this._initializeSearchBox();
    }
  
    _initializeSearchBox() {
      const queryElement = document.getElementById('query');
      queryElement.addEventListener('change', (event) => {
        this.latestQuery = event.target.value;
      });
    }
  
    get latestQuery() {
      return this._latestQuery;
    }
  
    set latestQuery(query) {
      this._latestQuery = query.trim();
      this._searchRestaurants(query);
    }
  
    async _searchRestaurants(query) {
        const trimmedQuery = query.trim();

        let foundRestaurants;
        if (trimmedQuery.length > 0) {
          foundRestaurants = await this._favoriteRestaurants.searchRestaurants(trimmedQuery);
        } else {
          foundRestaurants = await this._favoriteRestaurants.getAllRestaurants();
        }
      
        this._showFoundRestaurants(foundRestaurants);
      }
  
    _showFoundRestaurants(restaurants) {
        const restaurantList = document.querySelector('.restaurants');
        restaurantList.innerHTML = '';
      
        if (!Array.isArray(restaurants) || restaurants.length === 0) {
          restaurantList.innerHTML = '<li class="restaurant__title">No restaurants found</li>';
          return;
        }
      
        restaurants.forEach((restaurant) => {
          const restaurantElement = document.createElement('li');
          restaurantElement.classList.add('restaurant__title');
          restaurantElement.textContent = restaurant.title || '-';
          restaurantList.appendChild(restaurantElement);
        });
      
        document
          .getElementById('restaurant-search-container')
          .dispatchEvent(new Event('restaurants:searched:updated'));
      }
      
  }
  
  export default FavoriteRestaurantSearchPresenter;
  