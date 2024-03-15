create extension if not exists "uuid-ossp";

-- drop table treatment;
-- drop table record;
-- drop table patient;
-- drop table doctor;
-- drop table hospital;

create table hospital (
    hospital_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name varchar NOT NULL,

    uid varchar,
    pass varchar,

    UNIQUE(uid)
);

create table doctor (
    doctor_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name varchar NOT NULL,

    uid varchar,
    pass varchar,

    UNIQUE(uid)

    hospital_id uuid,
    FOREIGN KEY(hospital_id) REFERENCES hospital(hospital_id)
);

create table patient (
    patient_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email varchar NOT NULL,
    name varchar NOT NULL,
    gender varchar DEFAULT NULL,
    dob date NOT NULL,
    age int NOT NULL,
    height decimal(5,2) NOT NULL,
    weight decimal(5,2) NOT NULL,
    address varchar,
    img_url varchar,
    characteristics varchar[],

    uid varchar,
    pass varchar,

    UNIQUE(uid)

    doctor_id uuid,
    FOREIGN KEY(doctor_id) REFERENCES doctor(doctor_id),

    UNIQUE(email)
);

create table treatment (
    treatment_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),

    diagnosed_with varchar NOT NULL,
    inference varchar NOT NULL,

    patient_id uuid,
    FOREIGN KEY(patient_id) REFERENCES patient(patient_id)
);

create table record (
    record_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),

    patient_id uuid,
    FOREIGN KEY(patient_id) REFERENCES patient(patient_id)
);
