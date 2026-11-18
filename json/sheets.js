// Práctico Google Sheet: lee un CSV publicado en la web.
// OJO: el enlace debe terminar en output=csv (NO usar pubhtml).
const URL_SHEET = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRXypFcqWwxY2QRGyhllpgPtcM2R03He3YcIVIRfC7sadbtsfd4bQ5y-Eb87eg623pKrDDPf-1nIy4D/pub?gid=1368379197&single=true&output=csv";
const ORIGEN = URL_SHEET || "../data/datos.csv";

const thead = document.getElementById("encabezado");
const tbody = document.getElementById("tabla");
const info = document.getElementById("info");
const buscador = document.getElementById("buscador");
let filas = [];

// Evita que el contenido de la hoja se interprete como HTML
function escapar(t) {
    return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Parser CSV que respeta comillas (por si una celda tiene comas)
function parsearCSV(texto) {
    const resultado = [];
    let fila = [], celda = "", comillas = false;
    for (let i = 0; i < texto.length; i++) {
        const c = texto[i];
        if (comillas) {
            if (c === '"' && texto[i + 1] === '"') { celda += '"'; i++; }
            else if (c === '"') { comillas = false; }
            else { celda += c; }
        } else if (c === '"') { comillas = true; }
        else if (c === ",") { fila.push(celda); celda = ""; }
        else if (c === "\n" || c === "\r") {
            if (c === "\r" && texto[i + 1] === "\n") i++;
            fila.push(celda); celda = "";
            resultado.push(fila); fila = [];
        } else { celda += c; }
    }
    if (celda !== "" || fila.length) { fila.push(celda); resultado.push(fila); }
    return resultado.filter(f => f.some(c => c.trim() !== ""));
}

function dibujar(lista) {
    tbody.innerHTML = lista.map(f =>
        "<tr>" + f.map(c => `<td>${escapar(c)}</td>`).join("") + "</tr>"
    ).join("");
    info.className = "text-muted";
    info.textContent = `${lista.length} de ${filas.length} registros`;
}

fetch(ORIGEN)
    .then(res => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.text();
    })
    .then(texto => {
        if (texto.trim().startsWith("<")) {
            throw new Error("La URL devolvió HTML, no CSV. Debe terminar en output=csv");
        }
        const datos = parsearCSV(texto);
        const cabecera = datos.shift();
        thead.innerHTML = "<tr>" + cabecera.map(c => `<th>${escapar(c)}</th>`).join("") + "</tr>";
        filas = datos;
        dibujar(filas);
    })
    .catch(err => {
        console.error(err);
        info.className = "alert alert-danger";
        info.textContent = "No se pudo cargar el CSV: " + err.message;
    });

buscador.addEventListener("input", () => {
    const q = buscador.value.toLowerCase();
    dibujar(filas.filter(f => f.join(" ").toLowerCase().includes(q)));
});
