const addCondition = "insert into condition (value, onset, severity, email) values ($1, $2, $3, $4);"
const addTreatment = "insert into treatment (treatment_name, type, condition, doctor_id, in_time, out_time, pioneers) values ($1, $2, $3, $4, $5, $6, $7);"

export default { addCondition, addTreatment }
