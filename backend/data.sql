truncate table _user cascade;
INSERT INTO _user (Id, Username, Password, Role) VALUES
(101, 'fernandez_gustavo', '$2a$12$B.RjGpEFCfBoQlq9I09CVOudtmEYIzJAn5I9dauokJ7HCnOL6Ww5.', 'MEDIC'),
(102, 'arias_francisco', '$2a$12$B.RjGpEFCfBoQlq9I09CVOudtmEYIzJAn5I9dauokJ7HCnOL6Ww5.', 'MEDIC'),
(103, 'bejarano_gisela', '$2a$12$B.RjGpEFCfBoQlq9I09CVOudtmEYIzJAn5I9dauokJ7HCnOL6Ww5.', 'MEDIC'),
(104, 'pereyra_florencia', '$2a$12$B.RjGpEFCfBoQlq9I09CVOudtmEYIzJAn5I9dauokJ7HCnOL6Ww5.', 'MEDIC'),
(105, 'fiore_samuel', '$2a$12$B.RjGpEFCfBoQlq9I09CVOudtmEYIzJAn5I9dauokJ7HCnOL6Ww5.', 'MEDIC'),
(106, 'oviedo_leandro', '$2a$12$B.RjGpEFCfBoQlq9I09CVOudtmEYIzJAn5I9dauokJ7HCnOL6Ww5.', 'MEDIC'),
(107, 'rusotti_mateo', '$2a$12$B.RjGpEFCfBoQlq9I09CVOudtmEYIzJAn5I9dauokJ7HCnOL6Ww5.', 'MEDIC'),
(108, 'sanchez_laura', '$2a$12$B.RjGpEFCfBoQlq9I09CVOudtmEYIzJAn5I9dauokJ7HCnOL6Ww5.', 'MEDIC'),
(109, 'ferrari_luciana', '$2a$12$B.RjGpEFCfBoQlq9I09CVOudtmEYIzJAn5I9dauokJ7HCnOL6Ww5.', 'MEDIC'),
(110, 'marin_alejandra', '$2a$12$B.RjGpEFCfBoQlq9I09CVOudtmEYIzJAn5I9dauokJ7HCnOL6Ww5.', 'MEDIC'),
(111, 'suarez_milena', '$2a$12$B.RjGpEFCfBoQlq9I09CVOudtmEYIzJAn5I9dauokJ7HCnOL6Ww5.', 'MEDIC'),
(112, 'noga_matias', '$2a$12$B.RjGpEFCfBoQlq9I09CVOudtmEYIzJAn5I9dauokJ7HCnOL6Ww5.', 'MEDIC'),
(113, 'fededoc', '$2a$12$B.RjGpEFCfBoQlq9I09CVOudtmEYIzJAn5I9dauokJ7HCnOL6Ww5.', 'MEDIC'),


(201, 'alice_brown', '$2a$12$B.RjGpEFCfBoQlq9I09CVOudtmEYIzJAn5I9dauokJ7HCnOL6Ww5.', 'PATIENT'),
(202, 'bob_davis', '$2a$12$1Qafo/LDMGVxOVq2lxnraedVyY9epFAOnDq.FeABg4LDHwbXCBb0W', 'PATIENT'),
(203, 'charlie_miller', '$2a$12$1Qafo/LDMGVxOVq2lxnraedVyY9epFAOnDq.FeABg4LDHwbXCBb0W', 'PATIENT'),
(666, 'fede', '$2a$12$1Qafo/LDMGVxOVq2lxnraedVyY9epFAOnDq.FeABg4LDHwbXCBb0W', 'PATIENT');


