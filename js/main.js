var $,
    i,
    j,
    k,
    questions,
    answerKey,
    userAnswer,
    selected,
    score;

questions = [
    {question: "What is my middle name?",
    choices: ["Sylvester", "Patrick", "Aaron", "David"],
    answer:1
    },
    {question: "How old am I?",
    choices: ["29", "27", "30", "28"],
    answer:0
    },
    {question: "In what state was I born?",
    choices: ["Idaho", "Tampa", "North Carolina", "California"],
    answer:3
    },
    {question: "I served in this branch of the military:",
    choices: ["Air Force", "Army", "Navy", "Marines"],
    answer:0
    },
    {question: "This is my nervous habit:",
    choices: ["Blinking too much", "Poor eye contact", "Cracking knuckles", "I'm never nervous"],
    answer:2
    },
    {question: "What is my trail name?",
    choices: ["Landlocked", "Ambassador", "Moonbeam", "Young Man Winter"],
    answer:1
    },
    {question: "How many siblings to I have?",
    choices: ["0", "1", "3", "4"],
    answer:3
    },
    {question: "All of these are my hobbies except:",
    choices: ["Stamp collecting", "Playing guitar", "Programming", "Board Games"],
    answer:0
    },
    {question: "What is my favorite movie?",
    choices: ["Titanic", "The Matrix", "The Royal Tenenbaums", "Inception"],
    answer:2
    },
    {question: "What is my favorite work of fiction?",
    choices: ["A Wizard of Earthsea", "Harry Potter (all of them)", "The Lord of the Rings", "The Bible"],
    answer:0
    }
];

answerKey = [];
userAnswer = [];
i = 0;
score = 10;

questions.forEach(function(element){
    answerKey.push(element.answer);
});

console.log(answerKey);

$(document).ready( function() {

    var quiz = $("#quiz");

    $('#quiz-form').on('change', function() {
        selected = ($('input[name=question]:checked').val());
    });

    // @lob Add functionality to reset :checked after each Next button, but keep selected
    // answers in memory to be shown when Prev button is used

    // @lob Add checkbox verification; Next button only advances if an answer is selected;
    // otherwise, alert error

    $('#btn-next').on('click', function() {
        if (i < answerKey.length-1) {
            if (!isNaN(selected)) {
                userAnswer.splice(i, 1, selected);
                i += 1;
                quiz.find('.quiz-question').show().html('<br>' + '<h2>' + questions[i].question + '</h2>');
                $('#choice1').next().html('<strong>' + questions[i].choices[0] + '</strong>').addClass('checked');
                $('#choice2').next().html('<strong>' + questions[i].choices[1] + '</strong>');
                $('#choice3').next().html('<strong>' + questions[i].choices[2] + '</strong>');
                $('#choice4').next().html('<strong>' + questions[i].choices[3] + '</strong>');
            } else {
                alert('Please select an answer.');
            }
        } else {
            userAnswer.push(selected);
            quiz.find('.quiz-question').hide();
            quiz.find('.quiz-choices').hide();
            $("#finish").show();
            $("#btn-next").hide();
            $("#btn-prev").hide();
            $("#btn-submit").show();
            }
    });

    $('#btn-prev').on('click', function() {
        if (i > 0) {
            i -= 1;
            quiz.find('.quiz-question').show().html('<br>' + '<h2>' + questions[i].question + '</h2>');
            $('#choice1').next().html('<strong>' + questions[i].choices[0] + '</strong>');
            $('#choice2').next().html('<strong>' + questions[i].choices[1] + '</strong>');
            $('#choice3').next().html('<strong>' + questions[i].choices[2] + '</strong>');
            $('#choice4').next().html('<strong>' + questions[i].choices[3] + '</strong>');
        }
    });

    $('#btn-submit').on('click', function() {
        for (k = 0; k < answerKey.length; k++) {
            console.log('Starting score ' + score);
            if (answerKey[k] != userAnswer[k]) {
                score -= 1;
                console.log('You missed one. Current score: ' + score);
            } else {
                console.log(score);
            }
        }
        $('#btn-submit').hide();
        $("#finish").hide();
        $("#grade").show();
        $("#grade-percent").text((score/(answerKey.length))*100 + '%');
        if (score === 10) {
            $("#ten").show();
        } else if (score === 9) {
            $("#nine").show();
        } else if (score === 8) {
            $("#eight").show();
        } else if (score === 7) {
            $("#seven").show();
        } else if (score === 6) {
            $("#six").show();
        } else if (score === 5) {
            $("#five").show();
        } else if (score === 4) {
            $("#four").show();
        } else if (score === 3) {
            $("#three").show();
        } else if (score === 2) {
            $("#two").show();
        } else if (score === 1) {
            $("#one").show();
        } else {
            $("#zero").show();
        }
    });

    quiz.find('.quiz-choices').show();
    quiz.find('.quiz-question').show().html('<br>' + '<h2>' + questions[i].question + '</h2>');
    $('#choice1').next().html('<strong>'+questions[i].choices[0]+'</strong>');
    $('#choice2').next().html('<strong>'+questions[i].choices[1]+'</strong>');
    $('#choice3').next().html('<strong>'+questions[i].choices[2]+'</strong>');
    $('#choice4').next().html('<strong>'+questions[i].choices[3]+'</strong>');
});