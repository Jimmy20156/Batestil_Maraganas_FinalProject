export default function FAQPage() {
  return (
    <main className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6 text-primary">Frequently Asked Questions (FAQ)</h1>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        Here are some of the most common questions about using the FarmEquip Leasing and Evaluation System.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-2 text-primary">Account & Registration</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li><strong>Q:</strong> How do I create an account?<br />
                <strong>A:</strong> Go to the Register page, fill out your details, and submit the form.</li>

            <li><strong>Q:</strong> I forgot my password. What should I do?<br />
                <strong>A:</strong> Click on “Forgot Password” on the login page to reset your password.</li>

            <li><strong>Q:</strong> Can I update my profile information?<br />
                <strong>A:</strong> Yes, you can update your profile anytime from the dashboard.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-primary">Equipment Booking</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li><strong>Q:</strong> How do I book equipment?<br />
                <strong>A:</strong> Browse available equipment, click “Book,” and confirm your reservation.</li>

            <li><strong>Q:</strong> Can I cancel my booking?<br />
                <strong>A:</strong> Yes, go to “My Bookings” and click cancel if it’s still pending.</li>

            <li><strong>Q:</strong> Is there a limit on how many items I can lease?<br />
                <strong>A:</strong> It depends on your account type — standard users can lease up to 3 at once.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-primary">Payments & Evaluation</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li><strong>Q:</strong> How do I pay for a lease?<br />
                <strong>A:</strong> Payment methods are shown during booking — we accept cash or online transactions.</li>

            <li><strong>Q:</strong> How does the evaluation system work?<br />
                <strong>A:</strong> After using equipment, you’ll be asked to rate and provide feedback for improvement.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-primary">Need More Help?</h2>
          <p className="text-muted-foreground">
            Still have questions? Visit our{" "}
            <a href="/help-center" className="text-primary underline">
              Help Center
            </a>{" "}
            or contact us directly at{" "}
            <a href="mailto:support@farmequip.com" className="text-primary underline">
              support@farmequip.com
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}
