var startBtn = document.querySelector('#startBtn');
// var backBtn = document.querySelector('#backBtn');
var $div = document.querySelector('.container');
var $body = document.body;

var questionCounter = 0;
var time = 90;
var interval;
var localData;
var savedName;


var questions = [
    {
        question: '1. Which html tag do you use to link Javascript?',
        answer: ['Script','Link','Href', 'None of the above'],
        correct: 'Script'
    },
    {
        question: '2. Which programming language is best?',
        answer: ['Python','Java','Javascript','English'],
        correct: 'Javascript'
    },
    {
        question: '3. What is the index of the first element in an array?',
        answer: ['0','1','NAN','None of the above'],
        correct: '0'
    },
    {
        question: '4. var people = ["Joe", "Ken", "Mike"], what data type is people?',
        answer: ['Object','Array','String', 'None of the above'],
        correct: 'Array'
    },
]

function timer() {
    var seconds = document.createElement('h5');
    interval = setInterval(function() {
        seconds.textContent = 'Time: ' + time;
        $div.appendChild(seconds);
        time--;
    }, 1000);
}

function clearPage() {
    // document.body.innerHTML = '';
    var clear = document.querySelector('.container');
    clear.textContent = '';
    // $body.setAttribute('style', 'text-align:center;padding:30px;');
    // var newDiv = document.createElement('div');
    // newDiv.setAttribute('class', 'container');
    // $body.appendChild(newDiv);
}

//invoke on page load
function initializeLocalStorage() {
    if (localStorage.getItem('name')) {
        //already created an instance of local storage
        localData = JSON.parse(localStorage.getItem('name'));
    } else {
        //havent created local sotrage
        localData = [];
    }
}
//invoke on submission of high scores
function addLocalStorage(name, score) {
    var newScore = {
        name: name,
        score: score
    };
    localData.push(newScore)
    localStorage.setItem('name', JSON.stringify(localData));
}

function startQuiz() {
    clearPage();
    renderQuestion();
    timer();

}

function renderHighScore() {
    // var score = document.querySelector('#scores');
    // var name = document.querySelector('#nameInput');
    console.log(savedName);
    // console.log(time);
    // score.push()
}

function submit() {
    event.preventDefault();
    console.log(nameInput.value);
    savedName = nameInput.value;
    // addLocalStorage();
    // window.location.href = "./highScores.html";

    // renderHighScore();
}

// Rendering function
function renderQuestion() {
    var $div = document.querySelector('.container');

    if(questions[questionCounter] === undefined){

        clearInterval(interval);
        clearPage();
        // var $div = document.querySelector('.container');
        var title = document.createElement('h2');
        title.textContent = 'All Done!'
        var subTitle = document.createElement('h3');
        subTitle.textContent = 'Your final score is ' + time;
        $div.appendChild(title);
        $div.appendChild(subTitle);

        // Input form for high score name w/ submit button
        var $form = document.createElement('form');
        var nameInput = document.createElement('input');
        var $submitBtn = document.createElement('button');

        nameInput.setAttribute('id', 'nameInput');
        $form.textContent = 'Enter name for high scores: '

        $submitBtn.textContent = 'Submit';
        $submitBtn.setAttribute('class', 'btn btn-success');
        $submitBtn.addEventListener('click', function(){
            event.preventDefault();
            savedName = nameInput.value;
            // document.querySelector('h2').textContent = '';
            // document.querySelector('h3').textContent = '';
            clearPage();
            console.log(savedName);
            // var title = document.createElement('h1');
            title.textContent = 'High Scores';
            title.setAttribute('style', 'padding: 30px;');
            var list = document.createElement('ul');
            var name = document.createElement('li');
            var backBtn = document.createElement('button');
            backBtn.textContent = 'Back';
            backBtn.setAttribute('class', 'btn btn-secondary');
            name.setAttribute('style', 'list-style-type: none;');
            name.setAttribute('class', 'display-4');
            name.textContent = savedName + '  ' + time;
            
            $div.appendChild(title);
            $div.appendChild(list);
            list.appendChild(name);
            $div.appendChild(backBtn);
            backBtn.addEventListener('click', goBack);
        });

        $div.appendChild($form);
        $form.appendChild(nameInput);
        $form.appendChild($submitBtn);
        
    } else {
        console.log(questions[questionCounter].question);

        // Rendering question
        var $newQuestion = document.createElement('h4');
        $newQuestion.textContent = questions[questionCounter].question;
        $newQuestion.setAttribute('style', 'padding:20px;');
        $div.appendChild($newQuestion);

            // for loop to render each answer with a button
            for (let i = 0; i < questions[questionCounter].answer.length; i++) {
                var $newButton = document.createElement('button');

                $newButton.textContent = questions[questionCounter].answer[i];
                $newButton.setAttribute('value', questions[questionCounter].answer[i]);
                $newButton.addEventListener('click', answerBtn);
                $newButton.setAttribute('style', 'display:block;margin: 5px auto;width: 250px;')
                $newQuestion.appendChild($newButton);
                }
        }
}

// Answer button functionality
function answerBtn(e) {
    // console.log(e.target.value);
    // console.log(questions[questionCounter].correct);
    if(e.target.value === questions[questionCounter].correct){
        questionCounter++;
        clearPage();
        renderQuestion();
    } else {
        time -= 15;
        questionCounter++;
        clearPage();
        renderQuestion();
    }
}

function goBack() {
    event.preventDefault();
    window.location.href = "./index.html";
}

startBtn.addEventListener('click', startQuiz);
// backBtn.addEventListener('click', goBack);