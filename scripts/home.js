//
//Global
//

var filec;

//
//

function update() {
	var name = $("#file").get(0).files[0].name;
	console.log(name);
	$("#name").html(name);
	$("#contain").empty();
	$("#CID").html("");
	$("#CS").empty();
	$("#PROJECTS").empty();
}

$(document).ready( function () {
    $('#myTable').DataTable();
} );

function convert(){
	if (!$("#file").get(0).files[0]) {
		alert("Upload a file first");
		return;
	} else {
		var file = $("#file").get(0).files[0];
		var reader = new FileReader();
    	reader.readAsText(file);
    	reader.onload = function (evt) {
			filec = JSON.parse(evt.target.result);
			console.log(filec);
			generate();
    	}
    	reader.onerror = function (evt) {
    	    $("#content").innerHTML = "error reading file";
    	}
	}
}

function generate() {
	$("#contain").empty();
	$("#CID").html("");
	$("#CS").empty();
	basicdetails();
}

function basicdetails(){
	var img = $("<img>", {id:"basicDimg", class:"BUDimg text-center", src:filec.image_url});
	// img.src = filec.image_url;
	$("#contain").append(img);
	var br = $("<br>");
	$("#contain").append(br);
	var br = $("<br>");
	$("#contain").append(br);
	var div = $("<div>", {id:"basicD", class:"BUD"});
	$("#contain").append(div);
	var id = $("<p>", {class:"BUDid DET"});
	id.html("ID: "+filec.id);
	// id.html("ID: "+filec.id+" | "+"Email: "+filec.email+" | "+"Login: "+filec.login+" | "+"Name: "+filec.first_name+" | "+"Surname: "+filec.last_name+" | "+"Cohort: "+filec.pool_year+" | "+"Campus: "+filec.campus[0].name);
	div.append(id);

	var email = $("<p>", {class:"BUDemail DET"});
	email.html("Email: "+filec.email);
	div.append(email);

	var login = $("<p>", {class:"BUDlogin DET"});
	login.html("Login: "+filec.login);
	div.append(login);

	var first_name = $("<p>", {class:"BUDfirst_name DET"});
	first_name.html("Name: "+filec.first_name);
	div.append(first_name);

	var last_name = $("<p>", {class:"BUDlast_name DET"});
	last_name.html("Surname: "+filec.last_name);
	div.append(last_name);

	var pool_year = $("<p>", {class:"BUDpool_year DET"});
	pool_year.html("Cohort: "+filec.pool_year);
	div.append(pool_year);

	var campus = $("<p>", {class:"BUDcampus DET"});
	campus.html("Campus: "+filec.campus[0].name);
	div.append(campus);
	courseSelector();
}

var courses = new Array();

function courseSelector() {
	courses = new Array();
	$("#CID").html("Courses");
	var i = 0;
	filec.cursus_users.forEach(cursus => {
		var course = {
			"cid": cursus.cursus_id,
			"level": cursus.level,
			"name": cursus.cursus.name
		}
		courses.push(course);
	});
	courses.forEach(cs => {
		var btn = $("<button>", {id:"CS-"+cs.cid, class:"CS btn text-center", onclick: "updateC("+cs.cid+")"});
		btn.html(cs.name);
		$("#CS").append(btn);
	})
}
var tableG;
var PAA = new Array();
function updateC(id){
	PAA = new Array();
	console.log("loading course "+id);
	$("#PROJECTS").empty();
	var table = $("<table>", {id:"Ptable", class:"PT text-center"});
	$("#PROJECTS").append(table);
	//
	//head
	//
	var thead = $("<thead>", {id:"thead", class:"PTthead text-center"});
	table.append(thead);
	var tr = $("<tr>", {id:"tr", class:"PTtr text-center"});
	thead.append(tr);
	var th = $("<th>", {class:"PTth text-center"});
	th.html("PID");
	tr.append(th);
	var th = $("<th>", {class:"PTth text-center"});
	th.html("Name");
	tr.append(th);
	var th = $("<th>", {class:"PTth text-center"});
	th.html("Mark");
	tr.append(th);
	var th = $("<th>", {class:"PTth text-center"});
	th.html("Marked At");
	tr.append(th);
	var th = $("<th>", {class:"PTth text-center"});
	th.html("TeamID");
	tr.append(th);
	var th = $("<th>", {class:"PTth text-center"});
	th.html("Status");
	tr.append(th);
	var th = $("<th>", {class:"PTth text-center"});
	th.html("Validated");
	tr.append(th);
	//
	//foot
	//
	var tfoot = $("<tfoot>", {id:"tfoot", class:"PTtfoot text-center"});
	table.append(tfoot);
	var tr = $("<tr>", {id:"tr", class:"PTtr text-center"});
	tfoot.append(tr);
	var th = $("<th>", {class:"PTth text-center"});
	th.html("PID");
	tr.append(th);
	var th = $("<th>", {class:"PTth text-center"});
	th.html("Name");
	tr.append(th);
	var th = $("<th>", {class:"PTth text-center"});
	th.html("Mark");
	tr.append(th);
	var th = $("<th>", {class:"PTth text-center"});
	th.html("Marked At");
	tr.append(th);
	var th = $("<th>", {class:"PTth text-center"});
	th.html("TeamID");
	tr.append(th);
	var th = $("<th>", {class:"PTth text-center"});
	th.html("Status");
	tr.append(th);
	var th = $("<th>", {class:"PTth text-center"});
	th.html("Validated");
	tr.append(th);
	//
	//
	tableG = $('#Ptable').DataTable();
	filec.projects_users.forEach(project => {
		var match = false;
		project.cursus_ids.forEach(cid => {
			if (cid == id) {
				match = true;
			}
		})
		if (match) {
			var proj = $("<p>", {class:"BUDid"});
			if (project.marked){
				var PP = [
					project.project.id,
					project.project.name,
					project.final_mark,
					project.marked_at,
					project.current_team_id,
					project.status,
					project["validated?"]
				];
				// proj.html("PID: "+project.project.id+" | "+"Name: "+project.project.name+" | "+"Mark: "+project.final_mark+" | "+"Marked: "+project.marked_at+" | "+"TeamID: "+project.current_team_id+" | "+"Status: "+project.status+" | "+"Validated: "+project["validated?"]);
			}else {
				var PP = [
					project.project.id,
					project.project.name,
					"N/A",
					project.marked,
					project.current_team_id,
					project.status,
					project["validated?"]
				];
				// proj.html("PID: "+project.project.id+" | "+"Name: "+project.project.name+" | "+"Mark: "+"N/A"+" | "+"Marked: "+project.marked+" | "+"TeamID: "+project.current_team_id+" | "+"Status: "+project.status+" | "+"Validated: "+project["validated?"]);
			}
			$("#PROJECTS").append(proj);
			PAA.push(PP);
		}
	})
	tableG.clear();
    tableG.rows.add(PAA);
    tableG.draw();
}