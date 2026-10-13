// 👉 Remplace par l'identifiant de ton Short
// (lien : https://www.youtube.com/shorts/AbC123xyz_0  ->  identifiant : AbC123xyz_0)
const VIDEO_ID = "VIDEO_ID_ICI";
const VIDEO_URL = `https://www.youtube.com/embed/${VIDEO_ID}`;

// 👉 Remplace ces questions par celles qui correspondent à ta vidéo
// "correct" = position de la bonne réponse, en commençant à 0
const questions = [
  {
    question: "Question 1 sur la vidéo ?",
    answers: ["Réponse A", "Réponse B", "Réponse C", "Réponse D"],
    correct: 0
  },
  {
    question: "Question 2 sur la vidéo ?",
    answers: ["Réponse A", "Réponse B", "Réponse C", "Réponse D"],
    correct: 1
  },
  {
    question: "Question 3 sur la vidéo ?",
    answers: ["Réponse A", "Réponse B", "Réponse C", "Réponse D"],
    correct: 2
  }
];

let current = 0;
let score = 0;

const videoScreen = document.getElementById("video-screen");
const quizScreen = document.getElementById("quiz-screen");
const player = document.getElementById("player");
const startBtn = document.getElementById("start");

const progressEl = document.getElementById("progress");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next");

function loadVideo() {
  player.src = VIDEO_URL;
}

function startQuiz() {
  player.src = "";
  videoScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  current = 0;
  score = 0;
  nextBtn.onclick = nextQuestion;
  showQuestion();
}

function showQuestion() {
  const q = questions[current];
  progressEl.textContent = `Question ${current + 1} / ${questions.length}`;
  questionEl.textContent = q.question;
  feedbackEl.textContent = "";
  answersEl.innerHTML = "";
  nextBtn.disabled = true;
  nextBtn.textContent = current === questions.length - 1 ? "Voir le résultat" : "Suivant";

  q.answers.forEach((text, index) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.addEventListener("click", () => selectAnswer(index));
    answersEl.appendChild(btn);
  });
}

function selectAnswer(index) {
  const q = questions[current];
  const buttons = answersEl.querySelectorAll("button");

  buttons.forEach(b => (b.disabled = true));
  buttons[q.correct].classList.add("correct");

  if (index === q.correct) {
    score++;
    feedbackEl.textContent = "✅ Bonne réponse !";
  } else {
    buttons[index].classList.add("wrong");
    feedbackEl.textContent = "❌ Raté !";
  }
  nextBtn.disabled = false;
}

function showResult() {
  progressEl.textContent = "Quiz terminé";
  questionEl.textContent = `Ton score : ${score} / ${questions.length}`;
  answersEl.innerHTML = "";
  feedbackEl.textContent = score >= Math.ceil(questions.length / 2) ? "Bravo 🎉" : "Tu peux faire mieux 💪";
  nextBtn.disabled = false;
  nextBtn.textContent = "Revoir la vidéo";
  nextBtn.onclick = restart;
}

function restart() {
  quizScreen.classList.add("hidden");
  videoScreen.classList.remove("hidden");
  loadVideo();
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

startBtn.addEventListener("click", startQuiz);
loadVideo();
