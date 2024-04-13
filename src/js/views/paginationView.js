import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerPagination(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      handler(btn);
    });
  }

  _generateBtnPrev(pageNumber) {
    return `<button class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}.svg#icon-arrow-left"></use>
    </svg>
    <span>Pag ${pageNumber - 1}</span>
  </button>`;
  }

  _generateBtnNext(pageNumber) {
    return `<button class="btn--inline pagination__btn--next">
    <span>Pag ${pageNumber + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
  }

  _generateHtml() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateBtnNext(currentPage);
    }

    // Page 1 and there aren't other pages
    if (numPages === 1) {
      return '';
    }

    // Last Page

    if (currentPage === numPages && currentPage > 1) {
      return this._generateBtnPrev(currentPage);
    }

    // other pages
    if (currentPage > 1 && currentPage < numPages) {
      return `${this._generateBtnNext(currentPage)} 
            ${this._generateBtnPrev(currentPage)}`;
    }
  }
}

export default new PaginationView();
