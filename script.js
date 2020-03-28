function getHandle() {
	var queryString = window.location.search;
	var params = new URLSearchParams(queryString);
	return params.get('handle');
}

window.onload = initPage;

function initPage() {
	handle = getHandle();
	document.getElementById('handle').innerHTML = handle;
	console.log(handle);
}

function dataFilter(result, dataTable) {
	var qntAC = 0;
	for(let j = 0; j < dataTable.length; j += 1) {
		for(let i = 0; i < result.length; i += 1) {
			if(dataTable[j]['problem']['name'] == result[i]['problem']['name']) {
				dataTable[j]['problem']['points'] = result[i]['problem']['points'];
				if(result[i]['verdict'] == 'OK' || dataTable[j]['problem']['verdict'] == 'OK') {
					dataTable[j]['verdict'] = result[i]['verdict'];
					qntAC += 1;			
					break;
				} else if(result[i]['verdict'] != dataTable[j]['problem']['verdict']){
					dataTable[j]['verdict'] = result[i]['verdict'];
				}
			}
		}
	}
	return qntAC;
}

function createTable(dataTable, qnt, qntAC) {
	var stringTable = `<table><thead><tr>
	<th> codigo </th>
	<th> Nome </th>
	<th> Pontuação </th>
	<th> Resultado </th>
	</tr></thead><tbody>`;
	for(let i = 0; i < qnt; i += 1) {
		classAnswer = {'OK': 'AC', 'WRONG_ANSWER': 'WA', 'void': '', 'TIME_LIMIT_EXCEDED': 'TLE', 'RUN_TIME_EXCEDED': 'RTE'};
		stringTable += `<tr>
		<td> ${i + 1}</td>
		<td><a href=${dataTable[i]['problem']['url']} target='_blank'>${dataTable[i]['problem']['name']}</a></td>
		<td> ${dataTable[i]['problem']['points']} </td>
		<td class=${classAnswer[dataTable[i]['verdict']]}>${classAnswer[dataTable[i]['verdict']]}</td>
		</tr>`;
	}
	stringTable += "</tbody></table>"
	console.log(stringTable);
	document.getElementById('progress').innerHTML = `<h3>Quantidade de questões: ${qnt}</h3><h3>Quantidade de questões resolvidas: ${qntAC}</h3><h3>Totalizando ${(100 * qntAC)/qnt}% do total de questões`;
	document.getElementById('mytable').innerHTML = stringTable;
}

function generateTable(data, problems) {
	let dataTable = [];
	let qntAC = 0;
	for(let i = 0; i < problems.length; i += 1) {
		dataTable.push({'verdict': 'void', 'problem' : {'name': problems[i]['name'], 'url': problems[i]['url'], 'points': ''}});
	}
	qntAC = dataFilter(data['result'], dataTable);
	console.log(dataTable);
	createTable(dataTable, problems.length, qntAC);
}

function checkAnswer(handle, problems, callbackFunction) {
	console.log(handle);
	var baseUrl = 'https://codeforces.com/api/';
	var methodName = 'user.status';
	var finalUrl = baseUrl + methodName +'?handle=' + handle;
	const https = new XMLHttpRequest();
	https.open("GET", finalUrl);
	https.onload = () => callbackFunction(JSON.parse(https.responseText), problems); 
	https.send();
}

