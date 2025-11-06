// global variables
let level, answer, score;
let nameCap = "";
let start;
let timeInterval;
const levelArr = document.getElementsByName("level")
const scoreArr = [];
const timeArr = [];
const date = document.getElementById("date");

date.textContent = time();

const giveUpBtn = document.getElementById("giveUpBtn");
const fastestEl = document.getElementById("fastestTime");
const totalTimeEl = document.getElementById("totalTime");
const avgTimeEl = document.getElementById("avgTime");

// add event listeners
nameBtn.addEventListener("click", nameCheck)
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUpBtn.addEventListener("click", giveUp);

//to start disable
 playBtn.disabled = true;
  guessBtn.disabled = true;
  guess.disabled = true;
  giveUpBtn.disabled = true;
  for (let i = 0; i < levelArr.length; i++) {
  levelArr[i].disabled = true;
}
const nameText = document.getElementById("nameText");
const playTimer = document.getElementById("timer");

function nameCheck() {
    let name = document.getElementById("nameInput").value;
    if (name == ""){
        nameText.textContent = "Please enter a valid name";
        return; 
    }
    nameCap = name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
    nameText.textContent = "Welcome, " + nameCap + ", to the Guessing Game!";
    nameBtn.disabled = true;
    document.getElementById("nameInput").disabled = true;

    for (let i = 0; i < levelArr.length; i++) {
    levelArr[i].disabled = false;
  }
  playBtn.disabled = false;
}
let totalTime = 0;
let fastestTime = Infinity;
function play(){
  score = 0; // sets score to 0 every new game
  playBtn.disabled = true;
  guessBtn.disabled = true;
  giveUpBtn.disabled = true;
  guess.disabled = true;

  for(let i=0; i<levelArr.length; i++){
      if(levelArr[i].checked){
          level = levelArr[i].value;
      }
      levelArr[i].disabled = true;
  }
  //guess allowed
  guessBtn.disabled = false;
  guess.disabled = false;
  giveUpBtn.disabled = false;

  msg.textContent = nameCap + ", guess a number from 1-" + level;
  answer = Math.floor(Math.random()*level)+1;
  guess.placeholder = answer;

  // start timer
  start = new Date().getTime();
  if(timeInterval) clearInterval(timeInterval);
  timeInterval = setInterval(updateTimer, 100);
}
function makeGuess(){
  let userGuess = parseInt(guess.value);
  if(isNaN(userGuess) || userGuess < 1 || userGuess > level){
      msg.textContent = "Enter a VALID #1-" + level;
      return;
  }
  score ++; // valid guess add 1 to score
  let guessDiff = Math.abs(userGuess-answer);
  let temperature = "";
  if(level==3){
    if(guessDiff==0){
        clearInterval(timeInterval);
        let rating = scoreRating(score,level);
        updateTimer();
        msg.textContent = "You got it " + nameCap + "! It took you " + score + " tries. Your score was: " + rating + ". Press play to play again";
        updateScore();
        recordTime();
        reset();
        return;
    }   else if (guessDiff<=0.5){
            temperature = "hot";
    }
        else if(guessDiff<=1){
            temperature = "warm";
        }
        else{
            temperature = "cold";
        }
    }
    else if(level==10){
        if(guessDiff==0){
        clearInterval(timeInterval);
        let rating = scoreRating(score,level);
        updateTimer();
        msg.textContent = "You got it " + nameCap + "! It took you " + score + " tries. Your score was: " + rating + ". Press play to play again";
        updateScore();
        recordTime();
        reset();
        return;
    }   else if (guessDiff<=1){
            temperature = "hot";
    }
        else if(guessDiff<=2){
            temperature = "warm";
        }
        else{
            temperature = "cold";
        }
    }
    else{
        if(guessDiff==0){
            clearInterval(timeInterval);
         let rating = scoreRating(score,level);
        updateTimer();
        msg.textContent = "You got it " + nameCap + "! It took you " + score + " tries. Your score was: " + rating + ". Press play to play again";
        updateScore();
        recordTime();
        reset();
        return;
    }   else if (guessDiff<=5){
            temperature = "hot";
    }
        else if(guessDiff<=20){
            temperature = "warm";
        }
        else{
            temperature = "cold";
        }
    }
  

  if(userGuess < answer){
      msg.textContent = "Too low, " + nameCap + ", you are " + temperature + ", try again";
  }
  else{
      msg.textContent = "Too high, " + nameCap + ", you are " + temperature +  ", try again";

}
}

