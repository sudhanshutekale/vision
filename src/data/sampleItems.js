// Rich sample waste items with photographic SVG illustrations, LCA carbon accounting, and disposal instructions

export const SAMPLE_ITEMS = [
  {
    id: 'plastic-bottle',
    name: 'PET Water Bottle (500ml)',
    category: 'Plastic',
    materialCode: 'PET #1',
    confidence: 98.7,
    bin: {
      type: 'blue',
      name: 'Blue Recycling Bin',
      color: 'bg-blue-600',
      border: 'border-blue-500',
      text: 'text-blue-400',
      lightBg: 'bg-blue-50',
      lightText: 'text-blue-700',
      description: 'Accepted in municipal single-stream recycling'
    },
    boundingBox: { x: 25, y: 12, width: 50, height: 76 },
    imageUrl: 'https://images.unsplash.com/photo-1562077772-3b12ab8ba990?w=600&auto=format&fit=crop&q=80',
    fallbackSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <defs>
        <linearGradient id="petGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8"/>
          <stop offset="50%" stop-color="#0284c7" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#0369a1" stop-opacity="0.9"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="16" fill="#0b1e17"/>
      <!-- Bottle neck and cap -->
      <rect x="90" y="24" width="20" height="12" rx="2" fill="#3b82f6"/>
      <rect x="88" y="36" width="24" height="6" fill="#60a5fa"/>
      <!-- Bottle body -->
      <path d="M88 42 L80 65 L76 150 C76 162 84 172 100 172 C116 172 124 162 124 150 L120 65 L112 42 Z" fill="url(#petGrad)" stroke="#38bdf8" stroke-width="2"/>
      <!-- Label -->
      <rect x="77" y="90" width="46" height="36" rx="2" fill="#0284c7" fill-opacity="0.5" stroke="#38bdf8" stroke-width="1"/>
      <line x1="83" y1="102" x2="117" y2="102" stroke="#e0f2fe" stroke-width="2" stroke-linecap="round"/>
      <line x1="83" y1="112" x2="108" y2="112" stroke="#bae6fd" stroke-width="1.5" stroke-linecap="round"/>
      <!-- Highlights -->
      <path d="M82 70 L79 145" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-opacity="0.6"/>
    </svg>`,
    instructions: [
      'Empty any residual liquid completely into the sink.',
      'Lightly crush or flatten the bottle to optimize collection truck volume.',
      'Leave the cap screwed ON (modern MRF optical sorters capture caps when attached to bottles).',
      'Deposit in your curbside Blue Recycling Bin.'
    ],
    prepTip: 'Do NOT remove the bottle cap. Recyclers prefer caps attached so they do not fall through sorting screens!',
    impact: {
      co2SavedKg: 0.063, // 63 grams CO2e saved per bottle
      waterSavedLiters: 3.8,
      energySavedKwh: 0.38,
      treesEquivalent: 0.003
    },
    assumptions: {
      itemWeight: '24.5 grams (typical empty 500ml water bottle)',
      virginEmissionsFactor: '2.57 kg CO₂e / kg virgin PET pellet',
      recycledEmissionsFactor: '0.62 kg CO₂e / kg recycled rPET flake',
      avoidedEmissionsRatio: '1.95 kg CO₂e net savings per kg recycled PET',
      waterSavingsFactor: '155 liters of process water saved per kg recycled PET',
      energySavingsFactor: '15.5 kWh saved per kg recycled polymer compared to petrochemical synthesis',
      source: 'EPA Waste Reduction Model (WARM v15.1) & APR 2023 Postconsumer Resin LCA',
      confidenceLevel: 'High (±6%) across standard European & North American single-stream facilities'
    }
  },
  {
    id: 'banana-peel',
    name: 'Organic Banana Peel',
    category: 'Organic',
    materialCode: 'Biodegradable Compostable',
    confidence: 99.4,
    bin: {
      type: 'green',
      name: 'Green Compost Bin',
      color: 'bg-emerald-600',
      border: 'border-emerald-500',
      text: 'text-emerald-400',
      lightBg: 'bg-emerald-50',
      lightText: 'text-emerald-700',
      description: 'Diverted to municipal compost or residential heap'
    },
    boundingBox: { x: 20, y: 18, width: 60, height: 64 },
    imageUrl: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=600&auto=format&fit=crop&q=80',
    fallbackSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <defs>
        <linearGradient id="bananaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#facc15"/>
          <stop offset="50%" stop-color="#eab308"/>
          <stop offset="100%" stop-color="#ca8a04"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="16" fill="#0b1e17"/>
      <path d="M100 25 C102 38 98 48 92 60 C80 82 52 110 50 145 C48 165 65 178 88 175 C115 172 135 142 145 115 C155 90 152 55 138 35 L120 45 C130 65 132 95 125 120 C118 140 102 158 85 158 C72 158 68 148 68 135 C70 110 92 85 105 65 C112 52 112 35 108 25 Z" fill="url(#bananaGrad)" stroke="#a16207" stroke-width="2"/>
      <!-- Brown stem & tips -->
      <path d="M100 25 L108 25 L105 35 L98 35 Z" fill="#713f12"/>
      <circle cx="86" cy="120" r="3" fill="#854d0e"/>
      <circle cx="110" cy="95" r="2.5" fill="#854d0e"/>
    </svg>`,
    instructions: [
      'Remove non-organic PLU fruit stickers or rubber bands before tossing.',
      'Place in food waste caddy or curbside green compost bin.',
      'If home composting, chop into 2-3 pieces to accelerate microbial breakdown.',
      'Can be composted with backyard worms (vermicomposting) safely.'
    ],
    prepTip: 'Always peel off the small plastic produce sticker! Those micro-stickers contaminate municipal finished compost.',
    impact: {
      co2SavedKg: 0.125, // Prevents 125g CO2e methane emissions in landfill
      waterSavedLiters: 1.2,
      energySavedKwh: 0.15,
      treesEquivalent: 0.006
    },
    assumptions: {
      itemWeight: '118 grams (average Cavendish banana peel weight)',
      virginEmissionsFactor: '0.98 kg CO₂e / kg food waste anaerobically decaying in landfill (CH₄ conversion)',
      recycledEmissionsFactor: '-0.08 kg CO₂e / kg (aerobic composting carbon sequestration credit)',
      avoidedEmissionsRatio: '1.06 kg CO₂e net avoided methane emissions per kg organic waste composted',
      waterSavingsFactor: 'Moisture conservation in enriched soil structure',
      energySavingsFactor: 'Displaces energy-intensive synthetic nitrogen fertilizer synthesis',
      source: 'Project Drawdown - Composting Solutions & IPCC 2019 Refinement to National GHG Inventories',
      confidenceLevel: 'Very High (±5%) based on 100-year GWP methane equivalence of 28x CO₂'
    }
  },
  {
    id: 'aa-battery',
    name: 'Spent AA Alkaline Battery',
    category: 'Hazardous',
    materialCode: 'E-Waste / Hazardous',
    confidence: 97.9,
    bin: {
      type: 'red',
      name: 'Hazardous / E-Waste Drop-off',
      color: 'bg-red-600',
      border: 'border-red-500',
      text: 'text-red-400',
      lightBg: 'bg-red-50',
      lightText: 'text-red-700',
      description: 'DO NOT place in normal trash. Drop off at designated collection point.'
    },
    boundingBox: { x: 30, y: 15, width: 40, height: 70 },
    imageUrl: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=600&auto=format&fit=crop&q=80',
    fallbackSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <defs>
        <linearGradient id="battGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#f59e0b"/>
          <stop offset="25%" stop-color="#fbbf24"/>
          <stop offset="50%" stop-color="#1f2937"/>
          <stop offset="100%" stop-color="#111827"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="16" fill="#0b1e17"/>
      <!-- Terminal Nub -->
      <rect x="94" y="30" width="12" height="8" rx="2" fill="#9ca3af"/>
      <!-- Battery Body -->
      <rect x="76" y="38" width="48" height="128" rx="6" fill="url(#battGrad)" stroke="#ef4444" stroke-width="2"/>
      <!-- Danger icon -->
      <path d="M100 80 L108 95 L92 95 Z" fill="#ef4444"/>
      <rect x="99" y="102" width="2" height="18" fill="#f87171"/>
      <circle cx="100" cy="126" r="1.5" fill="#f87171"/>
      <!-- Plus sign -->
      <path d="M96 55 H104 M100 51 V59" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
    instructions: [
      'Tape terminal ends with clear tape to prevent accidental electrical short-circuits.',
      'Never toss in residential trash or blue recycling bins (causes MRF and truck fires!).',
      'Store in a cool, dry plastic container until ready for drop-off.',
      'Drop off at hardware stores (Home Depot, Best Buy), recycling depots, or municipal e-waste days.'
    ],
    prepTip: 'Apply a small piece of masking or scotch tape over both positive (+) and negative (-) terminals before storing.',
    impact: {
      co2SavedKg: 0.185, // Toxic heavy metal & virgin zinc recovery
      waterSavedLiters: 14.5,
      energySavedKwh: 0.82,
      treesEquivalent: 0.009
    },
    assumptions: {
      itemWeight: '23 grams (standard LR6 AA alkaline battery)',
      virginEmissionsFactor: '8.4 kg CO₂e / kg virgin mined battery precursor metals (Zinc, Manganese dioxide, Steel)',
      recycledEmissionsFactor: '0.35 kg CO₂e / kg secondary hydrometallurgical recovery',
      avoidedEmissionsRatio: '8.05 kg CO₂e avoided per kg recovered battery mass',
      waterSavingsFactor: 'Prevents groundwater heavy metal leach contamination (up to 400 liters of soil aquifer saved)',
      energySavingsFactor: 'Avoids deep thermal smelting required for primary zinc extraction',
      source: 'Call2Recycle Annual LCA & European Battery Directive Environmental Assessment',
      confidenceLevel: 'High (±8%)'
    }
  },
  {
    id: 'cardboard-box',
    name: 'Corrugated Shipping Box',
    category: 'Paper',
    materialCode: 'PAP #20 (Corrugated)',
    confidence: 99.1,
    bin: {
      type: 'blue',
      name: 'Blue Recycling Bin',
      color: 'bg-blue-600',
      border: 'border-blue-500',
      text: 'text-blue-400',
      lightBg: 'bg-blue-50',
      lightText: 'text-blue-700',
      description: 'Standard Paper & Cardboard Recycling'
    },
    boundingBox: { x: 18, y: 16, width: 64, height: 68 },
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80',
    fallbackSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <defs>
        <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#b45309"/>
          <stop offset="50%" stop-color="#92400e"/>
          <stop offset="100%" stop-color="#78350f"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="16" fill="#0b1e17"/>
      <!-- Isometric cardboard box -->
      <polygon points="100,45 160,75 100,105 40,75" fill="#d97706" stroke="#b45309" stroke-width="1.5"/>
      <polygon points="40,75 100,105 100,165 40,135" fill="#b45309" stroke="#78350f" stroke-width="1.5"/>
      <polygon points="160,75 100,105 100,165 160,135" fill="#92400e" stroke="#78350f" stroke-width="1.5"/>
      <!-- Tape line -->
      <line x1="70" y1="60" x2="130" y2="90" stroke="#fef3c7" stroke-width="3" stroke-dasharray="4,2"/>
    </svg>`,
    instructions: [
      'Remove any styrofoam blocks, bubble wrap, or plastic air pillows inside.',
      'Packing tape is okay to leave on, but peeling thick plastic tape helps fiber recovery.',
      'Flatten the box completely before placing in the bin to save truck payload volume.',
      'Keep dry! Wet cardboard cannot be processed by optical paper sorters.'
    ],
    prepTip: 'Flatten boxes flat! An unflattened box takes up 5x more bin space and jams collection arm compactors.',
    impact: {
      co2SavedKg: 0.42, // 420g CO2e saved
      waterSavedLiters: 9.6,
      energySavedKwh: 1.15,
      treesEquivalent: 0.021
    },
    assumptions: {
      itemWeight: '320 grams (medium shipping package)',
      virginEmissionsFactor: '1.78 kg CO₂e / kg virgin kraft wood pulp',
      recycledEmissionsFactor: '0.47 kg CO₂e / kg recycled cardboard pulp',
      avoidedEmissionsRatio: '1.31 kg CO₂e avoided per kg recovered fiber',
      waterSavingsFactor: '30 liters water saved per kg recycled paper vs chemical wood digestion',
      energySavingsFactor: '3.6 kWh saved per kg pulp fiber recycled vs virgin forest harvest',
      source: 'American Forest & Paper Association (AF&PA) 2022 Environmental Report',
      confidenceLevel: 'High (±5%)'
    }
  },
  {
    id: 'glass-jar',
    name: 'Clear Glass Food Jar (Sauce/Jam)',
    category: 'Glass',
    materialCode: 'GL #70 (Colorless Glass)',
    confidence: 98.2,
    bin: {
      type: 'blue',
      name: 'Blue Recycling Bin',
      color: 'bg-blue-600',
      border: 'border-blue-500',
      text: 'text-blue-400',
      lightBg: 'bg-blue-50',
      lightText: 'text-blue-700',
      description: 'Accepted indefinitely in glass recycling streams'
    },
    boundingBox: { x: 26, y: 16, width: 48, height: 68 },
    imageUrl: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=600&auto=format&fit=crop&q=80',
    fallbackSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <defs>
        <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#a7f3d0" stop-opacity="0.8"/>
          <stop offset="50%" stop-color="#34d399" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#059669" stop-opacity="0.8"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="16" fill="#0b1e17"/>
      <!-- Metal lid -->
      <rect x="74" y="42" width="52" height="14" rx="3" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
      <!-- Glass body -->
      <rect x="70" y="58" width="60" height="95" rx="10" fill="url(#glassGrad)" stroke="#6ee7b7" stroke-width="2"/>
      <!-- Reflection highlight -->
      <path d="M78 68 L78 140" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-opacity="0.7"/>
      <circle cx="100" cy="105" r="15" fill="#10b981" fill-opacity="0.2"/>
    </svg>`,
    instructions: [
      'Quick rinse with warm water to remove sticky food or oil residues.',
      'No need to peel off the paper label — it burns off harmlessly in the 1,500°C furnace.',
      'Separate metal lid and drop both in the recycling bin (metal and glass are sorted magnetically).',
      'Glass can be recycled indefinitely with zero loss in purity or strength!'
    ],
    prepTip: 'A quick rinse is enough — no need to run it through the dishwasher, which wastes clean water.',
    impact: {
      co2SavedKg: 0.16, // 160g CO2e saved
      waterSavedLiters: 2.4,
      energySavedKwh: 0.44,
      treesEquivalent: 0.008
    },
    assumptions: {
      itemWeight: '260 grams (standard glass salsa or jam jar)',
      virginEmissionsFactor: '0.85 kg CO₂e / kg virgin soda-lime glass container',
      recycledEmissionsFactor: '0.24 kg CO₂e / kg cullet glass remelt',
      avoidedEmissionsRatio: '0.61 kg CO₂e net savings per kg recycled glass cullet',
      waterSavingsFactor: '9.2 liters water saved per kg cullet melted',
      energySavingsFactor: '1.7 kWh energy saved per kg remelted cullet vs calcining raw silica sand',
      source: 'Glass Packaging Institute (GPI) Cradle-to-Cradle Complete LCA',
      confidenceLevel: 'High (±6%)'
    }
  }
];

