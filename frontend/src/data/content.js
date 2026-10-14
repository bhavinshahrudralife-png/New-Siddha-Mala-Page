const RL = "https://www.rudralife.com/_next/image?url=";
const W = "&w=1080&q=80";

export const IMAGES = {
  malaHero: "https://customer-assets.emergentagent.com/job_siddha-mala-sacred/artifacts/dxvn2os4_siddamala.jpg",
  malaSatin: "https://customer-assets.emergentagent.com/job_siddha-mala-sacred/artifacts/d1y8wixc_DSC04793.jpg",
  malaClose: "https://customer-assets.emergentagent.com/job_siddha-mala-sacred/artifacts/rk4d7b25_IMG_8335.JPG",
  malaEdit: "https://customer-assets.emergentagent.com/job_siddha-mala-sacred/artifacts/ulfhur9a_Siddha%20Mala%20RL-16%20edit.JPG",
  milind: "https://www.rudralife.com/siddha-mala/assets/milind-soman.png",
  dimple: "https://rudralife.com/rudraksha-recommendation/images/clients/17.jpg",
  beadGeneric: `${RL}%2Fassets%2FallProductsSection%2Fimage1.jpg${W}`,
  beadGold: `${RL}%2Fassets%2FallProductsSection%2Fimage2.jpg${W}`,
  beadMeditation: `${RL}%2Fassets%2FallProductsSection%2Fimage3.jpg${W}`,
  beadHealth: `${RL}%2Fassets%2FallProductsSection%2Fimage4.jpg${W}`,
};

const bead = (key) => `${RL}%2Fapi%2FgetImageByName%3Fkey%3D${key}${W}`;

// Real Rudralife product-gallery beads (no promo text overlays)
const G = {
  generic: bead("1731655468647-4mm_5_mukhi_rudraksha_mala_108%252B1.jpg"),
  m15: bead("products%252Fgallery%252F1_22092022104053_83956_2_.jpg"),
  m16: bead("products%252Fgallery%252F1_09092022115412_388_2_.jpg"),
  m17: bead("products%252Fgallery%252F1_09092022121159_16298_2_.jpg"),
};

export const BEADS = [
  { id: 1, name: "1 Mukhi Halfmoon", deity: "Lord Shiva", mantra: "ॐ नमः शिवाय", qty: "×1", img: bead("products%252Fgallery%252F1_01122022013439_1479_2_.jpg"), desc: "The rarest bead — pure consciousness, enlightenment and connection to the supreme Shiva energy." },
  { id: 2, name: "2 Mukhi", deity: "Ardhanareeshwar", mantra: "ॐ नमः", qty: "×3", img: bead("products%252Fgallery%252F1_01092022125543_7543_2_.jpg"), desc: "Unity of Shiva and Shakti — harmonizes relationships and balances the mind's dualities." },
  { id: 3, name: "3 Mukhi", deity: "Agni Dev", mantra: "ॐ क्लीं नमः", qty: "×3", img: G.generic, desc: "Fire of transformation — burns past karma, guilt and fear, awakening self-confidence." },
  { id: 4, name: "4 Mukhi", deity: "Lord Brahma", mantra: "ॐ ह्रीं नमः", qty: "×3", img: bead("products%252Fgallery%252F1_04012023035241_45798_2_.jpg"), desc: "The creator's bead — sharpens intellect, memory and communication." },
  { id: 5, name: "5 Mukhi", deity: "Kalagni Rudra", mantra: "ॐ ह्रीं नमः", qty: "×3", img: bead("1731494894702-Untitled-4.jpg"), desc: "The bead of wellbeing — calms the heart, balances blood pressure and nurtures peace." },
  { id: 6, name: "6 Mukhi", deity: "Lord Kartikeya", mantra: "ॐ ह्रीं हूं नमः", qty: "×3", img: G.m15, desc: "Warrior energy — willpower, focus and victory over obstacles." },
  { id: 7, name: "7 Mukhi", deity: "Maa Mahalakshmi", mantra: "ॐ हूं नमः", qty: "×3", img: bead("products%252Fgallery%252F1_05092022061005_83029_2_.jpg"), desc: "Goddess of wealth — attracts prosperity and removes financial blockages." },
  { id: 8, name: "8 Mukhi", deity: "Lord Ganesha", mantra: "ॐ हूं नमः", qty: "×1", img: bead("products%252Fgallery%252F1_02082021123326_81954_2.jpg"), desc: "Remover of obstacles — clears the path for success and new beginnings." },
  { id: 9, name: "9 Mukhi", deity: "Maa Durga", mantra: "ॐ ह्रीं हूं नमः", qty: "×1", img: bead("products%252Fgallery%252F1_05092022064634_61974_2_.jpg"), desc: "Divine mother energy — courage, protection and dynamic power." },
  { id: 10, name: "10 Mukhi", deity: "Lord Vishnu", mantra: "ॐ ह्रीं नमः", qty: "×1", img: bead("products%252Fgallery%252F1_10072023062818_12248_2_.jpg"), desc: "The preserver — shields from negativity and legal troubles." },
  { id: 11, name: "11 Mukhi", deity: "Lord Hanuman", mantra: "ॐ ह्रीं हूं नमः", qty: "×1", img: bead("products%252Fgallery%252F1_08092022112651_55576_2_.jpg"), desc: "Boundless strength — fearlessness, vitality and unwavering devotion." },
  { id: 12, name: "12 Mukhi", deity: "Lord Surya", mantra: "ॐ क्रौं क्षौं रौं नमः", qty: "×1", img: bead("products%252Fgallery%252F1_08092022113921_97144_2_.jpg"), desc: "Solar radiance — leadership, vitality and administrative brilliance." },
  { id: 13, name: "13 Mukhi", deity: "Lord Indra · Kamdev", mantra: "ॐ ह्रीं नमः", qty: "×1", img: bead("products%252Fgallery%252F1_09092022112226_30965_2_.jpg"), desc: "Magnetism and fulfilment — charisma, attraction and worldly desires." },
  { id: 14, name: "14 Mukhi", deity: "Lord Hanuman · Bhairava", mantra: "ॐ नमः शिवाय", qty: "×1", img: G.m16, desc: "The Deva Mani — third-eye awakening, intuition and supreme protection." },
  { id: 15, name: "Gaurishankar", deity: "Shiva-Parvati Union", mantra: "ॐ गौरीशंकराय नमः", qty: "×1", img: G.m17, desc: "Two beads naturally joined — the divine union blessing harmony and love." },
  { id: 16, name: "Ganesh Rudraksha", deity: "Lord Ganesha", mantra: "ॐ गं गणपतये नमः", qty: "×1", img: G.generic, desc: "Trunk-shaped sacred bead — wisdom, success and obstacle removal." },
];

