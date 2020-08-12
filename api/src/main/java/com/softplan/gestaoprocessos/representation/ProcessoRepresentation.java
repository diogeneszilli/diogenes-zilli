package com.softplan.gestaoprocessos.representation;

import com.softplan.gestaoprocessos.model.Parecer;
import com.softplan.gestaoprocessos.model.Processo;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@Component
public class ProcessoRepresentation {

    private Long id;
    private Set<Parecer> pareceres;

    public static ProcessoRepresentation build(Processo processo) {
        return new ProcessoRepresentation.Builder()
                .id(processo.getId())
                .pareceres(processo.getPareceres())
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
                .pareceres(processo.getPareceres())
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

        public ProcessoRepresentation.Builder pareceres(Set<Parecer> pareceres) {
            processo.setPareceres(pareceres);
            return this;
        }

        public ProcessoRepresentation build() {
            return processo;
        }
    }
}
