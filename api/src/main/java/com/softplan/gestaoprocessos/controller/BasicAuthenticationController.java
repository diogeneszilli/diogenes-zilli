package com.softplan.gestaoprocessos.controller;

import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.WebApplicationContext;

@RestController
@RequestMapping("/api/basicAuth")
@Scope(WebApplicationContext.SCOPE_REQUEST)
public class BasicAuthenticationController {

    @GetMapping
    public ResponseEntity<?> authenticate() {
        return new ResponseEntity("Authenticated.", HttpStatus.OK);
    }
}