const expertImg = (n, ext = "png") =>
  `${RL}%2F_next%2Fstatic%2Fmedia%2FExpert_${n}.${""}${W}`;

export const EXPERTS = [
  { name: "Dr. Tanay Seetha", role: "Founder of Rudralife", years: "25+ Years", title: "Founder & Visionary", desc: "Founder and visionary with 25+ years of Rudraksha research and spiritual guidance.", img: "https://www.rudralife.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FExpert_1.c35d2a3f.png&w=640&q=80" },
  { name: "Hemlata Sojitra", role: "Director – Operations", years: "12+ Years", title: "Operations Head", desc: "Expert in operations and quality assurance ensuring authenticity in every piece.", img: "https://www.rudralife.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FExpert_2.e651f08c.png&w=640&q=80" },
  { name: "Saumil Seetha", role: "Director & Head Panel Expert", years: "15+ Years", title: "Head Panel Expert", desc: "Leading expert in Vedic astrology and Rudraksha consultation with deep scriptural knowledge.", img: "https://www.rudralife.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FExpert_3.eb6727a1.png&w=640&q=80" },
  { name: "Dhruv Prakash Sinha", role: "Panel Expert & Spiritual Advisor", years: "7+ Years", title: "Numerology Expert", desc: "Specialist in numerology and energy alignment for holistic spiritual well-being.", img: "https://www.rudralife.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FExpert_4.71881110.png&w=640&q=80" },
  { name: "Shruti Sharma", role: "Senior Panel Expert", years: "10+ Years", title: "Senior Consultant", desc: "Senior consultant specializing in personalized Rudraksha recommendations for individual needs.", img: "https://www.rudralife.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FExpert_5.ffd195c5.png&w=640&q=80" },
  { name: "Madhulika Namboodiri", role: "Senior Vedic Consultant", years: "10+ Years", title: "Vedic Scholar", desc: "Expert in Vedic sciences and ancient Indian scriptures with deep scholarly knowledge.", img: "https://www.rudralife.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FExpert_6.6954b2a8.jpg&w=640&q=80" },
  { name: "Shilpa Agarwal", role: "Panel Expert", years: "8+ Years", title: "Spiritual Counselor", desc: "Expert in spiritual counseling and Rudraksha therapy for holistic well-being.", img: "https://www.rudralife.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FExpert_7.12160fc3.png&w=640&q=80" },
];

