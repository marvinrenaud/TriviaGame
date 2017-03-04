$(document).ready(function() {

    // Declare the set of global variables to be used
    var clockElement
    var winsCount = 0;
    var lossesCount = 0;
    var roundCount = 0; //starting from zero as this value used to reference an array

    $("#startButton").on("click", function() {
        $("#startButton").empty();
        gameOn();
    })

    function gameOn() {
        // Create countdown timer object
        var timer = {
            seconds: 16,

            count: function() {
                timer.seconds--;

                var convertedTime = timer.timeConverter(timer.seconds);

                $("#lowerLeftBox").html("<h2 id='displayedTime'>Time Left:<br>" + convertedTime + "</h2>");

                if (timer.seconds == 0) {
                    timer.stop();
                    wrongAnswer();
                }
            },

            start: function() {
                clockElement = setInterval(timer.count, 1000);
                $("#lowerRightBox").html("<img id='phoneclock' src='assets/images/phonetime.gif'/>");
            },

            // Not building in a pause or stop feature yet but here for future use
            stop: function() {
                clearInterval(clockElement);
            },

            reset: function() {
                timer.seconds = 16;

            },


            timeConverter: function(t) {

                var minutes = Math.floor(t / 60);
                var seconds = t - (minutes * 60);

                if (seconds < 10) {
                    seconds = "0" + seconds;
                }

                if (minutes === 0) {
                    minutes = "00";
                } else if (minutes < 10) {
                    minutes = "0" + minutes;
                }

                return minutes + ":" + seconds;
            }


        }


        // Initiate the timer for the first time
        setTimeout(timer.start, 50);

        // Create arrays to hold Q&A objects
        var questionsArray = [
            question1 = {
                question: "Who is the greatest rapper of all time?",
                responses: ["- 2Pac", "- Notorious B.I.G", "- Jay-Z"],
                answer: 0,
                message: "Pac's lyrics, topic range, and content earned him the crown."
            },
            question2 = {
                question: "What was the name of Biggie's first album?",
                responses: ["- Life After Death", "- Ready to Die", "- Brooklyn's Finest"],
                answer: 1,
                message: "Ready to Die was Big's first album...and an instant classic."
            },
            question3 = {
                question: "Where did the term 'For Us By Us' originate?",
                responses: ["- FUBU: A album by Onyx", "- FUBU: A record label", "- FUBU: A clothing brand"],
                answer: 2,
                message: "FUBU was an urban and wildly successful clothing line."
            },
            question4 = {
                question: "In which city was hip-hop born?",
                responses: ["- Bronx", "- New York City", "- Compton"],
                answer: 1,
                message: "New York City...though the borough of Bronx is said to be its home."
            },
            question5 = {
                question: "Who is Nino Brown?",
                responses: ["- A drug dealer", "- A rapper", "- A DJ"],
                answer: 0,
                message: "Nino Brown was the drug dealer in New Jack City. Rock-a-bye-baby!"
            },
            question6 = {
                question: "Which company makes Air Jordan sneakers?",
                responses: ["- Adidas", "- Nike", "- NBA Bulls"],
                answer: 1,
                message: "Nike has made billions of dollars over the years making and selling Jordans."
            },
            question7 = {
                question: "Complete this statement: Peace Up, _________ !",
                responses: ["- Peace Down", "- Man Up", "- A-Town Down"],
                answer: 2,
                message: "Peace Up, A-Town Down!"
            },
            question8 = {
                question: "What is The 808?",
                responses: ["- The area code of Southern rap's center - New Orleans.", "- The Roland TR-808 Rhythm Composer is a drum machine.", "- The name of Kanye's second album."],
                answer: 1,
                message: "The 808 is a drum machine. 808s & Heartbreak is Kanye's 4th album."
            },
            question9 = {
                question: "Who penned 'The Miseducation'?",
                responses: ["- Ms. Lauryn Hill", "- Mary J", "- Beyonce"],
                answer: 0,
                message: "The always great, but now crazy, Lauryn Hill dropped The Miseduction of Lauryn Hill."
            }
        ]



        // Create a function to shuffle the questions to be presented in current round
        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }

        // Create function to run the shuffle and hold the results
        function captureQuestionArray() {
            shuffleArray(questionsArray);
            console.log(questionsArray);
        }

        // Create function to write questions and answer options to the page
        function writeQuestion() {
            $("#topSpot").html(questionsArray[roundCount].question);
            for (var i = 0; i < questionsArray[roundCount].responses.length; i++) {
                var responseDiv = $("<div>");
                responseDiv.attr("class", "singleResponse");
                responseDiv.attr("id", i);
                responseDiv.text(questionsArray[roundCount].responses[i]);
                $("#middleSpot").append(responseDiv);
            }
        }

        captureQuestionArray();
        writeQuestion();





        // Create function to capture a click on an answer option
        $(document).on("click", ".singleResponse", responseChecker);

        function responseChecker() {
            timer.stop();
            if (this.id == questionsArray[roundCount].answer) {
                correctAnswer();
            } else {
                wrongAnswer();
            }

        }

        // Create function that responds to a correct answer
        function correctAnswer() {
            winsCount++;
            $("#topSpot").html("<h2 class='centerText'>Correct Answer! Well Done</h2>");
            $("#middleSpot").html("<h3 class='centerText'>" + questionsArray[roundCount].message + "</h3>");
            updateScoreboard();
        }

        // Create function that responds to a wrong answer
        function wrongAnswer() {
            lossesCount++;
            $("#topSpot").html("<h2 class='centerText'>Fail!</h2>");
            $("#middleSpot").html("<h3 class='centerText'>" + questionsArray[roundCount].message + "</h3>");
            updateScoreboard();
        }

        // Create function to write the latest scores to the page
        function updateScoreboard() {
            $("#lowerLeftBox").html("<h2 class='centerText'> Wins<br>" + winsCount + "</h2>");
            $("#lowerRightBox").html("<h2 class='centerText'> Losses<br>" + lossesCount + "</h2>");
            setTimeout(roundReset, 5000);
        }

        // Create function to start the next round of play
        function roundReset() {
            roundCount++;
            if (roundCount == 3) {
                endGame();
            } else {
                $("#topSpot").empty();
                $("#middleSpot").empty();
                $("#bottomSpot").empty();
                $("#lowerLeftBox").empty();
                $("#lowerRightBox").empty();
                writeQuestion();
                timer.seconds = 16;
                timer.start();
            }

        }

        // Create function to wrap up the game after three rounds
        function endGame() {
            $("#topSpot").empty();
            $("#middleSpot").empty();
            $("#bottomSpot").empty();
            if (lossesCount == 0) {
                $("#middleSpot").html("<div class='centerText taunt'>You're a Hip-Hop Legend!!!</div>");
            };

            if (winsCount == 0) {
                $("#middleSpot").html("<div class='centerText taunt'> You ain't Hip-Hop. Why you even grab the mic bro?</div>");
            };

            if (winsCount > lossesCount && lossesCount != 0) {
                $("#middleSpot").html("<div class='centerText taunt'>Not bad. Not bad. Don't be a one-hit wonder. <br>Play again.</div>");
            };

            if (winsCount <= lossesCount && winsCount != 0) {
                $("#middleSpot").html("<div class='centerText taunt'>You ain't Hip-Hop</div>");
            };
        }


    }


});
