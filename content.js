//alert("Testing the extension!");
var s = document.creasteElement('script');
s.src = chrome.extension.getURL('script.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function(){
	s.parentNode.removeChild(s);
};		
