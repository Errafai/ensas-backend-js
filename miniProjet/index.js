// index.js - handles both the index form and the quiz page (qcm.html)

function qs(selector, parent=document){return parent.querySelector(selector)}

// URL builder for OpenTDB
function buildApiUrl(opts){
  const params = new URLSearchParams();
  params.set('amount', String(opts.amount || 10));
  if(opts.category && opts.category !== 'any') params.set('category', opts.category);
  if(opts.difficulty && opts.difficulty !== 'any') params.set('difficulty', opts.difficulty);
  if(opts.type && opts.type !== 'any') params.set('type', opts.type);
  if(opts.encode && opts.encode !== 'default') {
    // opentdb supports urlLegacy, url3986, base64
    params.set('encode', opts.encode);
  }
  return `https://opentdb.com/api.php?${params.toString()}`;
}

// helper: shuffle array
function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

// helper: decode HTML entities from API (handles base64 separately)
function decodeText(text, encode){
  if(!text) return '';
  if(encode === 'base64'){
    try{return atob(text);}catch(e){return text}
  }
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

// Page-specific logic
document.addEventListener('DOMContentLoaded', ()=>{
  if(document.body.contains(qs('#api-form'))){
    // Index page: handle form submit
    const form = qs('#api-form');
    form.addEventListener('submit', async (ev)=>{
      ev.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const opts = {
        amount: data.amount || 10,
        category: data.category,
        difficulty: data.difficulty,
        type: data.type,
        encode: data.encode
      };
      const url = buildApiUrl(opts);
      try{
        const res = await fetch(url);
        const json = await res.json();
        if(json.response_code !== 0){
          alert('No questions available with these settings. Try different options.');
          return;
        }
        // normalize and decode questions
        const questions = json.results.map(q=>{
          const correct = decodeText(q.correct_answer, opts.encode);
          const incorrect = q.incorrect_answers.map(a=>decodeText(a, opts.encode));
          const all = q.type === 'multiple' ? shuffle([correct, ...incorrect]) : [correct, ...incorrect];
          return {
            question: decodeText(q.question, opts.encode),
            correct_answer: correct,
            all_answers: all,
            type: q.type
          }
        });

        // save to sessionStorage and navigate to qcm.html
        sessionStorage.setItem('otdb_questions', JSON.stringify(questions));
        // include meta for later
        sessionStorage.setItem('otdb_meta', JSON.stringify({timestamp: Date.now(), opts}));
        window.location.href = './qcm.html';
      }catch(err){
        console.error(err);
        alert('Failed to fetch questions. Check your network and try again.');
      }
    });
  }

  // Quiz page renderer
  if(document.body.dataset.page === 'qcm'){
    const stored = sessionStorage.getItem('otdb_questions');
    if(!stored){
      document.body.innerHTML = '<main class="page"><section class="card"><p>No quiz found. Go back to start page.</p><p><a href="./index.html">Start over</a></p></section></main>';
      return;
    }
    const questions = JSON.parse(stored);
    renderQuiz(questions);
  }
});

function renderQuiz(questions){
  // create the main layout container
  const page = document.createElement('main');
  page.className = 'page';

  const card = document.createElement('section');
  card.className = 'card quiz-card';

  const title = document.createElement('h2');
  title.textContent = 'Quiz';
  card.appendChild(title);

  // create the form that will contain all questions at once
  const form = document.createElement('form');
  form.id = 'quiz-form';

  // For each question, render a question card with radio inputs
  questions.forEach((q, index) => {
    const questionCard = document.createElement('div');
    questionCard.className = 'question-card';

    const qHeader = document.createElement('div');
    qHeader.className = 'question-header';
    qHeader.textContent = `Question ${index + 1} of ${questions.length}`;

    const qText = document.createElement('div');
    qText.className = 'question';
    qText.textContent = q.question;

    const optionsWrapper = document.createElement('div');
    optionsWrapper.className = 'options';

    // render radio options so each question is a named group
    q.all_answers.forEach((answerText, ansIdx) => {
      const option = document.createElement('div');
      option.className = 'option';

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `q${index}`;
      input.id = `q${index}_a${ansIdx}`;
      input.value = answerText;

      const label = document.createElement('label');
      label.htmlFor = input.id;
      label.textContent = answerText;

      option.appendChild(input);
      option.appendChild(label);
      optionsWrapper.appendChild(option);
    });

    questionCard.appendChild(qHeader);
    questionCard.appendChild(qText);
    questionCard.appendChild(optionsWrapper);
    form.appendChild(questionCard);
  });

  // validate button
  const validateWrap = document.createElement('div');
  validateWrap.className = 'validate-wrap';
  const validateBtn = document.createElement('button');
  validateBtn.type = 'button';
  validateBtn.className = 'btn validate-btn';
  validateBtn.textContent = 'Validate';
  validateWrap.appendChild(validateBtn);

  // results container (initially empty)
  const resultsContainer = document.createElement('div');
  resultsContainer.id = 'results';
  resultsContainer.className = 'results card';
  resultsContainer.style.display = 'none';

  form.appendChild(validateWrap);
  card.appendChild(form);
  card.appendChild(resultsContainer);
  page.appendChild(card);

  // clear page and append
  document.body.innerHTML = '';
  document.body.appendChild(page);

  // Add interactivity: highlight selected labels
  document.querySelectorAll('.option input').forEach(input => {
    input.addEventListener('change', (e) => {
      const group = document.getElementsByName(input.name);
      group.forEach(r => {
        const lbl = document.querySelector(`label[for="${r.id}"]`);
        if(lbl) lbl.classList.toggle('selected', r.checked);
      });
    });
  });

  // Validate handler: compute score, mark answers, and scroll to results
  validateBtn.addEventListener('click', () => {
    const answers = [];
    questions.forEach((q, idx) => {
      const sel = form.querySelector(`input[name=q${idx}]:checked`);
      answers.push(sel ? sel.value : null);
    });

    // compute score
    let correctCount = 0;
    resultsContainer.innerHTML = '';

    questions.forEach((q, idx) => {
      const qRow = document.createElement('div');
      qRow.className = 'result-row';

      const qTitle = document.createElement('div');
      qTitle.className = 'question';
      qTitle.textContent = q.question;

      const opts = document.createElement('div');
      opts.className = 'answers';

      q.all_answers.forEach(ans => {
        const el = document.createElement('div');
        el.className = 'answer';
        el.textContent = ans;
        if(ans === q.correct_answer) el.classList.add('correct');
        const userAns = answers[idx];
        if(userAns && ans === userAns && ans !== q.correct_answer) el.classList.add('wrong');
        opts.appendChild(el);
      });

      if(answers[idx] === q.correct_answer) correctCount++;

      qRow.appendChild(qTitle);
      qRow.appendChild(opts);
      resultsContainer.appendChild(qRow);
    });

    const scoreBox = document.createElement('div');
    scoreBox.className = 'score-box';
    scoreBox.innerHTML = `<h3>Score: ${correctCount} / ${questions.length}</h3>`;
    resultsContainer.insertBefore(scoreBox, resultsContainer.firstChild);

    resultsContainer.style.display = '';
    // smooth scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

}