function getDataTable(index) {
	var questions = [ {
		'id': 'div2A', 
		'problems': [
		{'name': 'Cards', 'url': 'https://codeforces.com/problemset/problem/1220/A'},
		{"name": "Between the Offices", "url": "https://codeforces.com/problemset/problem/867/A"},
		{"name": "Mahmoud and Ehab and the even-odd game", "url": "https://codeforces.com/problemset/problem/959/A"},
		{"name": "Fafa and his Company", "url": "https://codeforces.com/problemset/problem/935/A"},
		{"name": "Vus the Cossack and a Contest", "url": "https://codeforces.com/problemset/problem/1186/A"},
		{"name": "Scarborough Fair", "url": "https://codeforces.com/problemset/problem/897/A"},
		{"name": "Tokitsukaze and Enhancement", "url": "https://codeforces.com/problemset/problem/1191/A"},
		{"name": "Pens and Pencils", "url": "https://codeforces.com/problemset/problem/1244/A"},
		{"name": "Infinity Gauntlet", "url": "https://codeforces.com/problemset/problem/987/A"},
		{"name": "Petya and Origami", "url": "https://codeforces.com/problemset/problem/1080/A"},
		{"name": "The Rank", "url": "https://codeforces.com/problemset/problem/1017/A"},
		{"name": "Nastya Is Reading a Book", "url": "https://codeforces.com/problemset/problem/1136/A"},
		{"name": "Fingerprints", "url": "https://codeforces.com/problemset/problem/994/A"},
		{"name": "Game", "url": "https://codeforces.com/problemset/problem/984/A"},
		{"name": "Choose Two Numbers", "url": "https://codeforces.com/problemset/problem/1206/A"},
		{"name": "Ehab and another construction problem", "url": "https://codeforces.com/problemset/problem/1088/A"},
		{"name": "Olympiad", "url": "https://codeforces.com/problemset/problem/937/A"},
		{"name": "Alex and a Rhombus", "url": "https://codeforces.com/problemset/problem/1180/A"},
		{"name": "Maximum Square", "url": "https://codeforces.com/problemset/problem/1243/A"},
		{"name": "Rounding", "url": "https://codeforces.com/problemset/problem/898/A"},
		{"name": "Angry Students", "url": "https://codeforces.com/problemset/problem/1287/A"},
		{"name": "A pile of stones", "url": "https://codeforces.com/problemset/problem/1159/A"},
		{"name": "Neko Finds Grapes", "url": "https://codeforces.com/problemset/problem/1152/A"},
		{"name": "Eleven", "url": "https://codeforces.com/problemset/problem/918/A"},
		{"name": "Find Square", "url": "https://codeforces.com/problemset/problem/1028/A"},
		{"name": "QAQ", "url": "https://codeforces.com/problemset/problem/894/A"},
		{"name": "Little C Loves 3 I", "url": "https://codeforces.com/problemset/problem/1047/A"},
		{"name": "Sasha and Sticks", "url": "https://codeforces.com/problemset/problem/832/A"},
		{"name": "Equation", "url": "https://codeforces.com/problemset/problem/1269/A"},
		{"name": "Keanu Reeves", "url": "https://codeforces.com/problemset/problem/1189/A"},
		{"name": "Equality", "url": "https://codeforces.com/problemset/problem/1038/A"},
		{"name": "Changing Volume", "url": "https://codeforces.com/problemset/problem/1255/A"},
		{"name": "Friends Meeting", "url": "https://codeforces.com/problemset/problem/931/A"},
		{"name": "Love Triangle", "url": "https://codeforces.com/problemset/problem/939/A"},
		{"name": "Arpa and a research in Mexican wave", "url": "https://codeforces.com/problemset/problem/851/A"},
		{"name": "Stones", "url": "https://codeforces.com/problemset/problem/1236/A"},
		{"name": "Compote", "url": "https://codeforces.com/problemset/problem/746/A"},
		{"name": "Coins", "url": "https://codeforces.com/problemset/problem/1061/A"},
		{"name": "Left-handers, Right-handers and Ambidexters", "url": "https://codeforces.com/problemset/problem/950/A"},
		{"name": "Be Positive", "url": "https://codeforces.com/problemset/problem/1130/A"},
		{"name": "Sasha and His Trip", "url": "https://codeforces.com/problemset/problem/1113/A"},
		{"name": "Ropewalkers", "url": "https://codeforces.com/problemset/problem/1185/A"},
		{"name": "Sonya and Hotels", "url": "https://codeforces.com/problemset/problem/1004/A"},
		{"name": "Sushi for Two", "url": "https://codeforces.com/problemset/problem/1138/A"},
		{"name": "Paint the Numbers", "url": "https://codeforces.com/problemset/problem/1209/A"},
		{"name": "XORinacci", "url": "https://codeforces.com/problemset/problem/1208/A"},
		{"name": "Snowball", "url": "https://codeforces.com/problemset/problem/1099/A"},
		{"name": "Integer Points", "url": "https://codeforces.com/problemset/problem/1248/A"},
		{"name": "Neverending competitions", "url": "https://codeforces.com/problemset/problem/765/A"},
		{"name": "A Serial Killer", "url": "https://codeforces.com/problemset/problem/776/A"},
		{"name": "Important Exam", "url": "https://codeforces.com/problemset/problem/1201/A"},
		{"name": "The King's Race", "url": "https://codeforces.com/problemset/problem/1075/A"},
		{"name": "Greed", "url": "https://codeforces.com/problemset/problem/892/A"},
		{"name": "Buying A House", "url": "https://codeforces.com/problemset/problem/796/A"},
		{"name": "Oath of the Night's Watch", "url": "https://codeforces.com/problemset/problem/768/A"},
		{"name": "A Blend of Springtime", "url": "https://codeforces.com/problemset/problem/989/A"},
		{"name": "Roman and Browser", "url": "https://codeforces.com/problemset/problem/1100/A"},
		{"name": "Protect Sheep", "url": "https://codeforces.com/problemset/problem/948/A"},
		{"name": "Ehab Fails to Be Thanos", "url": "https://codeforces.com/problemset/problem/1174/A"},
		{"name": "Fake NP", "url": "https://codeforces.com/problemset/problem/805/A"},
		{"name": "Stages", "url": "https://codeforces.com/problemset/problem/1011/A"},
		{"name": "Circle Metro", "url": "https://codeforces.com/problemset/problem/1169/A"},
		{"name": "Eating Soup", "url": "https://codeforces.com/problemset/problem/1163/A"},
		{"name": "Palindrome Dance", "url": "https://codeforces.com/problemset/problem/1040/A"},
		{"name": "Trip For Meal", "url": "https://codeforces.com/problemset/problem/876/A"},
		{"name": "The Useless Toy", "url": "https://codeforces.com/problemset/problem/834/A"},
		{"name": "Aramic script", "url": "https://codeforces.com/problemset/problem/975/A"},
		{"name": "Diversity", "url": "https://codeforces.com/problemset/problem/844/A"},
		{"name": "Beautiful String", "url": "https://codeforces.com/problemset/problem/1265/A"},
		{"name": "Single Push", "url": "https://codeforces.com/problemset/problem/1253/A"},
		{"name": "Anastasia and pebbles", "url": "https://codeforces.com/problemset/problem/789/A"},
		{"name": "Drinks Choosing", "url": "https://codeforces.com/problemset/problem/1195/A"},
		{"name": "Div. 64", "url": "https://codeforces.com/problemset/problem/887/A"},
		{"name": "Salem and Sticks ", "url": "https://codeforces.com/problemset/problem/1105/A"},
		{"name": "Karen and Morning", "url": "https://codeforces.com/problemset/problem/816/A"},
		{"name": "Unimodal Array", "url": "https://codeforces.com/problemset/problem/831/A"},
		{"name": "Odds and Ends", "url": "https://codeforces.com/problemset/problem/849/A"},
		{"name": "New Building for SIS", "url": "https://codeforces.com/problemset/problem/1020/A"},
		{"name": "Technogoblet of Fire", "url": "https://codeforces.com/problemset/problem/1121/A"},
		{"name": "Gotta Catch Em' All!", "url": "https://codeforces.com/problemset/problem/757/A"},
		{"name": "Shell Game", "url": "https://codeforces.com/problemset/problem/777/A"},
		{"name": "Feed the cat", "url": "https://codeforces.com/problemset/problem/955/A"},
		{"name": "Snacktower", "url": "https://codeforces.com/problemset/problem/767/A"},
		{"name": "Sweet Problem", "url": "https://codeforces.com/problemset/problem/1263/A"},
		{"name": "Row", "url": "https://codeforces.com/problemset/problem/982/A"},
		{"name": "Alex and broken contest", "url": "https://codeforces.com/problemset/problem/877/A"},
		{"name": "Jamie and Alarm Snooze", "url": "https://codeforces.com/problemset/problem/916/A"},
		{"name": "Vladik and flights", "url": "https://codeforces.com/problemset/problem/743/A"},
		{"name": "The Artful Expedient", "url": "https://codeforces.com/problemset/problem/869/A"},
		{"name": "Check the string", "url": "https://codeforces.com/problemset/problem/960/A"},
		{"name": "Optimal Currency Exchange", "url": "https://codeforces.com/problemset/problem/1214/A"},
		{"name": "Packets", "url": "https://codeforces.com/problemset/problem/1037/A"},
		{"name": "Single Wildcard Pattern Matching", "url": "https://codeforces.com/problemset/problem/1023/A"},
		{"name": "Tritonic Iridescence", "url": "https://codeforces.com/problemset/problem/957/A"},
		{"name": "Lesha and array splitting", "url": "https://codeforces.com/problemset/problem/754/A"},
		{"name": "The Monster", "url": "https://codeforces.com/problemset/problem/787/A"},
		{"name": "Kirill And The Game", "url": "https://codeforces.com/problemset/problem/842/A"},
		{"name": "Birthday", "url": "https://codeforces.com/problemset/problem/1068/A"},
		{"name": "Cloning Toys", "url": "https://codeforces.com/problemset/problem/922/A"},
		{"name": "A Prank", "url": "https://codeforces.com/problemset/problem/1062/A"},
		]
	}];
	checkAnswer(getHandle(), questions[index]['problems'], generateTable);
}
