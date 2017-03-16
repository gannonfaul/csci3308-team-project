console.log('Script.js injected!');

function getFrame(){
	return $("#ptifrmtgtframe").contents();
}

function getNameParts(courseObj){
	var department = courseObj.data.split(" ")[0];
	var courseNumber = courseObj.data.replace("-"," ").split(" ")[1];
	console.log('deparment: ', department);
	console.log('course number: ', courseNumber);
}

$(document).ready(function(){
	$("iframe")[0].addEventListener("load", function(){
		iframe = getFrame();
		iframe.find('.PSLEVEL2GRIDROW').find('span').each(function(i, item){
			if(item.id.match("^E_CLASS_NAME")){
				var textObj = item.firstChild;
				if(textObj.id != undefined){
					textObj = textObj.firstChild;
					console.log(textObj);
					getNameParts(textObj);
				}
				else{
					console.log(textObj);
				}
				//console.log(item.firstChild);
				$(item).attr('title', "Custom Hovertext");
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
