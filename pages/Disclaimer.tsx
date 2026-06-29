import React from 'react';
import SEO from '../components/SEO';

const Disclaimer: React.FC = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Disclaimer — The Nation\'s Eyes',
    description: 'Disclaimer governing the use of content published by The Nation\'s Eyes Newspaper.',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <SEO
        title="Disclaimer"
        description="Disclaimer for The Nation's Eyes Newspaper. Important information about the nature of our content, editorial independence, and reader responsibilities."
        path="/disclaimer"
        type="website"
        jsonLd={jsonLd}
      />
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-[900] text-slate-900 tracking-tighter uppercase italic mb-4">
            <span className="text-red-600">Disclaimer</span>
          </h1>
          <div className="h-1.5 w-24 bg-red-600 mx-auto rounded-full mb-8"></div>
          <p className="text-slate-500 font-medium uppercase tracking-[0.3em] text-xs md:text-sm">Last Updated: June 29, 2026</p>
        </div>

        <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-8">
          <p className="font-bold text-slate-900 text-xl leading-snug">
            The information published on The Nation's Eyes Newspaper website is for general informational and editorial purposes only. By accessing and using this website, you acknowledge and agree to the following disclaimers.
          </p>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">1. Editorial Independence and Opinion</h2>
            <p>The Nation's Eyes Newspaper is an independent publication committed to fearless, unbiased reporting and editorial commentary. Our content includes news reporting, analysis, opinion pieces, editorials, and feature articles that reflect the views of the respective authors and contributors.</p>
            <p className="mt-4">Opinions expressed in editorials, commentaries, or bylined articles are those of the authors and do not necessarily reflect the official position of The Nation's Eyes Newspaper, its publisher, or affiliates. We maintain strict editorial independence and do not accept editorial direction from any external entity, including advertisers, sponsors, or political organisations.</p>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">2. Accuracy and Completeness</h2>
            <p>We strive to ensure that all information published on our website is accurate, balanced, and thoroughly verified at the time of publication. However, news is a dynamic and evolving field. We make no representations or warranties of any kind, express or implied, regarding the accuracy, completeness, reliability, suitability, or availability of the information contained on this website.</p>
            <p className="mt-4">We reserve the right to correct errors, update stories, or retract content as necessary. Readers are encouraged to verify critical information from multiple sources and consult qualified professionals for advice specific to their circumstances.</p>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">3. Not Legal or Professional Advice</h2>
            <p>The content published on The Nation's Eyes Newspaper, including articles on legal, political, economic, or social matters, is provided for general informational and discussion purposes only. It does not constitute legal, financial, medical, or professional advice of any kind.</p>
            <p className="mt-4">Readers should not act or refrain from acting based on any information obtained from this website without seeking appropriate professional advice tailored to their specific situation. The Nation's Eyes Newspaper expressly disclaims all liability in respect of actions taken or not taken based on any content published on this website.</p>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">4. Fair Comment and Criticism</h2>
            <p>As a news and editorial platform, The Nation's Eyes Newspaper engages in fair comment and criticism on matters of public interest, including government policies, public officials, corporate conduct, and societal issues. Such commentary is protected under Section 39 of the Constitution of the Federal Republic of Nigeria 1999 (as amended), which guarantees freedom of expression and the press.</p>
            <p className="mt-4">Our editorial content is produced in good faith and in the public interest, consistent with the principles of responsible journalism and the Nigerian Press Council's code of ethics.</p>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">5. Third-Party Content and Advertisements</h2>
            <p>This website may contain links to third-party websites, embedded content, and advertisements. The inclusion of any link or advertisement does not imply endorsement by The Nation's Eyes Newspaper of the linked site, its content, products, or services. We are not responsible for the accuracy, legality, or content of any third-party material.</p>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">6. Limitation of Liability</h2>
            <p>To the fullest extent permitted by Nigerian law, The Nation's Eyes Newspaper, its publisher, editors, contributors, and affiliates shall not be liable for any loss, damage, or expense arising from the use of, or reliance upon, any content published on this website. This includes, but is not limited to, direct, indirect, incidental, consequential, or punitive damages.</p>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">7. Corrections Policy</h2>
            <p>The Nation's Eyes Newspaper is committed to accuracy and transparency. If we discover a factual error in our reporting, we will promptly investigate and issue a correction, update, or clarification as appropriate. Readers may report potential errors by contacting us at <a href="mailto:netbiz0925@gmail.com" className="text-red-600 hover:underline font-medium">netbiz0925@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">8. Changes to This Disclaimer</h2>
            <p>We reserve the right to update or modify this Disclaimer at any time without prior notice. Changes become effective immediately upon posting. Your continued use of the website after any modifications constitutes acceptance of the revised disclaimer.</p>
          </section>

          <section>
            <h2 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-4">9. Contact</h2>
            <div className="mt-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900">The Nation's Eyes Newspaper</p>
              <p>Email: <a href="mailto:netbiz0925@gmail.com" className="text-red-600 hover:underline font-medium">netbiz0925@gmail.com</a></p>
              <p>Website: <a href="https://thenationseyes.com" className="text-red-600 hover:underline font-medium">thenationseyes.com</a></p>
            </div>
          </section>

          <div className="pt-8 border-t border-slate-200">
            <p className="text-slate-500 text-sm italic">
              This Disclaimer is governed by the laws of the Federal Republic of Nigeria, including the Constitution of the Federal Republic of Nigeria 1999 (as amended) and the Nigerian Press Council's code of ethics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
