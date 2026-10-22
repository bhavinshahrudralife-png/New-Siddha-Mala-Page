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

// Third edition: user-supplied product and source-confirmed imagery.
const MALA_PNG = '/assets/rudralife/siddha-user.png';
DEFAULT_PAGE.appearance = { background:'#fae7dc', alternate:'#f3d8c8', surface:'#fff1e7', heading:'#642c2b', body:'#795048', accent:'#a25737', muted:'#88665b', border:'#d8b7a4' };
DEFAULT_PAGE.hero.image = MALA_PNG;
DEFAULT_PAGE.hero.image_alt = 'The complete Siddha Mala in the product photograph supplied by Rudralife';
DEFAULT_PAGE.hero.reveal_title = 'Many sacred forms.\nOne personal connection.';
DEFAULT_PAGE.hero.description = 'Natural Rudraksha, thoughtfully brought together. Discover the sixteen sacred forms at the heart of Rudralife’s Siddha Mala.';
DEFAULT_PAGE.hero.badge = 'NATURAL RUDRAKSHA · RUDRALIFE';
DEFAULT_PAGE.hero.edition = 'A SACRED COMBINATION · A PERSONAL CONNECTION';
DEFAULT_PAGE.motion.journey_length = 3.2;
DEFAULT_PAGE.signature.image = MALA_PNG;
DEFAULT_PAGE.signature.text = 'Not simply a string of beads, but a considered combination. Siddha Mala brings 1 to 14 Mukhi, Gauri Shankar and Ganesh Rudraksha together, each carrying its own traditional association and natural character.';
DEFAULT_PAGE.signature.points[1].text = 'The grooves, contours and texture of every bead are shaped by nature. No two natural Rudraksha look exactly alike.';
DEFAULT_PAGE.signature.points[2].text = 'Understand the bead grades, finish and exact configuration before choosing. Our panel guides you through the details, without obligation.';
DEFAULT_PAGE.beads.image = MALA_PNG;
DEFAULT_PAGE.beads.title = 'A closer look.\nA deeper connection.';
DEFAULT_PAGE.beads.text = 'Explore each sacred form, its traditional meaning and its place in the complete combination.';
DEFAULT_PAGE.beads.mapping_note = 'Exact placement varies by mala. Our experts can identify this bead in your selected piece.';
DEFAULT_PAGE.beads.location_label = 'Location in this mala';
DEFAULT_PAGE.beads.full_view_label = 'Full mala';
DEFAULT_PAGE.beads.items = DEFAULT_PAGE.beads.items.map((b,i) => ({...b,img:`/assets/rudralife/bead-clean-${i+1}.png`,locations:[]}));
DEFAULT_PAGE.intro.image = '/assets/rudralife/bead-clean-14.png';
DEFAULT_PAGE.benefits.items = DEFAULT_PAGE.benefits.items.map((b,i)=>({...b,image:`/assets/rudralife/bead-clean-${[5,9,12,15][i]}.png`}));
DEFAULT_PAGE.thankyou.image = '/assets/rudralife/bead-clean-5.png';
DEFAULT_PAGE.gallery.items[0].image = MALA_PNG;
DEFAULT_PAGE.gallery.items[0].caption = 'A complete view of the mala. Each natural bead, each fitting, every considered detail.';
DEFAULT_PAGE.gallery.text = 'The complete mala, its natural texture and its individual details. Explore the photographs, then discuss your preferred grade and finish with our team.';
DEFAULT_PAGE.story.paragraphs = ['The Siddha Mala is a registered and trademarked Rudralife creation that brings distinct Rudraksha forms into a single combination. Its composition is not about making every bead identical, but about understanding what each form represents in tradition.', 'The listed configuration contains twenty-eight beads across sixteen forms, including repeated 2 to 7 Mukhi beads. Bead grades, natural dimensions and fittings may differ between pieces; your consultant can explain the exact mala you are considering.', 'A personal recommendation begins with listening. Whether your intention is a regular spiritual practice, a meaningful gift or simply a deeper understanding of Rudraksha, the conversation belongs to you.'];
DEFAULT_PAGE.experts.items = DEFAULT_PAGE.experts.items.map((e,i)=>({...e,img:`/assets/rudralife/portrait-${[1,2,4,6,5,7,3][i]}.webp`}));
DEFAULT_PAGE.experts.title = 'Guided by knowledge.\nGrounded in care.';
DEFAULT_PAGE.patrons.interval_seconds = 5;
DEFAULT_PAGE.patrons.autoplay = true;
DEFAULT_PAGE.patrons.items[0].text = 'Rudralife’s published Siddha Mala story documents Milind Soman’s visit and his selection of the mala. The photograph captures a real moment at Rudralife, rather than a promise of what wearing Rudraksha will achieve.\n\nFor a personality associated with discipline and fitness, the image offers a personal glimpse into an enduring tradition. His own spiritual experience remains his to describe; no health, performance or financial result is claimed here.';
DEFAULT_PAGE.patrons.items[1].text = 'Dimple Kapadia is pictured with the Rudralife team during a visit documented in its published Siddha Mala story. Her brief reflection also appears in Rudralife’s client voices.\n\nThe photograph and her words are a record of that connection—not a claim that every wearer will have the same experience. What makes a mala meaningful is ultimately personal: the intention, understanding and care with which it is chosen.';
DEFAULT_PAGE.patrons.items.push({id:'sunanda',name:'Sunanda Shetty',role:'Businesswoman',image:'/assets/rudralife/sunanda.webp',image_alt:'Sunanda Shetty in Rudralife’s official client gallery',title:'A shared tradition.\nAn individual journey.',text:'Sunanda Shetty appears in Rudralife’s official client gallery. Her photograph is part of the brand’s published community of people from different walks of life.\n\nNo personal testimonial or specific outcome is attributed to her here. Her inclusion is a reminder that the relationship with Rudraksha is individual—one that can begin with curiosity, a conversation and an informed choice.',quote:'',quote_source:'https://rudralife.com/rudraksha-recommendation/'});
DEFAULT_PAGE.beadJourney = {visible:true,eyebrow:'SIXTEEN FORMS. MANY MEANINGS.',title:'Every bead\nhas a story.',text:'Meet the sacred forms that make the Siddha Mala complete.',interval_seconds:5,autoplay:true,play_label:'Play bead journey',pause_label:'Pause bead journey',cta_label:'Explore the complete mala',deity_label:'TRADITIONAL ASSOCIATION',note:'Spiritual associations, not guaranteed outcomes.'};
DEFAULT_PAGE.spiritual = {visible:true,eyebrow:'RUDRAKSHA & SHIVA',title:'Born of compassion.\nWorn with intention.',image:'/assets/rudralife/shiva-banner.webp',image_alt:'Lord Shiva and Rudraksha, from Rudralife’s Mahashivratri article',caption:'A SACRED STORY, PASSED THROUGH GENERATIONS',paragraphs:['In the tradition retold by Rudralife, Shiva meditates for the well-being of humanity. His tears of compassion fall to the earth and become the first Rudraksha trees—a sacred story that gives these beads their enduring association with devotion.', 'The name brings together Rudra, a name of Shiva, and Aksha, associated with his eyes or tears. For a wearer, the mala can be a quiet reminder of compassion, reflection and a regular spiritual practice.', 'Siddha Mala gathers different Rudraksha forms into one personal companion. The story is a matter of religious tradition, not a scientific account or a promise of particular results.'],source:'https://rudralife.com/blog/rudraksha-and-shiva-a-divine-connection-celebrated-on-mahashivratri/',source_label:'The tradition, from Rudralife'};
DEFAULT_PAGE.order = ['intro','beadJourney','signature','spiritual','story','gallery','beads','education','benefits','patrons','trust','experts','community','faq','consultation'];

