let timer = null;

chrome.runtime.onMessage.addListener(function (request) {

    if (request.action === "START_TIMER") {

        let time = request.time;
        let tabId = request.tabId;

        if (timer) clearInterval(timer);

        timer = setInterval(function () {

            time--;

            // 🔥 Send time update every second
            chrome.tabs.sendMessage(tabId, {
                action: "UPDATE_TIME",
                time: time
            });

            if (time <= 0) {

                clearInterval(timer);

                // Final action
                chrome.tabs.sendMessage(tabId, {
                    action: "STOP_VIDEO"
                });

            }

        }, 1000);
    }
});