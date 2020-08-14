INSERT INTO ROLE (role_id, role) VALUES (1, 'ADMINISTRADOR'), (2, 'TRIADOR'), (3, 'FINALIZADOR');
INSERT INTO USER (user_id, name, password) VALUES (1, 'admin', '$2a$10$L871JbehyNU.TCnFCfR75ucfjtHE8THmO5yziXrgZr3rDa4THm1Pq');
INSERT INTO USER_ROLE (user_id, role_id) VALUES (1, 1);
INSERT INTO USER (user_id, name, password) VALUES (2, 'triador', '$2a$10$YpeQWfPQUkJK0Yk.m0uuLuvWSIWu6Jn8YO6FxTRRSikVA51b5qKtu');
INSERT INTO USER_ROLE (user_id, role_id) VALUES (2, 2);
INSERT INTO USER (user_id, name, password) VALUES (3, 'finalizador', '$2a$10$eO8i0ZRH4FV24wb35BskOeOgPWPCGYRGE3w9ZF5hLpZdWcNDloJLm');
INSERT INTO USER_ROLE (user_id, role_id) VALUES (3, 3);