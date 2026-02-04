const questionEl = document.getElementById('question');
const answerInput = document.getElementById('answerInput');
const scoreEl = document.getElementById('score');
const skipsEl = document.getElementById('skips');
const skipBtn = document.getElementById('skipBtn');
const startBtn = document.getElementById('startBtn');
const timerEl = document.getElementById('timer');
const timeRemainingEl = document.getElementById('timeRemaining');
const correctCountEl = document.getElementById('correctCount');
const attemptedCountEl = document.getElementById('attemptedCount');
const accuracyEl = document.getElementById('accuracy');
const resultOverlay = document.getElementById('resultOverlay');
const finalScore = document.getElementById('finalScore');
const finalCorrect = document.getElementById('finalCorrect');
const finalAttempt = document.getElementById('finalAttempt');
const finalAcc = document.getElementById('finalAcc');
const bar = document.getElementById('bar');
const resetBtn = document.getElementById('resetBtn');
const helpBtn = document.getElementById('helpBtn');
const closeResult = document.getElementById('closeResult');
const header = document.querySelector('header');
const gradeButton = document.getElementById('gradeButton');
const gradeList = document.getElementById('gradeList');
const selectedGrade = document.getElementById('selectedGrade');
const recentQuestions = [];
const RECENT_LIMIT = 15;


let add_low_lim = 5, add_up_lim = 20;
  
let first_multi_low_lim = 2, first_multi_up_lim = 9;
let second_multi_low_lim = 5, second_multi_up_lim = 20;
  
let sub_low_lim = 5, sub_upper_lim = 20;
  
let first_div_low_lim = 2, first_div_up = 11;
let second_div_lim = 1, second_div_up_lim = 100;
  
let negative = 0;

let score = 0;
let skipsLeft = 5;
let started = false;
let totalSeconds = 120;
let timer = null;
let currentAnswer = null;
let attempted = 0;
let correct = 0;
let allowed_num_divisions = 0;

// Toggle dropdown
gradeButton.addEventListener('click', () => {
    gradeList.classList.toggle('show');
});

// Handle grade selection
gradeList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const grade = Number(e.target.getAttribute('data-grade'));
        selectedGrade.textContent = `Grade ${grade}`;
        gradeList.classList.remove('show');

        // Change variable values depending on grade
        switch (grade) {
            case 5:
            add_low_lim = 5; add_up_lim = 20;
          
            first_multi_low_lim = 2; first_multi_up_lim = 9;
            second_multi_low_lim = 5; second_multi_up_lim = 20;
          
            sub_low_lim = 5; sub_upper_lim = 20;
          
            first_div_low_lim = 2; first_div_up = 11;
            second_div_lim = 1; second_div_up_lim = 100;
          
            negative = 0;
            break;
          
            case 6:
            add_low_lim = 10; add_up_lim = 30;
          
            first_multi_low_lim = 5; first_multi_up_lim = 9;
            second_multi_low_lim = 5; second_multi_up_lim = 20;
          
            sub_low_lim = 10; sub_upper_lim = 30;
          
            first_div_low_lim = 2; first_div_up = 11;
            second_div_lim = 1; second_div_up_lim = 100;
          
            negative = 0;
            break;
          
            case 7:
            add_low_lim = 15; add_up_lim = 40;
          
            first_multi_low_lim = 6; first_multi_up_lim = 11;
            second_multi_low_lim = 15; second_multi_up_lim = 40;
          
            sub_low_lim = 15; sub_upper_lim = 40;
          
            first_div_low_lim = 2; first_div_up = 11;
            second_div_lim = 1; second_div_up_lim = 100;
          
            negative = 0;
            break;
          
            case 8:
            add_low_lim = 20; add_up_lim = 50;
          
            first_multi_low_lim = 6; first_multi_up_lim = 11;
            second_multi_low_lim = 15; second_multi_up_lim = 50;
          
            sub_low_lim = 20; sub_upper_lim = 50;
          
            first_div_low_lim = 2; first_div_up = 11;
            second_div_lim = 1; second_div_up_lim = 100;
          
            negative = 0;
            break;
          
            case 9:
            add_low_lim = 25; add_up_lim = 60;
          
            first_multi_low_lim = 7; first_multi_up_lim = 11;
            second_multi_low_lim = 15; second_multi_up_lim = 60;
          
            sub_low_lim = 25; sub_upper_lim = 60;
          
            first_div_low_lim = 2; first_div_up = 5;
            second_div_lim = 1; second_div_up_lim = 1000;
          
            negative = 1;
            break;
        
            case 10:
            add_low_lim = 25; add_up_lim = 70;
          
            first_multi_low_lim = 7; first_multi_up_lim = 11;
            second_multi_low_lim = 15; second_multi_up_lim = 70;
          
            sub_low_lim = 25; sub_upper_lim = 70;
          
            first_div_low_lim = 2; first_div_up = 5;
            second_div_lim = 1; second_div_up_lim = 1000;
          
            negative = 1;
            break;
        
            case 11:
            add_low_lim = 25; add_up_lim = 80;
          
            first_multi_low_lim = 7; first_multi_up_lim = 11;
            second_multi_low_lim = 15; second_multi_up_lim = 80;
          
            sub_low_lim = 25; sub_upper_lim = 80;
          
            first_div_low_lim = 2; first_div_up = 5;
            second_div_lim = 1; second_div_up_lim = 1000;
          
            negative = 1;
            break;
        
            case 12:
            add_low_lim = 25; add_up_lim = 90;
          
            first_multi_low_lim = 2; first_multi_up_lim = 5;
            second_multi_low_lim = 1; second_multi_up_lim = 1000;
          
            sub_low_lim = 25; sub_upper_lim = 90;
          
            first_div_low_lim = 7; first_div_up = 11;
            second_div_lim = 15; second_div_up_lim = 90;
          
            negative = 1;
            break;
        }
    }
});

