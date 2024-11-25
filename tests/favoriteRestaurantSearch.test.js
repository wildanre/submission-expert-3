import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';

describe('Searching restaurants', () => {
  let presenter;
  let favoritesRestaurants;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    document.body.innerHTML = `
      <div id="restaurant-search-container">
        <input id="query" type="text">
        <div class="restaurant-result-container">
          <ul class="restaurants"></ul>
        </div>
      </div>
    `;
  };

  const constructPresenter = () => {
    favoritesRestaurants = {
      getAllRestaurants: jest.fn(),
      searchRestaurants: jest.fn(),
    };

    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants: favoritesRestaurants,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      favoritesRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('restaurant a');
      expect(presenter.latestQuery).toEqual('restaurant a');
    });

    it('should ask the model to search for liked restaurant', () => {
      favoritesRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('restaurant a');
      expect(favoritesRestaurants.searchRestaurants).toHaveBeenCalledWith('restaurant a');
    });

    it('should show the title of the found restaurant', () => {
      presenter._showFoundRestaurants([
        { id: 1, title: 'Satu' },
      ]);

      expect(document.querySelectorAll('.restaurant__title').item(0).textContent).toEqual('Satu');

      presenter._showFoundRestaurants([
        { id: 1, title: 'Satu' },
        { id: 2, title: 'Dua' },
      ]);

      const restaurantTitles = document.querySelectorAll('.restaurant__title');
      expect(restaurantTitles.item(0).textContent).toEqual('Satu');
      expect(restaurantTitles.item(1).textContent).toEqual('Dua');
    });

    it('should show - for found restaurant without title', () => {
      presenter._showFoundRestaurants([{ id: 1 }]);

      expect(document.querySelectorAll('.restaurant__title').item(0).textContent).toEqual('-');
    });

    it('should show the restaurants found by Favorite Restaurant', (done) => {
      document
        .getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated',  () => {
          expect(document.querySelectorAll('.restaurant__title').length).toEqual(3);
          done();
        });

      favoritesRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 111, title: 'restaurant abc' },
            { id: 222, title: 'ada juga restaurant abcde' },
            { id: 333, title: 'ini juga boleh restaurant a' },
          ];
        }
        return [];
      });

      searchRestaurants('restaurant a');
    });

    it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
      document
        .getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          const restaurantTitles = document.querySelectorAll('.restaurant__title');
          expect(restaurantTitles.item(0).textContent).toEqual('restaurant abc');
          expect(restaurantTitles.item(1).textContent).toEqual('ada juga restaurant abcde');
          expect(restaurantTitles.item(2).textContent).toEqual('ini juga boleh restaurant a');
          done();
        });

      favoritesRestaurants.searchRestaurants.mockImplementation((query) => {
				if (query === 'restaurant a') {
					return [
						{ id: 111, title: 'restaurant abc' },
						{ id: 222, title: 'ada juga restaurant abcde' },
						{ id: 333, title: 'ini juga boleh restaurant a' },
					];
				}
				return [];
			});
			

      searchRestaurants('restaurant a');
			(10000); 
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
			favoritesRestaurants.getAllRestaurants.mockImplementation(() => []);

      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

		it('should show all favorite movies', () => {
			favoritesRestaurants.getAllRestaurants.mockImplementation(() => []);

      searchRestaurants('    ');
      expect(favoritesRestaurants.getAllRestaurants).toHaveBeenCalled();
    });
  });
});
