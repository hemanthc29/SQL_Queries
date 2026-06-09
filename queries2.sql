create table employee (
    emp_id int primary key,
    emp_name varchar(50),
    department varchar(30),
    salary int
);


insert into employee values
(101,"Saran","IT",65000),
(102,"Anitha","HR",45000),
(103,"Karthik","Finance",55000),
(104,"Sneha","IT",70000),
(105,"Arjun","Marketing",48000),
(106,"Sowmya","HR",52000),
(107,"Varun","Finance",60000),
(108,"Priya","IT",58000),
(109,"Charan","Sales",43000),
(110,"Sravya","Marketing",62000);

select* from employee;
select emp_name,salary from employee;
select * from employee where department="IT";
select * from employee where salary>50000;
select * from employee where salary<60000;
select * from employee where department="HR";
select * from employee where department="IT" and salary>50000;
select * from employee where department="HR" and department="Finance";
select * from employee where department!="IT";
select * from employee order by salary asc;
select * from employee order by salary desc;
select * from employee order by emp_name asc;
select distinct department from employee;
select * from employee limit 3;
select * from employee where salary between 45000 and 60000;
select * from employee where department in ("IT","HR","Finance");
select * from employee where emp_name like "S%";
select * from employee where emp_name like "%a";
select * from employee where emp_name like "%ar%";
select count(*) as Total_Count from employee;
select sum(salary) total_salary from employee;
select avg(salary) as avg_salary from employee;
select max(salary) as high_salary from employee;
select min(salary) as low_salary from employee;
