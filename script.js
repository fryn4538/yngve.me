const commandButton = (name, label) => {
    return "<button type='button' class='cmd' data-command='" + name + "'>" + (label || name) + "</button>";
}

const helpRow = (name, description) => {
    return commandButton(name) + "<span>" + description + "</span>";
}

const help = "<div class='rows'>" +
    helpRow("help", "You already know what this does") +
    helpRow("whois", "Information about me") +
    helpRow("projects", "View coding projects") +
    helpRow("social", "Websites where you can finde me") +
    helpRow("history", "View command history") +
    helpRow("contact", "How you reach me") +
    helpRow("clear", "Clear terminal") +
    "</div>";

// TODO
const whois = "Hello I'm Fredrik, the semmel slayer!";

// TODO
const projects = "Currently implementing this section. While waiting, you can visit my <span class='highlight'><a href='https://github.com/fryn4538/'>Github</a></span>.";

const social = "<div class='rows links'>" +
    "<span>Github</span><a href='https://github.com/fryn4538/'>github.com/fryn4538</a>" +
    "<span>LinkedIn</span><a href='https://www.linkedin.com/in/fredrik-yngve/'>linkedin.com/in/fredrik-yngve</a>" +
    "</div>";

const contact = "You can reach me at <span class='nowrap'><a href='mailto:fredrik@yngve.me'>fredrik@yngve.me</a> (<a href='fredrik@yngve.me.asc' download='gpgKey'>GPG key</a>)</span>";

const wrong = (str) => {
    return "Command not found: <span class='warning'>" + str + "</span>; " +
    "Type " + commandButton("help", "'help'") + " to see available commands;";
}

var historyList = [];
var index = -1;

const inputField = document.getElementById("txtArea");
const form = document.getElementById("txtWrapper");
const shortcuts = document.getElementById("shortcuts");
const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

window.onkeyup = function(e) {
    var key = e.keyCode;
    var inpt = document.getElementById("txtArea");
    if (key == 38) {
        if(index < historyList.length-1){
            index++;
            inpt.value = historyList[historyList.length-1-index];
        }
    } else if (key == 40) {
        if (index > 0) {
            index--;
            inpt.value = historyList[historyList.length-1-index];
        } else {
            inpt.value = "";
            index = -1;
        }
    }
};



function appendElement(str, className) {
    const node = document.createElement("div");
    if (className) node.className = className;
    node.innerHTML = str;
    document.getElementById("history").appendChild(node);
}

function clear() {
    document.getElementById("history").innerHTML = "";
}

function outputLine(str) {
    appendElement("<span class='prompt'>guest@yngve.me ~</span> " + str, "echo");
}

function showHistory() {
    var str = "";
    for (var i = 0; i < historyList.length; i++){
        str += historyList[i] + "</br>";
    }
    appendElement(str);
}

function runCommand(raw) {
    const input = raw.trim();
    const command = input.toLowerCase();

    if (command == "exit"){
        close();
    }

    outputLine(input);
    if (command == "help") appendElement(help);
    else if (command == "whois") appendElement(whois);
    else if (command == "projects") appendElement(projects);
    else if (command == "social") appendElement(social);
    else if (command == "contact") appendElement(contact);
    else if (command == "history") showHistory();
    else if (command == "clear") clear();
    else appendElement(wrong(input));
    historyList.push(input);
    index = -1;
    keepPromptVisible();
}

// Scrolls just far enough that the prompt isn't hidden by the bar or keyboard
function keepPromptVisible() {
    const viewport = window.visualViewport;
    const barBox = shortcuts.getBoundingClientRect();
    var limit = window.innerHeight;
    if (barBox.height > 0) limit = barBox.top;
    else if (viewport) limit = viewport.offsetTop + viewport.height;

    const gap = 8;
    const overflow = form.getBoundingClientRect().bottom + gap - limit;
    if (overflow > 0) window.scrollBy(0, Math.ceil(overflow));
}

var keyboardOffset = 0;

// Tracks the on-screen keyboard, which only shrinks the visual viewport
function syncViewport() {
    const viewport = window.visualViewport;
    const offset = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
    const opened = offset > keyboardOffset;
    keyboardOffset = offset;
    document.documentElement.style.setProperty("--kb-offset", offset + "px");

    // Only when the keyboard opens, so reading back through history isn't interrupted
    if (opened && document.activeElement === inputField) keepPromptVisible();
}

if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", syncViewport);
    window.visualViewport.addEventListener("scroll", syncViewport);
}

form.addEventListener("submit", function(e) {
    e.preventDefault();
    runCommand(inputField.value);
    inputField.value = "";
});

// Stops taps on commands from moving focus, which would open or close the keyboard
document.addEventListener("mousedown", function(e) {
    if (e.target.closest("#shortcuts, [data-command]")) e.preventDefault();
});

document.addEventListener("click", function(e) {
    const commandElement = e.target.closest("[data-command]");
    if (commandElement) {
        runCommand(commandElement.dataset.command);
        if (!isTouch) inputField.focus();
        return;
    }

    // Leave links, the bar and text selections alone so copying still works
    if (e.target.closest("a, input, #shortcuts")) return;
    if (window.getSelection().toString()) return;
    inputField.focus();
});
