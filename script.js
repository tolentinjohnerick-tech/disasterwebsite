
// ==========================================
// 1. NAVIGATION
// ==========================================

const tabButtons = document.querySelectorAll("[data-tab]");
const tabs = document.querySelectorAll(".tab");

tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        const target = button.dataset.tab;

        tabs.forEach(tab => tab.classList.remove("active"));

        document.getElementById(target).classList.add("active");

        document.querySelectorAll(".nav-btn").forEach(nav => {
            nav.classList.remove("active");
        });

        const activeNav = document.querySelector(
            `.nav-btn[data-tab="${target}"]`
        );

        if (activeNav) {
            activeNav.classList.add("active");
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});


// ==========================================
// 2. EMERGENCY KIT CHECKLIST
// ==========================================

const emergencyKit = [
    {
        category: "💧 Food and Water",
        items: [
            "Drinking water (at least 3-day supply)",
            "Ready-to-eat canned goods",
            "Biscuits and energy bars",
            "Manual can opener",
            "Reusable water bottle"
        ]
    },
    {
        category: "🩹 First Aid and Medicine",
        items: [
            "First aid kit",
            "Personal maintenance medicines",
            "Bandages and gauze",
            "Antiseptic solution",
            "Face masks",
            "Alcohol or hand sanitizer"
        ]
    },
    {
        category: "🔦 Emergency Equipment",
        items: [
            "Flashlight",
            "Extra batteries",
            "Battery-powered radio",
            "Power bank",
            "Whistle",
            "Multi-purpose tool"
        ]
    },
    {
        category: "👕 Clothing and Personal Needs",
        items: [
            "Extra clothes",
            "Raincoat",
            "Blanket",
            "Extra underwear",
            "Hygiene supplies",
            "Extra footwear"
        ]
    },
    {
        category: "📄 Important Documents",
        items: [
            "Photocopies of valid IDs",
            "Birth certificates or important records",
            "Emergency contact list",
            "Cash in small bills",
            "Waterproof document bag"
        ]
    }
];

const kitList = document.getElementById("kitList");
const kitProgress = document.getElementById("kitProgress");
const kitProgressBar = document.getElementById("kitProgressBar");

let checkedItems = new Set();

function displayEmergencyKit() {

    kitList.innerHTML = "";

    emergencyKit.forEach((group, groupIndex) => {

        const category = document.createElement("div");
        category.className = "kit-category";
        category.textContent = group.category;

        kitList.appendChild(category);

        group.items.forEach((item, itemIndex) => {

            const label = document.createElement("label");
            label.className = "kit-item";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";

            const itemId = `${groupIndex}-${itemIndex}`;

            checkbox.checked = checkedItems.has(itemId);

            const text = document.createElement("span");
            text.textContent = item;

            if (checkbox.checked) {
                text.classList.add("completed");
            }

            checkbox.addEventListener("change", () => {

                if (checkbox.checked) {
                    checkedItems.add(itemId);
                    text.classList.add("completed");
                } else {
                    checkedItems.delete(itemId);
                    text.classList.remove("completed");
                }

                updateKitProgress();
            });

            label.appendChild(checkbox);
            label.appendChild(text);

            kitList.appendChild(label);
        });
    });

    updateKitProgress();
}

function updateKitProgress() {

    const totalItems = emergencyKit.reduce(
        (total, group) => total + group.items.length,
        0
    );

    const completedItems = checkedItems.size;

    const percentage = Math.round(
        (completedItems / totalItems) * 100
    );

    kitProgressBar.style.width = percentage + "%";

    kitProgress.textContent =
        `${percentage}% Completed (${completedItems}/${totalItems} items)`;
}

displayEmergencyKit();


// ==========================================
// 3. KNOWLEDGE QUIZ QUESTIONS
// ==========================================

