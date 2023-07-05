const loginForm = document.getElementById('loginForm');
let loggedInUser;

const users = [
  { username: 'std1', password: 'pass1' },
  { username: 'std2', password: 'pass2' },
  { username: 'std3', password: 'pass3' },
  { username: 'std4', password: 'pass4' },
  { username: 'std5', password: 'pass5' },
  { username: 'std6', password: 'pass6' },
  { username: 'std7', password: 'pass7' },
  { username: 'std8', password: 'pass8' },
  { username: 'std9', password: 'pass9' },
  { username: 'std10', password: 'pass10' },
  { username: 'std11', password: 'pass11' },
  { username: 'std12', password: 'pass12' },
  { username: 'std13', password: 'pass13' },
  { username: 'std14', password: 'pass14' },
  { username: 'std15', password: 'pass15' },
  { username: 'std16', password: 'pass16' },
  { username: 'std17', password: 'pass17' },
  { username: 'std18', password: 'pass18' },
  { username: 'std19', password: 'pass19' },
  { username: 'std20', password: 'pass20' },
  { username: 'std21', password: 'pass21' },
  { username: 'std22', password: 'pass22' },
  { username: 'std23', password: 'pass23' },
  { username: 'std24', password: 'pass24' },
  { username: 'std25', password: 'pass25' },
  { username: 'std26', password: 'pass26' },
  { username: 'std27', password: 'pass27' },
  { username: 'std28', password: 'pass28' },
  { username: 'std29', password: 'pass29' },
  { username: 'std30', password: 'pass30' },
  { username: 'std31', password: 'pass31' },
  { username: 'std32', password: 'pass32' },
  { username: 'std33', password: 'pass33' },
  { username: 'std34', password: 'pass34' },
  { username: 'std35', password: 'pass35' },
  { username: 'std36', password: 'pass36' },
  { username: 'std37', password: 'pass37' },
  { username: 'std38', password: 'pass38' },
  { username: 'std39', password: 'pass39' },
  { username: 'std40', password: 'pass40' },
  { username: 'std41', password: 'pass41' },
  { username: 'std42', password: 'pass42' },
  { username: 'std43', password: 'pass43' },
  { username: 'std44', password: 'pass44' },
  { username: 'std45', password: 'pass45' },
  { username: 'std46', password: 'pass46' },
  { username: 'std47', password: 'pass47' },
  { username: 'std48', password: 'pass48' },
  { username: 'std49', password: 'pass49' },
  { username: 'std50', password: 'pass50' }
];

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    loggedInUser = username;
    document.querySelector('.login-container').style.display = 'none';
  } else {
    alert('รหัสนักเรียนหรือรหัสผ่านไม่ถูกต้อง');
  }
});




const zones = ["a", "b", "c", "d"];
const soloZones = ["e", "f", "g", "h","i","j"];

const content = document.querySelector(".content");
const studentIdInputs = document.getElementById("studentInputs");
const nextBtn = document.getElementById("nextBtn");
const groupBtn = document.getElementById("groupBtn");
const soloBtn = document.getElementById("soloBtn");
const groupSizeWrapper = document.getElementById("groupSizeWrapper");

let selectedSeat;

const groupNumOfSeats = 25;
const soloNumOfSeats = 60;

const createGroupSeats = (zones, numPeople, numOfSeats) => {
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

const createSoloSeats = (zones, numPeople, numOfSeats) => {
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
  
      seat.className = `seat solo zone-${zone}`;
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
  createGroupSeats(zones, 4, groupNumOfSeats);
  groupSizeWrapper.style.display = "block";
  groupBtn.classList.add("active");
  soloBtn.classList.remove("active");
});

soloBtn.addEventListener("click", function () {
  content.innerHTML = "";
  createSoloSeats(soloZones, 1, soloNumOfSeats);
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
      if (studentIds.includes(loggedInUser)) {
        if (studentIds.every(id => users.some(user => user.username === id))) {
          const seatNumber = selectedSeat.getAttribute("data-seat-number");
          window.location.href =
            "confirmation.html?seat=" +
            seatNumber +
            "&studentId=" +
            studentIds.join(",");
        } else {
          alert('รหัสนักเรียนที่ป้อนไม่ตรงกับข้อมูลที่มีอยู่ในระบบ');
        }
      } else {
        alert('รหัสนักเรียนที่ล็อกอินแล้วจะต้องป้อนรหัสนักเรียนในฟอร์มการจอง');
      }
    } else {
      alert("โปรดกรอกรหัสนักเรียน");
    }
  } else {
    alert("โปรดเลือกที่นั่ง");
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
