# Productanalyse en componentstructuur

## Probleemdefinitie

Traditionele planningen zijn procesmatig sterk, maar ruimtelijk moeilijk te interpreteren. Een projectteam ziet in een balkenplanning wanneer een taak loopt, maar niet altijd direct waar de activiteit plaatsvindt, welke bouwdelen worden geraakt en wat een afwijking betekent voor opvolgende werkzaamheden.

## Waardepropositie

BouwVizier maakt de planning begrijpelijk door tijd, ruimte, verantwoordelijkheid en projectinformatie te combineren. De demo legt nadruk op drie verkoopbare momenten:

- **Begrip:** een aannemer kan de bouwvolgorde binnen seconden uitleggen.
- **Signalering:** rode bouwdelen en kritieke aandachtspunten vallen direct op.
- **Samenwerking:** activiteiten, documenten, opmerkingen en partijen zijn gekoppeld.

## UX-principes

- De 4D-werkruimte is het primaire product, niet een bijfunctie.
- Status wordt dubbel gecodeerd met kleur én tekst.
- Detailinformatie verschijnt pas na selectie.
- De gebruiker behoudt altijd projectcontext via de vaste projectheader.
- Filters zijn zichtbaar, herstelbaar en tonen direct resultaat.
- Technische demoacties geven feedback in plaats van stil te falen.
- Desktop en tablet krijgen prioriteit; mobiel blijft bruikbaar voor overzicht en acties.

## Componentstructuur

```text
app/
  page.tsx                         marketinghomepage
  login/page.tsx                   demo-login
  dashboard/layout.tsx             applicatieshell
  dashboard/projects/page.tsx      projectoverzicht
  dashboard/projects/[id]/page.tsx 4D-projectdashboard
  dashboard/projects/[id]/[section]/page.tsx

components/
  marketing/                       homepagepreview
  dashboard/                       navigatie, projectheader, tabs
  projects/                        projectkaarten en portfoliofilters
  fourd/                           viewer, tijdlijn, activiteitspaneel
  project/                         activiteiten, documenten, issues, team, rapportage
  ui/                              knoppen, badges, progress, modal, empty state

context/
  demo-store.tsx                   lokale opmerkingen en issue-status

lib/
  mock-data.ts                     Nederlandse bouwdata
  types.ts                         domeintypen
  date.ts                          datum-, week- en tijdlijnfuncties
```

## Datalagen in een productieversie

- Organisation
- User and membership
- Project
- Model and model version
- Model element / classification
- Schedule and schedule version
- Activity and dependency
- Activity-to-element mapping
- Progress update
- Issue / risk / decision
- Comment
- Document
- Notification
- Audit event
