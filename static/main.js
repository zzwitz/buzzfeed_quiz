
// This function helps replace pulling questions from a db, abstracting
// creation from the normal quiz processes
function makeSampleQuestions () {
  var questions = [
    {questionId: 1,
      text: "What type of weather do you like?",
     answers: [
        {answerText: 'Cold as shit',
        answerPicture: "static/antarctica.jpeg",
        answerVal: 'A',
        answerId: '1_a'},

        {answerText: 'Slightly less cold as shit ',
        answerPicture: "static/less_cold.jpeg",
        answerVal: 'B',
        answerId: '1_b'},

        {answerText: 'Hot as shit',
        answerPicture: "static/fire.jpeg",
        answerVal: 'C',
        answerId: '1_c'},

        {answerText: 'Foggy',
        answerPicture: "static/fogg.jpeg",
        answerVal: 'D',
        answerId: '1_d'}]
    },

    { questionId: 2,
      text: "How do you like your food?",
     answers: [

       {answerText: 'Spicy',
       answerPicture: "static/spicy.jpeg",
       answerVal: 'B',
       answerId: '2_a'},

      {answerText: 'Expensive',
      answerPicture: "static/gold.jpeg",
        answerVal: 'D',
        answerId: '2_b'
      },

      {answerText: 'Turkish',
      answerPicture: "static/turkish.jpeg",
        answerVal: 'A',
        answerId: '2_c'},

        {answerText: 'Extra Spicy',
      answerPicture: "static/fire.jpeg",
         answerVal: 'C',
         answerId: '2_d'
       },
]
    },

      {questionId: 3,
        text: "Pick your fashion",
       answers: [
          {answerText: '',
          answerPicture: "static/fashion_sari.jpeg",
          answerVal: 'C',
          answerId: '3_a'},

          {answerText: '',
          answerPicture: "static/pata_Vest.jpeg",
          answerVal: 'D',
          answerId: '3_b'},

          {answerText: '',
          answerPicture: "static/black_clothes.jpeg",
          answerVal: 'A',
          answerId: '3_c'},

          {answerText: '',
          answerPicture: "static/streetwear.jpeg",
          answerVal: 'B',
          answerId: '3_d'}]
      },

        {questionId: 4,
          text: "What's your dream residence hall like?",
         answers: [
            {answerText: 'Tiny',
            answerPicture: "static/tiny.jpeg",
            answerVal: 'B',
            answerId: '4_a'},

            {answerText: 'Robbed',
            answerPicture: "static/robber.jpeg",
            answerVal: 'A',
            answerId: '4_b'},

            {answerText: 'Big',
            answerPicture: "static/spacious.jpeg",
            answerVal: 'C',
            answerId: '4_c'},

            {answerText: 'Rats',
            answerPicture: "static/rats.jpeg",
            answerVal: 'D',
            answerId: '4_d'}]
        },
  ]

  // sessionStorage.setItem('questions', JSON.stringify(questions))
  return questions
};


//Similarly, tihs function makes the answers at the end
function makeSampleFinish () {
  var finishResponses = [
    {finishVal: 'A',
    finishMessage: 'BERLIN',
    finishImage: 'static/berlin.jpeg'
  },

  {finishVal: 'B',
    finishMessage: 'SEOUL',
    finishImage: 'static/seoul.jpeg'
  },

  {finishVal: 'C',
    finishMessage: 'HYDERABAD',
    finishImage: 'static/hyd.jpeg'
  },

  {finishVal: 'D',
    finishMessage: 'SAN FRANCISCO',
    finishImage: 'static/sf.jpeg'
  }
  ]

  return finishResponses
};



// This function takes the input of a question and crafts the HTML for it
//   this way it can be edited without changing loadQuiz()
function makeQuestionHTML(questionObject) {

  // This variable captures user responses. I set it
  // blank at first (so I can reference it) and fill it exists already

  // Stores them in browser so they can be found if the page is refreshed
  var responses = [];
  if (JSON.parse(sessionStorage.getItem('responses'))) {
    responses = JSON.parse(sessionStorage.getItem('responses'))
  };

  // Parses the question object (contains attributes of question above)
  var questionText = questionObject.text;
  var answers = questionObject.answers;

  // Seeds an html string
  var allHTML = '';

  //I didn't know the best way to structure HTML in JS, something I
  //   want to study in the future, so I just appended to a string for the time being,
  //   filling in the values in the right spots.

  //Filling question title info
  allHTML +=
  '<div class="container_quiz_question"> <h1>' + questionText +
  '</h1>';

  allHTML += '<div class="container_quiz_choices">'

  // Iterating through answers and filling answer html structure w/ details
  for(var i = 0; i < answers.length; i++) {

    //Sets the choice as answered if it's in the response list
    var choiceObj = responses.find(obj => {
      return obj.answerId === answers[i].answerId
    });

    allHTML += '<br>'
    allHTML += '<div class= "quiz_choice" id ='
    allHTML += answers[i].answerId + ' onclick = choiceSelection(this) >';
    allHTML += '<block>' +  answers[i].answerText + '</block>';
    // allHTML += '<img height="150px" width="150px" class = "checkImage" src="static/check.png" alt="">'

    // There's probably a better way to resize these pictures but I didn't want to bother just yet
    allHTML += '<br> <img width = 250px height = 250px src ="';
    allHTML += answers[i].answerPicture;
    allHTML += '" alt = "">'

    // If the question has been answered, puts a check image in the choice HTML
    if (choiceObj) {
      allHTML += '<img width = 150px height = 150px class = "checkImage" src = "static/check.png"'
    }

    //Finishes the HTML, returns it to be put in overall structure by LoadQuiz
    allHTML += '<br> </div>'
  }

  allHTML += '<br></div> </div> </div>'

  return allHTML
};



