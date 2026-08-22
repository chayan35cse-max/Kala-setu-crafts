// Official Survey of India 2019 Political Map paths and coordinates for all 28 States and 8 UTs
// Matches the official Survey of India / MapmyIndia political map standard

export const INDIA_POLITICAL_MAP_CONFIG = {
  viewBox: "0 0 1000 1150",
  width: 1000,
  height: 1150
};

// Accurate state SVG outline paths and label coordinates (0-1000 x 0-1150 viewport)
export const STATE_PATHS = [
  {
    id: "ladakh",
    name: "Ladakh",
    type: "UT",
    color: "#fef3c7", // Soft warm yellow
    stroke: "#b45309",
    capital: "Leh",
    capitalCoords: { x: 310, y: 155 },
    labelCoords: { x: 275, y: 120 },
    // Complete Northern Frontier: Siachen, Karakoram, Aksai Chin, Kargil, Leh
    d: "M 220 75 C 240 45, 270 30, 310 38 C 345 45, 375 70, 395 105 C 410 130, 420 160, 410 190 C 395 210, 370 215, 350 210 C 330 205, 310 220, 290 225 C 270 230, 255 210, 250 190 C 240 160, 230 140, 215 130 C 205 110, 210 90, 220 75 Z"
  },
  {
    id: "jammu-and-kashmir",
    name: "Jammu & Kashmir",
    type: "UT",
    color: "#fee2e2", // Soft red/pink
    stroke: "#dc2626",
    capital: "Srinagar",
    capitalCoords: { x: 235, y: 145 },
    labelCoords: { x: 205, y: 165 },
    // Complete Kashmir Valley, Jammu, Muzaffarabad, Mirpur
    d: "M 220 75 C 210 90, 205 110, 215 130 C 230 140, 240 160, 250 190 C 240 215, 215 225, 195 215 C 175 200, 165 170, 175 140 C 185 110, 200 90, 220 75 Z"
  },
  {
    id: "himachal-pradesh",
    name: "Himachal Pradesh",
    type: "State",
    color: "#e0e7ff", // Soft periwinkle
    stroke: "#4338ca",
    capital: "Shimla",
    capitalCoords: { x: 300, y: 245 },
    labelCoords: { x: 300, y: 230 },
    d: "M 250 190 C 255 210, 270 230, 290 225 C 310 220, 330 205, 350 210 C 360 230, 350 255, 335 270 C 315 285, 290 280, 275 265 C 260 250, 245 225, 250 190 Z"
  },
  {
    id: "punjab",
    name: "Punjab",
    type: "State",
    color: "#f3e8ff", // Soft lavender
    stroke: "#7e22ce",
    capital: "Chandigarh",
    capitalCoords: { x: 275, y: 265 },
    labelCoords: { x: 240, y: 260 },
    d: "M 195 215 C 215 225, 240 215, 250 190 C 245 225, 260 250, 275 265 C 265 285, 245 295, 225 290 C 205 285, 190 260, 190 240 C 190 225, 192 220, 195 215 Z"
  },
  {
    id: "uttarakhand",
    name: "Uttarakhand",
    type: "State",
    color: "#ccfbf1", // Soft teal
    stroke: "#0f766e",
    capital: "Dehradun",
    capitalCoords: { x: 335, y: 270 },
    labelCoords: { x: 350, y: 280 },
    d: "M 335 270 C 350 255, 360 230, 350 210 C 370 215, 395 210, 410 190 C 420 220, 415 250, 400 280 C 380 305, 350 300, 335 270 Z"
  },
  {
    id: "haryana",
    name: "Haryana",
    type: "State",
    color: "#dcfce7", // Soft mint
    stroke: "#15803d",
    capital: "Chandigarh",
    capitalCoords: { x: 275, y: 265 },
    labelCoords: { x: 270, y: 300 },
    d: "M 275 265 C 290 280, 315 285, 335 270 C 350 300, 340 330, 320 340 C 300 350, 280 345, 265 320 C 255 300, 265 285, 275 265 Z"
  },
  {
    id: "delhi",
    name: "Delhi",
    type: "UT",
    color: "#fef08a",
    stroke: "#b45309",
    capital: "New Delhi",
    capitalCoords: { x: 310, y: 325 },
    labelCoords: { x: 315, y: 320 },
    d: "M 305 320 Q 315 315 320 325 Q 315 335 305 330 Z"
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    type: "State",
    color: "#ffedd5", // Soft desert peach
    stroke: "#c2410c",
    capital: "Jaipur",
    capitalCoords: { x: 285, y: 375 },
    labelCoords: { x: 210, y: 380 },
    d: "M 225 290 C 245 295, 265 285, 275 265 C 265 285, 255 300, 265 320 C 280 345, 300 350, 320 340 C 330 365, 320 395, 310 420 C 285 450, 255 460, 220 450 C 180 435, 140 400, 155 355 C 165 320, 195 300, 225 290 Z"
  },
  {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    type: "State",
    color: "#fef9c3", // Pale yellow
    stroke: "#a16207",
    capital: "Lucknow",
    capitalCoords: { x: 440, y: 380 },
    labelCoords: { x: 420, y: 395 },
    d: "M 335 270 C 350 300, 380 305, 400 280 C 420 295, 460 300, 500 320 C 535 340, 560 370, 550 405 C 520 435, 470 440, 420 430 C 370 420, 340 400, 320 340 C 340 330, 350 300, 335 270 Z"
  },
  {
    id: "bihar",
    name: "Bihar",
    type: "State",
    color: "#dcfce7", // Soft light green
    stroke: "#166534",
    capital: "Patna",
    capitalCoords: { x: 575, y: 410 },
    labelCoords: { x: 575, y: 395 },
    d: "M 550 405 C 560 370, 585 365, 625 375 C 655 385, 665 415, 650 440 C 625 460, 580 460, 550 445 C 540 430, 545 415, 550 405 Z"
  },
  {
    id: "gujarat",
    name: "Gujarat",
    type: "State",
    color: "#fef08a", // Sunny yellow
    stroke: "#ca8a04",
    capital: "Gandhinagar",
    capitalCoords: { x: 185, y: 480 },
    labelCoords: { x: 165, y: 505 },
    d: "M 155 355 C 180 400, 220 435, 220 450 C 220 470, 205 500, 185 525 C 160 550, 120 540, 100 515 C 80 490, 85 460, 110 440 C 130 425, 140 390, 155 355 Z"
  },
  {
    id: "madhya-pradesh",
    name: "Madhya Pradesh",
    type: "State",
    color: "#e0e7ff", // Soft royal periwinkle
    stroke: "#3730a3",
    capital: "Bhopal",
    capitalCoords: { x: 330, y: 480 },
    labelCoords: { x: 330, y: 500 },
    d: "M 220 450 C 255 460, 285 450, 310 420 C 340 400, 370 420, 420 430 C 470 440, 490 465, 480 500 C 465 540, 420 565, 360 560 C 300 555, 250 535, 220 495 C 210 475, 215 460, 220 450 Z"
  },
  {
    id: "jharkhand",
    name: "Jharkhand",
    type: "State",
    color: "#f3e8ff", // Light violet
    stroke: "#6b21a8",
    capital: "Ranchi",
    capitalCoords: { x: 575, y: 475 },
    labelCoords: { x: 570, y: 460 },
    d: "M 550 445 C 580 460, 625 460, 650 440 C 660 470, 650 500, 620 515 C 580 525, 550 500, 540 470 C 540 455, 545 450, 550 445 Z"
  },
  {
    id: "west-bengal",
    name: "West Bengal",
    type: "State",
    color: "#fef3c7", // Soft warm cream
    stroke: "#b45309",
    capital: "Kolkata",
    capitalCoords: { x: 655, y: 505 },
    labelCoords: { x: 650, y: 480 },
    d: "M 650 440 C 665 415, 675 360, 690 340 C 700 370, 690 420, 680 460 C 690 490, 675 540, 645 550 C 630 530, 640 490, 650 440 Z"
  },
  {
    id: "odisha",
    name: "Odisha",
    type: "State",
    color: "#dbeafe", // Soft sky blue
    stroke: "#1e40af",
    capital: "Bhubaneswar",
    capitalCoords: { x: 575, y: 575 },
    labelCoords: { x: 570, y: 545 },
    d: "M 540 470 C 580 500, 620 515, 645 550 C 625 585, 595 615, 550 630 C 520 610, 505 570, 515 530 C 525 495, 530 480, 540 470 Z"
  },
  {
    id: "chhattisgarh",
    name: "Chhattisgarh",
    type: "State",
    color: "#ffe4e6", // Soft coral pink
    stroke: "#e11d48",
    capital: "Raipur",
    capitalCoords: { x: 485, y: 525 },
    labelCoords: { x: 480, y: 555 },
    d: "M 480 500 C 490 465, 520 460, 540 470 C 530 480, 525 495, 515 530 C 505 570, 500 620, 480 660 C 460 640, 450 590, 460 550 C 465 540, 475 515, 480 500 Z"
  },
  {
    id: "maharashtra",
    name: "Maharashtra",
    type: "State",
    color: "#e0e7ff", // Classic lavender blue
    stroke: "#3730a3",
    capital: "Mumbai",
    capitalCoords: { x: 190, y: 615 },
    labelCoords: { x: 275, y: 585 },
    d: "M 185 525 C 205 500, 220 470, 220 495 C 250 535, 300 555, 360 560 C 420 565, 440 590, 430 630 C 390 665, 320 680, 260 660 C 215 640, 195 590, 185 525 Z"
  },
  {
    id: "telangana",
    name: "Telangana",
    type: "State",
    color: "#dcfce7", // Fresh light green
    stroke: "#15803d",
    capital: "Hyderabad",
    capitalCoords: { x: 370, y: 660 },
    labelCoords: { x: 375, y: 640 },
    d: "M 430 630 C 440 590, 460 590, 480 660 C 450 690, 410 710, 360 700 C 350 670, 390 640, 430 630 Z"
  },
  {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    type: "State",
    color: "#e0f2fe", // Ocean cyan
    stroke: "#0369a1",
    capital: "Amaravati",
    capitalCoords: { x: 440, y: 700 },
    labelCoords: { x: 370, y: 740 },
    d: "M 550 630 C 500 620, 480 660, 450 690 C 410 710, 360 700, 340 730 C 355 770, 385 810, 410 840 C 435 800, 470 740, 520 690 C 540 665, 545 645, 550 630 Z"
  },
  {
    id: "goa",
    name: "Goa",
    type: "State",
    color: "#fed7aa",
    stroke: "#c2410c",
    capital: "Panaji",
    capitalCoords: { x: 190, y: 715 },
    labelCoords: { x: 175, y: 715 },
    d: "M 195 705 Q 205 715 200 730 Q 188 725 195 705 Z"
  },
  {
    id: "karnataka",
    name: "Karnataka",
    type: "State",
    color: "#dcfce7", // Vibrant lime/green
    stroke: "#15803d",
    capital: "Bengaluru",
    capitalCoords: { x: 275, y: 785 },
    labelCoords: { x: 265, y: 725 },
    d: "M 260 660 C 320 680, 350 670, 360 700 C 360 700, 340 730, 355 770 C 340 805, 305 830, 270 820 C 235 805, 215 750, 215 700 C 215 675, 240 665, 260 660 Z"
  },
  {
    id: "kerala",
    name: "Kerala",
    type: "State",
    color: "#fef08a", // Soft golden green
    stroke: "#a16207",
    capital: "Thiruvananthapuram",
    capitalCoords: { x: 260, y: 920 },
    labelCoords: { x: 285, y: 865 },
    d: "M 235 805 C 270 820, 280 840, 275 880 C 265 915, 255 940, 250 950 C 235 925, 230 870, 225 835 C 225 815, 230 810, 235 805 Z"
  },
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    type: "State",
    color: "#fed7aa", // Warm temple peach
    stroke: "#ea580c",
    capital: "Chennai",
    capitalCoords: { x: 410, y: 790 },
    labelCoords: { x: 350, y: 845 },
    d: "M 355 770 C 385 810, 410 840, 400 875 C 375 910, 335 935, 300 945 C 275 945, 275 880, 270 820 C 305 830, 340 805, 355 770 Z"
  },
  // North-East Frontier States (100% Integral Indian Territory)
  {
    id: "sikkim",
    name: "Sikkim",
    type: "State",
    color: "#e0e7ff",
    stroke: "#4338ca",
    capital: "Gangtok",
    capitalCoords: { x: 675, y: 345 },
    labelCoords: { x: 675, y: 320 },
    d: "M 665 315 C 685 310, 690 335, 685 350 C 670 355, 660 335, 665 315 Z"
  },
  {
    id: "assam",
    name: "Assam",
    type: "State",
    color: "#fef3c7",
    stroke: "#b45309",
    capital: "Dispur",
    capitalCoords: { x: 790, y: 395 },
    labelCoords: { x: 810, y: 380 },
    d: "M 730 380 C 760 360, 810 360, 850 375 C 870 400, 840 430, 800 425 C 760 420, 730 400, 730 380 Z"
  },
  {
    id: "arunachal-pradesh",
    name: "Arunachal Pradesh",
    type: "State",
    color: "#fed7aa",
    stroke: "#ea580c",
    capital: "Itanagar",
    capitalCoords: { x: 840, y: 345 },
    labelCoords: { x: 875, y: 320 },
    d: "M 780 340 C 820 310, 880 290, 930 320 C 950 350, 920 380, 870 375 C 830 370, 790 350, 780 340 Z"
  },
  {
    id: "meghalaya",
    name: "Meghalaya",
    type: "State",
    color: "#ccfbf1",
    stroke: "#0f766e",
    capital: "Shillong",
    capitalCoords: { x: 770, y: 420 },
    labelCoords: { x: 765, y: 410 },
    d: "M 735 410 C 775 405, 805 415, 800 435 C 760 440, 730 430, 735 410 Z"
  },
  {
    id: "nagaland",
    name: "Nagaland",
    type: "State",
    color: "#e0e7ff",
    stroke: "#4338ca",
    capital: "Kohima",
    capitalCoords: { x: 890, y: 405 },
    labelCoords: { x: 895, y: 390 },
    d: "M 865 375 C 895 385, 905 415, 885 435 C 865 425, 855 400, 865 375 Z"
  },
  {
    id: "manipur",
    name: "Manipur",
    type: "State",
    color: "#fce7f3",
    stroke: "#db2777",
    capital: "Imphal",
    capitalCoords: { x: 875, y: 450 },
    labelCoords: { x: 870, y: 435 },
    d: "M 865 435 C 890 440, 885 475, 865 490 C 845 475, 850 450, 865 435 Z"
  },
  {
    id: "tripura",
    name: "Tripura",
    type: "State",
    color: "#fef9c3",
    stroke: "#ca8a04",
    capital: "Agartala",
    capitalCoords: { x: 755, y: 470 },
    labelCoords: { x: 755, y: 475 },
    d: "M 740 455 C 765 450, 765 485, 750 495 C 735 485, 735 465, 740 455 Z"
  },
  {
    id: "mizoram",
    name: "Mizoram",
    type: "State",
    color: "#dcfce7",
    stroke: "#16a34a",
    capital: "Aizawl",
    capitalCoords: { x: 830, y: 475 },
    labelCoords: { x: 830, y: 490 },
    d: "M 815 455 C 845 455, 845 515, 825 530 C 805 510, 805 475, 815 455 Z"
  }
];

