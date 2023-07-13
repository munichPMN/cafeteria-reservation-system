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

function cancelReservation(seat) {
  var bookedSeats = JSON.parse(localStorage.getItem("bookedSeats"));

  if (!Array.isArray(bookedSeats) || bookedSeats.length === 0) {
    alert("ไม่มีที่นั่งที่ถูกจอง");
    return;
  }

  for (var i = 0; i < bookedSeats.length; i++) {
    var booking = bookedSeats[i];
    if (booking.seat === seat) {
      if (isBookingCreatedByUser(booking, loggedInUser)) {
        bookedSeats.splice(i, 1);
        localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));
        alert("ยกเลิกการจองที่นั่ง " + seat + " เรียบร้อยแล้ว");
        location.reload();
        return;
      } else {
        alert("คุณไม่สามารถยกเลิกการจองที่นั่งนี้ได้");
        return;
      }
    }
  }

  alert("ไม่พบการจองที่นั่ง " + seat);
}

function loadBookedSeats() {
  var bookedSeats = JSON.parse(localStorage.getItem("bookedSeats"));
  if (bookedSeats) {
    var bookedSeatsContainer = document.getElementById("bookedSeatsContainer");
    var bookedSeatsList = document.createElement("ul");

    bookedSeats.reverse();

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

      var cancelButton = document.createElement("button");
      cancelButton.innerText = "ยกเลิกการจอง";
      cancelButton.className = "cancelButton";
      cancelButton.addEventListener("click", function () {
        cancelReservation(seat);
      });

      seatItem.appendChild(studentIdsList);
      seatItem.appendChild(cancelButton);
      bookedSeatsList.appendChild(seatItem);

      var lineBreak = document.createElement("br");
      bookedSeatsList.appendChild(lineBreak);
    });

    bookedSeatsContainer.appendChild(bookedSeatsList);
  }
}
