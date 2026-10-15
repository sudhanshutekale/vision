# VisionSort — AI Waste Identification & Smart Disposal Assistant

> **Point. Snap. Sort.**
> A modern eco-tech web application that turns any smartphone or web camera into an instant AI waste auditor, classifies materials, recommends certified disposal methods, and calculates transparent Life Cycle Assessment (LCA) environmental savings.

Built with **React**, **Vite**, **Tailwind CSS**, **Framer Motion**, **Lucide Icons**, and **Recharts**.

---

## 🌟 Key Highlights & Features

1. **Centerpiece AI Waste Scanner**:
   - **Multi-Input**: Supports drag-and-drop file upload, file browsing, and live browser camera streaming (`navigator.mediaDevices.getUserMedia`).
   - **One-Click Presets**: 5 realistic sample materials (PET #1 Plastic Bottle, Organic Banana Peel, Spent AA Battery, Corrugated Cardboard, Glass Food Jar).
   - **Realistic Scanning Experience**: High-tech laser sweep animation, target reticle with dynamic bounding boxes, multi-phase inference progress, and synthesized Web Audio chime feedback.
   - **Clear Sorting Guidance**: Instant color-coded bin recommendations (Blue = Recycling, Green = Organics, Red = Hazardous / E-Waste, Black = Landfill), step-by-step prep instructions, and crucial prep tips.

2. **Transparent Environmental Impact & LCA Math Engine**:
   - Immediate metrics: **CO₂e avoided (g/kg)**, **freshwater saved (liters)**, **energy preserved (kWh)**, and **tree-days offset**.
   - **Open Methodology Accordion**: Displays the exact cradle-to-gate factors, assumed item mass, virgin synthesis footprint, secondary recycling coefficient, net avoided ratios, and scientific citations (EPA WARM v15.1, APR, Project Drawdown). No black box calculations!

3. **Gamified "My Impact" Dashboard**:
   - Persistent sorting tracker stored in `localStorage`.
   - **Recharts Visualizations**: Donut chart of circular material streams and a weekly carbon abatement bar chart.
   - **Tangible Equivalencies**: Urban pine tree absorption, gasoline car km avoided, 10W LED bulb illumination hours, and smartphone recharges.
   - **Achievement Badges**: *First Sort*, *Plastic Buster*, *Climate Champion*, and *Zero-Contamination Hero*.

4. **Eco-Tech Aesthetics & Dark/Light Theme**:
   - Deep forest greens, glowing emerald and lime accents (`#10e283`, `#a3e635`), glassmorphism cards, and Space Grotesk / Inter typography.
   - Instant Dark / Light mode toggle with full contrast compliance.

---

## 📂 Project Architecture

```
rohit-bhau/
├── index.html                     # HTML5 shell, SEO tags, Google Fonts
├── package.json                   # Dependencies & scripts
├── tailwind.config.js             # Eco-tech color tokens, animations & glow effects
├── postcss.config.js              # PostCSS plugins
├── public/
│   └── favicon.svg                # Custom glowing vector scanner icon
├── src/
│   ├── main.jsx                   # React root entrypoint
│   ├── App.jsx                    # Core state machine (history, dark mode, audio)
│   ├── index.css                  # Tailwind directives, glassmorphism utilities
│   ├── data/
│   │   └── sampleItems.js         # Curated items, LCA factors, and badge specs
│   ├── services/
│   │   └── wasteClassifier.js     # Unified classifier service (Mock + Gemini Vision)
│   ├── utils/
│   │   └── audio.js               # Synthesized Web Audio scan effects
│   └── components/
│       ├── Navbar.jsx             # Sticky navigation, audio & theme toggles, modal button
│       ├── Hero.jsx               # Headline, value prop, animated phone scan mockup
│       ├── WasteScanner.jsx       # Centerpiece optical scanner, webcam & sample bar
│       ├── EnvironmentalImpact.jsx# Transparent LCA counters & methodology accordion
│       ├── ImpactDashboard.jsx    # Recharts data analytics & gamified badges
│       ├── HowItWorks.jsx         # 3-step interactive timeline
│       ├── WhySortingMatters.jsx  # 4 high-impact statistical insight cards
│       ├── ApiKeyModal.jsx        # Optional Google Gemini Vision API configuration
│       └── Footer.jsx             # Hackathon credits, methodology citations
└── README.md                      # Documentation & Judge Demo Script
```

---

## 🔌 Plugging in a Live Google Gemini Vision API Key

VisionSort comes with an **intelligent, zero-dependency edge simulation engine** out of the box, ensuring that demos, preset samples, and offline runs always work reliably.

If you or the judges wish to test live classification on arbitrary real-world photos using Google's vision models:

1. Click the **"Vision API"** key icon button in the top navigation bar.
2. Enter your Google Gemini API Key (e.g. from [Google AI Studio](https://aistudio.google.com/app/apikey)).
3. Click **"Save Configuration"**.
4. The service layer (`src/services/wasteClassifier.js`) will automatically switch from simulation mode to calling `gemini-1.5-flash:generateContent` with structured JSON output enforcing waste category, bin type, prep tips, and EPA LCA estimates.
5. Keys are strictly kept inside your browser's `localStorage` and never transmitted to external servers.

---

## 🚀 Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🎙️ Short Demo Script for Judges (2-3 Minutes)

> **Speaker**: "Judges, meet **VisionSort** — the AI waste identification assistant that turns confusing recycling rules into instant, verified climate action."

1. **The Problem (Why It Matters)**:
   - *"Over 91% of plastic ever produced has ended up in landfills or nature. Why? Because consumer recycling is plagued by confusion and contamination."*
2. **Hero & First Impression**:
   - Scroll through the hero with the animated phone scanning mockup. *"Point. Snap. Sort. VisionSort requires no app download and runs right in any modern mobile or desktop browser."*
3. **The Live Demo**:
   - Click on the **PET Water Bottle** sample.
   - Point out the laser sweep, real-time bounding box, and the audio chime on completion.
   - Show the result card: *"Notice how VisionSort identifies the resin code (PET #1), routes it to the Curbside Blue Bin, and provides a crucial prep tip: Keep the cap on so it doesn't get lost in sorting screens."*
   - Try the **Banana Peel** (Green Compost) and **AA Battery** (Hazardous Red drop-off) to demonstrate multi-stream versatility.
4. **Transparent LCA Accounting (Never a Black Box)**:
   - Scroll to the **Environmental Impact** panel.
   - Open the **"Transparent LCA Assumptions & Math Engine"** accordion:
     *"Most eco-apps show generic carbon numbers without explaining where they come from. VisionSort openly publishes the exact item weight, virgin vs. recycled emission factors from EPA WARM v15, and uncertainty margins."*
5. **My Impact & Habit Formation**:
   - Click **"Log to My Impact"** to show the confetti celebration.
   - Review the Recharts donut breakdown, cumulative carbon bar graph, and unlocked badges like *Plastic Buster*.
6. **Closing**:
   - *"With VisionSort, every citizen becomes an accurate sorter, cities reduce contamination costs, and every diverted item contributes to verifiable carbon reduction."*

---

## 📜 Scientific References & Citations

- **EPA WARM (Waste Reduction Model v15.1)**: [https://www.epa.gov/warm](https://www.epa.gov/warm)
- **Association of Plastic Recyclers (APR) 2023 Postconsumer Resin LCA**: [https://plasticsrecycling.org](https://plasticsrecycling.org)
- **IPCC 2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories**: [https://www.ipcc.ch](https://www.ipcc.ch)
- **Project Drawdown (Composting Solutions)**: [https://drawdown.org](https://drawdown.org)
