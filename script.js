function toggleDevice(button) {
    if (button.innerText === "OFF") {
        button.innerText = "ON";
        button.classList.add("on");
    } else {
        button.innerText = "OFF";
        button.classList.remove("on");
    }
}

function simulateScan(readerNumber) {

    const students = [
        "Ali Ahmad - 20231234",
        "Siti Nur - 20235678",
        "John Tan - 20239876"
    ];

    const randomStudent = students[Math.floor(Math.random() * students.length)];

    document.getElementById("rfid" + readerNumber).innerText = randomStudent;
}