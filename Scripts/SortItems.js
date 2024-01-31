info = {"9/4/2022 - v0.0.0": ["Created the base devlog website template, and created a program to easily add updates to the game. However, the game itself currently doesn't exist, so the title [INSERT NAME HERE] is replacing any mention of whatever possible game there will be eventually."], "9/5/2022 - v0.0.1": ["reeee", "https://www.youtube.com/embed/8rDDsGpVBB8"]};

let content = document.getElementById("Content");
let submitButton = document.getElementById("Submit");
let sortOrder = document.getElementById("SortOrder");

for (let i=Object.keys(info).length - 1; i>=0; i--){
    content.innerHTML += "<h2>" + Object.keys(info)[i] + "</h2>";
    for (let j in Object.values(info)[i]){
        var curText = Object.values(info)[i][j];
        var fileType = curText.slice(-4);
        
        if (fileType == ".png"){
            content.innerHTML += "<img src=\"media/" + curText + "\" alt=\"" + curText + "\">";
        }
        else if (fileType == ".mp4"){
            content.innerHTML += "<video controls><source src=\"media/" + curText + "\" type=\"video/mp4\"></video>"
        }
        else if (fileType == ".mp3"){
            content.innerHTML += "<audio controls><source src=\"media/" + curText + "\" type=\"audio/mp3\"></audio>"
        }
        else if (curText.includes("/embed/")){
            content.innerHTML += "<iframe src = \"" + curText + "\" width=640 height=360 frameborder=\"0\"allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\"allowfullscreen></iframe>";
        }
        else{
            content.innerHTML += "<h3>" + curText + "</h3>";
        }
    }
}

submitButton.onclick = function(){
    content.innerHTML = "";
    var reverse = sortOrder.options[sortOrder.selectedIndex].value == "newold";
    for (let i=(reverse ? Object.keys(info).length - 1 : 0); reverse ? i>=0 : i < Object.keys(info).length; reverse ? i-- : i++){
        content.innerHTML += "<h2>" + Object.keys(info)[i] + "</h2>";
        for (let j in Object.values(info)[i]){
            var curText = Object.values(info)[i][j];
            var fileType = curText.slice(-4);
            
            if (fileType == ".png"){
                content.innerHTML += "<img src=\"media/" + curText + "\" alt=\"" + curText + "\">";
            }
            else if (fileType == ".mp4"){
                content.innerHTML += "<video controls><source src=\"media/" + curText + "\" type=\"video/mp4\"></video>"
            }
            else if (fileType == ".mp3"){
                content.innerHTML += "<audio controls><source src=\"media/" + curText + "\" type=\"audio/mp3\"></audio>"
            }
            else if (curText.includes("/embed/")){
                content.innerHTML += "<iframe src = \"" + curText + "\" width=640 height=360 frameborder=\"0\"allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\"allowfullscreen></iframe>";
            }
            else{
                content.innerHTML += "<h3>" + curText + "</h3>";
            }
        }
    }
    }