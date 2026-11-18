const CLAVE = "tareas";
const input = document.getElementById("tarea");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");

function leer() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE)) || [];
    } catch (e) {
        return [];
    }
}

function escribir(tareas) {
    localStorage.setItem(CLAVE, JSON.stringify(tareas));
}

function guardar() {
    const texto = input.value.trim();
    if (texto === "") {
        input.classList.add("is-invalid");
        return;
    }
    input.classList.remove("is-invalid");
    const tareas = leer();
    tareas.push({ texto: texto, hecha: false });
    escribir(tareas);
    input.value = "";
    input.focus();
    mostrar();
}

function alternar(i) {
    const tareas = leer();
    tareas[i].hecha = !tareas[i].hecha;
    escribir(tareas);
    mostrar();
}

function eliminar(i) {
    const tareas = leer();
    tareas.splice(i, 1);
    escribir(tareas);
    mostrar();
}

function limpiarTodo() {
    if (confirm("¿Borrar todas las tareas?")) {
        localStorage.removeItem(CLAVE);
        mostrar();
    }
}

function mostrar() {
    const tareas = leer();
    lista.innerHTML = "";

    if (tareas.length === 0) {
        lista.innerHTML = '<li class="list-group-item text-muted">No hay tareas todavía</li>';
    }

    tareas.forEach((t, i) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        const span = document.createElement("span");
        span.textContent = t.texto; 
        span.style.cursor = "pointer";
        if (t.hecha) span.className = "text-decoration-line-through text-muted";
        span.addEventListener("click", () => alternar(i));

        const btn = document.createElement("button");
        btn.className = "btn btn-sm btn-outline-danger";
        btn.textContent = "Eliminar";
        btn.addEventListener("click", () => eliminar(i));

        li.append(span, btn);
        lista.appendChild(li);
    });

    const pendientes = tareas.filter(t => !t.hecha).length;
    contador.textContent = `${pendientes} pendiente(s) de ${tareas.length}`;
}

input.addEventListener("keydown", e => { if (e.key === "Enter") guardar(); });
mostrar();
