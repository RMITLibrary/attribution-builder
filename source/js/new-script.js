//DOM elements where the attribution output will end up
var output = document.getElementById("attribution-text");
var outputHTML = document.getElementById("attribution-html");

var titleInput = document.getElementById("title");
var titleURLInput = document.getElementById("title-url");
var titleStr = "";

var authorInput = document.getElementById("author");
var authorURLInput = document.getElementById("author-url");
var authorStr = "";

var orgInput = document.getElementById("organisation");
var orgURLInput = document.getElementById("organisation-url");
var orgStr = "";

var projectInput = document.getElementById("project");
var projectURLInput = document.getElementById("project-url");
var projectStr = "";


var licenseInput = document.getElementById("license-select");
var licenseVersion = document.getElementById("version");
var licenseStr = "";

var derivativeURLInput = document.getElementById("derivative-url");
var derivativeStr = "";

function changeTitle() {
    titleStr = createLink(titleInput.value, titleURLInput.value);
    buildAttribution();
}

function changeAuthor() {
    authorStr = " by " +createLink(authorInput.value, authorURLInput.value);
    //authorStr += ",";
    buildAttribution();
}

function changeOrg() {
    orgStr = ", " +createLink(orgInput.value, orgURLInput.value);
    buildAttribution();
}

function changeProject() {
    projectStr = ", " +createLink(projectInput.value, projectURLInput.value);
    buildAttribution();
}

function changeDerivative() {
    derivativeStr = " / A derivative from the " +createLink("original work", derivativeURLInput.value);
    buildAttribution();
}

function changeLicense() {
    console.log("Change License");
}


function createLink(label, url) {
    
    if(label == "") {
        return "";          //Edge case?? 
    }
    else if(url == "") {
       return '<a>"' +label + '"</a>';    
    }
    else {
        return '<a href="' +url +'">"' +label + '"</a>'; 
    }
}


function buildAttribution() {
    
    var outputStr = titleStr +authorStr +projectStr +orgStr +licenseStr +derivativeStr;
    output.innerHTML = outputStr;
    outputHTML.innerHTML = outputStr.replace(/</g,"&lt;").replace(/>/g,"&gt;");
}


function checkURL(e) {
    
    //Check valid url
    if(e.target.value == "") {
       //No URL, do nothing
    }
    else if(!isValidUrl(e.target.value)) {
        console.log("Show URL error");      //How to handle this error accessiblity wise??
        e.target.focus();
    }
    else {       
        var pattern = /^((http|https|ftp):\/\/)/;
        if(!pattern.test(e.target.value)) {
            e.target.value = "https://" + e.target.value;
        }
    }

    //Big if statement with 5 urls :/
    if(e.target == titleURLInput) {
        if(titleInput.value == "") { titleInput.value = 'This work'; }      //If title is blank, add "This work", do we need to do this?
        changeTitle();
    }
    else if(e.target == authorURLInput) {
        changeAuthor();
    }
    else if(e.target == orgURLInput) {
        changeOrg();
    }
    else if(e.target == projectURLInput) {
        changeProject();
    }
    else if(e.target == derivativeURLInput) {
        changeDerivative();
    }
}

const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}

function addProtocol(url) {
    var pattern = /^((http|https|ftp):\/\/)/;
    if(!pattern.test(url)) {
        url = "https://" + url;
    }
}

titleInput.addEventListener("input", changeTitle);
titleURLInput.addEventListener("input", changeTitle);
titleURLInput.addEventListener("focusout", checkURL);

authorInput.addEventListener("input", changeAuthor);
authorURLInput.addEventListener("input", changeAuthor);
authorURLInput.addEventListener("focusout", checkURL);

projectInput.addEventListener("input", changeProject);
projectURLInput.addEventListener("input", changeProject);
projectURLInput.addEventListener("focusout", checkURL);

orgInput.addEventListener("input", changeOrg);
orgURLInput.addEventListener("input", changeOrg);
orgURLInput.addEventListener("focusout", checkURL);

derivativeURLInput.addEventListener("input", changeDerivative);
derivativeURLInput.addEventListener("focusout", checkURL);

licenseInput.addEventListener("change", changeLicense);
licenseVersion.addEventListener("change", changeLicense);
