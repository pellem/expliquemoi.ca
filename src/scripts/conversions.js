// src/scripts/conversions.js

// --- Fonction utilitaire pour formater les nombres de façon intelligente ---
function formatNumber(value, maxDecimals) {
  // Si la valeur est très petite, garder les décimales nécessaires
  if (Math.abs(value) < 0.0001 && value !== 0) {
    return value.toFixed(maxDecimals + 2);
  }
  
  // Pour les nombres normaux, formater avec le nombre demandé de décimales
  const formatted = value.toFixed(maxDecimals);
  
  // Si maxDecimals est 0, retourner l'entier
  if (maxDecimals === 0) return formatted;
  
  // Pour Bitcoin et les petites valeurs, garder toutes les décimales
  if (maxDecimals >= 6) return formatted;
  
  // Pour les autres, supprimer les zéros inutiles à la fin
  return formatted.replace(/\.?0+$/, '');
}

// --- Accordéons ---
export function setupAccordions() {
  const accordionButtons = document.querySelectorAll("[data-accordion-toggle]");
  
  accordionButtons.forEach(button => {
    const targetId = button.getAttribute("data-accordion-target");
    const chevronId = button.getAttribute("data-accordion-chevron");
    
    button.addEventListener("click", () => {
      // Récupération des éléments
      const content = document.getElementById(targetId);
      const chevron = document.getElementById(chevronId);
      
      if (!content) return;
      
      // Vérifier l'état actuel (visible ou caché)
      const isCurrentlyHidden = content.classList.contains("hidden") || 
                               window.getComputedStyle(content).display === "none";
      
      // Basculer entre visible et caché
      if (isCurrentlyHidden) {
        // Rendre visible
        content.classList.remove("hidden");
        content.style.display = "block"; // ou "flex" selon ton design
        if (chevron) chevron.textContent = "▲";
      } else {
        // Cacher
        content.classList.add("hidden");
        content.style.display = "none";
        if (chevron) chevron.textContent = "▼";
      }
    });
  });
}

// --- Surface ---
export function setupSurfaceConverter() {
  const surfaceInputs = {
    m2: document.getElementById("surface_m2"),
    ft2: document.getElementById("surface_ft2"),
    ha: document.getElementById("surface_ha"),
    acres: document.getElementById("surface_acres"),
  };

  if (!surfaceInputs.m2) return; // Sortir si les éléments n'existent pas

  const fromM2 = (m2) => ({
    m2,
    ft2: m2 / 0.092903,
    ha: m2 / 10000,
    acres: m2 * 0.000247105,
  });

  const toM2 = {
    m2: (v) => v,
    ft2: (v) => v * 0.092903,
    ha: (v) => v * 10000,
    acres: (v) => v / 0.000247105,
  };

  let surfaceLock = false;
  Object.entries(surfaceInputs).forEach(([unit, input]) => {
    if (!input) return;
    input.addEventListener("input", (e) => {
      if (surfaceLock) return;
      const val = parseFloat(e.target.value);
      if (isNaN(val)) return;

      surfaceLock = true;
      const m2 = unit === "m2" ? val : toM2[unit](val);
      const conversions = fromM2(m2);

      Object.entries(conversions).forEach(([k, v]) => {
        if (k !== unit && surfaceInputs[k]) {
          // Arrondis intelligents pour les surfaces
          if (k === 'ha' || k === 'acres') {
            // Petites unités comme hectares et acres: 4 décimales max
            surfaceInputs[k].value = formatNumber(v, 4);
          } else if (k === 'm2') {
            // Mètres carrés: 2 décimales
            surfaceInputs[k].value = formatNumber(v, 2);
          } else {
            // Pieds carrés: nombre entier si grand, sinon 1 décimale
            surfaceInputs[k].value = formatNumber(v, v > 100 ? 0 : 1);
          }
        }
      });

      surfaceLock = false;
    });
  });
}

