'use strict';

const api_key = 'Q1N8QTIJwepR9x26wJqKMAED';
const sdk_url = 'https://sdk.canva.com/designbutton/v2/api.js';

function addCanvaDesignButtonSpan(elementId, buttonText) {
    let canvaDesignButtonDiv = document.getElementById(elementId);
    canvaDesignButtonDiv.innerHTML = '<span data-api-key=' +
        api_key +
        ' class="canva-design-button" style="display:none;">' + buttonText + '</span>';
}

function addCreateDisignButton() {
    addCanvaDesignButtonSpan("canva-design-button-div", "Create Design");
    updateAllButtonAttributes("canva-design-button-div");
    loadDesignButtonSDK();
}

function addEditDisignButton() {
    console.log("addEditDesignButton");
    let elementId = "canva-design-edit-button-div";
    addCanvaDesignButtonSpan(elementId, "Edit Design");
    updateAllButtonAttributes("canva-design-edit-button-div");
    let canvaDesignButtonDiv = document.getElementById(elementId);
    let canvaButtonSpan = canvaDesignButtonDiv.getElementsByClassName("canva-design-button")[0];
    canvaButtonSpan.removeAttribute("data-design-type");
    let designId = document.getElementById('designId').value;
    canvaButtonSpan.setAttribute("data-design-id", designId);
    loadDesignButtonSDK();
}

function setCanvaButtonAttribute(elementId, attribute, value) {
    let canvaDesignButtonDiv = document.getElementById(elementId);
    let canvaButtonSpan = canvaDesignButtonDiv.getElementsByClassName("canva-design-button")[0];
    canvaButtonSpan.setAttribute(attribute, value);
}

function loadDesignButtonSDK() {
    (function(c, a, n) {
        var w = c.createElement(a),
            s = c.getElementsByTagName(a)[0];
        w.src = n;
        s.parentNode.insertBefore(w, s);
    })(document, 'script', document.getElementById('data-sdk-url').value);
}

function updateButtonAttributes() {
    let inputId = this.id;
    let inputValue = document.getElementById(this.id).value;
    console.log(inputValue);
    document.getElementById("canva-design-button").setAttribute(inputId, inputValue);
}

function updateAllButtonAttributes(elementId) {
    let index;
    let attributesDiv = document.getElementById('button-attrifutes');
    let inputs = attributesDiv.getElementsByTagName('input');

    for (index = 0; index < inputs.length; ++index) {
        let inputId = inputs[index].id;
        let inputValue = document.getElementById(inputId).value;
        setCanvaButtonAttribute(elementId, inputId, inputValue)
    }
}

function getButtonAttributes() {
    document.getElementById("canva-design-button").className = "";
    let index;
    let inputs = document.getElementsByTagName('input');
    for (index = 0; index < inputs.length; ++index) {
        let inputId = inputs[index].id;
        let inputValue = document.getElementById(inputId).value;
        document.getElementById("canva-design-button").setAttribute(inputId, inputValue);
    }
    document.getElementById("canva-design-button").className = "canva-design-button";
    //loadDesignButtonSDK();
    addCanvaDesignButtonSpan();
}

function onDesignIdChange(event) {
    let div = document.getElementById("canva-design-edit-button-div")
    let span = div.getElementsByTagName("span")[1];
    span.setAttribute("data-design-id", event.target.value);
}

window.addEventListener('load', function() {

    document.getElementById("data-sdk-url").value = sdk_url;
    document.getElementById("data-api-key").value = api_key;
    document.getElementById('apply-button').onclick = addCreateDisignButton;
    document.getElementById('edit-button').onclick = addEditDisignButton;
})

window.designCallback = function(data) {
    console.log(data);
    document.getElementById('json-container').innerHTML = JSON.stringify(data, null, 2);
    var url = data.exportUrl;
    var img = document.createElement("img");

    img.src = url;
    var src = document.getElementById("banner");
    src.appendChild(img);
}
window.designCloseCallback = function() {
    alert("designCloseCallback function called");
}