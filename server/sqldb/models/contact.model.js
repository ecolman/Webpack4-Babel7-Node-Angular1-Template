export default function(sequelize, DataTypes) {
  let Contact = sequelize.define('Contact', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: DataTypes.STRING(75),
    lastName: DataTypes.STRING(100),
    title: DataTypes.STRING(255),
    emailAddress: DataTypes.STRING(255),
    phone: DataTypes.STRING(50),
    address: DataTypes.STRING(255),
    city: DataTypes.STRING(50),
    country: DataTypes.STRING(100),
    zip: DataTypes.STRING(12),
    state: DataTypes.STRING(100)
  }, {
    classMethods: {
      associate: models => {
      }
    }
  });

  return Contact;
}
