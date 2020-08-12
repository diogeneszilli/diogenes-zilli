package com.softplan.gestaoprocessos.representation;

import com.softplan.gestaoprocessos.model.Usuario;

public class UsuarioRepresentation {

    public static Usuario build(Usuario usuario) {
        return new Usuario.Builder()
                .login(usuario.getLogin())
                .senha(usuario.getSenha())
                .tipoUsuario(usuario.getTipoUsuario().name())
                .build();
    }
}
