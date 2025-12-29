const API_URL = "https://script.google.com/macros/s/AKfycbzOEP4rt8RsQsPihHdvuq8R-mgYhe3KMs2Lr8fPphr04s9z4pYNRwxmm0GlINMiZaguOQ/exec";

let currentDriver = null;
const input = document.getElementById("scannerInput");

/* Scanner físico (Enter) */
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    buscarDriver();
  }
});

/* Busca manual */
function manualSearch() {
  buscarDriver();
}

function buscarDriver() {
  const code = input.value.trim();
  if (!code) {
    alert("Digite o ID do Driver");
    return;
  }

  input.value = "";

  fetch(`${API_URL}?id=${encodeURIComponent(code)}`)
    .then(res => res.json())
    .then(driver => {
      if (!driver.found) {
        alert("Driver não encontrado");
        return;
      }

      currentDriver = driver;

      document.getElementById("driverName").innerText =
        `${driver.nome}\n${driver.placa} - ${driver.veiculo}`;

      showScreen("screen-driver");
    })
    .catch(err => {
      alert("Erro ao conectar com a planilha");
      console.error(err);
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
    currentDriver = null;
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







