window.onload = () => {
	let dropzone = document.getElementById("dropzone");

	dropzone.ondrag = dropzone.ondragover = (event) => {
		event.preventDefault();
		event.stopPropagation();
	};

	dropzone.ondrop = (event) => {
		event.preventDefault();
		event.stopPropagation();

		document.getElementById("fileToUpload").files = event.dataTransfer.files;
	};
};
