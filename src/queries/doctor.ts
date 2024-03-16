const addCondition = "insert into condition (value, onset, severity, email) values ($1, $2, $3, $4);"
const addTreatment = "insert into treatment (treatment_name, type, condition, doctor_id, in_time, out_time, pioneers, email) values ($1, $2, $3, $4, $5, $6, $7, $8);"
const updateRecord = "update record set sugar = $2, bp = $3, rbc = $4, wbc = $5, hb = $6, platelets = $7, esr = $8, mcv = $9, heart_rate = $10, na = $11, k = $12, vit_d = $13, cholestrol = $14 where email = $1;"

export default { addCondition, addTreatment, updateRecord }
