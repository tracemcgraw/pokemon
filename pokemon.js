const tHead = document.getElementById("tHead");
const tBody = document.getElementById("tBody");
const searchPoke = document.getElementById("searchPoke");

const baseURL = 'https://pokeapi.co/api/v2/pokemon/';
let url;
let google = 'http://google.com';
`${google}`

function searchPokemon() {
    let pokeName = searchPoke.value; 
    if(pokeName.trim() == "") {
        alert("Enter a pokemon!"); 
    } else {
        //fetch and display results
        url = baseURL + pokeName.toLowerCase(); //if the pokemon's name is in capital letters, the search will be returned as undefined
        fetch(url)
        .then(response => { //response is the promise that we create to represent the data from the API
            return response.json() //convert the response we get from the API into a json object
        }).then(data => {
            console.log(data);
            fillTable(data);
        })
    }
}
function fillTable(pokeObj) {
    while (tHead.firstChild) {
        tHead.removeChild(tHead.firstChild);
        // code for other data

    }
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }
    console.log(pokeObj);
    tHead.innerHTML = '<tr><td><b>'+ 'Pokemon: ' + '</b</td><td><b>' +capFirstName(pokeObj.name) + '</b></td></tr>';
    tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "PokéDex ID #:" + '</td><td>' + pokeObj.id + '</td></tr>');
    

    switch (pokeObj.types.length) { //check the length of the array to decide how to continue
        case 2: //pokemon has 2 types
            tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "Types:" + '</td><td>' + 
                capFirstName(pokeObj.types[1].type.name) + '/' + //The types come back reversed from the API, so we put the second one first.
                capFirstName(pokeObj.types[0].type.name) + '</td></tr>');
            break; //ends the statement after the correct case has run
        case 1: //pokemon has 1 type
            tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "Type" + '</td><td>' +
                capFirstName(pokeObj.types[0].type.name) + '</td></tr>');
            break;
        default: //in case something goes crazy
            break;
    }
    tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "Sprites:" + '</td><td>' + 
        `<img src=${pokeObj.sprites.front_default} />` +
        `<img src=${pokeObj.sprites.back_default} />` + '</td></tr>');
    
        switch (pokeObj.abilities.length){
            case 3: //pokemon has 3 abilities
            tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "Abilities:" + '</td><td>' + 
                capFirstName(pokeObj.abilities[2].ability.name) + '/' + //The abilities come back reversed from the API, so we put the second one first.
                capFirstName(pokeObj.abilities[1].ability.name) + '/'+
                capFirstName(pokeObj.abilities[0].ability.name) + '</td></tr>');
            break; //ends the statement after the correct case has run
            case 2: //pokemon has 2 abilities
            tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "Abilities:" + '</td><td>' + 
                capFirstName(pokeObj.abilities[1].ability.name) + '/' + //The abilities come back reversed from the API, so we put the second one first.
                capFirstName(pokeObj.abilities[0].ability.name) + '</td></tr>');
            break; //ends the statement after the correct case has run
            case 1: //pokemon has 1 abilities
            tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "Abilities:" + '</td><td>' +
                capFirstName(pokeObj.abilities[0].ability.name) + '</td></tr>');
            break;
        default: //in case something goes crazy
            break;
        }
        switch (pokeObj.forms.length){
            case 3: //pokemon has 3 forms
            tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "Forms:" + '</td><td>' + 
                capFirstName(pokeObj.forms[2].form.name) + '/' + //The forms come back reversed from the API, so we put the second one first.
                capFirstName(pokeObj.forms[1].form.name) + '/'+
                capFirstName(pokeObj.forms[0].form.name) + '</td></tr>');
            break; //ends the statement after the correct case has run
            case 2: //pokemon has 2 forms
            tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "Forms:" + '</td><td>' + 
                capFirstName(pokeObj.forms[1].form.name) + '/' + //The forms come back reversed from the API, so we put the second one first.
                capFirstName(pokeObj.forms[0].form.name) + '</td></tr>');
            break; //ends the statement after the correct case has run
            case 1: //pokemon has 1 forms
            tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "Forms:" + '</td><td>' +
                capFirstName(pokeObj.forms[0].form.name) + '</td></tr>');
            break;
            default: //in case something goes crazy
            break;
        }
}
function capFirstName(x){
    for (let j in x){
        if(j == 0){
            x = x.replace(x[j].toUpperCase());
        }
        if(x[j-1] == '-'){
            x = x.replace(x[j], x[j].toUpperCase());
            x = x.replace(x[j-1], '');
        }
    }
    return x
}


fillTable();