INSERT INTO medic (Id, User_Id, Name, Speciality, Picture, Description) VALUES
(101, 101, 'Dr. Fernandez Gustavo', 'Clínica médica', '/imagenes/clinico1.jpg', 'Mi enfoque es integral, lo que significa que no solo trato enfermedades individuales, sino que también ayudo a mis pacientes a mantener un bienestar general a través de la prevención. Trabajo junto a ellos para promover hábitos saludables, identificar factores de riesgo y diseñar planes de tratamiento personalizados.'),
(102, 102, 'Dr. Arias Francisco', 'Clínica médica', '/imagenes/clinico2.jpg', 'Soy médico clínico y me dedico al diagnóstico, tratamiento y prevención de enfermedades comunes y crónicas, como hipertensión y diabetes. Proporciono atención integral, evaluando el estado de salud general de mis pacientes y ofreciendo soluciones personalizadas. Además, oriento en la adopción de hábitos saludables para prevenir futuras complicaciones. Mi objetivo es brindar un cuidado médico cercano y efectivo, centrado en el bienestar global de cada paciente.'),
(103, 103, 'Dra. Bejarano Gisela', 'Pediatría', '/imagenes/pediatra1.jpg', 'Soy médica pediatra, especializada en el cuidado de bebés, niños y adolescentes. Mi trabajo consiste en asegurar que crezcan sanos, tanto física como emocionalmente. Realizo chequeos de rutina, administro vacunas y detecto posibles problemas de salud a tiempo. También acompaño a las familias brindando orientación sobre el desarrollo de sus hijos y tratando cualquier enfermedad o dificultad que pueda surgir en su crecimiento.'),
(104, 104, 'Dra. Pereyra Florencia', 'Pediatría', '/imagenes/pediatra2.jpg', 'Me dedico a la pediatría porque creo en la importancia de cuidar la salud desde los primeros años de vida. Acompaño a los niños y sus familias en cada etapa del crecimiento, realizando controles preventivos, aplicando vacunas y ofreciendo tratamiento cuando es necesario. Mi enfoque va más allá de la medicina: escucho, oriento y trabajo para crear un entorno en el que los pequeños puedan desarrollarse de manera saludable y feliz.'),
(105, 105, 'Dr. Fiore Samuel', 'Cardiología', '/imagenes/cardiologo1.jpg', 'Me dedico a tratar afecciones como la insuficiencia cardíaca, las arritmias, la enfermedad de las arterias coronarias, y los problemas valvulares. Un aspecto fundamental de mi trabajo es la prevención de enfermedades cardíacas, ayudando a mis pacientes a controlar factores de riesgo como el colesterol alto, la hipertensión y el estilo.'),
(106, 106, 'Dr. Oviedo Leandro', 'Cardiología', '/imagenes/cardiologo2.jpg', 'Soy cardiólogo, especializado en diagnosticar y tratar enfermedades del corazón. Realizo pruebas y procedimientos avanzados, como electrocardiogramas y colocación de marcapasos. También ayudo a prevenir problemas cardíacos promoviendo hábitos saludables. Mi enfoque es mejorar la salud y calidad de vida de mis pacientes.'),
(107, 107, 'Dr. Rusotti Mateo', 'Dermatología', '/imagenes/dermatologo1.jpg', 'Soy dermatólogo, especializado en el diagnóstico y tratamiento de enfermedades de la piel, cabello y uñas. Trato afecciones como acné, psoriasis, eczema y cáncer de piel. También realizo procedimientos dermatológicos, como biopsias y crioterapia. Además, ofrezco orientación para el cuidado preventivo y mejorar la salud de la piel. Mi objetivo es brindar soluciones efectivas para mantener una piel sana.'),
(108, 108, 'Dra. Sanchez Laura', 'Dermatología', '/imagenes/dermatologo2.jpg', 'Soy dermatóloga, especializada en la salud de la piel, el cabello y las uñas. Evaluo y trato diversas condiciones dermatológicas, desde problemas estéticos como el acné y las arrugas hasta enfermedades más serias como el melanoma. Realizo procedimientos como tratamientos láser y cirugía dermatológica. Además, asesoro a mis pacientes sobre el cuidado adecuado de la piel y la prevención de enfermedades. Mi misión es mejorar la salud y la confianza de mis pacientes a través de un enfoque personalizado.'),
(109, 109, 'Dra. Ferrari Luciana', 'Nutricionista', '/imagenes/nutricionista1.jpg', 'Soy nutricionista y me especializo en la evaluación y mejora de los hábitos alimenticios para promover un estilo de vida saludable. Desarrollo planes de alimentación personalizados basados en las necesidades y metas individuales, como control de peso o manejo de enfermedades crónicas. Además, educo a mis pacientes sobre la importancia de una nutrición equilibrada y cómo mejorar su salud a través de una alimentación adecuada.'),
(110, 110, 'Dra. Marin Alejandra', 'Nutricionista', '/imagenes/nutricionista2.jpg', 'Soy nutricionista, especializada en fomentar hábitos alimenticios saludables. Evalúo el estado nutricional de mis pacientes y diseño planes de alimentación personalizados para alcanzar sus objetivos. También ofrezco educación sobre nutrición y elecciones alimenticias saludables. Mi objetivo es empoderar a las personas para mejorar su bienestar a través de una buena alimentación.'),
(111, 111, 'Dra. Suarez Milena', 'Psicología', '/imagenes/psicologo1.jpg', 'Soy psicóloga, especializada en la evaluación y tratamiento de problemas de salud mental como la ansiedad y la depresión. Utilizo técnicas terapéuticas para ayudar a mis pacientes a desarrollar habilidades de afrontamiento y mejorar su bienestar emocional. Mi objetivo es proporcionar un espacio seguro para que exploren sus pensamientos y sentimientos, promoviendo su crecimiento personal.'),
(112, 112, 'Dr. Noga Matias', 'Psicología', '/imagenes/psicologo3.jpg', 'Soy psicólogo, enfocado en ayudar a las personas a superar desafíos emocionales y mentales. Realizo evaluaciones y ofrezco terapia para abordar trastornos como la ansiedad y la depresión. Trabajo con mis pacientes para desarrollar estrategias efectivas de afrontamiento y mejorar su calidad de vida. Mi misión es crear un entorno de apoyo donde puedan explorar sus sentimientos y fomentar su bienestar.');

