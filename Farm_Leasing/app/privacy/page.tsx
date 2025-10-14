export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6 text-primary">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        FarmEquip Leasing and Evaluation System values your privacy. This policy explains how we collect, use, and protect your personal information.
      </p>

      <section className="space-y-6 text-muted-foreground">
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">1. Information We Collect</h2>
          <p>
            We collect personal details such as your name, email address, phone number, and transaction history when you create an account or use our services.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">2. How We Use Your Information</h2>
          <p>
            Your data is used to manage accounts, process bookings, provide customer support, and improve system features. We may also send important updates or promotional content.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">3. Data Protection</h2>
          <p>
            We use secure servers and encryption to protect your data. Access to your personal information is limited to authorized personnel only.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">4. Sharing Information</h2>
          <p>
            We do not sell or rent user data. However, information may be shared with trusted third parties for payment processing, authentication, or technical support.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">5. Cookies</h2>
          <p>
            Cookies help us track usage and improve user experience. You can disable cookies in your browser settings, but some features may not function properly.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">6. User Rights</h2>
          <p>
            You can request access, correction, or deletion of your data by contacting us at{" "}
            <a href="mailto:support@farmequip.com" className="text-primary underline">
              support@farmequip.com
            </a>.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">7. Policy Updates</h2>
          <p>
            We may update this Privacy Policy periodically. Users will be notified of major updates via email or system notification.
          </p>
        </div>
      </section>

      <p className="mt-10 text-muted-foreground">
        Last updated: <span className="font-medium">October 2025</span>
      </p>
    </main>
  );
}
