package com.softplan.gestaoprocessos.representation;

import com.softplan.gestaoprocessos.model.Processo;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Data
@Component
public class ProcessoRepresentation {

    private Long id;
    private List<ParecerRepresentation> pareceres;

    public static ProcessoRepresentation build(Processo processo) {
        return new ProcessoRepresentation.Builder()
                .id(processo.getId())
                .pareceres(ParecerRepresentation.toRepresentation(new ArrayList<>(processo.getPareceres())))
                .build();
    }

    public static List<ProcessoRepresentation> toRepresentation(List<Processo> processos) {
        Objects.requireNonNull(processos);
        return processos.stream()
                .map(ProcessoRepresentation::build)
                .collect(Collectors.toList());
    }

    public static Processo fromRepresentation(ProcessoRepresentation processo) {
        return new Processo.Builder()
                .id(processo.getId())
                .pareceres(new HashSet<>(ParecerRepresentation.fromRepresentationList(new HashSet<>(processo.getPareceres()))))
                .build();
    }

    public static class Builder {

        private ProcessoRepresentation processo;

        public Builder() {
            processo = new ProcessoRepresentation();
        }

        public ProcessoRepresentation.Builder id(Long id) {
            processo.setId(id);
            return this;
        }

        public ProcessoRepresentation.Builder pareceres(List<ParecerRepresentation> pareceres) {
            processo.setPareceres(pareceres);
            return this;
        }

        public ProcessoRepresentation build() {
            return processo;
        }
    }
}