// Fifth edition: owner-requested structure.
delete DEFAULT_PAGE.gallery.cta_label;
DEFAULT_PAGE.gallery.text = 'The complete mala, its natural texture and its individual details. Tap any photograph to see it up close.';
Object.assign(DEFAULT_PAGE.story, { eyebrow:'25 YEARS OF RUDRALIFE', title:'Rooted in tradition.\nMade with intention.', caption:'SINCE 2001 · A RUDRALIFE SIGNATURE CREATION', anniversary_number:'25', anniversary_label:'Years of Rudralife', anniversary_since:'Since 2001',
  paragraphs:['Rudralife was founded in 2001 by Dr. Tanay Seetha with a single purpose: to make authentic Rudraksha, and honest guidance about it, available to every seeker.', 'Twenty-five years on, the Siddha Mala remains one of its signature creations—a registered Rudralife combination that brings 1 to 14 Mukhi, Gauri Shankar and Ganesh Rudraksha together in one mala.', 'Every recommendation still begins the same way it did in 2001: by listening to the person who will wear the mala.'],
  signoff:'25 years. One commitment: authenticity.', link_label:'Discover the Rudralife story', source:'https://rudralife.com/about-founder' });
Object.assign(DEFAULT_PAGE.beads, { orbit_seconds:70, interval_seconds:5, autoplay:true, orbit_hint:'Tap any bead around the mala to explore it' });
Object.assign(DEFAULT_PAGE.patrons, { eyebrow:'THEY CHOSE THE SIDDHA MALA', title:'Personal journeys.\nOne sacred mala.', text:'From the Rudralife family', interval_seconds:5, autoplay:true,
  items:[
    { id:'milind', name:'Milind Soman', role:'Model, actor & fitness icon', image:'/assets/rudralife/milind-visit.webp', image_alt:'Milind Soman during his visit to Rudralife', text:'Milind Soman visited Rudralife and chose the Siddha Mala as his personal companion. Known for a life built on discipline, endurance and mindful living, he spent time with the Rudralife team understanding the different Rudraksha forms in the combination. His visit is documented in Rudralife’s published Siddha Mala story. For him, the mala is a quiet, personal part of a very active life—chosen with understanding rather than impulse.' },
    { id:'dimple', name:'Dimple Kapadia', role:'Actress', image:'/assets/rudralife/dimple-visit.webp', image_alt:'Dimple Kapadia with the Rudralife team', text:'Dimple Kapadia met the Rudralife team and selected the Siddha Mala after a personal consultation. Her visit is part of Rudralife’s published Siddha Mala story, and her words appear among its client voices: “Rudraksha from Mr. Tanay is very fascinating.” Her connection with Rudraksha is her own—a reminder that a meaningful mala is chosen with intention, care and a clear understanding of every bead.' },
    { id:'archana', name:'Archana Wani', role:'Rudralife client', image:'', image_alt:'Archana Wani, Rudralife client', text:'Archana Wani chose the Rudralife Siddha Mala after a personal conversation with the expert panel. She wanted to understand every bead before deciding—its form, its traditional association and its place in the complete combination. The team walked her through the grades, the fittings and the care her mala would need. Today her Siddha Mala is part of her daily spiritual routine, worn with faith and a personal intention.' },
    { id:'sunil', name:'Sunil Kumar', role:'Rudralife client', image:'', image_alt:'Sunil Kumar, Rudralife client', text:'Sunil Kumar came to Rudralife looking for an authentic, complete combination rather than a single bead. After his consultation he selected the Siddha Mala, with 1 to 14 Mukhi, Gauri Shankar and Ganesh Rudraksha brought together in one piece. He valued the clarity of the guidance—what each form represents in tradition and how to wear and look after it. His mala is now a constant, personal reminder of that journey.' },
  ] });
