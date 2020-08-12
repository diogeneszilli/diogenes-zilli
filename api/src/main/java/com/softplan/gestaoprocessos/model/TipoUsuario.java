package com.softplan.gestaoprocessos.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum TipoUsuario {

    ADMINISTRADOR, TRIADOR, FINALIZADOR;

    @JsonValue
    public String get() {
        return this.name().toUpperCase();
    }

    @JsonCreator
    public static TipoUsuario create(String value) {
        return TipoUsuario.valueOf(value.toUpperCase());
    }
}
