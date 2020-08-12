package com.softplan.gestaoprocessos.controller;

import com.softplan.gestaoprocessos.model.Usuario;
import com.softplan.gestaoprocessos.repository.UsuarioRepository;
import com.softplan.gestaoprocessos.representation.UsuarioRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/usuarios")
@Scope(WebApplicationContext.SCOPE_REQUEST)
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private UsuarioRepresentation representation;

    @GetMapping
    public ResponseEntity<?> findAll() {
        List<Usuario> usuarios = repository.findAll();
        return new ResponseEntity(representation.toRepresentation(usuarios), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        System.out.println(id);
        try {
            Usuario usuario = repository.findUserById(id);
            return id.equals(usuario.getId())
                    ? new ResponseEntity(UsuarioRepresentation.buildToSecurity(usuario), HttpStatus.OK)
                    : new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception err) {
            return new ResponseEntity(HttpStatus.PRECONDITION_FAILED);
        }
    }

    @PostMapping
    public ResponseEntity<?> insert(@RequestBody UsuarioRepresentation dto) {
        try {
            Usuario usuario = UsuarioRepresentation.fromRepresentation(dto);
            repository.save(usuario);
            return new ResponseEntity(HttpStatus.CREATED);
        } catch (Exception err) {
            return new ResponseEntity(HttpStatus.PRECONDITION_FAILED);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody UsuarioRepresentation dto) {
        try {
            Usuario usuarioConsolidado = repository.findUserById(id);
            Usuario usuario = UsuarioRepresentation.fromRepresentation(dto);
            if (Objects.nonNull(usuarioConsolidado)) {
                repository.save(usuario);
                return new ResponseEntity(HttpStatus.OK);
            }
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception err) {
            return new ResponseEntity(HttpStatus.PRECONDITION_FAILED);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        try {
            repository.deleteById(id);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception err) {
            return new ResponseEntity(HttpStatus.PRECONDITION_FAILED);
        }
    }
}
