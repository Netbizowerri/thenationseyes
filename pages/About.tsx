import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About The Nation\'s Eyes Newspaper — Press Kit',
    description: 'Official Press Kit for The Nation\'s Eyes Newspaper. Advertising opportunities, corporate information, and partnership details.',
    mainEntity: {
      '@type': 'Organization',
      name: "The Nation's Eyes Newspaper",
      description: 'Independent Nigerian newspaper committed to truth, accountability, and people-centered journalism.',
      url: 'https://thenationseyes.com',
      foundingDate: '2025',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'No. 1 Sam Mbakwe Airport Junction, Aba–Owerri Expressway, Umuowa',
        addressLocality: 'Ngor Okpala',
        addressRegion: 'Imo State',
        addressCountry: 'NG',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+234-706-511-4883',
        contactType: 'advertising',
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <SEO
        title="About Us — Press Kit & Advertising"
        description="Official Press Kit for The Nation's Eyes Newspaper. Discover our mission, audience, advertising opportunities, and corporate information. Partner with a truth-driven media platform."
        path="/about"
        type="website"
        jsonLd={jsonLd}
      />
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-8 md:p-16 lg:p-20 mb-20 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-700/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/70 text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-white/10">
              <i className="fas fa-star text-yellow-400"></i>
              Official Press Kit
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-[900] text-white tracking-tighter uppercase leading-[1.1] mb-6">
              The Nation's Eyes
            </h1>
            <p className="text-lg md:text-2xl text-white/60 font-light italic max-w-3xl mx-auto mb-4">
              "Seeing Beyond the Headline, Telling the Truth Others Won't."
            </p>
            <div className="w-20 h-1 bg-red-600 mx-auto rounded-full"></div>
            <p className="mt-6 text-white/40 text-sm font-bold uppercase tracking-[0.3em]">
              Press Kit for Sponsors & Advertisers
            </p>
          </div>
        </div>

        {/* About Us Section */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
                <i className="fas fa-info-circle"></i>
                About Us
              </div>
              <h2 className="text-3xl md:text-5xl font-[900] text-slate-900 tracking-tighter uppercase leading-[1.1] mb-8">
                Truth. <span className="text-red-600">Accountability.</span> Impact.
              </h2>
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light mb-6">
                The Nation's Eyes Newspaper is a bold, independent media platform committed to truth, accountability, and people-centered journalism.
              </p>
              <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
                <h3 className="text-lg font-black uppercase tracking-widest mb-4 text-red-400">Our Bond</h3>
                <p className="text-2xl md:text-3xl font-[900] italic leading-tight text-white">
                  We See. We Speak. We Expose.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-5 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-red-100 hover:bg-red-50/30 transition-all">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-200">
                  <i className="fas fa-gavel"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-wider text-sm mb-2">Holds Leaders Accountable</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">We deliver fearless reporting that challenges power and demands transparency from those in authority.</p>
                </div>
              </div>
              <div className="flex items-start gap-5 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-red-100 hover:bg-red-50/30 transition-all">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-200">
                  <i className="fas fa-bullhorn"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-wider text-sm mb-2">Amplifies Underrepresented Voices</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">We give a platform to those who are often unheard, ensuring diverse perspectives shape national discourse.</p>
                </div>
              </div>
              <div className="flex items-start gap-5 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-red-100 hover:bg-red-50/30 transition-all">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-200">
                  <i className="fas fa-search"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-wider text-sm mb-2">Exposes Corruption & Injustice</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">Our investigative reporting uncovers wrongdoing and advocates for justice in every corner of society.</p>
                </div>
              </div>
              <div className="flex items-start gap-5 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-red-100 hover:bg-red-50/30 transition-all">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-200">
                  <i className="fas fa-comments"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-wider text-sm mb-2">Shapes National Conversations</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">We drive the issues that matter, influencing public opinion and policy through impactful storytelling.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 p-8 bg-gradient-to-r from-red-600 to-red-700 rounded-3xl text-center shadow-xl">
            <p className="text-white/90 text-lg md:text-xl font-light italic max-w-3xl mx-auto">
              "We believe that when citizens are well-informed, nations transform."
            </p>
          </div>
        </section>

        {/* Our Audience */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
              <i className="fas fa-users"></i>
              Our Audience
            </div>
            <h2 className="text-3xl md:text-5xl font-[900] text-slate-900 tracking-tighter uppercase">Who We <span className="text-red-600">Reach</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-red-600">
                <i className="fas fa-landmark text-2xl"></i>
              </div>
              <h4 className="font-black text-slate-900 uppercase tracking-wider text-sm mb-2">Politically Aware Nigerians</h4>
              <p className="text-slate-400 text-xs">Engaged citizens who follow governance and policy closely.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-red-600">
                <i className="fas fa-rocket text-2xl"></i>
              </div>
              <h4 className="font-black text-slate-900 uppercase tracking-wider text-sm mb-2">Youth & Grassroots Mobilizers</h4>
              <p className="text-slate-400 text-xs">Young leaders driving change at community and national levels.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-red-600">
                <i className="fas fa-briefcase text-2xl"></i>
              </div>
              <h4 className="font-black text-slate-900 uppercase tracking-wider text-sm mb-2">Business Leaders & Entrepreneurs</h4>
              <p className="text-slate-400 text-xs">Professionals seeking credible market and policy intelligence.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-red-600">
                <i className="fas fa-globe-africa text-2xl"></i>
              </div>
              <h4 className="font-black text-slate-900 uppercase tracking-wider text-sm mb-2">Diaspora Nigerians</h4>
              <p className="text-slate-400 text-xs">Nigerians abroad seeking credible updates on home affairs.</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 rounded-2xl text-white shadow-xl">
              <i className="fas fa-chart-line text-red-400"></i>
              <span className="font-black uppercase tracking-widest text-sm">Audience Strength:</span>
              <span className="text-white/70 text-sm font-light italic">Engaged, vocal, and influence-driven.</span>
            </div>
          </div>
        </section>

        {/* Why Partner With Us */}
        <section className="mb-24">
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-8 md:p-16 shadow-2xl">
            <div className="absolute top-0 left-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-700/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/70 text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-white/10">
                <i className="fas fa-handshake text-yellow-400"></i>
                Why Partner With Us
              </div>
              <h2 className="text-3xl md:text-5xl font-[900] text-white tracking-tighter uppercase mb-12">
                Partner with <span className="text-red-400">Integrity</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start gap-5 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400 shrink-0">
                    <i className="fas fa-check-circle text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-black text-white uppercase tracking-wider text-sm mb-2">High Visibility</h4>
                    <p className="text-white/50 text-sm">Reach a conscious and active audience that engages deeply with content.</p>
                  </div>
                </div>
                <div className="flex items-start gap-5 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400 shrink-0">
                    <i className="fas fa-check-circle text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-black text-white uppercase tracking-wider text-sm mb-2">Credibility Boost</h4>
                    <p className="text-white/50 text-sm">Align your brand with a truth-driven media platform known for integrity.</p>
                  </div>
                </div>
                <div className="flex items-start gap-5 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400 shrink-0">
                    <i className="fas fa-check-circle text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-black text-white uppercase tracking-wider text-sm mb-2">Targeted Exposure</h4>
                    <p className="text-white/50 text-sm">Engage readers who care about governance, economy, and society.</p>
                  </div>
                </div>
                <div className="flex items-start gap-5 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400 shrink-0">
                    <i className="fas fa-check-circle text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-black text-white uppercase tracking-wider text-sm mb-2">Multi-Platform Promotion</h4>
                    <p className="text-white/50 text-sm">Digital, social media, and print expansion for maximum reach (ongoing).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advertising Opportunities */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
              <i className="fas fa-ad"></i>
              Advertising
            </div>
            <h2 className="text-3xl md:text-5xl font-[900] text-slate-900 tracking-tighter uppercase">Advertise <span className="text-red-600">With Us</span></h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">We offer flexible advertising solutions tailored to your brand's goals and budget.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <i className="fas fa-laptop text-white text-2xl"></i>
                </div>
                <h3 className="text-white font-black text-xl uppercase tracking-tight">Digital Advertising</h3>
              </div>
              <div className="p-8 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                    <i className="fas fa-image"></i>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Banner Placements</p>
                    <p className="text-slate-400 text-xs">Premium positions on our website</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                    <i className="fas fa-newspaper"></i>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Sponsored Articles</p>
                    <p className="text-slate-400 text-xs">Brand features and thought leadership</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                    <i className="fas fa-star"></i>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Homepage Highlights</p>
                    <p className="text-slate-400 text-xs">Featured placement on our front page</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="bg-gradient-to-br from-red-600 to-red-700 p-8 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <i className="fas fa-pen-fancy text-white text-2xl"></i>
                </div>
                <h3 className="text-white font-black text-xl uppercase tracking-tight">Sponsored Content</h3>
              </div>
              <div className="p-8 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600 shrink-0">
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Thought Leadership</p>
                    <p className="text-slate-400 text-xs">Position your executives as industry voices</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600 shrink-0">
                    <i className="fas fa-book-open"></i>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Brand Storytelling</p>
                    <p className="text-slate-400 text-xs">Compelling narratives that resonate</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600 shrink-0">
                    <i className="fas fa-calendar-check"></i>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Event Coverage</p>
                    <p className="text-slate-400 text-xs">Partnership coverage for your events</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="bg-gradient-to-br from-amber-600 to-amber-700 p-8 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <i className="fas fa-bullhorn text-white text-2xl"></i>
                </div>
                <h3 className="text-white font-black text-xl uppercase tracking-tight">Political & Advocacy</h3>
              </div>
              <div className="p-8 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
                    <i className="fas fa-flag"></i>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Issue-Based Campaigns</p>
                    <p className="text-slate-400 text-xs">Targeted messaging on key issues</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
                    <i className="fas fa-eye"></i>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Public Awareness</p>
                    <p className="text-slate-400 text-xs">Promotions that drive social impact</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
                    <i className="fas fa-vote-yea"></i>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Election Season</p>
                    <p className="text-slate-400 text-xs">Visibility packages during election cycles</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Positioning */}
        <section className="mb-24">
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-red-600 via-red-700 to-red-800 p-8 md:p-16 shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_70%)]"></div>
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/70 text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-white/10">
                <i className="fas fa-tag text-yellow-400"></i>
                Brand Positioning
              </div>
              <h2 className="text-3xl md:text-5xl font-[900] text-white tracking-tighter uppercase mb-6">
                A Movement for <span className="text-yellow-300">Truth</span>
              </h2>
              <p className="text-xl md:text-2xl text-white/80 font-light italic max-w-3xl mx-auto mb-12">
                We are not just a newspaper — we are a movement for truth and national consciousness.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <i className="fas fa-shield-alt text-white text-xl"></i>
                  </div>
                  <p className="text-white font-black uppercase tracking-wider text-sm">Integrity</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <i className="fas fa-dragon text-white text-xl"></i>
                  </div>
                  <p className="text-white font-black uppercase tracking-wider text-sm">Courage</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <i className="fas fa-heart text-white text-xl"></i>
                  </div>
                  <p className="text-white font-black uppercase tracking-wider text-sm">Social Impact</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <i className="fas fa-handshake text-white text-xl"></i>
                  </div>
                  <p className="text-white font-black uppercase tracking-wider text-sm">Public Trust</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Publisher Bio */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
              <i className="fas fa-user-tie"></i>
              Editorial Leadership
            </div>
            <h2 className="text-3xl md:text-5xl font-[900] text-slate-900 tracking-tighter uppercase">Meet the <span className="text-red-600">Publisher</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <div className="md:col-span-1">
              <div className="relative group">
                <div className="absolute -inset-4 bg-red-600/10 rounded-3xl blur-2xl group-hover:bg-red-600/20 transition-all duration-700"></div>
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-8 border-white shadow-2xl shadow-slate-200/50 transform -rotate-2 group-hover:rotate-0 transition-transform duration-700">
                  <img
                    src="https://i.ibb.co/J4rCTZG/598621592-25338159849137619-4297002845697941508-n.jpg"
                    alt="Portrait of NZE Noel Chiagorom, Publisher of The Nation's Eyes"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    width={400}
                    height={533}
                  />
                </div>
              </div>
            </div>
            <div className="md:col-span-2 space-y-6">
              <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
                <h3 className="text-2xl font-[900] tracking-tight uppercase">Nze, Noel Chiagorom</h3>
                <p className="text-red-400 font-bold uppercase tracking-widest text-sm mt-1">Editor-in-Chief & Publisher</p>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Nze Noel Chiagorom is a Nigerian traditional leader, public affairs analyst, author, and media publisher with a strong voice in socio-political commentary and cultural advocacy. He is the founder and publisher of <span className="font-black text-red-600 italic">The Nation's Eyes Newspaper</span>, a platform known for critical perspectives on governance, social justice, accountability, and national development.
              </p>
              <p className="text-slate-700 leading-relaxed">
                He also serves as the Palace Secretary of the Nguru/Umuowa Autonomous Community in Ngor Okpala LGA, Imo State, and holds the traditional title of <span className="font-bold text-slate-900">Nze</span> — a status that signifies moral authority, cultural custodianship, and adherence to the ethical codes of Igbo tradition.
              </p>
              <div className="bg-red-600 text-white p-6 rounded-2xl shadow-lg">
                <h4 className="font-black uppercase tracking-wider text-sm mb-2 flex items-center gap-2">
                  <i className="fas fa-book-open"></i>
                  Author
                </h4>
                <p className="text-red-50 text-sm leading-relaxed">
                  Author of <span className="font-bold italic underline decoration-2 underline-offset-4">Peter Obi: The Face of Nigeria</span>, a political biography examining leadership, national identity, and reformist ideals in Nigeria's contemporary political landscape.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate Info + Contact */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 md:p-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
                <i className="fas fa-building"></i>
                Corporate Information
              </div>
              <div className="space-y-6">
                <div className="pb-6 border-b border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Published By</p>
                  <p className="font-bold text-slate-900 text-lg">The Nation's Eyes Media</p>
                  <p className="text-slate-500 text-sm">RC: 9446586</p>
                </div>
                <div className="pb-6 border-b border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Head Office</p>
                  <p className="font-bold text-slate-900">No. 1 Sam Mbakwe Airport Junction</p>
                  <p className="text-slate-500">Aba–Owerri Expressway, Umuowa</p>
                  <p className="text-slate-500">Ngor Okpala, Imo State, Nigeria</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Rights</p>
                  <p className="text-slate-500 text-sm italic">All Rights Reserved</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 md:p-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
                <i className="fas fa-phone"></i>
                Contact & Bookings
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-5 p-5 bg-slate-50 rounded-2xl">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white shrink-0">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Advertising & Marketing</p>
                    <a href="tel:+2347065114883" className="text-lg font-black text-slate-900 hover:text-red-600 transition-colors no-underline">0706 511 4883</a>
                  </div>
                </div>
                <div className="flex items-center gap-5 p-5 bg-slate-50 rounded-2xl">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white shrink-0">
                    <i className="fas fa-globe"></i>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Official Website</p>
                    <a href="https://www.thenationseyes.com.ng" target="_blank" rel="noopener noreferrer" className="text-lg font-black text-red-600 hover:text-red-700 transition-colors no-underline">
                      www.thenationseyes.com.ng
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-5 p-5 bg-slate-50 rounded-2xl">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white shrink-0">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Email</p>
                    <a href="mailto:netbiz0925@gmail.com" className="text-lg font-black text-slate-900 hover:text-red-600 transition-colors no-underline">
                      netbiz0925@gmail.com
                    </a>
                  </div>
                </div>
                <div className="mt-6 p-5 bg-slate-900 rounded-2xl text-center">
                  <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Book Your Ad Slot Today</p>
                  <a href="tel:+2347065114883" className="text-white font-black text-xl hover:text-red-400 transition-colors no-underline">
                    <i className="fas fa-arrow-right mr-2"></i> Call 0706 511 4883
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center p-12 md:p-20 bg-gradient-to-br from-slate-900 to-slate-950 rounded-[3rem] shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-[900] text-white tracking-tighter uppercase mb-6">
            Let's <span className="text-red-400">Work Together</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto mb-10 font-light">
            Your brand belongs alongside integrity, courage, and public trust. Partner with The Nation's Eyes and reach an audience that matters.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:+2347065114883" className="inline-flex items-center gap-3 px-8 py-5 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-red-700 transition-all shadow-xl shadow-red-900/30 no-underline">
              <i className="fas fa-phone-alt"></i>
              Call 0706 511 4883
            </a>
            <Link to="/" className="inline-flex items-center gap-3 px-8 py-5 bg-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/20 transition-all border border-white/10 no-underline">
              <i className="fas fa-eye"></i>
              Explore The Nation's Eyes
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