export const INITIAL_USER_HISTORY = [
  {
    id: 'hist-1',
    name: 'PET Water Bottle (500ml)',
    category: 'Plastic',
    binType: 'blue',
    co2SavedKg: 0.063,
    waterSavedLiters: 3.8,
    energySavedKwh: 0.38,
    timestamp: '2 hours ago'
  },
  {
    id: 'hist-2',
    name: 'Corrugated Shipping Box',
    category: 'Paper',
    binType: 'blue',
    co2SavedKg: 0.42,
    waterSavedLiters: 9.6,
    energySavedKwh: 1.15,
    timestamp: 'Yesterday'
  },
  {
    id: 'hist-3',
    name: 'Organic Banana Peel',
    category: 'Organic',
    binType: 'green',
    co2SavedKg: 0.125,
    waterSavedLiters: 1.2,
    energySavedKwh: 0.15,
    timestamp: '2 days ago'
  },
  {
    id: 'hist-4',
    name: 'Spent AA Alkaline Battery',
    category: 'Hazardous',
    binType: 'red',
    co2SavedKg: 0.185,
    waterSavedLiters: 14.5,
    energySavedKwh: 0.82,
    timestamp: '3 days ago'
  }
];

export const BADGES_LIST = [
  {
    id: 'first-scan',
    title: 'First Sort',
    description: 'Classified your first waste item',
    icon: 'Sparkles',
    unlockedAt: 1
  },
  {
    id: 'plastic-buster',
    title: 'Plastic Buster',
    description: 'Kept polymers out of marine ecosystems',
    icon: 'ShieldCheck',
    unlockedAt: 3
  },
  {
    id: 'climate-champ',
    title: 'Climate Champion',
    description: 'Saved over 1.0 kg of equivalent CO₂',
    icon: 'Flame',
    unlockedAt: 5
  },
  {
    id: 'hazard-hero',
    title: 'Zero-Contamination Hero',
    description: 'Properly routed hazardous materials & e-waste',
    icon: 'Award',
    unlockedAt: 7
  }
];
