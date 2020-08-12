package com.softplan.gestaoprocessos.controller;

import com.softplan.gestaoprocessos.model.User;
import com.softplan.gestaoprocessos.repository.UserRepository;
import com.softplan.gestaoprocessos.representation.UserRepresentation;
import com.softplan.gestaoprocessos.service.UserService;
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
public class UserController {

    @Autowired
    private UserRepository repository;

    @Autowired
    private UserService service;

    @Autowired
    private UserRepresentation representation;

    @GetMapping
    public ResponseEntity<?> findAll() {
        List<User> users = repository.findAll();
        return new ResponseEntity(representation.toRepresentation(users), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        try {
            User user = repository.findUserById(id);
            return id.equals(user.getId())
                    ? new ResponseEntity(UserRepresentation.build(user), HttpStatus.OK)
                    : new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception err) {
            return new ResponseEntity(HttpStatus.PRECONDITION_FAILED);
        }
    }

    @PostMapping
    public ResponseEntity<?> insert(@RequestBody UserRepresentation entity) {
        try {
            User user = UserRepresentation.fromRepresentation(entity);
            service.save(user);
            return new ResponseEntity(HttpStatus.CREATED);
        } catch (Exception err) {
            return new ResponseEntity(HttpStatus.PRECONDITION_FAILED);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody UserRepresentation entity) {
        try {
            User userConsolidado = repository.findUserById(id);
            User user = UserRepresentation.fromRepresentation(entity);
            if (Objects.nonNull(userConsolidado)) {
                service.save(user);
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
