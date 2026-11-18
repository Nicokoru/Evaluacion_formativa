// Práctico JSON: base de datos simulada con datos.json
const tbody = document.getElementById("tabla");
const info = document.getElementById("info");
let personas = [];

// Rutas donde buscar datos.json (por si la carpeta quedó en otro lugar)
const RUTAS = ["../data/datos.json", "../datos.json", "datos.json", "../js/datos.json"];

// Copia de respaldo: se usa solo si no se puede leer ningún archivo
const RESPALDO = [
    {nombre: "Ana",       edad: 22, correo: "ana@correo.cl"},
    {nombre: "Luis",      edad: 28, correo: "luis@correo.cl"},
    {nombre: "Camila",    edad: 19, correo: "camila@correo.cl"},
    {nombre: "Diego",     edad: 31, correo: "diego@correo.cl"},
    {nombre: "Valentina", edad: 25, correo: "valentina@correo.cl"},
    {nombre: "Matías",    edad: 27, correo: "matias@correo.cl"},
    {nombre: "Javiera",   edad: 23, correo: "javiera@correo.cl"},
    {nombre: "Felipe",    edad: 35, correo: "felipe@correo.cl"},
    {nombre: "Constanza", edad: 29, correo: "constanza@correo.cl"},
    {nombre: "Benjamín",  edad: 21, correo: "benjamin@correo.cl"}
];

function avisar(texto, tipo) {
    info.className = "alert alert-" + tipo;
    info.textContent = texto;
}

function dibujar(lista) {
    tbody.innerHTML = lista.map(p =>
        `<tr><td>${p.nombre}</td><td>${p.edad}</td><td>${p.correo}</td></tr>`
    ).join("");
    // Si hay un aviso de error no lo pisamos con el contador
    if (!info.classList.contains("alert-danger") && !info.classList.contains("alert-warning")) {
        info.className = "text-muted";
        info.textContent = `Mostrando ${lista.length} de ${personas.length} personas`;
    }
}

function mostrarTodos() {
    dibujar(personas);
}

// Actividad: filtrar mayores de 25 años con filter()
function filtrarMayores() {
    const mayores = personas.filter(p => p.edad > 25);
    dibujar(mayores);
}

async function cargar() {
    for (const ruta of RUTAS) {
        try {
            const res = await fetch(ruta);
            if (!res.ok) throw new Error("HTTP " + res.status);
            personas = await res.json();
            console.log("datos.json cargado desde:", ruta);
            mostrarTodos();
            return;
        } catch (e) {
            console.warn("No se pudo leer", ruta, "->", e.message);
        }
    }
    // Ninguna ruta funcionó: usamos el respaldo y avisamos
    personas = RESPALDO;
    mostrarTodos();
    avisar("No se pudo leer datos.json (¿abriste el sitio sin Live Server o está en otra carpeta?). " +
           "Se muestran los datos de respaldo. Revisa la consola (F12).", "warning");
}

cargar();
