const timeSwitcherBtn = document.querySelectorAll(".time_switcher");
const timePreviousContainer = document.querySelectorAll(".previous_time");
const timeCurrentContainer = document.querySelectorAll(".current_time");

const timeRender = (time, currentData, previousData, index) => {
  for (let j = 0; j < timeCurrentContainer.length; j++) {
    const timeCurrentIndex = timeCurrentContainer[j];
    if (index === j) {
      timeCurrentIndex.innerHTML = `${currentData}hrs`;
    }
  }
  for (let k = 0; k < timePreviousContainer.length; k++) {
    const timePreviousIndex = timePreviousContainer[k];
    if (index === k) {
      timePreviousIndex.innerHTML = `Last ${time} - ${previousData}hrs`;
    }
  }
};

const dataRender = (time, timeValueKey) => {
  fetch("./data.json")
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const currentValue = data[i].timeframes[timeValueKey].current;
        const previousValue = data[i].timeframes[timeValueKey].previous;
        timeRender(time, currentValue, previousValue, i);
      }
    });
};

const classNameToogle = (switcherId) => {
  for (let i = 0; i < timeSwitcherBtn.length; i++) {
    const switcherIndex = timeSwitcherBtn[i];
    if (switcherIndex.id === switcherId) {
      switcherIndex.classList.add("active");
    } else {
      switcherIndex.classList.remove("active");
    }
  }
};

const timeSwitcher = () => {
  timeSwitcherBtn.forEach((element) => {
    element.addEventListener("click", () => {
      const id = element.id;
      switch (id) {
        case "daily":
          dataRender("day", "daily");
          classNameToogle(id);
          break;
        case "weekly":
          dataRender("week", "weekly");
          classNameToogle(id);
          break;
        case "monthly":
          dataRender("month", "monthly");
          classNameToogle(id);
          break;

        default:
          break;
      }
    });
  });
};

dataRender("week", "weekly");
timeSwitcher();
