// image file paths
var WHITE_BASKET = "./images/white_basket.png";
var BROWN_BASKET = "./images/brown_basket.png";
var WHITE_EGG = "./images/white_egg.png";
var BLUE_EGG = "./images/blue_egg.png";
var STRIPED_EGG = "./images/stripe_egg.png";
var CHOCOLATE_BUNNY = "./images/chocolate_bunny.png";

// GRADING: MANAGE
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
		updateUI();
	};
}

let updateUI = () => {
	document.getElementById("undo").disabled = !hist.canUndo();
	document.getElementById("redo").disabled = !hist.canRedo();
	document.getElementById("confirm").disabled = document.getElementById("removeEgg").disabled =
		document.getElementById("basket").lastChild.className.includes("confirmed") || document.getElementById("basket").childNodes.length < 2;
};

var hist = new History();

window.onload = () => {
	setPreset("BW");

	document.getElementById("addEgg").onclick = () => {
		let basketChildren = document.getElementById("basket").childNodes;
		let lastEgg = basketChildren[basketChildren.length - 1];
		let choice = document.getElementById("eggOption").value;
		if (lastEgg.className.includes("confirmed") || basketChildren.length < 2) {
			// if last egg confirmed or no eggs
			// GRADING: ACTION
			hist.executeAction(new addEgg(choice));
		} else {
			// unconfirmed last egg
			// GRADING: ACTION
			hist.executeAction(new changeEgg(choice));
		}
	};

	document.getElementById("removeEgg").onclick = () => {
		// GRADING: ACTION
		hist.executeAction(new removeEgg());
	};

	document.getElementById("confirm").onclick = () => {
		// GRADING: ACTION
		hist.executeAction(new confirmEgg());
	};

	document.getElementById("undo").onclick = hist.undoCmd;
	document.getElementById("redo").onclick = hist.redoCmd;

	document.getElementById("whiteBasket").onclick = () => {
		// GRADING: ACTION
		hist.executeAction(new changeBasket("White"));
	};
	document.getElementById("brownBasket").onclick = () => {
		// GRADING: ACTION
		hist.executeAction(new changeBasket("Brown"));
	};

	document.getElementById("base").onclick = () => {
		// brown basket, no goodies
		let preset = "B";
		// GRADING: ACTION
		hist.executeAction(new presetBasket(preset));
	};
	document.getElementById("all").onclick = () => {
		// brown basket, 5 blue eggs, white egg
		let preset = "BBCBCBCBCBCW";
		// GRADING: ACTION
		hist.executeAction(new presetBasket(preset));
	};
	document.getElementById("mixed").onclick = () => {
		// white basket, first row striped/blue
		// second row 3 bunny, white
		let preset = "WSCBCSCBCSCBCCCCCCCW";
		// GRADING: ACTION
		hist.executeAction(new presetBasket(preset));
	};

	document.getElementById("save").onclick = () => {
		let preset = getPreset();
		if (preset.length % 2 == 0) {
			// unconfirmed egg, dont include
			preset = preset.slice(0, preset.length - 1);
		}
		$.post("/scripts/saveFile.php", {
			preset: getPreset()
		},
		(data) => {
			// console.log(data);
		})
	};

	updateUI();
};
