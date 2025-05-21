/**
 * Structured analysis template for aquaponics disease diagnosis
 */
export const ANALYSIS_TEMPLATE = `
*DIAGNOSED CONDITION:*
* *[PRIMARY DISEASE NAME]*
* Confidence Level: [High/Medium/Low]

*KEY SYMPTOMS OBSERVED:*
* *[SYMPTOM]*: [Description]
* *[SYMPTOM]*: [Description]

*ADDITIONAL INFORMATION:*
* Severity Level: [Mild/Moderate/Severe]
* Affected Area: [Description]
* Pattern: [Localized/Widespread]

*RECOMMENDATIONS:*
1. [Treatment suggestions]
2. [System adjustments]
3. [Prevention measures]

*DISCLAIMER:*
This is an AI-assisted analysis and should not replace professional agricultural/aquacultural diagnosis.
`;

/**
 * Common fish diseases in aquaponics systems with detailed information
 */
export const FISH_DISEASES = {
  "ich": {
    name: "ICH (WHITE SPOT DISEASE)",
    symptoms: [
      "WHITE SPOTS: Small white cysts on the body, fins, and gills, resembling salt grains",
      "FLASHING: Fish rubbing against surfaces due to irritation",
      "LABORED BREATHING: Rapid gill movement and gasping at the surface"
    ],
    severity: "Moderate to Severe",
    pattern: "Widespread",
    treatment: [
      "Gradually raise water temperature to 86°F (30°C) for 3-4 days",
      "Add aquarium salt (1 tablespoon per 5 gallons)",
      "Apply commercial treatments containing malachite green or formalin as directed",
      "Continue treatment for 14 days after visible spots disappear"
    ],
    prevention: [
      "Quarantine new fish for 2-4 weeks before introducing to main system",
      "Maintain stable water parameters (temperature, pH, ammonia, nitrites)",
      "Ensure adequate filtration and regular water changes"
    ]
  },
  
  "fin_rot": {
    name: "FIN ROT",
    symptoms: [
      "FRAYED FINS: Ragged, torn appearance of fin edges",
      "DISCOLORATION: White or red edges on fins, sometimes with bleeding",
      "DETERIORATION: Progressive erosion of fin tissue"
    ],
    severity: "Mild to Moderate",
    pattern: "Localized",
    treatment: [
      "Improve water quality through partial water changes (15-20%) every 2-3 days",
      "Add aquarium salt (1 teaspoon per gallon)",
      "Apply antibiotics like kanamycin or erythromycin as directed",
      "Isolate severely affected fish if possible"
    ],
    prevention: [
      "Maintain excellent water quality with regular testing",
      "Avoid overcrowding fish tanks",
      "Provide balanced nutrition",
      "Eliminate sharp objects or rough surfaces in the system"
    ]
  },
  
  // Additional detailed fish diseases...
};

/**
 * Common plant diseases in aquaponics systems with detailed information
 */
export const PLANT_DISEASES = {
  "root_rot": {
    name: "ROOT ROT",
    symptoms: [
      "DISCOLORED ROOTS: Brown or black roots instead of healthy white",
      "WILTING: Plants wilting despite adequate water",
      "STUNTED GROWTH: Reduced growth rate and smaller leaves",
      "YELLOWING LEAVES: Chlorosis starting from lower leaves"
    ],
    severity: "Moderate to Severe",
    pattern: "Can spread rapidly",
    treatment: [
      "Improve water circulation by adding air stones or increasing pump flow",
      "Add beneficial bacteria (Bacillus species) to the system",
      "Trim severely affected roots and remove dead plant material",
      "Maintain optimal dissolved oxygen levels (>5mg/L)"
    ],
    prevention: [
      "Ensure proper water aeration throughout the system",
      "Maintain water temperature below 75°F (24°C) when possible",
      "Avoid overcrowding plants",
      "Remove plant debris promptly"
    ]
  },
  
  "nutrient_deficiency": {
    name: "NUTRIENT DEFICIENCY",
    symptoms: [
      "YELLOWING LEAVES: Chlorosis between leaf veins or entire leaves (nitrogen, iron)",
      "PURPLE STEMS: Discoloration of stems and leaf undersides (phosphorus)",
      "BROWN LEAF EDGES: Necrosis at leaf margins (potassium)",
      "DEFORMED GROWTH: Twisted or stunted new growth (calcium, boron)"
    ],
    severity: "Mild to Moderate",
    pattern: "Systemic",
    treatment: [
      "Adjust fish feed quantity or type to provide missing nutrients",
      "Supplement with specific nutrients for severe deficiencies",
      "Balance system pH to 6.0-7.0 for optimal nutrient availability",
      "Consider foliar feeding for quick remediation"
    ],
    prevention: [
      "Regular water testing for pH, EC, and individual nutrients",
      "Maintain appropriate fish-to-plant ratio (1 lb fish per 10 gallons water)",
      "Use diverse fish feed with adequate protein content (32-40%)",
      "Monitor plant growth patterns regularly"
    ]
  },
  
  // Additional detailed plant diseases...
};

/**
 * Helper functions for formatting response data
 */

export const getFallbackAnalysisResponse = () => {
  return `
**DIAGNOSED CONDITION:**
* **UNDETERMINED**
* Confidence Level: Low

**KEY SYMPTOMS OBSERVED:**
* Unable to clearly identify symptoms from the provided image

**ADDITIONAL INFORMATION:**
* Image quality or clarity insufficient for accurate diagnosis
* Consider checking the following common issues manually:

**RECOMMENDATIONS:**
1. Take clearer, well-lit photos from multiple angles
2. Test water parameters (pH, ammonia, nitrites, nitrates)
3. Check for these common fish health indicators:
   - Unusual swimming patterns
   - Changes in color or appearance
   - Reduced appetite
   - Visible spots, growths, or abnormalities
4. Check for these common plant health indicators:
   - Leaf discoloration or spotting
   - Wilting despite adequate water
   - Unusual growth patterns
   - Root condition (should be white and firm)

**DISCLAIMER:**
This is an AI-assisted analysis and should not replace professional agricultural/aquacultural diagnosis.
`;
};
