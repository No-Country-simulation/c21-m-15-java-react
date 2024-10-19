INSERT INTO _user (Id, Username, Password, Role) VALUES
(1, 'john_doe', '$2a$12$iK5eDZFHbXcjwQ6QLstNr.eXfBTwrNg.ejwv0Z1PEzwg9gRbXup8O', 'MEDIC'),
(2, 'jane_smith', '$2a$12$eco5vfdU0jU1nZ0K.IaqCeSVgQY6X.0s3uRcFcXT1aGUyuRQfyn1W', 'MEDIC'),
(3, 'emily_johnson', '$2a$12$7TKVmOmH9t.0XI/Pzr225OfS5L4ZkxTVekBxZsRwGYw97symXyx8a', 'MEDIC'),
(4, 'alice_brown', '$2a$12$B.RjGpEFCfBoQlq9I09CVOudtmEYIzJAn5I9dauokJ7HCnOL6Ww5.', 'PATIENT'),
(5, 'bob_davis', '$2a$12$1Qafo/LDMGVxOVq2lxnraedVyY9epFAOnDq.FeABg4LDHwbXCBb0W', 'PATIENT'),
(6, 'charlie_miller', '$2a$12$1Qafo/LDMGVxOVq2lxnraedVyY9epFAOnDq.FeABg4LDHwbXCBb0W', 'PATIENT');

INSERT INTO medic (Id, User_Id, First_Name, Last_Name, Specialty, Email, Telephone) VALUES
(1, 1, 'John', 'Doe', 'Cardiology', 'john.doe@example.com', '123-456-7890'),
(2, 2, 'Jane', 'Smith', 'Neurology', 'jane.smith@example.com', '234-567-8901'),
(3, 3, 'Emily', 'Johnson', 'Dermatology', 'emily.johnson@example.com', '345-678-9012');

INSERT INTO Opening_Hour (Id, Medic_Id, Day_Of_Week, Start_Time, End_Time) VALUES
(1, 1, 1, '09:00', '17:00'), -- Monday for John Doe
(2, 1, 2, '09:00', '17:00'), -- Tuesday for John Doe
(3, 1, 3, '09:00', '17:00'), -- Wednesday for John Doe
(4, 1, 4, '09:00', '17:00'), -- Thursday for John Doe
(5, 1, 5, '09:00', '17:00'), -- Friday for John Doe

(6, 2, 1, '10:00', '18:00'), -- Monday for Jane Smith
(7, 2, 2, '10:00', '18:00'), -- Tuesday for Jane Smith
(8, 2, 3, '10:00', '18:00'), -- Wednesday for Jane Smith
(9, 2, 4, '10:00', '18:00'), -- Thursday for Jane Smith
(10, 2, 5, '10:00', '18:00'), -- Friday for Jane Smith

(11, 3, 1, '08:00', '16:00'), -- Monday for Emily Johnson
(12, 3, 2, '08:00', '16:00'), -- Tuesday for Emily Johnson
(13, 3, 3, '08:00', '16:00'), -- Wednesday for Emily Johnson
(14, 3, 4, '08:00', '16:00'), -- Thursday for Emily Johnson
(15, 3, 5, '08:00', '16:00'); -- Friday for Emily Johnson

INSERT INTO patient (Id, User_Id, First_Name, Last_Name, Email, Telephone) VALUES
(4, 4, 'Alice', 'Brown', 'alice.brown@example.com', '456-789-0123'),
(5, 5, 'Bob', 'Davis', 'bob.davis@example.com', '567-890-1234'),
(6, 6, 'Charlie', 'Miller', 'charlie.miller@example.com', '678-901-2345');

INSERT INTO appointment (Id, Medic_Id, Start_Time, Day_Of_Week, is_Booked, Patient_Id, Notes) VALUES
(1, 1, '12:00:00', 1, true, 4, 'Routine check-up'),
(2, 1, '13:00:00', 1, false, NULL, NULL),
(3, 2, '14:00:00', 2, true, 5, 'Follow-up visit'),
(4, 3, '15:00:00', 3, false, NULL, NULL);

