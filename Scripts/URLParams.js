let urlParams = document.getElementById("Params");

const params = new URLSearchParams(window.location.search);

let projectFileName = "";
for (const [key, value] of params){
    if (key == "file")
    {
        projectFileName = value;
    }    
}

let fileData = "";


Promise.all([
    fetch("Files/" + projectFileName + ".txt").then(x => x.text()),
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
        bodyText.innerHTML += fileLines[i] + "<br>";
    }
}