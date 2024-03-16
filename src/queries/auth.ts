const getPatient = "select uid, email, pass from patient where uid = $1 or email = $2;"
const getDoctor = "select doctor_id, pass from doctor where uid = $1;"
const getAdmin = "select hospital_id, pass from hospital where uid = $1;"

export default { getPatient, getDoctor, getAdmin }
