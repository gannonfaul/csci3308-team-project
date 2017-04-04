console.log('Script.js injected!');

function getFrame(){
	return $("#ptifrmtgtframe").contents();
}

function getNameParts(courseObj){
	var department = courseObj.data.split(" ")[0];
	var courseNumber = courseObj.data.replace("-"," ").split(" ")[1];
	//console.log('deparment: ', department);
	//console.log('course number: ', courseNumber);
	return [department, courseNumber]
}

$(document).ready(function(){
	$("iframe")[0].addEventListener("load", function(){
		iframe = getFrame();
		console.log("Load");
		iframe.find('.PSLEVEL3GRIDWBO').find('span').each(function(i, item){
			if(item.id.match("^P_CLASS_NAME")){
				var textObj = item.firstChild;
				if(textObj.id != undefined){
					textObj = textObj.firstChild;
					console.log(textObj);
				}
				else{
					console.log(textObj);
				}
				var classinfo = getNameParts(textObj);
				//console.log(item.firstChild);
				$(item).attr('title', classinfo[0]+" "+classinfo[1]);
				$(item).hover(
				function() {
					/*
					This function occurs when the mouse hover starts.
					*/
					console.log('hoverStartDpt:', classinfo[0]);
					},
				function() {
					/*
					This happens when the user stops hovering the mouse over the item.
					*/
					console.log('hoverReleaseCrse:', classinfo[1]);
					}
				);
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
