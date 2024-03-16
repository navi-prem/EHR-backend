const getDoctors = "select * from doctor where hospital_id = $1;"
const addDoctor = "insert into doctor (license_no, name, uid, pass, specialization, hospital_id) values ($1, $2, $3, $4, $5, $6);"
const deleteDoctor = "delete from doctor where doctor_id = $1;"
const updateDoctor = "update doctor set license_no = $1, name = $2, uid = $3, pass = $4, specialization = $5, hospital_id = $6 where doctor_id = $7;"
const getDetails = "select name, uid, address, dean_name, type from hospital where hospital_id = $1;"

export default { getDoctors, addDoctor, deleteDoctor, updateDoctor, getDetails }
