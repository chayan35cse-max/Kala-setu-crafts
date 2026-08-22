// Official Indian Territory Coordinates & State Data
// Accurately reflects the sovereign boundary of India (including entire Jammu & Kashmir, Ladakh, and Arunachal Pradesh)

export const INDIA_BOUNDS = [
  [6.5, 68.0],  // South-West (Kanyakumari / Arabian Sea)
  [37.5, 97.5]  // North-East (Siachen / Ladakh / Arunachal Pradesh)
];

export const INDIA_CENTER = [22.8, 80.0];

// State centroids and cultural regions
export const INDIAN_STATES_DATA = [
  { id: "JK", name: "Jammu and Kashmir", nativeName: "جموں و کشمیر", center: [34.0837, 74.7973], region: "north" },
  { id: "LA", name: "Ladakh", nativeName: "ལ་དྭགས", center: [34.1526, 77.5771], region: "north" },
  { id: "HP", name: "Himachal Pradesh", nativeName: "हिमाचल प्रदेश", center: [31.1048, 77.1734], region: "north" },
  { id: "PB", name: "Punjab", nativeName: "ਪੰਜਾਬ", center: [31.1471, 75.3412], region: "north" },
  { id: "HR", name: "Haryana", nativeName: "हरियाणा", center: [29.0588, 76.0856], region: "north" },
  { id: "UT", name: "Uttarakhand", nativeName: "उत्तराखंड", center: [30.0668, 79.0193], region: "north" },
  { id: "DL", name: "Delhi", nativeName: "दिल्ली", center: [28.7041, 77.1025], region: "north" },
  { id: "RJ", name: "Rajasthan", nativeName: "राजस्थान", center: [27.0238, 74.2179], region: "west" },
  { id: "UP", name: "Uttar Pradesh", nativeName: "उत्तर प्रदेश", center: [26.8467, 80.9462], region: "north" },
  { id: "BR", name: "Bihar", nativeName: "बिहार", center: [25.0961, 85.3131], region: "east" },
  { id: "WB", name: "West Bengal", nativeName: "পশ্চিমবঙ্গ", center: [22.9868, 87.8550], region: "east" },
  { id: "OD", name: "Odisha", nativeName: "ଓଡ଼ିଶା", center: [20.9517, 85.0985], region: "east" },
  { id: "JH", name: "Jharkhand", nativeName: "झारखंड", center: [23.6102, 85.2799], region: "east" },
  { id: "CG", name: "Chhattisgarh", nativeName: "छत्तीसगढ़", center: [21.2787, 81.8661], region: "east" },
  { id: "MP", name: "Madhya Pradesh", nativeName: "मध्य प्रदेश", center: [22.9734, 78.6569], region: "north" },
  { id: "GJ", name: "Gujarat", nativeName: "ગુજરાત", center: [22.2587, 71.1924], region: "west" },
  { id: "MH", name: "Maharashtra", nativeName: "महाराष्ट्र", center: [19.7515, 75.7139], region: "west" },
  { id: "GA", name: "Goa", nativeName: "गोंय", center: [15.2993, 74.1240], region: "west" },
  { id: "KA", name: "Karnataka", nativeName: "ಕರ್ನಾಟಕ", center: [15.3173, 75.7139], region: "south" },
  { id: "TG", name: "Telangana", nativeName: "తెలంగాణ", center: [18.1124, 79.0193], region: "south" },
  { id: "AP", name: "Andhra Pradesh", nativeName: "ఆంధ్రప్రదేశ్", center: [15.9129, 79.7400], region: "south" },
  { id: "TN", name: "Tamil Nadu", nativeName: "தமிழ்நாடு", center: [11.1271, 78.6569], region: "south" },
  { id: "KL", name: "Kerala", nativeName: "കേരളം", center: [10.8505, 76.2711], region: "south" },
  { id: "AS", name: "Assam", nativeName: "অসম", center: [26.2006, 92.9376], region: "northeast" },
  { id: "AR", name: "Arunachal Pradesh", nativeName: "अरुणाचल प्रदेश", center: [28.2180, 94.7278], region: "northeast" },
  { id: "MN", name: "Manipur", nativeName: "মণিপুর", center: [24.6637, 93.9063], region: "northeast" },
  { id: "ML", name: "Meghalaya", nativeName: "मेघालय", center: [25.4670, 91.3662], region: "northeast" },
  { id: "MZ", name: "Mizoram", nativeName: "Mizoram", center: [23.1645, 92.9376], region: "northeast" },
  { id: "NL", name: "Nagaland", nativeName: "नागालैंड", center: [26.1584, 94.5624], region: "northeast" },
  { id: "SK", name: "Sikkim", nativeName: "सिक्किम", center: [27.5330, 88.5122], region: "northeast" },
  { id: "TR", name: "Tripura", nativeName: "ত্রিপুরা", center: [23.9408, 91.9882], region: "northeast" }
];

// Official Sovereign Boundary Coordinates of India (Complete Jammu, Kashmir, Ladakh & Arunachal Pradesh)
export const OFFICIAL_INDIA_POLYGON = [
  // Northern Sector: Siachen, Karakoram, Ladakh & Kashmir
  [37.05, 74.85], [37.08, 75.30], [36.85, 76.50], [36.30, 77.80], [35.50, 79.50],
  [34.80, 79.85], [33.80, 79.30], [32.80, 78.80], [32.00, 78.50], [31.20, 78.80],
  [30.50, 79.80], [30.10, 81.00], 
  // North-East / Himalayan Sector
  [28.00, 88.00], [27.80, 88.80], [27.20, 88.90], [27.00, 89.90], [27.50, 91.60],
  [27.90, 93.50], [28.60, 94.80], [29.20, 96.50], [28.40, 97.40], [27.80, 97.20],
  [27.00, 96.20], [26.00, 95.00], [24.80, 94.30], [23.80, 93.30], [22.00, 93.00],
  [22.80, 92.20], [24.00, 92.10], [25.00, 90.00], [25.20, 89.80], [26.00, 89.00],
  [24.00, 88.50], [22.50, 89.00], [21.60, 88.20],
  // Eastern & Coromandel Coast
  [21.50, 87.00], [19.80, 85.80], [17.70, 83.30], [16.00, 80.80], [13.10, 80.30],
  [11.90, 79.80], [10.80, 79.80], [9.30, 79.10], [8.50, 78.10],
  // Southern Tip (Kanyakumari)
  [8.08, 77.55],
  // Western / Malabar / Konkan / Gujarat Coast
  [8.80, 76.60], [10.00, 76.20], [12.90, 74.80], [15.50, 73.80], [18.90, 72.80],
  [20.50, 72.80], [21.50, 72.20], [20.90, 70.40], [21.60, 69.40], [22.50, 69.00],
  [23.50, 68.50], [23.80, 68.20], [24.50, 68.80], [24.80, 70.80],
  // Western Border: Rajasthan & Punjab
  [25.50, 70.20], [26.80, 70.00], [27.80, 70.50], [28.80, 71.50], [30.00, 73.80],
  [31.60, 74.60], [32.50, 74.50], [33.50, 74.00], [34.50, 73.80], [35.80, 74.20],
  [37.05, 74.85]
];
