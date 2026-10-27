// Home-cookable Indian meals. Protein is an approximate per-person estimate.
// Items are "Display name|visual" — the visual key drives the plate illustration.
// diet: veg | egg | nonveg

window.MEALS = {
  breakfast: [
    { name: "Moong Dal Chilla", diet: "veg", protein: 18, time: 25, items: ["Moong dal chilla|chilla", "Hari chutney|chutneyGreen", "Dahi|dahi"], tip: "Soak the moong overnight — batter takes 5 minutes in the morning." },
    { name: "Paneer Besan Chilla", diet: "veg", protein: 21, time: 25, items: ["Besan chilla|chilla", "Paneer bhurji filling|paneerBhurji", "Tomato chutney|chutneyRed"], tip: "Crumble paneer straight into the batter if you're short on time." },
    { name: "Peanut Poha & Sprouts", diet: "veg", protein: 13, time: 20, items: ["Kanda poha with peanuts|poha", "Sprouts salad|sprouts", "Adrak chai|chai"], tip: "A fistful of extra peanuts adds ~4g protein." },
    { name: "Vegetable Upma", diet: "veg", protein: 11, time: 20, items: ["Rava upma with veggies|upma", "Dahi|dahi", "Adrak chai|chai"], tip: "Roast the rava a day ahead — upma becomes a 10-minute job." },
    { name: "Paneer Paratha", diet: "veg", protein: 20, time: 35, items: ["Paneer paratha|paratha", "Dahi|dahi", "Aam ka achaar|achaar"], tip: "Use leftover dough from last night's rotis." },
    { name: "Aloo Paratha & Curd", diet: "veg", protein: 11, time: 35, items: ["Aloo paratha|paratha", "Dahi|dahi", "Adrak chai|chai"], tip: "Pair with a big bowl of curd to push protein up." },
    { name: "Idli Sambar", diet: "veg", protein: 12, time: 30, items: ["Soft idli|idli", "Sambar|sambar", "Coconut chutney|chutneyWhite"], tip: "Extra dal in the sambar = extra protein." },
    { name: "Pesarattu (Moong Dosa)", diet: "veg", protein: 16, time: 25, items: ["Green moong dosa|dosa", "Ginger chutney|chutneyRed", "Dahi|dahi"], tip: "No fermentation needed — just soak and grind." },
    { name: "Masala Oats & Curd", diet: "veg", protein: 12, time: 15, items: ["Masala oats with veggies|daliya", "Dahi|dahi", "Banana|fruit"], tip: "Stir a spoon of peanut powder into the oats." },
    { name: "Vegetable Daliya", diet: "veg", protein: 10, time: 25, items: ["Namkeen daliya|daliya", "Dahi|dahi", "Adrak chai|chai"], tip: "Pressure-cook with moong dal for a protein bump." },
    { name: "Sprouts Chaat & Milk", diet: "veg", protein: 15, time: 10, items: ["Moong sprouts chaat|sprouts", "Glass of milk|milk", "Banana|fruit"], tip: "Steam the sprouts for 3 minutes so they're easy on the stomach." },
    { name: "Paneer Sandwich", diet: "veg", protein: 18, time: 15, items: ["Grilled paneer sandwich|toast", "Kachumber|salad", "Hari chutney|chutneyGreen"], tip: "Grate paneer with onion, chilli and salt — done." },
    { name: "Methi Thepla & Curd", diet: "veg", protein: 11, time: 30, items: ["Methi thepla|thepla", "Dahi|dahi", "Aam ka achaar|achaar"], tip: "Add besan to the atta for more protein." },
    { name: "Peanut Butter Toast", diet: "veg", protein: 16, time: 5, items: ["Peanut butter toast|toast", "Banana|fruit", "Glass of milk|milk"], tip: "The 5-minute rescue breakfast." },
    { name: "Egg Bhurji & Toast", diet: "egg", protein: 19, time: 15, items: ["Anda bhurji|eggBhurji", "Toasted bread|toast", "Adrak chai|chai"], tip: "Three eggs per person if you skipped protein yesterday." },
    { name: "Masala Omelette", diet: "egg", protein: 17, time: 10, items: ["Masala omelette|omelette", "Toasted bread|toast", "Adrak chai|chai"], tip: "Onion, tomato, chilli, coriander — that's it." },
    { name: "Poha with Boiled Eggs", diet: "egg", protein: 18, time: 20, items: ["Kanda poha|poha", "Boiled eggs|eggs", "Adrak chai|chai"], tip: "Boil the eggs while the onions fry." },
    { name: "Anda Paratha", diet: "egg", protein: 17, time: 25, items: ["Egg paratha|paratha", "Dahi|dahi", "Hari chutney|chutneyGreen"], tip: "Crack the egg into the half-cooked paratha pocket." },
  ],

  lunch: [
    { name: "Rajma Chawal", diet: "veg", protein: 18, time: 45, items: ["Rajma masala|rajma", "Boondi raita|raita", "Steamed rice|rice", "Kachumber salad|salad"], tip: "Soak rajma the night before — the cooker does the rest." },
    { name: "Chole with Roti", diet: "veg", protein: 17, time: 45, items: ["Pindi chole|chole", "Dahi|dahi", "Phulka roti|roti", "Onion salad|salad"], tip: "Pressure-cook chickpeas with a tea bag for that deep colour." },
    { name: "Dal Tadka Thali", diet: "veg", protein: 16, time: 40, items: ["Dal tadka|dal", "Bhindi fry|bhindi", "Raita|raita", "Phulka roti|roti", "Jeera rice|rice"], tip: "Make extra dal — it's tomorrow's breakfast chilla." },
    { name: "Kadhi Chawal", diet: "veg", protein: 13, time: 40, items: ["Punjabi kadhi|kadhi", "Aloo jeera|sabziYellow", "Steamed rice|rice", "Phulka roti|roti"], tip: "Add besan pakoras for extra protein." },
    { name: "Palak Paneer Thali", diet: "veg", protein: 24, time: 40, items: ["Palak paneer|paneerGreen", "Yellow dal|dal", "Phulka roti|roti", "Steamed rice|rice"], tip: "Blanch spinach for 2 minutes only to keep it bright green." },
    { name: "Matar Paneer & Jeera Rice", diet: "veg", protein: 22, time: 40, items: ["Matar paneer|paneerRed", "Kachumber salad|salad", "Phulka roti|roti", "Jeera rice|rice"], tip: "Soak paneer in warm water so it stays soft." },
    { name: "Soya Chunks Curry", diet: "veg", protein: 26, time: 35, items: ["Soya chunk curry|soya", "Raita|raita", "Phulka roti|roti", "Steamed rice|rice"], tip: "The cheapest protein in the kitchen — 50g soya ≈ 26g protein." },
    { name: "Moong Dal & Lauki", diet: "veg", protein: 15, time: 35, items: ["Moong dal|dal", "Lauki sabzi|lauki", "Dahi|dahi", "Phulka roti|roti", "Steamed rice|rice"], tip: "Light, gut-friendly and still protein-forward." },
    { name: "Dal Makhani Thali", diet: "veg", protein: 17, time: 50, items: ["Dal makhani|dalBlack", "Mix veg|sabziGreen", "Phulka roti|roti", "Jeera rice|rice"], tip: "Go easy on the cream — curd works just as well." },
    { name: "Sambar Rice & Poriyal", diet: "veg", protein: 14, time: 40, items: ["Sambar|sambar", "Beans poriyal|sabziGreen", "Dahi|dahi", "Steamed rice|rice"], tip: "Double the toor dal in the sambar." },
    { name: "Chana Dal & Aloo Gobi", diet: "veg", protein: 16, time: 40, items: ["Chana dal|dal", "Aloo gobi|sabziYellow", "Raita|raita", "Phulka roti|roti", "Steamed rice|rice"], tip: "Chana dal is one of the most protein-dense dals." },
    { name: "Masoor Dal & Baingan Bharta", diet: "veg", protein: 15, time: 40, items: ["Masoor dal|dalRed", "Baingan bharta|baingan", "Phulka roti|roti", "Steamed rice|rice"], tip: "Roast the baingan directly on the gas flame for smoky flavour." },
    { name: "Lobia Curry", diet: "veg", protein: 16, time: 40, items: ["Lobia masala|chole", "Dahi|dahi", "Phulka roti|roti", "Steamed rice|rice"], tip: "Black-eyed peas cook faster than rajma — only 3 whistles." },
    { name: "Kala Chana & Jeera Rice", diet: "veg", protein: 18, time: 45, items: ["Kala chana curry|chole", "Raita|raita", "Phulka roti|roti", "Jeera rice|rice"], tip: "Save the chana cooking water for the gravy." },
    { name: "Paneer Bhurji & Dal", diet: "veg", protein: 23, time: 30, items: ["Paneer bhurji|paneerBhurji", "Arhar dal|dal", "Phulka roti|roti", "Steamed rice|rice"], tip: "Fastest high-protein lunch on the list." },
    { name: "Soya Pulao & Raita", diet: "veg", protein: 21, time: 30, items: ["Dal fry|dal", "Boondi raita|raita", "Soya veg pulao|riceYellow", "Kachumber salad|salad"], tip: "Throw soya chunks straight into the pulao." },
    { name: "Egg Curry & Rice", diet: "egg", protein: 21, time: 35, items: ["Anda curry|eggCurry", "Kachumber salad|salad", "Phulka roti|roti", "Steamed rice|rice"], tip: "Prick boiled eggs and fry them lightly so masala sticks." },
    { name: "Home-style Chicken Curry", diet: "nonveg", protein: 32, time: 50, items: ["Chicken curry|chicken", "Yellow dal|dal", "Phulka roti|roti", "Steamed rice|rice"], tip: "Marinate in curd for 20 minutes — even that helps." },
    { name: "Fish Curry Rice", diet: "nonveg", protein: 28, time: 40, items: ["Fish curry|fish", "Masoor dal|dalRed", "Kachumber salad|salad", "Steamed rice|rice"], tip: "Rohu or surmai both work beautifully." },
    { name: "Keema Matar", diet: "nonveg", protein: 30, time: 45, items: ["Chicken keema matar|keema", "Dahi|dahi", "Phulka roti|roti", "Jeera rice|rice"], tip: "Keema freezes well — make double." },
  ],

  dinner: [
    { name: "Moong Dal Khichdi", diet: "veg", protein: 14, time: 25, items: ["Aam ka achaar|achaar", "Dahi|dahi", "Papad|papad", "Moong dal khichdi|khichdi"], tip: "Comfort food that still ticks dal + rice." },
    { name: "Dal Palak & Roti", diet: "veg", protein: 16, time: 30, items: ["Dal palak|dalGreen", "Aloo jeera|sabziYellow", "Phulka roti|roti"], tip: "Add the spinach at the end so it stays green." },
    { name: "Tawa Paneer Tikka", diet: "veg", protein: 25, time: 30, items: ["Paneer tikka|paneerTikka", "Yellow dal|dal", "Mint raita|raita", "Phulka roti|roti"], tip: "Tawa works — no oven or tandoor needed." },
    { name: "Soya Bhurji Rolls", diet: "veg", protein: 23, time: 25, items: ["Soya bhurji|soya", "Raita|raita", "Phulka roti|roti", "Onion salad|salad"], tip: "Crumble boiled soya chunks like keema." },
    { name: "Chana Masala & Roti", diet: "veg", protein: 17, time: 40, items: ["Chana masala|chole", "Dahi|dahi", "Phulka roti|roti", "Kachumber salad|salad"], tip: "Use pre-boiled chana from the fridge." },
    { name: "Daliya Khichdi", diet: "veg", protein: 12, time: 25, items: ["Dahi|dahi", "Papad|papad", "Moong-daliya khichdi|daliya"], tip: "Lighter than rice, still filling." },
    { name: "Mixed Dal & Lauki", diet: "veg", protein: 15, time: 30, items: ["Panchmel dal|dal", "Lauki sabzi|lauki", "Phulka roti|roti"], tip: "Mix whatever dals are in the jars." },
    { name: "Masoor Dal & Paneer Sabzi", diet: "veg", protein: 21, time: 30, items: ["Masoor dal|dalRed", "Shimla mirch paneer|paneerRed", "Phulka roti|roti"], tip: "Masoor cooks in 10 minutes — no soaking." },
    { name: "Moong Usal", diet: "veg", protein: 16, time: 30, items: ["Sprouted moong usal|sprouts", "Dahi|dahi", "Phulka roti|roti", "Steamed rice|rice"], tip: "Sprout a batch on Sunday for the whole week." },
    { name: "Rajma & Roti", diet: "veg", protein: 17, time: 40, items: ["Rajma|rajma", "Dahi|dahi", "Phulka roti|roti", "Onion salad|salad"], tip: "Leftover lunch rajma tastes better at night anyway." },
    { name: "Kadhai Paneer & Dal", diet: "veg", protein: 23, time: 35, items: ["Kadhai paneer|paneerRed", "Dal fry|dal", "Phulka roti|roti"], tip: "Big pieces of onion and capsicum, high flame." },
    { name: "Matar Mushroom & Dal", diet: "veg", protein: 14, time: 30, items: ["Matar mushroom|curryRed", "Dal tadka|dal", "Phulka roti|roti"], tip: "Mushrooms release water — cook on high flame." },
    { name: "Methi Thepla & Dal", diet: "veg", protein: 14, time: 30, items: ["Moong dal|dal", "Dahi|dahi", "Methi thepla|thepla"], tip: "Theplas keep for 2 days — great for tomorrow too." },
    { name: "Veg Pulao & Chana", diet: "veg", protein: 16, time: 30, items: ["Chana masala|chole", "Boondi raita|raita", "Vegetable pulao|riceYellow"], tip: "One-pot pulao in the cooker — 2 whistles." },
    { name: "Egg Bhurji & Dal", diet: "egg", protein: 21, time: 20, items: ["Anda bhurji|eggBhurji", "Dal tadka|dal", "Phulka roti|roti", "Kachumber salad|salad"], tip: "Quickest protein dinner when everyone's tired." },
    { name: "Egg Curry & Roti", diet: "egg", protein: 19, time: 30, items: ["Anda curry|eggCurry", "Lauki sabzi|lauki", "Phulka roti|roti"], tip: "Boil eggs while the masala cooks." },
    { name: "Tawa Chicken & Roti", diet: "nonveg", protein: 34, time: 40, items: ["Tawa chicken|chicken", "Mint raita|raita", "Phulka roti|roti", "Onion salad|salad"], tip: "Boneless thighs stay juicy on the tawa." },
    { name: "Chicken Shorba & Sabzi", diet: "nonveg", protein: 26, time: 40, items: ["Chicken shorba|chickenSoup", "Mix veg|sabziGreen", "Phulka roti|roti"], tip: "A light, warm dinner that's still protein-heavy." },
    { name: "Tawa Fish & Dal", diet: "nonveg", protein: 28, time: 30, items: ["Masala tawa fish|fishFry", "Yellow dal|dal", "Phulka roti|roti"], tip: "Haldi, mirchi, salt, lemon — 15 minutes marinade." },
  ],
};

