let consoleTextRef = document.getElementById("loading-text");

let allConsoleText = [];

AppendToConsole("Loading webpage... 0%");

LoadPage();


function AppendToConsole(consoleText)
{
    allConsoleText.push(consoleText);

    if (allConsoleText.length > 25)
    {
        allConsoleText.shift();
    }

    consoleTextRef.innerText = "";
    for (let i = 0; i < allConsoleText.length; i++)
    {
        consoleTextRef.innerText += "\n" + allConsoleText[i];
    }
}

function LoadPage()
{
    setTimeout(function() { LoadPagePercentage(0) }, getRandomDelay())
}
function LoadPagePercentage(percentage)
{
    percentage += RandInt(1, 10);
    AppendToConsole("Loading webpage... " + Math.min(percentage, 100) + "%");
    if (percentage < 100)
    {
        setTimeout(function() { LoadPagePercentage(percentage) }, getRandomDelay() / 3)
    }
}

function getRandomDelay()
{
    return Math.floor(Math.random() * 1000); // Random delay in milliseconds between 0 and 1000
}
function RandInt(min, max)
{
    return Math.floor(Math.random() * (max - min) ) + min;
}
function RandNum(min, max)
{
    return Math.random() * (max - min) + min;
}