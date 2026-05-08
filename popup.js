document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("start").addEventListener("click", function () {

        var minutes = document.getElementById("time").value;

        if (!minutes || minutes <= 0) {
            alert("Enter valid time");
            return;
        }

        var time = minutes * 60;

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

            var tabId = tabs[0].id;

            // Inject content script
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ["content.js"]
            });

            // Start timer
            chrome.runtime.sendMessage({
                action: "START_TIMER",
                time: time,
                tabId: tabId
            });

        });

    });

});