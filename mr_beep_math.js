$(document).ready(function(){
  function start() {
    userChoice = "+";
    getNumbers();
    answer = numX + numY;
    presentQuestion(userChoice);
    focusOnAnswer();
    console.log(answer);
    captureAnswer();
  }

  start();

  function rand() {
    return Math.floor(Math.random()*(15-0+1)+0);
  }

  function getNumbers() {
    numX = rand();
    console.log(numX);
    numY = rand();
    console.log(numY);
    if(numX < numY) {
      numX = numY;
      numY = numX;
    }
  }

  function chooseOperand() {
    operand = $('.sign').on('click',function() {
      console.log($(this).val());
      $('.feedback').empty();
      userChoice = ($(this).val());
      getNumbers();
      if(userChoice == '+'){
        answer = numX + numY;
      } else {
        answer = numX - numY;
      }
      presentQuestion(userChoice);
      focusOnAnswer();
      console.log(answer);
      captureAnswer();
    });
  }

  chooseOperand();

  function randomSentencesGood() {
    sentences = ['good job', 'Nice!!!', 'WOW, really good', 'You got this', 'Getting really good', 'Mathematician, are you?']
    sayIt = sentences[Math.floor(Math.random()*sentences.length)];
    return sayIt;
  }

  function randomSentencesBad() {
    sentences = ['Sorry', 'Take a deep breath', "Mr Beep, can't compute", 'An error your Math has', 'You can do it', 'Mathematician, you will be?']
    sayIt = sentences[Math.floor(Math.random()*sentences.length)];
    return sayIt;
  }

  function presentQuestion(userChoice) {
    $('.question').empty();
    $(function () {
      $('.question').append(numX +  userChoice +  numY);
    })
  }

  function numberToRobot(numX, numY){
    $('.numX').empty();
    $('.numY').empty();
    $('.operand').empty();
    $('.operand').append(userChoice);
    if(userChoice === '+') {
      for(var i=0; i < numX; i++){
        $('.numX').append('<img src=https://cdn.pbrd.co/images/acXNNGVde.png class="head">    </img>');
      }
      for(var i=0; i < numY; i++){
        $('.numY').append('<img src=https://cdn.pbrd.co/images/acXNNGVde.png class="head"></img> <br>');
      }
    } else {
      for(var i=0; i < numX; i++){
        $('.numX').append('<img src=https://cdn.pbrd.co/images/acXNNGVde.png class="head"></img> <br>');
      }
    }
  }

  function captureAnswer() {
    $('.answer_box').off().on('keypress', function(e) {  //.off() is there in order not to get multiple answers on continous clicks
  		if(e.which == 13) {
        setTimeout(function() {
          $('.answer_box').val('');
        }, 2000);
        $('.feedback').empty();
  			user_answer = +this.value;
        console.log(user_answer);
        if(user_answer === answer) {
          $('.feedback').append(randomSentencesGood() +'<br>' + numX + ' ' + userChoice + ' ' + numY +' ' + '=' + ' ' + answer);
          $('.hi').hide();
          $('.robot_head').hide();
          $('.eye_wrong').hide();
          $('.eye_heart').show();
        } else {
          $('.feedback').append(randomSentencesBad() +'<br>' + numX + ' ' + userChoice + ' ' + numY +' ' + 'is not' + ' ' + user_answer + '.' + '<br>' + 'Try again');
          $('.robot_head').hide();
          $('.hi').hide();
          $('.eye_heart').hide();
          $('.eye_wrong').show();
        }
      }
    })
    numberToRobot(numX, numY);
  }

  function focusOnAnswer() {
    $('.answer_box').focus();
  }
})
