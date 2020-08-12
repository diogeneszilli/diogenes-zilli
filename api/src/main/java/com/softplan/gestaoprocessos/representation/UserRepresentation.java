package com.softplan.gestaoprocessos.representation;

import com.softplan.gestaoprocessos.model.Role;
import com.softplan.gestaoprocessos.model.User;
import lombok.Data;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

@Data
@Component
public class UserRepresentation {

    private Long id;
    private String name;
    private String password;
    private Set<Role> roles;

    public static UserRepresentation build(User user) {
        return new UserRepresentation.Builder()
                .id(user.getId())
                .name(user.getName())
                .roles(user.getRoles())
                .build();
    }

    public static List<UserRepresentation> toRepresentation(List<User> users) {
        Objects.requireNonNull(users);
        return users.stream()
                .map(UserRepresentation::build)
                .collect(Collectors.toList());
    }

    public static User fromRepresentation(UserRepresentation user) {
        return new User.Builder()
                .id(user.getId())
                .name(user.getName())
                .password(user.getPassword())
                .roles(user.getRoles())
                .build();
    }

    public static class Builder {

        private UserRepresentation user;

        public Builder() {
            user = new UserRepresentation();
        }

        public UserRepresentation.Builder id(Long id) {
            user.setId(id);
            return this;
        }

        public UserRepresentation.Builder name(String name) {
            user.setName(name);
            return this;
        }

        public UserRepresentation.Builder password(String password) {
            user.setPassword(password);
            return this;
        }

        public UserRepresentation.Builder roles(Set<Role> roles) {
            user.setRoles(roles);
            return this;
        }

        public UserRepresentation build() {
            return user;
        }

    }
}
