create extension if not exists "uuid-ossp";

drop table condition;
drop table treatment;
drop table record;
drop table patient;
drop table doctor;
drop table hospital;

create table hospital (
    hospital_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name varchar NOT NULL,

    uid varchar,
    pass varchar,

    address varchar(255),
    dean_name varchar(15),
    type varchar(6),

    UNIQUE(uid)
);

create table doctor (
    doctor_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    license_no int,
    name varchar NOT NULL,

    uid varchar,
    pass varchar,
    specialization varchar(15),

    UNIQUE(uid, license_no),

    hospital_id uuid,
    FOREIGN KEY(hospital_id) REFERENCES hospital(hospital_id)
);

create table patient (
    patient_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name varchar NOT NULL,
    gender varchar DEFAULT NULL,
    dob date NOT NULL,
    age int NOT NULL,
    height decimal(5,2) NOT NULL,
    weight decimal(5,2) NOT NULL,
    address varchar,
    img_url varchar,
    email varchar,

    uid varchar,
    pass varchar,

    UNIQUE(email, uid)
);

create table treatment (
    treatment_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    treatment_name varchar NOT NULL,
    type varchar NOT NULL, 
    condition int NOT NULL,
    doctor_id uuid NOT NULL,
    in_time timestamptz NOT NULL DEFAULT now(),
    out_time timestamptz NOT NULL DEFAULT now(),
    pioneers varchar[],

    patient_id uuid,
    FOREIGN KEY(patient_id) REFERENCES patient(patient_id),
    CHECK (condition <= 3)
);

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

    patient_id uuid,
    FOREIGN KEY(patient_id) REFERENCES patient(patient_id),
    CHECK (platelets <= 550000)
);

create table condition (
    condition_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),

    value varchar,
    onset Date,
    severity int,

    CHECK (severity <= 3),
    patient_id uuid,
    FOREIGN KEY(patient_id) REFERENCES patient(patient_id)
);
