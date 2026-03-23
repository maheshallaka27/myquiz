const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyperlinks and Text Mark Language",
      "None",
    ],
    answer: 0,
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: 2,
  },
  {
    question: "Which is a JavaScript framework?",
    options: ["Django", "React", "Laravel", "Flask"],
    answer: 1,
  },
  {
    question: "Which HTML tag is used for inserting an image?",
    options: ["<img>", "<image>", "<pic>", "<src>"],
    answer: 0,
  },
  {
    question: "Which CSS property controls text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: 2,
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "<!-- -->", "#", "**"],
    answer: 0,
  },
  {
    question: "Which method is used to select an element by ID in JavaScript?",
    options: [
      "getElementById()",
      "querySelectorAll()",
      "getElementsByClass()",
      "selectById()",
    ],
    answer: 0,
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Netscape", "Google", "IBM"],
    answer: 1,
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<hyper>"],
    answer: 0,
  },
  {
    question: "Which JavaScript keyword is used to declare a variable?",
    options: ["int", "var", "string", "define"],
    answer: 1,
  },
];

let userAnswers = new Array(quizData.length).fill(null);
let attempted = 0;
let timeLeft = 60;

// Load quiz
function loadQuiz() {
  const quizDiv = document.getElementById("quiz");

  quizData.forEach((q, qIndex) => {
    const box = document.createElement("div");
    box.classList.add("quiz-box");

    const question = document.createElement("h3");
    question.innerText = `${qIndex + 1}. ${q.question}`;
    box.appendChild(question);

    q.options.forEach((opt, optIndex) => {
      const option = document.createElement("div");
      option.classList.add("option");
      option.innerText = opt;

      option.onclick = () => {
        if (userAnswers[qIndex] === null) attempted++;
        userAnswers[qIndex] = optIndex;

        document.getElementById("attempted").innerText =
          `Attempted: ${attempted}`;

        const siblings = option.parentNode.querySelectorAll(".option");
        siblings.forEach((s) => (s.style.background = "rgba(255,255,255,0.2)"));
        option.style.background = "#00c6ff";
      };

      box.appendChild(option);
    });

    quizDiv.appendChild(box);
  });
}

// Timer
function startTimer() {
  const timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `Time: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      submitQuiz();
    }
  }, 1000);
}

// Submit
function submitQuiz() {
  let score = 0;

  userAnswers.forEach((ans, i) => {
    if (ans === quizData[i].answer) score++;
  });

  localStorage.setItem("score", score);
  localStorage.setItem("total", quizData.length);
  localStorage.setItem("attempted", attempted);

  window.location.href = "result.html";
}

loadQuiz();
startTimer();
