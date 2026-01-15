exports.up = (pgm) => {
  pgm.createTable("categories", {
    id: { type: "serial", primaryKey: true },
    name: { type: "varchar(50)", notNull: true, unique: true },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("categories", { ifExists: true });
};