const quizQuestions = {

    easy: [

        {
            question: "What should you do first during an earthquake?",
            options: [
                "Run outside immediately",
                "Drop, Cover, and Hold On",
                "Use the elevator",
                "Stand near windows"
            ],
            answer: 1,
            explanation: "Drop, Cover, and Hold On helps protect you from falling objects and debris."
        },

        {
            question: "Which item provides light during a power outage?",
            options: [
                "Flashlight",
                "Cooking pot",
                "Umbrella",
                "Notebook"
            ],
            answer: 0,
            explanation: "A flashlight provides portable lighting during power interruptions."
        },

        {
            question: "What should you do when floodwater starts rising?",
            options: [
                "Play in the water",
                "Stay in a basement",
                "Move to higher ground",
                "Drive through the flood"
            ],
            answer: 2,
            explanation: "Moving to higher ground helps protect you from rising floodwater."
        },

        {
            question: "What is the purpose of an emergency kit?",
            options: [
                "To decorate your house",
                "To store unnecessary items",
                "To prepare for emergencies",
                "To replace your school bag"
            ],
            answer: 2,
            explanation: "An emergency kit contains essential supplies needed during disasters."
        },

        {
            question: "What should you do when you discover a fire?",
            options: [
                "Hide inside a closet",
                "Ignore the fire",
                "Take the elevator",
                "Raise the alarm and evacuate safely"
            ],
            answer: 3,
            explanation: "Alert others and evacuate using a safe exit. Contact emergency services."
        }

    ],


    medium: [

        {
            question: "Why should important documents be stored in a waterproof bag?",
            options: [
                "To make them easier to read",
                "To protect them from water damage",
                "To make them heavier",
                "To prevent them from being stolen"
            ],
            answer: 1,
            explanation: "A waterproof bag helps protect important records from rain and floodwater."
        },

        {
            question: "During a typhoon, which location is generally safer?",
            options: [
                "Near a glass window",
                "Under a weak tree",
                "Inside a secure building away from windows",
                "Outside watching the storm"
            ],
            answer: 2,
            explanation: "A secure indoor location away from windows reduces exposure to strong winds and flying debris."
        },

        {
            question: "Why should families have an emergency communication plan?",
            options: [
                "To know how to contact each other",
                "To avoid preparing emergency supplies",
                "To stop receiving weather updates",
                "To replace evacuation routes"
            ],
            answer: 0,
            explanation: "A communication plan helps family members coordinate and reconnect during emergencies."
        },

        {
            question: "What should you do if you see a fallen electrical wire after a typhoon?",
            options: [
                "Move it using a wooden stick",
                "Walk around it closely",
                "Pour water on it",
                "Stay away and report it to authorities"
            ],
            answer: 3,
            explanation: "Fallen wires may still carry electricity. Keep a safe distance and report the hazard."
        },

        {
            question: "Why is a battery-powered radio useful during a disaster?",
            options: [
                "It can replace a first aid kit",
                "It can receive emergency announcements",
                "It can stop heavy rainfall",
                "It can repair damaged buildings"
            ],
            answer: 1,
            explanation: "A battery-powered radio can provide important updates when electricity or internet is unavailable."
        }

    ],


    hard: [

        {
            question: "Your community receives an evacuation order because of an approaching typhoon. What is the best action?",
            options: [
                "Wait until floodwater reaches your home",
                "Ignore the announcement",
                "Follow the evacuation order and bring essential supplies",
                "Stay outside to observe the weather"
            ],
            answer: 2,
            explanation: "Following official evacuation orders early helps reduce exposure to dangerous conditions."
        },

        {
            question: "After an earthquake, you notice cracks in your house and smell gas. What should you do?",
            options: [
                "Turn on electrical switches",
                "Leave the building and report the danger",
                "Light a match to check the smell",
                "Stay inside and repair the cracks"
            ],
            answer: 1,
            explanation: "A gas leak can cause fire or explosion. Leave the building, avoid ignition sources, and contact emergency services from a safe location."
        },

        {
            question: "A student wants to cross a flooded road because it is the shortest route home. What is the safest decision?",
            options: [
                "Cross slowly while holding a friend",
                "Use a motorcycle to cross",
                "Wait for the water to become deeper",
                "Avoid the flooded road and follow a safe alternative route"
            ],
            answer: 3,
            explanation: "Floodwater can hide hazards and have strong currents. Never attempt to cross it."
        },

        {
            question: "Why should an emergency kit contain supplies for at least three days?",
            options: [
                "Emergency assistance and services may be delayed",
                "Disasters always last exactly three days",
                "Families should avoid evacuation",
                "Food and water become unnecessary after three days"
            ],
            answer: 0,
            explanation: "A three-day supply provides basic support while waiting for assistance or access to essential services."
        },

        {
            question: "After a major flood, the water supply may be contaminated. What is the safest action?",
            options: [
                "Drink directly from the faucet",
                "Drink floodwater after filtering it through cloth",
                "Use bottled or properly treated water following official advisories",
                "Mix the water with soft drinks"
            ],
            answer: 2,
            explanation: "Flooding can contaminate water sources. Use bottled or properly treated water and follow public health advisories."
        }

    ]

};