function giveUp(){
    clearInterval(timeInterval);
    msg.textContent = 
    "What a shame, " + nameCap + ". The answer was " + answer + ". Your score was: Bad. Press play to try again:"
    score = parseInt(level);
    updateScore();
    updateTimer();
    recordTime();
    reset();
}

function reset(){
   guessBtn.disabled = true;
   guess.disabled = true;
   giveUpBtn.disabled = true;
   guess.value = "";
   guess.placeholder = "";
   playBtn.disabled = false;
   for(let i=0; i<levelArr.length; i++){
      levelArr[i].disabled = false;
  }
}

function updateScore(){
   scoreArr.push(score);
   scoreArr.sort((a,b)=>a-b); // sort by increasing order
   let lb = document.getElementsByName("leaderboard");
   wins.textContent = "Total wins: " + scoreArr.length;
   let sum = 0;
   for(let i=0; i<scoreArr.length; i++){
       sum += scoreArr[i];
       if(i<lb.length){
           lb[i].textContent = scoreArr[i];
       }
   }
   let avg = sum/scoreArr.length;
   avgScore.textContent = "Average Score: " + avg.toFixed(2)
}

function updateTimer() {
    let stop = new Date().getTime();
    let time = (stop - start)/1000;
    playTimer.textContent = "Timer : " + time.toFixed(2) + " seconds";
}

function recordTime(){
    let stop = new Date().getTime();
    let time = (stop-start)/1000;
    timeArr.push(time);
    totalTime += time;
    if (time < fastestTime) fastestTime = time;
    
    let avg = totalTime / timeArr.length;
    
     fastestEl.textContent = "Fastest Game: " + fastestTime.toFixed(2) + " seconds";
    totalTimeEl.textContent = "Total Time: " + totalTime.toFixed(2) + " seconds";
    avgTimeEl.textContent = "Average Time: " + avg.toFixed(2) + " seconds";
}

function scoreRating(score, level){
    if(level==3){
        if(score==1)
            return "Great";
        else if(score==2)
            return "Okay";
        else
            return "Bad"
    }
    if(level==10){
        if(score<=2)
            return "Great";
        else if(score<=5)
            return "Okay";
        else
            return "Bad"
    }
    if(level<=100){
        if(score<=5)
            return "Great";
        else if(score<=12)
            return "Okay";
        else
            return "Bad"
    }
}

function time(){
   let d = new Date();
   // concatenate a strong with all the date info
  // d = d.getFullYear() + " " + d.getTime();
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
let currentdate=d.getDate();
let month = monthNames[d.getMonth()]
let dateYear = d.getFullYear();

let dateSuffix;
if (currentdate % 10 === 1 && currentdate !== 11) {
    dateSuffix = "st";
} else if (currentdate % 10 === 2 && currentdate !== 12) {
    dateSuffix = "nd";
} else if (currentdate % 10 === 3 && currentdate !== 13) {
    dateSuffix = "rd";
} else {
    dateSuffix = "th";
}
let hours = d.getHours();
let minutes = d.getMinutes();
let seconds = d.getSeconds();

if (minutes < 10) {
    minutes = "0" + minutes
}
if (seconds < 10){
    seconds = "0" + seconds
}
let today = "Today's date is " + month + " " + currentdate + dateSuffix + ", " + dateYear + " and the time is " + hours + ":" + minutes + ":" + seconds;
date.textContent = today
}
setInterval(time, 1000);
