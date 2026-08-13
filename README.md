# EuroExpress Áruház — Shopify téma

Egyedi Shopify (Online Store 2.0) téma az **EUROEXPRESS ÁRUHÁZ** magyar
háztartási / kisgép webshopnak. A vásárlási élmény (sűrű termékrács, bal
oldali szűrők, rendezés, morzsamenü, SEO útmutató blokk) az otto.de háztartási
aloldalait követi, a színvilág és a tipográfia pedig az EuroExpress arculatot
(piros / fekete / fehér, vastag condensed logó). Minden felület magyar nyelvű.

---

## 1. Arculati alaprendszer (design tokens)

Központi hely: **`assets/euroexpress-tokens.css`** — innen öröklődik minden.
A téma szerkesztőben megadott színek a `layout/theme.liquid` `<style>`
blokkjában írják felül ezeket, így a Customize felületről is állíthatók.

| Token | Érték | Használat |
|---|---|---|
| `--ee-red` | `#E30613` | fő piros — CTA, címkék, fejléc sáv |
| `--ee-red-dark` | `#B70410` | hover / árnyék |
| `--ee-black` | `#111111` | ártáblák, menü, szöveg |
| `--ee-white` | `#FFFFFF` | |
| `--ee-bg` | `#F2F2F2` | oldal háttér |
| `--ee-card` | `#FFFFFF` | termékkártya háttér |
| `--ee-line` | `#E3E3E3` | elválasztó vonalak |
| `--ee-muted` | `#6B6B6B` | másodlagos szöveg |
| `--ee-sale` | `#E30613` | akciós ár színe |

**Tipográfia:** címsorok **Montserrat 800/900** (nagybetűs, `text-transform:
uppercase`), törzsszöveg **Inter** — Google Fontsról, `font-display: swap`,
preconnecttel (`layout/theme.liquid`).

**Újrahasználható arculati snippetek:**

| Snippet | Mit csinál |
|---|---|
| `snippets/ee-label.liquid` | piros (vagy fekete / kontúros) kategória-címke — „MIX MASTER”, „VÍZFORRALÓ” |
| `snippets/ee-price-tag.liquid` | fekete ártábla (`style: 'tag'`) vagy webshop ár blokk akciós árral és `-30%` címkével |
| `snippets/ee-starburst.liquid` | csipkés SVG csillag jelvény („Nagyker árak”) |
| `snippets/ee-money.liquid` | magyar árformátum: `44 999 Ft` (a bolt pénznem-beállításától függetlenül) |
| `snippets/ee-breadcrumbs.liquid` | morzsamenü minden sablonhoz |
| `snippets/ee-facets.liquid` | szűrő sáv (Shopify faceted filtering) |
| `snippets/ee-pagination.liquid` | számozott lapozó |
| `snippets/card-product.liquid` | termékkártya — `style: 'shop'` (Otto-szerű) vagy `style: 'catalog'` |

### Logó

Töltsd fel a logót a **Téma beállítások → Logó** menüpontban (SVG vagy
háttér nélküli PNG). Amíg nincs feltöltve, a téma a beépített CSS logót
mutatja (fehér doboz fekete kerettel, piros EURO + fehér EXPRESS fekete
kontúrral, alul fekete ÁRUHÁZ fül) — ez a fejlécben, a láblécben és a
jelszavas oldalon is megjelenik.

---

## 2. Oldal- és kollekció-struktúra

Hozd létre ezeket a gyűjteményeket (Shopify admin → Termékek → Gyűjtemények),
a megadott **handle**-lel. A demó CSV címkéi (Tags) már ezekhez igazodnak,
így automatikus gyűjteményeket is használhatsz („Termék címkéje = …”).

| Gyűjtemény | Handle | Automatikus feltétel |
|---|---|---|
| Konyhai kisgépek | `konyhai-kisgepek` | Termék címkéje = `konyhai kisgép` |
| Konyhai nagygépek | `konyhai-nagygepek` | Termék címkéje = `konyhai nagygép` |
| Háztartás & takarítás | `haztartas` | Termék címkéje = `háztartás` |
| Kerti eszközök | `kerti-eszkozok` | Termék címkéje = `kert` |
| Akciók / Nagyker árak | `akcio` | Termék címkéje = `akció` (vagy: ár < összehasonlító ár) |

Minden gyűjteményhez írj **magyar leírást** — ez jelenik meg a kollekció
oldal alján, a „Vásárlási útmutató” blokk első, nyitott szakaszaként (SEO).
A cím alatti rövid bevezetőhöz opcionálisan használhatod a
`custom.rovid_leiras` metamezőt; enélkül a leírás első 220 karaktere kerül oda.

### Menük (Online Store → Navigáció)

- **`main-menu`** — a fejléc kategória menüje. Az almenüpontok (és azok
  almenüi) automatikusan **mega-menüként** jelennek meg.
  Javasolt: Konyhai kisgépek / Konyhai nagygépek / Háztartás / Kerti eszközök / Akciók.
- **Alkategória csempék:** hozz létre egy menüt, aminek a **handle-je megegyezik
  a gyűjtemény handle-jével** (pl. `konyhai-kisgepek`) — a téma ennek a
  linkjeiből rajzolja ki a kollekció oldal tetején a kerek alkategória
  csempéket.
- **`footer`** — Információ oszlop (Szállítás, Kapcsolat, Rólunk).
- **`jogi-informaciok`** — ÁSZF, Adatvédelmi tájékoztató, Cookie-tájékoztató
  (a lábléc alsó, fekete sávjában és a „Vásárlás” oszlopban jelenik meg).

