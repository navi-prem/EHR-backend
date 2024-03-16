-- create extension if not exists "uuid-ossp";
-- 
-- drop table condition;
-- drop table treatment;
drop table record;
-- drop table patient;
-- drop table doctor;
-- drop table hospital;
-- 
-- create table hospital (
--     hospital_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--     name varchar NOT NULL,
-- 
--     uid varchar,
--     pass varchar,
-- 
--     address varchar(255),
--     dean_name varchar(15),
--     type varchar(6),
-- 
--     UNIQUE(uid)
-- );
-- 
-- create table doctor (
--     doctor_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--     license_no int,
--     name varchar NOT NULL,
-- 
--     uid varchar,
--     pass varchar,
--     specialization varchar(15),
-- 
--     UNIQUE(uid, license_no),
-- 
--     hospital_id uuid,
--     FOREIGN KEY(hospital_id) REFERENCES hospital(hospital_id)
-- );
-- 
-- create table patient (
--     email varchar PRIMARY KEY,
--     name varchar,
--     gender varchar,
--     dob date,
--     age int,
--     height decimal(5,2),
--     weight decimal(5,2),
--     address varchar,
--     img_url varchar,
-- 
--     uid varchar,
--     pass varchar,
-- 
--     UNIQUE(email, uid)
-- );
-- 
-- create table treatment (
--     treatment_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--     treatment_name varchar NOT NULL,
--     type varchar, 
--     condition int,
--     doctor_id uuid,
--     in_time timestamptz DEFAULT now(),
--     out_time timestamptz DEFAULT now(),
--     pioneers varchar[],
-- 
--     email varchar,
--     FOREIGN KEY(email) REFERENCES patient(email),
--     FOREIGN KEY(doctor_id) REFERENCES doctor(doctor_id),
--     CHECK (condition <= 3)
-- );

create table record (
    record_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    sugar decimal(3,2),
    bp decimal(3,2),
    rbc decimal(1,2),
    wbc decimal(2,2),
    hb decimal(3,2),
    platelets int,
    esr decimal(2,2),
    mcv decimal(3,2),
    heart_rate int,
    na decimal(3,2),
    k  decimal(2,1),
    vit_d int,
    cholestrol decimal(3,2), 
    chest_pain boolean,
    smoking boolean,
    peer_pressure boolean,
    allergy boolean,
    wheezing boolean,
    alcohol boolean,
    insulin boolean,
    bmi boolean,
    urea decimal(2,2),
    hypretension boolean,
    appetite boolean,
    anaemic boolean

    email varchar,
    FOREIGN KEY(email) REFERENCES patient(email),
    CHECK (platelets <= 550000)
);

-- create table condition (
--     condition_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
-- 
--     value varchar,
--     onset Date,
--     severity int,
-- 
--     email varchar,
--     FOREIGN KEY(email) REFERENCES patient(email),
--     CHECK (severity <= 3)
-- );
