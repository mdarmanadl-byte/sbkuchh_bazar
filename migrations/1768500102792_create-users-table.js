/**
 * 
 */
exports.shorthands = undefined;

exports.up = (pgm) => {
  // Enable UUID extension
  pgm.createExtension("uuid-ossp", { ifNotExists: true });

  // Create users table
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    role: {
      type: "varchar(20)",
      notNull: true,
    },
    name: {
      type: "varchar(100)",
      notNull: true,
    },
    email: {
      type: "varchar(100)",
      notNull: true,
      unique: true,
    },
    password: {
      type: "text",
      notNull: true,
    },
    mobile: { type: "varchar(15)" },
    address: { type: "text" },
    profile_photo: { type: "text" },
    created_at: {
      type: "timestamp",
      default: pgm.func("current_timestamp"),
    },
  });

  // Role validation constraint
  pgm.addConstraint("users", "users_role_check", {
    check: "role IN ('user', 'seller', 'admin')",
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users", { ifExists: true });
};
