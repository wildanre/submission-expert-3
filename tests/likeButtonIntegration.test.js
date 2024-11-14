/* eslint-disable no-undef */
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';

describe('Menyukai dan Batal Menyukai Restoran', () => {
  let restaurant;
  let likeButtonContainer;

  beforeEach(() => {
    restaurant = { id: 'rqdv5juczeskfw1e867', name: 'Melting Pot' }; // Restaurant sample
    likeButtonContainer = document.createElement('div');
    document.body.appendChild(likeButtonContainer);
  });

  afterEach(() => {
    document.body.innerHTML = ''; // Hapus DOM setelah tes selesai
  });

  it('seharusnya dapat menyukai restoran yang baru', async () => {
    await LikeButtonInitiator.init({ likeButtonContainer, restaurant });

    const likeButton = document.getElementById('likeButton');
    expect(likeButton).not.toBeNull();

    likeButton.dispatchEvent(new Event('click')); // Menyukai restoran
    await new Promise((resolve) => setTimeout(resolve, 100)); // Tunggu agar perubahan selesai

    const likedRestaurant = await FavoriteRestaurantIdb.getRestaurant(restaurant.id);
    expect(likedRestaurant).toEqual(restaurant); // Verifikasi restoran disukai
  });

  it('seharusnya dapat batal menyukai restoran yang disukai', async () => {
    await FavoriteRestaurantIdb.putRestaurant(restaurant); // Simulasikan restoran sudah disukai
    await LikeButtonInitiator.init({ likeButtonContainer, restaurant });

    const likeButton = document.getElementById('likeButton');
    expect(likeButton).not.toBeNull();

    likeButton.dispatchEvent(new Event('click')); // Batal menyukai restoran
    await new Promise((resolve) => setTimeout(resolve, 100)); // Tunggu agar perubahan selesai

    const deletedRestaurant = await FavoriteRestaurantIdb.getRestaurant(restaurant.id);
    expect(deletedRestaurant).toBeFalsy(); // Verifikasi restoran telah dihapus
  });




});
