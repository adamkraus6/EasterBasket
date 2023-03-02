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
		let newI = document.createElement("img")
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
	this.oldBasket = basketChildren[0].src;

	this.exec = () => {
		basketChildren[0].src = this.newBasket;
	};

	this.undo = () => {
		basketChildren[0].src = this.oldBasket;
	};
}