package com.softplan.gestaoprocessos.service;

import com.softplan.gestaoprocessos.model.Role;
import com.softplan.gestaoprocessos.model.User;
import com.softplan.gestaoprocessos.repository.RoleRepository;
import com.softplan.gestaoprocessos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {

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
}