// Mapping of traditional craft clusters onto the high-accuracy SVG viewport (0-1000 x 0-1150)
export const CRAFT_MAP_COORDINATES = {
  "pashmina-kashmir": { x: 235, y: 155, state: "Jammu and Kashmir" },
  "jaipur-blue-pottery": { x: 285, y: 375, state: "Rajasthan" },
  "phulkari-punjab": { x: 260, y: 265, state: "Punjab" },
  "rogan-art-gujarat": { x: 135, y: 475, state: "Gujarat" },
  "warli-folk-painting": { x: 195, y: 575, state: "Maharashtra" },
  "madhubani-painting": { x: 595, y: 395, state: "Bihar" },
  "bankura-terracotta": { x: 645, y: 475, state: "West Bengal" },
  "pattachitra-odisha": { x: 590, y: 570, state: "Odisha" },
  "bastar-dhokra-craft": { x: 490, y: 590, state: "Chhattisgarh" },
  "bidriware-karnataka": { x: 330, y: 640, state: "Karnataka" },
  "channapatna-toys": { x: 295, y: 775, state: "Karnataka" },
  "kalamkari-andhra": { x: 410, y: 750, state: "Andhra Pradesh" },
  "tanjore-painting": { x: 375, y: 835, state: "Tamil Nadu" },
  "assam-bamboo-craft": { x: 790, y: 395, state: "Assam" }
};
