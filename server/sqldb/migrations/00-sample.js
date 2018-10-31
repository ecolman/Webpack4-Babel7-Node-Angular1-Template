export default {
  async up(queryInterface) {
    await queryInterface.sequelize.query(
      'alter table [Table] add [column] [varchar](50)',
      { raw: true }
    );
  },

  down() {
  }
};