INSERT INTO Opening_Hour (Id, Medic_Id, Day_Of_Week, Start_Time, End_Time) VALUES
(1, 101, 0, '09:00', '17:00'), -- Lunes para Dr. Fernandez Gustavo
(2, 101, 1, '09:00', '17:00'), -- Martes para Dr. Fernandez Gustavo
(3, 101, 2, '09:00', '17:00'), -- Miércoles para Dr. Fernandez Gustavo
(4, 101, 3, '09:00', '17:00'), -- Jueves para Dr. Fernandez Gustavo
(5, 101, 4, '09:00', '17:00'), -- Viernes para Dr. Fernandez Gustavo

(6, 102, 0, '10:00', '16:00'), -- Lunes para Dr. Arias Francisco
(7, 102, 2, '10:00', '16:00'), -- Miércoles para Dr. Arias Francisco
(8, 102, 4, '10:00', '16:00'), -- Viernes para Dr. Arias Francisco

(9, 103, 0, '10:00', '16:00'), -- Lunes para Dra. Bejarano Gisela
(10, 103, 2, '10:00', '16:00'), -- Miércoles para Dra. Bejarano Gisela
(11, 103, 4, '10:00', '16:00'), -- Viernes para Dra. Bejarano Gisela

(12, 104, 1, '10:00', '16:00'), -- Martes para Dra. Pereyra Florencia
(13, 104, 3, '10:00', '16:00'), -- Jueves para Dra. Pereyra Florencia

(14, 105, 2, '10:00', '16:00'), -- Miércoles para Dr. Fiore Samuel

