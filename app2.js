
//fetching the data from the api
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






 //displaying the data
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



     
//looping through all of the ingredients since it is not an array
//to look for and filter out any ingredients that have null
// so only ingredients that have a value will show

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

   //displaying the instructions attached to each meal
   const instructions = meal.strInstructions;
   const instruct = document.createElement("p");
   instruct.innerHTML = instructions;
   mealDiv.appendChild(instruct)


  }


  //creating a onclick function for the new recipe button so the page can refresh and display a 
  //new meal everytime it is clicked
  document.getElementById("newRecipe").addEventListener("click", changeMeal);

  function changeMeal(){
    location.reload()
  }