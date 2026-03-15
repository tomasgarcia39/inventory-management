/**
 * Global State - Gestión de estado de la aplicación
 */
let editMode = false;
let currentEditId = null;

// Inicialización: Esperamos a que el DOM esté cargado para asignar eventos
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    
    // Event Listeners (Forma profesional de manejar eventos sin ensuciar el HTML)
    document.getElementById('btnGuardar').addEventListener('click', handleSubmit);
});

/**
 * READ: Obtener y mostrar productos
 */
function fetchProducts() {
    fetch('/productos')
        .then(res => {
            if (!res.ok) throw new Error("Error en la red");
            return res.json();
        })
        .then(data => renderTable(data))
        .catch(err => console.error("Error al cargar productos:", err));
}

function renderTable(productos) {
    const tbody = document.getElementById('lista');
    tbody.innerHTML = productos.map(p => `
        <tr>
            <td>#${p.id}</td>
            <td><strong>${p.nombre}</strong></td>
            <td>$${p.precio.toFixed(2)}</td>
            <td>${p.stock}</td>
            <td>
                <button class="btn-edit" onclick="setupEdit(${p.id}, '${p.nombre}', ${p.precio}, ${p.stock})">Editar</button>
                <button class="btn-delete" onclick="deleteProduct(${p.id}, '${p.nombre}')">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

/**
 * CREATE & UPDATE: Lógica de envío dual
 */
function handleSubmit() {
    const nombre = document.getElementById('nombre').value.trim();
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;

    // Validación de integridad de datos (Frontend Guard)
    if (!nombre || !precio || !stock) {
        alert("⚠️ Por favor, complete todos los campos obligatorios.");
        return;
    }

    const productoData = { 
        nombre, 
        precio: parseFloat(precio), 
        stock: parseInt(stock) 
    };

    // Determinamos la URL y el método HTTP según el estado (RESTful Best Practices)
    const url = editMode ? `/productos/${currentEditId}` : '/productos';
    const method = editMode ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoData)
    })
    .then(res => {
        if (res.ok) {
            fetchProducts();
            resetForm();
        } else {
            alert("Error al procesar la solicitud.");
        }
    })
    .catch(err => console.error("Error en el servidor:", err));
}

/**
 * UPDATE: Preparar la UI para edición
 */
function setupEdit(id, nombre, precio, stock) {
    editMode = true;
    currentEditId = id;

    // Llenamos el formulario con los datos actuales
    document.getElementById('nombre').value = nombre;
    document.getElementById('precio').value = precio;
    document.getElementById('stock').value = stock;

    // Cambiamos el estilo visual para indicar el modo edición (UX)
    const btn = document.getElementById('btnGuardar');
    btn.innerText = "Actualizar Producto";
    btn.style.background = "#059669"; // Verde esmeralda para acción positiva
}

/**
 * DELETE: Eliminación con confirmación
 */
function deleteProduct(id, nombre) {
    if (confirm(`¿Está seguro de que desea eliminar "${nombre}"? Esta acción no se puede deshacer.`)) {
        fetch(`/delete/${id}`, { method: 'GET' }) // Nota: En una API real usaríamos DELETE, pero mantenemos tu ruta actual.
            .then(() => fetchProducts())
            .catch(err => console.error("Error al borrar:", err));
    }
}

/**
 * UI Utility: Limpiar el formulario y resetear estado
 */
function resetForm() {
    editMode = false;
    currentEditId = null;
    
    document.getElementById('nombre').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('stock').value = '';

    const btn = document.getElementById('btnGuardar');
    btn.innerText = "Guardar Producto";
    btn.style.background = "#2563eb"; // Volver al azul primario
}