"use client";

import FrontendLayout from "@/components/layouts/frontend-layout";
import Breadcrumb from "@/components/ui/breadcrumb";
import Button from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5";

const initialCartItems = [
  {
    id: "1",
    name: "Classic Denim Jacket",
    image: "/images/product1.png",
    price: 79.99,
    quantity: 1,
    size: "M",
    color: "Black",
  },
  {
    id: "2",
    name: "Premium Hoodie",
    image: "/images/product2.png",
    price: 59.99,
    quantity: 1,
    size: "L",
    color: "Grey",
  },
];

const TAX_RATE = 0.08;

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping: number = 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (cartItems.length === 0) {
    return (
      <FrontendLayout>
        <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-surface">
            <IoBagHandleOutline className="text-muted-foreground" size={48} />
          </div>

          <h1 className="mt-8 text-3xl font-bold text-foreground">
            Your cart is empty
          </h1>
          <p className="mt-3 max-w-md text-muted-foreground">
            You haven&apos;t added any products to your cart yet. Browse our
            latest collection and start shopping.
          </p>

          <Link href="/shop" className="mt-8">
            <Button>Continue Shopping</Button>
          </Link>
        </section>
      </FrontendLayout>
    );
  }

  return (
    <FrontendLayout>
      <section className="mx-auto max-w-6xl py-12">
        <div>
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Cart" }]}
          />
          <p className="mt-2 text-muted-foreground">
            {totalItems} {totalItems === 1 ? "Item" : "Items"} in your cart
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
          {/* cart items */}
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 transition hover:shadow-sm sm:flex-row"
              >
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={150}
                    height={180}
                    className="h-70 w-full object-cover sm:w-36 lg:h-44"
                  />
                </div>

                {/* item details */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      {item.name}
                    </h2>

                    <div className="mt-3 flex flex-wrap gap-2 text-sm">
                      <span className="rounded-full bg-surface px-3 py-1">
                        Size: {item.size}
                      </span>
                      <span className="rounded-full bg-surface px-3 py-1">
                        Color: {item.color}
                      </span>
                    </div>

                    <p className="mt-5 text-2xl font-bold text-foreground">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center rounded-lg border border-border">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="cursor-pointer p-3 transition hover:bg-surface"
                        aria-label="Decrease quantity"
                      >
                        <FiMinus />
                      </button>
                      <span className="min-w-12 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="cursor-pointer p-3 transition hover:bg-surface"
                        aria-label="Increase quantity"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="flex cursor-pointer items-center gap-2 text-destructive transition hover:opacity-80"
                    >
                      <FiTrash2 />
                      <span className="text-sm font-medium">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* summary */}
          <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
            <h2 className="text-2xl font-bold text-foreground">
              Order Summary
            </h2>

            <div className="mt-8 space-y-5">
              <div className="flex justify-between text-muted-foreground">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-5">
                <div className="flex justify-between text-xl font-bold text-foreground">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button fullWidth className="mt-8">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>

            <Link
              href="/shop"
              className="mt-5 block text-center text-sm font-medium text-primary hover:underline"
            >
              Continue Shopping
            </Link>

            <div className="mt-8 rounded-xl bg-surface p-4 text-sm text-muted-foreground">
              ✓ Free shipping on orders over $100
              <br />✓ Secure payment with Stripe
              <br />✓ Easy 7-day returns
            </div>
          </aside>
        </div>
      </section>
    </FrontendLayout>
  );
};

export default Cart;
