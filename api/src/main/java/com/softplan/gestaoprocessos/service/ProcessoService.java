package com.softplan.gestaoprocessos.service;

import com.querydsl.jpa.impl.JPAQuery;
import com.softplan.gestaoprocessos.model.Processo;
import com.softplan.gestaoprocessos.model.QParecer;
import com.softplan.gestaoprocessos.model.QProcesso;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ProcessoService {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Processo> findAllParecerPendente(Long id) {
        Iterable<Processo> processos;
        QProcesso qProcesso = QProcesso.processo;
        QParecer qParecer = QParecer.parecer;
        JPAQuery<Processo> query = new JPAQuery<Processo>(entityManager);

        if (Objects.nonNull(id)) {
            processos = query
                    .from(qProcesso)
                    .innerJoin(qProcesso.pareceres ,qParecer)
                    .where(qParecer.usuario.id.eq(id).and(qParecer.pendente.isTrue()))
                    .fetch();
        } else {
            processos = query
                    .from(qProcesso)
                    .innerJoin(qProcesso.pareceres ,qParecer)
                    .where(qParecer.pendente.isTrue())
                    .fetch();
        }

        return StreamSupport.stream(processos.spliterator(), false).collect(Collectors.toList());
    }
}
