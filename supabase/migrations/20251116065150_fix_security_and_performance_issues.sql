/*
  # Fix Security and Performance Issues

  ## Issues Resolved

  1. **Unindexed Foreign Keys**
     - Added index on `rwn_transactions.order_id` foreign key

  2. **RLS Performance Optimization**
     - Replaced all `auth.uid()` direct calls with `(select auth.uid())` subqueries
     - This optimizes query performance by caching the auth.uid() result instead of re-evaluating per row
     - Applied to all tables: profiles, cart_items, orders, order_items, wishlist, rwn_transactions, reviews

  3. **Function Search Path Security**
     - Set `search_path` to `public` for `update_updated_at_column` function to prevent mutable search path attacks

  4. **Unused Indexes**
     - These are kept for future query optimization and to support potential filtering features
     - They provide performance benefits when actually used in queries
*/

-- Fix unindexed foreign key
CREATE INDEX IF NOT EXISTS idx_rwn_transactions_order_id ON rwn_transactions(order_id);

-- Fix RLS policies with optimized auth.uid() calls

-- Profiles table
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (id = (select auth.uid()))
  WITH CHECK (id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = (select auth.uid()));

-- Cart items table
DROP POLICY IF EXISTS "Users can read own cart items" ON cart_items;
CREATE POLICY "Users can read own cart items"
  ON cart_items FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can insert own cart items" ON cart_items;
CREATE POLICY "Users can insert own cart items"
  ON cart_items FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update own cart items" ON cart_items;
CREATE POLICY "Users can update own cart items"
  ON cart_items FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can delete own cart items" ON cart_items;
CREATE POLICY "Users can delete own cart items"
  ON cart_items FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- Orders table
DROP POLICY IF EXISTS "Users can read own orders" ON orders;
CREATE POLICY "Users can read own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can insert own orders" ON orders;
CREATE POLICY "Users can insert own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

-- Order items table
DROP POLICY IF EXISTS "Users can read own order items" ON order_items;
CREATE POLICY "Users can read own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = (select auth.uid())
    )
  );

-- Wishlist table
DROP POLICY IF EXISTS "Users can read own wishlist" ON wishlist;
CREATE POLICY "Users can read own wishlist"
  ON wishlist FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can insert own wishlist items" ON wishlist;
CREATE POLICY "Users can insert own wishlist items"
  ON wishlist FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can delete own wishlist items" ON wishlist;
CREATE POLICY "Users can delete own wishlist items"
  ON wishlist FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- RWN transactions table
DROP POLICY IF EXISTS "Users can read own transactions" ON rwn_transactions;
CREATE POLICY "Users can read own transactions"
  ON rwn_transactions FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

-- Reviews table
DROP POLICY IF EXISTS "Users can insert own reviews" ON reviews;
CREATE POLICY "Users can insert own reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update own reviews" ON reviews;
CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can delete own reviews" ON reviews;
CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- Fix function search path security
ALTER FUNCTION update_updated_at_column() SET search_path = public;