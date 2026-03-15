let editMode = false;
let currentEditId = null;
let allProducts = []; // Copia local para búsqueda instantánea

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    
    document.getElementById('btnGuardar').addEventListener('click', handleSubmit);
    document.getElementById('btnCancelar').addEventListener('click', resetForm);
    
    // Filtro de búsqueda en tiempo real
    document.getElementById('inputBusqueda').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allProducts.filter(p => 
            p.nombre.toLowerCase().includes(term) || p.id.toString().includes(term)
        );
        renderTable(filtered);
    });
});

function fetchProducts() {
    fetch('/productos')
        .then(res => res.json())
        .then(data => {
            allProducts = data; 
            renderTable(data);
        })
        .catch(err => console.error("Error al cargar:", err));
}

function renderTable(productos) {
    const tbody = document.getElementById('lista');
    tbody.innerHTML = productos.map(p => `
        <tr>
            <td>#${p.id}</td>
            <td><strong>${p.nombre}</strong></td>
            <td>$${p.precio.toFixed(2)}</td>
            <td>${p.stock} u.</td>
            <td>
                <button class="btn-edit" onclick="setupEdit(${p.id}, '${p.nombre}', ${p.precio}, ${p.stock})">Editar</button>
                <button class="btn-delete" onclick="deleteProduct(${p.id}, '${p.nombre}')">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

function handleSubmit() {
    const nombre = document.getElementById('nombre').value.trim();
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;

    if (!nombre || !precio || !stock) {
        alert("⚠️ Por favor, completa todos los campos.");
        return;
    }

    const productoData = { nombre, precio: parseFloat(precio), stock: parseInt(stock) };
    const url = editMode ? `/productos/${currentEditId}` : '/productos';
    const method = editMode ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoData)
    }).then(res => {
        if (res.ok) {
            fetchProducts();
            resetForm();
        }
    });
}

function setupEdit(id, nombre, precio, stock) {
    editMode = true;
    currentEditId = id;

    document.getElementById('nombre').value = nombre;
    document.getElementById('precio').value = precio;
    document.getElementById('stock').value = stock;

    const btnG = document.getElementById('btnGuardar');
    btnG.innerText = "Actualizar";
    btnG.style.background = "#059669";
    document.getElementById('btnCancelar').style.display = "inline-block";
}

function resetForm() {
    editMode = false;
    currentEditId = null;
    document.getElementById('nombre').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('stock').value = '';

    const btnG = document.getElementById('btnGuardar');
    btnG.innerText = "Guardar";
    btnG.style.background = "#2563eb";
    document.getElementById('btnCancelar').style.display = "none";
}

function deleteProduct(id, nombre) {
    if (confirm(`¿Estás seguro de eliminar "${nombre}"?`)) {
        fetch(`/delete/${id}`).then(() => fetchProducts());
    }
}