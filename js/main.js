var $,
    i,
    questions;

i = 0;

questions = [
    {question: "What is my middle name?",
    choices: ["Sylvester", "Patrick", "Aaron", "David"],
    correctAnswer:1
    },
    {question: "How old am I?",
    choices: ["29", "27", "30", "28"],
    correctAnswer:0
    },
    {question: "In what state was I born?",
    choices: ["Idaho", "Tampa", "North Carolina", "California"],
    correctAnswer:3
    },
    {question: "I served in this branch of the military:",
    choices: ["Air Force", "Army", "Navy", "Marines"],
    correctAnswer:0
    },
    {question: "This is my nervous habit:",
    choices: ["Blinking too much", "Poor eye contact", "Cracking knuckles", "I'm never nervous"],
    correctAnswer:2
    },
    {question: "What is my trail name?",
    choices: ["Landlocked", "Ambassador", "Moonbeam", "Young Man Winter"],
    correctAnswer:2
    },
    {question: "How many siblings to I have?",
    choices: ["0", "1", "3", "4"],
    correctAnswer:3
    },
    {question: "All of these are my hobbies except:",
    choices: ["Stamp collecting", "Playing guitar", "Programming", "Board Games"],
    correctAnswer:0
    },
    {question: "What is my favorite movie?",
    choices: ["Titanic", "The Matrix", "The Royal Tenenbaums", "Inception"],
    correctAnswer:2
    },
    {question: "What is my favorite work of fiction?",
    choices: ["A Wizard of Earthsea", "Harry Potter (all of them)", "The Lord of the Rings", "The Bible"],
    correctAnswer:0
    }
];

$(document).ready( function() {
    $('#btn-next').on('click', function() {
        if (i < questions.length - 1) {
            i += 1;;
            quiz.find('.quiz-question').addClass('unhide').html('<br>' + '<h2>' + questions[i].question + '</h2>');
            $('#choice1').next().html('<strong>' + questions[i].choices[0] + '</strong>');
            $('#choice2').next().html('<strong>' + questions[i].choices[1] + '</strong>');
            $('#choice3').next().html('<strong>' + questions[i].choices[2] + '</strong>');
            $('#choice4').next().html('<strong>' + questions[i].choices[3] + '</strong>');
        }
    });
    $('#btn-prev').on('click', function() {
        if (i > 0) {
            i -= 1;
            quiz.find('.quiz-question').addClass('unhide').html('<br>' + '<h2>' + questions[i].question + '</h2>');
            $('#choice1').next().html('<strong>' + questions[i].choices[0] + '</strong>');
            $('#choice2').next().html('<strong>' + questions[i].choices[1] + '</strong>');
            $('#choice3').next().html('<strong>' + questions[i].choices[2] + '</strong>');
            $('#choice4').next().html('<strong>' + questions[i].choices[3] + '</strong>');
        }
    });

    var quiz = $("#quiz");

    quiz.find('.quiz-choices').addClass('unhide');
    quiz.find('.quiz-question').addClass('unhide').html('<br>' + '<h2>' + questions[i].question + '</h2>');
    $('#choice1').next().html('<strong>'+questions[i].choices[0]+'</strong>');
    $('#choice2').next().html('<strong>'+questions[i].choices[1]+'</strong>');
    $('#choice3').next().html('<strong>'+questions[i].choices[2]+'</strong>');
    $('#choice4').next().html('<strong>'+questions[i].choices[3]+'</strong>');


});