(15, 106, 0, '09:00', '17:00'), -- Lunes para Dr. Oviedo Leandro
(16, 106, 1, '09:00', '17:00'), -- Martes para Dr. Oviedo Leandro
(17, 106, 3, '09:00', '17:00'), -- Jueves para Dr. Oviedo Leandro
(18, 106, 4, '09:00', '17:00'), -- Viernes para Dr. Oviedo Leandro

(19, 107, 0, '10:00', '16:00'), -- Lunes para Dr. Rusotti Mateo
(20, 107, 4, '10:00', '16:00'), -- Viernes para Dr. Rusotti Mateo

(21, 108, 1, '10:00', '16:00'), -- Martes para Dra. Sanchez Laura
(22, 108, 2, '10:00', '16:00'), -- Miércoles para Dra. Sanchez Laura
(23, 108, 3, '10:00', '16:00'), -- Jueves para Dra. Sanchez Laura

(24, 109, 0, '10:00', '16:00'), -- Lunes para Dra. Ferrari Luciana
(25, 109, 2, '10:00', '16:00'), -- Miércoles para Dra. Ferrari Luciana
(26, 109, 4, '10:00', '16:00'), -- Viernes para Dra. Ferrari Luciana

(27, 109, 0, '10:00', '16:00'), -- Lunes para Dra. Ferrari Luciana
(28, 109, 2, '10:00', '16:00'), -- Miércoles para Dra. Ferrari Luciana
(29, 109, 4, '10:00', '16:00'), -- Viernes para Dra. Ferrari Luciana

(30, 110, 1, '10:00', '16:00'), -- Martes para Dra. Marin Alejandra
(31, 110, 3, '10:00', '16:00'), -- Jueves para Dra. Marin Alejandra

(32, 111, 0, '10:00', '16:00'), -- Lunes para Dra. Suarez Milena
(33, 111, 2, '10:00', '16:00'), -- Miércoles para Dra. Suarez Milena
(34, 111, 4, '10:00', '16:00'), -- Viernes para Dra. Suarez Milena

(35, 112, 0, '09:00', '17:00'), -- Lunes para Dr. Noga Matias
(36, 112, 1, '09:00', '17:00'), -- Martes para Dr. Noga Matias
(37, 112, 2, '09:00', '17:00'), -- Miércoles para Dr. Noga Matias
(38, 112, 3, '09:00', '17:00'), -- Jueves para Dr. Noga Matias
(39, 112, 4, '09:00', '17:00');

INSERT INTO patient (Id, User_Id, First_Name, Last_Name, Email, Telephone) VALUES
(201, 201, 'Alice', 'Brown', 'alice.brown@example.com', '456-789-0123'),
(202, 202, 'Bob', 'Davis', 'bob.davis@example.com', '567-890-1234'),
(203, 203, 'Charlie', 'Miller', 'charlie.miller@example.com', '678-901-2345'),
(666, 666, 'Fede', 'Fede', 'fede@example.com', '678-901-2345');


INSERT INTO Medical_Record (patient_id, condition_Name, diagnosis_Date, treatment, notes) VALUES
(201, 'Hipertensión', '2023-01-15', 'Medicación', 'Monitorear la presión arterial regularmente'),
(201, 'Diabetes', '2022-11-20', 'Insulina', 'Mantener una dieta saludable'),
(202, 'Asma', '2023-03-10', 'Inhalador', 'Evitar alérgenos como el polen y el polvo'),
(202, 'Migraña', '2023-02-05', 'Medicamento para el dolor', 'Llevar un diario de dolores de cabeza'),
(203, 'Artritis', '2022-12-25', 'Fisioterapia', 'Hacer ejercicio regularmente'),
(203, 'Dolor de espalda', '2023-01-12', 'Reposo y medicamentos para el dolor', 'Mantener una buena postura'),
(666, 'Artritis', '2022-12-25', 'Fisioterapia', 'Hacer ejercicio regularmente'),
(666, 'Dolor de espalda', '2023-01-12', 'Reposo y medicamentos para el dolor', 'Mantener una buena postura');
