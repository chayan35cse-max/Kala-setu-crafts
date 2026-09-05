export const initialCrafts = [
  // ==========================================
  // 🟢 GI-TAGGED CERTIFIED CRAFTS (GREEN MARKERS)
  // ==========================================
  {
    id: "jaipur-blue-pottery",
    name: "Jaipur Blue Pottery",
    nativeName: "जयपुर ब्लू पॉटरी",
    state: "Rajasthan",
    region: "West",
    coordinates: { lat: 26.9124, lng: 75.7873 },
    category: "Pottery & Ceramics",
    materials: ["Quartz Powder", "Fuller's Earth (Multani Mitti)", "Gum", "Cobalt Oxide Glaze", "Copper Oxide"],
    technique: "Non-clay Egyptian Faience Dough Moulding & Low-fire Kiln Glazing",
    GI_tagged: true,
    giTagged: true,
    giYear: 2008,
    status: "active",
    preservationStatus: "active",
    verification_source: "Geographical Indications Registry of India (GI Application #2)",
    verification_status: "verified",
    era: "14th Century Turko-Persian, Revived by Sawai Ram Singh II (1835–1880)",
    tagline: "Turquoise quartz craft fired without clay, carrying Persian royal heritage",
    description: "Jaipur Blue Pottery is an exquisite semi-translucent ceramic heritage distinct for being made without clay. Artisans grind ground quartz, glass frit, plant gum, and natural minerals into a malleable dough that is hand-moulded, decorated with intricate cobalt oxide arabesques, and glazed at low temperatures.",
    history: "Originating in ancient Persia and Samarkand, the technique journeyed to Delhi under the Mughals. In the mid-19th century, Maharaja Sawai Ram Singh II of Jaipur observed kite flyers using glass-coated threads and sponsored local artisans to master the glaze at the School of Arts.",
    culturalSignificance: "Blue Pottery embodies the synthesis of Persian decorative geometries and Rajasthani flora and fauna (parrots, peacocks, lotus buds). Regarded as auspicious for homes and royal durbars.",
    makingProcess: [
      { step: 1, title: "Dough Compounding", description: "Mixing finely ground quartz crystal powder, glass cullet, sajjikshar, Multani mitti, and Katira gum with pure water." },
      { step: 2, title: "Open Moulding", description: "Pressing the clayless dough into open terracotta moulds lined with sieved ash, followed by gentle hand-trimming." },
      { step: 3, title: "Cobalt Painting", description: "Master artisans sketch intricate motifs using brushes made of squirrel hair with cobalt and copper oxide mineral pigments." },
      { step: 4, title: "Glaze & Single Firing", description: "Coated with a lead-free silicate glaze and fired once in wood-fueled circular kilns at 800°C–850°C for 3 days." }
    ],
    model3DType: "pottery",
    priceEstimate: 2450,
    sellerContact: "+91 98290 12345 (Amer Crafts Guild)",
    onlineStoreLink: "https://jaipurcrafts.example.com/blue-pottery",
    thumbnailUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    audioStory: "Centuries ago in the pink city of Jaipur, master artisans discovered that crushed quartz crystals, bathed in desert sunlight, could hold the eternal turquoise skies of Persia without a single handful of ordinary mud.",
    artisanGroup: "Kripal Kumbh & Amer Potters Collective",
    rating: 4.9,
    reviewCount: 38,
    reviews: [
      { id: "r1", buyerName: "Ananya Sharma", rating: 5, comment: "The cobalt glaze is mesmerizing in sunlight! Truly authentic handcrafted quality.", verifiedPurchase: true, createdAt: new Date("2026-08-10") },
      { id: "r2", buyerName: "David Miller", rating: 5, comment: "Arrived safely in sturdy packaging via India Post Speed Post. Masterpiece!", verifiedPurchase: true, createdAt: new Date("2026-08-14") }
    ],
    sellers: [
      {
        id: "s-1",
        name: "Amer Heritage Blue Pottery Studio",
        artisanName: "Rameshwar Lal Prajapati",
        phone: "+91 98290 12345",
        email: "amer.pottery@gmail.com",
        address: "Plot 14, Potters Colony, Amer Road",
        location: "Jaipur, Rajasthan",
        coordinates: { lat: 26.9855, lng: 75.8513 },
        verified: true,
        badge: "GI Certified Master Artisan",
        rating: 4.9,
        reviewCount: 42,
        onlineStoreUrl: "https://amerpottery.example.com",
        workshopVisits: "Open daily 10 AM - 6 PM for pottery demonstrations."
      }
    ],
    tags: ["Pottery", "GI Tagged", "Rajasthan", "Ceramics", "Cobalt", "Royal", "Clayless"]
  },
  {
    id: "pashmina-kashmir",
    name: "Kashmiri Pashmina Shawls",
    nativeName: "کٲشُر پشمینہ",
    state: "Jammu and Kashmir",
    region: "North",
    coordinates: { lat: 34.0837, lng: 74.7973 },
    category: "Textiles & Weaving",
    materials: ["Capra Hircus Underfleece (Changthangi)", "Natural Walnut Bark Dye", "Saffron Stigma Tint"],
    technique: "Charkha Hand-Spinning & Traditional Kashmiri Handloom Weaving",
    GI_tagged: true,
    giTagged: true,
    giYear: 2008,
    status: "active",
    preservationStatus: "active",
    verification_source: "Geographical Indications Registry of India (GI Application #46)",
    verification_status: "verified",
    era: "15th Century (Sultan Zain-ul-Abidin & Mir Sayyid Ali Hamadani)",
    tagline: "The golden fleece of Ladakh, handwoven into cloud-like warmth in Srinagar",
    description: "Kashmiri Pashmina is woven from the rare, fine underbelly fleece (12-15 microns) shed naturally by the Changthangi goat at altitudes above 14,000 feet in Ladakh. Hand-spun on traditional wooden charkhas (Yender) and handwoven into exquisite gossamer wraps.",
    history: "Introduced by Persian Sufi saint Mir Sayyid Ali Hamadani in the 14th century, Pashmina flourished under Sultan Zain-ul-Abidin and became an emblem of Mughal and European imperial aristocracy.",
    culturalSignificance: "Known across global history as 'Cashmere', a true hand-spun Kashmiri Pashmina can pass effortlessly through a finger ring, representing peak artisanal dedication.",
    makingProcess: [
      { step: 1, title: "Combing Fleece", description: "Harvesting the spring moulting underfleece from nomadic Changpa herders of Ladakh." },
      { step: 2, title: "Yender Hand-Spinning", description: "Women artisans spin delicate yarn onto wooden wheels with precise rhythmic tension." },
      { step: 3, title: "Handloom Weaving", description: "Woven on wooden pit-looms using diamond or twill weaves over several weeks." }
    ],
    model3DType: "pottery",
    priceEstimate: 12500,
    sellerContact: "+91 94190 77123 (Srinagar Artisan Guild)",
    onlineStoreLink: "https://kashmirpashmina.example.com",
    thumbnailUrl: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=80",
    images: ["https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80"],
    artisanGroup: "Craft Development Institute & Srinagar Weaver Guilds",
    rating: 5.0,
    reviewCount: 29,
    reviews: [
      { id: "r3", buyerName: "Kavita Singhania", rating: 5, comment: "Incredible softness and warmth. Passes the ring test with ease!", verifiedPurchase: true, createdAt: new Date("2026-08-18") }
    ],
    sellers: [
      {
        id: "s-2",
        name: "Zaffer Pashmina Heritage Guild",
        artisanName: "Ghulam Hassan Mir",
        phone: "+91 94190 77123",
        email: "zaffer.pashmina@kashmir.in",
        address: "Zadibal Old City Craft Cluster",
        location: "Srinagar, Jammu & Kashmir",
        coordinates: { lat: 34.112, lng: 74.81 },
        verified: true,
        badge: "GI Certified Master Artisan",
        rating: 5.0,
        reviewCount: 31
      }
    ],
    tags: ["Pashmina", "GI Tagged", "Jammu and Kashmir", "Textiles", "Cashmere", "Handwoven"]
  },
  {
    id: "madhubani-painting",
    name: "Madhubani (Mithila) Painting",
    nativeName: "मिथिला / मधुबनी चित्रकला",
    state: "Bihar",
    region: "East",
    coordinates: { lat: 26.3533, lng: 86.0719 },
    category: "Folk Painting",
    materials: ["Handmade Paper treated with Cow Dung", "Bamboo Twig Nibs", "Indigo", "Turmeric Pigment", "Lamp Soot"],
    technique: "Double-line Outline Sketching with Organic Mineral Inks",
    GI_tagged: true,
    giTagged: true,
    giYear: 2007,
    status: "active",
    preservationStatus: "active",
    verification_source: "Geographical Indications Registry of India (GI Application #105)",
    verification_status: "verified",
    era: "Ancient Vedic Mithila Kingdom (King Janaka Era)",
    tagline: "Sacred folk geometry painted with bamboo twigs and flower juices",
    description: "Madhubani art is an ancient ritual painting tradition originating from the Mithila region of Bihar. Practiced predominantly by women, it features bold double-line outlines, stylized eyes, fish of fertility, peacocks, and sacred flora without leaving any blank space.",
    makingProcess: [
      { step: 1, title: "Paper Prep", description: "Treating handmade paper with natural cow dung wash to create an antique canvas." },
      { step: 2, title: "Kachni Fine Lines", description: "Drawing precise double-line borders with sharpened bamboo twigs and lamp soot ink." },
      { step: 3, title: "Bharni Color Filling", description: "Filling floral motifs using organic juices extracted from turmeric, indigo, and marigold." }
    ],
    model3DType: "pottery",
    priceEstimate: 3200,
    sellerContact: "+91 99341 88234 (Mithila Kalakriti)",
    onlineStoreLink: "https://mithilaart.example.com",
    thumbnailUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
    images: ["https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"],
    artisanGroup: "Mithila Gramin Mahila Vikas Sansthan",
    rating: 4.9,
    reviewCount: 45,
    reviews: [
      { id: "r4", buyerName: "Sunil Verma", rating: 5, comment: "The intricate Kohbar geometry is stunning. Authentic natural colors.", verifiedPurchase: true, createdAt: new Date("2026-08-20") }
    ],
    sellers: [
      {
        id: "s-3",
        name: "Mithilanchal Shilp Gram",
        artisanName: "Smt. Shanti Devi (National Awardee)",
        phone: "+91 99341 88234",
        email: "shanti.mithila@gmail.com",
        address: "Ranti Village, Madhubani",
        location: "Madhubani, Bihar",
        coordinates: { lat: 26.3533, lng: 86.0719 },
        verified: true,
        badge: "GI Certified Master Artisan",
        rating: 4.9,
        reviewCount: 52
      }
    ],
    tags: ["Madhubani", "GI Tagged", "Bihar", "Painting", "Folk Art", "Mithila"]
  },
  {
    id: "channapatna-toys",
    name: "Channapatna Wooden Toys",
    nativeName: "ಚನ್ನಪಟ್ಟಣ ಗೊಂಬೆಗಳು",
    state: "Karnataka",
    region: "South",
    coordinates: { lat: 12.6518, lng: 77.2089 },
    category: "Woodcraft & Toys",
    materials: ["Wrightia Tinctoria (Aale Mara Ivory Wood)", "Vegetable Lac Dyes", "Screw Pine Leaf Polish"],
    technique: "Lathe Woodturning & High-Friction Vegetable Lac Finishing",
    GI_tagged: true,
    giTagged: true,
    giYear: 2006,
    status: "active",
    preservationStatus: "active",
    verification_source: "Geographical Indications Registry of India (GI Application #11)",
    verification_status: "verified",
    era: "18th Century (Patronized by Tipu Sultan)",
    tagline: "Eco-friendly wooden toys polished with natural vegetable lacquer",
    description: "Hailing from Karnataka's 'Toy Town' of Channapatna, these child-safe, glossy wooden toys are lathe-turned from soft ivory wood and coated with food-safe lac mixed with turmeric, indigo, and vermilion dyes.",
    makingProcess: [
      { step: 1, title: "Wood Seasoning", description: "Seasoning Wrightia tinctoria wood for 3 months until moisture drops below 10%." },
      { step: 2, title: "Lathe Turning", description: "Shaping cylindrical wood blocks on high-speed turning lathes with iron chisels." },
      { step: 3, title: "Lac Heat Coating", description: "Applying colored lac sticks against the rotating wood, melting it via friction." },
      { step: 4, title: "Screw Pine Polish", description: "Buffing with natural screw pine leaves to produce a mirror-like organic sheen." }
    ],
    model3DType: "channapatna",
    priceEstimate: 1100,
    sellerContact: "+91 98450 67890 (Channapatna Artisans Guild)",
    onlineStoreLink: "https://channapatnatoys.example.com",
    thumbnailUrl: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80",
    images: ["https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80"],
    artisanGroup: "Channapatna Handicrafts Co-operative Guild",
    rating: 4.8,
    reviewCount: 34,
    reviews: [
      { id: "r5", buyerName: "Deepak Rao", rating: 5, comment: "Completely non-toxic and so smooth! My kids love these stacking rings.", verifiedPurchase: true, createdAt: new Date("2026-08-22") }
    ],
    sellers: [
      {
        id: "s-4",
        name: "Gombegala Mane Toy Guild",
        artisanName: "Syed Basha",
        phone: "+91 98450 67890",
        email: "channapatna.toys@karnataka.in",
        address: "Bangalore-Mysore Highway Toy Market",
        location: "Channapatna, Karnataka",
        coordinates: { lat: 12.6518, lng: 77.2089 },
        verified: true,
        badge: "GI Certified Master Artisan",
        rating: 4.8,
        reviewCount: 46
      }
    ],
    tags: ["Channapatna", "GI Tagged", "Karnataka", "Woodcraft", "Toys", "Eco-friendly"]
  },
  {
    id: "bastar-dhokra-craft",
    name: "Bastar Dhokra Bronze Figurine",
    nativeName: "बस्तर ढोकरा शिल्प",
    state: "Chhattisgarh",
    region: "East",
    coordinates: { lat: 19.074, lng: 82.0298 },
    category: "Metal Casting",
    materials: ["Recycled Bell Metal", "Beeswax", "Dammar Tree Resin", "Anthill Clay Core"],
    technique: "4,000-year-old Cire-Perdue (Lost-Wax) Non-Ferrous Hollow Metal Casting",
    GI_tagged: true,
    giTagged: true,
    giYear: 2008,
    status: "active",
    preservationStatus: "active",
    verification_source: "Geographical Indications Registry of India (GI Application #83)",
    verification_status: "verified",
    era: "Harappan Bronze Age (Mohenjo-daro Dancing Girl Lineage)",
    tagline: "Primordial lost-wax bronze casting preserved by tribal Ghadwa metalsmiths",
    description: "Dhokra is one of humanity's oldest unbroken metallurgical traditions. Practiced by the Ghadwa tribal community of Bastar, artisans hand-roll fine beeswax threads over a clay core before encasing it in refractory soil and pouring molten bell-metal.",
    makingProcess: [
      { step: 1, title: "Clay Core Sculpting", description: "Sculpting the inner shape using river clay mixed with cow dung and fine sand." },
      { step: 2, title: "Wax Thread Filigree", description: "Pressing warmed beeswax through a wooden piston to roll fine decorative threads." },
      { step: 3, title: "Mould Encasement", description: "Applying multiple layers of termite mound clay with vents for pouring." },
      { step: 4, title: "Lost-Wax Smelting", description: "Pouring molten brass at 1100°C into ground kilns, vaporizing the wax to freeze metal in its place." }
    ],
    model3DType: "dhokra",
    priceEstimate: 3800,
    sellerContact: "+91 97550 44321 (Bastar Ghadwa Guild)",
    onlineStoreLink: "https://bastardhokra.example.com",
    thumbnailUrl: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=600&q=80",
    images: ["https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80"],
    artisanGroup: "Bastar Tribal Metallurgical Guild",
    rating: 5.0,
    reviewCount: 22,
    reviews: [
      { id: "r6", buyerName: "Dr. Maya Swaminathan", rating: 5, comment: "The lost-wax brass texture is rustic and timeless. A true piece of history.", verifiedPurchase: true, createdAt: new Date("2026-08-25") }
    ],
    sellers: [
      {
        id: "s-5",
        name: "Kondagaon Ghadwa Shilp Trust",
        artisanName: "Rajendra Baghel",
        phone: "+91 97550 44321",
        email: "dhokra.bastar@tribal.gov.in",
        address: "Bhelvapadar Tribal Craft Colony",
        location: "Kondagaon, Bastar, Chhattisgarh",
        coordinates: { lat: 19.5989, lng: 81.6706 },
        verified: true,
        badge: "GI Certified Master Artisan",
        rating: 5.0,
        reviewCount: 39
      }
    ],
    tags: ["Dhokra", "GI Tagged", "Chhattisgarh", "Metal Casting", "Bronze", "Tribal"]
  },
  {
    id: "tanjore-painting",
    name: "Thanjavur (Tanjore) 22K Gold Painting",
    nativeName: "தஞ்சாவூர் ஓவியம்",
    state: "Tamil Nadu",
    region: "South",
    coordinates: { lat: 10.787, lng: 79.1378 },
    category: "Sacred Classical Painting",
    materials: ["Teakwood Plank", "22-Karat Gold Leaf Sheets", "Jaipur Semi-Precious Gems", "Unboiled Limestone Paste (Sukki Babu)"],
    technique: "Gesso Relief Modelling with 22K Gold Foil Gilding",
    GI_tagged: true,
    giTagged: true,
    giYear: 2007,
    status: "active",
    preservationStatus: "active",
    verification_source: "Geographical Indications Registry of India (GI Application #22)",
    verification_status: "verified",
    era: "16th Century Maratha & Nayaka Dynasty of Thanjavur",
    tagline: "Sacred gold relief paintings embellished with 22K gold leaves and sparkling gems",
    description: "Thanjavur painting is renowned for its rich gesso relief work, glowing 22K gold leaf embellishments, and vivid depictions of deities with rounded celestial faces and radiant eyes.",
    makingProcess: [
      { step: 1, title: "Board Preparation", description: "Stretching cotton cloth over seasoned jackfruit or teakwood with Arabic gum." },
      { step: 2, title: "Gesso Relief Sculpting", description: "Applying limestone powder and tamarind glue paste (Sukki Babu) to create 3D embossing." },
      { step: 3, title: "22K Gold Gilding", description: "Meticulously pressing fine 22-karat gold foil leaves over the embossed relief and embedding uncut gems." }
    ],
    model3DType: "pottery",
    priceEstimate: 16500,
    sellerContact: "+91 94431 22987 (Thanjavur Sacred Arts)",
    onlineStoreLink: "https://tanjoregold.example.com",
    thumbnailUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    images: ["https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"],
    artisanGroup: "South Indian Traditional Painters Guild",
    rating: 5.0,
    reviewCount: 19,
    reviews: [
      { id: "r7", buyerName: "Venkatesh Iyer", rating: 5, comment: "Authentic 22K gold leaf certified by the artisan guild. The gesso relief is divine.", verifiedPurchase: true, createdAt: new Date("2026-08-26") }
    ],
    sellers: [
      {
        id: "s-6",
        name: "Raja Serfoji Memorial Guild",
        artisanName: "S. Murugesan (State Master Craftsman)",
        phone: "+91 94431 22987",
        email: "tanjore.murugesan@gmail.com",
        address: "South Main Street, Palace Complex",
        location: "Thanjavur, Tamil Nadu",
        coordinates: { lat: 10.787, lng: 79.1378 },
        verified: true,
        badge: "GI Certified Master Artisan",
        rating: 5.0,
        reviewCount: 35
      }
    ],
    tags: ["Tanjore", "GI Tagged", "Tamil Nadu", "Gold Painting", "Sacred", "22K Gold"]
  },

  // ==========================================
  // 🔴 NON-GI ENDANGERED CRAFTS (RED MARKERS)
  // ==========================================
  {
    id: "rogan-art-gujarat",
    name: "Rogan Art of Nirona",
    nativeName: "રોગન આર્ટ / रोगन कला",
    state: "Gujarat",
    region: "West",
    coordinates: { lat: 23.3855, lng: 69.5899 },
    category: "Oil Paint Textile Art",
    materials: ["Boiled Castor Seed Oil Paste (Rogan)", "Natural Stone Mineral Pigments", "Brass Stylus (Kalam)"],
    technique: "Freehand Aerial Viscous Oil Thread Trailing with Mirror-Image Fabric Folding",
    GI_tagged: false,
    giTagged: false,
    status: "endangered",
    preservationStatus: "endangered",
    verification_source: "Dastkar NGO Field Report & All India Artisans and Craftworkers Welfare Association (AIACA)",
    verification_status: "verified",
    era: "300+ Years Old (Practiced exclusively by the Khatri family of Kutch)",
    tagline: "Endangered castor oil thread art practiced by only a single surviving master family",
    description: "Rogan is an endangered 300-year-old art form practiced by the Khatri family in Nirona village, Kutch. Artisans boil castor oil for two continuous days into a dense gelatinous residue, mix it with mineral pigments, and use a blunt metal stylus to manipulate trailing elastic threads onto fabric without the tool ever touching the cloth.",
    history: "Originating in Persia and migrating to Sindh and Kutch, Rogan was once widespread for bridal ghagras. Industrial machine prints nearly wiped it out until Padma Shri Abdul Gafur Khatri and his brothers dedicated their lives to preserving this sole surviving lineage.",
    culturalSignificance: "Representing extraordinary hand-eye coordination, Rogan paintings such as the 'Tree of Life' have been gifted by the Prime Minister of India to global dignitaries including the White House.",
    makingProcess: [
      { step: 1, title: "Oil Boiling", description: "Boiling pure castor oil in closed jungle vats for 48 hours until it transforms into thick amber paste." },
      { step: 2, title: "Pigment Kneading", description: "Artisan rubs a dollop of paste on his palm with stone powders using body warmth to create elastic threads." },
      { step: 3, title: "Aerial Stylus Trailing", description: "Guiding the molten color thread into delicate floral curves mid-air with a 6-inch brass rod." },
      { step: 4, title: "Mirror Folding", description: "Folding the fabric in half while wet to stamp a perfectly symmetrical mirror impression." }
    ],
    model3DType: "pottery",
    priceEstimate: 8500,
    sellerContact: "+91 94265 67890 (Khatri Rogan Art Studio)",
    onlineStoreLink: "https://roganart.example.com",
    thumbnailUrl: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=600&q=80",
    images: ["https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=800&q=80"],
    artisanGroup: "Khatri Family Rogan Heritage Workshop",
    rating: 5.0,
    reviewCount: 16,
    reviews: [
      { id: "r8", buyerName: "Rajesh Kothari", rating: 5, comment: "The Tree of Life detail is breathtaking. Knowing this is one of the last master families makes it priceless.", verifiedPurchase: true, createdAt: new Date("2026-08-28") }
    ],
    sellers: [
      {
        id: "s-7",
        name: "Rogan Art Heritage Studio",
        artisanName: "Padma Shri Abdul Gafur Khatri",
        phone: "+91 94265 67890",
        email: "roganartnirona@gmail.com",
        address: "Khatri Chowk, Nirona Village, Nakhatrana Taluka",
        location: "Kutch, Gujarat",
        coordinates: { lat: 23.3855, lng: 69.5899 },
        verified: true,
        badge: "Researched Master Artisan Guild",
        rating: 5.0,
        reviewCount: 28
      }
    ],
    tags: ["Rogan", "Non-GI", "Endangered", "Gujarat", "Kutch", "Textiles", "Khatri"]
  },
  {
    id: "toda-embroidery-tn",
    name: "Toda Tribal Pugur Embroidery",
    nativeName: "தோடா எம்பிராய்டரி (Pugur)",
    state: "Tamil Nadu",
    region: "South",
    coordinates: { lat: 11.4102, lng: 76.695 },
    category: "Textiles & Embroidery",
    materials: ["Coarse Bleached Cotton", "Black & Crimson Wool Threads", "Bone Needle"],
    technique: "Geometric Count-Thread Reversible Darning",
    GI_tagged: false,
    giTagged: false,
    status: "endangered",
    preservationStatus: "endangered",
    verification_source: "Tribal Research Centre (TRC) Ooty & Dastkari Haat Samiti Academic Documentation",
    verification_status: "verified",
    era: "Ancient Nilgiri Pastoral Antiquity",
    tagline: "Endangered reversible geometric embroidery hand-stitched by the Toda buffalo clan",
    description: "Practiced exclusively by women of the ancient Toda pastoral tribe inhabiting the high Nilgiri hills, Toda 'Pugur' embroidery resembles woven tapestries through meticulous counting of fabric warp and weft threads.",
    makingProcess: [
      { step: 1, title: "Thread Counting", description: "Women calculate open weave threads without pre-drawn stencils or charts." },
      { step: 2, title: "Reversible Darning", description: "Stitching bold red and black geometric bands symbolizing the sacred water buffalo." }
    ],
    model3DType: "pottery",
    priceEstimate: 4500,
    sellerContact: "+91 94860 11223 (Toda Tribal Cooperative)",
    onlineStoreLink: "https://todacrafts.example.com",
    thumbnailUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
    images: ["https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80"],
    artisanGroup: "Nilgiris Adivasi Welfare Association",
    rating: 4.9,
    reviewCount: 14,
    reviews: [
      { id: "r9", buyerName: "Meenakshi Sundaram", rating: 5, comment: "Authentic reversible Toda shawl. The geometric precision is astonishing.", verifiedPurchase: true, createdAt: new Date("2026-08-29") }
    ],
    sellers: [
      {
        id: "s-8",
        name: "Shalom Ooty Toda Women's Society",
        artisanName: "Dr. Vasamalli K. (Tribal Elder)",
        phone: "+91 94860 11223",
        email: "toda.crafts@ooty.in",
        address: "Mund Colony, Nilgiris High Hills",
        location: "Ooty, Tamil Nadu",
        coordinates: { lat: 11.4102, lng: 76.695 },
        verified: true,
        badge: "Verified Tribal Heritage Guild",
        rating: 4.9,
        reviewCount: 20
      }
    ],
    tags: ["Toda", "Non-GI", "Endangered", "Tamil Nadu", "Nilgiris", "Embroidery", "Tribal"]
  },
  {
    id: "sikki-grass-bihar",
    name: "Sikki Golden Grass Weaving",
    nativeName: "सिकी घास शिल्प",
    state: "Bihar",
    region: "East",
    coordinates: { lat: 26.1542, lng: 85.8918 },
    category: "Eco-Bamboo & Cane",
    materials: ["Sikki Wild Reeds (Chrysopogon zizanioides)", "Takua Iron Needle", "Vegetable Dye Extracts"],
    technique: "Coil Needle Weaving & Braiding",
    GI_tagged: false,
    giTagged: false,
    status: "endangered",
    preservationStatus: "endangered",
    verification_source: "Craft Revival Trust & Bihar State Sangeet Natak Akademi Field Study",
    verification_status: "verified",
    era: "Ancient Mithila Folk Ritualism",
    tagline: "Biodegradable golden grass baskets woven by rural women facing habitat loss",
    description: "Sikki is a wild golden river reed that grows in the marshlands of North Bihar. Artisans slice the reeds with their teeth and use an iron needle (Takua) to coil and weave boxes (Pauti), temple toys, and bridal dowry carriers with vibrant dyed accents.",
    makingProcess: [
      { step: 1, title: "Reed Harvesting", description: "Harvesting wet reeds post-monsoon and sun-drying to achieve a natural golden lustre." },
      { step: 2, title: "Takua Coiling", description: "Splitting reeds and coiling them tightly around a grass core using a pointed needle." }
    ],
    model3DType: "pottery",
    priceEstimate: 950,
    sellerContact: "+91 98350 44556 (Sikki Mahila Vikas)",
    onlineStoreLink: "https://sikkicrafts.example.com",
    thumbnailUrl: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80",
    images: ["https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80"],
    artisanGroup: "Darbhanga Rural Women Craft Cooperative",
    rating: 4.8,
    reviewCount: 11,
    reviews: [
      { id: "r10", buyerName: "Pooja Mishra", rating: 5, comment: "Beautiful golden texture and completely natural. Smells like fresh autumn grass!", verifiedPurchase: true, createdAt: new Date("2026-08-30") }
    ],
    sellers: [
      {
        id: "s-9",
        name: "Mithila Sikki Gram Udyog",
        artisanName: "Kiran Devi",
        phone: "+91 98350 44556",
        email: "sikki.mithila@bihar.org",
        address: "Rampur Village, Darbhanga",
        location: "Darbhanga, Bihar",
        coordinates: { lat: 26.1542, lng: 85.8918 },
        verified: true,
        badge: "Verified NGO Craft Collective",
        rating: 4.8,
        reviewCount: 18
      }
    ],
    tags: ["Sikki", "Non-GI", "Endangered", "Bihar", "Eco-friendly", "Grass Weaving"]
  },

  // ==========================================
  // 🔵 NON-GI ACTIVE RESEARCHED CRAFTS (BLUE MARKERS)
  // ==========================================
  {
    id: "aipan-art-uttarakhand",
    name: "Aipan Ritual Folk Art",
    nativeName: "ऐपण कला",
    state: "Uttarakhand",
    region: "North",
    coordinates: { lat: 29.5971, lng: 79.6591 },
    category: "Folk Painting",
    materials: ["Red Ochre Soil (Geru)", "Ground Rice Paste (Biswar)", "Finger Application"],
    technique: "Ritual Finger Line Drawing on Ochre Base",
    GI_tagged: false,
    giTagged: false,
    status: "active",
    preservationStatus: "active",
    verification_source: "National Institute of Design (NID) & Kumaon Cultural Heritage Documentation",
    verification_status: "verified",
    era: "Chand Dynasty of Kumaon (10th-18th Century)",
    tagline: "Sacred geometric folk art created with rice paste on terracotta red earth",
    description: "Aipan is an auspicious folk ritual art of the Kumaon Himalayas in Uttarakhand. Women coat door thresholds and courtyards with wet terracotta-red Geru soil and hand-draw geometric Chowkis, footsteps of Goddess Lakshmi, and auspicious symbols using only wet white rice paste.",
    makingProcess: [
      { step: 1, title: "Geru Base", description: "Plastering the canvas or wood floor with wet red clay paste to create an earthy contrast." },
      { step: 2, title: "Biswar Drawing", description: "Dipping the three middle fingers into ground rice paste to draw unbroken sacred geometries." }
    ],
    model3DType: "pottery",
    priceEstimate: 1400,
    sellerContact: "+91 94120 88990 (Aipan Kumaon Trust)",
    onlineStoreLink: "https://aipanart.example.com",
    thumbnailUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
    images: ["https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"],
    artisanGroup: "Almora Aipan Revival Self-Help Group",
    rating: 4.9,
    reviewCount: 18,
    reviews: [
      { id: "r11", buyerName: "Aarav Joshi", rating: 5, comment: "Brought back fond memories of Kumaon festivals. Exquisite natural finish.", verifiedPurchase: true, createdAt: new Date("2026-08-31") }
    ],
    sellers: [
      {
        id: "s-10",
        name: "Himalayan Aipan Heritage Centre",
        artisanName: "Minakshi Khati",
        phone: "+91 94120 88990",
        email: "aipan.kumaon@uttarakhand.org",
        address: "Mall Road Cultural Hub",
        location: "Almora, Uttarakhand",
        coordinates: { lat: 29.5971, lng: 79.6591 },
        verified: true,
        badge: "Verified Folk Heritage Collective",
        rating: 4.9,
        reviewCount: 24
      }
    ],
    tags: ["Aipan", "Non-GI", "Active", "Uttarakhand", "Kumaon", "Folk Art"]
  },
  {
    id: "punja-durrie-haryana",
    name: "Punja Durrie Weaving",
    nativeName: "पंजा दरी",
    state: "Haryana",
    region: "North",
    coordinates: { lat: 29.3909, lng: 76.9635 },
    category: "Textiles & Weaving",
    materials: ["Handspun Coarse Cotton Yarn", "Heavy Iron Claw (Punja)", "Natural Vegetable Indigo & Madder Dyes"],
    technique: "Pit-Loom Claw Wefting (Punja)",
    GI_tagged: false,
    giTagged: false,
    status: "active",
    preservationStatus: "active",
    verification_source: "All India Handicrafts Board & Panipat Weaver Cooperative Research",
    verification_status: "verified",
    era: "Mughal & Grand Trunk Road Weaving Lineage",
    tagline: "Sturdy geometric cotton flatweaves beaten tight with hand-held iron claws",
    description: "Punja Durrie is a heavy, reversible cotton rug weaving tradition centered in Panipat. Artisans use a heavy claw-like iron fork (Punja) to beat and compress weft yarns into tight, durable geometric tessellations.",
    makingProcess: [
      { step: 1, title: "Warp Setting", description: "Stretching thick cotton warp threads across horizontal pit-looms." },
      { step: 2, title: "Punja Beating", description: "Inserting dyed weft strands and pounding them firmly with a 1.5kg iron Punja claw." }
    ],
    model3DType: "pottery",
    priceEstimate: 2800,
    sellerContact: "+91 98120 33445 (Panipat Weavers Union)",
    onlineStoreLink: "https://punjadurrie.example.com",
    thumbnailUrl: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80",
    images: ["https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80"],
    artisanGroup: "Haryana Rural Handloom Guild",
    rating: 4.8,
    reviewCount: 15,
    reviews: [
      { id: "r12", buyerName: "Harpreet Singh", rating: 5, comment: "Super sturdy flatweave rug! Perfect for living room floors.", verifiedPurchase: true, createdAt: new Date("2026-09-01") }
    ],
    sellers: [
      {
        id: "s-11",
        name: "Panipat Handloom Guild",
        artisanName: "Satish Kumar",
        phone: "+91 98120 33445",
        email: "panipat.durrie@haryana.in",
        address: "GT Road Handloom Complex",
        location: "Panipat, Haryana",
        coordinates: { lat: 29.3909, lng: 76.9635 },
        verified: true,
        badge: "Verified Artisan Guild",
        rating: 4.8,
        reviewCount: 22
      }
    ],
    tags: ["Punja Durrie", "Non-GI", "Active", "Haryana", "Textiles", "Weaving", "Rugs"]
  },
  {
    id: "assam-bamboo-craft",
    name: "Assam Bamboo & Japi Craft",
    nativeName: "অসমৰ বাঁহ আৰু জাপি",
    state: "Assam",
    region: "North-East",
    coordinates: { lat: 26.2006, lng: 92.9376 },
    category: "Eco-Bamboo & Cane",
    materials: ["Muli & Bhaluka Bamboo", "Tokou Palm Leaves", "Red & Black Handspun Yarn"],
    technique: "Interlocking Bamboo Slat Splinting & Palm Weave",
    GI_tagged: false,
    giTagged: false,
    status: "active",
    preservationStatus: "active",
    verification_source: "North Eastern Development Finance Corporation (NEDFi) Craft Documentation",
    verification_status: "verified",
    era: "Ahom Kingdom Antiquity (13th-19th Century)",
    tagline: "Eco-friendly ceremonial sun hats and intricate cane lifestyle crafts of the Brahmaputra",
    description: "The Japi is an iconic conical headgear of Assam crafted from tightly woven bamboo slats, Tokou palm leaves, and colorful felt cloth. Symbolizing Assamese pride and respect, it is traditionally gifted to honor guests and farmers.",
    makingProcess: [
      { step: 1, title: "Bamboo Splitting", description: "Seasoning fresh bamboo in river water and splitting into thin flexible strips." },
      { step: 2, title: "Japi Weaving", description: "Interweaving bamboo strips with broad water-resistant Tokou leaves in concentric circular spirals." }
    ],
    model3DType: "pottery",
    priceEstimate: 1200,
    sellerContact: "+91 94350 12349 (Brahmaputra Bamboo Guild)",
    onlineStoreLink: "https://assambamboo.example.com",
    thumbnailUrl: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80",
    images: ["https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80"],
    artisanGroup: "Nalbari Japi Crafts Guild",
    rating: 4.9,
    reviewCount: 23,
    reviews: [
      { id: "r13", buyerName: "Pranab Barua", rating: 5, comment: "Authentic Bor Japi with rich red-and-black felt work. Proud symbol of Assam.", verifiedPurchase: true, createdAt: new Date("2026-09-02") }
    ],
    sellers: [
      {
        id: "s-12",
        name: "Nalbari Cane & Bamboo Collective",
        artisanName: "Bhabesh Kalita",
        phone: "+91 94350 12349",
        email: "nalbari.bamboo@assam.org",
        address: "Sarthebari Craft Route",
        location: "Nalbari, Assam",
        coordinates: { lat: 26.4447, lng: 91.4398 },
        verified: true,
        badge: "Verified Bamboo Guild",
        rating: 4.9,
        reviewCount: 31
      }
    ],
    tags: ["Assam", "Non-GI", "Active", "Bamboo", "Japi", "Eco-friendly", "North-East"]
  }
];

