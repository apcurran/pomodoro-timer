"use strict";

{
    const timeDisplay = document.querySelector(".time-display");
    let countDown;
    let breakRan = false;

    function timer(seconds) {
        const now = Date.now();
        const then = now + (seconds * 1000); // Convert seconds to milliseconds then add
        displayTimeLeft(seconds);

        countDown = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);

            if (secondsLeft < 0 && breakRan === false) {
                clearInterval(countDown);
                timer(300) // Set for five min pomodoro break
                breakRan = true;
                return;
            } else if (secondsLeft < 0 && breakRan === true) {
                clearInterval(countDown);
                timer(1500);
                breakRan = false;
                return;
            }

            // Display time
            displayTimeLeft(secondsLeft);

        }, 1000);

    }

    function displayTimeLeft(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        const paddedSeconds = remainderSeconds.toString().padStart(2, "0");
        const displayTime = `${minutes}: ${paddedSeconds}`;

        timeDisplay.textContent = displayTime;
        document.title = displayTime; // Display on tab
    }

    timer(1500); // Start pomodoro work for 25min
    document.pomoForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
    });
}