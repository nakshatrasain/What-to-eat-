# Aaj Kya Khaayein? 🍛

A simple app that tells you what to eat, so you can stop overthinking and start eating.

Pick **Breakfast**, **Lunch** or **Dinner** and get three balanced, made-at-home Indian meal options, each with an illustrated thali. Don't like them? Hit **Regenerate** (or press `R`).

- **Balanced by default.** Lunch and dinner are built around dal + roti/rice, and every option shows its protein (per person, approximate). The highest-protein option gets the "Most protein" spot.
- **Home-cookable only.** Everyday ingredients, with a kitchen tip for each dish.
- **Veg / + Egg / Everything** preference, remembered on your device.
- **Yap to it.** Tap the mic (or type) and say what you're craving, in English or Hinglish: *"kuch chatpata for dinner"*, *"something spicy"*, *"halka khana tonight"*, *"paneer for lunch"*. Or tap a craving chip: Chatpata, Spicy, Light, Comfort, Quick, High protein.
- **It remembers your dishes.** Say *"add Malai Kofta to your memory"* and it joins the rotation, served with dal and roti/rice so the plate stays balanced. *"Malai Kofta hata do"* removes it. Saved on your device.
- **A little game:** lock in a meal for confetti, fill "Today's plate" for all three meals, close the 60g daily protein ring, and keep your streak going.

## Run it

It's plain HTML/CSS/JS with no build step. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

To host it for free, enable **GitHub Pages** on this repo (Settings → Pages → deploy from branch, root folder).

## Files

- `css/tokens.css`: design tokens (colours, type, spacing, radius, shadows, motion)
- `css/app.css`: components and layout
- `js/meals.js`: the meal library. Add your family's favourites here
- `js/plate.js`: procedural top-down thali illustrations
- `js/app.js`: app logic, including voice and the Hinglish craving parser
