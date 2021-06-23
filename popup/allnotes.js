/*For View All Page and View Fav Notes Page*/

/* initialise variables */

var noteContainer = document.querySelector('.note-container');
var favourite = false; //boolean for checking fav in local data
var inputSearch = document.querySelector('.search-container input');
var clearBtn = document.querySelector('.clear');

var check = document.getElementById('check');
var icon = document.getElementById("icon");
var img = document.getElementById("image");
var nav1 = document.getElementById("1");
var nav2 = document.getElementById("2");
var nav3 = document.getElementById("3");

var i = 0;
var j = 0;

$('#search').keyup(function(){
	var value = $('#search').val()
	searchNote(value);
})

/*  add event listeners to button */

clearBtn.addEventListener('click', clearAll);

/* Dark mode */

check.addEventListener('click', () => {
	document.body.classList.toggle('dark');
	
	if (check.checked == true) {
		icon.style.filter = "invert(100%)";
		img.style.filter = "grayscale(100%)";
		nav1.style.color = "#f7f7f7";
		nav2.style.color = "#f7f7f7";
		nav3.style.color = "#f7f7f7";
	} else {
		icon.style.filter = "invert(0%)";
		img.style.filter = "grayscale(0%)";
		nav1.style.color = "#393e46";
		nav2.style.color = "#393e46";
		nav3.style.color = "#393e46";
	}
});

/* generic error handler */

function onError(error) {
	console.log(error);
}

/* display previously-saved stored notes on startup */

initialize();

function initialize() {
	var gettingAllStorageItems = browser.storage.local.get(null);
	gettingAllStorageItems.then((results) => {
		var noteKeys = Object.keys(results);
		for (let noteKey of noteKeys) {
			var curValue = results[noteKey];
			displayNote(noteKey,curValue); //display all notes
		}

	}, onError);
}


/* function to display a note in the note box */

function displayNote(title, body) {

	/* create note display box */
	
	var note = document.createElement('div');
	var noteDisplay = document.createElement('div');
	var noteH = document.createElement('h2');
	var favIcon = document.createElement('i');
	var notePara = document.createElement('p');
	var noteD = document.createElement('p');
	var deleteBtn = document.createElement('button');
	var clearFix = document.createElement('div');

	note.setAttribute('class','note');

	noteH.textContent = title; //Showing Title
	notePara.textContent = body[0]; //Showing Content
	noteD.textContent = "Date: " + body[1]; //Showing Date
	favourite = body[2]; //Showing Fav Boolean
	noteColor = body[3];
	
	var ncolor = noteColor;
	
	if (favourite) {
		//fav notes
		favIcon.textContent = 'star';
		favIcon.setAttribute('class','material-icons favourite-icon');
		favIcon.style.float = 'right';
		favIcon.style.marginTop = '5px';
	} else {
		//not fav notes
		favIcon.textContent = 'star_border';
		favIcon.setAttribute('class','material-icons favourite-icon');
		favIcon.style.float = 'right';
		favIcon.style.marginTop = '5px';
	}

	/*Add Event Listener when user click favourite icon */
	favIcon.addEventListener('click',(e)=>{
		//check if notes is saved
		if(favIcon.textContent == 'star'){
			//update favourite icon to non favourite icon
			favIcon.textContent = 'star_border';
			favIcon.setAttribute('class','material-icons favourite-icon');
			favIcon.style.float = 'right';
			favIcon.style.marginTop = '5px';

			//update fav note to not fav note in body array
			body[2]=false;

		} else {
			//update the non favourite icon to favourite icon
			favIcon.textContent = 'star';
			favIcon.setAttribute('class','material-icons favourite-icon');
			favIcon.style.float = 'right';
			favIcon.style.marginTop = '5px';

			//update not fav note to fav note in body array
			body[2]=true;
		}
		//update the changed fav notes 
		updateFavIcon(title,body);
	})

	//Add class to the variables
	noteH.setAttribute('class','all-note-title'); 
	deleteBtn.setAttribute('class','delete btn btn-light');
	deleteBtn.textContent = 'Delete note';
	clearFix.setAttribute('class','clearfix');

	noteDisplay.appendChild(favIcon);
	noteDisplay.appendChild(noteH);
	noteDisplay.appendChild(notePara);
	noteDisplay.appendChild(noteD);
	noteDisplay.appendChild(deleteBtn);
	noteDisplay.appendChild(clearFix);
	
	/* Notes background */
	
	if (noteColor == 'red') {
		noteDisplay.setAttribute("style", "border-left-style: solid; padding: 4px 12px; margin-bottom: 4px;");
		noteDisplay.style.background = '#ffdddd';
		noteDisplay.style.borderLeftColor = '#f44336';
	} else if (noteColor == 'green') {
		noteDisplay.setAttribute("style", "border-left-style: solid; padding: 4px 12px; margin-bottom: 4px;");
		noteDisplay.style.background = '#ddffdd';
		noteDisplay.style.borderLeftColor = '#04AA6D';
	} else if (noteColor == 'blue') {
		noteDisplay.setAttribute("style", "border-left-style: solid; padding: 4px 12px; margin-bottom: 4px;");
		noteDisplay.style.background = '#e7f3fe';
		noteDisplay.style.borderLeftColor = '#2196F3';		
	} else if (noteColor == 'yellow') {
		noteDisplay.setAttribute("style", "border-left-style: solid; padding: 4px 12px; margin-bottom: 4px;");
		noteDisplay.style.background = '#ffffcc';
		noteDisplay.style.borderLeftColor = '#ffeb3b';
	} else {
		noteDisplay.setAttribute("style", "border-left-style: solid; padding: 4px 12px; margin-bottom: 4px;");
		noteDisplay.style.background = '#f7f7f7';
		noteDisplay.style.borderLeftColor = '#393e46';
	}

	note.appendChild(noteDisplay);

	/* create note edit box */

	var noteEdit = document.createElement('div');
	var noteTitleEdit = document.createElement('input');
	var noteBodyEdit = document.createElement('textarea');
	var clearFix2 = document.createElement('div');

	var updateBtn = document.createElement('button');
	var cancelBtn = document.createElement('button');

	updateBtn.setAttribute('class','update');
	updateBtn.textContent = 'Update note';
	cancelBtn.setAttribute('class','cancel');
	cancelBtn.textContent = 'Cancel update';

	noteEdit.appendChild(noteTitleEdit);
	noteTitleEdit.value = title;
	noteEdit.appendChild(noteBodyEdit);
	noteBodyEdit.textContent = body[0]; //store notes content
	noteEdit.appendChild(updateBtn);
	noteEdit.appendChild(cancelBtn);

	noteEdit.appendChild(clearFix2);
	clearFix2.setAttribute('class','clearfix');

	note.appendChild(noteEdit);

	noteContainer.appendChild(note);
	noteEdit.style.display = 'none';

	/* set up listeners for the update functionality */
	
	noteH.addEventListener('click',() => {
		noteDisplay.style.display = 'none';
		noteEdit.style.display = 'block';
	})

	notePara.addEventListener('click',() => {
		noteDisplay.style.display = 'none';
		noteEdit.style.display = 'block';
	}) 

	cancelBtn.addEventListener('click',() => {
		noteDisplay.style.display = 'block';
		noteEdit.style.display = 'none';
		noteTitleEdit.value = title;
		noteBodyEdit.value = body[0]; //notes content
	})

	updateBtn.addEventListener('click',() => {
		//Update new date
		var noteDate = new Date();
		var dd = noteDate.getDate();
		var mm = noteDate.getMonth()+1; 
		var yyyy = noteDate.getFullYear();
		var time = noteDate.toLocaleTimeString();

		noteDate = dd + '/' + mm + '/' + yyyy + ', ' + time;

		//Store into an array
		var editBody = [noteBodyEdit.value, noteDate, favourite, ncolor]; 

		//update when title and content filled
		if (noteTitleEdit.value !== title || noteBodyEdit.value !== body[0]) {
			updateNote(title,noteTitleEdit.value,editBody);
			note.parentNode.removeChild(note);
		} 

	});

	/* set up listener for the delete functionality */
	
	deleteBtn.addEventListener('click',(e) => {
		//display confirm box 
		var decision = confirm("Do you sure to delete this note?");
		//check if user confirm delete note
		if (decision == true){
			const evtTgt = e.target;
			evtTgt.parentNode.parentNode.parentNode.removeChild(evtTgt.parentNode.parentNode);
			browser.storage.local.remove(title);      
		}
	})
}

