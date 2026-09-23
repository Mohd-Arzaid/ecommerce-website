import FrontendLayout from "@/components/layouts/frontend-layout";
import Image from "next/image";

const Contact = () => {
  return (
    <FrontendLayout>
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* Left - Image */}
          <div className="overflow-hidden rounded-3xl">
            <Image
              src="/images/contact.png"
              alt="Contact Us"
              width={700}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right - Content */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Contact Us
            </span>

            <h1 className="mt-4 text-4xl font-bold text-foreground sm:text-5xl">
              We&apos;d Love to Hear From You
            </h1>

            <p className="mt-6 leading-8 text-muted-foreground">
              Whether you have a question about an order, need help finding the
              perfect outfit, or simply want to say hello, our team is always
              ready to assist you.
            </p>

            <div className="mt-10 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Our Store
                </h3>
                <p className="mt-2 text-muted-foreground">
                  123 Fashion Avenue
                  <br />
                  New York, NY 10001
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground">Email</h3>
                <p className="mt-2 text-muted-foreground">support@fashion.com</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground">Phone</h3>
                <p className="mt-2 text-muted-foreground">+1 (234) 567-890</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Business Hours
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Monday – Friday
                  <br />
                  9:00 AM – 6:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FrontendLayout>
  );
};

export default Contact;
