const ASSET = '/assets/rudralife';

export const IMAGES = {
  logo: `${ASSET}/logo.png`,
  malaHero: `${ASSET}/siddha-mala-gold.png`,
  malaSatin: `${ASSET}/mala-gallery-0.webp`,
  malaClose: `${ASSET}/mala-gallery-1.webp`,
  malaEdit: `${ASSET}/mala-gallery-2.webp`,
  milind: `${ASSET}/milind.webp`,
  dimple: `${ASSET}/dimple.webp`,
};

const details = [
  ['1 Mukhi', 'Lord Shiva', 'Spiritual awareness', 'The half-moon Rudraksha is traditionally associated with Lord Shiva, inner awareness and a deeper spiritual connection.'],
  ['2 Mukhi', 'Ardhanareeshwar', 'Harmony & unity', 'Representing the union of Shiva and Shakti, the two-faced bead is traditionally worn for harmony and togetherness.'],
  ['3 Mukhi', 'Agni Dev', 'A fresh beginning', 'Associated with Agni, the three-faced Rudraksha symbolises transformation, confidence and freedom from the past.'],
  ['4 Mukhi', 'Lord Brahma', 'Knowledge & expression', 'The four-faced Rudraksha is associated with Brahma and traditionally chosen for learning, creativity and expression.'],
  ['5 Mukhi', 'Kalagni Rudra', 'Peace & balance', 'Associated with Kalagni Rudra, this bead has a special place in meditation and everyday spiritual practice.'],
  ['6 Mukhi', 'Lord Kartikeya', 'Focus & determination', 'The six-faced Rudraksha represents Kartikeya and is traditionally associated with focus, willpower and discipline.'],
  ['7 Mukhi', 'Mahalakshmi', 'Prosperity & abundance', 'Representing Mahalakshmi, the seven-faced bead is traditionally worn with aspirations for prosperity and abundance.'],
  ['8 Mukhi', 'Lord Ganesha', 'New possibilities', 'Associated with Ganesha, this Rudraksha symbolises wisdom and overcoming obstacles on your chosen path.'],
  ['9 Mukhi', 'Goddess Durga', 'Courage & strength', 'The nine-faced Rudraksha represents Durga and is traditionally associated with courage, strength and protection.'],
  ['10 Mukhi', 'Lord Vishnu', 'Protection & positivity', 'Associated with Vishnu, the ten-faced bead is traditionally worn for protection and a sense of inner steadiness.'],
  ['11 Mukhi', 'Lord Hanuman', 'Devotion & confidence', 'The eleven-faced Rudraksha represents Hanuman and symbolises strength, devotion and fearlessness.'],
  ['12 Mukhi', 'Lord Surya', 'Leadership & vitality', 'Representing the Sun, the twelve-faced Rudraksha is traditionally associated with radiance, leadership and confidence.'],
  ['13 Mukhi', 'Indra & Kamadeva', 'Charisma & fulfilment', 'The thirteen-faced Rudraksha is associated with Indra and Kamadeva, and traditionally chosen for fulfilment and attraction.'],
  ['14 Mukhi', 'Lord Hanuman', 'Intuition & clarity', 'Known as Deva Mani, the fourteen-faced Rudraksha is traditionally associated with intuition, clear judgement and protection.'],
  ['Gauri Shankar', 'Shiva & Parvati', 'Connection & harmony', 'Two naturally joined Rudraksha beads symbolise the union of Shiva and Parvati, and harmony in family and relationships.'],
  ['Ganesh', 'Lord Ganesha', 'Wisdom & beginnings', 'Distinguished by a natural trunk-like projection, Ganesh Rudraksha symbolises wisdom and the blessing of new beginnings.'],
];
const slugs = ['one-mukhi-without-capping','two-mukhi-super-collector-rudraksha','three-mukhi-rudraksha','four-mukhi-rudraksha','five-mukhi-rudraksha','six-mukhi-rudraksha','seven-mukhi-rudraksha','eight-mukhi-large-rudraksha','nine-mukhi-small-rudraksha','ten-mukhi-small-rudraksha','eleven-mukhi-small-rudraksha','twelve-mukhi-small-rudraksha','thirteen-mukhi-small-rudraksha','fourteen-mukhi-large-rudraksha','gaurishankar-rudraksha','ganesh-rudraksha'];
export const BEADS = details.map(([name, deity, theme, desc], i) => ({
  id: i + 1, name, deity, theme, desc,
  img: `${ASSET}/bead-${i + 1}.png`,
  qty: i >= 1 && i <= 6 ? '3 beads' : '1 bead',
  source: `https://www.rudralife.com/product/${slugs[i]}`,
}));

