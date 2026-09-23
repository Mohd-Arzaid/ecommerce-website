import Image from "next/image";
import Button from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Classic Denim Jacket",
    size: "L",
    quantity: 2,
    price: 79.99,
    image: "/images/product1.png",
  },
  {
    id: 2,
    name: "Premium Hoodie",
    size: "M",
    quantity: 1,
    price: 59.99,
    image: "/images/product2.png",
  },
];

interface OrderPageProps {
  params: Promise<{ orderId: string }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { orderId } = await params;
  const displayId = decodeURIComponent(orderId);

  const subtotal = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const shipping = 0;
  const tax = 5;
  const total = subtotal + shipping + tax;

  return (
    <section>
      {/* header */}
      <div>
        <h2 className="text-3xl font-semibold">Order {displayId}</h2>
        <p className="mt-2 text-muted-foreground">Placed on July 17, 2026</p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
        {/* left side */}
        <div className="space-y-8">
          {/* customer */}
          <div className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-lg font-semibold">Customer Information</h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="mt-1 font-medium">John Doe</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="mt-1 font-medium">john@example.com</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="mt-1 font-medium">+1551515151</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="mt-1 font-medium">
                  25 Main Street,
                  <br />
                  New York, USA
                </p>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="overflow-hidden rounded-2xl border border-border bg-background">
            <div className="border-b border-border px-6 py-5">
              <h2 className="text-lg font-semibold">Order Items</h2>
            </div>

            <div className="divide-y divide-border">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-5 p-6"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={80}
                    height={90}
                    className="rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Size: {product.size}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Quantity: {product.quantity}
                    </p>
                  </div>

                  <p className="font-medium">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="space-y-8">
          {/* status */}
          <div className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-lg font-semibold">Customer Order Status</h2>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium">Status</label>
              <select className="h-12 w-full rounded-lg border border-border bg-background px-4 outline-none focus:border-primary">
                <option>Pending</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>

            <Button fullWidth className="mt-5">
              Update Order
            </Button>
          </div>

          {/* Payment */}
          <div className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-lg font-semibold">Payment</h2>

            <div className="mt-5 flex items-center justify-between gap-4">
              <span className="shrink-0 text-muted-foreground">Method</span>
              <span className="scrollbar-hide max-w-[60%] overflow-x-auto whitespace-nowrap text-right">
                Stripe
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 border-t border-dashed border-border pt-4">
              <span className="shrink-0 text-muted-foreground">Status</span>
              <span className="scrollbar-hide max-w-[60%] overflow-x-auto whitespace-nowrap text-right">
                Paid
              </span>
            </div>
          </div>

          {/* summary */}
          <div className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-lg font-semibold">Order Summary</h2>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3 text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
