const A=navigator.language.substring(0,2);const B=["de"].includes(A);const C=document.documentElement;const D=document.getElementsByTagName("main")[0];async function e(c){const F=JSON.parse(await (fetch(`/lang/${A+c}.json`).then(g=>g.text)));for(let h in F)document.getElementById(h).innerText=F[h];}function f(path){
	if(path=="/")path="/home";
	fetch("/html"+path).then(g=>{
		if(g.ok)g.text();
		else{path="/404";f(path);""}
	}).then(h=>{
		if(h!=null){D.innerHTML=h;if(B)e(path)}
	});scrollTo({behavior:"smooth",top:0/*TODO*/})}if(C.getAttribute("lang")==null){if(B){C.setAttribute("lang",A);e("")}else C.setAttribute("lang","en")};onload=f(location.pathname)