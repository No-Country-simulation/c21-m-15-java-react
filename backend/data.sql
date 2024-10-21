INSERT INTO _user (Id, Username, Password, Role) VALUES
(101, 'john_doe', '$2a$12$iK5eDZFHbXcjwQ6QLstNr.eXfBTwrNg.ejwv0Z1PEzwg9gRbXup8O', 'MEDIC'),
(102, 'jane_smith', '$2a$12$eco5vfdU0jU1nZ0K.IaqCeSVgQY6X.0s3uRcFcXT1aGUyuRQfyn1W', 'MEDIC'),
(103, 'emily_johnson', '$2a$12$7TKVmOmH9t.0XI/Pzr225OfS5L4ZkxTVekBxZsRwGYw97symXyx8a', 'MEDIC'),
(201, 'alice_brown', '$2a$12$B.RjGpEFCfBoQlq9I09CVOudtmEYIzJAn5I9dauokJ7HCnOL6Ww5.', 'PATIENT'),
(202, 'bob_davis', '$2a$12$1Qafo/LDMGVxOVq2lxnraedVyY9epFAOnDq.FeABg4LDHwbXCBb0W', 'PATIENT'),
(203, 'charlie_miller', '$2a$12$1Qafo/LDMGVxOVq2lxnraedVyY9epFAOnDq.FeABg4LDHwbXCBb0W', 'PATIENT');

INSERT INTO medic (Id, User_Id, First_Name, Last_Name, Specialty, Email, Telephone) VALUES
(101, 101, 'John', 'Doe', 'Cardiology', 'john.doe@example.com', '123-456-7890'),
(102, 102, 'Jane', 'Smith', 'Neurology', 'jane.smith@example.com', '234-567-8901'),
(103, 103, 'Emily', 'Johnson', 'Dermatology', 'emily.johnson@example.com', '345-678-9012');

INSERT INTO Opening_Hour (Id, Medic_Id, Day_Of_Week, Start_Time, End_Time) VALUES
(1, 101, 1, '09:00', '17:00'),
(2, 101, 2, '09:00', '17:00'),
(3, 101, 3, '09:00', '17:00'),
(4, 101, 4, '09:00', '17:00'),
(5, 101, 5, '09:00', '17:00'),

(6, 102, 1, '10:00', '18:00'),
(7, 102, 2, '10:00', '18:00'),
(8, 102, 3, '10:00', '18:00'),
(9, 102, 4, '10:00', '18:00'),
(10, 102, 5, '10:00', '18:00'),

(11, 103, 1, '08:00', '16:00'),
(12, 103, 2, '08:00', '16:00'),
(13, 103, 3, '08:00', '16:00'),
(14, 103, 4, '08:00', '16:00'),
(15, 103, 5, '08:00', '16:00');

INSERT INTO patient (Id, User_Id, First_Name, Last_Name, Email, Telephone) VALUES
(201, 201, 'Alice', 'Brown', 'alice.brown@example.com', '456-789-0123'),
(202, 202, 'Bob', 'Davis', 'bob.davis@example.com', '567-890-1234'),
(203, 203, 'Charlie', 'Miller', 'charlie.miller@example.com', '678-901-2345');

INSERT INTO Medical_Record (patient_id, condition_Name, diagnosis_Date, treatment, notes) VALUES
(201, 'Hipertensión', '2023-01-15', 'Medicación', 'Monitorear la presión arterial regularmente'),
(201, 'Diabetes', '2022-11-20', 'Insulina', 'Mantener una dieta saludable'),
(202, 'Asma', '2023-03-10', 'Inhalador', 'Evitar alérgenos como el polen y el polvo'),
(202, 'Migraña', '2023-02-05', 'Medicamento para el dolor', 'Llevar un diario de dolores de cabeza'),
(203, 'Artritis', '2022-12-25', 'Fisioterapia', 'Hacer ejercicio regularmente'),
(203, 'Dolor de espalda', '2023-01-12', 'Reposo y medicamentos para el dolor', 'Mantener una buena postura');