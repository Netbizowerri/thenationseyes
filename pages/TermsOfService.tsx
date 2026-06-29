import React from 'react';
import SEO from '../components/SEO';

const TermsOfService: React.FC = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service — The Nation\'s Eyes',
    description: 'Terms of Service governing the use of The Nation\'s Eyes Newspaper website and content.',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <SEO
        title="Terms of Service"
        description="Terms of Service for The Nation's Eyes Newspaper. Read the rules and guidelines governing your use of our website and content."
        path="/terms-of-service"
        type="website"
        jsonLd={jsonLd}
      />
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-[900] text-slate-900 tracking-tighter uppercase italic mb-4">
            Terms of <span className="text-red-600">Service</span>
          </h1>
          <div className="h-1.5 w-24 bg-red-600 mx-auto rounded-full mb-8"></div>
          <p className="text-slate-500 font-medium uppercase tracking-[0.3em] text-xs md:text-sm">Last Updated: June 29, 2026</p>
        </div>

        <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-8">
          <p className="font-bold text-slate-900 text-xl leading-snug">
            Welcome to The Nation's Eyes Newspaper. By accessing or using our website at thenationseyes.com, you agree to be bound by these Terms of Service. Please read them carefully.
          </p>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">1. Acceptance of Terms</h2>
            <p>By accessing, browsing, or using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and all applicable laws and regulations of the Federal Republic of Nigeria. If you do not agree with any part of these terms, you must immediately discontinue use of this website.</p>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">2. Intellectual Property Rights</h2>
            <p>All content published on The Nation's Eyes Newspaper, including but not limited to articles, editorials, commentaries, photographs, graphics, videos, logos, trademarks, and software, is the intellectual property of The Nation's Eyes Newspaper or its licensors and is protected under Nigerian copyright law, specifically the Copyright Act, Cap C28, Laws of the Federation of Nigeria 2004.</p>
            <p className="mt-4">You may not reproduce, distribute, modify, transmit, republish, or create derivative works from any content on this website without prior written consent from the publisher, except for personal, non-commercial use that properly credits The Nation's Eyes Newspaper as the source.</p>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">3. Permitted Use</h2>
            <p>You are granted a limited, non-exclusive, non-transferable licence to access and use this website for lawful purposes, including:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Reading and sharing links to our content for personal, non-commercial purposes.</li>
              <li>Quoting brief excerpts with proper attribution to The Nation's Eyes Newspaper.</li>
              <li>Subscribing to our newsletters and notifications.</li>
              <li>Submitting comments or feedback in accordance with our community guidelines.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">4. Prohibited Conduct</h2>
            <p>You agree not to engage in any of the following prohibited activities:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Using the website for any unlawful purpose or in violation of Nigerian law, including the Cybercrime (Prohibition, Prevention, Etc.) Act 2015.</li>
              <li>Attempting to interfere with the security, integrity, or functionality of the website.</li>
              <li>Uploading or transmitting viruses, malware, or any malicious code.</li>
              <li>Scraping, data mining, or harvesting content without authorisation.</li>
              <li>Posting defamatory, abusive, harassing, or discriminatory content in comments or submissions.</li>
              <li>Impersonating any person or entity, or misrepresenting your affiliation with any person or entity.</li>
              <li>Using the website to distribute unsolicited advertising or spam.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">5. User Submissions and Comments</h2>
            <p>We welcome reader comments and contributions. By submitting content to our website, including comments, letters, or article suggestions, you grant The Nation's Eyes Newspaper a non-exclusive, royalty-free, perpetual, irrevocable licence to publish, display, and distribute your submission across our platforms.</p>
            <p className="mt-4">You warrant that your submissions do not infringe upon the rights of any third party and comply with all applicable Nigerian laws. We reserve the right to moderate, edit, or remove any user-generated content at our sole discretion and without prior notice.</p>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">6. Third-Party Links and Content</h2>
            <p>Our website may contain links to third-party websites, advertisements, or embedded content. These links are provided for your convenience and do not constitute endorsement by The Nation's Eyes Newspaper. We are not responsible for the content, accuracy, or practices of any third-party sites. Your interactions with third-party services are governed by their respective terms and policies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">7. Disclaimer of Warranties</h2>
            <p>This website and its content are provided on an "as is" and "as available" basis. The Nation's Eyes Newspaper makes no representations or warranties of any kind, express or implied, regarding the accuracy, completeness, reliability, or timeliness of the information published. While we strive to ensure factual accuracy, news reporting and commentary involve interpretation, and we do not guarantee that all content is error-free or current at the time of access.</p>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">8. Limitation of Liability</h2>
            <p>To the fullest extent permitted by Nigerian law, The Nation's Eyes Newspaper, its publisher, editors, contributors, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, use of, or inability to use this website or any content therein. This limitation applies whether the alleged liability is based on contract, tort, negligence, strict liability, or any other legal theory.</p>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">9. Indemnification</h2>
            <p>You agree to indemnify, defend, and hold harmless The Nation's Eyes Newspaper, its publisher, editors, employees, and agents from and against any and all claims, liabilities, damages, losses, costs, and expenses arising out of or related to your violation of these Terms of Service or your misuse of the website.</p>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">10. Governing Law and Jurisdiction</h2>
            <p>These Terms of Service shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Nigeria, with venue in the Federal Capital Territory, Abuja, or such other location as the publisher may determine.</p>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">11. Changes to Terms</h2>
            <p>We reserve the right to revise these Terms of Service at any time without prior notice. Changes become effective immediately upon posting. Your continued use of the website after any modification constitutes acceptance of the revised terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">12. Contact</h2>
            <div className="mt-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900">The Nation's Eyes Newspaper</p>
              <p>Email: <a href="mailto:netbiz0925@gmail.com" className="text-red-600 hover:underline font-medium">netbiz0925@gmail.com</a></p>
              <p>Website: <a href="https://thenationseyes.com" className="text-red-600 hover:underline font-medium">thenationseyes.com</a></p>
            </div>
          </section>

          <div className="pt-8 border-t border-slate-200">
            <p className="text-slate-500 text-sm italic">
              These Terms of Service are governed by the laws of the Federal Republic of Nigeria, including the Constitution of the Federal Republic of Nigeria 1999 (as amended), the Copyright Act Cap C28 LFN 2004, and the Cybercrime (Prohibition, Prevention, Etc.) Act 2015.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
