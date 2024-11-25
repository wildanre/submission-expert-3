class FavoriteRestaurantSearchPresenter {
    constructor({ favoriteRestaurants, view }) {
        this._favoriteRestaurants = favoriteRestaurants;
        this._view = view;
        this._latestQuery = '';

        this._listenToSearchRequestByUser();
    }

    _listenToSearchRequestByUser() {
        // Make sure view is properly calling this method when user is typing
        this._view.runWhenUserIsSearching((latestQuery) => {
            this._latestQuery = latestQuery.trim();
            this._searchRestaurants(latestQuery);
        });
    }

    async _searchRestaurants(query) {
        const trimmedQuery = query.trim();

        let foundRestaurants = [];

        try {
            if (trimmedQuery.length > 0) {
                foundRestaurants = await this._favoriteRestaurants.searchRestaurants(trimmedQuery);
            } else {
                foundRestaurants = await this._favoriteRestaurants.getAllRestaurants();
            }

            // Show the results
            this._showFoundRestaurants(foundRestaurants);
        } catch (error) {
            console.error('Error while searching restaurants:', error);
        }
    }

    _showFoundRestaurants(restaurants) {
        const restaurantContainer = document.getElementById('restaurant-search-container');
        restaurantContainer.innerHTML = ''; // Clear previous search results

        // If no restaurants are found, you might want to display a message
        if (restaurants.length === 0) {
            const noResultsMessage = document.createElement('div');
            noResultsMessage.classList.add('restaurants__not__found');
            noResultsMessage.textContent = 'No restaurants found.';
            restaurantContainer.appendChild(noResultsMessage);
        }

        // Display found restaurants
        restaurants.forEach((restaurant) => {
            const restaurantElement = document.createElement('div');
            restaurantElement.classList.add('restaurant__title');
            restaurantElement.textContent = restaurant.title || '-';
            restaurantContainer.appendChild(restaurantElement);
        });

        // Dispatch event when the list has been updated
        const event = new CustomEvent('restaurants:searched:updated');
        restaurantContainer.dispatchEvent(event);
    }

    get latestQuery() {
        return this._latestQuery;
    }
}

export default FavoriteRestaurantSearchPresenter;