export const CELEBS_ROW1 = [
  { name: "Milind Soman", role: "Model" }, { name: "Manoj Bajpayee", role: "Actor" },
  { name: "Dimple Kapadia", role: "Actress" }, { name: "Shilpa Shetty", role: "Actress" },
  { name: "Shamita Shetty", role: "Actress" }, { name: "Simone Singh", role: "Actress" },
  { name: "Mr. Shiva", role: "Film Actor" }, { name: "Isha Judd", role: "Spiritual Teacher" },
  { name: "Sunanda Shetty", role: "Business Woman" },
];

export const CELEBS_ROW2 = [
  { name: "Ashok Wadhwa", role: "Group CEO Ambit" }, { name: "Karan Paul", role: "Chairman Apeejay" },
  { name: "T.S. Krishnamurthy", role: "Ex. Chief Election Commissioner" }, { name: "Rahul Agrawal", role: "Owner Comesum Group" },
  { name: "Sanjay Tanna", role: "MP Uganda" }, { name: "Sanjeev Agrawal", role: "Chairman Moon Beverages" },
  { name: "Prakash C Bisht", role: "CFO Jubilant Foods" }, { name: "Arun Samarth", role: "Builder" },
];

export const BENEFITS = [
  { icon: "ॐ", title: "Spiritual Awakening", desc: "Activates inner consciousness, deepens meditation, and connects you to higher self." },
  { icon: "श्री", title: "Wealth & Prosperity", desc: "Removes financial blockages and invites Lakshmi's blessings for abundance." },
  { icon: "✦", title: "Career Growth", desc: "Sharpens decision-making, leadership, and brings unexpected opportunities." },
  { icon: "♡", title: "Harmonious Relationships", desc: "Strengthens bonds, dissolves conflicts, and brings emotional warmth at home." },
  { icon: "✚", title: "Holistic Health", desc: "Balances energy centers, calms anxiety, and supports overall well-being." },
  { icon: "⚝", title: "Protection from Negativity", desc: "Forms a divine shield against evil eye, bad energy, and inner fear." },
  { icon: "☉", title: "Planetary Balance", desc: "Harmonizes all nine planets in your kundli for cosmic alignment." },
  { icon: "∞", title: "Lifelong Companion", desc: "One sacred treasure — for every challenge, every milestone, every prayer." },
];

export const FAQS = [
  { q: "What is Siddha Mala?", a: "The Siddha Mala is a master Rudraksha mala of approximately 28 lab-certified beads — 1 Mukhi to 14 Mukhi, plus the rare Gaurishankar and Ganesh Rudraksha — arranged in the sacred Nakshatra pattern of 27+1 beads. It is Rudralife's trademark-registered creation." },
  { q: "Who can wear Siddha Mala?", a: "Anyone seeking balance, growth and spiritual evolution — men, women, professionals, homemakers, students and seekers of all ages and beliefs can wear the Siddha Mala." },
  { q: "What are the main benefits of Siddha Mala?", a: "It is believed to balance all seven chakras and nine planets, bringing spiritual awakening, wealth, career growth, harmonious relationships, health, protection and mental clarity." },
  { q: "Which beads are included in Siddha Mala?", a: "1 Mukhi Halfmoon, 2 to 7 Mukhi (three each), 8 to 14 Mukhi (one each), plus Gaurishankar and Ganesh Rudraksha — 28 divine energies woven into one sacred whole." },
  { q: "Which gods are connected to Siddha Mala?", a: "Each bead carries the energy of a deity — Lord Shiva, Ardhanareeshwar, Agni Dev, Brahma, Kalagni Rudra, Kartikeya, Mahalakshmi, Ganesha, Durga, Vishnu, Hanuman, Surya, Indra and Bhairava." },
  { q: "Can I wear Siddha Mala every day?", a: "Yes. The Siddha Mala is lightweight, adjustable and designed for daily wear — it is your lifelong sacred companion." },
  { q: "Are there any rules for wearing Siddha Mala?", a: "Wear it with faith and respect. Our experts guide you personally on wearing, care and energization practices after your consultation." },
  { q: "How do I energize Siddha Mala?", a: "Every Rudralife Siddha Mala is aura-charged with Vedic energization through sacred Beej mantras before it reaches you — vacuum-sealed and non-human-touched for absolute purity." },
  { q: "Can women wear Siddha Mala?", a: "Absolutely. The Siddha Mala is equally powerful for women — many of our most devoted wearers, from actresses to business leaders, are women." },
  { q: "How long does it take to see results?", a: "Experiences vary by individual faith and journey. Many wearers report a sense of calm and clarity within weeks, with deeper transformations unfolding over months of devoted wear." },
];
