package com.softplan.gestaoprocessos.model;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "parecer")
@SequenceGenerator(name = "parecer_seq", allocationSize = 1)
public class Parecer {

    @Id
    @Column(name = "id")
    @GeneratedValue(generator = "parecer_seq", strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    @NotNull
    private Usuario usuario;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "pendente")
    @NotNull
    private Boolean pendente;

    public static class Builder {

        private Parecer parecer;

        public Builder() {
            parecer = new Parecer();
        }

        public Builder usuario(Usuario usuario) {
            parecer.setUsuario(usuario);
            return this;
        }

        public Builder descricao(String descricao) {
            parecer.setDescricao(descricao);
            return this;
        }

        public Builder pendente(Boolean pendente) {
            parecer.setPendente(pendente);
            return this;
        }

        public Parecer build() {
            return parecer;
        }

    }

}
