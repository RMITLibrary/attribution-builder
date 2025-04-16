//DOM elements where the attribution output will end up
var output = document.getElementById("attribution-text");
var outputHTML = document.getElementById("attribution-html");

//DOM elements - form parts
var titleInput = document.getElementById("title");
var titleURLInput = document.getElementById("title-url");
var titleStr = '"This work"';

var authorInput = document.getElementById("author");
var authorURLInput = document.getElementById("author-url");
var authorStr = '';

var orgInput = document.getElementById("organisation");
var orgURLInput = document.getElementById("organisation-url");
var orgStr = '';

var projectInput = document.getElementById("project");
var projectURLInput = document.getElementById("project-url");
var projectStr = '';

var derivativeURLInput = document.getElementById("derivative-url");
var derivativeStr = '';

var licenseSelect = document.getElementById("license-select");
var licenseVersion = document.getElementById("version");
var licenseStr = '';
var licenseVersionStr = '';

//DOM elements - buttons + feedback
var reset = document.getElementById("reset");
var copyAttrButton = document.getElementById("copy-attribution");
var copyHtmlButton = document.getElementById("copy-html");
var feedback = document.getElementById("feedback");

//Array to build license select box and build attributiion itself
var licenseArray = [
    {   value: 'CC BY', link: 'https://creativecommons.org/licenses/by/',
        prefix: 'is licensed under',
        text: 'Attribution (CC BY)' },

    {   value: 'CC BY-SA',
        link: 'https://creativecommons.org/licenses/by-sa/',
        prefix: 'is licensed under',
        text: 'Attribution-ShareAlike (CC BY-SA)' },

    {   value: 'CC BY-ND',
	 	link: 'https://creativecommons.org/licenses/by-nd/',
        prefix: 'is licensed under',
        text: 'Attribution-NoDerivs (CC BY-ND)' },

    {   value: 'CC BY-NC',
        link: 'https://creativecommons.org/licenses/by-nc/',
        prefix: 'is licensed under',
        text: 'Attribution-NonCommercial (CC BY-NC)' },

    {   value: 'CC BY-NC-SA',
        link: 'https://creativecommons.org/licenses/by-nc-sa/',
        prefix: 'is licensed under',
        text: 'Attribution-NonCommercial-ShareAlike (CC BY-NC-SA)' },

    {   value: 'CC BY-NC-ND',
        link: 'https://creativecommons.org/licenses/by-nc-nd/4.0',
        prefix: 'is licensed under',
        text: 'Attribution-NonCommercial-NoDerivs (CC BY-NC-ND)' },

    {   value: 'Public Domain',
        link: 'https://wiki.creativecommons.org/Public_domain',
        prefix: 'is in the',
        text: 'Public Domain (General)',
        noVersion: true },

    {   value: 'Public Domain (CC0)',
        link: 'https://creativecommons.org/publicdomain/zero/1.0/',
        prefix: 'is in the',
        text: 'Public Domain (CC0)',
        noVersion: true }
];

//Loop the licenseArray and build the license select box
function buildLicenseSelect()
{
    for(var i=0; i < licenseArray.length; i++) {
        var option = document.createElement("option");
        option.text = licenseArray[i].text;
        option.value = licenseArray[i].value;
        licenseSelect.add(option, licenseSelect[i+1]);
    }
}

