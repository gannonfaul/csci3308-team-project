console.log('Script.js injected!');

function getFrame(){
	return $("#ptifrmtgtframe").contents();
}

function testHref(){
	alert('Testing href');
}

function getNameParts(courseObj){
	var department = courseObj.data.split(" ")[0];
	var courseNumber = courseObj.data.replace("-"," ").split(" ")[1];
	//console.log('deparment: ', department);
	//console.log('course number: ', courseNumber);
	return [department, courseNumber]
}

$(document).ready(function(){
	$("script").remove(":contains('totalTimeoutMilliseconds')"); //Removes first instance of session timeout counter
		
	$("iframe")[0].addEventListener("load", function(){
		iframe = getFrame();
		iframe.find(":contains('totalTimeoutMilliseconds')").remove("script"); //Removes second instance of session timeout counter
		
		//Add new header to shopping cart table for course catalog Links
		tableBody = iframe.find('.PSLEVEL1GRIDNBO');
		tableBody.width(900) //change the width of the whole table so links fit
		tableBody = tableBody.find('tbody');
		firstRow = $(tableBody).children().eq(0); 	//access first row in tbody
		firstRow = firstRow.find('td:first') //find first td
		firstRow.attr('colspan', '12')	//change attribute vale
		secondChild = $(tableBody).children().eq(1);
		secondChild.append('<th scope="col" width="200" align="left" class="PSLEVEL3GRIDCOLUMNHDR"><a>Course Catalog Link</a></th>') //makes header
		//Currently, Clicking any of the header buttons (select, class, days/times, etc) will remove this header.
		//Don't really understand why.
		//this goes away because it reorders the table ^ use onclick?
		//Also, it currently won't update when you add a new item to your shopping cart.


		y = $(tableBody).children().eq(1);		//use secondchild?
		yp = y.find('th:first')
		ypp = yp.find('a:first')
		ypp.attr('onclick', "test") 	//puts onclick attribute into select THIS ISN'T FINISHED


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
				$(tableRow).find('td:last').after('<td class="PSLEVEL3GRIDWBO" align=center>'
				+ '<a href= '+ classCatalogLink+ ' target="_blank">'
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
		});
		
		//All of this nonsense is straight copy-paste HTML from the "weekly calendar view" page
		var calendar= "<div><p></p>"
		
		//This is all just formatting
		calendar += "<table cellspacing='0' cellpadding='2' width='100%' class='PSLEVEL1GRIDNBO' id='SHOPPING_CART_SCHED_HTMLAREA'>"
		calendar += "<colgroup span='1' width='9%' align='center' valign='middle'>"
		calendar += "<colgroup span='7' width='13%' align='center' valign='middle'><tr><th scope='col' align='center' class='SSSWEEKLYA1BACKGROUND' >Time</th><th scope='col' align='center' class='SSSWEEKLYDAYBACKGROUND' >Monday<br>"
		calendar += "</th><th scope='col' align='center' class='SSSWEEKLYDAYBACKGROUND' >Tuesday<br>"
		calendar += "</th><th scope='col' align='center' class='SSSWEEKLYDAYBACKGROUND' >Wednesday<br>"
		calendar += "</th><th scope='col' align='center' class='SSSWEEKLYDAYBACKGROUND' >Thursday<br>"
		calendar += "</th><th scope='col' align='center' class='SSSWEEKLYDAYBACKGROUND' >Friday<br>"
		calendar += "</th><th scope='col' align='center' class='SSSWEEKLYDAYBACKGROUND' >Saturday<br>"
		calendar += "</th><th scope='col' align='center' class='SSSWEEKLYDAYBACKGROUND' >Sunday<br>"
		calendar += "</th>"
		calendar += "</tr>"
		
		//All this populates the calendar
		/*
		 * It looks like this is the way they're populating the table:
		 * rowspan => how many vertical rows to be populated
		 * SSWEEKLYTIMEBACKGROUND => green background color
		 * SSWEEKLYTIME => defines the time field
		 * SSTEXTWEEKLY => defines text to add to the cell
		 * PSLEVEL3GRID "&nbsp => empty cell
		 */
		 
		//For loop pseudocode 
		
		//var time;
		//var max_time = 20;
		//var weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thusday', 'Fiday'];
		//for(time = 8; time<=max_time; time++){
			//calendar += "<tr>"
			//calendar += "<td class='SSSWEEKLYTIMEBACKGROUND' rowspan='1'>"
			//calendar += "<span class='SSSTEXTWEEKLYTIME' >"+String(time)+":00</span>"
			//calendar += "</td>"
			//for(var day = 0; day<5; day++){
				//if("day is empty"){
					//calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
				//}
				//else{
					//calendar += "<td class='SSSWEEKLYBACKGROUND' rowspan='1'>"
					//calendar += "<span class='SSSTEXTWEEKLY' >"+Class Title+"</span></td>"
				//}
			//calendar += "</tr>"
			//}
		//}
		
		//8:00 am row
		calendar += "<tr>"
		calendar += "<td class='SSSWEEKLYTIMEBACKGROUND' rowspan='1'>"
		calendar += "<span class='SSSTEXTWEEKLYTIME' >8:00AM</span>"
		calendar += "</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "</tr>"
		
		//9:00 am row
		calendar += "<tr>"
		calendar += "<td class='SSSWEEKLYTIMEBACKGROUND' rowspan='1'>"
		calendar += "<span class='SSSTEXTWEEKLYTIME' >9:00AM</span>"
		calendar += "</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='SSSWEEKLYBACKGROUND' rowspan='2'>"
		calendar += "<span class='SSSTEXTWEEKLY' >MCEN 4085 - 800<br>Lecture<br>9:30AM - 10:45AM<br>See DEPT</span></td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='SSSWEEKLYBACKGROUND' rowspan='2'>"
		calendar += "<span class='SSSTEXTWEEKLY' >MCEN 4085 - 800<br>Lecture<br>9:30AM - 10:45AM<br>See DEPT</span></td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td><td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "</tr>"
		
		//10:00 am row
		calendar += "<tr>"
		calendar += "<td class='SSSWEEKLYTIMEBACKGROUND' rowspan='1'>"
		calendar += "<span class='SSSTEXTWEEKLYTIME' >10:00AM</span>"
		calendar += "</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "</tr>"
		
		//11:00 am row
		calendar += "<tr>"
		calendar += "<td class='SSSWEEKLYTIMEBACKGROUND' rowspan='1'>"
		calendar += "<span class='SSSTEXTWEEKLYTIME' >11:00AM</span>"
		calendar += "</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='SSSWEEKLYBACKGROUND' rowspan='1'>"
		calendar += "<span class='SSSTEXTWEEKLY' >MCEN 4085 - 806<br>Laboratory<br>11:00AM - 11:50AM<br>See DEPT</span></td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='SSSWEEKLYBACKGROUND' rowspan='1'>"
		calendar += "<span class='SSSTEXTWEEKLY' >MCEN 4085 - 806<br>Laboratory<br>11:00AM - 11:50AM<br>See DEPT</span></td>"
		calendar += "<td class='SSSWEEKLYBACKGROUND' rowspan='1'>"
		calendar += "<span class='SSSTEXTWEEKLY' >CSCI 3308 - 100<br>Lecture<br>11:00AM - 11:50AM<br>Duane Physics G1B20</span></td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "</tr>"
		
		//12:00 pm row
		calendar += "<tr>"
		calendar += "<td class='SSSWEEKLYTIMEBACKGROUND' rowspan='1'>"
		calendar += "<span class='SSSTEXTWEEKLYTIME' >12:00PM</span>"
		calendar += "</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "</tr>"
		
		//1:00 pm row
		calendar += "<tr>"
		calendar += "<td class='SSSWEEKLYTIMEBACKGROUND' rowspan='1'>"
		calendar += "<span class='SSSTEXTWEEKLYTIME' >1:00PM</span>"
		calendar += "</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "</tr>"
		
		//2:00 pm row
		calendar += "<tr>"
		calendar += "<td class='SSSWEEKLYTIMEBACKGROUND' rowspan='1'>"
		calendar += "<span class='SSSTEXTWEEKLYTIME' >2:00PM</span></td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='SSSWEEKLYBACKGROUND' rowspan='2'><span class='SSSTEXTWEEKLY' >MCEN 3047 - 013<br>Laboratory<br>2:00PM - 3:50PM<br>Drescher Undergrad Engr 1B10</span></td>"
		calendar += "<td class='SSSWEEKLYBACKGROUND' rowspan='1'><span class='SSSTEXTWEEKLY' >MCEN 3032 - 001<br>Lecture<br>2:00PM - 2:50PM<br>Engineering Classroom Wing 265</span></td>"
		calendar += "<td class='SSSWEEKLYBACKGROUND' rowspan='2'><span class='SSSTEXTWEEKLY' >MCEN 3047 - 013<br>Laboratory<br>2:00PM - 3:50PM<br>Drescher Undergrad Engr 1B10</span></td>"
		calendar += "<td class='SSSWEEKLYBACKGROUND' rowspan='1'><span class='SSSTEXTWEEKLY' >MCEN 3032 - 001<br>Lecture<br>2:00PM - 2:50PM<br>Engineering Classroom Wing 265</span></td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td><td class='PSLEVEL3GRID'>&nbsp;</td></tr>"
		
		//3:00 pm row
		calendar += "<tr>"
		calendar += "<td class='SSSWEEKLYTIMEBACKGROUND' rowspan='1'>"
		calendar += "<span class='SSSTEXTWEEKLYTIME' >3:00PM</span>"
		calendar += "</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='SSSWEEKLYBACKGROUND' rowspan='1'>"
		calendar += "<span class='SSSTEXTWEEKLY' >MCEN 3047 - 010<br>Lecture<br>3:00PM - 3:50PM<br>Engineering Classroom Wing 1B40</span></td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td></tr>"
		
		//4:00 pm row
		calendar += "<tr>"
		calendar += "<td class='SSSWEEKLYTIMEBACKGROUND' rowspan='1'>"
		calendar += "<span class='SSSTEXTWEEKLYTIME' >4:00PM</span>"
		calendar += "</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='SSSWEEKLYBACKGROUND' rowspan='2'><span class='SSSTEXTWEEKLY' >CSCI 3308 - 102<br>Laboratory<br>4:00PM - 5:50PM<br>Engr Cntr - Comp Sci Dept Wing 112C</span></td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "</tr>"
		
		//5:00 pm row
		calendar += "<tr>"
		calendar += "<td class='SSSWEEKLYTIMEBACKGROUND' rowspan='1'>"
		calendar += "<span class='SSSTEXTWEEKLYTIME' >5:00PM</span>"
		calendar += "</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"	
		calendar += "</tr>"
	
		//6:00 pm row
		calendar += "<tr>"
		calendar += "<td class='SSSWEEKLYTIMEBACKGROUND' rowspan='1'>"
		calendar += "<span class='SSSTEXTWEEKLYTIME' >6:00PM</span></td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
		calendar += "</tr>"
		
		calendar += "</table>"
		calendar += "</div>"
		calendar += "</div>"
		
		iframe.find('.PSLEVEL1GRIDNBO').after(calendar);
		//document.querySelector("[id^='win0div$ICField']").id.innerHTML += calendar;
	});
});
