let terminal = document.getElementById("terminal");
let command = document.getElementById("typer");
let textarea = document.getElementById("texter");
let before = document.getElementById("before");

let git = 0;
let pw = false;
let commands = [];

setTimeout(function() {
    loopLines(banner, "", 150);
    textarea.focus();
}, 100);

window.addEventListener("keyup", enterKey);


//Easter Egg
console.log(
    "%cTry typing Barbussa 😍",
    "color: #ff05f2; font-weight: bold; font-size: 30px;"
);

//init/////////////////////////////
textarea.value = "";
command.innerHTML = textarea.value;
let rArr = [];
getRepositories();
///////////////////////////////////

function enterKey(e) {
    if (e.keyCode == 181) {
        document.location.reload(true);
    }
    if (e.keyCode == 13) {
        commands.push(command.innerHTML);
        git = commands.length;
        addLine("visitor@TeusDev.com:~$ " + command.innerHTML, "no-animation", 0);
        commander(command.innerHTML.toLowerCase());
        command.innerHTML = "";
        textarea.value = "";
    }
    if (e.keyCode == 38 && git != 0) {
        git -= 1;
        textarea.value = commands[git];
        command.innerHTML = textarea.value;
    }
    if (e.keyCode == 40 && git != commands.length) {
        git += 1;
        if (commands[git] === undefined) {
            textarea.value = "";
        } else {
            textarea.value = commands[git];
        }
        command.innerHTML = textarea.value;
    }
}

function commander(cmd) {
    switch (cmd.toLowerCase()) {
        case "whythis":
            loopLines(whythis, "color2 margin", 80);
            break;
        case "help":
            loopLines(help, "color2 margin", 80);
            break;
        case "barbussa":
            loopLines(barbussa, "color2 margin", 80);
            break;
        case "whoami":
            loopLines(whoami, "color2 margin", 80);
            break;
        case "social":
            loopLines(social, "color2 margin", 80);
            break;
        case "projects":
            loopLines(rArr, "color2 margin", 80)
            break;
        case "history":
            addLine("<br>", "", 0);
            loopLines(commands, "color2", 80);
            addLine("<br>", "command", 80 * commands.length + 50);
            break;
        case "email":
            addLine('Opening mailto:<a href="mailto:matlima2002@gmail.com">matlima2002@gmail.com</a>...', "color2", 100);
            newTab(email);
            break;
        case "clear":
            setTimeout(function() {
                terminal.innerHTML = '<a id="before"></a>';
                before = document.getElementById("before");
                loopLines(banner, "", 80);

            }, 1);
            break;


        // socials
        case "twitter":
            addLine("Opening Twitter...", "color2", 0);
            newTab(twitter);
            break;
        case "linkedin":
            addLine("Opening LinkedIn...", "color2", 0);
            newTab(linkedin);
            break;
        case "instagram":
            addLine("Opening Instagram...", "color2", 0);
            newTab(instagram);
            break;
        case "github":
            addLine("Opening GitHub...", "color2", 0);
            newTab(github);
            break;

        default:
            loopLines(invalidCommand, "color2 margin", 75);
            addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 1000);
            break;
    }
}

async function getRepositories() {
    let res = await axios.get('https://api.github.com/users/matlima02/repos');
    let repositories = res.data;
    let repoNameArr = [];
    let repoLinkArr = [];

    for(let i = 0; i < repositories.length; i++){
        repoNameArr.push(repositories[i].name);
        repoLinkArr.push(repositories[i].html_url);
    }
    for(let i = 0; i < repositories.length; i++){
        rArr.push('<a href="' + repoLinkArr[i] + '" target="_blank">'+ repoNameArr[i] + "</a>");
    }
}

function newTab(link) {
    setTimeout(function() {
        window.open(link, "_blank");
    }, 500);
}

function addLine(text, style, time) {
    var t = "";
    for (let i = 0; i < text.length; i++) {
        if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
            t += "&nbsp;&nbsp;";
            i++;
        } else {
            t += text.charAt(i);
        }
    }
    setTimeout(function() {
        var next = document.createElement("p");
        next.innerHTML = t;
        next.className = style;

        before.parentNode.insertBefore(next, before);

        window.scrollTo(0, document.body.offsetHeight);
    }, time);
}

function loopLines(name, style, time) {
    name.forEach(function(item, index) {
        addLine(item, style, index * time);
    });
}
