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
	
	gameTitleBelow = document.getElementById("gameTitleBelowShadow")
	gameTitleBelow.addEventListener('change', function(){
		data.project[5][1][6][1][14][3][5][3] = gameTitleBelow.value
		Result.innerHTML = JSON.stringify(data)
	})
	
	startingLayout = document.getElementById("Starting Layout")
	startingLayout.addEventListener('change', function(){
		data.project[1] = startingLayout.value
		Result.innerHTML = JSON.stringify(data)
	})
	
	width = document.getElementById("width")
	width.addEventListener('change', function(){
		data.project[10] = width.value
		Result.innerHTML = JSON.stringify(data)
	})
	
	height = document.getElementById("height")
	height.addEventListener('change', function(){
		data.project[11] = height.value
		Result.innerHTML = JSON.stringify(data)
	})
	
	shop1 = document.getElementById("shop1")
	shop1.addEventListener('change', function(){
		data.project[5][4][6][0][14][5][3][0][0] = shop1.value.replace(/\n/g, ";");
		Result.innerHTML = JSON.stringify(data)
	})
	
	shop1talk = document.getElementById("shop1talk")
	shop1talk.addEventListener('change', function(){
		data.project[5][4][6][0][14][4][3][0][0] = shop1talk.value
		Result.innerHTML = JSON.stringify(data)
	})
	
	shop2 = document.getElementById("shop2")
	shop2.addEventListener('change', function(){
		data.project[5][5][6][0][14][5][3][0][0] = shop2.value.replace(/\n/g, ";");
		Result.innerHTML = JSON.stringify(data)
	})
	
	shop2talk = document.getElementById("shop2talk")
	shop2talk.addEventListener('change', function(){
		data.project[5][5][6][0][14][4][3][0][0] = shop2talk.value
		Result.innerHTML = JSON.stringify(data)
	})
	
	shop3 = document.getElementById("shop3")
	shop3.addEventListener('change', function(){
		data.project[5][6][6][0][14][5][3][0][0] = shop3.value.replace(/\n/g, ";");
		Result.innerHTML = JSON.stringify(data)
	})
	
	shop3talk = document.getElementById("shop3talk")
	shop3talk.addEventListener('change', function(){
		data.project[5][6][6][0][14][4][3][0][0] = shop3talk.value
		Result.innerHTML = JSON.stringify(data)
	})
}
function playMod() {
	alert("Coming Soon!")
}
window.onload = load