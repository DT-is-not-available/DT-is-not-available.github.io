(()=>{
    const path = location.href.replace(document.location.protocol+"//"+document.location.host, "").replace(/^\//, "").split(/#|\?/gm)[0]
    console.log(path)

    function el(tagName, attrs = {}, ...children) {
        attrs ??= {}
        if (tagName == 'fragment') return children
        let elem = document.createElement(tagName)
        for (const [k, v] of Object.entries(attrs)) {
            if (typeof(v) === "object") {
                for (const [k2, v2] of Object.entries(v)) {
                    elem[k][k2] = v2
                }
            } else elem[k] = v
        }
        
        for (const child of children) {
            if (Array.isArray(child)) elem.append(...child)
            else elem.append(child)
        }
        return elem
    }

    let menu = document.querySelector("#menu")
    let launchpadButton = `
    <a id="global_nav_${(path == "launchpad" ? "dashboard" : "launchpad")}_link" href="/launchpad" class="ic-app-header__menu-list-link">
        <div class="menu-item-icon-container" aria-hidden="true">
            <i class="icon-quiz" style="scale: 1.2"></i>
        </div>
        <div class="menu-item__text">Launchpad</div>
    </a>
    `
    menu.insertBefore(el("li", {
        className: (path == "launchpad" ? "ic-app-header__menu-list-item ic-app-header__menu-list-item--active" : "ic-app-header__menu-list-item"),
        innerHTML: launchpadButton,
        ariaCurrent: (path == "launchpad" ? "page" : undefined)
    }), menu.children[1])

    if (path == "launchpad") {
        document.title = "Launchpad"
        let content = document.querySelector("#main")
        content.innerHTML = ""
        let course_panel
        let upcomming_panel
        let stats_panel
        let grades_panel
        let missing_panel

        let courses = {}
        getCourses().then(function(e){
            let assignmentPromises = []
            for (let i = 0; i < e.length; i++) {
                let course = e[i]
                courses[course.id] = course
                let score = course.enrollments[0].computed_current_score
                if (course.is_favorite) {
                    // add course
                    const bp = course.blueprint_restrictions_by_object_type
                    console.log(bp)
                    course_panel.append(el("div", {
                        className:["course"].join(" "),
                        style: `
                            color: ${course.color};
                        `
                    }, [
                        el("div", {className: "flex", style: {gap: "15px"}}, [
                            el("a", {target:"_blank", style: `color: currentColor !important`, className: "fill title", href: "/courses/"+course.id}, course.nickname),
                            (score ? el("span", {className: "chip"}, el("span", null, score+"%")) : "")
                        ]),
                        el("flex", {className: "controls", style: {gap: "15px", paddingTop: "15px"}}, [
                            el("a", {title: "Announcements", target:"_blank", href: "/courses/"+course.id+"/announcements"}, el("i", {className: "icon-announcement"})),
                            el("a", {title: "Assignments", target:"_blank", href: "/courses/"+course.id+"/assignments"}, el("i", {className: "icon-assignment"})),
                            el("a", {title: "Modules", target:"_blank", href: "/courses/"+course.id+"/modules"}, el("i", {className: "icon-module"})),
                            el("a", {title: "Discussions", target:"_blank", href: "/courses/"+course.id+"/discussions"}, el("i", {className: "icon-discussion"})),
                            el("a", {title: "Quizzes", target:"_blank", href: "/courses/"+course.id+"/quizzes"}, el("i", {className: "icon-quiz"})),
                            el("a", {title: "Grades", target:"_blank", href: "/courses/"+course.id+"/grades"}, el("i", {className: "icon-gradebook"})),
                            el("a", {title: "People", target:"_blank", href: "/courses/"+course.id+"/people"}, el("i", {className: "icon-group"})),
                            el("a", {title: "Pages", target:"_blank", href: "/courses/"+course.id+"/pages"}, el("i", {className: "icon-document"})),
                            el("a", {title: "Files", target:"_blank", href: "/courses/"+course.id+"/files"}, el("i", {className: "icon-folder"})),
                            el("a", {title: "Syllabus", target:"_blank", href: "/courses/"+course.id+"/syllabus"}, el("i", {className: "icon-syllabus"})),
                        ])
                    ]))
                }
            }

            function assignmentCard(course, assignment, url, due, possibleScore=null, extraClass="", score=null, icon="assignment", checked=true) {
                let dueDate = new Date(due)
                let dueDate_string = dueDate.toDateString().replace((new Date().getYear()+1900).toString(), dueDate.toLocaleTimeString())
                return el("div", {className: "assignment" + " " + extraClass, style:`color: ${course.color}`}, [
                    el("i", {className: "icon-"+icon}),
                    el("div", {className: "fill column"}, [
                        el("flex", {className: "effect", style: "justify-content: space-between; gap: 5px; align-items: start"}, [
                            el("a", {target: "_blank", className: "tiny bright fill", style: `color: ${course.color} !important`, href: "/courses/"+course.id}, course.nickname),
                            (score !== null ? el("span", {className: "chip tiny ignoreDone"}, [
                                el("span", null, `${score}/${possibleScore}`)
                            ]) : ""),
                            el("input", {className: "show ignoreDone", type: "checkbox", checked: checked})
                        ]),
                        el("flex", {className: "effect", style: "align-items: end; justify-content: space-between"}, [
                            el("a", {target: "_blank", className: "title fill", href: url}, assignment),
                            el("span", {className: "tiny duedate", style: "color: #777 !important"}, dueDate_string),
                        ]),
                        el("flex", {className: "effect", style: "justify-content: space-between; color: #777 !important"}, [
                            (possibleScore !== null ? el("span", {className: "tiny extra"}, possibleScore+" points") : ""),
                            el("span", {className: "tiny extra"}, dueDate_string),
                        ])
                    ])
                ])
            }
            getMissingAssignments().then(function(e){
                missing_panel.innerHTML = ""
                e.sort((a, b)=>a.dueDate-b.dueDate)
                for (let i = 0; i < e.length; i++) {
                    let assignment = e[i]
                    let course = courses[assignment.course_id]
                    if (course.is_favorite) missing_panel.append(assignmentCard(
                        course,
                        assignment.name,
                        `/courses/${assignment.course_id}/assignments/${assignment.id}`,
                        assignment.due_at,
                        assignment.points_possible,
                        "missing",
                        null,
                        "assignment",
                        true,
                    ))
                }
            })
            getUpcomming().then(function(e){
                upcomming_panel.innerHTML = ""
                for (let i = 0; i < e.length; i++) {
                    console.log(e[i])
                    let item = e[i]
                    let course = courses[item.course_id]

                    let submitted = false
                    let className = ""
                    let icon = item.plannable_type

                    let include = false

                    let title = "Unknown"
                    let html_url = item.html_url
                    let date = 0
                    let totalPoints = null
                    let points = null

                    if (item.plannable_type == "assignment" || item.plannable_type == "discussion_topic" || item.plannable_type == "quiz") {
                        if (item.submissions) {
                            if (item.submissions.excused) className = "done excused"
                            else if (item.submissions.missing) className = "missing"
                            else if (item.submissions.late) className = "done late"
                            else if (item.submissions.submitted) className = "done on-time"
                            if (item.submissions.graded) {
                                points = item.submission.score
                            }
                        }
                        date = item.plannable.due_at
                        title = item.plannable.title
                        totalPoints = item.plannable.points_possible
                        include = true
                    }
                    if (item.plannable_type == "discussion_topic") icon = "discussion"

                    if (include) upcomming_panel.append(assignmentCard(
                        course,
                        title,
                        html_url,
                        date,
                        totalPoints,
                        className,
                        points,
                        icon,
                        false
                    ))
                }
            })
        })
        content.append(
            el("flex", {style: "flex: 1; height: 0; gap: 10px;"}, [
                el("div", {id: "left", className:"fill column"}, [
                    el("h2", null, "Courses"),
                    course_panel = el("div", {id: "courses", className:"fill panel column"}),
                ]),
                el("div", {id: "mid", className:"fill column"}, [
                    el("h2", null, "Stats"),
                    stats_panel = el("div", {id: "stats"}),
                    el("h2", null, "Assignments"),
                    upcomming_panel = el("div", {id: "upcomming", className:"fill panel column"}, el("big", null, "Loading assignments...")),
                ]),
                el("div", {id: "right", className:"fill column"}, [
                    el("h2", null, "Grades"),
                    grades_panel = el("div", {id: "grades", className: "fill panel"}),
                    el("h2", null, "Missing"),
                    el("span", null, [
                        el("code", null, "Show hidden: ", el("input", {type: "checkbox", id: "showHidden"})),
                    ]),
                    missing_panel = el("div", {id: "missing", className: "panel column", style: "flex: 2"}, el("big", null, "Loading missing assignments...")),
                ]),
            ]),
            el("style", null, `
                .tiny, .done.assignment .title,
                #upcomming .assignment:has(.show:checked) .title {
                    font-size: 75%;
                }
                #missing .assignment:not(:has(.show:checked)) {
                    display: none;
                }
                #missing .assignment:not(:has(.show:checked)) {
                    display: none;
                }
                span:has(#showHidden:checked) + #missing .assignment {
                    display: flex;
                }
                .missing.assignment {
                    border-right: 10px solid red;
                }
                .late.assignment {
                    border-right: 10px dotted skyblue;
                }
                .on-time.assignment {
                    border-right: 10px solid #0a0;
                }
                .late.done.assignment .effect > *:not(.ignoreDone),
                .on-time.done.assignment .effect > *:not(.ignoreDone),
                #upcomming .assignment:has(.show:checked) .effect > *:not(.ignoreDone) {
                    text-decoration: line-through;
                }
                .done.assignment .show {
                    display: none;
                }
                .excused.assignment {
                    border-right: 10px solid #777;
                }
                .done.assignment .effect > *:not(.ignoreDone),
                #upcomming .assignment:has(.show:checked) .effect > *:not(.ignoreDone) {
                    opacity: 0.5;
                }
                .done.assignment .extra:not(.bright),
                #upcomming .assignment:has(.show:checked) .extra:not(.bright) {
                    display: none;
                }
                .assignment {
                    border-right: 10px solid var(--bcbackgrounddark2, #fff);
                    background: var(--bcbackgrounddark2, #fff);
                    border-left: 7px solid currentColor !important;
                    padding: 10px;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    outline: 1px solid gray;
                }
                .assignment:not(.done) .duedate {
                    display: none;
                }
                .assignment .title {
                    color: var(--bctextlight0) !important
                }
                #courses {
                    padding: 10px 15px;
                    padding-left: 0px;
                    gap: 10px;
                }
                #missing, #upcomming {
                    padding: 10px 15px;
                    padding-left: 0px;
                    gap: 1px;
                }
                #stats {
                    text-align: center;
                }
                .chip {
                    background: currentColor;
                    padding: 0px 5px;
                    border-radius: 25px;
                }
                .chip * {
                    color: #fff;
                }
                #main button {
                    background: #7773;
                    border: 1px solid #777;
                    padding: 5px;
                    border-radius: 5px;
                    outline: none;
                }
                #main button.primary {
                    background: #07f;
                    color: white !important;
                    border: 1px solid #037;
                }
                #main input {
                    background: transparent;
                    border: 1px dashed #777;
                    padding: 5px;
                    border-radius: 5px;
                    outline: none;
                    color: currentColor;
                    margin: 0px;
                }
                #main select {
                    background: transparent;
                    border: 1px solid #777;
                    padding: 5px;
                    border-radius: 5px;
                    outline: none;
                }
                #main {
                    padding: 20px;
                    padding-bottom: 0px;
                    max-height: 100vh;
                    overflow-y: hidden;
                    display: flex;
                    flex-direction: column;
                }
                #main hr {
                    border: none;
                    border-bottom: 1px solid #7777;
                }
                .course {
                    background: var(--bcbackgrounddark2, #fff);
                    border-radius: 0px 15px 15px 0px;
                    border-left: 10px solid currentColor;
                    padding: 10px;
                    filter: drop-shadow(0 2mm 2mm #0003);
                }
                .course .title {
                    font-size: 16px;
                    filter: brightness(1.5);
                }
                .bright {
                    filter: brightness(1.5);
                }
                .flex {
                    display: flex;
                    justify-content: space-between;
                    align-items: start;
                }
                .column {
                    display: flex;
                    justify-content: start;
                    align-items: stretch;
                    flex-direction: column;
                }
                flex {
                    display: flex;
                    align-items: stretch;
                }
                .fill {
                    flex: 1;
                }
                .panel {
                    overflow-y: auto;
                }
                .controls a {
                    color: currentColor !important;
                }
                .course .controls i, .assignment i {
                    filter: brightness(1.5);
                    scale: 1.25;
                }
            `)
        )
    }

    // canvas improvements
    function getCourses() {
        return new Promise(function(resolve){
            let asyncs = 0
            let total = 4
            function tryResolve(cb) {
                asyncs++
                if (asyncs >= total) resolve(cb())
            }
            let courses
            let colors
            let positions
            let nicknames
            let resolver = ()=>{
                courses.forEach(e=>{
                    e.color = colors["course_"+e.id]
                    e.position = positions["course_"+e.id]
                    e.nickname = nicknames[e.id] || e.name
                })
                courses.sort(({position:a}, {position:b})=>a-b)
                return courses
            }
            fetch("/api/v1/courses?enrollment_state=active&per_page=1000&include[]=favorites&include[]=total_scores")
            .then(e=>e.json())
            .then(e=>{
                courses = e
                tryResolve(resolver)
            })
            fetch("/api/v1/users/self/colors?per_page=1000")
            .then(e=>e.json())
            .then(e=>{
                colors = e.custom_colors
                tryResolve(resolver)
            })
            fetch("/api/v1/users/self/course_nicknames?per_page=1000")
            .then(e=>e.json())
            .then(e=>{
                nicknames = {}
                e.forEach(e=>nicknames[e.course_id] = e.nickname)
                tryResolve(resolver)
            })
            fetch("/api/v1/users/self/dashboard_positions?per_page=1000")
            .then(e=>e.json())
            .then(e=>{
                positions = e.dashboard_positions
                tryResolve(resolver)
            })
        })
    }

    function getAssignments(course) {
        return new Promise(function(resolve){
            fetch(`/api/v1/courses/${course.id}/assignments?include[]=submission&per_page=1000`)
            .then(e=>e.json())
            .then(e=>resolve(e.map(a=>{
                a.course = course
                a.dueDate = new Date(a.due_at).getTime()
                return a
            })))
        })
    }
    
    function getMissingAssignments() {
        return new Promise(function(resolve){
            fetch(`/api/v1/users/self/missing_submissions?per_page=1000`)
            .then(e=>e.json())
            .then(e=>resolve(
                e.map(el=>{
                    el.dueDate = new Date(el.due_at).getTime()
                    return el
                })
            ))
        })
    }

    Date.prototype.subHours = function(h) {
        this.setTime(this.getTime() - (h*60*60*1000));
        return this;
    }

    function getUpcomming() {
        let today = new Date()
        today.subHours(((today.getMilliseconds()/1000+today.getSeconds())/60+today.getMinutes())/60+today.getHours())
        let todayStr = `${(today.getYear()+1900)}-${(today.getMonth()+1).toString().padStart(2, 0)}-${today.getDate().toString().padStart(2, 0)}`
        let nextWeek = new Date().addWeeks(2)
        let nextWeekStr = `${(nextWeek.getYear()+1900)}-${(nextWeek.getMonth()+1).toString().padStart(2, 0)}-${nextWeek.getDate().toString().padStart(2, 0)}`
        return new Promise(function(resolve){
            fetch(`/api/v1/planner/items?start_date=${todayStr}&end_date=${nextWeekStr}&per_page=10000`)
            .then(e=>e.json())
            .then(e=>{
                let p = []
                e.forEach(el=>{
                    if (el.submissions.graded) p.push(fetch(`/api/v1/courses/${el.course_id}/assignments/${el.plannable.id}/submissions/self`)
                    .then(_=>_.json())
                    .then(_=>{
                        el.submission = _
                        return el
                    }))
                })
                Promise.all(p).then(_=>resolve(e))
            })
        })
    }
})()
