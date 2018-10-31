/*eslint max-len:0*/
/*eslint no-process-env:0*/

// QA server config
export const config = {
  ip: process.env.ip || undefined,
  port: process.env.PORT || 8080,

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
