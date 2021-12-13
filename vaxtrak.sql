use vaxtrak;
drop table register;
create table register(
	name varchar(250) not null,
    NID int(10) unique not null,
    birth date not null,
    phone varchar(15) not null,
    gender varchar(10) not null,
    center varchar(250) not null,
    address varchar(250) not null
);

select * from register;