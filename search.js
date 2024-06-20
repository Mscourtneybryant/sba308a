const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food" width="200">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    
    let html = `
    
        <h1 class = "recipe-title">${meal.strMeal}</h1>
        <h2 class = "recipe-category">Category: ${meal.strCategory}</h2>
        <div class = "recipe-instruct">
            <h3 class="insructTitle">Instructions:</h3>
            <p class="fullInstruct">${meal.strInstructions}</p>

            
            <h4 class="ingrList">Ingredients<h4>
            <ul>
            <li class="ingr">${meal.strIngredient1}<li>
              <li class="ingr">${meal.strIngredient2}<li>
                <li class="ingr">${meal.strIngredient3}<li>
                 <li class="ingr">${meal.strIngredient4}<li>
                  <li class="ingr">${meal.strIngredient5}<li>
                   <li class="ingr">${meal.strIngredient6}<li>
               <li class="ingr">${meal.strIngredient7}<li>
                <li class="ingr">${meal.strIngredient8}<li>
                 <li class="ingr">${meal.strIngredient9}<li>
                  <li class="ingr">${meal.strIngredient10}<li>
                    <li class="ingr">${meal.strIngredient11}<li>
                      <li class="ingr">${meal.strIngredient12}<li>
                      <li class="ingr">${meal.strIngredient13}<li>
            </ul>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "" width="300">
        </div>
    
   
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}




