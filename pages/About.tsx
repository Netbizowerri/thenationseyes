
import React from 'react';
import SEO from '../components/SEO';

const About: React.FC = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About NZE Noel Chiagorom',
    description: 'Learn about NZE Noel Chiagorom, Nigerian traditional leader, publisher of The Nation\'s Eyes News Commentaries.',
    mainEntity: {
      '@type': 'Person',
      name: 'NZE Noel Chiagorom',
      jobTitle: 'Publisher & Traditional Leader',
      description: 'Nigerian traditional leader, public affairs analyst, author, and media publisher.',
      url: 'https://thenationseyes.com/about',
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <SEO
        title="About The Publisher"
        description="Meet NZE Noel Chiagorom — Nigerian traditional leader, author, and publisher of The Nation's Eyes News Commentaries, a platform for governance and social justice."
        path="/about"
        type="website"
        jsonLd={jsonLd}
      />
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-[900] text-slate-900 tracking-tighter uppercase italic mb-4">
            About <span className="text-red-600">— NZE, Noel Chiagorom</span>
          </h1>
          <div className="h-1.5 w-24 bg-red-600 mx-auto rounded-full mb-8"></div>
          <p className="text-slate-500 font-medium uppercase tracking-[0.3em] text-xs md:text-sm">Publisher & Traditional Leader</p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Image Column */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="relative group">
              <div className="absolute -inset-4 bg-red-600/10 rounded-3xl blur-2xl group-hover:bg-red-600/20 transition-all duration-700"></div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-8 border-white shadow-2xl shadow-slate-200/50 transform -rotate-2 group-hover:rotate-0 transition-transform duration-700">
                <img 
                  src="https://i.ibb.co/J4rCTZG/598621592-25338159849137619-4297002845697941508-n.jpg" 
                  alt="Portrait of NZE Noel Chiagorom, Nigerian traditional leader and publisher" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  width={400}
                  height={533}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-red-200 transform rotate-12">
                <i className="fas fa-quote-right text-3xl"></i>
              </div>
            </div>
            
            <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-100 italic text-slate-600 text-sm leading-relaxed relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
              "Unveiling truths, shaping perspectives, and preserving the cultural integrity of our nation."
            </div>
          </div>

          {/* Text Column */}
          <div className="md:col-span-7 lg:col-span-8 space-y-8 text-slate-700 leading-relaxed text-base md:text-lg">
            <p className="font-bold text-slate-900 text-xl md:text-2xl leading-snug">
              NZE Noel Chiagorom is a Nigerian traditional leader, public affairs analyst, author, and media publisher with a strong voice in socio-political commentary and cultural advocacy.
            </p>
            
            <p>
              As of December 16th, 2025, he serves as the Palace Secretary of the Nguru/Umuowa Autonomous Community in Ngor Okpala Local Government Area, Imo State, where he plays an administrative and advisory role within the traditional institution.
            </p>

            <p>
              Professionally, Chiagorom is the publisher of <span className="font-black text-red-600 italic">The Nation’s Eye News Commentaries</span>, a platform known for critical perspectives on governance, social justice, accountability, and national development. Through his writings, he has established himself as a consistent commentator on Nigerian public affairs and civic responsibility.
            </p>

            <div className="bg-red-600 text-white p-8 rounded-3xl shadow-xl shadow-red-100 transform hover:scale-[1.02] transition-transform duration-500">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-4 flex items-center">
                <i className="fas fa-book-open mr-3"></i>
                Author & Historian
              </h3>
              <p className="text-red-50 leading-relaxed">
                He is also the author of <span className="font-bold italic underline decoration-2 underline-offset-4">Peter Obi: The Face of Nigeria</span>, a political biography and reflective work that examines leadership, national identity, and reformist ideals within Nigeria’s contemporary political landscape.
              </p>
            </div>

            <p>
              Within his community, he holds the traditional title of <span className="font-bold text-slate-900">Nze</span>, a status that signifies moral authority, cultural custodianship, and adherence to the ethical codes of Igbo tradition. The title places him among those entrusted with preserving customs, values, and communal integrity.
            </p>

            <p>
              On December 16, 2025, NZE Noel Chiagorom officiated and documented the coronation of Eze Dr. Eme Njoku, providing detailed accounts of the symbolic rites and cultural significance surrounding the ascension of the Eze Udoh II of Nguru/Umuowa.
            </p>

            <div className="pt-8 border-t border-slate-100">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Personal Life</h3>
              <p className="text-slate-600 italic">
                In his personal life, he is married to Lolo Rita Onyinyechukwu Chiagorom, with three children. The couple marked their 12th wedding anniversary in November 2025, reflecting a long-standing family life alongside his public and traditional responsibilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
