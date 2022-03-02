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
                        <button class = "btn btn-dark recipe-btn">Get Recipe</button>
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
const button = document.getElementById("map");
button.addEventListener("click", ()=>{
    if(navigator.geolocation){
        button.innerText = "Allow to detect location";
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        button.innerText = "Your browser not support";
    }
});

//
function onSuccess(position){
    button.innerText = "Detecting your location...";
    let {latitude, longitude} = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=c03e80486a604d41b931a3a3c01118a2`)
    .then(response => response.json()).then(response =>{
        console.log(response.json);
        let allDetails = response.results[0].components;
        console.table(allDetails);
        let {county, postcode, country} = allDetails;
        button.innerText = `${county} ${postcode}, ${country}`;
    }).catch(()=>{
        button.innerText = "Something went wrong";
    });
}
function onError(error){
    if(error.code == 1){
        button.innerText = "You denied the request";
    }else if(error.code == 2){
        button.innerText = "Location is unavailable";
    }else{
        button.innerText = "Something went wrong";
    }
    button.setAttribute("disabled", "true");
}
