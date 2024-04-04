let data
let project

let projectTemplate = {
	startingLayout: 1,
	objects: 3,
	$objects: [{
		objectTypeString: 0,
		pluginType: 1,
		sprite: 6,
		$sprite: [{
			image: 0,
		}],
		animations: 7,
		$animations: [{
			name: 0,
			speed: 1,
			loop: 2,
			pingPong: 5,
			globalID: 6,
			frames: 7,
			$frames: [{
				image: 0,
				sourceX: 2,
				sourceY: 3,
				width: 4,
				height: 5,
				frameLength: 6,
				collisionPoints: 10,
			}],
		}],
		behaviors: 8,
		$behaviors: [{
			name: 0,
			behaviorType: 1,
			globalID: 2,
		}],
		globalID: 11,
		effects: 12,
		$effects: [{
			effectType: 0,
			name: 1,
		}]
	}],
	layouts: 5,
	$layouts: [{
		name: 0,
		width: 1,
		height: 2,
		unboundedScrolling: 3,
		eventSheet: 4,
		globalID: 5,
		layers: 6,
		$layers: [{
			name: 0,
			index: 1,
			globalID: 2,
			backgroundColor: 4,
			transparentBackground: 5,
			paralaxX: 6,
			paralaxY: 7,
			objects: 14,
			$objects: [{
				generalProperties: 0,
				$generalProperties: {
					x: 0,
					y: 1,
					width: 3,
					height: 4,
					effects: 12,
				},
				objectType: 1,
				UID: 2,
				instanceVariables: 3,
				$instanceVariables: [{
					value: 0,
				}],
				properties: 5,
			}],
		}],
	}],
	eventSheets: 6,
    $eventSheets: [{
        name: 0,
        events: 1,
        $events: [{
			type: 0,
			includedEventSheet: 1,
			variableName: 1,
			or: 2,
			isString: 2,
			defaultValue: 3,
			globalID: 4,
			conditions: 5,
			actions: 6,
			globalID: 6,
			$actions: [{
				objectType: 0,
				action: 1,
				globalID: 3,
				arguments: 5,
				$arguments: [{
					argument: 1,
					$argument: [{
						type: 0,
						value: 1,
					}],
				}],
			}],
			subEvents: 7,
			$subEvents: [eventListConstructor],
		}],
    }],
	media: 7,
	$media: [{
		filename: 0,
	}],
	mediaPath: 8,
	viewportWidth: 10,
	viewportHeight: 11,
	version: 16,
	projectName: 26,
}

function verbosify(source, template, preserveUnused=false) {
	let sourceKeys = {}
	let ret = {}
	for (const [k, v] of Object.entries(template)) {
		if (typeof v === "object" && v != null) {
			if (k[0] != "$") throw TypeError("Only $ properties can use sub-templates")
			const nk = k.replace("$","")
			//console.log("DOING", nk)
			if (Array.isArray(v)) {
				//console.log("LIST")
				const sa = source[template[nk]]
				if (Array.isArray(sa)) {
					ret[nk] = []
					const len = sa.length
					for (let i = 0; i < len; i++) {
						//console.log("i",i)
						let cv = v[0]
						if (typeof cv === "function") cv = cv(sa[i], i)
						let fv = sa[i]
						if (fv != null && typeof fv !== "undefined") fv = verbosify(sa[i], cv, preserveUnused)
						ret[nk].push(fv)
					}
				} else {
					if (typeof sa !== "undefined") ret[nk] = sa
				}
				sourceKeys[template[nk]] = true
			} else {
				//console.log("STRUCT")
				ret[nk] = verbosify(source[template[nk]], v, preserveUnused)
				sourceKeys[template[nk]] = true
			}
		} else {
			if (typeof source[v] !== "undefined") ret[k] = source[v]
			sourceKeys[v] = true
		}
	}
	if (preserveUnused) {
		for (const k of Object.keys(source)) {
			if (!sourceKeys[k]) Object.defineProperty(ret, k, {
				writable: true,
				enumerable: false,
				value: source[k],
			})
		}
	}
	return ret
}

function deverbosify(source, template) {
	let ret = {}
	for (const [k, v] of Object.entries(template)) {
		if (typeof v === "object" && v != null) {
			if (k[0] != "$") throw TypeError("Only $ properties can use sub-templates")
			const nk = k.replace("$","")
			//console.log("DOING", nk)
			if (Array.isArray(v)) {
				//console.log("LIST")
				const sa = source[template[nk]]
				if (Array.isArray(sa)) {
					ret[nk] = []
					const len = sa.length
					for (let i = 0; i < len; i++) {
						//console.log("i",i)
						let cv = v[0]
						if (typeof cv === "function") cv = cv(sa[i], i)
						let fv = sa[i]
						if (fv != null && typeof fv !== "undefined") fv = verbosify(sa[i], cv, ignorenumbers)
						ret[nk].push(fv)
					}
				} else {
					if (typeof sa !== "undefined") ret[nk] = sa
				}
			} else {
				//console.log("STRUCT")
				ret[nk] = verbosify(source[template[nk]], v, ignorenumbers)
			}
		} else {
			if (typeof source[v] !== "undefined") ret[k] = source[v]
		}
		if (ignorenumbers && k == parseInt(k)) {
			Object.defineProperty(ret, k, {
				writable: true,
				enumerable: false,
				value: ret[k]
			})
		}
	}
	return ret
}

