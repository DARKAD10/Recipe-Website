document.getElementById('hamburger').addEventListener('click', function() {
    document.getElementById('nav-links').classList.toggle('active');
});
const searchIcon = document.getElementById('search-icon');
const viewReceipe = document.getElementById('receipe-btn');
const recipeDetail=document.querySelector('.recipe-detail');
const recipeBtn=document.querySelector('.recipe-close');
const recipeDetailContainer=document.querySelector('.recipe-detail-container');


// Search icon event listener
searchIcon.addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    fetchRecipes(query);
});

function fetchRecipes(query) {
    const appId = '1e7719d7';
    const appKey = '79aebf8b8a823e5241d20d49926791ce';
    const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayRecipes(data.hits);
        })
        .catch(error => console.error("Error while fetching recipe:", error));
}

function displayRecipes(recipes) {
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = ''; // Clear previous results

    recipes.forEach(recipeData => {
        const recipe = recipeData.recipe; // Access the recipe object
        console.log(recipe);
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe'); // Added correct class name
        
        recipeElement.innerHTML = `
            <h2>${recipe.label}</h2>
            <img src="${recipe.image}" alt="${recipe.label}">
            <p><strong>Source:</strong> ${recipe.source}</p> `
            const button=document.createElement('button')
            button.textContent="view recipe";
            recipeElement.appendChild(button);

            button.addEventListener('click',()=>{
                openRecipePopup(recipe);
                console.log(recipe.label);
            })

        resultContainer.appendChild(recipeElement); // Append each recipe to the container
    });
}

function fetchIngredients(recipe) {
    let ingredientsList = "";
    if (recipe.ingredients) {
        recipe.ingredients.forEach(ingredient => {
            ingredientsList += `<li>${ingredient.text}</li>`;
        });
    }
    return ingredientsList;
}
const openRecipePopup=(recipe)=>{
    recipeDetailContainer.innerHTML=`
    <h2>${recipe.label}</h2>
    <ul>${fetchIngredients(recipe)}</ul>`;

    recipeDetailContainer.parentElement.style.display="block";
}
recipeBtn.addEventListener('click', () => {
    recipeDetail.style.display = "none";
});