// Simple nutrition tags, derived from the visual keys.
window.TAGS = {
  dal: ["dal", "dalBlack", "dalGreen", "dalRed", "rajma", "chole", "sambar", "kadhi", "sprouts", "khichdi", "chilla", "dosa"],
  grain: ["roti", "rice", "riceYellow", "paratha", "thepla", "khichdi", "poha", "upma", "daliya", "idli", "dosa", "toast", "chilla"],
  veg: ["salad", "sabziGreen", "sabziYellow", "bhindi", "lauki", "baingan", "paneerGreen", "dalGreen", "sprouts", "upma"],
};

// Chatpata & spicy additions — still home-cookable, still balanced where possible.
MEALS.breakfast.push(
  { name: "Misal Pav", diet: "veg", protein: 18, time: 35, items: ["Spicy moth misal|misal", "Ladi pav|pav", "Onion & lemon|salad"], tip: "Top with farsan and lemon right before eating so it stays crunchy." },
  { name: "Chana Chaat Bowl", diet: "veg", protein: 15, time: 15, items: ["Chana chaat|chaat", "Dahi|dahi", "Adrak chai|chai"], tip: "Boiled chana + onion, tomato, chaat masala, lemon. Done." },
  { name: "Paneer Bhurji Pav", diet: "veg", protein: 21, time: 20, items: ["Masala paneer bhurji|paneerBhurji", "Butter pav|pav", "Adrak chai|chai"], tip: "Add pav bhaji masala to the bhurji for that street taste." },
  { name: "Mumbai Anda Bhurji Pav", diet: "egg", protein: 19, time: 15, items: ["Spicy anda bhurji|eggBhurji", "Butter pav|pav", "Adrak chai|chai"], tip: "Green chilli, lots of onion, a pinch of pav bhaji masala." },
);
MEALS.lunch.push(
  { name: "Pav Bhaji", diet: "veg", protein: 14, time: 40, items: ["Bhaji with masoor dal|pavBhaji", "Butter pav|pav", "Onion & lemon|salad"], tip: "Mash a cup of cooked masoor dal into the bhaji — nobody notices, protein goes up." },
  { name: "Amritsari Chole Kulche", diet: "veg", protein: 18, time: 45, items: ["Amritsari chole|chole", "Boondi raita|raita", "Tawa kulcha|kulcha", "Onion salad|salad"], tip: "Kulcha dough is just atta-maida with curd — rest it 30 minutes." },
  { name: "Chilli Paneer & Fried Rice", diet: "veg", protein: 22, time: 35, items: ["Chilli paneer|chilliPaneer", "Hot garlic dal|dal", "Veg fried rice|riceYellow"], tip: "Use day-old rice for fried rice — it won't go mushy." },
  { name: "Achari Paneer Thali", diet: "veg", protein: 23, time: 40, items: ["Achari paneer|paneerRed", "Dal tadka|dal", "Phulka roti|roti", "Jeera rice|rice"], tip: "Fennel, mustard, kalonji, methi — the achaar spices do all the work." },
  { name: "Andhra Tomato Pappu", diet: "veg", protein: 15, time: 35, items: ["Tomato pappu|dalRed", "Spicy aloo fry|sabziYellow", "Steamed rice|rice", "Papad|papad"], tip: "Go generous on the red chilli and tamarind — that's the point." },
  { name: "Chicken Chettinad", diet: "nonveg", protein: 32, time: 50, items: ["Chettinad chicken|chicken", "Rasam dal|dalRed", "Phulka roti|roti", "Steamed rice|rice"], tip: "Dry-roast pepper, fennel and red chillies fresh — it makes the dish." },
  { name: "Egg Masala Fry", diet: "egg", protein: 20, time: 25, items: ["Egg masala fry|eggCurry", "Dal fry|dal", "Phulka roti|roti", "Steamed rice|rice"], tip: "Score the boiled eggs so the masala gets in." },
);
MEALS.dinner.push(
  { name: "Ragda Pattice", diet: "veg", protein: 15, time: 40, items: ["White peas ragda|chole", "Imli chutney|chutneyRed", "Hari chutney|chutneyGreen", "Aloo pattice|puri"], tip: "Pressure-cook the white peas with haldi; mash a few for body." },
  { name: "Chole Puri", diet: "veg", protein: 16, time: 45, items: ["Spicy chole|chole", "Dahi|dahi", "Aam ka achaar|achaar", "Puri|puri"], tip: "Mix a spoon of sooji into puri dough so they stay puffed." },
  { name: "Chilli Chicken & Roti", diet: "nonveg", protein: 30, time: 35, items: ["Chilli chicken|chilliChicken", "Dal fry|dal", "Phulka roti|roti"], tip: "Cornflour-coat and pan-fry — no deep frying needed." },
  { name: "Mirchi ka Salan & Dal", diet: "veg", protein: 14, time: 40, items: ["Mirchi ka salan|mirchiSalan", "Dal tadka|dal", "Phulka roti|roti", "Jeera rice|rice"], tip: "Use big bhavnagri chillies — flavour without killing anyone." },
  { name: "Masala Pav Bhaji Night", diet: "veg", protein: 16, time: 40, items: ["Paneer pav bhaji|pavBhaji", "Butter pav|pav", "Onion & lemon|salad"], tip: "Grate some paneer on top — instant protein." },
);