DEFAULT_PAGE.founder = { visible:true, eyebrow:'THE FOUNDER OF RUDRALIFE', name:'Dr. Tanay Seetha', role:'Founder & Rudraksha expert', title:'A life dedicated\nto Rudraksha.',
  paragraphs:['Dr. Tanay Seetha founded Rudralife in 2001 and has spent more than 25 years in Rudraksha research and spiritual guidance. His work began with a simple conviction: every seeker deserves authentic Rudraksha and honest advice about it.', 'Under his guidance, Rudralife created the Siddha Mala as a complete combination of 1 to 14 Mukhi, Gauri Shankar and Ganesh Rudraksha. He has shared his knowledge on national platforms including Republic Bharat, and continues to lead the Rudralife expert panel.'],
  stats:[{ id:'founded', value:'2001', label:'Founded Rudralife' }, { id:'years', value:'25+', label:'Years in Rudraksha research' }],
  interval_seconds:2, cta_label:'Consult the Rudralife experts',
  images:[{ id:'portrait', image:'/assets/rudralife/tanay-1.png', alt:'Dr. Tanay Seetha, founder of Rudralife' }, { id:'bharat', image:'/assets/rudralife/tanay-2.jpg', alt:'Dr. Tanay Seetha on Republic Bharat Samwad' }, { id:'podcast', image:'/assets/rudralife/tanay-4.jpg', alt:'Dr. Tanay Seetha in conversation on Rudraksha' }] };
