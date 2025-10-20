let urlParams = document.getElementById("Params");

const params = new URLSearchParams(window.location.search);

let pageNumber = 0;
for (const [key, value] of params){
    if (key == "page")
    {
        pageNumber = value;
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
        if ("/link" in currentLine) {
            let text = currentLine.split(" /link ");
            bodyText.innerHTML += text[0];
            bodyText.innerHTML += '<a href="' + text[1] + '">Home</a>';
        }
        else {
            bodyText.innerHTML += fileLines[i] + "<br>";
        }
    }
}