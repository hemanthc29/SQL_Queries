create database canteen_management;
use canteen_management;

#t1
create table students(student_id int primary key,student_name varchar(100),department varchar(50),year_no int,phone_number varchar(15));
#t2
create table categories(category_id int primary key,category_name varchar(50));
#t3
create table food_items(food_id int primary key,food_name varchar(100),category_id int,price decimal(10,2),availability boolean,foreign key(category_id) references categories(category_id));
#t4
create table orders(order_id int primary key,student_id int,order_date datetime,total_amount decimal(10,2),status varchar(30),foreign key(student_id) references students(student_id));
#t5
create table order_details(order_detail_id int primary key,order_id int,food_id int,quantity int,price decimal(10,2),foreign key(order_id) references orders(order_id),foreign key(food_id) references food_items(food_id));
#t6
create table payments(payment_id int primary key,order_id int unique,payment_method varchar(30),amount decimal(10,2),payment_date datetime,foreign key(order_id) references orders(order_id));
#t7
create table inventory(inventory_id int primary key,item_name varchar(100),quantity decimal(10,2),unit varchar(20),minimum_stock decimal(10,2));
#t8
create table suppliers(supplier_id int primary key,supplier_name varchar(100),phone varchar(15),address varchar(200));
#t9
create table purchases(purchase_id int primary key,supplier_id int,purchase_date date,total_cost decimal(10,2),foreign key(supplier_id) references suppliers(supplier_id));
#t10
create table purchase_details(purchase_detail_id int primary key,purchase_id int,inventory_id int,quantity decimal(10,2),cost decimal(10,2),foreign key(purchase_id) references purchases(purchase_id),foreign key(inventory_id) references inventory(inventory_id));
#t11
create table staff(staff_id int primary key,staff_name varchar(100),position varchar(50),salary decimal(10,2),phone varchar(15));
#t12
create table feedback(feedback_id int primary key,student_id int,rating int,comments varchar(255),feedback_date date,foreign key(student_id) references students(student_id));

#t13
insert into categories values(1,'Breakfast'),(2,'Lunch'),(3,'Snacks'),(4,'Beverages'),(5,'Desserts');
#t14
insert into students values(1,'Rahul','CSE',3,'9000000001'),(2,'Saran','ECE',2,'9000000002'),(3,'Asha','IT',4,'9000000003');
#t15
insert into food_items values(101,'Idli',1,30,1),(102,'Dosa',1,40,1),(103,'Burger',3,60,1),(104,'Coffee',4,20,1);
#t16
insert into inventory values(1,'Rice',100,'kg',20),(2,'Milk',50,'ltr',10),(3,'Oil',25,'ltr',5);
#t17
insert into suppliers values(1,'Fresh Foods','9001111111','Hyderabad'),(2,'Dairy Farm','9002222222','Vijayawada');
#t18
insert into staff values(1,'Ramesh','Manager',40000,'9111111111'),(2,'Suresh','Cashier',25000,'9222222222');
#t19
insert into orders values(1001,1,now(),140,'Delivered');
#t20
insert into order_details values(1,1001,103,2,60),(2,1001,104,1,20);
#t21
insert into payments values(1,1001,'UPI',140,now());
#t22
insert into feedback values(1,1,5,'Excellent Food',curdate());

#t23
select * from students;
#t24
select * from categories;
#t25
select * from food_items;
#t26
select * from orders;
#t27
select * from order_details;
#t28
select * from payments;
#t29
select * from inventory;
#t30
select * from suppliers;
#t31
select * from purchases;
#t32
select * from purchase_details;
#t33
select * from staff;
#t34
select * from feedback;

#t35
update food_items set price=65 where food_id=103;
#t36
update inventory set quantity=120 where inventory_id=1;
#t37
update orders set status='Ready' where order_id=1001;
#t38
delete from feedback where feedback_id=1;

#t39
select * from students where department='CSE';
#t40
select * from food_items where availability=1;
#t41
select * from inventory where quantity<minimum_stock;
#t42
select * from orders where status='Delivered';

#t43
select s.student_name,o.order_id,o.total_amount from students s join orders o on s.student_id=o.student_id;
#t44
select o.order_id,p.amount,p.payment_method from orders o join payments p on o.order_id=p.order_id;
#t45
select f.food_name,c.category_name from food_items f join categories c on f.category_id=c.category_id;
#t46
select pd.purchase_detail_id,i.item_name from purchase_details pd join inventory i on pd.inventory_id=i.inventory_id;

#t47
select count(*) total_students from students;
#t48
select count(*) total_food_items from food_items;
#t49
select sum(total_amount) total_sales from orders;
#t50
select avg(price) average_price from food_items;
#t51
select max(price) highest_price from food_items;
#t52
select min(price) lowest_price from food_items;

#t53
create view food_menu as select food_id,food_name,price from food_items where availability=1;
#t54
select * from food_menu;

#t55
delimiter //
create procedure get_student_orders(in sid int)
begin
select * from orders where student_id=sid;
end//
delimiter ;

#t56
call get_student_orders(1);

#t57
delimiter //
create trigger check_rating
before insert on feedback
for each row
begin
if new.rating<1 or new.rating>5 then
signal sqlstate '45000' set message_text='rating must be between 1 and 5';
end if;
end//
delimiter ;

#t58
select status,count(*) from orders group by status;
#t59
select category_id,count(*) from food_items group by category_id;
#t60
select department,count(*) from students group by department;
