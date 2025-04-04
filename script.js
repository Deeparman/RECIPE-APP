const btn = document.querySelector('.searchbtn');
const box = document.querySelector('.searchbox');
const recipeContainer = document.querySelector('.recipe-container');
const recipeContent = document.querySelector('.recipe-detail-content');
const close_btn = document.querySelector('.close_btn')



const  fetchRecipes = async (query) =>{
    recipeContainer.innerHTML = "<h2>FETCHING RECIPIES.....</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const res = await data.json();

    recipeContainer.innerHTML="";
    if (!res.meals) {
        recipeContainer.innerHTML = "<h2>No recipes found</h2>";
        return;
    }

    document.body.style.backgroundImage = "url('f55b221d387fd060cbb6defb9a201101.jpg')";

    res.meals.forEach(meal => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p> <span>${meal.strArea} </span>Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
         `

        const btn2 = document.createElement("button");
        btn2.textContent = "View Recipe";

        recipeContainer.appendChild(recipeDiv);
        recipeDiv.appendChild(btn2);

        btn2.addEventListener("click" , () => {
            openRecipe(meal);
        })
    });
}



//open recipe popup
const openRecipe = (meal) => {
    recipeContent.innerHTML = `
    <h2 class="recipeName"> ${meal.strMeal} </h2>
    <h3> <b>Ingredients :  </b></h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions"> 
            <h3 > <b>Instructions : </b></h3> 
            <p > ${meal.strInstructions}</p> 
        </div>
 `
    recipeContent.parentElement.style.display = "block";
}

//fetch recipe and ingredient 
const fetchIngredients = (meal) => {
    let ingredientList = "";
    for(let i = 1 ; i <= 20;i++) {
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient) {
            const mes = meal[`strMeasure${i}`];
            ingredientList += `<li>${mes}  ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientList;
}

close_btn.addEventListener("click" ,  () => {
    recipeContent.parentElement.style.display = "none";
});


btn.addEventListener("click" , (e)=>{
    e.preventDefault();
    let inp = box.value.trim();
    fetchRecipes(inp);
    box.value = "";
})


