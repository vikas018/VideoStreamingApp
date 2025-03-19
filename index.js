document.addEventListener("DOMContentLoaded", loadMoods);
let selectedMood = null;

document.querySelectorAll(".mood").forEach(mood => {
  mood.addEventListener("click", function () {
    document.querySelectorAll(".mood").forEach(m => m.classList.remove("selected"));
    this.classList.add("selected");
    selectedMood = this.getAttribute("data-mood");
  });
});

function saveMood() {
  if (!selectedMood) {
    alert("Please select a mood");
    return;
  }
  let moods = JSON.parse(localStorage.getItem("moods")) || [];
  let today = new Date().toISOString().split("T")[0];
  moods.push({ date: today, mood: selectedMood });
  localStorage.setItem("moods", JSON.stringify(moods));
  loadMoods();
}

function loadMoods() {
  let moods = JSON.parse(localStorage.getItem("moods")) || [];
  displayMoods(moods);
}

function filterMoods(range) {
  let moods = JSON.parse(localStorage.getItem("moods")) || [];
  let filteredMoods = [];
  let today = new Date();

  if (range === 'day') {
      let todayStr = today.toISOString().split("T")[0];
      filteredMoods = moods.filter(m => m.date === todayStr);
  } else if (range === 'week') {
      let weekAgo = new Date();
      weekAgo.setDate(today.getDate() - 7);
      filteredMoods = moods.filter(m => new Date(m.date) >= weekAgo);
  } else if (range === 'month') {
      let monthAgo = new Date();
      monthAgo.setMonth(today.getMonth() - 1);
      filteredMoods = moods.filter(m => new Date(m.date) >= monthAgo);
  }

  displayMoods(filteredMoods);
}

function displayMoods(moods) {
  let timeline = document.getElementById("timeline");
  timeline.innerHTML = moods.map(entry => `<p>${entry.date}: ${entry.mood}</p>`).join("");
  loadCalendar(moods);
}

function loadCalendar(moods) {
  let calendar = document.getElementById("calendar");
  calendar.innerHTML = "";
  let daysInMonth = new Date().getDate();
  let monthYear = new Date().toISOString().split("-").slice(0, 2).join("-");
  
  for (let i = 1; i <= daysInMonth; i++) {
    let dateStr = `${monthYear}-${String(i).padStart(2, '0')}`;
    let moodEntry = moods.find(m => m.date === dateStr);
    let moodDisplay = moodEntry ? moodEntry.mood : "-";
    calendar.innerHTML += `<div>${i}<br>${moodDisplay}</div>`;
  }
}