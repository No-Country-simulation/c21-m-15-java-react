INSERT INTO _user (Id, Username, Password, Role) VALUES
(101, 'john_doe', '$2a$12$iK5eDZFHbXcjwQ6QLstNr.eXfBTwrNg.ejwv0Z1PEzwg9gRbXup8O', 'MEDIC'),
(102, 'jane_smith', '$2a$12$eco5vfdU0jU1nZ0K.IaqCeSVgQY6X.0s3uRcFcXT1aGUyuRQfyn1W', 'MEDIC'),
(103, 'emily_johnson', '$2a$12$7TKVmOmH9t.0XI/Pzr225OfS5L4ZkxTVekBxZsRwGYw97symXyx8a', 'MEDIC'),
(201, 'alice_brown', '$2a$12$B.RjGpEFCfBoQlq9I09CVOudtmEYIzJAn5I9dauokJ7HCnOL6Ww5.', 'PATIENT'),
(202, 'bob_davis', '$2a$12$1Qafo/LDMGVxOVq2lxnraedVyY9epFAOnDq.FeABg4LDHwbXCBb0W', 'PATIENT'),
(203, 'charlie_miller', '$2a$12$1Qafo/LDMGVxOVq2lxnraedVyY9epFAOnDq.FeABg4LDHwbXCBb0W', 'PATIENT');

INSERT INTO medic (Id, User_Id, First_Name, Last_Name, Specialty, Email, Telephone) VALUES
(1, 101, 'John', 'Doe', 'Cardiology', 'john.doe@example.com', '123-456-7890'),
(2, 102, 'Jane', 'Smith', 'Neurology', 'jane.smith@example.com', '234-567-8901'),
(3, 103, 'Emily', 'Johnson', 'Dermatology', 'emily.johnson@example.com', '345-678-9012');

INSERT INTO patient (Id, User_Id, First_Name, Last_Name, Email, Telephone) VALUES
(1, 201, 'Alice', 'Brown', 'alice.brown@example.com', '456-789-0123'),
(2, 202, 'Bob', 'Davis', 'bob.davis@example.com', '567-890-1234'),
(3, 203, 'Charlie', 'Miller', 'charlie.miller@example.com', '678-901-2345');

INSERT INTO appointment (Medic_Id, Start_Time, Day_Of_Week, is_Booked, Patient_Id, Notes) VALUES
(1, '12:00:00', 1, true, 1, 'Routine check-up'),
(1, '13:00:00', 1, false, NULL, NULL),
(2, '14:00:00', 2, true, 2, 'Follow-up visit'),
(3, '15:00:00', 3, false, NULL, NULL);