// ==========================================
// 4. QUIZ FUNCTIONALITY
// ==========================================

const quizLevel = document.getElementById("quizLevel");
const quizArea = document.getElementById("quizArea");
const nextQ = document.getElementById("nextQ");
const resetQuiz = document.getElementById("resetQuiz");
const quizScore = document.getElementById("quizScore");

let currentQuestions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;
let finished = false;

function startQuiz() {

    const level = quizLevel.value;

    currentQuestions = quizQuestions[level];

    currentQuestion = 0;
    score = 0;
    answered = false;
    finished = false;

    quizScore.textContent = "";

    nextQ.textContent = "Next Question →";
    nextQ.disabled = false;

    showQuestion();
}

function showQuestion() {

    answered = false;

    const q = currentQuestions[currentQuestion];

    quizArea.innerHTML = `
        <div class="question-info">
            <span>QUESTION ${currentQuestion + 1} OF ${currentQuestions.length}</span>
            <span>${quizLevel.value.toUpperCase()} LEVEL</span>
        </div>

        <div class="question-progress">
            <div style="width: ${
                ((currentQuestion + 1) / currentQuestions.length) * 100
            }%"></div>
        </div>

        <h3 class="question-text">${q.question}</h3>

        <div class="answer-options">
            ${q.options.map((option, index) => `
                <button class="answer-btn" data-answer="${index}">
                    <span class="option-letter">
                        ${String.fromCharCode(65 + index)}
                    </span>
                    <span>${option}</span>
                </button>
            `).join("")}
        </div>

        <div id="answerFeedback"></div>
    `;

    document.querySelectorAll(".answer-btn").forEach(button => {

        button.addEventListener("click", () => {

            if (answered) return;

            checkAnswer(Number(button.dataset.answer));
        });

    });

    nextQ.disabled = true;
}

function checkAnswer(selected) {

    answered = true;

    const q = currentQuestions[currentQuestion];

    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach((button, index) => {

        button.disabled = true;

        if (index === q.answer) {
            button.classList.add("correct");
        }

        if (index === selected && selected !== q.answer) {
            button.classList.add("wrong");
        }

    });

    const feedback = document.getElementById("answerFeedback");

    if (selected === q.answer) {

        score++;

        feedback.innerHTML = `
            <div class="feedback correct-feedback">
                <strong>✓ Correct Answer!</strong>
                <p>${q.explanation}</p>
            </div>
        `;

    } else {

        feedback.innerHTML = `
            <div class="feedback wrong-feedback">
                <strong>✕ Incorrect Answer</strong>
                <p>${q.explanation}</p>
            </div>
        `;

    }

    nextQ.disabled = false;

    if (currentQuestion === currentQuestions.length - 1) {
        nextQ.textContent = "View Final Score";
    }
}

function showFinalScore() {

    finished = true;

    const total = currentQuestions.length;
    const percentage = Math.round((score / total) * 100);

    let message;

    if (percentage >= 80) {
        message = "Excellent! You have a strong understanding of disaster preparedness.";
    } else if (percentage >= 60) {
        message = "Good job! Continue reviewing your disaster preparedness knowledge.";
    } else {
        message = "Keep learning! Review the safety guidelines and try again.";
    }

    quizArea.innerHTML = `
        <div class="result-card">
            <div class="result-icon">🏆</div>

            <h2>Quiz Completed!</h2>

            <div class="result-score">${score}/${total}</div>

            <p class="result-percentage">${percentage}%</p>

            <h3>${message}</h3>

            <p>You completed the ${quizLevel.value} difficulty quiz.</p>
        </div>
    `;

    quizScore.textContent =
        `Final Score: ${score} out of ${total}`;

    nextQ.textContent = "Try Again";
    nextQ.disabled = false;
}

nextQ.addEventListener("click", () => {

    if (finished) {
        startQuiz();
        return;
    }

    if (!answered) return;

    if (currentQuestion < currentQuestions.length - 1) {

        currentQuestion++;

        showQuestion();

    } else {

        showFinalScore();

    }

});

resetQuiz.addEventListener("click", startQuiz);

quizLevel.addEventListener("change", startQuiz);

// Start the quiz
startQuiz();
