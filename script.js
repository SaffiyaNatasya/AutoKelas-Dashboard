// MQTT Configuration
const brokerUrl = "wss://f5ed2fda712540be846684a2587c2008.s1.eu.hivemq.cloud:8884/mqtt";
const options = {
  username: "sfftsya",
  password: "Tasya_1875",
  clientId: 'web_dashboard_' + Math.random().toString(16).substr(2, 8),
  keepalive: 60,
  clean: true,
};

// Connect to HiveMQ
const client = mqtt.connect(brokerUrl, options);

client.on("connect", function() {
  console.log("✅ MQTT Connected to HiveMQ");
  
  // Subscribe to all topics
  client.subscribe("autokelas/elampu1/status");
  client.subscribe("autokelas/elampu2/status");
  client.subscribe("autokelas/esoket1/status");
  client.subscribe("autokelas/esoket2/status");
  client.subscribe("autokelas/kehadiran1");
  client.subscribe("autokelas/kehadiran2");
  
  console.log("📡 Subscribed to all topics");
});

client.on("error", function(error) {
  console.log("❌ MQTT Error: ", error);
});

client.on("message", function(topic, message) {
  let msg = message.toString();
  console.log(`📨 Topic: ${topic}, Message: ${msg}`);

  // Lamp 1 Status
  if (topic === "autokelas/elampu1/status") {
    document.getElementById("lamp1text").innerText = msg;
    let dot = document.getElementById("lamp1dot");
    if (msg === "ON") {
      dot.classList.remove("off");
      dot.classList.add("on");
    } else {
      dot.classList.remove("on");
      dot.classList.add("off");
    }
  }

  // Lamp 2 Status
  if (topic === "autokelas/elampu2/status") {
    document.getElementById("lamp2text").innerText = msg;
    let dot = document.getElementById("lamp2dot");
    if (msg === "ON") {
      dot.classList.remove("off");
      dot.classList.add("on");
    } else {
      dot.classList.remove("on");
      dot.classList.add("off");
    }
  }

  // Socket 1 Status
  if (topic === "autokelas/esoket1/status") {
    document.getElementById("soket1text").innerText = msg;
    let dot = document.getElementById("soket1dot");
    if (msg === "ON") {
      dot.classList.remove("off");
      dot.classList.add("on");
    } else {
      dot.classList.remove("on");
      dot.classList.add("off");
    }
  }

  // Socket 2 Status
  if (topic === "autokelas/esoket2/status") {
    document.getElementById("soket2text").innerText = msg;
    let dot = document.getElementById("soket2dot");
    if (msg === "ON") {
      dot.classList.remove("off");
      dot.classList.add("on");
    } else {
      dot.classList.remove("on");
      dot.classList.add("off");
    }
  }

  // Attendance Kehadiran 1
  if (topic === "autokelas/kehadiran1") {
    try {
      let data = JSON.parse(msg);
      let tbody = document.getElementById("attendance1");
      let row = tbody.insertRow(0);
      let name = row.insertCell(0);
      let date = row.insertCell(1);
      let time = row.insertCell(2);
      name.innerHTML = data.name || "Unknown";
      date.innerHTML = data.date || new Date().toLocaleDateString();
      time.innerHTML = data.time || new Date().toLocaleTimeString();
    } catch (e) {
      console.log("Error parsing attendance1 data:", e);
    }
  }

  // Attendance Kehadiran 2
  if (topic === "autokelas/kehadiran2") {
    try {
      let data = JSON.parse(msg);
      let tbody = document.getElementById("attendance2");
      let row = tbody.insertRow(0);
      let name = row.insertCell(0);
      let date = row.insertCell(1);
      let time = row.insertCell(2);
      name.innerHTML = data.name || "Unknown";
      date.innerHTML = data.date || new Date().toLocaleDateString();
      time.innerHTML = data.time || new Date().toLocaleTimeString();
    } catch (e) {
      console.log("Error parsing attendance2 data:", e);
    }
  }
});

// Control Functions for Buttons
window.lamp1ON = function() {
  if (client && client.connected) {
    client.publish("autokelas/elampu1/control", "ON");
    console.log("Lamp 1 ON command sent");
  } else {
    alert("MQTT not connected!");
  }
};

window.lamp1OFF = function() {
  if (client && client.connected) {
    client.publish("autokelas/elampu1/control", "OFF");
    console.log("Lamp 1 OFF command sent");
  } else {
    alert("MQTT not connected!");
  }
};

window.lamp2ON = function() {
  if (client && client.connected) {
    client.publish("autokelas/elampu2/control", "ON");
    console.log("Lamp 2 ON command sent");
  } else {
    alert("MQTT not connected!");
  }
};

window.lamp2OFF = function() {
  if (client && client.connected) {
    client.publish("autokelas/elampu2/control", "OFF");
    console.log("Lamp 2 OFF command sent");
  } else {
    alert("MQTT not connected!");
  }
};

window.soket1ON = function() {
  if (client && client.connected) {
    client.publish("autokelas/esoket1/control", "ON");
    console.log("Socket 1 ON command sent");
  } else {
    alert("MQTT not connected!");
  }
};

window.soket1OFF = function() {
  if (client && client.connected) {
    client.publish("autokelas/esoket1/control", "OFF");
    console.log("Socket 1 OFF command sent");
  } else {
    alert("MQTT not connected!");
  }
};

window.soket2ON = function() {
  if (client && client.connected) {
    client.publish("autokelas/esoket2/control", "ON");
    console.log("Socket 2 ON command sent");
  } else {
    alert("MQTT not connected!");
  }
};

window.soket2OFF = function() {
  if (client && client.connected) {
    client.publish("autokelas/esoket2/control", "OFF");
    console.log("Socket 2 OFF command sent");
  } else {
    alert("MQTT not connected!");
  }
};