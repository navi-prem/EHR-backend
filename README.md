<div align=center>
  <img src="https://github.com/bitspaceorg/.github/assets/119417646/577c8581-499e-4cbb-a2f8-e78c643204bc" width="150" alt="Logo"/>
   <h1> VASHISHT-HACKATHON</h1>
  <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white">
<img src="https://img.shields.io/badge/:bitspace-%23121011?style=for-the-badge&logoColor=%23ffffff&color=%23000000">
<img src="https://img.shields.io/badge/vashisht-%23121011?style=for-the-badge&color=black">
<img src="https://img.shields.io/badge/iiitdm-%23121011?style=for-the-badge&logoColor=%23ffffff&color=%23000000">
<img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&color=black">
</div>

# Electronic Health Record (EHR) Backend

Welcome to the backend repository of our Electronic Health Record (EHR) application. This backend component serves as the server-side logic and database management system for the EHR application.

## Introduction
This backend repository houses the server-side codebase responsible for handling authentication, managing user data, and serving API endpoints to the frontend application.

## Features
- **User Authentication**: Secure authentication system using Google OAuth and OTP verification with Amazon SES.
- **Role-based Access Control**: Different access levels for hospital administrators, patients, and doctors.
- **Database Management**: Storage and management of patient records, treatment details, and medical history.
- **RESTful API**: Provides endpoints for CRUD operations on user data, medical records, and other application entities.
- **File Storage Bucket**: Secure storage for saving records such as X-rays, scans, and other medical documents.
- **Integration with Frontend**: Seamless integration with the frontend application for a complete EHR solution.

## Tech Stack
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Minimalist web framework for building RESTful APIs.
- **TypeScript (TS)**: Typed superset of JavaScript for improved code quality and developer experience.
- **PostgreSQL**: Relational database for storing application data.
- **Superbase**: Hosted PostgreSQL database with built-in authentication and real-time capabilities.
- **Passport.js**: Authentication middleware for Node.js applications, used for Google OAuth integration.
- **JSON Web Tokens (JWT)**: Used for authentication and authorization of API requests.

## Setup Instructions
To set up the backend locally, follow these steps:
1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Create a PostgreSQL database instance, either locally or using a cloud service like Superbase.
4. Set up environment variables in a `.env` file with the following details:
   ```plaintext
   PORT=6969
   DB_USER=<database-username>
   DB_PASS=<database-password>
   DB_NAME=<database-name>
   DB_HOST=<database-host>
   TEST_MSG=:bitspace
   DOCTOR_SECRET=<doctor-secret>
   HOSPITAL_SECRET=<hospital-secret>
   PATIENT_SECRET=<patient-secret>
   SECURE=f
   ACCESS_KEY=<aws-access-key>
   SECRET_ACCESS_KEY=<aws-secret-access-key>
   REGION=<aws-region>
   VERIFIED_EMAIL=<verified-email>
   PY_URL=<python-api-url>
   ```
5. Run the server using `npm start` or `npm run dev` for development mode.
6. Access the API endpoints at `http://localhost:6969` or the specified port.

## Contributing
Contributions to the development and enhancement of this backend application are welcome! To contribute, please fork the repository, make your changes, and submit a pull request with descriptive comments.
