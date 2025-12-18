const API_URL = "https://script.google.com/a/macros/shopeemobile-external.com/s/AKfycbzFgEeta2lC4-p5JZLwuztcBj6DhtoB6x3Kvf-9rRsxAUTnOAx7KhUswEHgS2Hl1LRx/exec";

let currentDriver = null;
const input = document.getElementById("scannerInput");

/* Scanner físico (Enter) */
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const code = input.value.trim();
    input.value = "";
    handleScan(code);
  }
});

/* Busca manual (botão) */
function manualSearch() {
  const code = input.value.trim();
  if (!code) {
    alert("Digite o ID do Driver");
    return;
  }
  input.value = "";
  handleScan(code);
}

/* Busca driver na planilha */
function handleScan(code) {
  fetch(`${API_URL}?id=${encodeURIComponent(code)}`)
    .then(res => res.json())
    .then(driver => {

      if (!driver || !driver.id) {
        alert("Driver não encontrado");
        return;
      }

      currentDriver = driver;

      document.getElementById("driverName").innerText =
        `${driver.nome}\n${driver.placa} - ${driver.veiculo}`;

      showScreen("screen-driver");
    })
    .catch(() => {
      alert("Erro ao conectar com a planilha");
    });
}

/* Registra Entrada ou Saída */
function registerMovement(tipo) {
  if (!currentDriver) return;

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      id: currentDriver.id,
      tipo: tipo
    })
  });

  showScreen("screen-ok");

  setTimeout(() => {
    showScreen("screen-scan");
    input.focus();
  }, 3000);
}

/* Controle de telas */
function showScreen(id) {
  document.querySelectorAll(".screen")
    .forEach(s => s.classList.remove("active"));

  document.getElementById(id).classList.add("active");
}

input.focus();