window.addEventListener('click', (e) => {
    if (!gradeButton.contains(e.target) && !gradeList.contains(e.target)) {
        gradeList.classList.remove('show');
    }
});
// define 
function randInt(min, max){
    return Math.floor(Math.random()*(max - min + 1)) +min;
}

function pickProblem(){
    // operations + - * /
    const ops = ['+','-','*','/'];
    
    // pick op randomly, but ensure variety
    const op = ops[randInt(0, ops.length - 1)];
    let a, b, text, ans;
    
    // ADDITION
    if(op === '+'){
        function addition(){
            a = randInt(add_low_lim, add_up_lim); 
            b = randInt(add_low_lim, add_up_lim);
            ans = a + b;
            text = `${a} + ${b}`;
        }
        addition();
    }
    
    // SUBTRACTION
    else if (op === '-') {
        function subtraction(){
            a = randInt(sub_low_lim, sub_upper_lim);
            b = randInt(sub_low_lim, sub_upper_lim);

            if (negative === 0) {
                if (b > a) [a, b] = [b, a]; // ensure non-negative answer
            }
        }
        subtraction();
        ans = a - b;
        text = `${a} - ${b}`;
    }
    

    

    // MULTIPLICATION
    else if(op === '*'){
        function multiplication(){
            a = randInt(first_multi_low_lim, first_multi_up_lim); 
            b = randInt(second_multi_low_lim, second_multi_up_lim);
            ans = a * b;
            text = `${a} × ${b}`;
        }
        multiplication();
    }
    
    // DIVISION
    else if(op === '/'){
        if (allowed_num_divisions === 3){
            pickProblem();
        } 
        else {
            function division(){
            let q, b, a;
            do {
                q = randInt(1, 100); // the integer result
                b = randInt(first_div_low_lim, first_div_up);
                if (b === q){
                    division();
                    return;
                }

                a = b * q;
            } while(a > second_div_up_lim);       
            ans = q;                 
            text = `${a} ÷ ${b}`;
            }
            division();
            allowed_num_divisions += 1;
        }
        
    }

    const signature = `${text}=${ans}`;
    if (recentQuestions.includes(signature)) {
        return pickProblem(); // try again
    }

    recentQuestions.push(signature);
    if (recentQuestions.length > RECENT_LIMIT) {
        recentQuestions.shift();
    }
    
    // safety: ensure ans is integer and within 1..999 (or 0 allowed)
    if(!Number.isFinite(ans) || Math.abs(ans) > 999) return pickProblem();
    currentAnswer = ans;
    questionEl.textContent = text;
    // accessibility focus
    answerInput.value = '';
    answerInput.focus();
    return {text,ans};
}
  
function updateStats(){
    scoreEl.textContent = score;
    skipsEl.textContent = skipsLeft;
    timeRemainingEl.textContent = `${totalSeconds}s`;
    correctCountEl.textContent = correct;
    attemptedCountEl.textContent = attempted;
    let acc = attempted === 0 ? 0 : Math.round((correct/attempted)*100);
    accuracyEl.textContent = acc + '%';
    // progress bar: percent of time elapsed
    const pct = (120 - totalSeconds) / 120 * 100;
    bar.style.width = `${pct}%`;
}

