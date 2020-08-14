package com.softplan.gestaoprocessos.controller;

import com.softplan.gestaoprocessos.model.Processo;
import com.softplan.gestaoprocessos.repository.ProcessoRepository;
import com.softplan.gestaoprocessos.representation.ProcessoRepresentation;
import com.softplan.gestaoprocessos.service.ProcessoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/processos")
@Transactional
@Scope(WebApplicationContext.SCOPE_REQUEST)
public class ProcessoController {

    @Autowired
    private ProcessoRepository repository;

    @Autowired
    private ProcessoService service;

    @Autowired
    private ProcessoRepresentation representation;


    @GetMapping
    @PreAuthorize("hasRole('TRIADOR')")
    public ResponseEntity<?> findAll() {
        List<Processo> processos = repository.findAll();
        return new ResponseEntity(ProcessoRepresentation.toRepresentation(processos), HttpStatus.OK);
    }


    @GetMapping("/parecer-pendente/{id}")
    @PreAuthorize("hasRole('FINALIZADOR')")
    public ResponseEntity<?> findParecerPendenteByUserId(@PathVariable("id") Long id) {
        List<Processo> processos = service.findAllParecerPendente(id);
        return new ResponseEntity(ProcessoRepresentation.toRepresentation(processos), HttpStatus.OK);
    }


    @GetMapping("/{id}")
    @PreAuthorize("hasRole('TRIADOR') or hasRole('FINALIZADOR')")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        try {
            Processo processo = repository.findProcessoById(id);
            return id.equals(processo.getId())
                    ? new ResponseEntity(processo, HttpStatus.OK)
                    : new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception err) {
            return new ResponseEntity(HttpStatus.PRECONDITION_FAILED);
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('TRIADOR') or hasRole('FINALIZADOR')")
    public ResponseEntity<?> insert(@RequestBody ProcessoRepresentation entity) {
        try {
            Processo processo = ProcessoRepresentation.fromRepresentation(entity);
            repository.save(processo);
            return new ResponseEntity(HttpStatus.CREATED);
        } catch (Exception err) {
            return new ResponseEntity(HttpStatus.PRECONDITION_FAILED);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('TRIADOR') or hasRole('FINALIZADOR')")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody ProcessoRepresentation entity) {
        try {
            Processo processoConsolidado = repository.findProcessoById(id);
            Processo processo = ProcessoRepresentation.fromRepresentation(entity);
            if (Objects.nonNull(processoConsolidado)) {
                repository.save(processo);
                return new ResponseEntity(HttpStatus.OK);
            }
            return new ResponseEntity(HttpStatus.PRECONDITION_FAILED);
        } catch (Exception err) {
            return new ResponseEntity(HttpStatus.PRECONDITION_FAILED);
        }
    }
}
