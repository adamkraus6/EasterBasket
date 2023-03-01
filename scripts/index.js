window.onload = () => {
	// image file paths
	let WHITE_BASKET = "./images/white_basket.png";
	let BROWN_BASKET = "./images/brown_basket.png";

	// create history

	document.getElementById("addEgg").onclick = () => {
		let basket = document.getElementById("basket");
		console.log(basket.childNodes);
		// if last child is confirmed
		// add another image
		// else
		// change source image of last child
	};

	document.getElementById("confirm").onclick = () => {
		// if last child is not confirmed
		// add confirmed class
	};

	document.getElementById("undo").onclick = () => {};
	document.getElementById("redo").onclick = () => {};

	document.getElementById("whiteBasket").onclick = () => {
		let basketChildren = document.getElementById("basket").childNodes;
		basketChildren[1].src = WHITE_BASKET;
	};
	document.getElementById("brownBasket").onclick = () => {
		let basketChildren = document.getElementById("basket").childNodes;
		basketChildren[1].src = BROWN_BASKET;
	};

	document.getElementById("base").onclick = () => {};
	document.getElementById("all").onclick = () => {};
	document.getElementById("mixed").onclick = () => {};

	document.getElementById("save").onclick = () => {};
};
