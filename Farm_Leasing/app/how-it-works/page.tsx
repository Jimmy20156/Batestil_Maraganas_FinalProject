export default function HowItWorksPage() {
  return (
    <main className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6 text-primary">How It Works</h1>
      <p className="text-muted-foreground mb-6 leading-relaxed">
        FarmEquip simplifies the process of renting and leasing farm equipment through a secure and user-friendly online platform.
      </p>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-2 text-primary">1. User Registration</h2>
          <p className="text-muted-foreground">
            Farmers and equipment owners create an account to access the system. Registration ensures data security and personalized services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-primary">2. Equipment Listing</h2>
          <p className="text-muted-foreground">
            Equipment owners can list their machinery with details like model, price, availability, and location.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-primary">3. Browsing and Booking</h2>
          <p className="text-muted-foreground">
            Farmers can browse available equipment, compare rates, and book directly through the platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-primary">4. Payment and Confirmation</h2>
          <p className="text-muted-foreground">
            Once the booking is confirmed, payments are processed securely, and both parties receive confirmation details.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-primary">5. Equipment Use and Feedback</h2>
          <p className="text-muted-foreground">
            Farmers use the equipment for the agreed duration. Afterward, both users can leave feedback to maintain platform reliability.
          </p>
        </section>
      </div>
    </main>
  );
}
