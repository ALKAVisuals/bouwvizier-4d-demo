# BouwVizier 4D — klikbare SaaS-MVP

Een overtuigende testwebsite voor bouwbedrijven waarin een gestileerd 3D-bouwmodel wordt gekoppeld aan een tijdsplanning. De demo is opgezet als verkoop- en validatieprototype: professioneel genoeg voor een gesprek met aannemers, maar zonder echte BIM-, IFC- of backendintegratie.

## Kern van het productconcept

BouwVizier vertaalt een traditionele bouwplanning naar een gedeeld visueel projectbeeld. De tijdlijn stuurt de status van modelonderdelen aan, waardoor gebruikers direct zien wat niet gestart, gepland, in uitvoering, gereed of vertraagd is. Activiteiten, documenten, opmerkingen, verantwoordelijkheden en aandachtspunten staan in dezelfde context.

## Informatiearchitectuur

1. Marketinghomepage
2. Demo-login
3. Projectoverzicht / portfolio
4. Projectdashboard
   - 4D-planning
   - Activiteiten
   - Documenten
   - Aandachtspunten
   - Team en toegang
   - Rapportage
5. Organisatieportfolio
6. Meldingen

## Belangrijkste werkende interacties

- Demo-login met foutmelding en loading state
- Navigatie tussen alle pagina's en projecttabs
- Project zoeken en filteren
- Lokaal een nieuw demoproject toevoegen
- 3D-model draaien, zoomen en onderdelen selecteren
- Camera resetten en fullscreen openen
- Fasen tonen en verbergen
- Tijdlijn slepen en bouwvolgorde afspelen
- Statuskleuren van bouwdelen dynamisch wijzigen
- Activiteiten selecteren en afhankelijkheden bekijken
- Opmerkingen lokaal toevoegen
- Aandachtspunten lokaal als opgelost markeren of heropenen
- Documenten zoeken en filteren
- Teamleden zoeken, filteren en lokaal uitnodigen
- Responsive mobiele navigatie
- Lege states, loading states en eenvoudige foutmeldingen

## Technologie

- Next.js App Router
- TypeScript
- Tailwind CSS
- React Three Fiber / Three.js
- React Three Drei voor camera- en scenehelpers
- Lokale mockdata en browser-localStorage
- Geen externe backend

## Lokaal starten

Vereisten: Node.js 20 of nieuwer en npm.

```bash
npm install
npm run dev
```

Open daarna:

```text
http://localhost:3000
```

Demo-inloggegevens:

```text
e-mail: demo@bouwbedrijf.nl
wachtwoord: demo123
```

Productiebuild controleren:

```bash
npm run build
npm run start
```

## Mockdata

Alle projectnamen, bedrijven, personen, documenten, activiteiten, voortgangspercentages en aandachtspunten zijn fictief. Het 3D-model is parametrisch opgebouwd uit eenvoudige geometrische bouwdelen. Bestanden worden niet echt geopend of gedownload; deze acties tonen een duidelijke demomelding. Login en autorisaties zijn niet beveiligd.

## Logische vervolgstappen naar een pilot

1. Authenticatie en organisatie-/projectrechten
2. Persistente database en auditlog
3. IFC-viewer en elementmapping
4. Import uit Primavera P6, Microsoft Project of planningsexports
5. Baseline versus actuele planning met versiebeheer
6. BCF-clashes en documentopslag
7. E-mail- en projectmeldingen
8. Projecttemplates en inrichtingstool
9. PDF-/Excel-rapportages
10. Security-, performance- en toegankelijkheidsaudit
