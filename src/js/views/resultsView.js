import View from './View';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage =
    'Nenhuma receita encontrada para sua busca! Por favor, tente novamente.';
  _message;

  _generateHtml() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
