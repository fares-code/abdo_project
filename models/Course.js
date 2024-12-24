const { DataTypes } = require('sequelize');
import sequelize from '../config/db.js';

const Course = sequelize.define('Course', {
    CourseID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    CourseName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Credits: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Department: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    InstructorID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = Course;
