export default function HelpCenterPage() {
  return (
    <main className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6 text-primary">Help Center</h1>
      <p className="text-muted-foreground mb-6 leading-relaxed">
        Need assistance? The FarmEquip Help Center provides answers to common questions and guides to help you use the platform effectively.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-2 text-primary">Account & Registration</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Go to the Register page to create your account.</li>
            <li>Make sure to verify your email for security.</li>
            <li>If you forgot your password, click “Forgot Password” on the login page.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-primary">Equipment Booking</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Browse available equipment from the Equipment page.</li>
            <li>Click “Book” to reserve the equipment you need.</li>
            <li>Track your active bookings from the “My Bookings” section.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-primary">Payments & Transactions</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Payments are processed securely through verified methods.</li>
            <li>View your transaction history from your dashboard.</li>
            <li>Contact support if you encounter payment issues.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-primary">Need More Help?</h2>
          <p className="text-muted-foreground">
            Can’t find what you’re looking for? You can reach us via our support email at{" "}
            <a href="mailto:support@farmequip.com" className="text-primary underline">
              support@farmequip.com
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}
