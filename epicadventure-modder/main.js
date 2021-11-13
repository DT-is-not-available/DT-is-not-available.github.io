function load() {
	var xhttp = new XMLHttpRequest()
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			data = JSON.parse(this.responseText)
		}
	}
	xhttp.open("GET", "./default-data.json", true)
	xhttp.send()

	Result = document.getElementById("result")
	
	gameTitle = document.getElementById("gameTitle")
	gameTitle.addEventListener('change', function(){
		data.project[5][1][6][1][14][0][3][0][0] = gameTitle.value.toUpperCase()
		data.project[5][1][6][1][14][1][3][0][0] = gameTitle.value
		Result.innerHTML = JSON.stringify(data)
	})
	
	gameTitleAbove = document.getElementById("gameTitleAbove")
	gameTitleAbove.addEventListener('change', function(){
		data.project[5][1][6][1][14][2][5][3] = gameTitleAbove.value
		Result.innerHTML = JSON.stringify(data)
	})
	
	gameTitleBelow = document.getElementById("gameTitleBelow")
	gameTitleBelow.addEventListener('change', function(){
		data.project[5][1][6][1][14][4][5][3] = gameTitleBelow.value
		Result.innerHTML = JSON.stringify(data)
	})
}
function playMod() {
	alert("Coming Soon!")
}
window.onload = load