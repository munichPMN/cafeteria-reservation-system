const zones = ["a", "b", "c", "d"];
const soloZones = ["e", "f", "g", "h"];
const numOfSeats = 25;

const content = document.querySelector(".content");
const studentIdInputs = document.getElementById("studentInputs");
const nextBtn = document.getElementById("nextBtn");
const groupBtn = document.getElementById("groupBtn");
const soloBtn = document.getElementById("soloBtn");
const groupSizeWrapper = document.getElementById("groupSizeWrapper");

let selectedSeat;

const createSeats = (zones, numPeople) => {
  zones.forEach((zone) => {
    const seatMap = document.createElement("div");
    seatMap.className = "seat-map";

    const zoneTitle = document.createElement("h3");
    zoneTitle.textContent = `Zone ${zone.toUpperCase()}`;
    seatMap.appendChild(zoneTitle);
    seatMap.className = "seat-map";

    for (let i = 1; i <= numOfSeats; i++) {
      const seat = document.createElement("div");
      const seatLabel = document.createElement("div");
      const seatId = `seat${zone.toUpperCase()}${i}`;

      seat.className = `seat zone-${zone}`;
      seat.id = seatId;
      seat.setAttribute("data-seat-number", `${zone.toUpperCase()}${i}`);
      seatLabel.className = "seat-label";
      seatLabel.textContent = `${zone.toUpperCase()}${i}`;

      seat.appendChild(seatLabel);
      seatMap.appendChild(seat);

      seat.addEventListener("click", function () {
        const previouslySelectedSeat = document.querySelector(".seat.selected");
        if (previouslySelectedSeat) {
          previouslySelectedSeat.classList.remove("selected");
        }
        this.classList.add("selected");
        selectedSeat = this;
      });
    }
    content.appendChild(seatMap);
  });

  studentIdInputs.innerHTML = "";
  for (let i = 0; i < numPeople; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `รหัสนักเรียนที่ ${i + 1}`;
    input.className = "student-id-input";
    studentIdInputs.appendChild(input);
  }
};

groupBtn.addEventListener("click", function () {
  content.innerHTML = "";
  createSeats(zones, 4);
  groupSizeWrapper.style.display = "block";
  groupBtn.classList.add("active");
  soloBtn.classList.remove("active");
});

soloBtn.addEventListener("click", function () {
  content.innerHTML = "";
  createSeats(soloZones, 1);
  groupSizeWrapper.style.display = "none";
  soloBtn.classList.add("active");
  groupBtn.classList.remove("active");
});

nextBtn.addEventListener("click", function () {
  if (selectedSeat) {
    const studentIds = Array.from(
      document.querySelectorAll(".student-id-input")
    )
      .map((input) => input.value)
      .filter((id) => id);
    if (
      studentIds.length ===
      document.querySelectorAll(".student-id-input").length
    ) {
      const seatNumber = selectedSeat.getAttribute("data-seat-number");
      window.location.href =
        "confirmation.html?seat=" +
        seatNumber +
        "&studentId=" +
        studentIds.join(",");
    } else {
      alert("โปรดกรอกรหัสนักเรียน");
    }
  } else {
    alert("โปรเลือกที่นั่ง");
  }
});

window.onload = function () {
  groupBtn.click();
};

document.getElementById("groupSize").addEventListener("change", function () {
  const studentInputs = document.getElementById("studentInputs");
  studentInputs.innerHTML = "";
  for (let i = 0; i < this.value; i++) {
    const input = document.createElement("input");
    input.className = "student-id-input";

    input.placeholder = `รหัสนักเรียนที่ ${i + 1}`;
    studentInputs.appendChild(input);
  }
});

document.getElementById("groupSize").dispatchEvent(new Event("change"));
