const getPatient = "select email, pass from patient where uid = $1;"
const getDoctor = "select pass from doctor where uid = $1;"
const getAdmin = "select pass from hospital where uid = $1;"

export default { getPatient, getDoctor, getAdmin }
