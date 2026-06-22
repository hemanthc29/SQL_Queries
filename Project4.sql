CREATE DATABASE timetable_management;
USE timetable_management;

CREATE TABLE Departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(100),
    hod_name VARCHAR(100)
);

CREATE TABLE Faculty (
    faculty_id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_name VARCHAR(100),
    designation VARCHAR(50),
    department_id INT,
    email VARCHAR(100),
    phone_number VARCHAR(15),
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

CREATE TABLE Subjects (
    subject_id INT PRIMARY KEY AUTO_INCREMENT,
    subject_name VARCHAR(100),
    semester INT,
    credits INT,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

CREATE TABLE Classes (
    class_id INT PRIMARY KEY AUTO_INCREMENT,
    year INT,
    semester INT,
    section VARCHAR(10),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

CREATE TABLE Rooms (
    room_id INT PRIMARY KEY AUTO_INCREMENT,
    room_number VARCHAR(20),
    capacity INT,
    room_type VARCHAR(20)
);

CREATE TABLE Time_Slots (
    slot_id INT PRIMARY KEY AUTO_INCREMENT,
    start_time TIME,
    end_time TIME
);

CREATE TABLE Days (
    day_id INT PRIMARY KEY AUTO_INCREMENT,
    day_name VARCHAR(20)
);

CREATE TABLE Faculty_Subjects (
    allocation_id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT,
    subject_id INT,
    FOREIGN KEY (faculty_id) REFERENCES Faculty(faculty_id),
    FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id)
);

CREATE TABLE Timetable (
    timetable_id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT,
    subject_id INT,
    class_id INT,
    room_id INT,
    day_id INT,
    slot_id INT,
    FOREIGN KEY (faculty_id) REFERENCES Faculty(faculty_id),
    FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id),
    FOREIGN KEY (class_id) REFERENCES Classes(class_id),
    FOREIGN KEY (room_id) REFERENCES Rooms(room_id),
    FOREIGN KEY (day_id) REFERENCES Days(day_id),
    FOREIGN KEY (slot_id) REFERENCES Time_Slots(slot_id)
);

CREATE TABLE Faculty_Workload (
    workload_id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT,
    semester INT,
    total_hours INT,
    FOREIGN KEY (faculty_id) REFERENCES Faculty(faculty_id)
);

CREATE TABLE Attendance_Hours (
    attendance_id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT,
    subject_id INT,
    date DATE,
    hours_taken INT,
    FOREIGN KEY (faculty_id) REFERENCES Faculty(faculty_id),
    FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id)
);

CREATE TABLE Notifications (
    notification_id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT,
    message VARCHAR(255),
    date DATE,
    FOREIGN KEY (faculty_id) REFERENCES Faculty(faculty_id)
);

INSERT INTO Departments VALUES (1, 'Computer Science', 'Dr. Kumar');
INSERT INTO Departments VALUES (2, 'Electronics', 'Dr. Sharma');
INSERT INTO Departments VALUES (3, 'Mechanical', 'Dr. Patel');

INSERT INTO Faculty VALUES (101, 'Dr. Saran', 'Professor', 1, 'saran@college.edu', '9876543210');
INSERT INTO Faculty VALUES (102, 'Dr. Priya', 'Associate Professor', 1, 'priya@college.edu', '9876543211');
INSERT INTO Faculty VALUES (103, 'Mr. Raj', 'Assistant Professor', 2, 'raj@college.edu', '9876543212');

INSERT INTO Subjects VALUES (201, 'Database Management', 5, 4, 1);
INSERT INTO Subjects VALUES (202, 'Data Structures', 3, 4, 1);
INSERT INTO Subjects VALUES (203, 'Networking', 5, 3, 1);
INSERT INTO Subjects VALUES (204, 'Digital Electronics', 3, 4, 2);

INSERT INTO Classes VALUES (301, 3, 5, 'A', 1);
INSERT INTO Classes VALUES (302, 3, 5, 'B', 1);
INSERT INTO Classes VALUES (303, 2, 3, 'A', 1);

INSERT INTO Rooms VALUES (401, 'R101', 60, 'Theory');
INSERT INTO Rooms VALUES (402, 'R102', 40, 'Theory');
INSERT INTO Rooms VALUES (403, 'R201', 30, 'Lab');
INSERT INTO Rooms VALUES (404, 'R202', 50, 'Theory');

INSERT INTO Time_Slots VALUES (501, '09:00:00', '10:00:00');
INSERT INTO Time_Slots VALUES (502, '10:00:00', '11:00:00');
INSERT INTO Time_Slots VALUES (503, '11:00:00', '12:00:00');
INSERT INTO Time_Slots VALUES (504, '12:00:00', '13:00:00');
INSERT INTO Time_Slots VALUES (505, '14:00:00', '15:00:00');
INSERT INTO Time_Slots VALUES (506, '15:00:00', '16:00:00');

