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
'''
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
'''
