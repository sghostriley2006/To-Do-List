create database perntodo;

create table tasks (
    id serial primary key,
    task varchar(512) not null default ''
);