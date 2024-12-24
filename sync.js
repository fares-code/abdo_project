const sequelize = require('./config/db');
const Student = require('./models/Student');

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();
