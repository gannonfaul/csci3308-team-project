// var app = chrome.runtime.getBackgroundPage();

function viewGithub() {
   chrome.tabs.create({active: true, url: "https://github.com/gannonfaul/csci3308-team-project.git"});
}

function viewTrello() {
   chrome.tabs.create({active: true, url: "https://trello.com/b/WbCF7xuU/project-planning"});
}

function viewAssign() {
   chrome.tabs.create({active: true, url: "http://www.lousymedia.com/csci-3308/assignments/team-project"});
}

document.getElementById('github').addEventListener('click', viewGithub);
document.getElementById('trello').addEventListener('click', viewTrello);
document.getElementById('project').addEventListener('click', viewAssign);