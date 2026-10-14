import { BEADS, EXPERTS, BENEFITS, FAQS, IMAGES, DEFAULT_CONTENT } from './content';

export const DEFAULT_PAGE = {
  brand: {
    logo: IMAGES.logo, name: 'Rudralife', tagline: 'Rudraksha power for you.',
    announcement: 'A sacred tradition. A personal connection.', show_announcement: true,
    consultation_label: 'Free consultation', mobile_consultation_label: 'Speak with an expert',
    nav: [{ id: 'about', label: 'The Mala', href: '#about' }, { id: 'beads', label: 'Sacred Beads', href: '#composition' }, { id: 'experts', label: 'Our Experts', href: '#experts' }, { id: 'faq', label: 'Your Questions', href: '#faq' }],
  },
  hero: {
    eyebrow: 'RUDRALIFE’S SIGNATURE CREATION', title: 'The Siddha Mala.',
    tagline: DEFAULT_CONTENT.hero_title, description: DEFAULT_CONTENT.hero_subtitle,
    image: '/assets/rudralife/gold-mala-premium.png', image_alt: 'Complete Siddha Mala with natural Rudraksha and gold fittings',
    composition_label: '01 — THE SACRED COMBINATION', composition: '1–14 Mukhi.\nGauri Shankar.\nGanesh.',
    note: 'Every bead, a purpose.\nTogether, a complete whole.', badge: 'AUTHENTIC RUDRAKSHA. PERSONAL GUIDANCE.',
    cta_label: 'Find your Siddha Mala', secondary_label: 'Discover the beads',
    scroll_label: 'A sacred journey, bead by bead', edition: 'NATURAL RUDRAKSHA · GOLD FITTINGS',
    reveal_eyebrow: 'MANY SACRED ENERGIES. ONE MALA.', reveal_title: 'A connection\nlike no other.',
    reveal_left_label: 'NATURALLY EXTRAORDINARY', reveal_left_text: 'Chosen with care.\nJoined by tradition.',
    reveal_right_label: 'THE COMPLETE SIDDHA MALA', reveal_right_text: '1 to 14 Mukhi\nGauri Shankar & Ganesh',
  },
  intro: { visible: true, eyebrow: 'A MOMENT FOR YOURSELF', title: 'Beyond the everyday.\nCloser to yourself.',
    text: 'Some connections are felt before they are understood. A quiet moment. A clearer intention. A sacred reminder of what matters to you.',
    note: 'Your journey begins with a conversation.', cta_label: 'Begin your connection', image: '/assets/rudralife/bead-14.png' },
  signature: { visible: true, eyebrow: 'RUDRALIFE’S SACRED SIGNATURE', title: 'Not just worn.\nDeeply connected.',
    text: 'Siddha Mala is a registered and trademarked creation of Rudralife. It combines carefully selected Rudraksha into one complete spiritual companion.',
    image: '/assets/rudralife/gold-mala-premium.png', image_alt: 'Full gold-fitted Siddha Mala',
    points: [{ id: 'composition', title: 'A complete combination', text: '1 to 14 Mukhi, Gauri Shankar and Ganesh Rudraksha.' }, { id: 'individual', title: 'Naturally individual', text: 'Every natural bead has its own shape, surface and character.' }, { id: 'guidance', title: 'Chosen with understanding', text: 'Personalised recommendations from the Rudralife expert panel.' }],
    brochure: 'https://www.rudralife.com/siddha-mala/assets/siddha-mala-brochure.pdf', brochure_label: 'Original Rudralife brochure',
    brochure_note: 'PDF · 9.22 MB. Traditional claims in the source brochure reflect spiritual beliefs, not guaranteed outcomes.', cta_label: 'Speak with an expert' },
  story: { visible: true, eyebrow: 'THE STORY BEHIND THE COMBINATION', title: 'Rooted in tradition.\nMade with intention.',
    image: IMAGES.malaSatin, image_alt: 'Rudralife Siddha Mala displayed with its presentation box', caption: 'A SIGNATURE CREATION BY RUDRALIFE',
    paragraphs: ['At the heart of Siddha Mala is a simple idea: bring different forms of Rudraksha together into a single, meaningful combination.', 'Rudralife’s product description draws on Vedic traditions and describes its ACE Energization process. Every recommendation begins with understanding the person who will wear the mala.'],
    signoff: 'Authenticity, before everything.', link_label: 'Discover the Rudralife story', source: 'https://www.rudralife.com/profile-mission' },
  gallery: { visible: true, eyebrow: 'THE SIDDHA MALA COLLECTION', title: 'Look closer.\nEvery detail matters.', text: 'Explore the full combination, natural textures and considered finishes. Ask our team about the available grades and fittings.',
    items: [{ id: 'gold', title: 'The gold-fitted Siddha Mala', image: '/assets/rudralife/gold-mala-premium.png', alt: 'Full gold-fitted Siddha Mala', caption: 'Natural Rudraksha. A considered finish.' }, { id: 'natural', title: 'The complete combination', image: IMAGES.malaClose, alt: 'Complete Rudralife Rudraksha necklace', caption: 'Every form, thoughtfully brought together.' }, { id: 'detail', title: 'A closer connection', image: IMAGES.malaEdit, alt: 'Rudralife Siddha Mala product photograph', caption: 'Textures shaped by nature.' }], cta_label: 'Enquire about this mala' },
  beads: { visible: true, eyebrow: 'THE SACRED COMPOSITION', title: 'Individually extraordinary.\nTogether, Siddha.',
    text: 'Sixteen distinct forms. Twenty-eight beads in the listed combination. One complete spiritual companion.',
    centre_label: 'THE SIDDHA MALA', image: '/assets/rudralife/gold-mala-premium.png',
    description_label: 'SACRED RUDRAKSHA', source_label: 'Explore at Rudralife', cta_label: 'Ask about this bead',
    note: 'Traditional associations are based on spiritual beliefs. Individual experiences vary.',
    items: BEADS.map(b => ({ ...b, id: String(b.id), quantity: b.id >= 2 && b.id <= 7 ? 3 : 1 })),
    breakdown: '3 each of 2–7 Mukhi (18) + 1 each of 8–14 Mukhi (7) + Half-Moon 1 Mukhi, Gauri Shankar and Ganesh (3) = 28 beads.' },
  education: { visible: true, eyebrow: 'SACRED KNOWLEDGE', title: 'Understanding\nyour Siddha Mala.',
    text: 'A little understanding makes the connection more meaningful.',
    items: [{ id: 'meaning', q: 'What makes this combination distinct?', a: 'The Siddha Mala brings together 1 to 14 Mukhi, Gauri Shankar and Ganesh Rudraksha. The listed composition contains 28 beads across 16 distinct forms. Repeated Mukhi forms are part of that composition, not separate varieties.' }, { id: 'composition', q: 'How many beads does the mala contain?', a: 'The source-confirmed configuration contains three each of 2 to 7 Mukhi, one each of 8 to 14 Mukhi, one Half-Moon 1 Mukhi, one Gauri Shankar and one Ganesh: 28 in total. Ask your consultant to confirm the exact configuration of the variant you choose.' }, { id: 'personal', q: 'How should I choose my mala?', a: 'Your intentions, preferences and the available bead grades and finishes can guide your choice. A Rudralife expert can explain these differences and recommend an appropriate combination without a consultation charge.' }] },
  benefits: { visible: true, eyebrow: 'A PURPOSE IN EVERY BEAD', title: 'For the life you lead.\nAnd the peace you seek.', text: 'Sacred intentions. An everyday connection.',
    items: BENEFITS.map((b, i) => ({ ...b, id: String(i+1), image: BEADS[[4,8,11,14][i]].img })),
    note: 'Spiritual associations are not a promise of medical, financial or other specific outcomes.' },
  patrons: { visible: true, eyebrow: 'PERSONAL JOURNEYS. SHARED FAITH.', title: 'A connection that\nspeaks for itself.', text: 'FROM THE RUDRALIFE FAMILY',
    items: [{ id: 'milind', name: 'Milind Soman', role: 'Model & fitness enthusiast', image: '/assets/rudralife/milind-visit.webp', image_alt: 'Milind Soman during his documented visit to Rudralife', title: 'A life of discipline.\nA sacred companion.', text: 'Milind Soman during a visit to Rudralife. Rudralife’s published Siddha Mala story documents his visit and selection of the mala.', quote: '', quote_source: 'https://rudralife.com/blog/what-is-sidhhamala-benefits-energising-fake-vs-genuine/' }, { id: 'dimple', name: 'Dimple Kapadia', role: 'Actress', image: '/assets/rudralife/dimple-visit.webp', image_alt: 'Dimple Kapadia with the Rudralife team during her documented visit', title: 'An enduring tradition.\nA personal connection.', text: 'Dimple Kapadia with the Rudralife team. Her visit is documented in Rudralife’s Siddha Mala story; the quote below is from its published client voices.', quote: 'Rudraksha from Mr. Tanay is very fascinating.', quote_source: 'https://www.rudralife.com' }], source_label: 'Voices from Rudralife' },
  trust: { visible: true, eyebrow: 'KNOW YOUR RUDRAKSHA', title: 'Clarity is part\nof the connection.',
    items: [{ id: 'authenticity', title: 'Authenticity', text: 'Ask our team about the testing and certificate supplied with your selected mala.' }, { id: 'configuration', title: 'The right configuration', text: 'Understand every Mukhi form, bead grade and finish before choosing.' }, { id: 'care', title: 'Care that continues', text: 'Receive personal guidance on wearing and looking after your Rudraksha.' }],
    cta_label: 'Ask an expert' },
  experts: { visible: true, eyebrow: 'KNOWLEDGE. EXPERIENCE. EMPATHY.', title: 'Real people.\nThoughtful guidance.', cta_label: 'Meet your guide', profile_cta: 'Consult this expert',
    items: EXPERTS.map((e,i) => ({ ...e, id: String(i+1) })) },
  community: { visible: true, eyebrow: 'A SHARED TRADITION', title: 'Wherever you begin,\nmake it personal.',
    text: 'From spiritual practice to the rhythms of everyday life, every seeker brings a different story. Our team begins by listening to yours.',
    cta_label: 'Start a conversation',
    points: [{ id: 'listen', title: 'We listen', text: 'Your aspirations and questions come first.' }, { id: 'explain', title: 'We explain', text: 'Understand the beads, grades and finishes.' }, { id: 'guide', title: 'We guide', text: 'A personal recommendation, without obligation.' }],
    stats: [{ id: 'clients', label: 'Clients', value: '', suffix: '', visible: false, verified: false, source: '' }, { id: 'repeat', label: 'Repeat customers', value: '', suffix: '%', visible: false, verified: false, source: '' }, { id: 'countries', label: 'Countries served', value: '', suffix: '+', visible: false, verified: false, source: '' }] },
  faq: { visible: true, eyebrow: 'A LITTLE MORE CLARITY', title: 'Naturally,\nyou have questions.', cta_label: 'Ask our experts',
    items: [...FAQS, { q: 'Can I wear my mala every day?', a: 'Your consultant can guide you on daily wear and care for the bead grade and finish you select. Handle the mala gently and follow the specific care instructions supplied with it.' }, { q: 'Can women wear Rudraksha?', a: 'Rudralife offers Rudraksha guidance to people from all walks of life. Speak with the expert panel about any personal or traditional wearing questions you may have.' }, { q: 'Can I choose gold fittings?', a: 'Ask the team about currently available fittings, customisation and pricing. The photographs show particular finishes; availability and the exact configuration should be confirmed during consultation.' }, { q: 'Are particular results guaranteed?', a: 'No. Rudraksha is worn as a matter of faith and personal belief. Traditional spiritual associations do not guarantee health, wealth or other outcomes, and are not a substitute for medical or financial advice.' }].map((item,i) => ({ ...item, id: String(i+1) })) },
  consultation: { visible: true, eyebrow: 'YOUR JOURNEY IS PERSONAL', title: 'Let’s find\nyour connection.',
    text: 'A conversation, not a commitment. Our expert panel is here to understand you and recommend the right Rudraksha for your journey.',
    note: 'Personalised guidance. Always complimentary.', whatsapp_label: 'Prefer WhatsApp?', popup_label: 'Open consultation form' },
  form: { title: 'Your personal consultation', description: 'Tell us a little about yourself. The Rudralife team will respond to your enquiry.', submit_label: 'Request a free consultation', sending_label: 'Sending your enquiry',
    privacy: 'Your details are used to respond to your enquiry.', country_label: 'Country / dialling code', country_placeholder: 'Select country code',
    interest_label: 'Your interest', success_label: 'Your enquiry has been received.',
    fields: [{ key: 'name', label: 'Full name', placeholder: 'Your name', required: true }, { key: 'email', label: 'Email address', placeholder: 'you@example.com', required: true }, { key: 'phone', label: 'Phone number', placeholder: 'Your phone number', required: true }, { key: 'city', label: 'City', placeholder: 'Your city', required: false }, { key: 'profession', label: 'Profession', placeholder: 'What do you do?', required: false }, { key: 'message', label: 'Your message', placeholder: 'What brings you to Rudraksha?', required: false }] },
  footer: { phone:DEFAULT_CONTENT.phone, email:DEFAULT_CONTENT.email, whatsapp:DEFAULT_CONTENT.whatsapp, address:DEFAULT_CONTENT.address, hours:DEFAULT_CONTENT.hours, website:DEFAULT_CONTENT.website, title: 'Rudraksha power for you.', copyright: 'Rudralife Services Pvt Ltd. All rights reserved.',
    privacy_url: 'https://www.rudralife.com/privacy-policy', privacy_label: 'Privacy', terms_url: 'https://www.rudralife.com/terms-and-conditions', terms_label: 'Terms',
    disclaimer: 'Rudraksha is worn as a matter of faith and belief. Traditional associations are based on scriptures and individual experiences, not guaranteed outcomes or medical advice. Rudralife guarantees the quality of its beads, not their effects.',
    links: [{ id:'beads', label:'The sacred beads', href:'#composition' }, { id:'experts', label:'Our experts', href:'#experts' }, { id:'faq', label:'Your questions', href:'#faq' }] },
  thankyou: { eyebrow:'A NEW CONNECTION BEGINS', title:'Thank you', text:'Your enquiry has been received. The Rudralife team will be in touch to help you find the right Rudraksha for your journey.', home_label:'Back to the mala', whatsapp_label:'Continue on WhatsApp', image:'/assets/rudralife/bead-5.png' },
  seo: { title:'Siddha Mala — A Sacred Connection | Rudralife', description:'Discover Rudralife’s Siddha Mala: authentic 1–14 Mukhi, Gauri Shankar and Ganesh Rudraksha. Explore the full combination and request a free personal consultation.', image:IMAGES.malaSatin },
  motion: { enabled:true, journey_length:3.8, section_reveals:true },
  order: ['intro','signature','story','gallery','beads','education','benefits','patrons','trust','experts','community','faq','consultation'],
};

export function mergePage(saved, legacy = {}) {
  const defaults = structuredClone(DEFAULT_PAGE);
  if (legacy.hero_title) defaults.hero.tagline = legacy.hero_title;
  if (legacy.hero_subtitle) defaults.hero.description = legacy.hero_subtitle;
  Object.keys(defaults.footer).forEach(key => { if (legacy[key] !== undefined) defaults.footer[key] = legacy[key]; });
  const merge = (base, override) => {
    if (Array.isArray(override)) return override;
    if (!override || typeof override !== 'object') return override === undefined ? base : override;
    const result = { ...base };
    Object.entries(override).forEach(([key,value]) => { result[key] = merge(base?.[key], value); });
    return result;
  };
  return merge(defaults, saved);
}