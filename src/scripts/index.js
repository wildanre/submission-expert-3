import './components/script.js';
import '../styles/main.scss';
import './views/pages/content-item.js';
import swRegister from './utils/sw-register';
import App from './views/app';
import SearchBar from './components/search-bar';


document.addEventListener('DOMContentLoaded', () => {
  const app = new App({
    content: document.querySelector('#mainContent'),
  });

  const searchBarContainer = document.getElementById('searchBarContainer');
  if (searchBarContainer) {
    searchBarContainer.innerHTML = SearchBar.render();
    SearchBar.afterRender();
  }

  window.addEventListener('hashchange', () => {
    app.renderPage();
  });

  window.addEventListener('load', () => {
    app.renderPage();
    swRegister();
  });
});