DEFAULT_PAGE.featured = { visible:true, label:'As Featured In', speed_seconds:40,
  items:['The Times of India','Lokmat','Deccan Chronicle','Hindustan Times','Garavi Gujarat','The Economic Times','Sunrise Radio','Navbharat Times','The Hindu'].map((alt,i)=>({ id:String(i+1), image:`/assets/rudralife/media-${i+1}.jpg`, alt })) };
DEFAULT_PAGE.faq.cta_label = 'Request a free consultation';
Object.assign(DEFAULT_PAGE.form, { title:'Free consultation', description:'Share a few details and a Rudralife expert will personally get in touch with you.', submit_label:'Submit your form', sending_label:'Submitting', country_label:'Country code', country_placeholder:'Code',
  fields:[{ key:'name', label:'Full name', placeholder:'Your full name', required:true }, { key:'email', label:'Email ID', placeholder:'you@example.com', required:true }, { key:'phone', label:'Phone number', placeholder:'Your phone number', required:true }, { key:'company', label:'Company', placeholder:'Company name', required:false }, { key:'profession', label:'Profession', placeholder:'Your profession', required:false }, { key:'message', label:'Your message', placeholder:'Tell us what you are looking for', required:false }] });
Object.assign(DEFAULT_PAGE.thankyou, { eyebrow:'YOUR FORM HAS BEEN SUBMITTED', title:'Thank you', text:'Your consultation request has reached the Rudralife team. An expert will personally get in touch with you shortly.', home_label:'Back to the Siddha Mala', image:MALA_PNG, steps_title:'What happens next',
  steps:[{ id:'review', title:'We review your details', text:'Our team reads your message and understands what you are looking for.' }, { id:'call', title:'An expert calls you', text:'A Rudralife expert reaches out on the phone number you shared.' }, { id:'guide', title:'Personal guidance', text:'Understand the Siddha Mala, its beads and options—without obligation.' }] });
DEFAULT_PAGE.brand.nav = [{ id:'about', label:'The Mala', href:'#about' }, { id:'beads', label:'Sacred Beads', href:'#composition' }, { id:'patrons', label:'Our Clients', href:'#patrons' }, { id:'experts', label:'Founder', href:'#experts' }, { id:'faq', label:'FAQ', href:'#faq' }];
DEFAULT_PAGE.order = ['signature','spiritual','gallery','story','beads','patrons','benefits','trust','founder','faq','featured'];

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