// Initial Seed Orders for Order Tracking & 10-Day Return System Testing
export const initialOrders = [
  {
    orderId: "ORD-2026-9041",
    trackingId: "EB982341765IN",
    buyerName: "Chayan Sharma",
    buyerEmail: "chayan@example.com",
    buyerPhone: "+91 98765 43210",
    shippingAddress: "Flat 402, Heritage Residency, Indiranagar, Bengaluru - 560038",
    craftId: "jaipur-blue-pottery",
    craftName: "Jaipur Blue Pottery Flagon (Surahi)",
    craftImage: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80",
    artisanId: "s-1",
    artisanName: "Amer Heritage Blue Pottery Studio",
    amount: 2450,
    quantity: 1,
    courier: "India Post Speed Post",
    trackingStatus: "Delivered",
    orderDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    shippedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    deliveryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Delivered yesterday
    returnDeadline: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000), // 9 days remaining
    returnStatus: "none",
    buyerRating: 5,
    buyerReview: "Exquisite hand-painted turquoise glaze! Arrived well-cushioned in eco-packaging.",
    trackingTimeline: [
      { status: "Order Confirmed", location: "Jaipur Artisan Studio", timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), description: "Order verified and packed by master artisan." },
      { status: "Shipped", location: "India Post Speed Post Hub, Jaipur", timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), description: "Consignment dispatched via Speed Post." },
      { status: "In Transit", location: "Northern Logistics Hub, New Delhi", timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000), description: "Sorted for air cargo dispatch." },
      { status: "Out for Delivery", location: "HAL 2nd Stage Sub Post Office, Bengaluru", timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000), description: "Assigned to postman for door-to-door delivery." },
      { status: "Delivered", location: "Bengaluru Recipient Address", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), description: "Delivered and digitally acknowledged." }
    ]
  },
  {
    orderId: "ORD-2026-8819",
    trackingId: "EB912448392IN",
    buyerName: "Chayan Sharma",
    buyerEmail: "chayan@example.com",
    buyerPhone: "+91 98765 43210",
    shippingAddress: "Flat 402, Heritage Residency, Indiranagar, Bengaluru - 560038",
    craftId: "rogan-art-gujarat",
    craftName: "Rogan Art 'Tree of Life' Wall Hanging",
    craftImage: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=600&q=80",
    artisanId: "s-7",
    artisanName: "Rogan Art Heritage Studio",
    amount: 8500,
    quantity: 1,
    courier: "India Post Speed Post",
    trackingStatus: "In Transit",
    orderDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    shippedDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
    deliveryDate: null,
    returnDeadline: null,
    returnStatus: "none",
    trackingTimeline: [
      { status: "Order Confirmed", location: "Nirona Village Workshop, Kutch", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), description: "Signed authentication certificate included." },
      { status: "Shipped", location: "Bhuj Head Post Office, Gujarat", timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), description: "Dispatched under tracking ID EB912448392IN." },
      { status: "In Transit", location: "Ahmedabad Sorting Hub", timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), description: "En route to southern transit hub." }
    ]
  }
];
