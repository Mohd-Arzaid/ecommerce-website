"use client";

import Breadcrumb from "@/components/ui/breadcrumb";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCcStripe, FaMoneyBillWave } from "react-icons/fa";
import { z } from "zod";

const CheckoutSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  country: z.string().min(2, "Country is required"),
  state: z.string().min(2, "State is required"),
  city: z.string().min(2, "City is required"),
  street: z.string().min(5, "Street address is required"),
});

// z.infer gets the TypeScript type from the Zod schema for ex : {firstName: string, lastName: string, email: string, phone: string, country: string, state: string, city: string, street: string}
type CheckoutFormValues = z.infer<typeof CheckoutSchema>;

type PaymentMethod = "cod" | "stripe";

const orderItems = [
  {
    id: 1,
    name: "Classic Denim Jacket",
    image: "/images/product1.png",
    quantity: 1,
    price: 79.99,
  },
  {
    id: 2,
    name: "Premium Hoodie",
    image: "/images/product2.png",
    quantity: 2,
    price: 59.99,
  },
];

const TAX_RATE = 0.08;

const paymentOptions: {
  id: PaymentMethod;
  title: string;
  description: string;
  icon: ReactNode;
}[] = [
  {
    id: "cod",
    title: "Cash on Delivery",
    description: "Pay when your order arrives.",
    icon: <FaMoneyBillWave className="text-green-600" size={24} />,
  },
  {
    id: "stripe",
    title: "Pay with Stripe",
    description: "Visa, Mastercard, Apple Pay and more.",
    icon: <FaCcStripe className="text-indigo-600" size={30} />,
  },
];

const CheckoutComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      state: "",
      city: "",
      street: "",
    },
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping: number = 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  const selectedPayment = paymentOptions.find(
    (option) => option.id === paymentMethod
  );

  const onSubmit = (data: CheckoutFormValues) => {
    console.log({
      ...data,
      paymentMethod,
    });
  };

  return (
    <section className="mx-auto max-w-7xl py-12">
      <div className="mb-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Cart", href: "/cart" },
            { label: "Checkout" },
          ]}
        />
        <p className="mt-2 text-muted-foreground">
          Complete your order securely.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-10 lg:grid-cols-[2fr_1fr]"
      >
        <div className="space-y-8">
          {/* Shipping Address */}
          <div className="rounded-2xl border border-border p-6">
            <h2 className="text-xl font-semibold">Shipping Address</h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Input
                label="First Name"
                placeholder="John"
                {...register("firstName")}
                error={errors.firstName?.message}
              />
              <Input
                label="Last Name"
                placeholder="Doe"
                {...register("lastName")}
                error={errors.lastName?.message}
              />
              <Input
                label="Email"
                type="email"
                placeholder="john@example.com"
                {...register("email")}
                error={errors.email?.message}
              />
              <Input
                label="Phone Number"
                placeholder="+234..."
                {...register("phone")}
                error={errors.phone?.message}
              />
              <Input
                label="Country"
                placeholder="Country"
                {...register("country")}
                error={errors.country?.message}
              />
              <Input
                label="State"
                placeholder="Lagos"
                {...register("state")}
                error={errors.state?.message}
              />
              <Input
                label="City"
                placeholder="Ikeja"
                {...register("city")}
                error={errors.city?.message}
              />
              <div className="md:col-span-2">
                <Input
                  label="Street Address"
                  variant="textarea"
                  placeholder="15 Admiralty Way"
                  {...register("street")}
                  error={errors.street?.message}
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-2xl border border-border p-6">
            <h2 className="text-xl font-semibold">Payment Method</h2>

            <div className="mt-6 space-y-4">
              {paymentOptions.map((option) => {
                const isSelected = paymentMethod === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setPaymentMethod(option.id)}
                    className={`flex w-full items-center rounded-xl border p-5 text-left transition ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                          isSelected ? "border-primary" : "border-border"
                        }`}
                      >
                        {isSelected && (
                          <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                        )}
                      </div>

                      {option.icon}

                      <div>
                        <p className="font-semibold">{option.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-xl bg-surface p-4">
              <p className="text-sm text-muted-foreground">
                Selected Payment Method
              </p>
              <p className="mt-1 font-semibold">{selectedPayment?.title}</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <aside className="h-fit rounded-2xl border border-border p-6 lg:sticky lg:top-24">
          <h2 className="text-2xl font-bold">Order Summary</h2>

          <div className="mt-6 space-y-5">
            {orderItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={70}
                  height={85}
                  className="rounded-lg"
                />
                <div className="flex flex-1 justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4 border-t border-border pt-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-4 text-xl font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Button
            type="submit"
            fullWidth
            className="mt-8"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </Button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Your payment information is securely processed.
          </p>
        </aside>
      </form>
    </section>
  );
};

export default CheckoutComponent;
