// const prisma = require('../models/prisma');
// const bcrypt = require('bcryptjs');
// const hashPassword = bcrypt.hashSync('123456', 12);

// prisma.admin.createMany({
//     data: [
//         { email: 'cheeva.admin1@gmail.com', firstName: 'A', lastName: 'Admin', password: hashPassword },
//         { email: 'cheeva.admin2@gmail.com', firstName: 'B', lastName: 'Admin', password: hashPassword },
//         { email: 'cheeva.admin3@gmail.com', firstName: 'C', lastName: 'Admin', password: hashPassword }
//     ]
// }).catch(err => console.log(err))