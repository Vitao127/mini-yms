const drivers = {
  "DRV001": { nome: "João da Silva" },
  "DRV002": { nome: "Maria Santos" },
  "DRV003": { nome: "Carlos Oliveira" }
};

let currentDriver = null;
const input = document.getElementById("scannerInput");

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const code = input.value.trim();
    input.value = "";
    handleScan(code);
  }
});

function handleScan(code) {
  if (!drivers[code]) {
    alert("Driver não encontrado");
    return;
  }

  currentDriver = drivers[code];
  document.getElementById("driverName").innerText = currentDriver.nome;
  showScreen("screen-driver");
}

function registerMovement(type) {
  console.log("Movimento:", type, currentDriver);
  showScreen("screen-ok");

  setTimeout(() => {
    showScreen("screen-scan");
    input.focus();
  }, 3000);
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

input.focus();
