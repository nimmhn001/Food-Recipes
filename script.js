const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealContent = document.querySelector(".meal-details-content");
console.log(mealContent);
const recipeCloseBtn = document.getElementById('recipe-close-btn');

console.log("hello");
// event listeners
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    //console.log(mealContent.parentElement.classList + " helloeee");
    mealContent.parentElement.style.visibility = "hidden";
    //console.log(mealContent.parentElement.classList + " removed");
});

// got meal list

function getMealList()
{
   
    let searchInputText = document.getElementById("search-input").value.trim();
    console.log(searchInputText);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then(response=>response.json())
    .then(data=>{
        let html = "";
        if(data.meals)
        {
            data.meals.forEach(meal => 
            {
                html += `
             
                <div class = "meal-item" data-id = "${meal.idMeal}" style = "background-color: white;">
                    <div class = "meal-img">
                        <img src = "${meal.strMealThumb}" alt = "food">
                    </div>
                    <div class = "meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href = "#" class = "recipe-btn">Get Recipe</a>
                    </div>
                </div>
            `;
            }); 
            mealList.classList.remove("notFound");
         }
         else
         {
             html = "Sorry, we didn't find any recipe :(";
             mealList.classList.add("notFound");
         }
        mealList.innerHTML = html;
      
    });
    document.querySelector(".title").style.display = "inline";
    document.querySelector(".meal-result").backgroundColor = "white";
}


function getMealRecipe(e)
{
   
    e.preventDefault();
    console.log(e.target);
    if(e.target.classList.contains("recipe-btn"))
    {
        let mealItem = e.target.parentElement.parentElement;
        console.log(mealItem);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response=>response.json())
        .then(data=>mealRecipeModal(data.meals));
        mealContent.parentElement.style.visibility = "visible";
    }
    
}

// modal creation

function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <h3>Happy Cooking !!</h3>
        </div>
    `;
    mealContent.innerHTML = html;
    mealContent.parentElement.classList.add('showRecipe');
}

