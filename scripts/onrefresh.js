if (sessionStorage.getItem("savebtn") !== null)
	{
		const btnSpan = document.getElementById('savebtn');
		btnSpan.removeChild(btnSpan.firstChild);
		btnSpan.setAttribute("style", "margin-left: 265px;");
		const newBtnMsg = document.createTextNode("SAVED");
		const newBtnIcon = document.createElement("i");
		newBtnIcon.setAttribute("class", "fa-solid fa-check");
		btnSpan.appendChild(newBtnIcon);
		btnSpan.appendChild(newBtnMsg);
	}
