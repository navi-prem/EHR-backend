const getPatient = "select * from patient JOIN record ON patient.email = record.email where record.email = $1;"
const getTreatments = "select * from treatment where email = $1;"
const addPatient = "insert into patient (email, uid, pass) values ($1, $2, $3);"

export default { getPatient, addPatient, getTreatments }
