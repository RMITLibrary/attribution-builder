//DOM elements where the attribution output will end up
var output = document.getElementById("attribution-text");
var outputHTML = document.getElementById("attribution-html");

//DOM elements - form parts
var titleInput = document.getElementById("title");
var titleURLInput = document.getElementById("title-url");
var authorInput = document.getElementById("author");
var authorURLInput = document.getElementById("author-url");
var orgInput = document.getElementById("organisation");
var orgURLInput = document.getElementById("organisation-url");
var projectInput = document.getElementById("project");
var projectURLInput = document.getElementById("project-url");
var derivativeURLInput = document.getElementById("derivative-url");
var licenseSelect = document.getElementById("license-select");
var licenseVersion = document.getElementById("version");
var form = titleInput.form;

//DOM elements - buttons + feedback
var copyAttrButton = document.getElementById("copy-attribution");
var copyHtmlButton = document.getElementById("copy-html");
var feedback = document.getElementById("feedback");

//Array to build license select box and build attributiion itself
var licenseArray = [
    {   value: 'CC BY', link: 'https://creativecommons.org/licenses/by/',
        text: 'Attribution (CC BY)' },

    {   value: 'CC BY-SA',
        link: 'https://creativecommons.org/licenses/by-sa/',
        text: 'Attribution-ShareAlike (CC BY-SA)' },

    {   value: 'CC BY-ND',
	 	link: 'https://creativecommons.org/licenses/by-nd/',
        text: 'Attribution-NoDerivs (CC BY-ND)' },

    {   value: 'CC BY-NC',
        link: 'https://creativecommons.org/licenses/by-nc/',
        text: 'Attribution-NonCommercial (CC BY-NC)' },

    {   value: 'CC BY-NC-SA',
        link: 'https://creativecommons.org/licenses/by-nc-sa/',
        text: 'Attribution-NonCommercial-ShareAlike (CC BY-NC-SA)' },

    {   value: 'CC BY-NC-ND',
        link: 'https://creativecommons.org/licenses/by-nc-nd/',
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

function createLink(label, url) {
    return url ? '<a href="' +url +'">' +label + '</a>' : '<a>' +label + '</a>';
}

//Prefix + link, or nothing if the label is empty
function part(prefix, label, url) {
    return label ? prefix +createLink(label, url) : '';
}

/* Build the attribution from the current form values */
function buildAttribution() {
    //-1 due to the default "Choose..." at the top
    var licence = licenseArray[licenseSelect.selectedIndex - 1];
    var licenseStr = '';

    if(licence) {
        var version = licence.noVersion ? '' : licenseVersion.value;
        licenseVersion.disabled = !!licence.noVersion;
        licenseStr = ' ' +(licence.prefix || 'is licensed under') +' ' +createLink(licence.value + (version && ' ' +version), licence.link + version);
    }

    var title = '"' +(titleInput.value || 'This work') +'"';
    var outputStr = (titleInput.value || titleURLInput.value ? createLink(title, titleURLInput.value) : title)
        +part(' by ', authorInput.value, authorURLInput.value)
        +part(', ', projectInput.value, projectURLInput.value)
        +part(', ', orgInput.value, orgURLInput.value)
        +licenseStr
        +part(' / A derivative from the ', derivativeURLInput.value && 'original work', derivativeURLInput.value);

    output.innerHTML = outputStr;
	//Escape string to display html code itself
    outputHTML.innerHTML = outputStr.replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

/* Called when focus leaves a field: add https:// to URLs without http, https or ftp */
function checkURL(e) {
    var field = e.target;
    if(field.id.endsWith('-url') && field.value && !/^(https?|ftp):\/\//.test(field.value)) {
        field.value = "https://" + field.value;
        buildAttribution();
    }
    if(field == titleURLInput && field.value && !titleInput.value) {
        titleInput.value = 'This work';
        buildAttribution();
    }
}

/* Called before the form's native reset clears the fields */
function resetForm() {
    if(document.getElementById("derivative-check").checked) {
        bootstrap.Collapse.getOrCreateInstance("#derivative-url-container", { toggle: false }).hide();
    }

    output.innerHTML = 'Your attribution will be built here.';
    outputHTML.innerHTML = 'The html of your attribution will be built here.';

	feedback.classList.remove("show");
}

/*
Called when "Copy attribution" is clicked. Copy it to clipboard
(won't work on http:// only https:// )
*/
function copyOutput() {
    try {
        navigator.clipboard.write([new ClipboardItem({
            'text/html': new Blob([output.innerHTML], { type: 'text/html' }),
            'text/plain': new Blob([output.innerText], { type: 'text/plain' })
        })]).then(() => setFeedback("Attribution copied to clipboard"), showCopyError);
    } catch (err) {
        showCopyError(err);
    }
}

/*
Called when "Copy html" is clicked. Copy the code to clipboard
(won't work on http:// only https:// )
*/
function copyHtml() {
    try {
        navigator.clipboard.writeText(output.innerHTML).then(() => setFeedback("HTML copied to clipboard"), showCopyError);
    } catch (err) {
        showCopyError(err);
    }
}

function showCopyError(err)
{
	console.error("Clipboard copy failed:", err);
	setFeedback("Copy failed – please select and copy manually");
}

function setFeedback(message)
{
	feedback.innerHTML = message;
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
	containerDiv.classList.remove("main-content", "container");
	columnDiv.classList.remove("col-xl-10");

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    containerDiv.style.marginRight = "2rem";
}


//build the license select box
licenseArray.forEach(licence => licenseSelect.add(new Option(licence.text, licence.value)));

//add event listeners to form fields, buttons etc.
form.addEventListener("input", buildAttribution);
form.addEventListener("focusout", checkURL);
form.addEventListener("reset", resetForm);
//form.reset is shadowed by the button with id="reset"
document.getElementById("reset").addEventListener("click", () => HTMLFormElement.prototype.reset.call(form));
copyAttrButton.addEventListener("click", copyOutput);
copyHtmlButton.addEventListener("click", copyHtml);


/*
SCRIPT to remove header and footer and bootstrap columns
This may be used if Attribution builder is embedded in another page via iframe
*/

// Check query string for embed or iframe set to true or 1
const urlParams = new URLSearchParams(window.location.search);
if (['embed', 'iframe'].some(key => ['true', '1'].includes(urlParams.get(key)))) {
  embedThisPage();
}


/*
    THEME SWITCHER
    This script handles the theme switching functionality for the website. It retrieves the user's  preferred theme from local storage or system settings and applies it to the document. It also provides the ability to switch themes through a theme switcher UI component, updates the UI to reflect the active theme, and listens for changes to the system's dark mode preference.

    Note: There is a companion script in the <head> section that sets the initial theme as early as possible to reduce the flash of unstyled content (FOUC). It determines the user's preferred theme (either from local storage or system settings) and applies it immediately.
*/
(function() {
    'use strict';

    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const systemTheme = () => darkQuery.matches ? 'dark' : 'light';
    const toggles = document.querySelectorAll('.theme-switch [data-bs-theme-value]');

    const setTheme = theme => document.documentElement.setAttribute('data-bs-theme', theme === 'auto' ? systemTheme() : theme);

    const showActiveTheme = theme => toggles.forEach(element => {
      element.checked = (element.getAttribute('data-bs-theme-value') === theme);
    });

    darkQuery.addEventListener('change', () => {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme !== 'light' && storedTheme !== 'dark') {
        setTheme('auto');
      }
    });

    showActiveTheme(localStorage.getItem('theme') || systemTheme());
    toggles.forEach(toggle => {
      toggle.addEventListener('change', () => {
        const theme = toggle.getAttribute('data-bs-theme-value');
        localStorage.setItem('theme', theme);
        setTheme(theme);
        showActiveTheme(theme);
      });
    });
  })();
