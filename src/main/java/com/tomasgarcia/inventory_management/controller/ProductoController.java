package com.tomasgarcia.inventory_management.controller;

import com.tomasgarcia.inventory_management.model.Producto;
import com.tomasgarcia.inventory_management.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@RestController
public class ProductoController {

    @Autowired
    private ProductoRepository repository;

    // Listar todos los productos
    @GetMapping("/productos")
    public List<Producto> getAll() {
        return repository.findAll();
    }

    // GUARDAR un producto desde el formulario (JSON)
    @PostMapping("/productos")
    public Producto crearProducto(@RequestBody Producto producto) {
        return repository.save(producto);
    }

    // Borrar un producto por ID
    @GetMapping("/delete/{id}")
    public String deleteProducto(@PathVariable Long id) {
        repository.deleteById(id);
        return "¡Producto eliminado!";
    }

    // Tu ruta de prueba vieja (opcional)
    @GetMapping("/test-save")
    public String testSave() {
        Producto p = new Producto();
        p.setNombre("Teclado Gamer");
        p.setPrecio(5500.0);
        p.setStock(15);
        repository.save(p);
        return "¡Producto guardado!";
    }
 // Asegurate de tener estas importaciones arriba:
 // import org.springframework.web.bind.annotation.PutMapping;
 // import org.springframework.web.bind.annotation.PathVariable;
 // import org.springframework.web.bind.annotation.RequestBody;

 @PutMapping("/productos/{id}")
 public Producto actualizarProducto(@PathVariable Long id, @RequestBody Producto detallesProducto) {
     return repository.findById(id).map(producto -> {
         producto.setNombre(detallesProducto.getNombre());
         producto.setPrecio(detallesProducto.getPrecio());
         producto.setStock(detallesProducto.getStock());
         return repository.save(producto);
     }).orElseGet(() -> {
         // Por seguridad, si no existe el ID, le asignamos el ID y lo creamos
         detallesProducto.setId(id);
         return repository.save(detallesProducto);
     });
 }
}