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
		iframe.find('.PSLEVEL2GRIDROW').find('span').each(function(i, item){
			if(item.id.match("^E_CLASS_NAME")){
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
				$(item).attr('title', "Custom Hovertext");
				$(item).hover(
				function() {
					/*
					This function occurs when the mouse hover starts.
					Example and what it does:
					Creates a new request, sends the request, and (should) dump the output to the console.
					Instead, it fails as soon as the request ends, because the server being accessed can't be
					found in an HTTPS format. This example is using smogon, but the same thing happens for
					the course catalog.
					*/
					var catalogDump = new XMLHttpRequest();
					catalogDump.open("GET", "https://www.smogon.com/stats/2017-01/chaos/gen4lc-1760.json", true);
					catalogDump.onreadystatechange = function() {
  						if (catalogDump.readyState == XMLHttpRequest.DONE) {
							console.log("Words!")
							console.log(JSON.parse(catalogDump.responseText));
					  }else{
					  	console.log("readystate:", catalogDump.readyState)
					  }
					}
					catalogDump.send(null)
					//console.log('hoverStartDpt:', classinfo[0]);
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
