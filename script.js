"use strict";

{

    const timeDisplay = document.querySelector(".time-display");
    const timePeriod = document.querySelector(".time-period");
    let countDown;
    let breakRan = false;
    const standardWorkPeriod = 1500; // 25 min

    function timer(seconds) {
        clearInterval(countDown);

        const now = Date.now();
        const then = now + (seconds * 1000); // Convert seconds to milliseconds then add
        displayTimeLeft(seconds);

        countDown = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);

            if (secondsLeft < 0 && breakRan === false) {
                clearInterval(countDown);
                timer(300) // Set for 5 min pomodoro break

                timePeriod.textContent = "Take a break :)"
                breakRan = true;

                return;
            } else if (secondsLeft < 0 && breakRan === true) {
                clearInterval(countDown);
                timer(standardWorkPeriod);

                timePeriod.textContent = "Work period";
                breakRan = false;

                return;
            }

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

    timer(standardWorkPeriod);
    
}