// --- Longueur ---
export function setupLengthConverter() {
  const lengthInputs = {
    mm: document.getElementById("length_mm"),
    cm: document.getElementById("length_cm"),
    m: document.getElementById("length_m"),
    km: document.getElementById("length_km"),
    in: document.getElementById("length_in"),
    ft: document.getElementById("length_ft"),
    yd: document.getElementById("length_yd"),
    mi: document.getElementById("length_mi"),
  };

  if (!lengthInputs.m) return; // Sortir si les éléments n'existent pas

  const fromM = (m) => ({
    mm: m * 1000,
    cm: m * 100,
    m,
    km: m / 1000,
    in: m / 0.0254,
    ft: m / 0.3048,
    yd: m / 0.9144,
    mi: m / 1609.344,
  });

  const toM = {
    mm: (v) => v / 1000,
    cm: (v) => v / 100,
    m: (v) => v,
    km: (v) => v * 1000,
    in: (v) => v * 0.0254,
    ft: (v) => v * 0.3048,
    yd: (v) => v * 0.9144,
    mi: (v) => v * 1609.344,
  };

  let lengthLock = false;
  Object.entries(lengthInputs).forEach(([unit, input]) => {
    if (!input) return;
    input.addEventListener("input", (e) => {
      if (lengthLock) return;
      const val = parseFloat(e.target.value);
      if (isNaN(val)) return;

      lengthLock = true;
      const meters = unit === "m" ? val : toM[unit](val);
      const conversions = fromM(meters);

      Object.entries(conversions).forEach(([k, v]) => {
        if (k !== unit && lengthInputs[k]) {
          // Arrondis logiques pour les longueurs
          if (k === 'mm') {
            // Millimètres: nombre entier
            lengthInputs[k].value = formatNumber(v, 0);
          } else if (k === 'km' || k === 'mi') {
            // Kilomètres, miles: 3 décimales
            lengthInputs[k].value = formatNumber(v, 3);
          } else {
            // Autres unités: 2 décimales
            lengthInputs[k].value = formatNumber(v, 2);
          }
        }
      });

      lengthLock = false;
    });
  });
}

// --- Poids ---
export function setupWeightConverter() {
  const weightInputs = {
    g: document.getElementById("weight_g"),
    kg: document.getElementById("weight_kg"),
    lb: document.getElementById("weight_lb"),
    oz: document.getElementById("weight_oz"),
  };

  if (!weightInputs.kg) return; // Sortir si les éléments n'existent pas

  const fromKg = (kg) => ({
    g: kg * 1000,
    kg,
    lb: kg * 2.20462,
    oz: kg * 35.27396,
  });

  const toKg = {
    g: (v) => v / 1000,
    kg: (v) => v,
    lb: (v) => v / 2.20462,
    oz: (v) => v / 35.27396,
  };

  let weightLock = false;
  Object.entries(weightInputs).forEach(([unit, input]) => {
    if (!input) return;
    input.addEventListener("input", (e) => {
      if (weightLock) return;
      const val = parseFloat(e.target.value);
      if (isNaN(val)) return;

      weightLock = true;
      const kg = unit === "kg" ? val : toKg[unit](val);
      const conversions = fromKg(kg);

      Object.entries(conversions).forEach(([k, v]) => {
        if (k !== unit && weightInputs[k]) {
          if (k === 'g') {
            // Grammes: entier pour les valeurs > 10, sinon 1 décimale
            weightInputs[k].value = formatNumber(v, v > 10 ? 0 : 1);
          } else if (k === 'kg') {
            // Kilogrammes: 3 décimales
            weightInputs[k].value = formatNumber(v, 3);
          } else {
            // Livres, onces: 2 décimales
            weightInputs[k].value = formatNumber(v, 2);
          }
        }
      });

      weightLock = false;
    });
  });
}

// --- Temperature ---
export function setupTemperatureConverter() {
  const temp_c = document.getElementById("temp_c");
  const temp_f = document.getElementById("temp_f");

  if (!temp_c || !temp_f) return; // Sortir si les éléments n'existent pas

  let tempLock = false;

  temp_c.addEventListener("input", (e) => {
    if (tempLock) return;
    const val = parseFloat(e.target.value);
    if (isNaN(val)) return;
    tempLock = true;
    // Températures toujours avec 1 décimale
    temp_f.value = formatNumber((val * 9) / 5 + 32, 1);
    tempLock = false;
  });

  temp_f.addEventListener("input", (e) => {
    if (tempLock) return;
    const val = parseFloat(e.target.value);
    if (isNaN(val)) return;
    tempLock = true;
    // Températures toujours avec 1 décimale
    temp_c.value = formatNumber(((val - 32) * 5) / 9, 1);
    tempLock = false;
  });
}

