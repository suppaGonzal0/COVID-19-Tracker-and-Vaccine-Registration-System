use vaxtrak;
drop table register;
drop table citizen;
drop table admin;

create table register(
	name varchar(250) not null,
    NID int unique not null,
    birth date not null,
    phone varchar(15) not null,
    gender varchar(10) not null,
    center varchar(250) not null,
    address varchar(250) not null,
    doseOne boolean,
    doseTwo boolean,
    doseOneDate date,
    doseTwoDate date
);

create table citizen(
    NID int unique not null,
    phone varchar(15) not null
);

create table admin(
    email varchar(200) unique not null,
    password varchar(15) not null
);

select * from citizen;
select * from register;
select * from admin;
SELECT * FROM register where doseOne=true and doseTwo is null;
update register set doseOneDate=null and doseTwoDate=null where NID = 345;
select * from admin where email = '321312' and pass = '312';

insert into admin (email, password) 
values ('aothoi@gmail.com', 'pass'), 
('samin@gmail.com', 'pass');

insert into citizen (NID, phone) 
values (234, '+8801711347300'), 
(345, '+8801711347300'), 
(456, '+8801711347300'), 
(567, '+8801711347300'), 
(789, '+8801711347300');

SELECT EXISTS(SELECT * FROM register WHERE NID=123);