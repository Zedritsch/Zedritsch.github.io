const MAIN = document.getElementsByTagName("main")[0];

onload = () => {
	switch(location.pathname) {
		case "/":
			MAIN.innerHTML = request("html/index.html");
			break;
		default:
			MAIN.innerHTML = request("html/404.html")
	}
	switch(navigator.language) {
		case "de-DE":
			translate(request("lang/de.json"));
		default:
			document.documentElement.setAttribute("lang", "en-US")
	}
	scrollTo({
		behavior: "smooth",
		top:
			document.getElementById(location.hash).getBoundingClientRect().top -
			document.body.getBoundingClientRect().top -
			2.8 * parseFloat(getComputedStyle(document.getElementsByTagName("header")[0]).fontSize)
	})
}

function request(url) {
	return fetch(url).then(res => res.text())
}

function translate(json) {
	json = JSON.parse(json);
	for(let key in json) {
		document.getElementById(key).innerHTML = json[key]
	}
	document.documentElement.setAttribute("lang", navigator.language)
}





/*onpopstate = function() {
	toggleNav();
	switchTo("html" + location.href.replace(location.origin, ""));
};

function switchTo(href) {
	const url = location.origin + href.substring(href.lastIndexOf("/")) + "#" + section;
	if(location.href !== url) {
		history.pushState(null, null, url);
	}

	if(section === "") {
		section = "main";
	}
}*/