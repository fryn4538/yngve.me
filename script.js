const help = "" + 
    "<span class='highlight'>help</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- You already know what this does</br>" +
    "<span class='highlight'>whois</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Information about me</br>" + 
    "<span class='highlight'>projects</span>&nbsp;&nbsp;&nbsp;&nbsp;- View coding projects</br>" + 
    "<span class='highlight'>social</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Websites where you can finde me</br>" + 
    "<span class='highlight'>history</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- View command history</br>" +
    "<span class='highlight'>contact</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- How you reach me</br>" + 
    "<span class='highlight'>clear</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Clear terminal</br>";

// TODO
const whois = "Hello I'm Fredrik, the semmel slayer!";

// TODO
const projects = "Currently implementing this section. While wating, you can visit my <span class='highlight'><a href='https://github.com/fryn4538/'>Github</a></span>.";

const social = "" +
    "Github&nbsp;&nbsp;&nbsp;&nbsp; - <a href='https://github.com/fryn4538/'>https://github.com/fryn4538/</a></br>" +
    "LinkedIn&nbsp;&nbsp; - <a href='https://www.linkedin.com/in/fredrik-yngve/'>https://www.linkedin.com/in/fredrik-yngve/</a>";

const contact = "You can reach me at <a href='mailto:fredrik@yngve.me'>fredrik@yngve.me</a>(<a href='fredrik@yngve.me.asc' download='gpgKey'>GPG key</a>)";

const wrong = (str) => {
    return "Command not found: <span class='warning'>" + str + "</span>; " +
    "Type <span class='highlight'>'help'</span> to see available commands;";
} 

var historyList = [];

function appendElement(str) {
    const node = document.createElement("div");
    node.innerHTML = str;
    document.getElementById("history").appendChild(node);
}

function clear() {
    document.getElementById("history").innerHTML = "";
}

function outputLine(str) {
    appendElement("guest@yngve.me ~ " + str);
}

function showHistory() {
    var str = "";
    for (var i = 0; i < historyList.length; i++){
        str += historyList[i] + "</br>";
    }
    appendElement(str);
}


function onEnter() {
    const key = window.event.keyCode;

    // If the user has pressed enter
    if (key === 13) {
        window.event.preventDefault();
        var input = document.getElementById("txtArea").value;

        outputLine(input);
        if (input == "help") appendElement(help);
        else if (input == "whois") appendElement(whois);
        else if (input == "projects") appendElement(projects);
        else if (input == "social") appendElement(social);
        else if (input == "contact") appendElement(contact);
        else if (input == "history") showHistory();
        else if (input == "clear") clear();
        else appendElement(wrong(input));
        historyList.push(input);
        document.getElementById("txtArea").value = "";
        return false;
    }
    else {
        return true;
    }
}