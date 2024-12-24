// models/Students.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Student = sequelize.define('student', {
    StudentID: {  // هنا يتم تغيير اسم العمود إلى `id`
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Street: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Government: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    PhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Gender: {
        type: DataTypes.ENUM('M', 'F'),
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: 'student',  // تحديد اسم الجدول
});

export default Student;
