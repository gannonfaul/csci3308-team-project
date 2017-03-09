console.log('Script.js injected!');

function getFrame(){
	return $("#ptifrmtgtframe").contents();
}

$("iframe")[0].addEventListener("load", function(){
	iframe = getFrame();
	var classes = iframe[0].querySelector('[id^="E_CLASS_NAME"]').id;
	for (var i = 0, len = classes.length; i<len;i++){
		item = classes[i];
		if(item.title){
			item.title = "Custom hovertext";
		}
		else{
			console.log("Womp Womp");
		}	
	}
});

//alert('Testing the extension');


//$('#E_CLASS_NAME$0').prop('title', 'custom hovertext');

//document.getElementById('#E_CLASS_NAME$0').title = "Custom Hovertext";