INSERT INTO Days VALUES (601, 'Monday');
INSERT INTO Days VALUES (602, 'Tuesday');
INSERT INTO Days VALUES (603, 'Wednesday');
INSERT INTO Days VALUES (604, 'Thursday');
INSERT INTO Days VALUES (605, 'Friday');

INSERT INTO Faculty_Subjects VALUES (701, 101, 201);
INSERT INTO Faculty_Subjects VALUES (702, 101, 202);
INSERT INTO Faculty_Subjects VALUES (703, 102, 203);
INSERT INTO Faculty_Subjects VALUES (704, 103, 204);

INSERT INTO Timetable VALUES (801, 101, 201, 301, 401, 601, 501);
INSERT INTO Timetable VALUES (802, 101, 202, 302, 402, 601, 502);
INSERT INTO Timetable VALUES (803, 102, 203, 303, 403, 602, 501);
INSERT INTO Timetable VALUES (804, 103, 204, 301, 404, 602, 503);

INSERT INTO Faculty_Workload VALUES (901, 101, 5, 12);
INSERT INTO Faculty_Workload VALUES (902, 102, 5, 9);
INSERT INTO Faculty_Workload VALUES (903, 103, 3, 6);

INSERT INTO Attendance_Hours VALUES (1001, 101, 201, '2026-01-15', 2);
INSERT INTO Attendance_Hours VALUES (1002, 101, 201, '2026-01-16', 2);
INSERT INTO Attendance_Hours VALUES (1003, 102, 203, '2026-01-15', 2);

INSERT INTO Notifications VALUES (1101, 101, 'Timetable changed for Friday', '2026-01-10');
INSERT INTO Notifications VALUES (1102, 102, 'New subject assigned', '2026-01-12');

SELECT * FROM Departments;
SELECT * FROM Faculty;
SELECT * FROM Subjects;
SELECT * FROM Classes;
SELECT * FROM Rooms;
SELECT * FROM Time_Slots;
SELECT * FROM Days;
SELECT * FROM Faculty_Subjects;
SELECT * FROM Timetable;
SELECT * FROM Faculty_Workload;
SELECT * FROM Attendance_Hours;
SELECT * FROM Notifications;

SELECT f.faculty_name, s.subject_name 
FROM Faculty f 
JOIN Faculty_Subjects fs ON f.faculty_id = fs.faculty_id 
JOIN Subjects s ON fs.subject_id = s.subject_id;

SELECT t.timetable_id, f.faculty_name, s.subject_name, c.year, c.section, r.room_number, d.day_name, ts.start_time 
FROM Timetable t 
JOIN Faculty f ON t.faculty_id = f.faculty_id 
JOIN Subjects s ON t.subject_id = s.subject_id 
JOIN Classes c ON t.class_id = c.class_id 
JOIN Rooms r ON t.room_id = r.room_id 
JOIN Days d ON t.day_id = d.day_id 
JOIN Time_Slots ts ON t.slot_id = ts.slot_id;

SELECT f.faculty_name, fw.semester, fw.total_hours 
FROM Faculty_Workload fw 
JOIN Faculty f ON fw.faculty_id = f.faculty_id;

SELECT f.faculty_name, s.subject_name, ah.date, ah.hours_taken 
FROM Attendance_Hours ah 
JOIN Faculty f ON ah.faculty_id = f.faculty_id 
JOIN Subjects s ON ah.subject_id = s.subject_id;

SELECT f.faculty_name, f.designation, d.department_name 
FROM Faculty f 
JOIN Departments d ON f.department_id = d.department_id;

SELECT room_number, capacity, room_type FROM Rooms;

SELECT day_name FROM Days WHERE day_id IN (SELECT DISTINCT day_id FROM Timetable);

SELECT f.faculty_name, COUNT(t.timetable_id) as total_classes 
FROM Faculty f 
LEFT JOIN Timetable t ON f.faculty_id = t.faculty_id 
GROUP BY f.faculty_id;

SELECT s.subject_name, COUNT(fs.faculty_id) as faculty_count 
FROM Subjects s 
LEFT JOIN Faculty_Subjects fs ON s.subject_id = fs.subject_id 
GROUP BY s.subject_id;

SELECT f.faculty_name, SUM(ah.hours_taken) as total_hours_taken 
FROM Faculty f 
LEFT JOIN Attendance_Hours ah ON f.faculty_id = ah.faculty_id 
GROUP BY f.faculty_id;

UPDATE Departments SET hod_name = 'Dr. Singh' WHERE department_id = 1;
UPDATE Faculty SET designation = 'Senior Professor' WHERE faculty_id = 101;
UPDATE Subjects SET credits = 5 WHERE subject_id = 201;
UPDATE Rooms SET capacity = 55 WHERE room_id = 401;
UPDATE Faculty_Workload SET total_hours = 15 WHERE faculty_id = 101;

DELETE FROM Timetable WHERE timetable_id = 804;
DELETE FROM Faculty_Subjects WHERE allocation_id = 704;
DELETE FROM Attendance_Hours WHERE attendance_id = 1003;