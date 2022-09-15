WEBSOCKET_URI = "ws://127.0.0.1:8030/app";

var socketIsOpen = 0;
        var intervalID = 0;
        var closedByUser = 0;

        window.addEventListener("load", function () {

            doConnect();
        }, false);


        function sendCommand(obj) {
            if (socketIsOpen) {
                websocket.send(JSON.stringify(obj));
            } else {
                console.log('Fail: Not connected\n');

            }
        }


        function doConnect() {

            websocket = new WebSocket(WEBSOCKET_URI);
            websocket.onopen = function (evt) {
                socketIsOpen = 1;
                clearInterval(intervalID);
                intervalID = 0;

            };
            websocket.onclose = function (evt) {
                socketIsOpen = 0;
                if (!intervalID && !closedByUser) {
                    intervalID = setInterval(doConnect, 5000);
                } else if (closedByUser) {
                    closedByUser = 0;
                }

            };
            websocket.onmessage = function (evt) {
                var jsonOBJ = JSON.parse(evt.data);

                onMessage(jsonOBJ);
            };
            websocket.onerror = function (evt) {

                socketIsOpen = 0;

                if (!intervalID) {
                    intervalID = setInterval(doConnect, 5000);

                }
            };
        }



        function doDisconnect() {
            socketIsOpen = 0;
            closedByUser = 1;
            websocket.close();
        }
