const getPatient = "select * from patient JOIN record ON patient.email = record.email where record.email = $1;"
const getTreatments = "select * from treatment where email = $1;"
const getConditions = "select * from condition where email = $1;"
const addPatient = "insert into patient (email, uid, pass, name, gender, dob, weight, height, address, bg, img_url, age) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);"
const addRecord = "insert into record (email) values ($1);"

export default { getPatient, addPatient, getTreatments, getConditions, addRecord }
