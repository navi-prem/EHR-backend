const getPatient = "select * from patient JOIN record ON patient.email = record.email where record.email = $1;"

export default { getPatient }
