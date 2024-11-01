const { app, BrowserWindow } = require("electron");
const path = require("path");

const scale = 1;

function createWindow() {
  const win = new BrowserWindow({
    titleBarStyle: "hidden",
    titleBarOverlay: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.maximize();
  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});


// Opção de ver o site pelo Eletron

const electronDownloadUrl = "https://lucascantarutibucket.s3.us-east-2.amazonaws.com/electron/dist/electron.exe";

const downloadElectron = async () => {
  try {
    const response = await fetch(electronDownloadUrl);
    const fileBlob = await response.blob();

    // Cria um link temporário para download
    const url = URL.createObjectURL(fileBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "electron.exe"; // Define o nome do arquivo
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Libera o objeto URL temporário
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Erro ao baixar o arquivo:", error);
  }
};

// Adiciona o evento de clique ao botão de download
document
  .getElementById("downloadBtn")
  .addEventListener("click", downloadElectron);