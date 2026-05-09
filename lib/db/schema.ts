import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  decimal,
  timestamp,
  pgEnum,
  jsonb,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const userRoleEnum = pgEnum('user_role', ['customer', 'admin'])

export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'return_requested',
  'returned',
])

export const paymentStatusEnum = pgEnum('payment_status', [
  'pending',
  'paid',
  'failed',
  'refunded',
])

export const returnStatusEnum = pgEnum('return_status', [
  'requested',
  'approved',
  'rejected',
  'received',
  'refunded',
])

// ── Users ─────────────────────────────────────────────────────────────────────

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  role: userRoleEnum('role').default('customer').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ── Orders ────────────────────────────────────────────────────────────────────

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderNumber: varchar('order_number', { length: 50 }).notNull().unique(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  // Guest checkout fields
  guestName: varchar('guest_name', { length: 255 }),
  guestEmail: varchar('guest_email', { length: 255 }),
  guestPhone: varchar('guest_phone', { length: 50 }),
  // Order state
  status: orderStatusEnum('status').default('pending').notNull(),
  paymentMethod: varchar('payment_method', { length: 50 }).notNull(),
  paymentStatus: paymentStatusEnum('payment_status').default('pending').notNull(),
  // Financials
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  shippingCost: decimal('shipping_cost', { precision: 10, scale: 2 }).default('0').notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  // Shipping
  shippingAddress: jsonb('shipping_address').notNull(),
  // Fulfillment
  trackingNumber: varchar('tracking_number', { length: 255 }),
  trackingCarrier: varchar('tracking_carrier', { length: 100 }),
  notes: text('notes'),
  adminNotes: text('admin_notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ── Order Items ───────────────────────────────────────────────────────────────

export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  productId: varchar('product_id', { length: 255 }).notNull(),
  productName: varchar('product_name', { length: 255 }).notNull(),
  productSlug: varchar('product_slug', { length: 255 }).notNull(),
  productSku: varchar('product_sku', { length: 100 }),
  size: varchar('size', { length: 20 }),
  quantity: integer('quantity').notNull(),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
  imageUrl: text('image_url'),
})

// ── Returns ───────────────────────────────────────────────────────────────────

export const returns = pgTable('returns', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  reason: text('reason').notNull(),
  status: returnStatusEnum('status').default('requested').notNull(),
  adminNotes: text('admin_notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ── Relations ─────────────────────────────────────────────────────────────────

export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
}))

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  items: many(orderItems),
  returns: many(returns),
}))

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
}))

export const returnsRelations = relations(returns, ({ one }) => ({
  order: one(orders, { fields: [returns.orderId], references: [orders.id] }),
}))

// ── Inferred types ─────────────────────────────────────────────────────────────

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Order = typeof orders.$inferSelect
export type NewOrder = typeof orders.$inferInsert
export type OrderItem = typeof orderItems.$inferSelect
export type NewOrderItem = typeof orderItems.$inferInsert
export type Return = typeof returns.$inferSelect
export type NewReturn = typeof returns.$inferInsert
