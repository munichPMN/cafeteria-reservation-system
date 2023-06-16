function checkBooking(seat, studentIds) {
  var bookedSeats = JSON.parse(localStorage.getItem("bookedSeats"));

  if (!Array.isArray(bookedSeats) || bookedSeats.length === 0) {
    return false;
  }

  for (var i = 0; i < bookedSeats.length; i++) {
    var booking = bookedSeats[i];
    if (booking.seat === seat) {
      for (var j = 0; j < studentIds.length; j++) {
        if (booking.studentIds.includes(studentIds[j])) {
          return true;
        }
      }
    } else {
      for (var j = 0; j < booking.studentIds.length; j++) {
        if (studentIds.includes(booking.studentIds[j])) {
          return true;
        }
      }
    }
  }

  return false;
}

function bookSeat(seat, studentIds) {
  if (checkBooking(seat, studentIds)) {
    alert("รหัสนักเรียนหรือที่นั่งถูกจองแล้ว");
  } else {
    var bookedSeats = JSON.parse(localStorage.getItem("bookedSeats")) || [];

    for (var i = 0; i < bookedSeats.length; i++) {
      if (bookedSeats[i].seat === seat) {
        alert("ที่นั่งนี้ถูกจองแล้ว");
        return;
      }
    }

    bookedSeats.push({ seat: seat, studentIds: studentIds });
    localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));
    alert("ที่นั่ง " + seat + " ได้รับการจองแล้ว");
    location.reload();
  }
}

function loadBookedSeats() {
  var bookedSeats = JSON.parse(localStorage.getItem("bookedSeats"));
  if (bookedSeats) {
    var bookedSeatsContainer = document.getElementById("bookedSeatsContainer");
    var bookedSeatsList = document.createElement("ul");

    bookedSeats.forEach(function (booking) {
      var seat = booking.seat;
      var studentIds = Array.isArray(booking.studentIds)
        ? booking.studentIds
        : [booking.studentIds];

      var seatItem = document.createElement("li");
      seatItem.innerText = "ที่นั่ง " + seat + ", ถูกจองโดยรหัสนักเรียน ";

      var studentIdsList = document.createElement("ul");

      studentIds.forEach(function (studentId) {
        var studentIdItem = document.createElement("li");
        studentIdItem.innerText = studentId;
        studentIdsList.appendChild(studentIdItem);
      });

      seatItem.appendChild(studentIdsList);
      bookedSeatsList.appendChild(seatItem);
    });

    bookedSeatsContainer.appendChild(bookedSeatsList);
  }
}
