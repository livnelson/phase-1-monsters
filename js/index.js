// ! GLOBAL VARIABLES
const MONSTER_BASE_URL = "http://localhost:3000/monsters/"					// this defines the fetch, making it global so you can call the host elsewhere
const monsterContainer = document.getElementById("monster-container")		// define global vaiables
const monsterForm = document.getElementById("monster-form")
const back = document.getElementById("back")
const forward = document.getElementById("forward")
let startingIdx = 0															// this is for scrolling by page
const limit = 2																// this is also for scrolling by page
let allMonstersArr = []														// this is declaring the json data received

const fetchAllMonsters = () => {											// this is the fuction calling the fetch
	fetch(MONSTER_BASE_URL)													// GET data from json - this is the fetch calling on the url in the glabal scope/ fetch is invoked
		.then((response) => response.json())								// receves promise / translates to json format
		.then((monsterData) => {											// declares a variable for our json data and renders (invoks) a function
			console.log(monsterData)										
			allMonstersArr = monsterData
			displayMonsters(startingIdx)
		})
}

const displayMonsters = (startingIdx) => {									// this tells how how to display the monsters using a for loop
	resetContainer()														// resets container counter for scrolling by page - function is invoked
	for (let i = startingIdx; i < limit + startingIdx; i++) {				// for loop 
		createMonsterCard(allMonstersArr[i])								// foor loop behavior - applying individual monster card to the array in the global scope
	}
}

const createMonsterCard = (monster) => {									// ths is the indivudual monster card (form) function (global) to build a monster
	const div = document.createElement("div")								// this is the container that the form "lives in" in the HTML	
	const nameTag = document.createElement("h1")							// these are the fields for the form we are building
	const ageTag = document.createElement("h2")								
	const descTag = document.createElement("p")

	// div.addEventListener("click", (e) => console.log(e.target))

	nameTag.textContent = monster.name										// this points to where we receive the data within the json (monster.json)
	ageTag.textContent = monster.age
	descTag.textContent = monster.description

	div.append(nameTag, ageTag, descTag)
	monsterContainer.append(div)											// this is where we append the elements created above to the container it lives in
}

const fetchPostMonster = (newMonsterObj) => {								// this is where we POST the new data to the server using another fetch - always check the URL
	const postReqObj = {													// function within a function declaring the POST required object
		method: "POST",														// this is the POST/fetch/ restful http method
		headers: {
			"content-type": "application/json",								// these are the headers
			Accept: "application/json",
		},
		body: JSON.stringify(newMonsterObj),								// this is the body calling on the function with the data we want to POST
		// body: JSON.stringify({name, age, desc}),
	}

	fetch(MONSTER_BASE_URL, postReqObj)										// this is the fetch POST function
		.then((response) => response.json())								// this is the fetch POST response fro mthe server
		.then((monsterObj) => {												// this daclares the variable for the data  
			console.log(monsterObj)
			createMonsterCard(monsterObj)									// this is where the function is invoke and applied to the parameter in the ()
		})
}

const handleForward = () => {
	// resend the fetch req for the current page plus 1 (if it exists)		// this is the function for scrolling page forward
	console.log("FORWARD")
	// console.log((pageNum += 1))
	startingIdx += limit													// this is for limiting the number of items to show on the first page
	displayMonsters(startingIdx)											// this is calling of the function for display the group of monsters 
}																			// it applies the paramenter for scrolling forward

const handleBack = () => {
	// resend the fetch req for the current page minus 1 (if it exists)		// this is the function for scrolling back a pgae, stopping at 0
	console.log("BACKWARDS")
	// console.log((pageNum -= 1))
	startingIdx -= limit
	displayMonsters(startingIdx)

}

const handleAddMonster = (event) => {										// this is the function we are using to display the new monster on the list
	event.preventDefault()													// tis prevents the page from auto refreshing
	const name = event.target[0].value
	const age = event.target[1].value
	const description = event.target[2].value
	fetchPostMonster({ name, age, description })							// this invokes the fetch function that sends the POST
}

const resetContainer = () => {												// this is the function to reset the containr count to always dispaly 50 at a time
	monsterContainer.innerHTML = ""
}

const init = () => {														// this function initializes the functions that get called on first on the page
	fetchAllMonsters()
	monsterForm.addEventListener("submit", handleAddMonster)				// this also adds critial event listeners before buttons/submits are loaded
	forward.addEventListener("click", handleForward)
	back.addEventListener("click", handleBack)
}

init()																		// this is where the init() function is invoked