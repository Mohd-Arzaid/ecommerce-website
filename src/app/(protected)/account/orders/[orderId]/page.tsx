import FrontendLayout from "@/components/layouts/frontend-layout";
import Breadcrumb from "@/components/ui/breadcrumb";
import Button from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaMoneyBillWave } from "react-icons/fa";
import { FiArrowLeft, FiMapPin, FiPackage } from "react-icons/fi";

const order = {
  id: "ORD-8FK2P9",
  createdAt: "July 27, 2026",
  status: "PENDING",
  paymentMethod: "Cash on Delivery",
  paymentStatus: "Pending",
  subtotal: 199.97,
  shipping: 0,
  tax: 10,
  total: 209.97,
  address: {
    firstName: "John",
    lastName: "Doe",
    phone: "+234 801 234 5678",
    street: "15 Admiralty Way",
    city: "Lekki",
    state: "Lagos",
    country: "Nigeria",
  },
  items: [
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
      quantity: 2,
      size: "L",
      color: "Grey",
    },
  ],
};

const orderStatusStyles: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PROCESSING: "bg-accent/10 text-accent",
  SHIPPED: "bg-accent/10 text-accent",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-destructive/10 text-destructive",
};

const paymentStatusStyles: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  Paid: "bg-green-100 text-green-600",
  PAID: "bg-green-100 text-green-600",
  Failed: "bg-destructive/10 text-destructive",
  FAILED: "bg-destructive/10 text-destructive",
  Refunded: "bg-surface text-muted-foreground",
  REFUNDED: "bg-surface text-muted-foreground",
};

interface OrderPageProps {
  params: Promise<{ orderId: string }>;
}

const OrderPage = async ({ params }: OrderPageProps) => {
  const { orderId } = await params;
  const displayId = decodeURIComponent(orderId) || order.id;

  return (
    <FrontendLayout>
      <section className="mx-auto max-w-7xl py-12">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Account", href: "/account" },
            { label: "Orders", href: "/account/orders" },
            { label: displayId },
          ]}
        />

        {/* header */}
        <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/account/orders">
              <Button
                variant="outline"
                className="mb-5"
                leftIcon={<FiArrowLeft size={16} />}
              >
                Back to Orders
              </Button>
            </Link>

            <h1 className="text-3xl font-bold text-foreground">{order.id}</h1>
            <p className="mt-2 text-muted-foreground">
              Placed on {order.createdAt}
            </p>
          </div>

          <span
            className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
              orderStatusStyles[order.status] ?? "bg-surface text-foreground"
            }`}
          >
            {order.status}
          </span>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
          {/* left — ordered items */}
          <div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <FiPackage className="text-primary" size={22} />
                <h2 className="text-xl font-semibold text-foreground">
                  Ordered Items
                </h2>
              </div>

              <div className="mt-8 space-y-6">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-5 rounded-xl border border-border p-5 sm:flex-row"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={130}
                      height={160}
                      className="rounded-xl object-cover"
                    />

                    <div className="flex flex-1 justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {item.name}
                        </h3>

                        <div className="mt-3 flex flex-wrap gap-2 text-sm">
                          <span className="rounded-full bg-surface px-3 py-1">
                            Size: {item.size}
                          </span>
                          <span className="rounded-full bg-surface px-3 py-1">
                            Color: {item.color}
                          </span>
                          <span className="rounded-full bg-surface px-3 py-1">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      </div>

                      <p className="shrink-0 text-xl font-bold text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* right */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
            {/* order summary */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-2xl font-bold text-foreground">
                Order Summary
              </h2>

              <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {order.shipping === 0
                      ? "Free"
                      : `$${order.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-4 text-xl font-bold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* shipping address */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <FiMapPin className="text-primary" size={20} />
                <h2 className="text-xl font-semibold text-foreground">
                  Shipping Address
                </h2>
              </div>

              <div className="mt-5 space-y-2 text-muted-foreground">
                <p className="font-medium text-foreground">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>{order.address.phone}</p>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state}
                </p>
                <p>{order.address.country}</p>
              </div>
            </div>

            {/* payment */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <FaMoneyBillWave className="text-primary" size={20} />
                <h2 className="text-xl font-semibold text-foreground">
                  Payment
                </h2>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Method</p>
                  <p className="font-semibold text-foreground">
                    {order.paymentMethod}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Payment Status</p>
                  <span
                    className={`mt-1 inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                      paymentStatusStyles[order.paymentStatus] ??
                      "bg-surface text-foreground"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </FrontendLayout>
  );
};

export default OrderPage;
