$.getJSON("json/conversations.json", function (data) {
    document.getElementById("john-name").innerHTML = data[0].name;
    document.getElementById("amy-name").innerHTML = data[1].name;
    document.getElementById("jack-name").innerHTML = data[2].name;

    document.getElementById("john-status").innerHTML = data[0].status;
    document.getElementById("amy-status").innerHTML = data[1].status;
    document.getElementById("jack-status").innerHTML = data[2].status;
   
    // Change background-color on click
    document.querySelectorAll('.profileBox').forEach(function (elm) {
        elm.addEventListener('click', function () {

            $(".profileBox").removeClass("change-background");

            for (var i = 0; i < data.length; i++) {
                if (this.getAttribute("data-name") == data[i].name) {
                    $(this).addClass("change-background");
                }
            }

            //  Show messages for each click
            var attr = elm.getAttribute('data-name');

            // Filter users messages
            var userInfo = data.filter(function (elm) {
                return elm.name == attr;
            });

            $('#text').empty('#text'); 

            // List all messages
            var messages = userInfo[0].messages;
            messages.forEach(function (msg) {
                
                // Create bubble for message
                var chatBubble = document.createElement('div');
                chatBubble.classList.add('chatBubble');

                // Get and convert time
                var time = new Date(msg.time);
                var hrs = time.getHours();
                var mins = time.getMinutes();

                var msgTime = '';
                if (hrs < 12) {
                    msgTime = hrs + ':' + mins + ' AM'
                }
                else {
                    msgTime = hrs + ':' + mins + ' PM'
                }

                var html = '<p>' + msg.content + '</p>' + '<p>' + msgTime + '</p>'

                if (msg.type == 'received') {
                    chatBubble.classList.add('received')
                }
                else if (msg.type == 'sent') {
                    chatBubble.classList.add('sent')
                }

                // Print in Bubble
                chatBubble.innerHTML += html;
                $('#text').append(chatBubble); 
            })
        })
    })
});