console.log('Script.js injected!');



// ***************************************
//           HELPER FUNCTIONS
// ***************************************

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

// This function will eventually draw the course descriptions from the database
// function getCourseDescription(deptartment,number) {
//   var xhttp;
//   if (department == "" || number == "") {
//     document.getElementById("txtHint").innerHTML = "";
//     return;
//   }
//   xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//     document.getElementById("txtHint").innerHTML = this.responseText;
//     }
//   };
//   xhttp.open("GET", "getcustomer.asp?deparment="+deparment+"number="+number, true);
//   xhttp.send();
// }

// FUNCTION: getDaysandTime() parses course times into more usable pieces
// INPUT: ("MoWeFr 2:00PM - 2:50PM")
// OUTPUT: [    ["Mo, "We", "Fr"],   "2:00PM - 2:50PM",   [200, 300]    ]

function getDaysandTime(timeText) {
	var data = timeText.split(" ");
	var days = data[0];
	var startPM = false;
	var endPM = false;

	days = days.match(/.{1,2}/g);

	var timeString = data[1] + " - " + data[3];

	var timeStart = data[1];
	timeStart = timeStart.split("P")[0];
	if(timeStart.length <= 4) {
		startPM = true;
	} else {
		timeStart = timeStart.split("A")[0];
	}
	timeStart1 = timeStart.split(":");
	timeStart = timeStart1[0] + timeStart1[1];

	timeStart = parseInt(timeStart);

	var timeEnd = data[3]
	timeEnd = timeEnd.split("P")[0];
	if(timeEnd.length <= 4) {
		endPM = true;
	} else {
		timeEnd= timeEnd.split("A")[0];
	}
	timeEnd1 = timeEnd.split(":");
	timeEnd = timeEnd1[0] + timeEnd1[1];

	timeEnd = parseInt(timeEnd);

	if(startPM && timeStart < 1200) { 
		timeStart += 1200
	}

	if(endPM && timeEnd < 1200) { 
		timeEnd += 1200
	}

	if (timeEnd % 100 > 30) {
		timeEnd = timeEnd + (100 - (timeEnd % 100))
	}
	else if (timeEnd % 100 > 10) {
		timeEnd  = timeEnd + (30 - (timeEnd % 100))
	}

	return [days, timeString, [timeStart, timeEnd]]
}



// ***************************************
//             MAIN FUNCTION
// ***************************************

