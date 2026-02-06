document.addEventListener("DOMContentLoaded", () => {

  /* ========= CLOCK ========= */
  function renderClock() {
    const now = new Date();
    const time = now.toLocaleTimeString("en-GB");
    document.getElementById("digital-clock").textContent = time;
  }

  renderClock();
  setInterval(renderClock, 1000);

  /* ========= TIMER ========= */
  let timerSeconds = 0;
  let timerInterval = null;

  function renderTimer() {
    const mins = String(Math.floor(timerSeconds / 60)).padStart(2, "0");
    const secs = String(timerSeconds % 60).padStart(2, "0");
    document.getElementById("timer-display").textContent = `${mins}:${secs}`;
  }

  function startTimer() {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
      timerSeconds++;
      renderTimer();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  function resetTimer() {
    stopTimer();
    timerSeconds = 0;
    renderTimer();
  }

  document.getElementById("start-timer").onclick = startTimer;
  document.getElementById("stop-timer").onclick = stopTimer;
  document.getElementById("reset-timer").onclick = resetTimer;

  renderTimer();

  /* ========= CHECKLIST ========= */
document
  .querySelectorAll(".checklist input[type=checkbox]")
  .forEach(box => {
    const key = box.dataset.key;

    box.checked = localStorage.getItem("check_" + key) === "true";

    box.addEventListener("change", () => {
      localStorage.setItem("check_" + key, box.checked);
    });
  });


  /* ========= CALENDAR ========= */
  function renderCalendar() {
    const cal = document.getElementById("calendar");
    cal.innerHTML = "";

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    days.forEach(d => {
      const el = document.createElement("div");
      el.textContent = d;
      el.className = "header";
      cal.appendChild(el);
    });

    for (let i = 0; i < firstDay; i++) {
      cal.appendChild(document.createElement("div"));
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const el = document.createElement("div");
      el.textContent = d;
      if (d === now.getDate()) el.classList.add("today");
      cal.appendChild(el);
    }
  }

  renderCalendar();

});



