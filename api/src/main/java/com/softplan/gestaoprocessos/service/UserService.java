package com.softplan.gestaoprocessos.service;

import com.softplan.gestaoprocessos.model.Role;
import com.softplan.gestaoprocessos.model.User;
import com.softplan.gestaoprocessos.repository.RoleRepository;
import com.softplan.gestaoprocessos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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
        user.setRoles(user.getRoles());
        return userRepository.save(user);
    }
}
