console.log('Script.js injected!');

//Dictionary of prerequisites
console.log(prereqs);


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
		//         ENROLLED COURSE DATA
		// ***************************************

		// Loop through courses already registered and apply desired parsing/functions
		iframe.find('.PSLEVEL2GRIDROW').find('span').each(function(i, item){

			// Parse Course Name Information from enrolled courses
			if(item.id.match("^E_CLASS_NAME")){
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
						"mapped": false,
						"dropped": false
				};

				$(this).closest('tr').find('div').each(function(i, imgItem){
					if(imgItem.id.match("^win0divDERIVED_REGFRM1_SSR_STATUS_LONG")){
						if($(this).find('img').attr('alt') == "Dropped") {
							console.log(fullCourseName + " has been dropped.");
							courseDict[fullCourseName]["dropped"] = true;
						}
					}
				});
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
						var timeSpan = (schedule[2][1]-schedule[2][0]) / 100;
						if (timeSpan % 1 == 0) {
							courseDict[course]["span"] = timeSpan * 2;
						} else {
							timeSpan = Math.floor(timeSpan) * 2 + 1;
							courseDict[course]["span"] = timeSpan;
						}
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

				// REMOVE TO GET PRE-REQS FOR ALL CLASSES
				if(classinfo[0] == "CSCI") {
					$(item).attr('title', prereqs[classinfo[0]][classinfo[1]]);
				}
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
						"mapped": false,
						"dropped": false
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
						var timeSpan = (schedule[2][1]-schedule[2][0]) / 100;
						if (timeSpan % 1 == 0) {
							courseDict[course]["span"] = timeSpan * 2;
						} else {
							timeSpan = Math.ceil(timeSpan) + 1;
							courseDict[course]["span"] = timeSpan;
						}
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
		calendar += "<colgroup span='7' width='13%' align='center' valign='middle'>"
		calendar += "<tr><th scope='col' align='center' colspan='7' class='SSSWEEKLYA1BACKGROUND' >What-If Calendar (Green: Enrolled --- Blue: Shopping Cart --- Orange: Conflict)</th></tr>"
		calendar += "<tr><th scope='col' align='center' class='SSSWEEKLYA1BACKGROUND' >Time</th><th scope='col' align='center' class='SSSWEEKLYDAYBACKGROUND' >Monday<br>"
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

		var time = 800; //Start calendar at 8:00 am
		var max_time = 0;
		//Ends calendar after last class
		for (course in courseDict){
			max_time = Math.max(max_time, courseDict[course]["times"][1]);
		}
		var weekdays = ["Mo", "Tu", "We", "Th", "Fr"]; //Sets class days
		var conflictDict = {};
		var half = false; //Checks for half hour increments
		var time_add; //Defines whether to add 30 or 70 for next time increment
		var overflowStr = ''
		var overflowRows = [[0, ''],[0, ''],[0, ''],[0, ''],[0, '']] //For dealing with multi-row crap.

		while(time<=max_time){ //Iterates through each half-hour time slot
			civ_time = civTime(time, half);//Puts time into readable format
			//console.log("Time: " + time + " " + "Civ Time: " + civ_time);
			time_add = timeInc(half);//Determines how much time to add to increment the hour

			for (j = 0; j < 5; j++){
				if(overflowRows[j][0] > 0){
					overflowStr += weekdays[j]
				}
			}

			// console.log(overflowStr, 'overflow', time)

			calendar += "<tr" + " overwrittendays = " + overflowStr + ">"
			calendar += "<td class='SSSWEEKLYTIMEBACKGROUND' rowspan='1'>"
			calendar += "<span class='SSSTEXTWEEKLYTIME' >"+civ_time+"</span>"
			calendar += "</td>"

			for(var i = 0; i<5; i++){ //Iterates through weekdays
				var empty = true;
				var prevEntry = null;
				for(var course in courseDict){ //Iterates through every course in the courseDict
					if($.inArray(weekdays[i], courseDict[course]["days"])!=(-1)){ //If the class occurs on the current day
						var startTime = courseDict[course]["times"][0];
						if((startTime >= time) && (startTime<(time+time_add))){ //If the current class starts in the next half hour
							if (!courseDict[course]["dropped"]){ //If the course hasn't been dropped
								if(empty == true && overflowRows[i][0] == 0){
									overflowRows[i][0] = courseDict[course]["span"]
									overflowRows[i][1] = course
									// console.log(course, 'overflows by ' + courseDict[course]["span"])
									var color = '';
									if (!courseDict[course]["enrolled"]){ // Makes shopping cart classes show up blue
										//CART = blue
										//OVLP = red
										color = 'CART';
									}
									calendar += "<td class='SSSWEEKLYBACKGROUND"+color+"' rowspan='"+String(courseDict[course]["span"])+"'>" //Adds the colored box
									//Fills in the class information
									calendar += "<span class='SSSTEXTWEEKLY' >"+course+"<br>"+courseDict[course]["instr"]+"<br>"+courseDict[course]["time"]+"<br>"+courseDict[course]["location"]+"<br>"+courseDict[course]["units"]+"</span></td>"
									empty = false;
									prevEntry = course
								}else{
									if(empty == false){ // Conflict where two courses start at the same time
										if(conflictDict[i + ' ' + time] == undefined){
											conflictDict[i + ' ' + time] = [course,prevEntry]
										}else{
											conflictDict[i + ' ' + time] = conflictDict[i + ' ' + time].concat(course)
										}

									} else { // Conflict where the tail of one class overlaps the other
										if(conflictDict[i + ' ' + time] == undefined){
											conflictDict[i + ' ' + time] = [overflowRows[i][1],course]
										}else{
											conflictDict[i + ' ' + time] = conflictDict[i + ' ' + time].concat(course)
										}
									}
								}
							}
						}
					}
				}
				if (empty == true){
					if(overflowRows[i][0] == 0){
						//Adds empty cell to the calendar
						calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
					}
				}
			}
			calendar += "</tr>"
			for (j = 0; j < 5; j++){ //
				if(overflowRows[j][0] > 0){
					overflowRows[j][0] -= 1
				}
			}
			time += time_add;
			half = !half;

			overflowStr = ''
		}

		console.log(conflictDict)

		calendar += "</table>"
		calendar += "</div>"
		calendar += "</div>"

		function timeInc(half){//Determines increment for next half hour
			if (half == false){
				time_add = 30;
			}
			else{
				time_add = 70;
			}
			return time_add;
		}

		function civTime(time, half){//Puts time into readable format
			var civ_time = String(Math.floor(time/100));
			if (time<1200){
				if(half == false){
					civ_time += ":00 am"
				}
				else{
					civ_time += ":30 am"
				}
			}
			else if (time>1200){
				if(half == false){
					civ_time = String(Math.floor((time/100)-12))+":00 pm"
				}
				else{
					if(time > 1230){
						civ_time = String(Math.floor((time/100)-12))+":30 pm"
					} else {
						civ_time = String(Math.floor(time/100)) + ":30 pm"
					}
				}
			}
			else{
				civ_time += ":00 pm"
			}
			return civ_time;
		}

		iframe.find('.PSLEVEL1GRIDNBO').after(calendar); //Injects HTML into the page after the shopping cart

		var calendar = iframe.find('#SHOPPING_CART_SCHED_HTMLAREA');

// Conflict Handling

		if (conflictDict.length > 0){
			alert("It seems you have a conflict! It is shown in red on the calendar, click to toggle between classes");
		}

		function getDayIndex(row, dayIndex){

			var overwrittenDays = $(row).attr('overwrittendays')
			var skipcount = 0
			var continueLooping = true;
			//number of 'td' entries will change depending on which days are ommitted.
			//Ex: a friday when wednesday is overwritten is at $(row).find('td')[4] instead of ...[5].
			while(continueLooping == true){
				if(overwrittenDays == ''){
					continueLooping = false;
				}
				if(weekdays.indexOf(overwrittenDays.substr(0,2)) < (dayIndex-1) ){
					skipcount += 1
				}
				overwrittenDays = overwrittenDays.substr(2)
			}
			return dayIndex - skipcount + 1
		}

		calendar.find('tr').each(function(i, row){
			if ((i - 1) % 2 != 0) {
				rowTime = (i-1) *50 +750;
			} else {
				rowTime = (i-1) * 50 + 730;
			}
			for (conflict in conflictDict){
				if (conflict.substr(2, conflict.length)  == rowTime) {
					var dayIndex = parseInt(conflict[0]) + 1
					var course = 'BLANK'
					var conflictElm = null
					var conflictSpan = null
					$(conflictElm).attr('conflict', conflict)
					var overwrittenDays = $(row).attr('overwrittendays')
					if(overwrittenDays.indexOf(weekdays[dayIndex-1]) == -1){
						dayIndex = getDayIndex(row, dayIndex)
						conflictElm = $(row).find('td')[dayIndex]
						conflictSpan = $(conflictElm).find('span')
					}else{

						//This is what happens if there's a multi row conflict where the conflictDict time isn't correct.
						var tempRow = null
						for(j = 0; j < conflictDict[conflict].length; j++){
							var tempTime = courseDict[conflictDict[conflict][j]]['times'][0]
							if((tempTime % 100) == 30){
								tempTime += 20 // sets up the time to 850,950, etc if it's a half hour interval for calc purposes
							}
							if(tempTime < rowTime){

								tempRow = calendar.find('tr')[(tempTime-700)/50]
							}
							if(tempRow != null){
								break;
							}
						}
						console.log(tempRow)
						if(tempRow != null){
							dayIndex = getDayIndex(tempRow, dayIndex)
							conflictElm = $(tempRow).find('td')[dayIndex]
							conflictSpan = $(conflictElm).find('span')
						}else{
							console.log('something is broken', tempRow)
						}
					}

		// ***************************************
		//           CONFLICT CHANGES
		// ***************************************
//conflictElm is the <td> element. conflictSpan is the <span> element within it.
//Anything done to the conflictElm inside the following if statement will properly update to the calendar.
					if(conflictElm != null){
						$(conflictElm).attr('class', 'SSSWEEKLYBACKGROUNDOVLP');
						var clicked = 0;
						var counter = -1
						var classViewed = conflictElm.firstChild.firstChild;
						$(conflictElm).attr('conflictkey', conflict)
						$(conflictElm).attr('coniterator', 0)
						$(conflictElm)[0].addEventListener('click', function(){
							conflict = $(this).attr('conflictkey')
							counter = parseInt($(this).attr('coniterator'))
							console.log(conflictDict[conflict].length, counter)
							if(counter < conflictDict[conflict].length-1){
								counter += 1
							}else{
								counter = 0
							}
							course = conflictDict[conflict][counter]
							$(this).attr('coniterator',counter)
							var courseText = ''
							if(counter > 0){
								courseText = 'CONFLICT ' + counter + ': ' + course
							}else{
								courseText = course
							}

							$(this).html(courseText +"<br>"
						+courseDict[course]["instr"]+"<br>"
						+courseDict[course]["time"]+"<br>"
						+courseDict[course]["location"]+"<br>"
						+courseDict[course]["units"])
						});
					} else {
						console.log('something is broken for ', conflict)
					}

				}

			}
		});
		//document.querySelector("[id^='win0div$ICField']").id.innerHTML += calendar;
	});
});
