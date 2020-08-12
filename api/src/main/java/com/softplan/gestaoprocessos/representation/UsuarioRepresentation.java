package com.softplan.gestaoprocessos.representation;

import com.softplan.gestaoprocessos.model.TipoUsuario;
import com.softplan.gestaoprocessos.model.Usuario;
import lombok.Data;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Data
@Component
public class UsuarioRepresentation {

    private Long id;
    private String login;
    private String senha;
    private TipoUsuario tipoUsuario;

    public static UsuarioRepresentation build(Usuario usuario) {
        return new UsuarioRepresentation.Builder()
                .login(usuario.getLogin())
                .senha(usuario.getSenha())
                .tipoUsuario(usuario.getTipoUsuario().name())
                .build();
    }

    public static UsuarioRepresentation buildToSecurity(Usuario usuario) {
        return new UsuarioRepresentation.Builder()
                .id(usuario.getId())
                .login(usuario.getLogin())
                .tipoUsuario(usuario.getTipoUsuario().name())
                .build();
    }

    public static List<UsuarioRepresentation> toRepresentation(List<Usuario> usuarios) {
        Objects.requireNonNull(usuarios);
        return usuarios.stream()
                .map(UsuarioRepresentation::buildToSecurity)
                .collect(Collectors.toList());
    }

    public static Usuario fromRepresentation(UsuarioRepresentation usuario) {
        return new Usuario.Builder()
                .id(usuario.getId())
                .login(usuario.getLogin())
                .senha(usuario.getSenha())
                .tipoUsuario(usuario.getTipoUsuario().name())
                .build();
    }

    public static class Builder {

        private UsuarioRepresentation usuario;

        public Builder() {
            usuario = new UsuarioRepresentation();
        }

        public UsuarioRepresentation.Builder id(Long id) {
            usuario.setId(id);
            return this;
        }

        public UsuarioRepresentation.Builder login(String login) {
            usuario.setLogin(login);
            return this;
        }

        public UsuarioRepresentation.Builder senha(String senha) {
            usuario.setSenha(senha);
            return this;
        }

        public UsuarioRepresentation.Builder tipoUsuario(String tipoUsuario) {
            usuario.setTipoUsuario(TipoUsuario.valueOf(tipoUsuario));
            return this;
        }

        public UsuarioRepresentation build() {
            return usuario;
        }

    }
}
