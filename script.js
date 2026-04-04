const brokerUrl = "wss://f5ed2fda712540be846684a2587c2008.s1.eu.hivemq.cloud:8884/mqtt";

const client = mqtt.connect(brokerUrl, {
  username: "sfftsya",
  password: "Tasya_1875",
});

client.on("connect", function () {
  console.log("MQTT Connected");

  client.subscribe("autokelas/elampu/status");
  client.subscribe("autokelas/esoket/status");
  client.subscribe("autokelas/rfid");
});

client.on("message", function (topic, message) {

  let msg = message.toString();

  // ===== LAMP =====
  if (topic === "autokelas/elampu/status") {
    document.getElementById("lampStatus").innerText = msg;

    let dot = document.getElementById("lampDot");
    dot.classList.toggle("on", msg === "ON");
    dot.classList.toggle("off", msg !== "ON");
  }

  // ===== SOCKET =====
  if (topic === "autokelas/esoket/status") {
    document.getElementById("socketStatus").innerText = msg;
    let dot = document.getElementById("socketDot");
    dot.classList.toggle("on", msg === "ON");
    dot.classList.toggle("off", msg !== "ON");
  }

  // ===== RFID =====
  if (topic === "autokelas/rfid") {

    let data = msg.split(",");

    let name = data[0];
    let date = data[1];
    let time = data[2];

    document.getElementById("rfidName").innerText = name;
    document.getElementById("rfidDate").innerText = date;
    document.getElementById("rfidTime").innerText = time;
  }
});

// BUTTONS
function lampON() {
  client.publish("autokelas/elampu/cmd", "ON");
}
function lampOFF() {
  client.publish("autokelas/elampu/cmd", "OFF");
}

function socketON() {
  client.publish("autokelas/esoket/cmd", "ON");
}
function socketOFF() {
  client.publish("autokelas/esoket/cmd", "OFF");
}