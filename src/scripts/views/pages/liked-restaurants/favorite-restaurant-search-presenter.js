class FavoriteRestaurantSearchPresenter {
    constructor({ favoriteRestaurants, view }) {  // tambahkan `view` di sini
        this._favoriteRestaurants = favoriteRestaurants;
        this._view = view;  // sekarang `view` sudah diteruskan ke konstruktor
        this._latestQuery = '';

        this._listenToSearchRequestByUser();
    }

    _listenToSearchRequestByUser() {
        this._view.runWhenUserIsSearching((latestQuery) => {
            this._latestQuery = latestQuery.trim();
            this._searchRestaurants(latestQuery);
        });
    }

    async _searchRestaurants(query) {
        const trimmedQuery = query.trim();

        let foundRestaurants;
        if (trimmedQuery.length > 0) {
            foundRestaurants = await this._favoriteRestaurants.searchRestaurants(trimmedQuery);
        } else {
            foundRestaurants = await this._favoriteRestaurants.getAllRestaurants();
        }

        _showFoundRestaurants(foundRestaurants);
    }

    _showFoundRestaurants(restaurants) {
        this._view.showRestaurants(restaurants);
    }

    get latestQuery() {
        return this._latestQuery;
    }
}

export default FavoriteRestaurantSearchPresenter;
