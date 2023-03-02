function changeEgg(newEgg) {
	this.newEgg = newEgg;
	this.oldEgg = document.getElementById("basket").lastChild.src;

	this.exec = () => {
		document.getElementById("basket").lastChild.src = this.newEgg;
	};

	this.undo = () => {
		document.getElementById("basket").lastChild.src = this.oldEgg;
	};
}

function addEgg(newEgg) {
	this.newEgg = newEgg;

	this.exec = () => {
		let i = document.createElement("img");
		i.src = this.newEgg;
		i.className = "egg";
		document.getElementById("basket").appendChild(i);
	};

	this.undo = () => {
		let basket = document.getElementById("basket");
		basket.removeChild(basket.lastChild);
	};
}

function confirmEgg() {
	this.exec = () => {
		document.getElementById("basket").lastChild.className += " confirmed";
	};

	this.undo = () => {
		let lastChild = document.getElementById("basket").lastChild;
		lastChild.className = lastChild.className.split(" ").slice(0, 2).join(" ");
	};
}

function changeBasket(newBasket) {
	this.newBasket = newBasket;
	this.oldBasket = document.getElementById("basket").firstChild.src;

	this.exec = () => {
		document.getElementById("basket").firstChild.src = this.newBasket;
	};

	this.undo = () => {
		document.getElementById("basket").firstChild.src = this.oldBasket;
	};
}

function presetBasket(newPreset) {
	this.newPreset = newPreset;
	this.oldPreset = getPreset();
	this.exec = () => {
		setPreset(this.newPreset);
		updateUI();
	};

	this.undo = () => {
		setPreset(this.oldPreset);
	};
}

let getPreset = () => {
	let basketChildren = document.getElementById("basket").childNodes;
	let classes = basketChildren[0].className.split(" ");
	let preset = classes[1][0];

	for (let i = 1; i < basketChildren.length; i++) {
		classes = basketChildren[i].className.split(" ");
		preset += classes[1][0];
		if (classes.length > 2) preset += "C";
	}

	return preset.toUpperCase();
};

let setPreset = (preset) => {
	let basket = document.getElementById("basket");
	basket.innerHTML = "";

	let b = document.createElement("img");
	b.className = "basket";
	switch (preset[0]) {
		case "W":
			b.src = WHITE_BASKET;
			b.className += " white";
			break;
		case "B":
			b.src = BROWN_BASKET;
			b.className += " brown";
			break;
		default:
			break;
	}
	basket.appendChild(b);

	let i = 1;
	while (i < preset.length) {
		let e = document.createElement("img");
		e.className = "egg";
		switch (preset[i]) {
			case "W":
				e.src = WHITE_EGG;
				e.className += " white";
				break;
			case "B":
				e.src = BLUE_EGG;
				e.className += " blue";
				break;
			case "S":
				e.src = STRIPED_EGG;
				e.className += " stripe";
				break;
			case "C":
				e.src = CHOCOLATE_BUNNY;
				e.className += " choco";
				break;
		}
		if (i + 1 < preset.length) {
			if (preset[i + 1] == "C") {
				e.className += " confirmed";
			}
			i++;
		}
		basket.appendChild(e);
		i++;
	}
};
