var $,
    i,
    question,
    questions,
    answerKey,
    userAnswer,
    selected,
    score,
    gradePercent;

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

$(document).ready( function() {

    var quiz = $("#quiz");
    var ch0 = $('#choice0');
    var ch1 = $('#choice1');
    var ch2 = $('#choice2');
    var ch3 = $('#choice3');

    function setChecked() {
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
    }

    function getSelected() {
        if (!questions[i].answered) {
            $("#btn-next").hide();
        }
        $('#quiz-form').on('change', function () {
            selected = $("input[name=question]:checked").val();
            userAnswer.splice(i, 1, selected);
            questions[i].answered = true;
            $("#btn-next").show().animate({
                "top": "-10px"
            });;
        });
    }
    getSelected();

    // @Lob add 'are you sure' button before the end of the quiz.
    // @Lob add 'reset' button after grade is shown
    // @lob Enable an on('change') of a new value to update the userAnswer[i]; currently not working
    // @lob Add animation to buttons as they show / hide

    $('#btn-next').on('click', function() {
        if (i < answerKey.length-1) {
            i += 1;
            quiz.find('.quiz-question').show().html('<br>' + '<h2>' + questions[i].question + '</h2>');
            ch0.prop('checked', false).next().html('<strong>' + questions[i].choices[0] + '</strong>');
            ch1.prop('checked', false).next().html('<strong>' + questions[i].choices[1] + '</strong>');
            ch2.prop('checked', false).next().html('<strong>' + questions[i].choices[2] + '</strong>');
            ch3.prop('checked', false).next().html('<strong>' + questions[i].choices[3] + '</strong>');
            setChecked();
            getSelected();
            $("#btn-prev").show().animate({
                "top": "-10px"
            });
        } else {
            getSelected();
            quiz.find('.quiz-question').hide();
            quiz.find('.quiz-choices').hide();
            $("#finish").show();
            $("#btn-next").hide();
            $("#btn-prev").hide();
            $("#btn-submit").show();
        }
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
        setChecked();
        getSelected();
    });

    $('#btn-submit').on('click', function() {
        answerKey.forEach(function(element, index){
            if (element != userAnswer[index]) {
                score -= 1;
            }
        });

        gradePercent = Math.floor((score/answerKey.length)*100);
        $('#btn-submit').hide();
        $("#finish").hide();
        $(".quiz-question").hide();
        $(".quiz-choices").hide();
        $("#grade-percent").text(gradePercent + '%');
        $("#grade").show();

        if (gradePercent >= 95) {
            $("#ten").show();
        } else if (gradePercent >= 85) {
            $("#nine").show();
        } else if (gradePercent >= 75) {
            $("#eight").show();
        } else if (gradePercent >= 70) {
            $("#seven").show();
        } else if (gradePercent >= 60) {
            $("#six").show();
        } else if (gradePercent >= 50) {
            $("#five").show();
        } else if (gradePercent >= 40) {
            $("#four").show();
        } else if (gradePercent >= 30) {
            $("#three").show();
        } else if (gradePercent >= 20) {
            $("#two").show();
        } else if (gradePercent >= 10) {
            $("#one").show();
        } else {
            $("#zero").show();
        }
    });

    // Initialize the quiz from Question 1
    quiz.find('.quiz-choices').show();
    quiz.find('.quiz-question').show().html('<br>' + '<h2>' + questions[i].question + '</h2>');
    ch0.prop('checked', false).next().html('<strong>'+questions[i].choices[0]+'</strong>');
    ch1.prop('checked', false).next().html('<strong>'+questions[i].choices[1]+'</strong>');
    ch2.prop('checked', false).next().html('<strong>'+questions[i].choices[2]+'</strong>');
    ch3.prop('checked', false).next().html('<strong>'+questions[i].choices[3]+'</strong>');
});