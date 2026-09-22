import FrontendLayout from "@/components/layouts/frontend-layout";
import Breadcrumb from "@/components/ui/breadcrumb";
import Button from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FiEye, FiPackage } from "react-icons/fi";

const orders = [
  {
    id: "12345",
    image: "/images/product1.png",
    totalItems: 3,
    totalPrice: 259.97,
    date: "July 27, 2026",
    status: "Delivered",
  },
  {
    id: "12346",
    image: "/images/product2.png",
    totalItems: 1,
    totalPrice: 79.99,
    date: "July 21, 2026",
    status: "Processing",
  },
];

const statusStyles: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-accent/10 text-accent",
  Shipped: "bg-accent/10 text-accent",
  Pending: "bg-warning/15 text-warning",
  Cancelled: "bg-destructive/10 text-destructive",
};

const Orders = () => {
  return (
    <FrontendLayout>
      <section className="mx-auto max-w-4xl py-10 sm:py-14">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Account", href: "/account" },
            { label: "Orders" },
          ]}
        />

        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            My Orders
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            View and track your recent purchases.
          </p>
        </header>

        {orders.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center sm:px-10">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-surface text-primary">
              <FiPackage size={28} />
            </span>

            <h2 className="mt-5 text-xl font-semibold text-foreground">
              No orders yet
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              You haven&apos;t placed any orders yet.
            </p>

            <Link href="/shop" className="mt-6 inline-block">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-5 transition hover:shadow-sm md:flex-row md:items-center"
              >
                <Image
                  src={order.image}
                  alt={`Order ${order.id}`}
                  width={110}
                  height={130}
                  className="rounded-xl object-cover"
                />

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-semibold text-foreground">
                      Order {order.id}
                    </h2>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        statusStyles[order.status] ??
                        "bg-surface text-foreground"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-5 text-sm md:grid-cols-3">
                    <div>
                      <p className="text-muted-foreground">Total Items</p>
                      <p className="mt-1 font-semibold text-foreground">
                        {order.totalItems}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Total Price</p>
                      <p className="mt-1 font-semibold text-foreground">
                        ${order.totalPrice.toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Order Date</p>
                      <p className="mt-1 font-semibold text-foreground">
                        {order.date}
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/account/orders/${encodeURIComponent(order.id)}`}
                  aria-label={`View order ${order.id}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-surface px-4 py-3 text-sm font-medium text-foreground transition hover:bg-border/60 md:w-auto md:p-4"
                >
                  <FiEye size={18} />
                  <span className="md:hidden">View Order</span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </FrontendLayout>
  );
};

export default Orders;
