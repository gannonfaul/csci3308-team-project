//alert("Testing the extension!");
console.log("content.js initiated");


var d = document.createElement('script');
d.src = chrome.extension.getURL('dictionary.js');
d.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(d);
console.log("dictionary added");

var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js');
s.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(s);
console.log("script added");	

d.onload = function(){
	d.parentNode.removeChild(d);
}

s.onload = function(){
	s.parentNode.removeChild(s);
};	
