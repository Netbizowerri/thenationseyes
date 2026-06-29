import React from 'react';
import SEO from '../components/SEO';

const PrivacyPolicy: React.FC = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy — The Nation\'s Eyes',
    description: 'Privacy Policy of The Nation\'s Eyes Newspaper, compliant with the Nigeria Data Protection Regulation (NDPR) and other applicable Nigerian laws.',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <SEO
        title="Privacy Policy"
        description="Privacy Policy of The Nation's Eyes Newspaper — compliant with the Nigeria Data Protection Regulation (NDPR). Learn how we collect, use, and protect your personal data."
        path="/privacy-policy"
        type="website"
        jsonLd={jsonLd}
      />
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-[900] text-slate-900 tracking-tighter uppercase italic mb-4">
            Privacy <span className="text-red-600">Policy</span>
          </h1>
          <div className="h-1.5 w-24 bg-red-600 mx-auto rounded-full mb-8"></div>
          <p className="text-slate-500 font-medium uppercase tracking-[0.3em] text-xs md:text-sm">Last Updated: June 29, 2026</p>
        </div>

        <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-8">
          <p className="font-bold text-slate-900 text-xl leading-snug">
            The Nation's Eyes Newspaper ("we," "our," "us") is committed to protecting the privacy of our readers, contributors, and website visitors in compliance with the Nigeria Data Protection Regulation (NDPR) 2019 and the Data Protection Act 2023.
          </p>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">1. Information We Collect</h2>
            <p>We may collect the following types of information when you visit our website, subscribe to our newsletter, or interact with our content:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Personal Identification Data:</strong> Name, email address, phone number, and other information you voluntarily provide through contact forms, subscription services, or comment sections.</li>
              <li><strong>Usage Data:</strong> IP address, browser type, device information, operating system, referring URLs, pages visited, time and date of access, and other analytical data collected automatically through cookies and similar technologies.</li>
              <li><strong>Communication Data:</strong> Records of correspondence when you contact us via email, social media, or other channels.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">2. Legal Basis for Processing</h2>
            <p>Under the Nigeria Data Protection Act 2023 and NDPR 2019, we process your personal data based on the following legal grounds:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Consent:</strong> Where you have given explicit consent for specific processing purposes, such as newsletter subscriptions.</li>
              <li><strong>Contractual Necessity:</strong> Where processing is necessary to fulfil a contract or respond to your requests before entering into a contract.</li>
              <li><strong>Legitimate Interest:</strong> Where processing is necessary for our legitimate operational interests, including improving our services, ensuring website security, and delivering relevant content, provided such interests do not override your fundamental rights.</li>
              <li><strong>Legal Obligation:</strong> Where processing is required to comply with applicable Nigerian laws and regulatory obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">3. How We Use Your Information</h2>
            <p>We use collected information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>To deliver and personalise our news content and editorial services.</li>
              <li>To send newsletters, updates, and promotional materials (with your consent where required by law).</li>
              <li>To respond to your inquiries, comments, or feedback.</li>
              <li>To analyse website traffic and improve user experience.</li>
              <li>To detect, prevent, and address technical issues, fraud, or illegal activity.</li>
              <li>To comply with legal obligations and regulatory requirements in Nigeria.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">4. Data Sharing and Disclosure</h2>
            <p>We do not sell, trade, or rent your personal data to third parties. We may share your information only in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Service Providers:</strong> With trusted third-party vendors who assist us in operating our website, hosting services, analytics, and email delivery, subject to contractual data protection obligations.</li>
              <li><strong>Legal Requirements:</strong> Where required by Nigerian law, court order, or regulatory directive from the Nigeria Data Protection Commission (NDPC) or other competent authority.</li>
              <li><strong>Protection of Rights:</strong> Where necessary to protect our legal rights, enforce our Terms of Service, or ensure the safety of our users and the public.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">5. Data Retention</h2>
            <p>We retain your personal data only as long as necessary to fulfil the purposes for which it was collected, or as required by applicable Nigerian laws. When data is no longer needed, we securely delete or anonymise it.</p>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">6. Your Rights Under Nigerian Law</h2>
            <p>As a data subject under the Nigeria Data Protection Act 2023 and NDPR 2019, you have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your personal data where applicable.</li>
              <li><strong>Right to Restriction:</strong> Request restriction of processing in certain circumstances.</li>
              <li><strong>Right to Data Portability:</strong> Request transfer of your data to another service provider.</li>
              <li><strong>Right to Object:</strong> Object to processing based on legitimate interests or direct marketing.</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent.</li>
              <li><strong>Right to Lodge a Complaint:</strong> File a complaint with the Nigeria Data Protection Commission (NDPC) if you believe your data protection rights have been violated.</li>
            </ul>
            <p className="mt-4">To exercise any of these rights, please contact us using the details provided in Section 10 below.</p>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">7. Cookies and Tracking Technologies</h2>
            <p>Our website uses cookies and similar tracking technologies to enhance user experience, analyse traffic, and deliver relevant content. You may control cookie preferences through your browser settings. Continued use of our website constitutes acceptance of our cookie practices as described in this policy.</p>
            <p className="mt-4">We use the following types of cookies:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Essential Cookies:</strong> Necessary for the basic functioning of the website.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and enhance your experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">8. Data Security</h2>
            <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction, in accordance with the data security requirements of the Nigeria Data Protection Act 2023 and NDPR 2019. However, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">9. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites, social media platforms, or external services. We are not responsible for the privacy practices or content of such third parties. We encourage you to review the privacy policies of any external sites you visit.</p>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">10. Contact Information</h2>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data protection practices, please contact us:</p>
            <div className="mt-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900">The Nation's Eyes Newspaper</p>
              <p>Attn: Data Protection Officer</p>
              <p>Email: <a href="mailto:netbiz0925@gmail.com" className="text-red-600 hover:underline font-medium">netbiz0925@gmail.com</a></p>
              <p>Website: <a href="https://thenationseyes.com" className="text-red-600 hover:underline font-medium">thenationseyes.com</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">11. Changes to This Policy</h2>
            <p>We reserve the right to update or modify this Privacy Policy at any time. Changes will become effective immediately upon posting on this page with an updated revision date. We encourage you to review this policy periodically.</p>
          </section>

          <div className="pt-8 border-t border-slate-200">
            <p className="text-slate-500 text-sm italic">
              This Privacy Policy is governed by the laws of the Federal Republic of Nigeria, including the Nigeria Data Protection Act 2023, the Nigeria Data Protection Regulation (NDPR) 2019, and the Constitution of the Federal Republic of Nigeria 1999 (as amended).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
