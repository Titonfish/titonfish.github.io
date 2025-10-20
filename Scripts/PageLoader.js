let urlParams = document.getElementById("Params");

const params = new URLSearchParams(window.location.search);

let pageNumber = 0;
let inventory;
for (const [key, value] of params){
    if (key == "page")
    {
        pageNumber = value;
    }
    if (key == "inventory")
    {
        inventory = Hex2Bin(value);
    }
}

let fileData = "";

Promise.all([
    fetch("Files/Pages/page" + pageNumber + ".txt").then(x => x.text()),
  ]).then(([fileData]) => LoadWebpage(fileData));
;

function LoadWebpage(data){
    let tabText = document.getElementById("tabText");
    let titleText = document.getElementById("titleText");
    let bodyText = document.getElementById("bodyText");

    let fileLines = data.split("\n");

    tabText.innerHTML = fileLines[0];
    titleText.innerHTML = fileLines[0] + inventory;

    for (let i=1;i<fileLines.length;i++){
        let currentLine = fileLines[i];
        currentLine.replaceAll("\t","     ");

        if (currentLine.includes("/option")) {
            let text = currentLine.split(" /option ");
            bodyText.innerHTML += text[0];
            bodyText.innerHTML += '<a href="' + text[1] + '">Home</a>';
        }
        else {
            bodyText.innerHTML += fileLines[i] + "<br>";
        }
    }
}

function checkHex(n) {
    return/^[0-9A-Fa-f]{1,64}$/.test(n)
}

function Hex2Bin(n) {
    if (!checkHex(n))
        return 0;
    return parseInt(n,16).toString(2)
}