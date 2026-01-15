exports.up = (pgm) => {
  pgm.createTable("cart_items", {
    id: { type: "serial", primaryKey: true },

    user_id: { type: "uuid", notNull: true },
    product_id: { type: "int", notNull: true },

    quantity: { type: "int", notNull: true, default: 1 },

    created_at: {
      type: "timestamp",
      default: pgm.func("current_timestamp"),
    },
  });

  // FK: cart_items.user_id -> users.id
  pgm.addConstraint("cart_items", "cart_items_user_fk", {
    foreignKeys: [
      {
        columns: "user_id",
        references: "users(id)",
        onDelete: "cascade",
      },
    ],
  });

  // FK: cart_items.product_id -> products.id
  pgm.addConstraint("cart_items", "cart_items_product_fk", {
    foreignKeys: [
      {
        columns: "product_id",
        references: "products(id)",
        onDelete: "cascade",
      },
    ],
  });

  // ✅ Prevent duplicate same product in same user cart
  pgm.addConstraint("cart_items", "unique_user_product_cart", {
    unique: ["user_id", "product_id"],
  });
};

exports.down = (pgm) => {
  pgm.dropTable("cart_items", { ifExists: true });
};
