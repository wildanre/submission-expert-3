import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const favorite = {
  async render() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    return `
      <section class="content">
        <div class="explore">
          <h1 class="explore-label">Daftar Restoran Favorit</h1>
          <div class="posts">
            ${restaurants.map((restaurant) => `
              <div class="restaurant-item" tabindex="0">
                <div class="rating">
                  <span class="star">⭐</span>
                  <span class="rating-number">${restaurant.rating}</span>
                </div>
                <img src="https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}" alt="${restaurant.name}">
                <div class="restaurant-item-content">
                  <p class="city">
                    <span class="mdi--location"></span> ${restaurant.city}
                  </p>
                  <h2>
                    <a href="#/restaurant/${restaurant.id}">${restaurant.name}</a>
                  </h2>
                  <p>${restaurant.description || 'No description available'}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
  },
};

export default favorite;
