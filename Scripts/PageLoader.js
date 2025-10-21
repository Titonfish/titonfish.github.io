let urlParams = document.getElementById("Params");

const params = new URLSearchParams(window.location.search);

let pageNumber = 0;
let inventory = [];
for (const [key, value] of params){
    if (key == "page")
    {
        pageNumber = value;
    }
    if (key == "inventory")
    {
        inventory = Hex2bin(value);
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
    titleText.innerHTML = fileLines[0];

    for (let i=1;i<fileLines.length;i++){
        let currentLine = fileLines[i];
        currentLine.replaceAll("\\t","     ");

        if (currentLine.includes("/option")) {
            let text = currentLine.split(" /link ");
            bodyText.innerHTML += text[0];
            bodyText.innerHTML += '<a href="' + text[1] + '">Home</a><br>';
        }
        else {
            bodyText.innerHTML += fileLines[i] + "<br>";
        }
    }
}

function Hex2bin(hex){
    hex = hex.replace("0x", "").toLowerCase();
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