$(document).ready(function(){
	$("iframe")[0].addEventListener("load",function(){
		iframe = getFrame();
		

		//Add new header to shopping cart table for course catalog Links
		tableBody = iframe.find('.PSLEVEL1GRIDNBO');
		tableBody.width(900) //change the width of the whole table so links fit
		tableBody = tableBody.find('tbody');
		firstRow = $(tableBody).children().eq(0); 	//access first row in tbody
		firstRow = firstRow.find('td:first') //find first td
		firstRow.attr('colspan', '12')	//change attribute value
		secondChild = $(tableBody).children().eq(1);
		secondChild.append('<th scope="col" width="200" align="left" class="PSLEVEL3GRIDCOLUMNHDR"><a>Course Catalog Link</a></th>') //makes header 
		


//Shopping Cart Sort Function Fix
		/*
		* I had to create a sort function from scratch because CU handles all of their
		* requests through really shitty hrefs attributes linking to javascript, making it impossible to call
		* for our load event to go off again after you click the header buttons.
		* 
		* Still Needs a way to sort by status / enroll status.
		*/	
		function sortShoppingCart(f,n, tableBody){
			//Helper Function for sorting the shopping cart
			var rows = $(tableBody).find('tr').get();
			console.log(tableBody)
			rows.sort(function(a, b) { 
			// This is a prototype for javascript's built in sort function.
			// More here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort?v=control
				var A = getVal(a);
				var B = getVal(b);
				if(A < B) {
					return -1*f;
				}
				if(A > B) {
					return 1*f;
				}
				return 0;
			});


			function getVal(elm){
				var v = -1
				if (n == 7) { //case Status
					vElm = $(elm).children('td').eq(n).find('img')
					if(vElm.length == 0){ //Just some error catching. Uses default.
						v =  $(elm).children('td').eq(n).text().toUpperCase();
					}else{
						console.log('I just hit status!')
						if(vElm[0].alt == 'Open'){
							v = 0
						}else if(vElm[0].alt == 'Wait List'){
							v = 1
						}else{
							v = 2
						}
					}
				} else if (n == 8){ //Enroll Status
					vElm = $(elm).children('td').eq(n).find('img')
					if(vElm.length == 0){
						v = 0
					}else{
						v = 1
					}
				} else { //All other cases
					v = $(elm).children('td').eq(n).text().toUpperCase();
				}
				if ($.isNumeric(v)) {
					v = parseInt(v,10);
				}
				return v;
			}

			$.each(rows, function(index, row) {
				firstTD = $(row).children('td').eq(0).text().toUpperCase()
				if(firstTD == ''){
					//Table Header Row
					$(tableBody).before(row);

				}else if($(row).children().length == 1){
					//Table Label Row (the part that says Fall 2017 UC Boulder... etc)
					$(tableBody).before(row);
					
				}else{
					$(tableBody).append(row);
				}
			});
		}
		var sortFlag = 1; //Determines sort order
	
		secondChild.find("th").each(function(i, tableHeader) {
			$(tableHeader.children[0]).removeAttr('href') 
			$(tableHeader).click(function() {
				sortFlag *= -1; 
				var n = $(this).prevAll().length; // Finds the column number to sort by
				sortShoppingCart(sortFlag,n,tableBody);
			});
		});
//End of sort fix


		// Create course dictionary for use in "What If" Calendar
		var courseDict = {};



		// ***************************************
		//           SHOPPING CART DATA
		// ***************************************

		// Loop through courses in shopping cart and apply desired parsing/functions
		iframe.find('.PSLEVEL3GRIDWBO').find('span').each(function(i, item){

			// Parse Course Name Information from shopping cart and apply functionality
			if(item.id.match("^P_CLASS_NAME")){
				/*
				First thing's first, after locating a "course" in our shopping cart, we have to get the course name.
				The text that defines the course ("CSCI 1300", for example) will be found as the first child of item if the
				course has no link attached (.id == undefined) and will be the first child's first child if it is a hyperlink.
				*/
				var textObj = item.firstChild;
				//console.log(textObj)
				if(textObj.id != undefined){
					textObj = textObj.firstChild;
					//console.log(textObj);
				}
				else{
					//console.log(textObj);
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
					//console.log('hoverStartDpt:', classinfo[0]);
					},
				function() {
					/*
					This happens when the user stops hovering the mouse over the item.
					*/
					//console.log('hoverReleaseCrse:', classinfo[1]);
					}
				);

				// Create dictionary entry for the course in courseDict for future use in "What If" Calendar
				var fullCourseName = textObj.data;
				courseDict[fullCourseName] = {
						"days": "null",
						"time": "null",
						"times": "null",
						"location": "null",
						"instr": "null",
						"units": "null",
						"span": "null",
						"enrolled": false,
						"mapped": false
				};
			}

			// Parse Course Time Information from shopping cart
			else if(item.id.match("^DERIVED_REGFRM1_SSR_MTG_SCHED_LONG")) {
				//console.log(item);
				var timeText = $(this).text();
				//console.log(timeText);

				// Parse course time into more usable format
				var schedule = getDaysandTime(timeText);

				// Search for first course in dictionary missing a date/time and populate with new data
				for (var course in courseDict) {
					if(!courseDict.hasOwnProperty(course)) {
						continue;
					}
					if (courseDict[course]["days"] == "null") {
						courseDict[course]["days"] = schedule[0];
						courseDict[course]["time"] = schedule[1];
						courseDict[course]["times"] = schedule[2];
						courseDict[course]["span"] = Math.ceil((schedule[2][1]-schedule[2][0])/100);
						break;
					}
				}

			}

			// Parse Course Location Information from shopping cart
			else if(item.id.match("^DERIVED_REGFRM1_SSR_MTG_LOC_LONG")) {
				// console.log(item);
				var locText = $(this).text();
				//console.log(locText);

				// Search for first course in dictionary missing a location and populate with new data
				for (var course in courseDict) {
					if(!courseDict.hasOwnProperty(course)) {
						continue;
					}
					if (courseDict[course]["location"] == "null") {
						courseDict[course]["location"] = locText;
						break;
					}
				}

			}

			// Parse Course Instructor Information from shopping cart
			else if(item.id.match("^DERIVED_REGFRM1_SSR_INSTR_LONG")) {
				//console.log(item);
				var instrText = $(this).text();
				//console.log(instrText);

				// Search for first course in dictionary missing an instructor and populate with new data
				for (var course in courseDict) {
					if(!courseDict.hasOwnProperty(course)) {
						continue;
					}
					if (courseDict[course]["instr"] == "null") {
						courseDict[course]["instr"] = instrText;
						break;
					}
				}

			}

			// Parse Course Unit Information from shopping cart
			else if(item.id.match("^SSR_REGFORM_VW_UNT_TAKEN")) {
				// console.log(item);
				var unitText = $(this).text();
				//console.log(unitText);

				// Search for first course in dictionary missing unit information and populate with new data
				for (var course in courseDict) {
					if(!courseDict.hasOwnProperty(course)) {
						continue;
					}
					if (courseDict[course]["units"] == "null") {
						courseDict[course]["units"] = unitText;
						break;
					}
				}
			}

		});



		// ***************************************
		//         ENROLLED COURSE DATA
		// ***************************************

		// Loop through courses already registered and apply desired parsing/functions
		iframe.find('.PSLEVEL2GRIDROW').find('span').each(function(i, item){

			// Parse Course Name Information from enrolled courses
			if(item.id.match("^E_CLASS_NAME")){
				$(this).closest('tr').find('div').each(function(i, imgItem){
					if(imgItem.id.match("^win0divDERIVED_REGFRM1_SSR_STATUS_LONG")){
						var imgDiv = imgItem.firstChild;
						console.log(imgDiv);
					}
				});

				/*
				First thing's first, after locating a "course" in our course list, we have to get the course name.
				The text that defines the course ("CSCI 1300", for example) will be found as the first child of item if the
				course has no link attached (.id == undefined) and will be the first child's first child if it is a hyperlink.
				*/
				var textObj = item.firstChild;
				//console.log(textObj)
				if(textObj.id != undefined){
					textObj = textObj.firstChild;
					//console.log(textObj);
				}
				else{
					//console.log(textObj);
				}

				// Create dictionary entry for the course in courseDict for future use in "What If" Calendar
				var fullCourseName = textObj.data;
				courseDict[fullCourseName] = {
						"days": "null",
						"time": "null",
						"times": "null",
						"location": "null",
						"instr": "null",
						"units": "null",
						"span": "null",
						"enrolled": true,
						"mapped": false
				};
			}

			// Parse Course Time Information from enrolled courses
			else if(item.id.match("^DERIVED_REGFRM1_SSR_MTG_SCHED_LONG")) {
				// console.log(item);
				var timeText = $(this).text();
				//console.log(timeText);

				// Parse course time into more usable format
				var schedule = getDaysandTime(timeText);

				// Search for first course in dictionary missing a date/time and populate with new data
				for (var course in courseDict) {
					if(!courseDict.hasOwnProperty(course)) {
						continue;
					}
					if (courseDict[course]["days"] == "null") {
						courseDict[course]["days"] = schedule[0];
						courseDict[course]["time"] = schedule[1];
						courseDict[course]["times"] = schedule[2];
						courseDict[course]["span"] = Math.ceil((schedule[2][1]-schedule[2][0])/100);		
						break;
					}
				}

			}

			// Parse Course Location Information from enrolled courses
			else if(item.id.match("^DERIVED_REGFRM1_SSR_MTG_LOC_LONG")) {
				// console.log(item);
				var locText = $(this).text();
				//console.log(locText);

				// Search for first course in dictionary missing a location and populate with new data
				for (var course in courseDict) {
					if(!courseDict.hasOwnProperty(course)) {
						continue;
					}
					if (courseDict[course]["location"] == "null") {
						courseDict[course]["location"] = locText;
						break;
					}
				}

			}

			// Parse Course Instructor Information from enrolled courses
			else if(item.id.match("^DERIVED_REGFRM1_SSR_INSTR_LONG")) {
				//console.log(item);
				var instrText = $(this).text();
				//console.log(instrText);

				// Search for first course in dictionary missing an instructor and populate with new data
				for (var course in courseDict) {
					if(!courseDict.hasOwnProperty(course)) {
						continue;
					}
					if (courseDict[course]["instr"] == "null") {
						courseDict[course]["instr"] = instrText;
						break;
					}
				}

			}

			// Parse Course Unit Information from enrolled courses
			else if(item.id.match("^STDNT_ENRL_SSVW_UNT_TAKEN")) {
				// console.log(item);
				var unitText = $(this).text();
				// console.log(unitText);

				// Search for first course in dictionary missing unit information and populate with new data
				for (var course in courseDict) {
					if(!courseDict.hasOwnProperty(course)) {
						continue;
					}
					if (courseDict[course]["units"] == "null") {
						courseDict[course]["units"] = unitText;
						break;
					}
				}
			}
		});

		// Display  final course dictionary for "What If" Calendar
		console.log(courseDict);



		// ***************************************
		//           "WHAT IF" CALENDAR
		// ***************************************

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
		//calendar += "</th><th scope='col' align='center' class='SSSWEEKLYDAYBACKGROUND' >Saturday<br>"
		//calendar += "</th><th scope='col' align='center' class='SSSWEEKLYDAYBACKGROUND' >Sunday<br>"
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

		var time;
		var max_time = 2000;
		var weekdays = ["Mo", "Tu", "We", "Th", "Fr"];
		var conflictDict = {};

		for(time = 800; time<=max_time; time=time+100){
			var civ_time = String(time/100);
			if (time<1200){
				civ_time += ":00 am"
			}
			else if (time>1200){
				civ_time = String((time/100)-12)+":00 pm"
			}
			else{
				civ_time += ":00 pm"
			}
			calendar += "<tr>"
			calendar += "<td class='SSSWEEKLYTIMEBACKGROUND' rowspan='1'>"
			calendar += "<span class='SSSTEXTWEEKLYTIME' >"+civ_time+"</span>"
			calendar += "</td>"
			for(var i = 0; i<5; i++){
				var empty = 0;
				var prevEntry = null;
				for(var course in courseDict){	
					if($.inArray(weekdays[i], courseDict[course]["days"])!=(-1)){
						if(courseDict[course]["times"][0] == time){
							if (courseDict[course]["mapped"] == false){
								if(empty != 1){
									calendar += "<td class='SSSWEEKLYBACKGROUND' rowspan='"+String(courseDict[course]["span"])+"'>"
									calendar += "<span class='SSSTEXTWEEKLY' >"+course+"<br>"+courseDict[course]["instr"]+"<br>"+courseDict[course]["time"]+"<br>"+courseDict[course]["location"]+"<br>"+courseDict[course]["units"]+"</span></td>"
									empty = 1;
									prevEntry = course
								}else{
									conflictDict[i + ' ' + time] = {
										'course1': course,
										'course2': prevEntry
									}
								}	
							}								
						}
						else if((courseDict[course]["times"][0] == time-100)&&(courseDict[course]["span"] > 1)){
							empty = 1;
						}	
					}
				}
				if (empty == 0){
					calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
					//console.log("Empty")
				}
			}
			calendar += "</tr>"
		}
		console.log(conflictDict)

		/*
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
		calendar += "<td class='SSSWEEKLYBACKGROUND' rowspan='2'>
		calendar += "<span class='SSSTEXTWEEKLY' >CSCI 3308 - 102<br>Laboratory<br>4:00PM - 5:50PM<br>Engr Cntr - Comp Sci Dept Wing 112C</span></td>"
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
		*/

		calendar += "</table>"
		calendar += "</div>"
		calendar += "</div>"

		iframe.find('.PSLEVEL1GRIDNBO').after(calendar);

		var calendar = iframe.find('#SHOPPING_CART_SCHED_HTMLAREA');

		calendar.find('tr').each(function(i, row){
			rowTime = i*100 +700
			for (conflict in conflictDict){
				if (conflict.substr(2, conflict.length)  == rowTime) {
					console.log('Con Found ', conflict)
					var dayIndex = parseInt(conflict[0]) + 1
					console.log($(row).find('td')[dayIndex])

				}

			}	
		});
		


		//document.querySelector("[id^='win0div$ICField']").id.innerHTML += calendar;
	});
});
