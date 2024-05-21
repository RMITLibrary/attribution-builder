var titleOutput;
var authorOutput;
var lincenseOutput;
var derivativeOutput;
var organizationOutput;
var projectOutput;

var output;

function unHighlight() {
    titleOutput.removeAttribute("class"),
    authorOutput.removeAttribute("class"),
    lincenseOutput.removeAttribute("class"),
    derivativeOutput.removeAttribute("class"),
    organizationOutput.removeAttribute("class"),
    projectOutput.removeAttribute("class");
}

function SelectAll(a) {
    var b = document.getElementById(a);
    b.focus();
    b.select();
}

function SelectText(a) {
    var b = document;
    var c = b.getElementById(a);
    var d;
    
    if (b.body.createTextRange) {
        d = b.body.createTextRange();
        d.moveToElementText(c), d.select();
    } 
    else if (window.getSelection) {
        var e = window.getSelection();
        d = b.createRange();
        d.selectNodeContents(c), e.removeAllRanges(), e.addRange(d);
    }
}

function isValidURL(a) {
    var b = /^((ftp:|http:|https:)?\/\/)?[^ "]+$/;
    return !!b.test(a.value) && ((b = /^(ftp:|http:|https:)?\/\//), b.test(a.value) || (a.value = "http://" + a.value), !0);
}

function onloadform() {
    document.getElementById("AtributionForm").reset();
    
    titleOutput = document.createElement("a");
    authorOutput = document.createElement("a");
    lincenseOutput = document.createElement("a");
    derivativeOutput = document.createElement("a");
    organizationOutput = document.createElement("a");
    projectOutput = document.createElement("a");
    
    var by = document.createTextNode("");
    var commaproject = document.createTextNode("");
    var commaOrganization = document.createTextNode("");
    var is_licensed_under = document.createTextNode("");
    var derivative_text = document.createTextNode("");
    
    output.innerHTML = "";
    output.appendChild(titleOutput);
    output.appendChild(by);
    output.appendChild(authorOutput);
    output.appendChild(commaproject);
    output.appendChild(projectOutput);
    output.appendChild(commaOrganization);
    output.appendChild(organizationOutput);
    output.appendChild(is_licensed_under);
    output.appendChild(lincenseOutput);
    output.appendChild(derivative_text);
    output.appendChild(derivativeOutput);
    
    output.style.display = "none";
}

function onchangevalue(a) {
    unHighlight(),
        $("#output").show(),
        "" == titleOutput.innerHTML && (titleOutput.innerHTML = '"This work"'),
        "titleTextBox" == a.id && (titleOutput.setAttribute("class", "highlight"), (titleOutput.innerHTML = '"' + a.value + '"')),
        "authornameTextBox" == a.id &&
            ("" != organizationOutput.innerHTML && (commaOrganization.nodeValue = ", "),
            "" != projectOutput.innerHTML && (commaproject.nodeValue = ", "),
            (by.nodeValue = " by "),
            authorOutput.setAttribute("class", "highlight"),
            (authorOutput.innerHTML = a.value)),
        "OrganizationTextBox" == a.id &&
            ("" != authorOutput.innerHTML || "" != projectOutput.innerHTML ? (commaOrganization.nodeValue = ", ") : (commaOrganization.nodeValue = ""),
            (by.nodeValue = " by "),
            organizationOutput.setAttribute("class", "highlight"),
            (organizationOutput.innerHTML = a.value)),
        "ProjectTextBox" == a.id &&
            ("" != authorOutput.innerHTML ? (commaproject.nodeValue = ", ") : (commaproject.nodeValue = ""),
            "" != organizationOutput.innerHTML ? (commaOrganization.nodeValue = ", ") : (commaOrganization.nodeValue = ""),
            (by.nodeValue = " by "),
            projectOutput.setAttribute("class", "highlight"),
            (projectOutput.innerHTML = a.value));
}

function changeTitle() {
    unHighlight();
    var a = document.getElementById("titleTextBox"),
        b = document.getElementById("titleURLTextBox");
    a.value.length > 0 ? (titleOutput.innerHTML = '"' + a.value + '"') : (titleOutput.innerHTML = '"This work"'),
        isValidURL(b) && b.value.length > 0
            ? ($("#ItemUrlPrompt").hide(), (titleOutput.href = b.value), (titleOutput.target = "_blank"))
            : (b.value.length > 0 && $("#ItemUrlPrompt").show(), titleOutput.removeAttribute("href"), titleOutput.removeAttribute("target"), b.focus(), b.select());
}

function changeAuthor() {
    unHighlight();
    var a = document.getElementById("authornameTextBox"),
        b = document.getElementById("authorURLTextBox");
    a.value.length > 0
        ? ((authorOutput.innerHTML = a.value),
          "" != organizationOutput.innerHTML && (commaOrganization.nodeValue = ", "),
          "" != projectOutput.innerHTML && (commaproject.nodeValue = ", "),
          isValidURL(b) && b.value.length > 0
              ? ($("#AuthorUrlPrompt").hide(), (authorOutput.href = b.value), (authorOutput.target = "_blank"))
              : (b.value.length > 0 && $("#AuthorUrlPrompt").show(), authorOutput.removeAttribute("href"), authorOutput.removeAttribute("target"), b.focus(), b.select()),
          (by.nodeValue = " by "))
        : ((by.nodeValue = ""), (authorOutput.innerHTML = ""), authorOutput.removeAttribute("href"), authorOutput.removeAttribute("target"));
}

function changeLicense() {
    unHighlight(), window.getSelection().removeAllRanges();
    var a = document.getElementById("LicenseListBox"),
        b = document.getElementById("VersionDropDown");
    LicenceIndex = a.options[a.selectedIndex].index;
    var c = b.options[b.selectedIndex].value;
    LicenceIndex < 7 && 0 != LicenceIndex ? (b.disabled = !1) : ((b.disabled = !0), (b.selectedIndex = 0));
    var d = a.options[a.selectedIndex].value;
    if (0 != LicenceIndex) {
        1 == b.disabled && (c = ""), (is_licensed_under.nodeValue = " is licensed under ");
        var e = d.substring(3, d.length) + "/" + c,
            f = "http://creativecommons.org/licenses/" + e.toLocaleLowerCase();
        7 == LicenceIndex && ((is_licensed_under.nodeValue = " is in the "), (f = "https://wiki.creativecommons.org/Public_domain")),
            8 == LicenceIndex && ((is_licensed_under.nodeValue = " is in the "), (f = "http://creativecommons.org/publicdomain/zero/1.0/")),
            (lincenseOutput.href = f),
            (lincenseOutput.target = "_blank"),
            (lincenseOutput.innerHTML = (a.options[a.selectedIndex].value + " " + c).trim());
    } else lincenseOutput.removeAttribute("href"), lincenseOutput.removeAttribute("target"), (lincenseOutput.innerHTML = "");
}

function changeDerivative() {
    unHighlight();
    var a = document.getElementById("DerivativeCheckBox"),
        b = document.getElementById("DerivativeTextBox");
    a.checked ? (b.disabled = !1) : ((b.value = ""), (b.disabled = !0)),
        a.checked
            ? b.value.length > 0 && isValidURL(b)
                ? ($("#DerivUrlPrompt").hide(), (derivativeOutput.href = b.value), (derivativeOutput.target = "_blank"), (derivativeOutput.innerHTML = "original work"), (derivative_text.nodeValue = " / A derivative from the "))
                : ($("#DerivUrlPrompt").show(), derivativeOutput.removeAttribute("href"), derivativeOutput.removeAttribute("target"), (derivativeOutput.innerHTML = ""), (derivative_text.nodeValue = ""), b.focus(), b.select())
            : (derivativeOutput.removeAttribute("href"), derivativeOutput.removeAttribute("target"), (derivativeOutput.innerHTML = ""), (derivative_text.nodeValue = ""));
}
function changeProject() {
    unHighlight();
    var a = document.getElementById("ProjectTextBox"),
        b = document.getElementById("ProjectURLTextBox");
    a.value.length > 0
        ? ("" != authorOutput.innerHTML ? (commaproject.nodeValue = ", ") : (commaproject.nodeValue = ""),
          "" != organizationOutput.innerHTML ? (commaOrganization.nodeValue = ", ") : (commaOrganization.nodeValue = ""),
          (projectOutput.innerHTML = a.value),
          isValidURL(b) && b.value.length > 0
              ? ($("#ProjectUrlPrompt").hide(), (projectOutput.href = b.value), (projectOutput.target = "_blank"))
              : (b.value.length > 0 && $("#ProjectUrlPrompt").show(), projectOutput.removeAttribute("href"), projectOutput.removeAttribute("target"), b.focus(), b.select()))
        : ((commaproject.nodeValue = ""), (projectOutput.innerHTML = ""), projectOutput.removeAttribute("href"), projectOutput.removeAttribute("target"));
}

function changeOrganization() {
    unHighlight();
    var a = document.getElementById("OrganizationTextBox"),
        b = document.getElementById("OrganizationURLTextBox");
    a.value.length > 0
        ? ("" != authorOutput.innerHTML || "" != projectOutput.innerHTML ? (commaOrganization.nodeValue = ", ") : (commaOrganization.nodeValue = ""),
          (organizationOutput.innerHTML = a.value),
          isValidURL(b) && b.value.length > 0
              ? ($("#OrgUrlPrompt").hide(), (organizationOutput.href = b.value), (organizationOutput.target = "_blank"))
              : (b.value.length > 0 && $("#OrgUrlPrompt").show(), organizationOutput.removeAttribute("href"), organizationOutput.removeAttribute("target"), b.focus(), b.select()))
        : ((commaOrganization.nodeValue = ""), (organizationOutput.innerHTML = ""), organizationOutput.removeAttribute("href"), organizationOutput.removeAttribute("target"));
}

function checkInput(a) {
    handleLicensePrompt(), 0 == document.getElementById("titleTextBox").value.length && (titleOutput.innerHTML = '"This work"');
    var c = document.getElementById("output-html"),
        d = output.innerHTML.replace(' class="highlight"', ""),
        e = "<a></a>",
        f = new RegExp(e, "g");
    (d = d.replace(f, "")), (c.value = d);
}

function handleLicensePrompt() {
    0 == $("#LicenseListBox")[0].selectedIndex ? $("#LicensePrompt").show() : $("#LicensePrompt").hide();
}