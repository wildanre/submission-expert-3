import { createLikeRestaurantButtonTemplate, createUnlikeRestaurantButtonTemplate } from '../views/templates/template-creator';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, favoriteRestaurant, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;
    this._favoriteRestaurants = favoriteRestaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await this._favoriteRestaurants.getRestaurant(id);
    return !!restaurant;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeRestaurantButtonTemplate();
    this._addLikeButtonEvent();
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createUnlikeRestaurantButtonTemplate();
    this._addLikedButtonEvent();
  },

  _addLikeButtonEvent() {
    const likeButton = document.getElementById('likeButton');
    likeButton.addEventListener('click', async () => {
      if (!this._restaurant.id) {
        return;
      }
      await this._favoriteRestaurants.putRestaurant(this._restaurant);
      this._renderLiked();
    });
  },

  _addLikedButtonEvent() {
    const likeButton = document.getElementById('likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.deleteRestaurant(this._restaurant.id);
      this._renderLike();
    });
  },
};

export default LikeButtonPresenter;
