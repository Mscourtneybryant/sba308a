//api key Yxy77wu4ePQ0U2HDzWsdjQQbIfDyeSfgRoRtXW4txnsvRLlgroeAA8RO

//import { createClient } from 'pexels';
//const client = createClient('Yxy77wu4ePQ0U2HDzWsdjQQbIfDyeSfgRoRtXW4txnsvRLlgroeAA8RO');
//https://api.pexels.com/v1 -pexels api


fetch("https://www.themealdb.com/api/json/v1/1/random.php")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then(data => {
    console.log(data);
    displayMeal(data)
  })
  .catch((error) => console.error("FETCH ERROR:", error));







  function displayMeal (data){
    const meal = data.meals[0];
     const mealDiv = document.getElementById("meal");

     const mealName = meal.strMeal;
     const heading = document.createElement("h1");
     heading.innerHTML = mealName;
     mealDiv.appendChild(heading);

     const mealPic = document.createElement("img");
     mealPic.src = meal.strMealThumb;
     mealDiv.appendChild(mealPic);



     

     const mealIngredients = document.createElement("ul");
  mealDiv.appendChild(mealIngredients);
  const getIngredients = Object.keys(meal)
  .filter(function (ingredient) {
    return ingredient.indexOf("strIngredient") == 0;
   })
   .reduce(function(ingredients, ingredient){
    if (meal[ingredient] !=null) {
        ingredients[ingredient] = meal[ingredient];
    }
    return ingredients
   }, {});
   for (let key in getIngredients){
    let value = getIngredients[key];
    listItem = document.createElement("li");
    listItem.innerHTML = value;
    mealIngredients.appendChild(listItem)

   }

   const instructions = meal.strInstructions;
   const instruct = document.createElement("p");
   instruct.innerHTML = instructions;
   mealDiv.appendChild(instruct)


  }

  document.getElementById("newRecipe").addEventListener("click", changeMeal);

  function changeMeal(){
    location.reload()
  }