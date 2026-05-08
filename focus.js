console.log("Focus Mode Running");

// Hide distractions
function applyFocus() {

    var sidebar = document.querySelector("#secondary");
    if (sidebar) sidebar.style.display = "none";

    var comments = document.querySelector("#comments");
    if (comments) comments.style.display = "none";
}

setInterval(applyFocus, 1000);

// 🔔 RECEIVE MESSAGE AND SHOW POPUP
chrome.runtime.onMessage.addListener((request) => {

    if (request.action === "SHOW_POPUP") {

        console.log("Showing popup");

        // Create overlay
        let overlay = document.createElement("div");

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
            <div style="
                background: white;
                padding: 30px;
                border-radius: 10px;
                text-align: center;
                font-size: 20px;
            ">
                🎉 Focus Session Completed! <br><br>
                <button id="closeBtn">OK</button>
            </div>
        `;

        document.body.appendChild(overlay);

        document.getElementById("closeBtn").onclick = function () {
            overlay.remove();
            location.reload();
        };
    }
});