async function openDataFromURL(url, preserveUnused=false) {
	return new Promise(resolve => {
		fetch(url).then(res => res.json()).then(data => {
            resolve(verbosify(data.project, projectTemplate, preserveUnused))
        })
	})
}

function forceEntries(obj) {
	const keys = Object.getOwnPropertyNames(obj)
	const ret = []
	for (let i = 0; i < keys.length; i++) {
		ret.push([keys[i], obj[keys[i]]])
	}
	return ret
}

function searchV(obj, value, arrayform=false, path="") {
    let results = []
    for (const [k, v] of forceEntries(obj)) {
        const np = (path+"/"+k)
        if (typeof v === "object" && v != null) results.push(...searchV(v, value, arrayform, np))
        if (v === value) {
            if (arrayform) {
                const a = np.split("/")
                a.shift()
                results.push({[a]:v})
            } else results.push({[np]:v})
        }
    }
    return results
}
function searchK(obj, value, arrayform=false, path="") {
    let results = []
    for (const [k, v] of forceEntries(obj)) {
        const np = (path+"/"+k)
        if (typeof v === "object" && v != null) results.push(...searchK(v, value, arrayform, np))
        if (k === value) {
            if (arrayform) {
                const a = np.split("/")
                a.shift()
                results.push({[a]:v})
            } else results.push({[np]:v})
        }
    }
    return results
}

function load() {
	var xhttp = new XMLHttpRequest()
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			data = JSON.parse(this.responseText)
			project = verbosify(data.project, projectTemplate, true)
		}
	}
	xhttp.open("GET", "./play/data.js", true)
	xhttp.send()

	Result = document.getElementById("result")
	
	gameTitle = document.getElementById("gameTitle")
	gameTitle.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		project.layouts[1].layers[1].objects[0].instanceVariables[0][0] = gameTitle.value.toUpperCase()
		project.layouts[1].layers[1].objects[1].instanceVariables[0][0] = gameTitle.value
	})
	
	gameTitleAbove = document.getElementById("gameTitleAbove")
	gameTitleAbove.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		project.layouts[1].layers[1].objects[2].properties[3] = gameTitleAbove.value
	})
	
	gameTitleBelow = document.getElementById("gameTitleBelow")
	gameTitleBelow.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		project.layouts[1].layers[1].objects[4].properties[3] = gameTitleBelow.value
	})
	
	gameTitleBelow = document.getElementById("gameTitleBelowShadow")
	gameTitleBelow.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		project.layouts[1].layers[1].objects[3].properties[3] = gameTitleBelow.value
	})
	
	startingLayout = document.getElementById("Starting Layout")
	startingLayout.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		project.startingLayout = startingLayout.value
	})
	
	width = document.getElementById("width")
	width.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		project.viewportWidth = width.value
	})
	
	height = document.getElementById("height")
	height.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		project.viewportHeight = height.value
	})
	
	shop1 = document.getElementById("shop1")
	shop1.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		data.project.layouts[4].layers[0].objects[5].instanceVariables[0][0] = shop1.value.replace(/\n/g, ";");
	})
	
	shop1talk = document.getElementById("shop1talk")
	shop1talk.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		data.project.layouts[4].layers[0].objects[4].instanceVariables[0][0] = shop1talk.value
		Result.innerHTML = JSON.stringify(data)
	})
	
	shop2 = document.getElementById("shop2")
	shop2.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		data.project.layouts[5].layers[0].objects[5].instanceVariables[0][0] = shop2.value.replace(/\n/g, ";");
	})
	
	shop2talk = document.getElementById("shop2talk")
	shop2talk.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		data.project.layouts[5].layers[0].objects[4].instanceVariables[0][0] = shop2talk.value
	})
	
	shop3 = document.getElementById("shop3")
	shop3.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		data.project.layouts[6].layers[0].objects[5].instanceVariables[0] = shop3.value.replace(/\n/g, ";");
	})
	
	shop3talk = document.getElementById("shop3talk")
	shop3talk.addEventListener('change', function(){
		document.getElementById("result").innerText = "please recompile"
		data.project.layouts[6].layers[0].objects[4].instanceVariables[0] = shop3talk.value
	})
}
function playMod() {
	document.getElementById("result").innerText = JSON.stringify(data)
}
window.onload = load
