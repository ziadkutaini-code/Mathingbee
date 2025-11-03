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
  


  let al = 5, au = 20;
  
  let fml = 1, fmu = 9;
  let sml = 5, smu = 20;
  
  let sl = 5, su = 20;
  
  let fdl = 1, fdu = 9;
  let sdl = 5, sdu = 20;
  
  let negative = 0;

  let score = 0;
  let skipsLeft = 5;
  let started = false;
  let totalSeconds = 120;
  let timer = null;
  let currentAnswer = null;
  let attempted = 0;
  let correct = 0;

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
          al = 5; au = 20;
          
          fml = 1; fmu = 9;
          sml = 5; smu = 20;
          
          sl = 5; su = 20;
          
          fdl = 1; fdu = 9;
          sdl = 5; sdu = 20;
          
          negative = 0;
          break;
          
        case 6:
          al = 10; au = 30;
          
          fml = 5; fmu = 9;
          sml = 5; smu = 20;
          
          sl = 10; su = 30;
          
          fdl = 5; fdu = 9;
          sdl = 5; sdu = 20;
          
          negative = 0;
          break;
          
        case 7:
          al = 15; au = 40;
          
          fml = 6; fmu = 11;
          sml = 15; smu = 40;
          
          sl = 15; su = 40;
          
          fdl = 6; fdu = 11;
          sdl = 15; sdu = 40;
          
          negative = 0;
          break;
          
        case 8:
          al = 20; au = 50;
          
          fml = 6; fmu = 11;
          sml = 15; smu = 50;
          
          sl = 20; su = 50;
          
          fdl = 6; fdu = 11;
          sdl = 15; sdu = 50;
          
          negative = 0;
          break;
          
        case 9:
          al = 25; au = 60;
          
          fml = 7; fmu = 11;
          sml = 15; smu = 60;
          
          sl = 25; su = 60;
          
          fdl = 7; fdu = 11;
          sdl = 15; sdu = 60;
          
          negative = 1;
          break;
        
        case 10:
          al = 25; au = 70;
          
          fml = 7; fmu = 11;
          sml = 15; smu = 70;
          
          sl = 25; su = 70;
          
          fdl = 7; fdu = 11;
          sdl = 15; sdu = 70;
          
          negative = 1;
          break;
        
        case 11:
          al = 25; au = 80;
          
          fml = 7; fmu = 11;
          sml = 15; smu = 80;
          
          sl = 25; su = 80;
          
          fdl = 7; fdu = 11;
          sdl = 15; sdu = 80;
          
          negative = 1;
          break;
        
        case 12:
          al = 25; au = 90;
          
          fml = 7; fmu = 11;
          sml = 15; smu = 90;
          
          sl = 25; su = 90;
          
          fdl = 7; fdu = 11;
          sdl = 15; sdu = 90;
          
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
    const op = ops[randInt(0, ops.length-1)];
    let a, b, text, ans;
    
    // ADDITION
    if(op === '+'){
      a = randInt(al, au); 
      b = randInt(al, au);
      ans = a + b;
      text = `${a} + ${b}`;}
    
    // SUBTRACTION
    else if (op === '-') {
      a = randInt(sl, su);
      b = randInt(sl, su);

      if (negative === 0) {
        if (b > a) [a, b] = [b, a]; // ensure non-negative answer
      }

      ans = a - b;
      text = `${a} - ${b}`;
    }

    // MULTIPLICATION
    else if(op === '*'){
      a = randInt(fml,fmu); 
      b = randInt(sml,smu);
      
      ans = a * b;
      text = `${a} × ${b}`;} 
    
    // DIVISION
    else if(op === '/'){
        let q, b, a;
        do {
            q = randInt(1, 100); // the integer result
            b = randInt(fdl, fdu); // potential divisor
            a = b * q;
        } while(a > sdu);        // repeat until a <= 20

        ans = q;                // integer solution
        text = `${a} ÷ ${b}`;}
    
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
