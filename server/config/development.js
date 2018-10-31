// DEVELOPMENT server config
export const config = {
  sequelize: {
    database: '',
    username: '',
    password: '',
    options: {
      host: '',
      port: 1433,
      dialect: 'mssql',
      define: {
        timestamps: false,
        underscored: false
      }
    }
  }
};
