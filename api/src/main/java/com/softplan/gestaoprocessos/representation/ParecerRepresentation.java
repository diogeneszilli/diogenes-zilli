package com.softplan.gestaoprocessos.representation;

import com.softplan.gestaoprocessos.model.Parecer;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@Component
public class ParecerRepresentation {

    private Long id;
    private UserRepresentation user;
    private String descricao;
    private Boolean pendente;

    public static ParecerRepresentation build(Parecer parecer) {
        return new ParecerRepresentation.Builder()
                .id(parecer.getId())
                .descricao(parecer.getDescricao())
                .pendente(parecer.getPendente())
                .user(UserRepresentation.build(parecer.getUser()))
                .build();
    }

    public static List<ParecerRepresentation> toRepresentation(List<Parecer> pareceres) {
        Objects.requireNonNull(pareceres);
        return pareceres.stream()
                .map(ParecerRepresentation::build)
                .collect(Collectors.toList());
    }

    public static Parecer fromRepresentation(ParecerRepresentation parecer) {
        return new Parecer.Builder()
                .id(parecer.getId())
                .descricao(parecer.getDescricao())
                .pendente(parecer.getPendente())
                .usuario(UserRepresentation.fromRepresentation(parecer.getUser()))
                .build();
    }

    public static List<Parecer> fromRepresentationList(Set<ParecerRepresentation> pareceres) {
        Objects.requireNonNull(pareceres);
        return pareceres.stream()
                .map(ParecerRepresentation::fromRepresentation)
                .collect(Collectors.toList());
    }

    public static class Builder {

        private ParecerRepresentation parecer;

        public Builder() {
            parecer = new ParecerRepresentation();
        }

        public ParecerRepresentation.Builder id(Long id) {
            parecer.setId(id);
            return this;
        }

        public ParecerRepresentation.Builder descricao(String descricao) {
            parecer.setDescricao(descricao);
            return this;
        }

        public ParecerRepresentation.Builder pendente(Boolean pendente) {
            parecer.setPendente(pendente);
            return this;
        }

        public ParecerRepresentation.Builder user(UserRepresentation user) {
            parecer.setUser(user);
            return this;
        }

        public ParecerRepresentation build() {
            return parecer;
        }

    }
}
