function swap(json) {
	var ret = {};
	for (var key in json) {
		ret[json[key]] = key;
	}
	return ret;
}
function sortObject(obj) {
	return Object.keys(obj)
	.sort().reduce((a, v) => {
		a[v] = obj[v];
		return a;
	}, {});
}
function reverseObject(object) {
    var newObject = {};
    var keys = [];
    for (var key in object) {
        keys.push(key);
    }
    for (var i = keys.length - 1; i >= 0; i--) {
        var value = object[keys[i]];
        newObject[keys[i]]= value;
    }
    return newObject;
}
let xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.speedrun.com/api/v1/games/kdkm3re1", false);
xhr.send();
moderators = []
runsVerified = []
database = JSON.parse(xhr.responseText);
for (key in database["data"]["moderators"]) {
	moderators.push(key)
}
let xhr2 = new XMLHttpRequest();
for (var i = moderators.length - 1; i >= 0; i--) {
	xhr2.open("GET", "https://www.speedrun.com/api/v1/runs?game=kdkm3re1&max=200&examiner=" + moderators[i], false);
	xhr2.send();
	runs = JSON.parse(xhr2.responseText)
	runsVerifiedNumberIT2 = runs.pagination.size
	do {
		if (runs.pagination.size == 200) {
			xhr2.open("GET", "https://www.speedrun.com/api/v1/runs?game=kdkm3re1&max=200&examiner=" + moderators[i] + "&offset=" + runsVerifiedNumberIT2, false);
			xhr2.send();
			runs = JSON.parse(xhr2.responseText)
			runsVerifiedNumberIT2 += runs.pagination.size
		}

	} while (runs.pagination.size == 200)

	runsVerified.push(runsVerifiedNumberIT2)

}

runsVerified = runsVerified.reverse()
var result = {};
moderators.forEach((key, i) => result[key] = runsVerified[i]);

result = swap(result)
result = sortObject(result)
result = swap(result)
result = reverseObject(result)

let xhr3 = new XMLHttpRequest();
var output = ""
var txtout = ""
var place = 0
for (key in result) {
	place++
	xhr3.open("GET", "https://www.speedrun.com/api/v1/users/" + key, false);
	xhr3.send();
	ModName = JSON.parse(xhr3.responseText)
	name2 = ModName["data"]["names"]["international"]
	output += "<tr><td>"+place+"</td><td>" + name2 + "</td><td>" + result[key] + "</td><tr>"
	txtout += place+","+"\""+name2+"\""+","+result[key]+"\n"
}

document.getElementById("table").innerHTML = output