// This function loads the quiz according to inputed questions and responses (stored in browser)
function loadQuiz() {

  // Gets questions and responses
  var questions = makeSampleQuestions();
  var responses = JSON.parse(sessionStorage.getItem('responses'));

  // Fills quiz body with the HTML for each question
  var questionsList = document.getElementById('container_quiz_body');
  questionsList.innerHTML = '';

  for(var i = 0; i < questions.length; i++) {
    questionsList.innerHTML += makeQuestionHTML(questions[i])
  }
};



// This function coordinates the steps of when a user selects a question answer
function choiceSelection(choiceElement) {

  // Pulls responses (to edit / push to) and questions to get q_id
  responses = [];
  if (JSON.parse(sessionStorage.getItem('responses'))) {
    responses = JSON.parse(sessionStorage.getItem('responses'))
  };
  questions = JSON.parse(sessionStorage.getItem('questions'));

  //parse question number from answer value (div id)
  var questionNum = parseInt(choiceElement.id.split('_')[0]);

  //Finds question object to input information
  var choiceObj = questions.find(obj => {
    return obj.questionId === questionNum
  });

  //Finds answer object (with full response info)
  var answer = choiceObj.answers.find(obj => {
    return obj.answerId === choiceElement.id
  });

  // Checks if the question already has a response,
  ifResponded = -1
  if (responses) {
  var ifResponded = responses.findIndex(obj => {
    return obj.questionNum === questionNum})
}

  //
  var response = {
    questionNum: questionNum,
      answerId: answer.answerId,
      answerVal: answer.answerVal
  }

  // If there was a response, changes the value to new choice
  if (ifResponded >= 0) {
    responses[ifResponded] = response}

  // If not, insert new questions response
  else {
    responses.push(response)
  };

  // Store responses in sessionStorage again and reload quiz (to change response check's )
  sessionStorage.setItem('responses', JSON.stringify(responses))
  loadQuiz()

  // If every question has a response, finish quiz
  if (responses.length === questions.length) {
    finishQuiz()
  };
}

// This function calculates the score and displays quiz result
function finishQuiz() {
  var responses = JSON.parse(sessionStorage.getItem('responses'));

  // Creates an object to track score. Akin to buzzfeed questions this will only
  //   ever have four answer types
  var score = {
    a: 0,
    b: 0,
    c: 0,
    d: 0
  }

  // Iterates through responses, adds score accordingly (is there a better way to do this?)
  for (let i = 0; i < responses.length; i++) {

    console.log(i + responses[i].answerVal)
    if (responses[i].answerVal === 'A') {
      score.a ++
    }

    if (responses[i].answerVal === 'B') {
      score.b ++
    }

    if (responses[i].answerVal === 'C') {
      score.c ++
    }

    if (responses[i].answerVal === 'D') {
      score.d ++
    }
  }

  //Matches score to actual value
  totalValues = [score.a, score.b, score.c, score.d];
  let i = totalValues.indexOf(Math.max(...totalValues));
  valueList = ['A','B', 'C', 'D'];
  finishVal = valueList[i];

  //Pulls answer options
  var finishResponses = makeSampleFinish();

  //Finds valid response
  var finishResponse = finishResponses.find(obj => {
    return obj.finishVal == finishVal
  });

  //Gets container quiz body to add resuly
  var quizBody = document.getElementById('container_quiz_body');

  //IF the resuly already exists, replace it
  if (document.getElementById('quizFinish')) {
    var quizBody = document.getElementById('quizFinish').scrollIntoView();
    quizBody.innerHTML = '<div class = quizFinish id = quizFinish>' + '<h1>' + finishResponse.finishMessage + '</h1>' + '<img width = 400 px height = 400px src = ' + finishResponse.finishImage + '>' + '<br> <br> <br> <button class = "button quiz" onclick = "resetQuiz()">Reset Quiz </button"> </div>'
  }

  // If not, append it to quiz body
  else {
    quizBody.innerHTML += '<div class = quizFinish id = quizFinish>' + '<h1>' + finishResponse.finishMessage + '</h1>' + '<img width = 400 px height = 400px src = ' + finishResponse.finishImage + '>' + '<br><br> <br> <button class = "button quiz" onclick = "resetQuiz()">Reset Quiz </button> </div>'
    var quizBody = document.getElementById('quizFinish').scrollIntoView()
  };
}

//This function resets sessionStorage results and resets the quiz if users want (also scrolls to top)
function resetQuiz() {
    sessionStorage.setItem('responses', JSON.stringify([]));
    document.getElementById('page-header').scrollIntoView();
    loadQuiz()
}
