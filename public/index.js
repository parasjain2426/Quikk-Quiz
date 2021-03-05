var questions = {
    'What is the full form of HTML?': {
            'HyperText Makeup Language':'wrong',
            'HyperTextual Madeup Language':'wrong',
            'HyperText Markup Language':'correct',
            'HyperText Markup Linguistics':'wrong'
        },
    'What is the extension of Javascript?': {
            '.js':'correct',
            '.java':'wrong',
            '.jst':'wrong',
            '.py':'wrong'
        },
    'What is the full form of CSS?': {
            'Cascading Style Sheet':'wrong',
            'Cascading Style Spreading':'wrong',
            'Cascade Styling Sheets':'wrong',
            'Cascaded Style Sheet':'correct'
        }
};

var score = 0;
var count = 0;
var questionList = [];
var scoresList = [];

function home(){
    var mainScreen = document.getElementById('mainScreen');
    var highScoreScreen = document.getElementById('highScoreScreen');
    var highScoreList = document.getElementById('highScoreList');
    var saveUserScreen = document.getElementById('saveUserScreen');
    var quizScreen = document.getElementById('quizScreen');
    var question = document.getElementById('question');
    var options = document.getElementById('options');
    mainScreen.style.display = 'block';
    quizScreen.style.display = 'none';
    highScoreScreen.style.display = 'none';
    saveUserScreen.style.display = 'none';
    removeAllChildNodes(question);
    removeAllChildNodes(options);
    removeAllChildNodes(highScoreList);
}

function play(){
    var mainScreen = document.getElementById('mainScreen');
    var quizScreen = document.getElementById('quizScreen');
    var saveUserScreen = document.getElementById('saveUserScreen');
    var highScoreScreen = document.getElementById('highScoreScreen');
    var question = document.getElementById('question');
    var options = document.getElementById('options');
    var progressBar = document.getElementById('progressBar');

    mainScreen.style.display = 'none';
    highScoreScreen.style.display = 'none';
    saveUserScreen.style.display = 'none';
    quizScreen.style.display = 'block';

    removeAllChildNodes(question);
    removeAllChildNodes(options);
    
    for(var currQuestion in questions){
        questionList.push(currQuestion);
    }

    var currentQuestion = currentQuestionUpdate();
    question.appendChild(currentQuestion);

    for(var option in questions[questionList[count]]){
        var proposedOption = optionsUpdate(option);
        options.appendChild(proposedOption);
    }

    score = 0;
    progressBar.style.width = '1%';
    scoreBoard();
    questionNumberUpdate();

}

function currentQuestionUpdate(){
    var currentQuestion = document.createElement('h2');
    currentQuestion.textContent = questionList[count];
    currentQuestion.setAttribute('id',questionList[count]);
    currentQuestion.setAttribute('style','padding:10px 20px;margin:5px 0px;');
    return currentQuestion;
}

function optionsUpdate(option){
    var proposedOption = document.createElement('div');
    proposedOption.textContent = option;
    proposedOption.setAttribute('id',option);
    proposedOption.setAttribute('onclick','onAnswered(id)');
    proposedOption.setAttribute('style','padding:10px 20px;margin:5px 0px;background-color: white;');
    return proposedOption
}

function questionNumberUpdate(){
    var questionUpdate = document.getElementById('questionUpdate');
    questionUpdate.textContent = 'Question '+(count)+'/3';
}

function scoreBoard(){
    var scoreUpdate = document.getElementById('scoreUpdate');
    scoreUpdate.textContent = 'Score: '+score;
}

function onAnswered(attemptedAnswer){
    var currentQuestion = questionList[count];
    var selectedOption = document.getElementById(attemptedAnswer);
    var progressBar = document.getElementById('progressBar');
    var progress = (count+1)*33.33;

    if(questions[currentQuestion][attemptedAnswer]=='wrong'){ 
        selectedOption.style.backgroundColor = '#F08080';
    }
    else{
        selectedOption.style.backgroundColor = '#ADFF2F';
        score = score+10;
    }

    progressBar.style.width = progress+'%';
    count++;
    scoreBoard();
    questionNumberUpdate();   

    window.setTimeout(updateQuestion,2000);
}

function updateQuestion(){
    var question = document.getElementById('question');
    var options = document.getElementById('options');

    if(count>2){
        count = 0;
        displaySaveUser();
    }
    else{
        removeAllChildNodes(question);
        removeAllChildNodes(options);
        var nextQuestion = currentQuestionUpdate();
        question.appendChild(nextQuestion);

        for(var option in questions[questionList[count]]){
            var proposedOption = optionsUpdate(option);
            options.appendChild(proposedOption);
        }
    }
}

function displaySaveUser(){
    var highScoreScreen = document.getElementById('highScoreScreen');
    var mainScreen = document.getElementById('mainScreen');
    var quizScreen = document.getElementById('quizScreen');
    var saveUserScreen = document.getElementById('saveUserScreen');
    mainScreen.style.display = 'none';
    quizScreen.style.display = 'none';
    saveUserScreen.style.display = 'block';
    highScoreScreen.style.display = 'none';
}

function validateUser(user){
    var saveButton = document.getElementById('saveButton');
    if(user==null || user.length==0){
        alert("Please enter username");
        saveButton.disabled = true;
    }
    else{
        saveButton.disabled = false;
    }
}

function saveUser(user){
    var currScore = {
        'user':user,
        'score':score
    };
    if(scoresList.length==5){
        scoresList.pop();
    }
    scoresList.push(currScore);
    highScore();
}

function highScore(){
    var highScoreScreen = document.getElementById('highScoreScreen');
    var highScoreList = document.getElementById('highScoreList');
    var mainScreen = document.getElementById('mainScreen');
    var quizScreen = document.getElementById('quizScreen');
    var saveUserScreen = document.getElementById('saveUserScreen');
    mainScreen.style.display = 'none';
    quizScreen.style.display = 'none';
    saveUserScreen.style.display = 'none';
    highScoreScreen.style.display = 'block';
    mergeSort(scoresList,0,scoresList.length-1);
    for(var i=0; i<scoresList.length; i++){
        var currUser = document.createElement('h3');
        currUser.textContent = scoresList[i]['user']+":"+scoresList[i]['score'];
        highScoreList.appendChild(currUser);
    }
    score = 0;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function mergeSort(arr,start,end){
	if(start<end){
		var mid = start+ Math.floor((end-start)/2);
		mergeSort(arr,start,mid);
		mergeSort(arr,mid+1,end);
		divideAndConquer(arr,start,mid,end);
	}
}

function divideAndConquer(arr,start,mid,end){
	leftBound = mid-start+1;
	rightBound = end-mid;
	arrLeft = [];
	arrRight = [];
	for(var i=0;i<leftBound;i++){
		arrLeft[i] = arr[start+i];
	}
	
	for(var j=0;j<rightBound;j++){
		arrRight[j] = arr[mid+j+1];
	}
	
	var i=0,j=0,k=start;
	
	while(i<leftBound && j<rightBound){
		if(arrLeft[i]['score']<=arrRight[j]['score']){
			arr[k] = arrLeft[i];
			i++;
		}
		else{
			arr[k] = arrRight[j];
			j++;
		}
		k++;
	}
	
	while(i<leftBound){
		arr[k] = arrLeft[i];
		i++;
		k++;
	}
	
	while(j<rightBound){
		arr[k] = arrRight[j];
		j++;
		k++;
	}
}