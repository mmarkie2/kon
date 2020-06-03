class QuestionInfo {

    constructor(quest, correct, a, b, c) {
        this.quest = quest;
        this.correct = correct;
        this.a = a;
        this.b = b;
        this.c = c;

    }

    async startQuestSequence(time) {
        // function that handles one quesion
        this.generateQuest()
        await new Promise(r => setTimeout(r, time));

        let isCorrect = this.checkQuestAnswear()
        this.deleteQuest(isCorrect)

    }

    generateQuest() {
        console.log("generate");
        $(".quiz").append("<div id='generatedQuest'> " + this.quest + "<br> <form id=\"myForm\">\n" +
            "  <input type=\"radio\" name=\"radioQuest\" value=\"a\" /> a: " + this.a + " <br />\n" +
            "  <input type=\"radio\" name=\"radioQuest\" value=\"b\" /> b: " + this.b + " <br />\n" +
            "  <input type=\"radio\" name=\"radioQuest\" value=\"c\" /> c: " + this.c + " <br />\n" +

            "</form></div>");
    }

    checkQuestAnswear() {

        let ans = $('input[name="radioQuest"]:checked').val();
        console.log(ans)
        if (ans === this.correct) {
            return true;
        } else {
            return false;
        }
    }

    async deleteQuest(isCorrect) {
        console.log("delete");
        $("#generatedQuest").remove();


        if (isCorrect) {
            $(".quiz").append("<div id='isCorrect' style='font-size: 50px; color: #1e7e34'> Dobra odpowiedź</div>");
        } else {
            $(".quiz").append("<div id='isCorrect' style='font-size: 50px; color: red'> Zła odpowiedź</div>");
        }
        await new Promise(r => setTimeout(r, 2000));
        $("#isCorrect").remove();
    }

}

console.log("strt");

$(document).ready(function () {


    $("#startButton").click(function () {
        startQuiz(3000)
    });


});
let isQuizStarted = false;

async function startQuiz(time) {
    // if quiz was started once it wont start again
    if (isQuizStarted) {
        return;
    }
    isQuizStarted = true;
    $.getJSON('assets/quest.json', async function (data) {
        console.log(data)
        //iterating through json data to show questions, adding question to json will add questions on site
        for (let iter of data) {
            console.log(iter.quest)
            let questionInfo = new QuestionInfo(iter.quest, iter.correct, iter.a, iter.b, iter.c)
            await questionInfo.startQuestSequence(time)
            await new Promise(r => setTimeout(r, time));

        }
    });
}
