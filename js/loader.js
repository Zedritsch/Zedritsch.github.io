const MAIN = document.getElementsByTagName("main")[0];


async function check(url) { return fetch(url, {method: "HEAD"}).then(res => res.ok) }
async function request(url) { return await (await fetch(url)).text() }

async function translate(path) {
	let lang;
	switch(navigator.language) {
		case "de-DE":
			lang = "de";
			break;
		default:
			document.documentElement.setAttribute("lang", "en-US");
			return
	}
	const ARR = JSON.parse(await request("lang/" + lang + path));
	for(let i in ARR) {
		document.getElementById(i).innerHTML = ARR[i]
	}
	document.documentElement.setAttribute("lang", navigator.language)
}


async function reload() {
	// Translate static part of the webpage
	if(document.documentElement.getAttribute("lang") == null) translate("");

	// Load and instance requested main content
	if(location.pathname == "/") location.pathname = "/index";
	if(!check("html" + location.pathname)) location.pathname = "404";
	request("html" + location.pathname).then(res => {
		MAIN.innerHTML = res;

		// Try to translate the new content
		translate(location.pathname)
	});

	// Scroll to requested section
	/*scrollTo({
		behavior: "smooth",
		top:
			document.getElementById(location.hash).getBoundingClientRect().top -
			document.body.getBoundingClientRect().top -
			2.8 * parseFloat(getComputedStyle(document.getElementsByTagName("header")[0]).fontSize)
	})*/
}

/*onpopstate = function() {
	switchTo();
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


onload = reload()