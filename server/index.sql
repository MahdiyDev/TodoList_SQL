create database myprojects;
create database todolist_sql;

create table if not exists todos(
    id serial not null primary key,
    create_date timestamp with time zone not null default current_timestamp,
    des_todo varchar(255) not null
);

select * from todos;
