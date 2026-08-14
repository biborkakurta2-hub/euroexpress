# EUROEXPRESS ÁRUHÁZ — Shopify téma

Magyar háztartási / kisgép webshop téma. **Dawn** alapú (Online Store 2.0),
az otto.de háztartási aloldalainak felhasználói élményével (sűrű termékrács,
bal oldali szűrők, akciós árazás) és az EuroExpress arculatával
(piros `#E30613` / fekete `#111111` / fehér, vastag nagybetűs display).

## Arculat

- **Piros** `#E30613` — CTA, címkék, felső sáv, akciós ár
- **Fekete** `#111111` — fejlécek, ártáblák, gombok
- **Papír** `#F2F2F2` — oldal háttér (mint az Ottón)
- **Fontok** — Montserrat (display, nagybetűs) + Inter (törzs), Shopify által kiszolgálva
- **Logó** — beépített SVG (`snippets/ee-logo.liquid`); a téma beállításban feltöltött
  saját logó felülírja
- Újrahasználható snippetek: `ee-label` (piros címke), `ee-price-tag` (ártábla),
  `ee-starburst` („Nagyker árak" csillag)

## Telepítés (GitHub-integrációval — ajánlott)

1. Shopify admin → **Online Store → Themes**
2. **Add theme → Connect from GitHub**, authorizáld a Shopify GitHub appot
3. Repository: `biborkakurta2-hub/euroexpress`, Branch:
   `claude/shopify-store-appearance-eelcc9`
4. **Customize** a szerkesztéshez, **Preview** a megtekintéshez, **Publish** az élesítéshez

Alternatíva (helyi gépen): `shopify theme push`.

## Élesítés előtti teendők (Shopify-oldalon)

1. **Termékek importja** — a `euroexpress-products.csv` (21 demó termék, 9 akciós)
   feltöltése: Products → Import. A képek mezők üresek, később tölthetők.
2. **Gyűjtemények** ezekkel a handle-ökkel (a téma erre hivatkozik):
   `konyhai-kisgepek`, `konyhai-nagygepek`, `haztartas`, `kerti-eszkozok`, `akcio`.
   Az `akcio` legyen automatikus gyűjtemény: *feltétel — „Compare at price" nagyobb, mint 0*.
3. **Menük** (Online Store → Navigation):
   - `main-menu` — a fő kategóriák (mega-menüvel az alkategóriákhoz)
   - `footer` — jogi/információs linkek (ÁSZF, Adatvédelem, Szállítás, Kapcsolat)
4. **Szűrők** — telepítsd a **Search & Discovery** (ingyenes Shopify) appot, és add hozzá
   a szűrőket (ár, elérhetőség, márka, terméktípus). A bal oldali szűrősáv ettől lesz élő.
5. **Pénznem formátum** — HUF, magyar megjelenítés (`44 999 Ft`, szóközös ezres tagolás):
   Settings → Store details, illetve a pénznem megjelenítési formátum.
6. **Kapcsolat oldal** — `page.contact` sablonnal.
7. **Logó** (opcionális) — saját logókép feltöltése a téma beállításokban.

## Felépítés (egyedi elemek a Dawn fölött)

```
assets/euroexpress.css          arculati réteg (tokenek + Otto-stílusú override-ok)
snippets/ee-logo.liquid         beépített SVG logó
snippets/ee-label.liquid        piros kategória-címke
snippets/ee-price-tag.liquid    fekete/piros ártábla pill (Ft formátum)
snippets/ee-starburst.liquid    „Nagyker árak" csillag badge
sections/ee-hero.liquid         kezdőlap hero (piros blokk + starburst + CTA)
sections/ee-category-tiles.liquid   4 kategória csempe
sections/ee-usp.liquid          előnyök sáv (ikonos pontok)
sections/ee-subcategory-tiles.liquid   alkategória-csempék (kollekció oldal)
sections/ee-buying-guide.liquid  SEO vásárlási útmutató (összecsukható)
sections/ee-footer-cta.liquid   alsó piros CTA sáv (VÁSÁROLJ MOST + kapcsolat)
templates/index.json            kezdőlap összeállítása
templates/collection.json       Otto-stílusú kollekció (banner, alkategóriák, vertical szűrők, útmutató)
templates/product.json          termékoldal (bizalmi sáv, kapcsolat doboz)
locales/hu.default.json         magyar az alapértelmezett nyelv
euroexpress-products.csv        21 demó termék importhoz
```

A Dawn motorja (kosár, faceted szűrők, keresés, accessibility, teljesítmény)
érintetlen — az EuroExpress réteg csak arculatot és elrendezést ad hozzá.
