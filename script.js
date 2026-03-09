const options={
username:"sfftsya",
password:"Tasya_1875"
}

const client=mqtt.connect("wss://f5ed2fda712540be846684a2587c2008.s1.eu.hivemq.cloud:8884/mqtt",options)

client.on("connect",function(){

console.log("MQTT Connected")

client.subscribe("autokelas/+/+/status")
client.subscribe("autokelas/attendance")

})

client.on("message",function(topic,message){

let msg=message.toString()

// Lamp Status
if(topic==="autokelas/elampu1/status"){

document.getElementById("lamp1text").innerText=msg

let dot=document.getElementById("lamp1dot")

if(msg==="ON"){
dot.classList.remove("off")
dot.classList.add("on")
}else{
dot.classList.remove("on")
dot.classList.add("off")
}

}

if(topic==="autokelas/elampu2/status"){

document.getElementById("lamp2text").innerText=msg

let dot=document.getElementById("lamp2dot")

if(msg==="ON"){
dot.classList.remove("off")
dot.classList.add("on")
}else{
dot.classList.remove("on")
dot.classList.add("off")
}

}

if(topic==="autokelas/esoket1/status"){

document.getElementById("soket1text").innerText=msg

let dot=document.getElementById("soket1dot")

if(msg==="ON"){
dot.classList.remove("off")
dot.classList.add("on")
}else{
dot.classList.remove("on")
dot.classList.add("off")
}

}

if(topic==="autokelas/esoket2/status"){

document.getElementById("soket2text").innerText=msg

let dot=document.getElementById("soket2dot")

if(msg==="ON"){
dot.classList.remove("off")
dot.classList.add("on")
}else{
dot.classList.remove("on")
dot.classList.add("off")
}

}

// Attendance
// Kehadiran 1
if(topic==="autokelas/kehadiran1"){

let data=JSON.parse(msg)

let table=document.getElementById("attendance1")

let row=table.insertRow(0)

let name=row.insertCell(0)
let date=row.insertCell(1)
let time=row.insertCell(2)

name.innerHTML=data.name
date.innerHTML=data.date
time.innerHTML=data.time

}

// Kehadiran 2
if(topic==="autokelas/kehadiran2"){

let data=JSON.parse(msg)

let table=document.getElementById("attendance2")

let row=table.insertRow(0)

let name=row.insertCell(0)
let date=row.insertCell(1)
let time=row.insertCell(2)

name.innerHTML=data.name
date.innerHTML=data.date
time.innerHTML=data.time

}