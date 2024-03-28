let consoleText = document.getElementById('loading-text');

consoleText.innerText = 'Loading webpage... 0%';

let count = 0;

while (count < 100)
{
    count ++;
    AppendText("hello", 1000);
}

function AppendText(consoleNewLine, time)
{
    let appendInterval = setInterval(()=>
    {
        consoleText.innerText += "\n" + consoleNewLine;
        clearInterval(appendInterval);
    }, time);
}

function getRandomDelay() {
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