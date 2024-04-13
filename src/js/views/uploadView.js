import View from './View';
import icons from 'url:../../img/icons.svg';

class UploadView extends View {
  _parentEl = document.querySelector('.ingredients');
  _button = document.querySelector('.add-ingredients');

  addHandlerIngredients(handler) {
    this._button.addEventListener(
      'click',
      function (e) {
        e.preventDefault();
        if (this.countingInputs() >= 9) return (this._button.disabled = true);
        handler(this._parentEl);
      }.bind(this)
    );
  }

  countingInputs() {
    const ings = this._parentEl.querySelectorAll('label');

    return ings.length;
  }

  renderIngredientInput() {
    const html = `  <label>Ingrediente</label>
    <div class="ingredient__container--input">
      <input class="qtd" value="" placeholder="qtd" type="text" name="ingredient-qtd" />
      <select name="ingredient-unit">
        <option selected value="">un.</option>
        <option value="kg">kg</option>
        <option value="g">g</option>
        <option value="ml">ml</option>
        <option value="L">L</option>
      </select>
      <input class="ing-name" value="" type="text" placeholder="ingrediente" required name="ingredient" />
    </div>`;

    this._parentEl.insertAdjacentHTML('beforeend', html);
  }

  createArrayOfIngredients() {
    const containersIngs = document.querySelectorAll(
      '.ingredient__container--input'
    );

    const ingsArray = [...containersIngs].map(container => {
      const containerChildren = [...container.children];
      const rightFormat = containerChildren.map(input => {
        return input.value.replace(',', '.');
      });

      return rightFormat.join(',');
    });

    return ingsArray;
  }
}

export default new UploadView();