/*
Functions triggered by changing fields in the form
All call buildAttribution once string has been built.
*/
function changeTitle() {
    var quotes = '"' +titleInput.value +'"';
    titleStr = createLink(quotes, titleURLInput.value);
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

/*
When a user selects a licence from the select box or changes a version,
update license string and build the attribution.
*/
function changeLicense() {
    //grab the selected index (-1 due to the default "Choose..." at the top)
    var index = (licenseSelect.selectedIndex)-1;

    if(index != -1)
    {
        var link = licenseArray[index].link;
        var label  = licenseArray[index].value;
        var prefix = licenseArray[index].prefix;

        //If there's no version, disabled dropdown, clear string.
        //Otherwise add the versino number to link and label
        if(licenseArray[index].noVersion == true) {
            licenseVersionStr = '';
            licenseVersion.disabled = true;
        }
        else {
            licenseVersionStr = ' ' +licenseVersion.value;
            link += licenseVersion.value;
            licenseVersion.disabled = false;
        }

        // Create the license string and then build the attribution
        licenseStr = ' ' +prefix +' ' +createLink(label+licenseVersionStr, link);
        buildAttribution();
    }
}

//help class to build urls
function createLink(label, url) {

    if(label == "") {
        return "";          //Edge case??
    }
    else if(url == "") {
       return '<a>' +label + '</a>';
    }
    else {
        return '<a href="' +url +'">' +label + '</a>';
    }
}

/* Build the attribution itself */
function buildAttribution() {

    var outputStr = titleStr +authorStr +projectStr +orgStr +licenseStr +derivativeStr;
    output.innerHTML = outputStr;
	//Escape string to display html code itself
    outputHTML.innerHTML = outputStr.replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

/* Called when focus leaves url field */
function checkURL(e) {
    //Check valid url
    if(e.target.value == "") {
       //No URL, do nothing
    }
    /*else if(!isValidUrl(e.target.value)) {
        //Invalid URL. Currently not handling this error
    }*/
    else {
		//Add https:// if it, http or ftp not already present.
        var pattern = /^((http|https|ftp):\/\/)/;
        if(!pattern.test(e.target.value)) {
            e.target.value = "https://" + e.target.value;
        }
    }

    //Determine which url triggered the function, update strings
    if(e.target == titleURLInput) {
        if(titleInput.value == "") { titleInput.value = 'This work'; }      //If title is blank, add "This work"
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

//Checks whether a url is valid. Not currently in use
function isValidUrl(urlString) {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}

/* Called when reset button is clicked */
function resetForm(e) {
    titleInput.value = '';
    titleURLInput.value = '';
    titleStr = '"This work"';

    authorInput.value = '';
    authorURLInput.value = '';
    authorStr = '';

    orgInput.value = '';
    orgURLInput.value = '';
    orgStr = '';

    projectInput.value = '';
    projectURLInput.value = '';
    projectStr = '';

    derivativeURLInput.value = '';
    derivativeStr = '';

    //uncheck box, hide url
    var checkbox = document.getElementById("derivative-check");

    if(checkbox.checked == true) {
        checkbox.checked = false;
        var derivUrl = document.getElementById("derivative-url-container");
        var myCollapse = new bootstrap.Collapse(derivUrl);
    }

    licenseSelect.selectedIndex = 0;
    licenseVersion.selectedIndex = 0;
    licenseStr = '';
    licenseVersionStr = '';

    output.innerHTML = 'Your attribution will be built here.';
    outputHTML.innerHTML = 'The html of your attribution will be built here.';

	feedback.classList.remove("show");
}

/*
Called when "Copy attribution" is clicked. Copy it to clipboard
(won't work on http:// only https:// )
*/
function copyOutput(e) {
    var blobInput = new Blob([output.innerHTML], { type: 'text/html' })
    navigator.clipboard.write([new ClipboardItem({ 'text/html': blobInput })]);
	showFeedback(e.target);
}

/*
Called when "Copy html" is clicked. Copy the code to clipboard
(won't work on http:// only https:// )
*/
function copyHtml(e) {
    navigator.clipboard.writeText(output.innerHTML);
	showFeedback(e.target);
}

function showFeedback(btn)
{
	console.log(btn.id);
	if(btn.id == "copy-html")
	{
		feedback.innerHTML = "Html copied to clipboard";
	}
	else
	{
		feedback.innerHTML = "Attribution copied to clipboard";
	}
	feedback.classList.add("show");
}

/*
Hide header and footer and remove bootstrap layout classes to
allow page to fit any size container.
*/
function embedThisPage()
{
	//pick up the relevant objects in the page
	var nav = document.getElementById("nav");
	var footer = document.getElementById("footer");
	var containerDiv = document.getElementById("page-content");
	var columnDiv = document.getElementById("page-columns");

	//hide nav and footer
	nav.style.display = "none";
	footer.style.display = "none";

	//remove bootstrap classes that provide adaptive styling
	containerDiv.classList.remove("main-content");
	containerDiv.classList.remove("container");
	columnDiv.classList.remove("col-xl-10");

    containerDiv.style.marginRight = "2rem";
}


//build the license select box
buildLicenseSelect();

//add event listeners to form fields, buttons etc.
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

licenseSelect.addEventListener("change", changeLicense);
licenseVersion.addEventListener("change", changeLicense);

reset.addEventListener("click", resetForm);
copyAttrButton.addEventListener("click", copyOutput);
copyHtmlButton.addEventListener("click", copyHtml);


/*
SCRIPT to remove header and footer and bootstrap columns
This may be used if Attribution builder is embedded in another page via iframe
*/

// Check query string for embed=true or iframe=true. If either is present, call embedThisPage
const urlParams = new URLSearchParams(window.location.search);
const embedBool = urlParams.get('embed') === 'true' || urlParams.get('iframe') === 'true';

if (embedBool) {
  embedThisPage();
}


/*
    THEME SWITCHER
    This script handles the theme switching functionality for the website. It retrieves the user's  preferred theme from local storage or system settings and applies it to the document. It also provides the ability to switch themes through a theme switcher UI component, updates the UI to reflect the active theme, and listens for changes to the system's dark mode preference.

    Note: There is a companion script in the <head> section that sets the initial theme as early as possible to reduce the flash of unstyled content (FOUC). It determines the user's preferred theme (either from local storage or system settings) and applies it immediately.
*/
(function() {
    'use strict';

    const getStoredTheme = () => localStorage.getItem('theme');

    const setStoredTheme = theme => localStorage.setItem('theme', theme);

    const getPreferredTheme = () => {
      const storedTheme = getStoredTheme();
      return storedTheme ? storedTheme : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    };

    const setTheme = theme => {
      const themeToSet = theme === 'auto' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme;
      document.documentElement.setAttribute('data-bs-theme', themeToSet);
    };

    const showActiveTheme = theme => {
      document.querySelectorAll('.theme-switch').forEach(themeSwitcher => {
        themeSwitcher.querySelectorAll('[data-bs-theme-value]').forEach(element => {
          element.checked = (element.getAttribute('data-bs-theme-value') === theme);
        });
      });
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== 'light' && storedTheme !== 'dark') {
        setTheme(getPreferredTheme());
      }
    });

    window.addEventListener('DOMContentLoaded', () => {
      showActiveTheme(getPreferredTheme());
      document.querySelectorAll('.theme-switch [data-bs-theme-value]').forEach(toggle => {
        toggle.addEventListener('change', () => {
          const theme = toggle.getAttribute('data-bs-theme-value');
          setStoredTheme(theme);
          setTheme(theme);
          showActiveTheme(theme);
        });
      });
    });
  })();