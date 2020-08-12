package com.softplan.gestaoprocessos.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@Table(name = "processo")
@SequenceGenerator(name = "processo_seq", allocationSize = 1)
public class Processo {

    @Id
    @Column(name = "id")
    @GeneratedValue(generator = "processo_seq", strategy = GenerationType.SEQUENCE)
    private Long id;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_processo")
    private Set<Parecer> pareceres;

    public static class Builder {

        private Processo processo;

        public Builder() {
            processo = new Processo();
        }

        public Builder id(Long id) {
            processo.setId(id);
            return this;
        }

        public Builder pareceres(Set<Parecer> pareceres) {
            processo.setPareceres(pareceres);
            return this;
        }

        public Processo build() {
            return processo;
        }

    }

}