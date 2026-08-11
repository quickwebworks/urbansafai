// =============================================================================
// Urban Safai - Services Data (20 Cleaning Services)
// =============================================================================

import type { Service } from "./types";

export const services: Service[] = [
  {
    id: "home-deep-cleaning",
    slug: "home-deep-cleaning",
    name: "Home Deep Cleaning",
    description:
      "Our home deep cleaning service goes beyond everyday tidying to deliver a thorough, top-to-bottom refresh of your entire home. Our trained professionals use industry-grade equipment and eco-friendly cleaning solutions to tackle stubborn grime, hard water stains, dust buildup, and hidden germs in every corner of your house. Whether you're preparing for a festival, hosting guests, or simply want a spotless living space, our deep cleaning service leaves your home looking and smelling brand new. We cover every room — kitchens, bathrooms, bedrooms, and living areas — with meticulous attention to detail.",
    shortDescription:
      "Complete top-to-bottom home deep cleaning with eco-friendly products and professional equipment.",
    icon: "Home",
    price: "₹2,499 – ₹3,499",
    priceUnit: "per session (2BHK/3BHK)",
    features: [
      "Deep clean all rooms including kitchen and bathrooms",
      "Remove stubborn stains and hard water deposits",
      "Dust and wipe all surfaces, fans, and light fixtures",
      "Vacuum and mop all flooring throughout the home",
      "Clean doors, windows, and window grills",
      "Sanitize high-touch surfaces and switch plates",
      "Remove cobwebs from ceilings and corners",
      "Eco-friendly, child-safe cleaning products used",
    ],
    category: "cleaning",
    faq: [
      {
        question: "How long does a home deep cleaning session take?",
        answer:
          "A typical 2BHK deep cleaning session takes approximately 4–5 hours, while a 3BHK may take 6–7 hours depending on the condition of the home and any additional requirements.",
      },
      {
        question: "Do I need to provide any cleaning supplies?",
        answer:
          "No, our team arrives fully equipped with all necessary cleaning supplies and professional-grade equipment. You just need to ensure access to water and electricity.",
      },
    ],
  },
  {
    id: "kitchen-cleaning",
    slug: "kitchen-cleaning",
    name: "Kitchen Cleaning",
    description:
      "The kitchen is the heart of every Indian home, and keeping it spotless is essential for your family's health. Our specialised kitchen cleaning service targets grease buildup on chimneys and stovetops, removes limescale from sinks and taps, degreases cabinet exteriors, and sanitises countertops thoroughly. We use food-safe degreasers and disinfectants so your cooking space remains hygienic and chemical-residue free. From scrubbing the backsplash tiles to cleaning inside the microwave and OTG, no corner of your kitchen is left untouched.",
    shortDescription:
      "Specialised kitchen degreasing, sanitisation, and deep cleaning for a hygienic cooking space.",
    icon: "ChefHat",
    price: "₹1,099 – ₹2,499",
    priceUnit: "Standard / Regular / Detailed",
    features: [
      "Degrease chimney, exhaust fan, and stovetop thoroughly",
      "Scrub and sanitise kitchen sink and tap fixtures",
      "Clean cabinet exteriors, handles, and drawer fronts",
      "Wipe down all countertops and backsplash tiles",
      "Clean inside microwave, OTG, and small appliances",
      "Remove stains from kitchen walls and floor tiles",
      "Disinfect cutting boards, utensil holders, and racks",
      "Deodorise the kitchen to remove cooking odours",
    ],
    category: "cleaning",
    faq: [
      {
        question: "What is the difference between Standard, Regular, and Detailed kitchen cleaning?",
        answer:
          "Standard covers basic surface cleaning and stovetop degreasing. Regular adds cabinet exterior cleaning, backsplash scrubbing, and appliance exterior wipe-down. Detailed includes all of the above plus interior appliance cleaning, deep tile grout scrubbing, and full odour removal treatment.",
      },
      {
        question: "Is the cleaning products used safe around food?",
        answer:
          "Yes, all products used in our kitchen cleaning service are food-safe, non-toxic, and eco-friendly. We ensure no harmful chemical residue is left on any food-contact surfaces.",
      },
    ],
  },
  {
    id: "bathroom-cleaning",
    slug: "bathroom-cleaning",
    name: "Bathroom Cleaning",
    description:
      "Bathrooms are breeding grounds for mold, mildew, and harmful bacteria if not cleaned properly. Our bathroom cleaning service uses powerful yet safe descaling agents to remove hard water stains from tiles, taps, and showerheads, while effectively eliminating soap scum, mould patches, and grout discolouration. We scrub every surface — from the toilet bowl and basin to the shower enclosure and floor drain — leaving your bathroom sparkling clean and fresh-smelling. Our sanitisation process ensures your bathroom is not just visually clean but genuinely hygienic.",
    shortDescription:
      "Professional bathroom deep cleaning with descaling, mould removal, and complete sanitisation.",
    icon: "Bath",
    price: "₹479 – ₹599",
    priceUnit: "per bathroom",
    features: [
      "Remove hard water stains from tiles, taps, and fixtures",
      "Scrub and descale toilet bowl, basin, and shower area",
      "Eliminate mould and mildew from grout lines and corners",
      "Clean and polish all chrome and glass surfaces",
      "Sanitise door handles, towel racks, and switches",
      "Unclog and clean floor drains and overflow pipes",
      "Apply anti-fungal treatment to prevent mould regrowth",
      "Deodorise bathroom for a lasting fresh fragrance",
    ],
    category: "cleaning",
    faq: [
      {
        question: "How many bathrooms can be cleaned in one session?",
        answer:
          "We can clean all bathrooms in your home in a single session. Each bathroom typically takes 45–60 minutes for a Detailed cleaning. Discounts are available for multiple bathrooms booked together.",
      },
      {
        question: "Do you remove hard water stains permanently?",
        answer:
          "Our descaling treatment significantly reduces hard water stains. For severe cases, we recommend periodic cleaning every 2–3 months to prevent buildup and keep your bathroom fixtures in top condition.",
      },
    ],
  },
  {
    id: "sofa-cleaning",
    slug: "sofa-cleaning",
    name: "Sofa Cleaning",
    description:
      "Your sofa is one of the most-used pieces of furniture in your home, accumulating dust mites, pet dander, food spills, and body oils over time. Our professional sofa cleaning service uses advanced extraction technology to deep-clean fabric, leather, and synthetic upholstery without causing damage. We pre-treat stains, agitate the fabric to lift embedded dirt, and extract moisture for quick drying. Whether it's a fabric 3-seater, a leather recliner, or a L-shaped sectional, our trained technicians restore your sofa's original look and freshness.",
    shortDescription:
      "Deep fabric and leather sofa cleaning with stain removal and quick-dry extraction technology.",
    icon: "Sofa",
    price: "₹159",
    priceUnit: "per seat",
    features: [
      "Pre-treat all visible stains and spots before cleaning",
      "Deep vacuum to remove embedded dust, dirt, and crumbs",
      "Agitate upholstery fibres to lift trapped contaminants",
      "Hot water extraction for thorough deep cleaning",
      "Safe for all fabric types including cotton, polyester, and leather",
      "Quick-dry technology minimises downtime to 2–3 hours",
      "Eliminate dust mites, allergens, and pet dander",
      "Deodorise upholstery for a fresh, clean scent",
    ],
    category: "cleaning",
    faq: [
      {
        question: "Is sofa cleaning safe for all types of upholstery?",
        answer:
          "Yes, our technicians are trained to identify fabric types and choose the appropriate cleaning method. We use gentle yet effective solutions for delicate fabrics like silk and velvet, and stronger degreasers for durable cotton and polyester.",
      },
      {
        question: "How long does the sofa take to dry after cleaning?",
        answer:
          "With our quick-dry extraction technology, most sofas are ready to use within 2–3 hours. We recommend keeping windows open or using a fan to speed up the drying process.",
      },
    ],
  },
  {
    id: "carpet-cleaning",
    slug: "carpet-cleaning",
    name: "Carpet Cleaning",
    description:
      "Carpets trap dust, allergens, bacteria, and odours deep within their fibres, making regular vacuuming insufficient for a truly clean home. Our professional carpet cleaning service employs hot water extraction and specialised shampooing techniques to penetrate deep into carpet fibres, removing embedded dirt, pet stains, food spills, and allergens. We handle all carpet types — from synthetic wall-to-wall carpets to hand-knotted woollen rugs — with care and expertise, restoring colour, texture, and freshness to your floor coverings.",
    shortDescription:
      "Professional carpet and rug deep cleaning with hot water extraction for allergen and stain removal.",
    icon: "Square",
    price: "₹548",
    priceUnit: "per carpet (up to 50 sq ft)",
    features: [
      "Hot water extraction for deep-down fibre cleaning",
      "Pre-spray treatment for stubborn stain penetration",
      "Remove pet hair, dander, and embedded allergens",
      "Deodorise carpet to eliminate trapped odours",
      "Groom carpet fibres to restore original texture",
      "Safe for woollen, synthetic, and blended carpets",
      "Quick-dry process — ready in 3–4 hours",
      "Spot treatment for high-traffic and stained areas",
    ],
    category: "cleaning",
    faq: [
      {
        question: "Can you remove old and set-in stains from carpets?",
        answer:
          "We can significantly reduce the appearance of most set-in stains, including tea, coffee, curry, and pet stains. While complete removal depends on the stain type and carpet material, our pre-treatment process delivers excellent results in most cases.",
      },
      {
        question: "How often should I get my carpets professionally cleaned?",
        answer:
          "We recommend professional carpet cleaning every 3–4 months for homes with pets or children, and every 6 months for regular households. High-traffic areas may need more frequent cleaning.",
      },
    ],
  },
  {
    id: "mattress-cleaning",
    slug: "mattress-cleaning",
    name: "Mattress Cleaning",
    description:
      "We spend a third of our lives on our mattresses, yet they are rarely cleaned properly. Over time, mattresses accumulate sweat, dead skin cells, dust mites, bacteria, and allergens that can cause respiratory issues and skin problems. Our mattress cleaning service uses UV sanitisation and deep extraction to eliminate these hidden contaminants, leaving your sleeping surface truly clean and hygienic. We clean all mattress types — foam, spring, coir, latex, and memory foam — helping you and your family sleep healthier and wake up fresher.",
    shortDescription:
      "UV sanitisation and deep extraction cleaning for all mattress types to eliminate dust mites and allergens.",
    icon: "BedDouble",
    price: "₹599 – ₹899",
    priceUnit: "Standard / King size",
    features: [
      "UV sanitisation to kill 99.9% of bacteria and germs",
      "Deep vacuum extraction for dust mite removal",
      "Pre-treat and remove sweat, urine, and blood stains",
      "Deodorise mattress to eliminate body odour trapped in foam",
      "Clean and sanitise pillow-top and memory foam layers",
      "Anti-allergen treatment for sensitive family members",
      "Safe for all mattress types — foam, spring, coir, and latex",
      "Quick-dry process — mattress ready same day",
    ],
    category: "cleaning",
    faq: [
      {
        question: "How often should a mattress be professionally cleaned?",
        answer:
          "We recommend professional mattress cleaning every 3–6 months. If anyone in the household suffers from allergies, asthma, or skin conditions, more frequent cleaning (every 2–3 months) is advisable.",
      },
      {
        question: "Will cleaning damage the foam or springs in my mattress?",
        answer:
          "No, our cleaning process uses low-moisture extraction that doesn't saturate the mattress. Your foam, springs, and internal structure remain completely safe throughout the process.",
      },
    ],
  },
  {
    id: "ac-cleaning",
    slug: "ac-cleaning",
    name: "AC Cleaning & Servicing",
    description:
      "A dirty air conditioner not only cools less efficiently but also circulates dust, mould spores, and bacteria throughout your room. Our AC cleaning and servicing includes thorough cleaning of filters, evaporator coils, condenser coils, drain pipes, and the indoor unit — improving cooling performance and air quality. Regular AC servicing also extends the lifespan of your unit and reduces electricity bills by up to 30%. Our trained technicians handle all brands including Daikin, Voltas, LG, Samsung, Blue Star, and more.",
    shortDescription:
      "Complete AC deep cleaning and servicing for improved cooling efficiency and air quality.",
    icon: "Snowflake",
    price: "₹499",
    priceUnit: "per unit (up to 1.5 ton)",
    features: [
      "Remove and wash air filters for maximum airflow",
      "Clean evaporator and condenser coils with chemical wash",
      "Clear drain pipe to prevent water leakage",
      "Wipe down and sanitise indoor unit body and louvers",
      "Check gas/refrigerant level and top up if needed",
      "Inspect electrical connections and thermostat function",
      "Clean outdoor unit fan and heat exchanger",
      "Improve cooling efficiency and reduce electricity bills",
    ],
    category: "cleaning",
    faq: [
      {
        question: "How often should I get my AC serviced?",
        answer:
          "We recommend AC servicing every 3–4 months for optimal performance. In Ludhiana's summer months (April–September), a pre-season service in March and a mid-season check in June is ideal.",
      },
      {
        question: "Do you handle both split and window AC units?",
        answer:
          "Yes, our technicians are trained to service all types of air conditioners including split ACs, window ACs, cassette units, and portable ACs from all major brands.",
      },
    ],
  },
  {
    id: "fridge-cleaning",
    slug: "fridge-cleaning",
    name: "Fridge Cleaning",
    description:
      "Your refrigerator stores your family's food, making its cleanliness directly tied to your health. Our fridge cleaning service involves completely emptying, defrosting, scrubbing, and sanitising the interior — including shelves, drawers, door compartments, and the freezer section. We remove stubborn food spills, eliminate unpleasant odours, and clean the rubber gasket seals and condenser coils at the back. After our service, your fridge not only looks spotless but also runs more efficiently, keeping your food fresher for longer.",
    shortDescription:
      "Complete interior and exterior fridge deep cleaning, defrosting, and odour elimination.",
    icon: "Refrigerator",
    price: "₹449 – ₹599",
    priceUnit: "Single door / Double door",
    features: [
      "Empty, defrost, and deep clean all interior compartments",
      "Scrub and sanitise shelves, drawers, and door racks",
      "Remove expired food and residue from all surfaces",
      "Clean rubber door gaskets and magnetic seals",
      "Vacuum condenser coils at the back for efficiency",
      "Deodorise interior to eliminate food odours completely",
      "Wipe down exterior body, handle, and control panel",
      "Reorganise items and set optimal temperature settings",
    ],
    category: "cleaning",
    faq: [
      {
        question: "Do I need to empty the fridge before the cleaning team arrives?",
        answer:
          "Yes, please remove all food items and store them in a cool place before our team arrives. This allows us to clean thoroughly without risking food contamination from cleaning agents.",
      },
      {
        question: "How long does the fridge cleaning take?",
        answer:
          "A single-door fridge takes about 45 minutes, while a double-door fridge with a separate freezer compartment takes approximately 60–75 minutes including defrosting time.",
      },
    ],
  },
  {
    id: "washing-machine-cleaning",
    slug: "washing-machine-cleaning",
    name: "Washing Machine Cleaning",
    description:
      "Your washing machine cleans your clothes, but who cleans the washing machine? Over time, detergent residue, fabric softener buildup, mold, and bacteria accumulate inside the drum, detergent drawer, and rubber seal — causing bad odours and reducing cleaning effectiveness. Our washing machine cleaning service thoroughly cleans the inner drum, door seal, detergent drawer, filter, and drain pipe using specialised descaling and disinfecting agents. This not only eliminates odours but also extends your machine's lifespan and improves wash quality.",
    shortDescription:
      "Deep cleaning of washing machine drum, seal, drawer, and drain to eliminate odours and residue.",
    icon: "WashingMachine",
    price: "₹999",
    priceUnit: "per machine",
    features: [
      "Descale and deep clean inner drum and stainless steel tub",
      "Scrub rubber door seal to remove mold and mildew",
      "Clean detergent drawer and fabric softener compartment",
      "Clear drain filter and pump for proper water flow",
      "Run a hot sanitisation cycle to kill bacteria",
      "Wipe down exterior body, control panel, and knobs",
      "Remove limescale buildup from internal pipes",
      "Deodorise machine for a fresh, clean smell",
    ],
    category: "cleaning",
    faq: [
      {
        question: "Does this service work for both top-load and front-load machines?",
        answer:
          "Yes, our technicians are experienced with all types of washing machines — top-loading, front-loading, semi-automatic, and fully automatic from all major brands like LG, Samsung, Whirlpool, and Bosch.",
      },
      {
        question: "How often should a washing machine be cleaned?",
        answer:
          "We recommend professional cleaning every 3–4 months. In hard water areas like Ludhiana, more frequent cleaning (every 2 months) helps prevent limescale buildup.",
      },
    ],
  },
  {
    id: "water-tank-cleaning",
    slug: "water-tank-cleaning",
    name: "Water Tank Cleaning",
    description:
      "Overhead and underground water tanks are often neglected, leading to sediment buildup, algae growth, bacterial contamination, and rust — all of which directly affect the water your family drinks, cooks with, and bathes in. Our water tank cleaning service follows a systematic 6-step process: draining, sludge removal, high-pressure scrubbing, anti-bacterial treatment, UV sanitisation, and final rinsing. We clean all types of tanks including plastic, concrete, and stainless steel, ensuring your water storage remains safe and hygienic year-round.",
    shortDescription:
      "Professional 6-step water tank cleaning with anti-bacterial treatment and UV sanitisation.",
    icon: "Droplets",
    price: "₹1",
    priceUnit: "per litre of tank capacity",
    features: [
      "Complete draining and sludge removal from tank floor",
      "High-pressure scrubbing of walls and floor",
      "Anti-bacterial chemical treatment to kill germs",
      "UV sanitisation for thorough disinfection",
      "Vacuum cleaning of loose sediment and debris",
      "Final freshwater rinse for residue-free finish",
      "Clean all tank types — plastic, concrete, and steel",
      "Post-cleaning water quality inspection report",
    ],
    category: "cleaning",
    faq: [
      {
        question: "How often should water tanks be cleaned?",
        answer:
          "We recommend cleaning overhead tanks every 6 months and underground tanks every 3–4 months. In areas with high sediment or during monsoon season, more frequent cleaning may be necessary.",
      },
      {
        question: "Is the water safe to drink immediately after cleaning?",
        answer:
          "Yes, after our final freshwater rinse and sanitisation, the water is safe for all uses including drinking. We use food-grade, government-approved sanitising agents that leave no harmful residue.",
      },
    ],
  },
  {
    id: "office-cleaning",
    slug: "office-cleaning",
    name: "Office Cleaning",
    description:
      "A clean office boosts employee productivity, reduces sick days, and creates a positive impression on clients and visitors. Our office cleaning service covers workstations, conference rooms, restrooms, pantry areas, and common spaces with professional-grade equipment and minimal disruption to your workday. We offer flexible scheduling — daily, weekly, or on-demand — and can customise our services to meet your specific office requirements. From carpet vacuuming and desk sanitisation to restroom deep cleaning, we ensure your workspace is spotless and hygienic.",
    shortDescription:
      "Professional office and workspace cleaning with flexible scheduling and minimal disruption.",
    icon: "Building2",
    price: "₹6",
    priceUnit: "per sq ft",
    features: [
      "Vacuum and mop all office floors and carpeted areas",
      "Dust and sanitise all desks, chairs, and workstations",
      "Clean and disinfect conference room tables and equipment",
      "Deep clean restrooms including toilets, sinks, and mirrors",
      "Wipe down doors, windows, glass partitions, and handles",
      "Empty and sanitise dustbins and waste bins",
      "Clean pantry/kitchen area including appliances and countertops",
      "Sanitise high-touch surfaces — light switches, elevator buttons, door handles",
    ],
    category: "cleaning",
    faq: [
      {
        question: "Can you clean after office hours to avoid disruption?",
        answer:
          "Yes, we offer after-hours and weekend cleaning slots to ensure zero disruption to your team's productivity. Simply let us know your preferred time and we'll schedule accordingly.",
      },
      {
        question: "Do you provide daily office cleaning contracts?",
        answer:
          "Yes, we offer daily, weekly, and custom-frequency cleaning contracts for offices. Contact us for a customised quote based on your office size and cleaning requirements.",
      },
    ],
  },
  {
    id: "commercial-cleaning",
    slug: "commercial-cleaning",
    name: "Commercial Cleaning",
    description:
      "From retail showrooms and restaurants to hospitals and educational institutions, commercial spaces demand a higher standard of cleanliness and hygiene. Our commercial cleaning service is designed for high-traffic environments, using industrial-grade equipment and hospital-grade disinfectants to maintain impeccable hygiene standards. We follow strict cleaning protocols, provide detailed service reports, and can handle spaces of any size — from small shops to large warehouses. Our trained teams are equipped to handle specialised requirements including floor polishing, facade cleaning, and compliance-ready sanitisation.",
    shortDescription:
      "Industrial-grade cleaning for retail, restaurants, hospitals, and commercial spaces.",
    icon: "Store",
    price: "₹5",
    priceUnit: "per sq ft",
    features: [
      "Industrial-grade vacuuming and floor scrubbing",
      "Hospital-grade disinfection of all surfaces",
      "Floor polishing and crystallisation for tiled areas",
      "Glass and facade cleaning for storefronts",
      "Restroom deep cleaning with odour control",
      "Waste management and bin sanitisation",
      "Periodic deep cleaning schedules and service reporting",
      "Trained, uniformed staff with ID verification",
    ],
    category: "cleaning",
    faq: [
      {
        question: "What types of commercial spaces do you clean?",
        answer:
          "We clean all types of commercial spaces including retail stores, restaurants, cafes, hospitals, clinics, schools, colleges, gyms, warehouses, showrooms, and IT offices.",
      },
      {
        question: "Can you provide cleaning during business hours without disturbing customers?",
        answer:
          "Yes, we use quiet, cordless equipment for daytime cleaning and follow customer-friendly protocols to ensure minimal disturbance to your patrons and staff.",
      },
    ],
  },
  {
    id: "move-in-cleaning",
    slug: "move-in-cleaning",
    name: "Move In Cleaning",
    description:
      "Moving into a new home is exciting, but the previous occupant's dirt and grime shouldn't be your welcome gift. Our move-in cleaning service ensures your new home is thoroughly cleaned and sanitised before you move in your belongings. We clean every room, every fixture, and every surface — from ceiling fans and light fixtures to kitchen cabinets and bathroom tiles. This comprehensive cleaning gives you a fresh, hygienic start in your new home, so you can unpack and settle in without worrying about hidden dirt or lingering odours.",
    shortDescription:
      "Thorough cleaning of your new home before move-in for a fresh, hygienic start.",
    icon: "LogIn",
    price: "₹2,999 – ₹4,999",
    priceUnit: "per session (2BHK/3BHK)",
    features: [
      "Deep clean all rooms from ceiling to floor",
      "Scrub and sanitise kitchen and bathrooms thoroughly",
      "Clean all cabinets, shelves, and storage areas inside and out",
      "Vacuum and mop all flooring and carpeted areas",
      "Wash windows, window frames, and grills",
      "Remove all cobwebs and dust from corners and fixtures",
      "Sanitise door handles, switches, and all touch points",
      "Deodorise entire home for a fresh, welcoming scent",
    ],
    category: "specialized",
    faq: [
      {
        question: "Should I schedule move-in cleaning before or after moving my furniture?",
        answer:
          "We recommend scheduling the cleaning before moving in your furniture and belongings. This allows us to clean every surface thoroughly — including areas that would otherwise be blocked by furniture.",
      },
      {
        question: "What if the home is very dirty from the previous occupant?",
        answer:
          "Our move-in cleaning is specifically designed for this scenario. We use heavy-duty degreasers, descalers, and sanitisers to tackle even the most neglected homes. If additional intensive work is needed, we'll inform you upfront.",
      },
    ],
  },
  {
    id: "move-out-cleaning",
    slug: "move-out-cleaning",
    name: "Move Out Cleaning",
    description:
      "If you're vacating a rented property, a thorough move-out cleaning is essential to get your security deposit back and leave a positive impression on your landlord. Our move-out cleaning service goes beyond regular cleaning to ensure the property looks its absolute best — from removing nail marks on walls to deep cleaning kitchen appliances and bathroom fixtures. We follow landlord-standard cleaning checklists and our service is trusted by tenants, landlords, and real estate agents across Ludhiana for end-of-tenancy property handover.",
    shortDescription:
      "Landlord-standard cleaning for security deposit recovery and positive property handover.",
    icon: "LogOut",
    price: "₹3,499 – ₹4,499",
    priceUnit: "per session (2BHK/3BHK)",
    features: [
      "Deep clean all rooms to landlord-approved standards",
      "Remove wall marks, scuff marks, and adhesive residue",
      "Degrease and sanitise kitchen including appliance interiors",
      "Descale and deep clean all bathroom fixtures and tiles",
      "Vacuum, mop, and polish all flooring",
      "Clean inside all cupboards, wardrobes, and storage units",
      "Wash windows, grills, and balcony areas thoroughly",
      "Remove all personal debris and spot-clean overlooked areas",
    ],
    category: "specialized",
    faq: [
      {
        question: "Will this cleaning meet landlord security deposit requirements?",
        answer:
          "Yes, our move-out cleaning follows a comprehensive landlord-approved checklist that covers all areas typically inspected during property handover. We have a high success rate for full deposit recovery.",
      },
      {
        question: "Can I be present during the move-out cleaning?",
        answer:
          "Absolutely. You're welcome to be present, or you can simply hand over the keys. Many clients prefer to be available at the end of the session for a walkthrough and final inspection.",
      },
    ],
  },
  {
    id: "post-construction-cleaning",
    slug: "post-construction-cleaning",
    name: "Post Construction Cleaning",
    description:
      "Construction and renovation leave behind layers of dust, cement splatters, paint drips, adhesive residue, and debris that regular cleaning simply cannot handle. Our post-construction cleaning service is specifically designed for newly built or renovated properties, using heavy-duty equipment and specialised chemicals to remove construction grime from all surfaces. We handle cement and paint stains from tiles, clean window glass covered in plaster dust, remove adhesive from floors, and vacuum every speck of construction dust. This is the essential final step before you enjoy your newly built or renovated space.",
    shortDescription:
      "Heavy-duty cleaning to remove construction dust, paint splatters, cement residue, and debris.",
    icon: "HardHat",
    price: "₹4,999 – ₹6,999",
    priceUnit: "per session (2BHK/3BHK)",
    features: [
      "Remove cement and plaster splatters from tiles and floors",
      "Scrub paint drips and adhesive residue from surfaces",
      "Heavy-duty vacuuming of all construction dust and debris",
      "Deep clean windows, grills, and glass surfaces",
      "Descale bathroom fixtures stained by cement or paint",
      "Clean electrical fixtures, switches, and outlet covers",
      "Sweep, mop, and polish all hard flooring",
      "Final wipe-down of all surfaces for move-in readiness",
    ],
    category: "specialized",
    faq: [
      {
        question: "When should I schedule post-construction cleaning?",
        answer:
          "Schedule this service after all construction and painting work is completely finished and the area is free of workers and materials. We recommend waiting 2–3 days after final painting to allow proper drying.",
      },
      {
        question: "Can you remove cement stains from marble and vitrified tiles?",
        answer:
          "Yes, we use specialised cement and paint removers that are safe for marble, granite, vitrified tiles, and ceramic tiles. Our technicians are trained to handle delicate surfaces without causing damage.",
      },
    ],
  },
  {
    id: "villa-cleaning",
    slug: "villa-cleaning",
    name: "Villa & Bungalow Cleaning",
    description:
      "Villas and bungalows require a different level of cleaning expertise due to their larger size, multiple rooms, outdoor spaces, and premium finishes. Our villa cleaning service is designed for premium residences, covering indoor living spaces, outdoor patios, garden areas, parking zones, and terrace spaces. We deploy larger teams with specialised equipment for efficient cleaning of expansive properties. Whether it's a regular maintenance clean or an intensive seasonal deep clean, our service ensures your villa maintains its grandeur and hygiene standards at all times.",
    shortDescription:
      "Comprehensive premium cleaning for villas, bungalows, and large independent homes.",
    icon: "Castle",
    price: "₹5,999",
    priceUnit: "per session",
    features: [
      "Deep clean all indoor rooms including bedrooms and living areas",
      "Clean and sanitise multiple bathrooms and powder rooms",
      "Thorough kitchen degreasing and sanitisation",
      "Outdoor patio, balcony, and terrace cleaning",
      "Sweep and wash driveway, parking area, and walkways",
      "Garden area tidying and boundary wall cleaning",
      "Pool surround cleaning (pool cleaning available separately)",
      "Large team deployment for faster completion",
    ],
    category: "specialized",
    faq: [
      {
        question: "How many people will be assigned for villa cleaning?",
        answer:
          "We typically deploy a team of 4–6 trained professionals for villa cleaning, depending on the size of the property. Larger villas may require additional team members for timely completion.",
      },
      {
        question: "Do you offer recurring villa cleaning packages?",
        answer:
          "Yes, we offer weekly, bi-weekly, and monthly villa cleaning packages at discounted rates. Our Annual AMC package is especially popular with villa owners who want consistent maintenance.",
      },
    ],
  },
  {
    id: "apartment-cleaning",
    slug: "apartment-cleaning",
    name: "Apartment Cleaning",
    description:
      "Apartment living comes with its own cleaning challenges — compact spaces, shared corridors, and building maintenance rules that require careful attention. Our apartment cleaning service is tailored for flat dwellers in Ludhiana's residential societies, covering everything from compact 1RK units to spacious 4BHK apartments. We respect society timings, use quiet equipment to avoid disturbing neighbours, and ensure proper disposal of waste as per society guidelines. Our efficient cleaning process ensures your apartment is spotless in minimal time without compromising on quality.",
    shortDescription:
      "Efficient, society-friendly cleaning for apartments of all sizes in residential complexes.",
    icon: "Building",
    price: "₹2,499",
    priceUnit: "per session (2BHK)",
    features: [
      "Deep clean all rooms, kitchen, and bathrooms",
      "Sweep and mop all flooring including balconies",
      "Clean window grills, doors, and safety grilles",
      "Dust and wipe all furniture and fixtures",
      "Sanitise kitchen and bathroom fixtures",
      "Remove cobwebs and dust from ceilings and walls",
      "Society-friendly — quiet equipment and timely arrival",
      "Proper waste disposal per society guidelines",
    ],
    category: "cleaning",
    faq: [
      {
        question: "Will the cleaning team comply with society security rules?",
        answer:
          "Yes, our team carries valid ID and we can provide a service letter for security clearance. We follow all society rules regarding parking, entry/exit timings, and waste disposal.",
      },
      {
        question: "Can I get a combined cleaning for my apartment and car parking area?",
        answer:
          "Yes, we can include car parking area cleaning as an add-on. Many of our apartment clients opt for this to keep their designated parking spot clean and dust-free.",
      },
    ],
  },
  {
    id: "pest-control",
    slug: "pest-control",
    name: "Pest Control Services",
    description:
      "Pests like cockroaches, ants, termites, bed bugs, and rodents are not just a nuisance — they carry diseases and can cause significant property damage. Our pest control service uses government-approved, odourless chemicals that are safe for children and pets while being highly effective against all common household pests. Our trained pest control technicians conduct a thorough inspection, identify entry points and nesting areas, and apply targeted treatments for long-lasting results. We offer one-time treatments as well as quarterly pest management plans for ongoing protection.",
    shortDescription:
      "Safe, odourless pest control for cockroaches, ants, termites, bed bugs, and rodents.",
    icon: "Bug",
    price: "₹2.50",
    priceUnit: "per sq yard",
    features: [
      "Inspection and identification of pest types and entry points",
      "Government-approved, odourless chemical treatment",
      "Gel-based cockroach and ant control (safe for kitchens)",
      "Termite treatment for walls, furniture, and wooden structures",
      "Bed bug heat treatment and spray for mattresses and upholstery",
      "Rodent control with safe trapping and baiting methods",
      "Child and pet-safe formulations used throughout",
      "Post-treatment report with prevention recommendations",
    ],
    category: "specialized",
    faq: [
      {
        question: "Is the pest control treatment safe for children and pets?",
        answer:
          "Yes, we use government-approved, odourless, and low-toxicity chemicals that are safe when applied correctly. For households with infants or pets, we use gel-based treatments in sensitive areas and recommend keeping pets away for 2–3 hours after spray treatments.",
      },
      {
        question: "How long does the pest control treatment last?",
        answer:
          "Most treatments provide protection for 3–6 months depending on the pest type and severity of infestation. We recommend quarterly treatments for year-round protection, especially in ground-floor apartments and independent houses.",
      },
    ],
  },
  {
    id: "sanitization",
    slug: "sanitization",
    name: "Sanitization & Disinfection",
    description:
      "In a post-pandemic world, regular sanitisation is no longer optional — it's essential for protecting your family from viruses, bacteria, and other pathogens. Our professional sanitisation service uses WHO-recommended disinfectants and advanced fogging technology to cover every corner of your home, office, or commercial space. The ultra-fine mist reaches areas that manual cleaning cannot — behind furniture, inside AC vents, and across ceiling surfaces. Our service provides hospital-grade disinfection that kills 99.9% of germs and viruses, creating a safe and healthy environment for your family or employees.",
    shortDescription:
      "WHO-recommended fogging sanitisation for homes, offices, and commercial spaces.",
    icon: "ShieldCheck",
    price: "₹3",
    priceUnit: "per sq ft",
    features: [
      "Ultra-fine fogging with WHO-approved disinfectants",
      "Covers hard-to-reach areas — behind furniture, vents, ceilings",
      "Kills 99.9% of viruses, bacteria, and pathogens",
      "Safe for all surfaces — furniture, electronics, food areas",
      "No residue, no sticky feel after drying",
      "Quick-dry — space is usable within 30 minutes",
      "Certificate of sanitisation provided upon completion",
      "Available for one-time and recurring schedules",
    ],
    category: "specialized",
    faq: [
      {
        question: "Is the sanitisation safe for food preparation areas and electronic devices?",
        answer:
          "Yes, the disinfectant we use is water-based and safe for all surfaces including kitchen countertops, food preparation areas, laptops, TVs, and other electronic devices. No special covering is needed.",
      },
      {
        question: "How often should sanitisation be done?",
        answer:
          "For homes, we recommend sanitisation every 1–2 months or after any illness in the family. For offices and commercial spaces, weekly or bi-weekly sanitisation is recommended, especially for customer-facing businesses.",
      },
    ],
  },
  {
    id: "glass-cleaning",
    slug: "glass-cleaning",
    name: "Glass & Window Cleaning",
    description:
      "Crystal-clear glass enhances the aesthetics of any space, but maintaining streak-free windows and glass partitions requires professional techniques and the right products. Our glass cleaning service uses professional squeegees, lint-free microfiber cloths, and ammonia-free glass cleaners to deliver perfectly clear, streak-free results on windows, glass doors, mirrors, glass partitions, and shower enclosures. We clean both interior and exterior glass surfaces, remove hard water stains, and polish frames and sills for a complete finish.",
    shortDescription:
      "Streak-free professional glass cleaning for windows, mirrors, partitions, and shower enclosures.",
    icon: "ScanSearch",
    price: "₹5",
    priceUnit: "per sq ft",
    features: [
      "Streak-free cleaning with professional squeegee technique",
      "Clean interior and exterior glass surfaces",
      "Remove hard water stains and mineral deposits",
      "Polish aluminum and UPVC window frames and sills",
      "Clean glass partitions, doors, and mirrors",
      "Ammonia-free, eco-friendly glass cleaning solution",
      "Shower enclosure descaling and polishing",
      "Safe for tinted, frosted, and laminated glass",
    ],
    category: "specialized",
    faq: [
      {
        question: "Can you clean glass at height or on upper floors?",
        answer:
          "We can clean glass on upper floors up to the 3rd floor from inside the apartment. For exterior glass on higher floors, we use extended-reach equipment. For very high-rise buildings (10+ floors), we recommend our exterior facade cleaning service with harness equipment.",
      },
      {
        question: "How do you prevent streaks on glass?",
        answer:
          "Our technicians use the professional squeegee method combined with lint-free microfiber cloths and the right amount of cleaning solution. This technique, when done correctly, guarantees a streak-free finish every time.",
      },
    ],
  },
];

/** Get a service by its slug */
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Get services filtered by category */
export function getServicesByCategory(category: "cleaning" | "specialized"): Service[] {
  return services.filter((s) => s.category === category);
}