// Cravings. "quick" (≤20 min) and "protein" (≥20g) are worked out automatically.
window.MOODS = {
  chatpata: { label: "Chatpata", words: ["chatpata", "chatpati", "chat pata", "chatpate", "chaat", "chat", "tangy", "khatta", "khatti", "street", "tasty", "zesty", "sour"] },
  spicy: { label: "Spicy", words: ["spicy", "teekha", "tikha", "teekhi", "tikhi", "mirchi", "mirch", "hot", "fiery", "masaledar", "jhaal", "spice"] },
  light: { label: "Light", words: ["light", "halka", "halki", "healthy", "simple", "sick", "diet", "easy on", "not heavy"] },
  comfort: { label: "Comfort", words: ["comfort", "ghar ka", "cozy", "cosy", "sukoon", "homely", "mood off", "sad", "rainy", "baarish"] },
  quick: { label: "Quick", words: ["quick", "jaldi", "fast", "lazy", "tired", "thaka", "instant", "short", "15 min", "10 min"] },
  protein: { label: "High protein", words: ["protein", "gym", "workout", "muscle", "gains", "fitness"] },
};

(function () {
  const F = {
    // breakfast
    "Paneer Besan Chilla": ["spicy"], "Peanut Poha & Sprouts": ["chatpata"], "Idli Sambar": ["chatpata", "light"],
    "Pesarattu (Moong Dosa)": ["spicy"], "Sprouts Chaat & Milk": ["chatpata", "light"], "Paneer Sandwich": ["chatpata"],
    "Egg Bhurji & Toast": ["spicy"], "Masala Omelette": ["spicy"], "Poha with Boiled Eggs": ["chatpata"],
    "Moong Dal Chilla": ["light"], "Vegetable Upma": ["light"], "Masala Oats & Curd": ["light"], "Vegetable Daliya": ["light"],
    "Aloo Paratha & Curd": ["comfort"], "Paneer Paratha": ["comfort"], "Methi Thepla & Curd": ["comfort"],
    "Misal Pav": ["spicy", "chatpata"], "Chana Chaat Bowl": ["chatpata", "light"], "Paneer Bhurji Pav": ["spicy", "chatpata"], "Mumbai Anda Bhurji Pav": ["spicy", "chatpata"],
    // lunch
    "Rajma Chawal": ["comfort"], "Lobia Curry": ["light"], "Palak Paneer Thali": ["light"], "Chole with Roti": ["spicy", "chatpata"], "Dal Tadka Thali": ["comfort"], "Kadhi Chawal": ["chatpata", "comfort"],
    "Soya Chunks Curry": ["spicy"], "Moong Dal & Lauki": ["light"], "Dal Makhani Thali": ["comfort"], "Sambar Rice & Poriyal": ["chatpata", "light"],
    "Masoor Dal & Baingan Bharta": ["spicy"], "Kala Chana & Jeera Rice": ["spicy"], "Egg Curry & Rice": ["spicy"],
    "Home-style Chicken Curry": ["spicy", "comfort"], "Fish Curry Rice": ["spicy", "chatpata"], "Keema Matar": ["spicy"],
    "Pav Bhaji": ["chatpata", "spicy"], "Amritsari Chole Kulche": ["chatpata", "spicy"], "Chilli Paneer & Fried Rice": ["spicy", "chatpata"],
    "Achari Paneer Thali": ["chatpata", "spicy"], "Andhra Tomato Pappu": ["spicy", "chatpata"], "Chicken Chettinad": ["spicy"], "Egg Masala Fry": ["spicy"],
    // dinner
    "Moong Dal Khichdi": ["light", "comfort"], "Dal Palak & Roti": ["light"], "Tawa Paneer Tikka": ["spicy", "chatpata"], "Soya Bhurji Rolls": ["spicy", "chatpata"],
    "Chana Masala & Roti": ["spicy", "chatpata"], "Daliya Khichdi": ["light", "comfort"], "Mixed Dal & Lauki": ["light"], "Moong Usal": ["chatpata", "spicy"],
    "Rajma & Roti": ["comfort"], "Kadhai Paneer & Dal": ["spicy"], "Methi Thepla & Dal": ["light", "comfort"], "Egg Bhurji & Dal": ["spicy"],
    "Egg Curry & Roti": ["spicy", "comfort"], "Tawa Chicken & Roti": ["spicy"], "Chicken Shorba & Sabzi": ["light", "comfort"], "Tawa Fish & Dal": ["spicy", "chatpata"],
    "Ragda Pattice": ["chatpata"], "Chole Puri": ["chatpata", "spicy"], "Chilli Chicken & Roti": ["spicy", "chatpata"], "Mirchi ka Salan & Dal": ["spicy"],
    "Masala Pav Bhaji Night": ["chatpata", "spicy"],
  };
  Object.values(MEALS).flat().forEach((m) => (m.moods = F[m.name] || []));
})();
