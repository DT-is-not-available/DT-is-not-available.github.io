let data
let project

let projectTemplate = {
    0:0,
    startingLayout: 1,
    2:2,
    objects: 3,
    4:4,
    layouts: 5,
    $layouts: [{
        name: 0,
        width: 1,
        height: 2,
        unboundedScrolling: 3,
        eventSheet: 4,
        UID: 5,
        layers: 6,
        $layers: [{
            name: 0,
            index: 1,
            UID: 2,
            3:3,
            backgroundColor: 4,
            5:5,
            paralaxX: 6,
            paralaxY: 7,
            8:8, 9:9, 10:10, 11:11, 12:12, 13:13,
            objects: 14,
            effects: 15,
        }],
        7:7,
        effects: 8,
    }],
    eventSheets: 6,
    media: 7,
    mediaPath: 8,
    9:9,
    viewportWidth: 10,
    viewportHeight: 11,
    12:12, 13:13, 14:14, 15:15,
    version: 16,
    17:17, 18:18, 19:19, 20:20, 21:21, 22:22, 23:23, 24:24, 25:25,
    projectName: 26,
    27:27, 28:28
}

function verbosify(source, template) {
    let ret = {}
    for (const [k, v] of Object.entries(template)) {
        if (typeof v === "object" && typeof v != null) {
            if (k[0] != "$") throw TypeError("Only $ properties can use sub-templates")
            const nk = k.replace("$","")
            if (Array.isArray(v)) {
                ret[nk] = []
                const sa = source[template[nk]]
                for (let i = 0; i < sa.length; i++) {
                    ret[nk].push(verbosify(sa[i], v[0]))
                }
            } else {
                ret[nk] = verbosify(source[template[nk]], v)
            }
        } else {
            ret[k] = source[v]
        }
    }
    return ret
}

async function openDataFromURL(url) { return new Promise(resolve => {
	var xhttp = new XMLHttpRequest()
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let data = JSON.parse(this.responseText)
			resolve(verbosify(data.project, projectTemplate))
		}
	}
	xhttp.open("GET", "./default-data.json", true)
	xhttp.send()
}}

function load() {
	var xhttp = new XMLHttpRequest()
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			data = JSON.parse(this.responseText)
			project = verbosify(data.project, projectTemplate)
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
