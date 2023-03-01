// image file paths
var WHITE_BASKET = "./images/white_basket.png";
var BROWN_BASKET = "./images/brown_basket.png";
var WHITE_EGG = "./images/white_egg.png";
var BLUE_EGG = "./images/blue_egg.png";
var STRIPED_EGG = "./images/stripe_egg.png";
var CHOCOLATE_BUNNY = "./images/chocolate_bunny.png";

function History() {
	var UndoRedos = [];
	var index = 0;

	this.executeAction = (cmd) => {
		UndoRedos.length = index;
		UndoRedos.push(cmd);
		index = UndoRedos.length;

		cmd.exec();
		updateUI();
	};

	this.undoCmd = () => {
		if (index > 0) {
			var cmd = UndoRedos[index - 1];
			cmd.undo();
			index -= 1;
			updateUI();
		}
	};

	this.redoCmd = () => {
		if (index < UndoRedos.length) {
			var cmd = UndoRedos[index];
			cmd.exec();
			index += 1;
			updateUI();
		}
	};

	this.canUndo = () => {
		return index != 0;
	};

	this.canRedo = () => {
		return index < UndoRedos.length;
	};

	this.reset = () => {
		UndoRedos.length = index = 0;
		updateUI()
	}
}

function changeEgg(newEgg) {
	this.newEgg = newEgg;
	let basketChildren = document.getElementById("basket").childNodes;
	this.oldEgg = basketChildren[basketChildren.length - 1].src;

	this.exec = () => {
		basketChildren[basketChildren.length - 1].src = this.newEgg;
	};

	this.undo = () => {
		basketChildren[basketChildren.length - 1].src = this.oldEgg;
	};
}

function addEgg(newEgg) {
	this.newEgg = newEgg;
	let basket = document.getElementById("basket");
	let basketChildren = basket.childNodes;
	// TODO check if first egg

	this.exec = () => {
		let newI = basketChildren[1].cloneNode();
		newI.className = "egg"
		newI.src = this.newEgg;
		basket.appendChild(newI);
	};

	this.undo = () => {
		basket.removeChild(basket.lastChild);
	};
}

function confirmEgg() {
	let basketChildren = document.getElementById("basket").childNodes;

	this.exec = () => {
		basketChildren[basketChildren.length - 1].className = "egg confirmed";
	};

	this.undo = () => {
		basketChildren[basketChildren.length - 1].className = "egg";
	};
}

function changeBasket(newBasket) {
	this.newBasket = newBasket;
	let basketChildren = document.getElementById("basket").childNodes;
	this.oldBasket = basketChildren[1].src;

	this.exec = () => {
		basketChildren[1].src = this.newBasket;
	};

	this.undo = () => {
		basketChildren[1].src = this.oldBasket;
	};
}

let updateUI = () => {
	document.getElementById("undo").disabled = !hist.canUndo();
	document.getElementById("redo").disabled = !hist.canRedo();
};

let setPreset = (preset) => {
	// preset is a coded string for presets, first character is basket color, rest are goodies (may end with unconfirmed white egg)
	let basket = document.getElementById("basket");
	// clear children
	basket.innerHTML = "";

	let toAdd = [];

	let b = document.createElement("img");
	b.className = "basket";
	switch (preset[0]) {
		case "W":
			b.src = WHITE_BASKET;
			break;
		case "B":
			b.src = BROWN_BASKET;
			break;
		default:
			break;
	}
	toAdd.push(b);

	if (preset.length != 1) {
		for (let i = 1; i < preset.length; i++) {
			// create more images
			let g = document.createElement("img");
			switch (preset[i]) {
				case "W":
					g.src = WHITE_EGG;
					break;
				case "B":
					g.src = BLUE_EGG;
					break;
				case "S":
					g.src = STRIPED_EGG;
					break;
				case "C":
					g.src = CHOCOLATE_BUNNY;
					break;
				default:
					break;
			}
			// unconfirmed last egg
			g.className = i == preset.length - 1 ? "egg" : "egg confirmed";
			toAdd.push(g);
		}
	}

	for(let i = 0; i < toAdd.length; i++) {
		basket.appendChild(toAdd[i])
	}

	hist.reset()
};

var hist = new History();

window.onload = () => {
	let toRemove = [];
	document.getElementById("basket").childNodes.forEach(item => {
		if(item.className == undefined) toRemove.push(item);
	})
	toRemove.forEach(rem => {
		document.getElementById("basket").removeChild(rem)
	})

	document.getElementById("addEgg").onclick = () => {
		let basketChildren = document.getElementById("basket").childNodes;
		let lastEgg = basketChildren[basketChildren.length - 1];
		let choice = document.getElementById("eggOption").value;
		let newImage;
		switch (choice) {
			case "White":
				newImage = WHITE_EGG;
				break;
			case "Blue":
				newImage = BLUE_EGG;
				break;
			case "Striped":
				newImage = STRIPED_EGG;
				break;
			case "Bunny":
				newImage = CHOCOLATE_BUNNY;
				break;
			default:
				break;
		}
		if (lastEgg.className.includes("confirmed")) {
			hist.executeAction(new addEgg(newImage));
		} else {
			hist.executeAction(new changeEgg(newImage));
		}
	};

	document.getElementById("confirm").onclick = () => {
		hist.executeAction(new confirmEgg());
	};

	document.getElementById("undo").onclick = () => {
		hist.undoCmd();
	};
	document.getElementById("redo").onclick = () => {
		hist.redoCmd();
	};

	document.getElementById("whiteBasket").onclick = () => {
		hist.executeAction(new changeBasket(WHITE_BASKET));
	};
	document.getElementById("brownBasket").onclick = () => {
		hist.executeAction(new changeBasket(BROWN_BASKET));
	};

	document.getElementById("base").onclick = () => {
		// brown basket, no goodies
		let preset = "B";
		setPreset(preset);
	};
	document.getElementById("all").onclick = () => {
		// brown basket, 5 blue eggs, white egg
		let preset = "BBBBBBW";
		setPreset(preset);
	};
	document.getElementById("mixed").onclick = () => {
		// white basket, first row striped/blue
		// second row 3 bunny, white
		let preset = "WSBSBSBCCW";
		setPreset(preset);
	};

	document.getElementById("save").onclick = () => {};

	updateUI();
};
