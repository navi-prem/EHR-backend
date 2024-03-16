const getPatient = "select * from patient JOIN record ON patient.email = record.email where email = $1;"

export default { getPatient }
