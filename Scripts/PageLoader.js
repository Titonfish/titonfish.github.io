let urlParams = document.getElementById("Params");

const params = new URLSearchParams(window.location.search);

let pageNumber = 0;
let inventory = "";
for (const [key, value] of params){
    if (key == "page")
    {
        pageNumber = value;
    }
    if (key == "inventory")
    {
        inventory = DecodeInventory(value);
    }
    if (key == "id")
    {
        pageNumber = parseInt(value.split("i")[0].replace("p",""));
        inventory = value.split("i")[1];
    }
}

UpdatePageData(pageNumber, []);

function UpdatePageData(page, newItems){
    pageNumber = page;
    inventory = AddItem(inventory, newItems);
    
    let fileData = "";

    Promise.all([
        fetch("Files/Pages/page" + pageNumber + ".txt").then(x => x.text()),
    ]).then(([fileData]) => LoadWebpage(fileData));
    ;
}

function AppendExistingPage(text, reqItems, newItems) {
    if (reqItems == null){
        reqItems = [];
    }
    if (newItems == null){
        newItems = [];
    }
    if (!CheckItems(inventory, reqItems)){
        return;
    }
    inventory = AddItem(inventory, newItems);
    bodyText.innerHTML += "<br>" + text + "<br>";
}

function LoadWebpage(data){
    let tabText = document.getElementById("tabText");
    let titleText = document.getElementById("titleText");
    let bodyText = document.getElementById("bodyText");
    let optionText = document.getElementById("optionText");
    let copyButton = document.getElementById("copyButton");

    let fileLines = data.split("\n");

    tabText.innerHTML = fileLines[0];
    titleText.innerHTML = fileLines[0];
    bodyText.innerHTML = "";
    optionText.innerHTML = "";
    copyButton.addEventListener("click", CopyLinkToPage);

    for (let i=1;i<fileLines.length;i++){
        let currentLine = fileLines[i];
        currentLine = currentLine.replace("\\t", "&nbsp;&nbsp;&nbsp;&nbsp;");

        let customHTML = "";
        if (currentLine.includes("/option")) {
            customHTML = GetOptionHTML(currentLine, inventory);
            if (customHTML != "") {
                optionText.innerHTML += customHTML + "<br>";
            }
        }
        else if (currentLine.includes("/conditional")){
            customHTML = GetConditionalTextHTML(currentLine, inventory);
            if (customHTML != "") {
                bodyText.innerHTML += customHTML + "<br>";
            }
        }
        else if (currentLine.includes("/examine")){
            customHTML = GetExamineHTML(currentLine);
            if (customHTML != "") {
                optionText.innerHTML += customHTML + "<br>";
            }
        }
        else {
            bodyText.innerHTML += currentLine + "<br>";
        }
    }
}

// Use this command (/option "linkText" page# itemReq itemAdd) when giving the player the option to turn to a different page
function GetOptionHTML(text, inventory){
    let quoteSplitText = text.split('"');

    let linkText = quoteSplitText[1];

    let spaceSplitText = quoteSplitText[2].trim().split(' ');
    
    let page = spaceSplitText[0];

    let reqItems;
    if (spaceSplitText.length <= 1 || spaceSplitText[1] == "-" || spaceSplitText[1] == ""){
        reqItems = []
    }
    else{
        reqItems = spaceSplitText[1].split(',');
    }
    
    let newItems;
    if (spaceSplitText.length <= 2 || spaceSplitText[2] == "-" || spaceSplitText[2] == ""){
        newItems = []
    }
    else{
        newItems = spaceSplitText[2].split(',');
    }

    if (!CheckItems(inventory, reqItems)){
        return "";
    }
    return '<a onclick="UpdatePageData('+page +',[' + newItems +'])" href="javascript:void(0);">' + linkText + '</a>';
}
// Use this command (/conditional "conditionalText" itemReq) when displaying text only under certain conditions
function GetConditionalTextHTML(text, inventory)
{
    let quoteSplitText = text.split('"');

    let conditionalText = quoteSplitText[1];

    let reqItemsRaw = quoteSplitText[2].trim();

    let reqItems;
    if (reqItemsRaw == "-" || reqItemsRaw == ""){
        reqItems = []
    }
    else{
        reqItems = reqItemsRaw.split(',');
    }

    if (!CheckItems(inventory, reqItems)){
        return "";
    }
    return conditionalText;
}
// Use this command (/examine "linkText" "examineText" itemReq itemAdd) when giving the player the option to closely examine something without changing pages
function GetExamineHTML(text){
    let quoteSplitText = text.split('"');

    let linkText = quoteSplitText[1];
    let examineText = quoteSplitText[3];

    let spaceSplitText = quoteSplitText[4].trim().split(' ');

    let reqItems;
    if (spaceSplitText.length == 0 || spaceSplitText[0] == "-" || spaceSplitText[0] == ""){
        reqItems = []
    }
    else{
        reqItems = spaceSplitText[0].split(',');
    }
    
    let newItems;
    if (spaceSplitText.length <= 1 || spaceSplitText[1] == "-" || spaceSplitText[1] == ""){
        newItems = []
    }
    else{
        newItems = spaceSplitText[1].split(',');
    }

    return '<a onclick="AppendExistingPage(\''+ examineText +'\',['+ reqItems +'],['+newItems+'])" href="javascript:void(0);">' + linkText + '</a>';
}



