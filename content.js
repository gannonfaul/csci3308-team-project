//alert("Testing the extension!");
console.log("content.js initiated");

var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js');
s.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(s);
s.onload = function(){
	s.parentNode.removeChild(s);
};		
