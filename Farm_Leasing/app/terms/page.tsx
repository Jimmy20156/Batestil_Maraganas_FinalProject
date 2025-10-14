export default function TermsOfServicePage() {
  return (
    <main className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6 text-primary">Terms of Service</h1>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        Welcome to FarmEquip Leasing and Evaluation System. Please read these Terms of Service carefully before using our platform.
      </p>

      <section className="space-y-6 text-muted-foreground">
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using our system, you agree to be bound by these terms. If you do not agree, please do not use our services.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">2. User Responsibilities</h2>
          <p>
            You agree to use the system only for lawful purposes and to provide accurate, up-to-date information during registration and transactions.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">3. Equipment Leasing</h2>
          <p>
            All equipment listed is owned by verified lessors. Users are responsible for the proper handling, return, and payment according to the lease agreement.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">4. Payments and Refunds</h2>
          <p>
            Payment methods and refund eligibility will follow the policies stated in each booking. Unauthorized payments or misuse may result in account suspension.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">5. Account Termination</h2>
          <p>
            FarmEquip reserves the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">6. Limitation of Liability</h2>
          <p>
            We are not responsible for damages, losses, or disputes arising from user actions or third-party services linked to the platform.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">7. Updates to Terms</h2>
          <p>
            FarmEquip may update these terms from time to time. Users will be notified of major changes through the website or email.
          </p>
        </div>
      </section>

      <p className="mt-10 text-muted-foreground">
        Last updated: <span className="font-medium">October 2025</span>
      </p>
    </main>
  );
}
