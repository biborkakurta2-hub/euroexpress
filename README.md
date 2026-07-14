# EuroExpress Áruház — Shopify téma

Egyedi Shopify (Online Store 2.0) téma az EuroExpress Áruház webshopjához,
a márka brosúrájának dizájnja alapján.

## Dizájn

A színvilág és a stílus a brosúrát követi, a logó pedig a márka eredeti
logóját:

- **Piros** `#E30613` — fő márkaszín (hero, címkék, kiemelések, lábléc sáv)
- **Fekete** `#111114` — árcédulák, gombok, fejléc keret, sötét panelek
- **Papír** `#EFEFEF` — háttér, finom pöttyös mintázattal
- **Logó** — beépített EUROEXPRESS ÁRUHÁZ logó (piros EURO + fehér EXPRESS
  fekete kontúrral, fehér dobozban, alatta fekete ÁRUHÁZ sáv). A téma
  beállításokban saját logókép is feltölthető, ami felülírja a beépítettet.
- Piros termékcímkék + fekete árcédulák (a katalógus stílusában),
  „Nagyker árak” csillag jelvény a hero-ban.

## Telepítés (GitHub-integrációval)

1. A Shopify adminban: **Online Store → Themes → Add theme → Connect from GitHub**
2. Válaszd ki ezt a repót és a megfelelő branchet.
3. A téma megjelenik a témalistában — **Customize** gombbal testreszabható,
   **Publish** gombbal élesíthető.

Alternatíva: [Shopify CLI](https://shopify.dev/docs/themes/tools/cli) —
`shopify theme push` a repó gyökeréből.

## Beállítások a téma szerkesztőben

- **Színek** — mind az öt márkaszín módosítható (alapértelmezés: brosúra színei)
- **Logó** — kép feltöltése és szélesség; kép nélkül a beépített logó jelenik meg
- **Kapcsolat** — e-mail, telefon, Facebook és Instagram link (a lábléc és a
  termékoldali „rendelés üzenetben” doboz használja)
- **Főoldal szekciók** — hero, kategória kártyák, kiemelt termékek
  (gyűjtemény választható), előnyök sáv, hírlevél — mind szerkeszthető,
  átrendezhető

## Teendők élesítés előtt

1. Hozd létre a termékeket és a gyűjteményeket a Shopify adminban
   (pl. „Háztartási gépek”, „Konyhai eszközök”, „Kerti felszerelés”).
2. A téma szerkesztőben a **Kiemelt termékek** szekcióhoz válassz gyűjteményt,
   és a **Kategória kártyák** blokkjaihoz rendeld hozzá a gyűjteményeket.
3. Állítsd be a **main-menu** és **footer** menüket
   (Online Store → Navigation).
4. Hozz létre egy „Kapcsolat” oldalt a `page.contact` sablonnal.
5. Töltsd fel a logóképet a téma beállításokban (opcionális — enélkül a
   beépített logó jelenik meg).

## Felépítés

```
layout/      theme.liquid, password.liquid
config/      settings_schema.json (téma beállítások), settings_data.json
locales/     hu.default.json (magyar az alapértelmezett nyelv)
templates/   JSON sablonok (index, product, collection, cart, page, ...)
sections/    szekciók (hero, kategória kártyák, kiemelt termékek, ...)
snippets/    logo, card-product, price, pagination
assets/      base.css (teljes dizájn), global.js
```
