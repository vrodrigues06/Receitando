const recipeContainer = document.querySelector(".recipe");
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
const showRecipe = async function(url) {
    try {
        const response = await fetch(url);
        const { data } = await response.json();
        const { recipe } = data;
        console.log(recipe);
    } catch (err) {}
};
showRecipe("https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886");

//# sourceMappingURL=index.62406edb.js.map
