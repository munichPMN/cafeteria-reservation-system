const checkBooking = (seat, studentIds) => {
  const bookedSeats = JSON.parse(localStorage.getItem("bookedSeats"));

  if (!Array.isArray(bookedSeats) || bookedSeats.length === 0) {
    return false;
  }

  return bookedSeats.some(booking => {
    if (booking.seat === seat && booking.studentIds.some(id => studentIds.includes(id))) {
      return true;
    }
    if (studentIds.some(id => booking.studentIds.includes(id))) {
      return true;
    }
    return false;
  });
};

const bookSeat = (seat, studentIds) => {
  if (checkBooking(seat, studentIds)) {
    alert("รหัสนักเรียนหรือที่นั่งถูกจองแล้ว");
    return;
  }

  const bookedSeats = JSON.parse(localStorage.getItem("bookedSeats")) || [];

  if (bookedSeats.some(booking => booking.seat === seat)) {
    alert("ที่นั่งนี้ถูกจองแล้ว");
    return;
  }

  bookedSeats.push({ seat: seat, studentIds: studentIds });
  localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));
  alert(`ที่นั่ง ${seat} ได้รับการจองแล้ว`);
  location.reload();
};

const loadBookedSeats = () => {
  const bookedSeats = JSON.parse(localStorage.getItem("bookedSeats"));
  
  if (bookedSeats) {
    const bookedSeatsContainer = document.getElementById("bookedSeatsContainer");
    const bookedSeatsList = document.createElement("ul");

    bookedSeats.forEach(booking => {
      const seatItem = document.createElement("li");
      seatItem.innerText = `ที่นั่ง ${booking.seat}, ถูกจองโดยรหัสนักเรียน `;

      const studentIdsList = document.createElement("ul");
      booking.studentIds.forEach(studentId => {
        const studentIdItem = document.createElement("li");
        studentIdItem.innerText = studentId;
        studentIdsList.appendChild(studentIdItem);
      });

      seatItem.appendChild(studentIdsList);
      bookedSeatsList.appendChild(seatItem);
    });

    bookedSeatsContainer.appendChild(bookedSeatsList);
  }
};