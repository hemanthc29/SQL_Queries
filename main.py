'''
file = open("batch.txt", "x")  
file.close()
file = open("batch.txt", "w")
file.write("Batch Successfully Completed")
file.close()
'''
'''
file = open("batch.txt", "w")
file.write("Rahul, Python\n")
file.write("Priya, Java\n")
file.write("Arjun, C++\n")
file.write("Sneha, Data Science\n")
file.write("Kiran, React\n")
file.close()
file = open("batch.txt", "r")
print("Batch Details:")
for line in file:
    print(line.strip())
file.close()
'''
'''
file=open("batch.txt", "a")
file.write("Rahul, MERN")
file.close()
file=open("batch.txt", "r")
print(file.read())
'''
'''
file = open("attendance.txt", "x")
file.close()
file = open("attendance.txt", "w") 
file.write("Rahul, Present\n")
file.write("Priya, Absent\n")
file.write("Arjun, Present\n")
file.write("Sneha, Present\n")
file.write("Kiran, Absent\n")
file.close()
'''
'''
import threading
def ATMA():
    for i in range(2000):
        print("ATM A")
def ATMB():
    for i in range(2000):
        print("ATM B")
thread1=threading.Thread(target=ATMA)
thread2=threading.Thread(target=ATMB)
thread1.start()
thread2.start()
'''
'''
import threading
import time
def task():
    for i in range(5):
        print(i)
        time.sleep(1)
t1=threading.Thread(target=task)
t1.start()
'''
'''
import threading
def greet(name):
    print("Hello, " + name)
t1=threading.Thread(
    target=greet,
    args=("Rahul",))
t1.start()
'''
'''
n=int(input("Enter a number: "))
try:
    num=10/n
    print(num)
except:
    print("An error occurred")
'''
'''
try:
    age=int(input("Enter your age: "))
except ValueError: 
    print("Invalid input. Please enter a valid age.")
'''
'''
try:
    students=["Hemanth","Kumar","Sita","Ravi"]
    print(students[5])
except IndexError:
    print("Index out of range")
'''
'''
try:
    file=open("data1.txt", "r")
except FileNotFoundError:
    print("File not found")
'''
'''
class Subject:
    def __init__(self,attr1,attr2):
        self.attr1=attr1
        self.attr2=attr2
obj=Subject("Maths","Science")
print(obj.attr1)
print(obj.attr2)
'''
'''
class Student:
    def __init__(self,name,course):
        self.name=name
        self.course=course
s1=Student("Rahul","Python")
print(s1.name) 
print(s1.course)
'''
'''
class Student:
    def __init__(self,name):
        self.name=name
    def display(self):
        print("Student Name:", self.name)
s1=Student("Rahul")
s1.display()
'''
'''
class BankAccount:
    def __init__(self,balance):
        self.__balance=balance
    def get_balance(self):
        return self.__balance
a=int(input("Enter a number: "))
account=BankAccount(a)
print(account.get_balance())
'''
'''
class BankAccount:
    def __init__(self):
        self.__balance=10000
    def set_balance(self, amount):
        self.__balance = amount
    def get_balance(self):
        return self.__balance
account=BankAccount()
account.set_balance(15000)
print(account.get_balance())
'''
'''
class BankAccount:
    def __init__(self,balance):
        self.__balance=balance
    def deposit(self, amount):
        self.__balance += amount
    def withdraw(self, amount):
        if amount>self.__balance:
            print("Insufficient funds")
        else:
            self.__balance-=amount
    def show_balance(self):
        return self.__balance
myaccount=BankAccount(10000)
myaccount.deposit(5000)
myaccount.withdraw(2000)
print(myaccount.show_balance())
'''
'''
class Vehicle:
    def show_vehicle(self):
        print("Vehicle")
class Car(Vehicle):
    def show_car(self):
        print("Car")
BMW=Car()
BMW.show_vehicle()
BMW.show_car()
'''
'''
class Person:
    def show_person(self):
        print("Person")
class Student(Person):
    def show_student(self):
        print("Student")
class Intern(Student):
    def show_intern(self):
        print("Intern")
i=Intern()
i.show_person()
i.show_student()
i.show_intern()
'''
'''
class Father:
    def bike(self):
        print("Bike")
class Mother:
    def car(self):
        print("Car")
class Child(Father,Mother):
    pass
c=Child()
c.bike()
c.car()
'''
'''
class Person:
    def show(self):
        print("Person")
class Student(Person):
    pass
class Employee(Person):
    pass
s=Student()
e=Employee()
s.show()
e.show()
'''
'''
class Person:
    def show(self):
        print("Person")
class Student(Person):
    pass
a=Student()
a.show()
'''
'''
class Order:
    def place_order(self):
        print("Order Placed Successfully")
class OnlineOrder(Order):
    def track_order(self):
        print("Order is out for delivery")
o=OnlineOrder()
o.place_order()
o.track_order()
'''
'''
class User:
    def login(self):
        print("Login Successful")
class Intern(User):
    def submit_project(self):
        print("Project Submitted")
class TeamLead( Intern):
    def review_project(self):
        print("Project Reviewed")
i=TeamLead()
i.login()
i.submit_project()
i.review_project()
'''
'''
class Attendance:
    def mark_attendance(self):
        print("Attendance Marked")
class Performance(Attendance):
    def show_rating(self):
        print("Performance Rating: 4.8")
class Employee(Performance):
    def  employee_details(self):
        print("Emplyee Details Displayed")
e=Employee()
e.mark_attendance()
e.show_rating()
e.employee_details()
'''
'''
class Product:
    def show_product(self):
        print("Product Details")
class Electronics(Product):
    def show_warranty(self):
        print("Warranty: 2 Years")
class CLothing(Product):
    def show_size(self):
        print("Size: XL")
e=Electronics()
c=CLothing()
e.show_product()
e.show_warranty()
c.show_product()
c.show_size()
'''
'''
class User:
    def login(self):
        print("Login Successful")
class Student(User):
    def submit_assignment(self):
        print("Assignment Submitted")
class Trainer(User):
    def conduct_session(self):
        print("Session Conducted")
class Mentor(Student, Trainer):
    def provide_feedback(self):
        print("Feedback Provided")
m=Mentor()
m.login()
m.submit_assignment()
m.conduct_session()
m.provide_feedback()
'''
'''
class example:
    def add(self,a,b):
        x=a+b
        return x
    def add(self,a,b,c):
        x=a+b+c
        return x
obj=example()
print(obj.add(10,20))
print(obj.add(10,20,30))
'''
'''
class Payment:
    def make_payment(self):
        print("Payment Made")
class UPI(Payment):
    def show_upi_id(self):
        print("UPI ID: rahul@upi")
class Card(Payment):
    def show_card_details(self):
        print("Card Details: **** **** **** 1234")
class NetBanking(Payment):
    def show_bank_details(self):
        print("Bank Details: ABC Bank")
u=UPI()
c=Card()
n=NetBanking()
u.make_payment()
u.show_upi_id()
c.make_payment()
c.show_card_details()
n.make_payment()
n.show_bank_details()
'''
'''
from abc import ABC, abstractmethod
class Vehicle(ABC):
    @abstractmethod
    def start(self):
        pass
class Car(Vehicle):
    def start(self):
        print("Car Started")
car=Car()
car.start()
'''
'''
import calculator
ans=calculator.add(1,2)
print(ans)
'''
'''
import math
print(math.sqrt(16))\
'''
'''
numbers=[1,2,3,4,5]
iterator=iter(numbers)
print(next(iterator))
print(next(iterator))
print(next(iterator))
print(next(iterator))
print(next(iterator))
'''
'''
def numbers():
    yield 1
    yield 2
    yield 3
gen=numbers()
print(next(gen))
print(next(gen))
print(next(gen))
'''
#@decorator_name
#def function():
#    pass
'''
def decorator(func):
    def wrapper():
        print("Before function")
        func()
        print("After function")
    return wrapper
@decorator
def greet():
    print("Hello")
greet()
'''
#import os
#print(os.getcwd())
#os.mkdir("students")
#os.rmdir("students")
#import sys
#print(sys.version)
#from datetime import datetime
#print(datetime.now())
#1
'''
class Student:
    def __init__(self, id, name, age):
        self.id = id
        self.name = name
        self.age = age
s=Student(1,"Hemanth",20)
print(s.id)
print(s.name)
print(s.age)
'''
#2
'''
class Employee:
    def __init__(self, id, name, salary):
        self.id = id
        self.name = name
        self.salary = salary
e1=Employee(1,"Hemanth",50000)
e2=Employee(2,"Vamsi",60000)
e3=Employee(3,"Pavan",55000)
print(e1.id, e1.name, e1.salary)
print(e2.id, e2.name, e2.salary)
print(e3.id, e3.name, e3.salary)
'''
#3
'''
class Car:
    def __init__(self,brand, model, year):
        self.brand = brand
        self.model = model
        self.year = year
car1 = Car("Toyota", "LC", 2020)
car2 = Car("Honda", "Civic", 2019)
print(car1.brand, car1.model, car1.year)
print(car2.brand, car2.model, car2.year)
'''
4
'''
class Book:
    def __init__(self, title, author,price):
        self.title = title
        self.author = author
        self.price = price
book=Book("The Jungle Book", "Rudyard Kipling", 200)
print(book.title, book.author, book.price)
'''
#5
'''
class Mobile:
    def __init__(self, brand, RAM, storage):
        self.brand = brand
        self.RAM = RAM
        self.storage = storage
mobile=Mobile("Samsung", "8GB", "128GB")
print(mobile.brand, mobile.RAM, mobile.storage)
'''
#6
'''
class Student:
    def __init__(self, id,name,age):
        self.id=id
        self.name=name
        self.age=age
s1=Student(1,"Hemanth",20)
s2=Student(2,"Vamsi",21)
s3=Student(3,"Pavan",22)
print(s1.id, s1.name, s1.age)
print(s2.id, s2.name, s2.age)
print(s3.id, s3.name, s3.age)
'''
#7
'''
class Rectangle:
    def __init__(self, length, width):
        self.length = length
        self.width = width
    def area(self):
        return self.length * self.width
r=Rectangle(10,5)
print(r.area())
'''
#8
'''
class Circle:
    def __init__(self, radius):
        self.radius = radius
    def find_area(self):
        return 3.14 * self.radius * self.radius
c=Circle(5)
print(c.find_area())
'''
#9
'''
class BankAccount:
    def __init__(self,account_number,holder_name,balance):
        self.account_number=account_number
        self.holder_name=holder_name
        self.balance=balance
a=BankAccount("1234567890","Hemanth",10000)
print(a.account_number, a.holder_name, a.balance)
'''
#10
'''
class Laptop:
    def __init__(self,brand,processor,price):
        self.brand=brand
        self.processor=processor
        self.price=price
lp=Laptop("Dell","i7",80000)
print(lp.brand, lp.processor, lp.price)
'''
#11
'''
class Calculator:
    def add(self,a,b):
        return a+b
    def subtract(self,a,b):
        return a-b
    def multiply(self,a,b):
        return a*b
    def divide(self,a,b):
        if b!=0:
            return a/b
        else:
            return "Cannot divide by zero"
calc=Calculator()
print(calc.add(10,5))
print(calc.subtract(10,5))
print(calc.multiply(10,5))
print(calc.divide(10,5))
print(calc.divide(10,0))
'''
#12
'''
class TemperatureConverter:
    def celsius_to_fahrenheit(self,celsius):
        return (celsius * 9/5) + 32
    def fahrenheit_to_celsius(self,fahrenheit):
        return (fahrenheit - 32) * 5/9
converter=TemperatureConverter()
print(converter.celsius_to_fahrenheit(25))
print(converter.fahrenheit_to_celsius(77))
'''
#13
'''
class Student_marks:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks
    def display_grade(self):
        if self.marks >= 90:
            return "A"
        elif self.marks >= 80:
            return "B"
        elif self.marks >= 70:
            return "C"
        elif self.marks >= 60:
            return "D"
        else:
            return "F"
s=Student_marks("Hemanth",9)
print(s.display_grade())
'''
#14
'''
class Shopping_cart:
    def __init__(self,product,quantity,price):
        self.product=product
        self.quantity=quantity
        self.price=price
    def total_cost(self):
        return self.price*self.quantity
sc=Shopping_cart("Iphone",6,190000)
print(sc.total_cost())
'''
#15
'''
class Movie_ticket:
    def __init__(self,movie_name,ticket_price,number_of_tickets):
        self.movie_name=movie_name
        self.ticket_price=ticket_price
        self.number_of_tickets=number_of_tickets
    def calculate_bill(self):
        return self.ticket_price*self.number_of_tickets
mt=Movie_ticket("F2",210,5)
print(mt.calculate_bill())
'''
#16
'''
class Bank_Account_System:
    def __init__(self,__balance=10000):
        self.__balance=__balance
    def deposit(self,money):
        self.money=money
        self.__balance+=money
    def withdraw(self,money):
        self.money=money
        self.__balance-=money
    def check_balance(self):
        return self.__balance
bas=Bank_Account_System()
bas.deposit(2000)
bas.withdraw(3000)
print(bas.check_balance())
'''
#17
'''
class ATM_Machine:
    def __init__(self,__PIN=1234):
        self.__PIN=__PIN
    def change_pin(self,new):
        self.new=new
        self.__PIN=new
    def verify_pin(self,pin):
        self.pin=pin
        return self.pin==self.__PIN
atm=ATM_Machine()
atm.change_pin(4567)
print(atm.verify_pin(4567))
'''
#18
'''
class Employee_Salary:
    def __init__(self,__salary=10000):
        self.__salary=__salary
    def set_salary(self,sal):
        self.sal=sal
        self.__salary=sal
    def get_salary(self,sala):
        self.sala=sala
        return self.sala
es=Employee_Salary()
es.set_salary(20000)
print(es.get_salary(30000))
'''
#19
'''
class StudentResult:
    def __init__(self,__marks=0):
        self.__marks=__marks
    def set_marks(self, marks):
        self.__marks = marks
    def calculate_grade(self):
        if self.__marks >= 90:
            return "A"
        elif self.__marks >= 75:
            return "B"
        elif self.__marks >= 50:
            return "C"
        else:
            return "Fail"
s = StudentResult()
s.set_marks(85)
print(s.calculate_grade())
'''
#20

class OnlineWallet:
    def __init__(self,__balance=0):
        self.__balance=__balance
    def add_money(self, amount):
        self.__balance += amount
        print(amount)
    def spend_money(self, amount):
        if amount <= self.__balance:
            self.__balance -= amount
            print(amount)
        else:
            print("Insufficient Balance")
    def show_balance(self):
        print("Balance:", self.__balance)
w = OnlineWallet()
w.add_money(1000)
w.spend_money(300)
w.show_balance()