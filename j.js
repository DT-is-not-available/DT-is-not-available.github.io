location.href = "https://insert.games/its-time-to-start-over"

go = _=>setTimeout(()=>{
	makeText("It's time to start over.")
	go()
	go()
}, Math.random()*1270+1270)
if (!localStorage.viewed)
go()
else if (!localStorage.notfound) clickcycle(
	_=>makeText("..."),
	_=>makeText("Your performance will be monitored."),
	_=>makeText("Please enter a name on the next screen",()=>{
		document.body.innerText = ""
		document.body.className = "static"
		localStorage.notfound = true
		setTimeout(()=>{
			fetch("NOTFOUND")
			.then(r=>r.text())
			.then(e=>document.write(e))
		}, 700)
	}),
)
else
	fetch("NOTFOUND")
	.then(r=>r.text())
	.then(e=>document.write(e))

function clickcycle(...funcs) {
	let i = 0
	document.body.addEventListener("click",()=>{
		if (i < funcs.length) {
			funcs[i]()
			i++
		}
	})
	document.body.click()
}

if (!localStorage.viewed)
setTimeout(()=>{
	localStorage.viewed = true
	window.location.reload()
}, 15000)

function makeText(text, cb=_=>_) {
	let element = document.createElement("log")
	document.body.append(element)
	let i = setInterval(()=>{
		if (element.innerText.length < text.length) {
			element.innerText += text[element.innerText.length]
			document.body.scrollTop = document.body.scrollHeight
		} else {
			clearInterval(i)
			element.className = ""
			cb(element)
		}
	},25)
}