### Szűrők (kötelező lépés a kollekció oldalhoz)

A szűrők forrása a Shopify **Search & Discovery** alkalmazás
(admin → Alkalmazások → Search & Discovery → Filters). Kapcsold be:
**Ár**, **Elérhetőség**, **Gyártó (Vendor)**, **Terméktípus**, **Címke (Tag)**.
A téma automatikusan kirajzolja őket a bal oldali sávba (mobilon lenyíló
fiókba), magyar feliratokkal. A „Csak akciós termékek” kapcsoló a `filter.p.tag`
szűrőt használja az `akció` címkével — ehhez a Címke szűrőnek bekapcsolva
kell lennie.

---

## 3. Kezdőlap (`templates/index.json`)

Fentről lefelé: bejelentés sáv → **piros fejléc** (logó + kereső + fiók/kosár,
alatta fekete kategóriamenü mega-menüvel) → **hero** (piros blokk nagy display
címmel, jobb oldalon termékmontázs, „Nagyker árak” csillag, fekete „VÁSÁROLJ
MOST” gomb) → **4 kategória csempe** → **„Kiemelt akciók” 3×2 katalógus rács**
(piros címke + terméknév + fekete ártábla) → **előnyök sáv** (4 pont) →
hírlevél → **piros lábléc**.

Minden szekció szerkeszthető és átrendezhető a téma szerkesztőben.

## 4. Kollekció oldal (`sections/main-collection-product-grid.liquid`)

Morzsamenü · kategória fejléc + bevezető · görgethető alkategória csempék ·
bal oldali szűrő sáv (mobilon fiók) · rendezés + „128 termék” találatszám ·
aktív szűrő chipek · sűrű termékrács (desktop 4 / tablet 3 / mobil 2 oszlop) ·
számozott lapozó · összecsukható SEO vásárlási útmutató.

## 5. Termékoldal (`sections/main-product.liquid`)

Képgaléria bélyegképekkel · gyártó + display címsor · nagy ár blokk (áthúzott
eredeti ár + piros akciós ár + `-30%`) · készlet állapot · mennyiség léptető ·
fekete „KOSÁRBA” CTA · „Kérdésed van?” doboz (Facebook / e-mail / telefon) ·
bizalmi ikonsáv · termékleírás · paraméter táblázat (blokkokból) · kapcsolódó
termékek.

---

## 6. Demó termékek importálása

`euroexpress-products.csv` — **24 demó termék** a négy fő kategóriában,
magyar nevekkel és leírásokkal, szabványos Shopify oszlopokkal. A képek
mezője (`Image Src`) szándékosan üres, ezeket később töltsd fel.
Több terméken van **Compare At Price**, hogy az akciós megjelenés (áthúzott
ár + `-30%` címke + „Akció” jelvény) tesztelhető legyen.

Import: **Shopify admin → Termékek → Importálás → fájl kiválasztása → Feltöltés**.

## 7. Telepítés

**GitHub-integrációval (ajánlott):**
Shopify admin → Online Store → Themes → *Add theme* → *Connect from GitHub* →
válaszd ezt a repót és a branchet → *Customize* / *Publish*.

**Shopify CLI-vel (böngészős bejelentkezés, nem kell API token):**

```bash
# élő előnézet fejlesztés közben (böngészőben nyitja a bejelentkezést)
shopify theme dev --store=BOLT-NEVE.myshopify.com

# feltöltés a boltba
shopify theme push --store=BOLT-NEVE.myshopify.com
```

## 8. Teendők élesítés előtt

1. Gyűjtemények létrehozása a fenti handle-ökkel + magyar leírásokkal.
2. Menük beállítása (`main-menu`, alkategória menük, `footer`, `jogi-informaciok`).
3. Search & Discovery szűrők bekapcsolása.
4. `euroexpress-products.csv` importálása, termékképek feltöltése.
5. Logó feltöltése a téma beállításokban, favicon beállítása.
6. Kapcsolat adatok: e-mail, telefon, Facebook link (téma beállítások).
7. Kezdőlapon a „Kiemelt akciók” szekcióhoz válaszd ki az `akcio` gyűjteményt,
   a kategória csempékhez pedig a négy fő gyűjteményt.
8. Jogi oldalak létrehozása: ÁSZF, Adatvédelmi tájékoztató, Cookie-tájékoztató,
   Szállítás és fizetés, Kapcsolat (`page.contact` sablonnal).
9. Bolt nyelve és pénzneme: magyar (`hu`) / HUF. Az árak formázása a témában
   fixen `44 999 Ft`.

## 9. Felépítés

```
layout/     theme.liquid (tokenek, Google Fonts), password.liquid
config/     settings_schema.json (színek, logó, kapcsolat), settings_data.json
locales/    hu.default.json — minden UI szöveg magyarul
templates/  index, collection, product, cart, search, page, blog, 404 …
sections/   header, footer, hero, category-cards, featured-collection,
            usp-bar, main-collection-product-grid, main-product, main-search …
snippets/   ee-label, ee-price-tag, ee-starburst, ee-money, ee-breadcrumbs,
            ee-facets, ee-pagination, card-product, logo, price
assets/     euroexpress-tokens.css (design tokenek)
            base.css (alap komponensek)
            euroexpress.css (webshop réteg)
            euroexpress.js (menü, szűrő fiók, galéria)
euroexpress-products.csv   demó termékek importhoz
```
