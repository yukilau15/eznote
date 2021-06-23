/* initialise variables */

var inputTitle = document.querySelector('.new-note input');
var inputBody = document.querySelector('.new-note textarea');
var noteContainer = document.querySelector('.note-container');
var addBtn = document.querySelector('.add');
var favOnClick = document.querySelector('.favourite-icon');

var inputColor = document.getElementById('colors');
var check = document.getElementById('check');
var icon = document.getElementById("icon");
var img = document.getElementById("image");
var nav1 = document.getElementById("1");
var nav2 = document.getElementById("2");
var nav3 = document.getElementById("3");
var staricon = document.getElementById("star-icon");

//create a boolean to check the favourite note
var favourite = false; 

/*  add event listeners to buttons */

addBtn.addEventListener('click', addNote);
favOnClick.addEventListener('click', favouriteNotes);

/* Dark mode */

check.addEventListener('click', () => {
	document.body.classList.toggle('dark');
	
	if (check.checked == true) {
		icon.style.filter = "invert(100%)";
		img.style.filter = "grayscale(100%)";
		nav1.style.color = "#f7f7f7";
		nav2.style.color = "#f7f7f7";
		nav3.style.color = "#f7f7f7";
		staricon.style.color = "#f7f7f7";
	} else {
		icon.style.filter = "invert(0%)";
		img.style.filter = "grayscale(0%)";
		nav1.style.color = "#393e46";
		nav2.style.color = "#393e46";
		nav3.style.color = "#393e46";
		staricon.style.color = "#393e46";
	}
});

/* generic error handler */

function onError(error) {
	console.log(error);
}

/* Add a note to the display, and storage */

function addNote() {
	var noteTitle = inputTitle.value;
	var noteBody = inputBody.value;
	var noteColor = inputColor.value;
	
	//current Date
	var noteDate = new Date();
	var dd = noteDate.getDate();
	var mm = noteDate.getMonth()+1; 
	var yyyy = noteDate.getFullYear();
	var time = noteDate.toLocaleTimeString();

	noteDate = dd + '/' + mm + '/' + yyyy + ', ' + time;
	
	var gettingItem = browser.storage.local.get(noteTitle);
	gettingItem.then((result) => {
		var objTest = Object.keys(result);
		if (noteTitle !== '' && noteBody !== '') {
			//Check if title exists
			if (objTest.length < 1) {
				//store content, date, color, favourite boolean to body array
				var body = [noteBody, noteDate, favourite, noteColor];
				storeNote(noteTitle,body);
			} else {
				alert("Title found!");
			}
		}
	}, onError);
}

/* function to store a new note in storage */

function storeNote(title, body) {
	var storingNote = browser.storage.local.set({ [title] : body });
	storingNote.then(() => {
		console.log("successfully saved");
	
		alert("Note Added!"); //alert when note added successfully
	
		inputTitle.value = '';
		inputBody.value = '';
		inputColor.value = '';
		favourite=false;
	
		document.getElementById("star-icon").innerHTML = "star_border";
	}, onError);
}

/* Favourite notes */

function favouriteNotes() {
	//check if notes is saved
	if (!favourite) {
		favourite = true;
		//change icon to star icon
		document.getElementById("star-icon").innerHTML = "star";
	} else {
		favourite = false;
		//change icon to star border icon
		document.getElementById("star-icon").innerHTML = "star_border";
	}
}