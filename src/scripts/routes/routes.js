import ContentItem from '../views/pages/content-item';
import Search from '../views/pages/search';
import Detail from '../views/pages/detail';
import Favorite from '../views/pages/favorite';

const routes = {
  '/': ContentItem,
  '/search': Search,
  '/restaurant/:id': Detail,
  '/favorites': Favorite,
};

export default routes;
