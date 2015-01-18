var $,
    i,
    j,
    k,
    question,
    questions,
    answerKey,
    userAnswer,
    selected,
    score;

question = function(question, choices, answer) {
    return {question:question, choices:choices, answer:answer, answered:false};
};

questions = [
    question("What is my middle name?", ["Sylvester", "Patrick", "Aaron", "David"], 1),
    question("How old am I?", ["29", "27", "30", "28"], 0),
    question("In what state was I born?", ["Idaho", "Tampa", "North Carolina", "California"], 3),
    question("I served in this branch of the military:",["Air Force", "Army", "Navy", "Marines"], 0),
    question("This is my nervous habit:", ["Blinking too much", "Poor eye contact", "Cracking knuckles", "I'm never nervous"], 2),
    question("What is my trail name?", ["Landlocked", "Ambassador", "Moonbeam", "Young Man Winter"], 1),
    question("How many siblings do I have?", ["0", "1", "3", "4"], 3),
    question("All of these are my hobbies except:", ["Stamp collecting", "Playing guitar", "Programming", "Board Games"], 0),
    question("What is my favorite movie?", ["Titanic", "The Matrix", "The Royal Tenenbaums", "Inception"], 2),
    question("What is my favorite work of fiction?", ["A Wizard of Earthsea", "Harry Potter (all of them)", "The Lord of the Rings", "The Bible"], 0)
];

answerKey = [];
userAnswer = [];
i = 0;
score = questions.length;

questions.forEach(function(element){
    answerKey.push(element.answer);
});

function getSelected() {
    if (!questions[i].answered) {
        $('#quiz-form').on('change', function () {
            selected = $("input[name=question]:checked").val();
            $("#btn-next").show();
        });
    }
}

$(document).ready( function() {

    var quiz = $("#quiz");
    var ch0 = $('#choice0');
    var ch1 = $('#choice1');
    var ch2 = $('#choice2');
    var ch3 = $('#choice3');

    getSelected();

    // @Lob add 'are you sure' button before the end of the quiz.

    // @Lob add 'reset' button after grade is shown

    // @lob Enable an on('change') of a new value to update the userAnswer[i]; currently not working

    $('#btn-next').on('click', function() {
        if (!questions[i].answered) {
            userAnswer.splice(i, 1, selected);
            questions[i].answered = true;
        }
        if (i < answerKey.length-1) {
            i += 1;
            quiz.find('.quiz-question').show().html('<br>' + '<h2>' + questions[i].question + '</h2>');
            ch0.prop('checked', false).next().html('<strong>' + questions[i].choices[0] + '</strong>');
            ch1.prop('checked', false).next().html('<strong>' + questions[i].choices[1] + '</strong>');
            ch2.prop('checked', false).next().html('<strong>' + questions[i].choices[2] + '</strong>');
            ch3.prop('checked', false).next().html('<strong>' + questions[i].choices[3] + '</strong>');
            switch (userAnswer[i]) {
                case '0':
                    $('#choice0').prop('checked', true);
                    break;
                case '1':
                    ch1.prop('checked', true);
                    break;
                case '2':
                    ch2.prop('checked', true);
                    break;
                case '3':
                    ch3.prop('checked', true);
                    break;
                default:
                    break;
            }
            if (!questions[i].answered) {
                $("#btn-next").hide();
            }
            $("#btn-prev").show();
        } else {
            userAnswer.push(selected);
            quiz.find('.quiz-question').hide();
            quiz.find('.quiz-choices').hide();
            $("#finish").show();
            $("#btn-next").hide();
            $("#btn-prev").hide();
            $("#btn-submit").show();
        }
        getSelected();
    });


    $('#btn-prev').on('click', function() {
        if (i >= 0) {
            i -= 1;
            if (questions[i].answered) {
                $("#btn-next").show();
            }
            quiz.find('.quiz-question').show().html('<br>' + '<h2>' + questions[i].question + '</h2>');
            ch0.next().html('<strong>' + questions[i].choices[0] + '</strong>');
            ch1.next().html('<strong>' + questions[i].choices[1] + '</strong>');
            ch2.next().html('<strong>' + questions[i].choices[2] + '</strong>');
            ch3.next().html('<strong>' + questions[i].choices[3] + '</strong>');
            if (i < 1) {
                $("#btn-prev").hide()
            }
        }

        switch (userAnswer[i]) {
            case '0':
                ch0.prop('checked', true);
                break;
            case '1':
                ch1.prop('checked', true);
                break;
            case '2':
                ch2.prop('checked', true);
                break;
            case '3':
                ch3.prop('checked', true);
                break;
        }
        getSelected();
    });

    $('#btn-submit').on('click', function() {
        // @lob Update this loop as an array.forEach
        for (k = 0; k < answerKey.length; k++) {
            if (answerKey[k] != userAnswer[k]) {
                score -= 1;
            }
        }
        $('#btn-submit').hide();
        $("#finish").hide();
        $("#grade").show();
        $("#grade-percent").text((score/(answerKey.length))*100 + '%');

        // @lob Use a switch instead of if/else
        // @lob Change score to percentage based (100%, >= 90%, etc.)

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
    ch0.prop('checked', false).next().html('<strong>'+questions[i].choices[0]+'</strong>');
    ch1.prop('checked', false).next().html('<strong>'+questions[i].choices[1]+'</strong>');
    ch2.prop('checked', false).next().html('<strong>'+questions[i].choices[2]+'</strong>');
    ch3.prop('checked', false).next().html('<strong>'+questions[i].choices[3]+'</strong>');
});

// @lob Add missed questions review after grade is shown