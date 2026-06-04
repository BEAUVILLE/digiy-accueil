(function () {
  "use strict";

  const LOADED_KEY = "__DIGIY_WELCOME_FLOATING_V1__";
  if (window[LOADED_KEY]) return;
  window[LOADED_KEY] = true;

  const script = document.currentScript;
  const rawModule = script?.getAttribute("data-module") || "DIGIY";
  const moduleKey = normalizeModule(rawModule);

  const MODULE_LABELS = {
    DIGIY: "DIGIY",
    DRIVER: "DRIVER",
    LOC: "LOC",
    PAY: "PAY",
    POS: "POS",
    RESA: "RESA",
    MARKET: "MARKET",
    RESEAU: "RÉSEAU",
    BUILD: "BUILD",
    JOBS: "JOBS",
    EXPLORE: "EXPLORE"
  };

  const MODULE_AUDIO = {
    DRIVER:
      "Ton module chauffeur t’aide à recevoir les demandes de course, préparer les trajets, garder le contact direct avec le client, puis valider humainement.",
    LOC:
      "Ton module location t’aide à présenter ton logement, recevoir les demandes directes, organiser les séjours et garder la relation avec tes clients.",
    PAY:
      "Ton module paiement t’aide à lire ton argent, tes entrées, tes sorties, tes dettes clients, tes charges et la pression du mois.",
    POS:
      "Ton module caisse t’aide à vendre plus simplement, préparer le panier, lire le total, suivre tes ventes et garder la validation humaine.",
    RESA:
      "Ton module réservation t’aide à recevoir les demandes, préparer les créneaux, organiser les clients et confirmer proprement.",
    MARKET:
      "Ton module market t’aide à présenter tes produits, recevoir les demandes, préparer les messages et garder le contact direct.",
    RESEAU:
      "Ton module réseau t’aide à poser ta fiche professionnelle, ton Q R, ton lien, ta présence publique et ta visibilité avec dignité.",
    BUILD:
      "Ton module artisans tout corps de métiers t’aide à préparer les demandes, les devis, les interventions et la relation client.",
    JOBS:
      "Ton module jobs t’aide à présenter les offres, recevoir les demandes et organiser les contacts professionnels.",
    EXPLORE:
      "Ton module explore t’aide à présenter les sorties, les expériences, les annonces et les demandes du public."
  };

  const visibleModule = MODULE_LABELS[moduleKey] || "DIGIY";
  const moduleAudio =
    MODULE_AUDIO[moduleKey] ||
    "Ton module t’aide à présenter ton activité, recevoir les demandes, organiser ton travail et garder le contact direct avec tes clients.";

  function normalizeModule(value) {
    return String(value || "DIGIY")
      .trim()
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^A-Z0-9]/g, "");
  }

  function getWelcomeText() {
    return `
Bienvenue dans diji laïfe.
Tu es au bon endroit.

Ici, tu n’es pas dans une plateforme qui prend ton client.
Tu entres dans une architecture simple pour mettre ton activité dans ta main.

${moduleAudio}

diji i ne prend pas de commission sur ton travail.
Ton nom reste ton nom.
Ton argent reste ton argent.
Ton client reste ton client.

Choisis ton abonnement tranquillement.
Suis les étapes.
Puis envoie ta preuve de paiement.

Ton accès sera préparé proprement.

Bienvenue dans la famille diji i.
On avance pierre par pierre, avec confiance.
    `;
  }

  function injectStyle() {
    if (document.getElementById("digiy-welcome-floating-style")) return;

    const style = document.createElement("style");
    style.id = "digiy-welcome-floating-style";
    style.textContent = `
      .digiy-floating-welcome{
        position:fixed;
        right:18px;
        bottom:calc(88px + env(safe-area-inset-bottom, 0px));
        z-index:99999;
        display:flex;
        align-items:center;
        gap:8px;
        background:rgba(255,250,240,.97);
        border:1px solid rgba(184,134,11,.35);
        border-radius:999px;
        padding:8px;
        box-shadow:0 14px 38px rgba(35,28,10,.22);
        backdrop-filter:blur(8px);
        -webkit-backdrop-filter:blur(8px);
      }

      .digiy-welcome-main,
      .digiy-welcome-stop{
        border:0;
        cursor:pointer;
        font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        font-weight:900;
        border-radius:999px;
      }

      .digiy-welcome-main{
        background:#167a3f;
        color:#fff;
        padding:12px 16px;
        font-size:15px;
        box-shadow:0 8px 18px rgba(22,122,63,.25);
        white-space:nowrap;
      }

      .digiy-welcome-stop{
        background:#f3ead7;
        color:#3d321d;
        width:42px;
        height:42px;
        font-size:16px;
        flex:0 0 auto;
      }

      .digiy-welcome-main:active,
      .digiy-welcome-stop:active{
        transform:scale(.97);
      }

      @media(max-width:720px){
        .digiy-floating-welcome{
          right:12px;
          bottom:calc(76px + env(safe-area-inset-bottom, 0px));
          max-width:calc(100vw - 24px);
          padding:7px;
          border-radius:999px;
        }

        .digiy-welcome-main{
          padding:13px 16px;
          font-size:16px;
        }

        .digiy-welcome-stop{
          width:44px;
          height:44px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function speakWelcome() {
    if (!("speechSynthesis" in window)) {
      alert("La lecture audio n'est pas disponible sur ce téléphone.");
      return;
    }

    window.speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance(getWelcomeText());
    msg.lang = "fr-FR";
    msg.rate = 0.9;
    msg.pitch = 1;

    window.speechSynthesis.speak(msg);
  }

  function stopWelcome() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  function injectButton() {
    if (document.getElementById("digiyFloatingWelcome")) return;

    injectStyle();

    const box = document.createElement("div");
    box.className = "digiy-floating-welcome";
    box.id = "digiyFloatingWelcome";
    box.innerHTML = `
      <button class="digiy-welcome-main" type="button">
        🎧 Bienvenue ${visibleModule !== "DIGIY" ? visibleModule : ""}
      </button>
      <button class="digiy-welcome-stop" type="button" aria-label="Stop audio">
        ⏹
      </button>
    `;

    box.querySelector(".digiy-welcome-main").addEventListener("click", speakWelcome);
    box.querySelector(".digiy-welcome-stop").addEventListener("click", stopWelcome);

    document.body.appendChild(box);
  }

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  window.DIGIYWelcomeFloating = {
    speak: speakWelcome,
    stop: stopWelcome
  };

  window.addEventListener("beforeunload", stopWelcome);
  window.addEventListener("pagehide", stopWelcome);

  ready(injectButton);
})();
