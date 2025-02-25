let projectGrid = document.getElementById("projectGrid");

Promise.all([
    fetch("Files/projectGrid.txt").then(x => x.text()),
  ]).then(([gridData]) => LoadWebpage(gridData));
;

function LoadWebpage(data){
    let fileLines = data.split("\n");

    for (let i=0;i<fileLines.length;i++){

        let params = fileLines[i].split("\t")[0];
        let image = fileLines[i].split("\t")[1];
        let title = fileLines[i].split("\t")[2];
        let date = fileLines[i].split("\t")[3];
        let description = fileLines[i].split("\t")[4];

        projectGrid.innerHTML += '<div class="itemLink" onclick="location.href="project.html?file='
        + params + ';"><img src="Images/'
        + image + '.png" width="350px" height="196.875px" style="margin: 0px;" class=""><h1>'
        + title + '</h1><p>'
        + date + '</p><p>'
        + description + '</p></div>";';
    }
}