// --- Volume ---
export function setupVolumeConverter() {
  const volumeInputs = {
    l: document.getElementById("volume_l"),
    ml: document.getElementById("volume_ml"),
    gal: document.getElementById("volume_gal"),
    cup: document.getElementById("volume_cup"),
    floz: document.getElementById("volume_floz"),
  };

  if (!volumeInputs.l) return; // Sortir si les éléments n'existent pas

  const fromLiters = (l) => ({
    l,
    ml: l * 1000,
    gal: l * 0.264172,
    cup: l * 4.22675,
    floz: l * 33.814,
  });

  const toLiters = {
    l: (v) => v,
    ml: (v) => v / 1000,
    gal: (v) => v / 0.264172,
    cup: (v) => v / 4.22675,
    floz: (v) => v / 33.814,
  };

  let volumeLock = false;
  Object.entries(volumeInputs).forEach(([unit, input]) => {
    if (!input) return;

    input.addEventListener("input", (e) => {
      if (volumeLock) return;
      const val = parseFloat(e.target.value);
      if (isNaN(val)) return;

      volumeLock = true;
      const liters = unit === "l" ? val : toLiters[unit](val);
      const converted = fromLiters(liters);

      Object.entries(converted).forEach(([k, v]) => {
        if (k !== unit && volumeInputs[k]) {
          if (k === 'ml') {
            // Millilitres: entier
            volumeInputs[k].value = formatNumber(v, 0);
          } else if (k === 'l') {
            // Litres: 3 décimales
            volumeInputs[k].value = formatNumber(v, 3);
          } else {
            // Gallons, cups, onces liquides: 2 décimales
            volumeInputs[k].value = formatNumber(v, 2);
          }
        }
      });

      volumeLock = false;
    });
  });
}

// --- Monnaie ---
export function setupCurrencyConverter() {
  // 💡 À ajuster dynamiquement si besoin avec une API
  const rate = {
    cadToEur: 0.68,
    cadToUsd: 0.73,
    cadToBtc: 1 / 95000, // 1 BTC = 95 000 CAD (exemple)
  };

  const moneyInputs = {
    cad: document.getElementById("money_cad"),
    eur: document.getElementById("money_eur"),
    usd: document.getElementById("money_usd"),
    btc: document.getElementById("money_btc"),
    sats: document.getElementById("money_sats"),
  };

  if (!moneyInputs.cad) return; // Sortir si les éléments n'existent pas

  const fromCAD = (cad) => ({
    cad,
    eur: cad * rate.cadToEur,
    usd: cad * rate.cadToUsd,
    btc: cad * rate.cadToBtc,
    sats: cad * rate.cadToBtc * 1e8,
  });

  const toCAD = {
    cad: (v) => v,
    eur: (v) => v / rate.cadToEur,
    usd: (v) => v / rate.cadToUsd,
    btc: (v) => v / rate.cadToBtc,
    sats: (v) => v / (rate.cadToBtc * 1e8),
  };

  let moneyLock = false;
  Object.entries(moneyInputs).forEach(([unit, input]) => {
    if (!input) return;
    input.addEventListener("input", (e) => {
      if (moneyLock) return;
      const val = parseFloat(e.target.value);
      if (isNaN(val)) return;

      moneyLock = true;
      const cad = unit === "cad" ? val : toCAD[unit](val);
      const conversions = fromCAD(cad);

      Object.entries(conversions).forEach(([k, v]) => {
        if (k !== unit && moneyInputs[k]) {
          if (k === 'sats') {
            // Satoshis: nombre entier (pas de décimales)
            moneyInputs[k].value = Math.round(v);
          } else if (k === 'btc') {
            // Bitcoin: 8 décimales (format standard)
            moneyInputs[k].value = formatNumber(v, 8);
          } else {
            // Devises comme USD, EUR, CAD: 2 décimales
            moneyInputs[k].value = formatNumber(v, 2);
          }
        }
      });

      moneyLock = false;
    });
  });
}

// Fonction principale pour initialiser tous les convertisseurs
export function initializeAllConverters() {
  setupAccordions();
  setupSurfaceConverter();
  setupLengthConverter();
  setupWeightConverter();
  setupTemperatureConverter();
  setupVolumeConverter();
  setupCurrencyConverter();
}

// Initialisation automatique lorsque la page est chargée
document.addEventListener('DOMContentLoaded', initializeAllConverters);