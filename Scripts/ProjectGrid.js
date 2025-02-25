let projectGrid = document.getElementById("ProjectGrid");
let submitButton = document.getElementById("Submit");
let sortOrder = document.getElementById("SortOrder");
let showGames = document.getElementById("GamesCheckbox");
let showVideos = document.getElementById("VideosCheckbox");

let gridReversed = false;
let doShowGames = true;
let doShowVideos = true;

LoadWebpage();

function LoadWebpage(){
    Promise.all([
        fetch("Files/projectGrid.txt").then(x => x.text()),
      ]).then(([gridData]) => UpdateProjectGrid(gridData));
    ;
}

function UpdateProjectGrid(data){
    projectGrid.innerHTML = "";

    let fileLines = data.split("\n");

    if (gridReversed){
        for (let i=fileLines.length-1;i>=0;i--){
            if (fileLines[i].split("\t")[0] == "game"){
                continue;
            }

            let params = fileLines[i].split("\t")[1];
            let image = fileLines[i].split("\t")[2];
            let title = fileLines[i].split("\t")[3];
            let date = fileLines[i].split("\t")[4];
            let description = fileLines[i].split("\t")[5];
    
            projectGrid.innerHTML += '<div class="itemLink" onclick="location.href=' + "'project.html?file="
            + params + "';" + '"><img src="Images/'
            + image + '.png" width="350px" height="196.875px" style="margin: 0px;" class=""><h1>'
            + title + '</h1><p>'
            + date + '</p><p>'
            + description + '</p></div>';
        }
    }
    else{
        for (let i=0;i<fileLines.length;i++){
            if ((fileLines[i].split("\t")[0] == "game" && showGames) || (fileLines[i].split("\t")[0] == "video" && showVideos)){
            
            let params = fileLines[i].split("\t")[1];
            let image = fileLines[i].split("\t")[2];
            let title = fileLines[i].split("\t")[3];
            let date = fileLines[i].split("\t")[4];
            let description = fileLines[i].split("\t")[5];
    
            projectGrid.innerHTML += '<div class="itemLink" onclick="location.href=' + "'project.html?file="
            + params + "';" + '"><img src="Images/'
            + image + '.png" width="350px" height="196.875px" style="margin: 0px;" class=""><h1>'
            + title + '</h1><p>'
            + date + '</p><p>'
            + description + '</p></div>';
                }
            }
    }
    
}

submitButton.onclick = function(){
    gridReversed = sortOrder.options[sortOrder.selectedIndex].value == "oldnew";
    /*showGames = doShowGames.checked;
    showVideos = doShowVideos.checked;*/

    LoadWebpage();
}