export const EXPERTS = [
  { name: 'Dr. Tanay Seetha', role: 'Founder of Rudralife', desc: 'A life dedicated to studying Rudraksha. Dr. Tanay Seetha brings deep knowledge, commitment and spiritual understanding to Rudralife.' },
  { name: 'Hemlata Sojitra', role: 'Director — Operations & Head Panel Expert', desc: 'At Rudralife since 2007, Hemlata brings her knowledge of astronumerology and a compassionate approach to personalised guidance.' },
  { name: 'Saumil Seetha', role: 'Director & Head Panel Expert', desc: 'Known for his calm approach, Saumil listens without judgement and supports people with thoughtful Rudraksha recommendations.' },
  { name: 'Dhruv Prakash Sinha', role: 'Senior Panel Expert', desc: 'A postgraduate in physics and a spiritual seeker, Dhruv has shared his expertise in Rudraksha and meditation at Rudralife since 2009.' },
  { name: 'Shruti Sharma', role: 'Senior Panel Expert', desc: 'Shruti brings her knowledge of Vedic practices, astrology and numerology to thoughtful, personal consultations.' },
  { name: 'Madhulika Namboodiri', role: 'Senior Panel Expert', desc: 'An Arts graduate from Jesus and Mary College, Madhulika leads Delhi operations and brings years of compassionate counselling experience.' },
  { name: 'Shilpa Aggarwal', role: 'Panel Expert', desc: 'Shilpa puts customer happiness first, offering dedicated guidance and a people-centred approach to Rudraksha.' },
].map((expert, i) => ({ ...expert, img: `${ASSET}/expert-${i + 1}.webp` }));

export const BENEFITS = [
  { title: 'Spiritual practice', desc: 'A companion for meditation, mantra chanting and a deeper connection with yourself.' },
  { title: 'Peace & balance', desc: 'Traditionally worn with the intention of bringing peace, positivity and balance to life.' },
  { title: 'Purpose & growth', desc: 'Chosen for blessings in career, business and personal growth.' },
  { title: 'Harmony & connection', desc: 'A sacred reminder of togetherness, family harmony and meaningful relationships.' },
];

export const FAQS = [
  { q: 'What is the Siddha Mala?', a: 'Siddha Mala is a registered and trademarked creation of Rudralife. It combines 1 to 14 Mukhi Rudraksha with Gauri Shankar and Ganesh Rudraksha into one complete spiritual companion.' },
  { q: 'Which Rudraksha beads are included?', a: 'The combination includes one Half Moon 1 Mukhi, three each of 2 to 7 Mukhi, one each of 8 to 14 Mukhi, one Gauri Shankar and one Ganesh Rudraksha. Our experts can guide you through the available grades and finishes.' },
  { q: 'Who can wear a Siddha Mala?', a: 'Rudralife recommends Rudraksha for people from all walks of life. The expert panel can help you choose a combination according to your personal needs and spiritual aspirations.' },
  { q: 'How is its authenticity verified?', a: 'Rudralife offers lab-certified Rudraksha. Speak with the team about the certificate and verification details supplied with your selected mala.' },
  { q: 'How should I care for my mala?', a: 'Keep your Rudraksha clean and handle it with care. Rudralife provides guidance on cleaning, wearing and ongoing maintenance. Your consultant can advise on the right care for your mala and its finish.' },
  { q: 'Is the consultation free?', a: 'Yes. Rudralife provides personalised Rudraksha recommendations and mala-making guidance at no consultation charge. Send an enquiry to speak with the expert panel.' },
];

export const DEFAULT_CONTENT = {
  hero_title: 'One mala. A complete spiritual companion.',
  hero_subtitle: 'Handcrafted with authentic Rudraksha. A sacred combination of 1 to 14 Mukhi, Gauri Shankar and Ganesh.',
  phone: '+91 72088 19922', email: 'info@rudralife.com', whatsapp: '919619990717',
  address: '901, Sri Krishna, New Link Road, Andheri (West), Mumbai — 400 053',
  hours: 'Mon – Sat · 10:00 AM to 7:00 PM (IST)', website: 'www.rudralife.com',
  stat_certified: '100%', stat_years: '25+', stat_souls: '16',
};