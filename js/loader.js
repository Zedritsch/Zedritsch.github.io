const MAIN = document.getElementsByTagName("main")[0];

onload = async () => {
	(location.pathname == "/")?
		MAIN.innerHTML = await request("html/index.html")
	: (check("html" + location.pathname + ".html"))?
		MAIN.innerHTML = await request("html" + location.pathname + ".html")
	: MAIN.innerHTML = await request("html/404.html")
	switch(navigator.language) {
		case "de-DE":
			translate(await request("lang/de.json"));
		default:
			document.documentElement.setAttribute("lang", "en-US")
	}
	/*scrollTo({
		behavior: "smooth",
		top:
			document.getElementById(location.hash).getBoundingClientRect().top -
			document.body.getBoundingClientRect().top -
			2.8 * parseFloat(getComputedStyle(document.getElementsByTagName("header")[0]).fontSize)
	})*/
}

async function check(url) { return fetch(url, {method: "HEAD"}).then(res => res.ok) }
async function request(url) { return await (await fetch(url)).text() }

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