/* function to update notes */

function updateNote(delNote,newTitle,newBody) {
	var storingNote = browser.storage.local.set({ [newTitle] : newBody });
	storingNote.then(() => {
		if(delNote !== newTitle) {
			var removingNote = browser.storage.local.remove(delNote);
			removingNote.then(() => {
				displayNote(newTitle, newBody);
			}, onError);
		} else {
			displayNote(newTitle, newBody);
		}
	}, onError);
}

/* function to update fav notes */

function updateFavIcon(newTitle,newBody) {
	var storingNote = browser.storage.local.set({ [newTitle] : newBody });
	storingNote.then(() => {
		console.log("Update successfully");
	}, onError);
}

/* Clear all notes from the display/storage */

function clearAll() {
	//display confirm box 
	var decision = confirm("Do you sure to clear all notes?");
	//check if user confirm delete note
	if (decision == true){   
		while (noteContainer.firstChild) {
			noteContainer.removeChild(noteContainer.firstChild);
		}
		browser.storage.local.clear();
	}
}

function searchNote(val){
	var gettingAllStorageItems = browser.storage.local.get(null);
  	gettingAllStorageItems.then((results) => {
		var noteKeys = Object.keys(results);
		var arrSearch = [];
		
		for (let noteKey of noteKeys) {
			var curValue = results[noteKey];
			val = val.toLowerCase();
			var noteTitle = noteKey.toLowerCase();
			var noteContent = curValue[0].toLowerCase();
			
			if(noteTitle.includes(val)||noteContent.includes(val)){
				var obj = {};
				obj["keys"]=noteKey;
				obj["values"]=curValue;
				arrSearch.push(obj);
			}
			
			while (noteContainer.firstChild) {
				noteContainer.removeChild(noteContainer.firstChild);
			}
			
			arrSearch.sort(function(a, b){
				var dateA = new Date(a.ndateTime), dateB = new Date(b.ndateTime);
				return dateB - dateA;
			});
			
			for(var key in arrSearch){
				k = arrSearch[key].keys;
				v = arrSearch[key].values;
				displayNote(k,v);
			}
    }
  }, onError);
}