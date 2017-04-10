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
		
		//Add new header to shopping cart table for course catalog Links
		tableBody = iframe.find('.PSLEVEL1GRIDNBO');
		tableBody.width(800) //change the width of the whole table so links fit
		tableBody = tableBody.find('tbody');
		secondChild = $(tableBody).children().eq(1);
		secondChild.append('<th scope="col" width="200" align="left" class="PSLEVEL3GRIDCOLUMNHDR"><a>Course Catalog Link</a></th>')
		//Currently, Clicking any of the header buttons (select, class, days/times, etc) will remove this header. 
		//Don't really understand why.
		//Also, it currently won't update when you add a new item to your shopping cart.

		
		iframe.find('.PSLEVEL3GRIDWBO').find('span').each(function(i, item){
			if(item.id.match("^P_CLASS_NAME")){
				/*
				First thing's first, after locating a "course" in our shopping cart, we have to get the course name.
				The text that defines the course ("CSCI 1300", for example) will be found as the first child of item if the 
				course has no link attached (.id == undefined) and will be the first child's first child if it is a hyperlink.
				*/
				var textObj = item.firstChild;
				console.log(textObj)
				if(textObj.id != undefined){
					textObj = textObj.firstChild;
					console.log(textObj);
				}
				else{
					console.log(textObj);
				}
				// Split the course name into a department tag and a course number:
				var classinfo = getNameParts(textObj);
				$(item).attr('title', classinfo[0]+" "+classinfo[1]);
				//Create our link to the course catalog based on the info we pulled from the class name:
				var classCatalogLink = 'http://www.colorado.edu/catalog/2016-17/courses?subject='+classinfo[0]+'&number='+classinfo[1]

				//Now, we have to go to the table row (tr tag) and append it with another element that contains a hyperlink to the
				//The respective course catalog entry. 
				//The tr should be the closest one available in the doc tree. Look up 'jquery closest' for more info
				var tableRow = item.closest('tr');
				//add a new td after the last entry in the table, to make a new box to put stuff in:
				$(tableRow).find('td:last').after('<td>'
				+ '<a href= '+ classCatalogLink+ '>' 
				+ classinfo[0]+'-'+classinfo[1]
				+ '</a></td>'); 

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