function startTimer(){
    if(timer) clearInterval(timer);
    timer = setInterval(() => {
        totalSeconds--;
        updateStats();
        timerEl.textContent = formatTime(totalSeconds);
        if(totalSeconds <= 0){
            endTest();
        }
    }, 1000);
}

function formatTime(sec){
    if(sec < 0) sec = 0;
    const mm = Math.floor(sec/60).toString().padStart(2,'0');
    const ss = (sec%60).toString().padStart(2,'0');
    return `${mm}:${ss}`;
}

function nextQuestion(){
    pickProblem();
    updateStats();
}

function registerCorrect(){
    score++;
    correct++;
    attempted++;
    updateStats();
    // small visual feedback
    flash('#10b981');
    // new question
    setTimeout(nextQuestion, 160);
}

function registerWrongAttempt(){
    attempted++;
    updateStats();
    flash('#ef4444');
}

function flash(color){
    const old = questionEl.style.background;
    questionEl.style.transition = 'box-shadow 0.12s ease';
    questionEl.style.boxShadow = `0 8px 28px ${color}55`;
    setTimeout(()=> { questionEl.style.boxShadow = ''; }, 140);
}

function endTest(){
    started = false;
    if(timer) clearInterval(timer);
    // show modal with results
    finalScore.textContent = `${score} pts`;
    finalCorrect.textContent = correct;
    finalAttempt.textContent = attempted;
    finalAcc.textContent = attempted === 0 ? 0 : Math.round((correct/attempted)*100);
    resultOverlay.style.display = 'flex';
    // disable inputs
    answerInput.disabled = true;
    skipBtn.disabled = true;
    startBtn.disabled = false;
}

// Input auto-check
answerInput.addEventListener('input', (e) => {
if(!started) return;
    const raw = e.target.value.trim();
    // allow leading + or - maybe
    if(raw === '' || raw === '-' || raw === '+') return;
    // allow numbers only (integer)
    // remove commas/spaces
    const cleaned = raw.replace(/[,\s]/g,'');
    // parse int
    const asNum = Number(cleaned);
    // if not a valid number, ignore
    if(Number.isNaN(asNum)) return;
    // if equals current answer exactly -> correct
    if(asNum === currentAnswer){
      registerCorrect();
    } else {
    }
});

// Skip
skipBtn.addEventListener('click', () => {
    if(!started) return;
    if(skipsLeft <= 0) return;
    skipsLeft--;
    attempted++; // count skip as attempted
    // quickly show skipped feedback
    flash('#f59e0b');
    nextQuestion();
});

// Start
startBtn.addEventListener('click', () => {
    // reset state and start
    score = 0; skipsLeft = 5; totalSeconds = 120; attempted = 0; correct = 0;
    started = true;
    answerInput.disabled = false;
    skipBtn.disabled = false;
    startBtn.disabled = true;
    pickProblem();
    updateStats();
    timerEl.textContent = formatTime(totalSeconds);
    startTimer();
});

// Reset button: reset everything
resetBtn.addEventListener('click', () => {
    if(timer) clearInterval(timer);

    score = 0; skipsLeft = 5; totalSeconds = 120; attempted = 0; correct = 0;
    started = false;

    answerInput.value = '';
    answerInput.disabled = false;
    
    startBtn.disabled = false;
    skipBtn.disabled = false;
    
    questionEl.textContent = 'Press "Start" to begin';
    updateStats();
    timerEl.textContent = formatTime(totalSeconds);
    bar.style.width = '0%';
});

// Help button
helpBtn.addEventListener('click', () => {
    alert('Two-minute mental math test.\n\n• Start then solve problems that appear.\n• Answers are integers. Division is integer division (no fractions).\n• Type the correct answer and it will auto-advance.\n• You have 5 skips. Time is 2:00.\n• Press Enter to submit manually.');
});

// close result overlay
closeResult.addEventListener('click', () => {
    resultOverlay.style.display = 'none';
});

// Initialize UI
updateStats();
timerEl.textContent = formatTime(totalSeconds);
questionEl.textContent = 'Press "Start" to begin';
  
    let canSkip = true; // One global flag

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
      event.preventDefault(); // Stop space typing in input

      if (!started) return;       // Only skip during test
      if (!canSkip) return;       // Debounce
      if (skipsLeft <= 0) return; // No skips left

      canSkip = false;            // Lock skipping
      skipBtn.click();            // Trigger skip

      setTimeout(() => {          // Unlock skip after 300ms
        canSkip = true;
      }, 200);
    }
  });
