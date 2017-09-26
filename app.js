$(document).ready(function() {
  $('select').material_select();

  let currentIndex = 0;
  let apiResults;

    $("#splash-search-btn").click(function(){
      let includes = $("#include-ingredients").val();
      let excludes = $("#exclude-ingredients").val();
      let multiDiet = $("#multiple-diet-type").val() || [];
      let multiHealthReq = $("#multiple-health-requirements").val();

        $.get(`https://api.edamam.com/search?q=${includes}&app_id=d8eae4e9&app_key=9e90c9baecdafc9b69a2527f2a3fd35c&from=0&to=25&Diet=${multiDiet}&Health=${multiHealthReq}`, displayResults);
    });

    function displayResults(searchResults) {
      apiResults = searchResults;

    let cardArt = document.getElementById("recipeArt");
      cardArt.src = searchResults.hits[currentIndex].recipe.image;
      recipeSpot.appendChild(cardArt);

    let cardLabel = $('#cardLabel');
      $("#cardLabel").html(`${searchResults.hits[currentIndex].recipe.label} <i class="material-icons right">more_vert</i>`)

    let cardDiet = $('#cardDiet');
      $("#cardDiet").text(`${searchResults.params.Diet}`);

    let cardHealth = $('#cardHealth');
      $("#cardHealth").text(`${searchResults.params.Health}`);

    let cardCalories = $('#cardCalories');
      $("#cardCalories").text(`${Math.floor(searchResults.hits[currentIndex].recipe.calories)}`);
      console.log('CARD CALORIES',cardCalories);

    let cardServings = $('#cardServings');
      $("#cardServings").text(`${searchResults.hits[currentIndex].recipe.yield}`);
      console.log('CARD SERVINGS', cardServings);

    let cardCPS = parseInt($('#cardCalories').html()) / parseInt($('#cardServings').html());
      $("#cardCPS").text(cardCPS);

    let revealLabel = $('#revealLabel');
      $("#revealLabel").html(`${searchResults.hits[currentIndex].recipe.label} <i class="material-icons right">close</i>`);

    let ingredientsList = $("#ingredientsListAll");
    let ingredients = searchResults.hits[currentIndex].recipe.ingredientLines

      ingredientsList.html("");
      for(let i=0; i<ingredients.length; i++){
        let listItems = document.createElement("li");
        listItems.style.listStyleType = "disc";
        listItems.style.margin = "0 0 0 20px";
        listItems.innerHTML= ingredients[i];
        ingredientsList.append(listItems);
      }

    $("a.cooking-instructions").attr("href", `${searchResults.hits[0].recipe.url}`);

    let revealSource = $('#recipe-source');
      $("#recipe-source").text(`${searchResults.hits[0].recipe.source}`);
  }

  let next = document.getElementById("splash-next-btn");
  next.addEventListener("click", function(){
    if(currentIndex==24){
      currentIndex = 0;
    }else{
      currentIndex++;
    }

    if(apiResults){
      displayResults(apiResults);
    }
  });
});
