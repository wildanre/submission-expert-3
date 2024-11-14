import CONFIG from './config';

const getListOfRestaurants = async () => {
  const response = await fetch(`${CONFIG.BASE_URL}/list`);
  const data = await response.json();
  return data.restaurants;
};

const getDetailOfRestaurant = async (id) => {
  const response = await fetch(`${CONFIG.BASE_URL}/detail/${id}`);
  const data = await response.json();
  return data.restaurant;
};

const addReview = async (reviewData) => {
  const response = await fetch(`${CONFIG.BASE_URL}/review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  });
  const data = await response.json();
  return data;
};

const searchRestaurants = async (query) => {
  const response = await fetch(`${CONFIG.BASE_URL}/search?q=${query}`);
  if (!response.ok) throw new Error('Failed to fetch data');
  return await response.json();
};

export {
  getListOfRestaurants,
  getDetailOfRestaurant,
  addReview,
  searchRestaurants
};
