<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="/static/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
    <style>
        #micButton img {
            height: 20px; /* Adjust the height as needed */
            width: auto; /* Maintain aspect ratio */
            vertical-align: middle;
            margin-right: 5px; /* Adjust the margin as needed */
        }
    </style>
</head>
<body>
    <h1>COLLEGE ENQUIRY CHAT BOT SYSTEM</h1>
    <div>
        <div id="chatbox">
            <p class="botText"><span>Hi, my name is College Bot. I was created for college inquiries.</span></p>
        </div>
        <div id="userInput">
            <button id="micButton"><img src="https://s3.amazonaws.com/assets.mockflow.com/app/uploads/20200730082244/chatgpt-mic.svg" alt="Microphone"></button>
            <input id="textInput" type="text" name="msg" placeholder="Type...">
            <button id="buttonInput">Send</button>
        </div>
    </div>

    <script>
        function getBotResponse(inputText) {
            var userHtml = '<p class="userText"><span>' + inputText + '</span></p>';
            $("#chatbox").append(userHtml);
            document.getElementById('userInput').scrollIntoView({ block: 'start', behavior: 'smooth' });
            $.get("/get", { msg: inputText }).done(function(data) {
                var botHtml = '<p class="botText"><span>' + data + '</span></p>';
                $("#chatbox").append(botHtml);
                document.getElementById('userInput').scrollIntoView({ block: 'start', behavior: 'smooth' });
            });
        }

        $(document).ready(function() {
            $("#buttonInput").click(function() {
                var inputText = $("#textInput").val();
                if (inputText.trim() !== "") {
                    $("#textInput").val("");
                    getBotResponse(inputText);
                }
            });

            $("#textInput").keypress(function(e) {
                if (e.which == 13) {
                    var inputText = $("#textInput").val();
                    if (inputText.trim() !== "") {
                        $("#textInput").val("");
                        getBotResponse(inputText);
                    }
                }
            });

            $("#micButton").click(function() {
                var recognition = new webkitSpeechRecognition() || new SpeechRecognition();
                recognition.onresult = function(event) {
                    var text = event.results[0][0].transcript;
                    $("#textInput").val(text);
                    getBotResponse(text);
                }
                recognition.start();
            });
        });
    </script>
</body>
</html>
