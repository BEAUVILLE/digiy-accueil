# 🎧 DIGIY ACCUEIL

## Rôle du dépôt

`digiy-accueil` est une brique transversale DIGIYLYFE.

Ce dépôt héberge le bouton flottant de bienvenue utilisé sur les pages d’inscription des différents modules DIGIY.

Il ne s’agit pas d’un module métier.

C’est une porte d’accueil commune, simple et rassurante, destinée aux abonnés avant leur inscription ou activation.

---

## Doctrine

Avant l’inscription, DIGIY accueille.  
Après l’inscription, le module travaille.

Le bouton flottant sert à :

- souhaiter la bienvenue ;
- rassurer l’abonné ;
- expliquer l’esprit DIGIY ;
- rappeler que le professionnel garde son client, son argent, son nom et sa relation ;
- guider doucement vers l’abonnement et l’envoi de preuve de paiement.

---

## Principe

Chaque page inscription appelle un seul script commun :

```html
<script
  src="https://digiy-accueil.digiylyfe.com/assets/js/digiy-welcome-floating.js"
  data-module="DRIVER"
  defer>
</script>
