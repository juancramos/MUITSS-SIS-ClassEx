// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const courses = sequelizeClient.define('courses', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    cost: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    from: {
      type: DataTypes.DATE,
      allowNull: false
    },
    to: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  courses.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    courses.hasMany(models.subjects, { foreignKey: { allowNull: false } });
    courses.hasMany(models.inscriptions, { foreignKey: { allowNull: false } });
  };

  return courses;
};
