const A=["de"];async function b(c){
	const D=navigator.language.substring(0,2);
	console.log(D);
	if(A.includes(D)){
		const E=JSON.parse(await (fetch("/lang/"+D+c+".json").then(f=>f.text)));
		for(let g in E)document.getElementById(g).innerHTML=E[g];
		document.documentElement.setAttribute("lang",navigator.language)
	}
	else document.documentElement.setAttribute("lang","en-US");
}function c(){if(document.documentElement.getAttribute("lang")==null)b("");if(location.pathname=="/")location.pathname="/home";fetch("/html"+location.pathname).then(d=>{if(d.ok)return d.text;location.pathname="/404";rel()}).then(e=>{document.getElementsByTagName("main")[0].innerHTML=e;b(location.pathname)});scrollTo({behavior:"smooth",top:0/*TODO*/})}onload=c