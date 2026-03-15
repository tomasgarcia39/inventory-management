package com.tomasgarcia.inventory_management.repository;

import com.tomasgarcia.inventory_management.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // Aquí ya tenés métodos como save(), findAll(), deleteById(), etc.
}