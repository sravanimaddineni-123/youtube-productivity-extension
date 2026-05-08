var timerBox = document.createElement("div");

timerBox.style.position = "fixed";
timerBox.style.top = "20px";
timerBox.style.right = "20px";
timerBox.style.background = "rgba(0,0,0,0.6)";
timerBox.style.color = "#fff";
timerBox.style.padding = "10px 15px";
timerBox.style.borderRadius = "10px";
timerBox.style.fontSize = "18px";
timerBox.style.zIndex = "999999";

timerBox.innerText = "⏳ 00:00";

document.body.appendChild(timerBox);

// Hide distractions
function hideDistractions() {
    var sidebar = document.querySelector("#secondary");
    if (sidebar) sidebar.style.display = "none";

    var comments = document.querySelector("#comments");
    if (comments) comments.style.display = "none";
}

setInterval(hideDistractions, 1000);

// Listen messages
chrome.runtime.onMessage.addListener(function (request) {

    if (request.action === "UPDATE_TIME") {

        var minutes = Math.floor(request.time / 60);
        var seconds = request.time % 60;

        var formatted =
            String(minutes).padStart(2, '0') + ":" +
            String(seconds).padStart(2, '0');

        timerBox.innerText = "⏳ " + formatted;
    }

    if (request.action === "STOP_VIDEO") {

        var video = document.querySelector("video");
        if (video) video.pause();

        var overlay = document.createElement("div");

        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0,0,0,0.7)";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.style.zIndex = "999999";

        overlay.innerHTML = `
            <div style="background:white;padding:50px;border-radius:10px;text-align:center;">
                <h2>🎉 Time's Up!</h2>
                <button id="okBtn">OK</button>
            </div>
        `;

        document.body.appendChild(overlay);

        document.getElementById("okBtn").onclick = function () {
            overlay.remove();
            location.reload();
        };
    }
});