import View from './View.js';
import previewView from './previewView.js';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage =
    'Ainda não há favoritos. Encontre uma boa receita e marque-a :)';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateHtml() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new BookmarksView();
