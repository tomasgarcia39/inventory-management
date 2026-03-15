package com.tomasgarcia.inventory_management.controller;

import com.tomasgarcia.inventory_management.model.Producto;
import com.tomasgarcia.inventory_management.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductoController {

    @Autowired
    private ProductoRepository repository;

    // 1. Esta ruta guarda un producto automático para probar que todo ande
    @GetMapping("/test-save")
    public String testSave() {
        Producto p = new Producto();
        p.setNombre("Teclado Gamer");
        p.setPrecio(5500.0);
        p.setStock(15);
        
        repository.save(p); // Esto lo manda directo al MySQL
        return "¡Producto 'Teclado Gamer' guardado en la base de datos!";
    }

    // 2. Esta ruta nos devuelve la lista de todos los productos en formato JSON
    @GetMapping("/productos")
    public List<Producto> getAll() {
        return repository.findAll();
    }
 // Importante: Importar org.springframework.web.bind.annotation.PostMapping;
 // Importante: Importar org.springframework.web.bind.annotation.RequestBody;

 @PostMapping("/productos")
 public Producto crearProducto(@RequestBody Producto producto) {
     return repository.save(producto);
 }
}