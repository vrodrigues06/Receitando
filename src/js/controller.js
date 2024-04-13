import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import uploadView from './views/uploadView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime.js';
import { async } from 'regenerator-runtime';

const controlPagination = function (el) {
  const { search } = model.state;
  if (el.classList.contains('pagination__btn--prev')) --search.page;
  if (el.classList.contains('pagination__btn--next')) ++search.page;

  resultsView.render(model.getSearchResultsPage(search.page));
  paginationView.render(search);
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();

    await model.loadSearchResults(query);

    const { search } = model.state;

    resultsView.render(model.getSearchResultsPage());
    paginationView.render(search);
  } catch (err) {
    console.error(err);
  }
};

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Update results view to mark selected search results

    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    recipeView.renderSpinner();

    // Load Recipe
    await model.loadRecipe(id);

    // Rendering Recipe
    recipeView.render(model.state.recipe);

    // Handling with errors
  } catch (err) {
    recipeView.renderError();
  }
};

const controlServings = function (numServing, btn) {
  if (numServing <= 0) return (btn.disabled = true);
  model.updateServings(numServing);

  recipeView.render(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update Recipe View
  recipeView.update(model.state.recipe);

  // Render Bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    await model.uploadRecipe(newRecipe, uploadView.createArrayOfIngredients());

    addRecipeView.renderSpinner();

    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const controlAddIngredients = function () {
  uploadView.renderIngredientInput();
};

const b = 'oi';
(function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  paginationView.addHandlerPagination(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  uploadView.addHandlerIngredients(controlAddIngredients);
})();
