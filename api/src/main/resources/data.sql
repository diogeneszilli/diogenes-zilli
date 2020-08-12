INSERT INTO ROLE (role_id, role) VALUES (1, 'ADMINISTRADOR'), (2, 'TRIADOR'), (3, 'FINALIZADOR');
INSERT INTO USER (user_id, name, password) VALUES (1, 'admin', '$2a$10$L871JbehyNU.TCnFCfR75ucfjtHE8THmO5yziXrgZr3rDa4THm1Pq');
INSERT INTO USER_ROLE (user_id, role_id) VALUES (1, 1);