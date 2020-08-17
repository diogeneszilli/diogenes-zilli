package com.softplan.gestaoprocessos.service;

import com.querydsl.jpa.impl.JPAQuery;
import com.softplan.gestaoprocessos.model.QUser;
import com.softplan.gestaoprocessos.model.Role;
import com.softplan.gestaoprocessos.model.User;
import com.softplan.gestaoprocessos.repository.RoleRepository;
import com.softplan.gestaoprocessos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User save(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        Set<Role> roles = new HashSet<>();
        user.getRoles().forEach(role -> {
            Role entity = roleRepository.findRoleById(role.getId());
            roles.add(entity);
        });
        user.setRoles(roles);
        return userRepository.save(user);
    }

    public List<User> findAllUsersByRole(Long roleId) {
        Iterable<User> users;
        QUser qUser = QUser.user;
        JPAQuery<User> query = new JPAQuery<>(entityManager);

        Role role = roleRepository.findRoleById(roleId);
        users = query.from(qUser).where(qUser.roles.contains(role)).fetch();

        return StreamSupport.stream(users.spliterator(), false).collect(Collectors.toList());
    }
}
