
// arrays of objects of runners runners

openArray = [];
mastersArray = [];
grand_mastersArray = [];

// array of races with data already entered
// races_run = {
// 	coogans: [],
// 	cp_4miler: [],
// 	bk_Half: [],
// 	queens: [],
// 	team_Champs: [],
// 	harlem: [],
// 	fifth_ave: [],
// 	bk: [],
// 	nyc: [],
// 	corbitt: []
// };

//objects to contain runners by age

open_runners = {};
masters_runners = {};
grand_masters_runners = {};

// selections
enteredInfo = document.querySelector('#info');
const scoresList = document.querySelector('.scores');
let ageGroup = document.getElementsByClassName('age');
let clearButton = document.querySelector('#clear')
let thirds = document.querySelectorAll('.third')
let sorted = [];
let myModal = document.querySelector('.modal');
let modal_container = document.querySelector('.modal_container')

// tbd if it does anything
stringCheck = {
	"open": openArray,
	"masters": mastersArray,
	"grandmasters": grand_mastersArray
}

// object combining points for normal races and team champs
test_points = {
	points: {
		0: 10,
		1: 8,
		2: 6,
		3: 4,
		4: 2

	}
	// ,
	// teamChamps: {
	// 	0: 20,
	// 	1: 18,
	// 	2: 16,
	// 	3: 14,
	// 	4: 12,
	// 	5: 10,
	// 	6: 8,
	// 	7: 6,
	// 	8: 4,
	// 	9: 2
	// }
}

// hardcoded data from before entry could be done from site
// coogans_open = ["Scott","Greg","Nick","Conor","Toby"];
// four_miler_open = ["Jay","Nick","Conor","Greg","Stephen"];
// bk_half_open = ["Jay","Scott","Nick","Toby","Keith"];
// queens_open = ["Greg","Toby","Scott","Stephen","Kyle"];
function escape(e) {
	e.key == "Escape" ? myModal.classList.remove('activate') : console.log('nope');
}

// add scores
function open_scores(runners,object,string) {
	const race_run = document.querySelector('#race_run').value;
	// console.log(race_run)
	// // check if race is already run
	// if (races_run.race_run.indexOf(string) != -1) {
	// 	console.error('You Bastard');
	// 	alert('Race Already Entered');
	// 	return
	// } else {
	// 	races_run.race_run.push(string);
	// }
	//set score
	runners.forEach(function(runner) {
		let score;
		runner = runner.toLowerCase();
	//check if it's team champs to determine what to call in points object
		race_run == "team__Champs" ? score = test_points.teamChamps[runners.indexOf(runner)] : score = test_points.points[runners.indexOf(runner)];
	//create runner object to add to arrays
		let runObj = {
			name: runner,
			points: score,
			count: 1,
			category: string,
			races: [race_run]
		};



		if (string == "open") {
			generateRunners(openArray, object, runObj, runner, score);
		} else if (string == "masters") {
			generateRunners(mastersArray, object, runObj, runner, score)
		} else if (string == "grandmasters") {
			generateRunners(grand_mastersArray, object, runObj, runner, score)

		}
	})
	console.log(openArray);

	if (string == "open") {
		sorted = openArray.sort((a,b) => a.points <= b.points ? 1 : -1)
	} else if (string == "masters") {
		sorted = mastersArray.sort((a,b) => a.points <= b.points ? 1 : -1);
	} else {
		sorted = grand_mastersArray.sort((a,b) => a.points <= b.points ? 1 : -1);
	}
	let myText = "." + string + "_scores";
	console.log(myText)
	let html = document.querySelector(myText);
	html.innerHTML = sorted.map((runner) => {
		return `

		<div class="score ${string}"><span>&#127939; </span><span>${runner.name.charAt(0).toUpperCase()}${runner.name.slice(1)}</span><span>: ${runner.points} Races:${runner.count}</span></div>

		`
	}).join('');
	let scorers = document.querySelectorAll(".score");
	scorers.forEach(scorer => scorer.addEventListener('click',launchModal))
}

function launchModal() {
	let runClick = this.children[1].firstChild.data;
	let ageGroupSelected = this.classList[1];
	// let myModal = document.querySelector('.modal');
	let myRunner = runClick.toLowerCase();
	let thisArray = ageGroupSelected == "open" ? openArray : ageGroupSelected == "masters" ? mastersArray : grand_mastersArray;
	let thisObj
	thisArray.forEach(runner => {
		if (runner.name == myRunner) {
			thisObj = runner;
		}
	})

	myModal.innerHTML =
	`<div class="innerModal">${thisObj.name.charAt(0).toUpperCase()}${thisObj.name.slice(1)} so far has scored in ${thisObj.count} races.</div>
	<div class="escape">X</div>`
	myModal.classList.add('activate')
	modal_container.classList.add('activate')
	let escapeSpan = document.querySelector('.escape')
	escapeSpan.addEventListener('click', handleEscape);
	document.addEventListener('keydown',escape)
}

function handleEscape() {
	myModal.classList.remove('activate');
}



function addResults(e) {
	e.preventDefault();

	let results = document.querySelector("#results")
	let newArr = results.value.split(', ');
	newArr = newArr.map(runner => runner.toLowerCase());
	let cat = document.querySelector('input[name="age"]:checked').value;
	if (cat == 'open') {
		open_scores(newArr,open_runners, cat);
	}	else if (cat == "masters") {
		newArr = newArr.slice(0,3);

		open_scores(newArr, open_runners, cat);
	} else if (cat == "grandmasters"){
		newArr = newArr.slice(0,3);
		open_scores(newArr, open_runners, cat);
	}
}


function generateRunners(array, object, runObj, runner, score) {
	if (object[runner] && array.map(obj => obj.name).indexOf(runner) != -1) {
		object[runner] += score;
		let index = array.map(obj => obj.name).indexOf(runner);
		array[index].count ++
		array[index].points += score;
	} else {
		object[runner] = score;
		array.push(runObj);
	}
}

function clear(e) {
	e.preventDefault();
	console.log(e);
	open_runners = {};
	masters_runners = {};
	grand_masters_runners = {};
	openArray = [];
	mastersArray = [];
	grand_mastersArray = [];
	races_run = [];
	console.clear()
	let arr = [...thirds];
	console.log(arr);
	arr.forEach(item => {
		item.innerHTML = `<h3> Scores</h3><div>No Results</div>`
	});
}

enteredInfo.addEventListener('submit',addResults);
clearButton.addEventListener('click', clear);
