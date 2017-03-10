console.log('Script.js injected!');

function getFrame(){
	return $("#ptifrmtgtframe").contents();
}

$(document).ready(function(){
	$("iframe")[0].addEventListener("load", function(){
		iframe = getFrame();
		iframe.find('.PSLEVEL2GRIDROW').find('span').each(function(i, item){
			//console.log(item);
			if(item.id.match("^E_CLASS_NAME")){
				$(item).attr('title', 'Custom hovertext');
			}
			else{
				//console.log("womp womp");
			}
		});	
	});
});

//alert('Testing the extension');


//$('#E_CLASS_NAME$0').prop('title', 'custom hovertext');

//document.getElementById('#E_CLASS_NAME$0').title = "Custom Hovertext";