function DecodeInventory(hex){
    hex = hex.toLowerCase();
    var out = "";
    for(var c of hex) {
        switch(c) {
            case '0': out += "0000"; break;
            case '1': out += "0001"; break;
            case '2': out += "0010"; break;
            case '3': out += "0011"; break;
            case '4': out += "0100"; break;
            case '5': out += "0101"; break;
            case '6': out += "0110"; break;
            case '7': out += "0111"; break;
            case '8': out += "1000"; break;
            case '9': out += "1001"; break;
            case 'a': out += "1010"; break;
            case 'b': out += "1011"; break;
            case 'c': out += "1100"; break;
            case 'd': out += "1101"; break;
            case 'e': out += "1110"; break;
            case 'f': out += "1111"; break;
            default: return "";
        }
    }



    return out;
}
function EncodeInventory(bin){
    bin = ExtendInventory(bin, Math.ceil(bin.length / 4.0) * 4);
    let out = "";
    while (bin != ""){
        switch(bin.substring(0,4)) {
            case "0000": out += "0"; break;
            case "0001": out += "1"; break;
            case "0010": out += "2"; break;
            case "0011": out += "3"; break;
            case "0100": out += "4"; break;
            case "0101": out += "5"; break;
            case "0110": out += "6"; break;
            case "0111": out += "7"; break;
            case "1000": out += "8"; break;
            case "1001": out += "9"; break;
            case "1010": out += "a"; break;
            case "1011": out += "b"; break;
            case "1100": out += "c"; break;
            case "1101": out += "d"; break;
            case "1110": out += "e"; break;
            case "1111": out += "f"; break;
            default: return "";
        }
        bin = bin.substring(4);
        
    }

    return out;
}

function CheckItems(inventory, itemsToCheck){
    for(var curItemCheck of itemsToCheck) {
        var curItemCheckInt = parseInt(curItemCheck);
        if(curItemCheckInt >= inventory.length || (curItemCheckInt < 0 && inventory[-curItemCheckInt] == '1') || inventory[curItemCheckInt] == '0'){
            return false;
        }
    }

    return true;
}
function AddItem(inventory, itemsToAdd){
    for(var curItemAdd of itemsToAdd) {
        var curItemAddInt = parseInt(curItemAdd);
        if (inventory.length < Math.abs(curItemAddInt) + 1){
            inventory = ExtendInventory(inventory, Math.abs(curItemAddInt) + 1);
        }
        if (curItemAddInt < 0){
            inventory = replaceAt(inventory, -curItemAddInt,'0');
        }
        else{
            inventory = replaceAt(inventory, curItemAddInt,'1');
        }
    }

    inventory = ExtendInventory(inventory, Math.ceil(inventory.length / 4.0) * 4);

    return inventory;
}
function ExtendInventory(inventory, value){
    return inventory + '0'.repeat(Math.max(value - inventory.length,0));
}

function replaceAt(string, index, replacement) {
    return string.substring(0, index) + replacement + string.substring(index + replacement.length);
}
function CopyLinkToPage(){
    console.log("https://titonfish.github.io/page.html?id=p" + pageNumber + "i" + EncodeInventory(inventory));
    navigator.clipboard.writeText("https://titonfish.github.io/page.html?id=p" + pageNumber + "i" + EncodeInventory(inventory));
}