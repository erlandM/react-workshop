# Introduksjon til komponenter

> [!TIP]
> For en grunndigere gjennomgang kan du lese [react.dev/learn/your-first-component](https://react.dev/learn/your-first-component)

Blant verktøyene React gir oss er komponent basert UI et av de fundamentale egenskapene React bruker for å produsere UI (user interface). Komponenter kan være alt fra små gjennbrukbare knapper til hele sider i en applikasjon som blir satt sammen for å produsere det endelige produktet som brukerene våre ser, og interagerer med. Du kan se på komponenter som byggeklosser i et Lego sett, her kan vi lage alt fra en 2x4 brikke som fungerer som vi ønsker, til større figurer satt sammen av flere brikker som kan gjennbrukes der vi ønsker. Denne egenskapen hjelper oss med DRY prinsippet ([don't repeat yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)).

## Hvordan bruker vi komponenter i React?

> Orginalt ble klasser brukt, istedet for funksjoner, for å beskrive komponenter i React, men dette har endret seg betraktelig de siste årene. Nå brukes nesten utelukkende funksjonelle komponenter.

For å lage et komponent begynner vi først med å lage en fil som har utvidelsen [.jsx](https://react.dev/learn/writing-markup-with-jsx), eller [.tsx](https://react.dev/learn/typescript#typescript-with-react-components) hvis du bruker [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html), hvor du definerer funksjonen som skal være komponentet ditt.
Denne funksjonen må så returnere gylding html kode for at komponentet skal være synlig.

```tsx
function MyButton() {
  return <button>Click me!</button>;
}
```

Du kan så bruke dette komponentet i React applikasjonen din

```tsx
function MyPage() {
  return (
    <div>
      <p>I can use normal HTML elements here</p>
      <!-- Du kan bruke komponentene dine med shorthand -->
      <MyButton />
      <!-- Eller med long form -->
      <MyButton></MyButton>
      <!-- Mer om dette senere -->
    </div>
  );
}
```

Komponenter må ikke eksistere i samme fil for å kunne brukes, det er fult mulig å bruke [import/export](https://react.dev/learn/importing-and-exporting-components#exporting-and-importing-a-component) hvis du ønsker å bruke det i en annen fil.

```tsx
// src/components/MyButton.tsx
export function MyButton() {
  return <button>Click me!</button>;
}

// src/LandingPage.tsx
import MyButton from "./components/MyButton";

function LandingPage() {
  return <MyButton />;
}
```

#### Praktiske informasjon om komponenter

<details>
  <summary>Komponenter kan bare returnere ett element</summary>

Selv om `JSX` ser ut som `HTML` så fungerer de ikke likt, [JSX](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) blir om til et object som React kan bruke for å produsere `HTML` ved behov, dette betyr ogsa at funksjonen vår kun kan returnere et element, men dette elementet kan ha flere barn. Hvis du skal returnere `HTML` på flere linjer må du pakke det inn i paranteser `(...)`

```tsx
// ❌ Prøver å returnere flere elementer samtidig
function DoestWork() {
  return (
      <h2>There are too many elements</h2>
      <p>Being returned from this function</p>
  );
}

// ✅ Hvis vi pakker inn elementene i et annet element så vill det fungere
function NestedElements() {
  return (
    <div>
      <h2>Components are cool</h2>
      <p>Especially when they work!</p>
    </div>
  );
}
```

Hvis du absolutt ønsker at komponente ditt skal refurnere flere elementer må de midlertidig samler som barn i et [fragment](https://react.dev/reference/react/Fragment) slik at React klarer å tolke det.

```tsx
// ✅ Fragmenger samler underliggende elementer midlertidig slik at det fungerer
function UsingFragments() {
  return (
    <>
      <h2>Components are cool</h2>
      <p>Especially when they work!</p>
    </>
  );
}
```

</details>

<details>
  <summary>JSX og React er ikke synonymt</summary>

Siden vi ofte brukes begrepene om hverandre er det lett å tenke at de kanskje betyr det samme, men de er to forskjellige ting.

- JSX er en syntax for å inkludere HTML i en Javascript fil
- React er et javascript bibliotek som kan lese JSX filer

</details>

## Navnekonvensjoner

På lik linje med mange andre kode språk og rammeverk så har React sine egene navnekonvensjoner vi må eller bør bruke. Under har jeg samlet de mest relevante reglene

> [!NOTE]
> Du kan lese mer generelt om navnekonvensjoner på [wikipedia](<https://en.wikipedia.org/wiki/Naming_convention_(programming)#Letter_case-separated_words>)

#### Krav

- Alle komponenter må bruke `PascalCase` i sitt funksjons navn, hvis ikke klarer ikke React å parse koden.

#### Anbefalt

- Filer som inneholder komponenter _bør_ bruke `PascalCase` i sitt filnavn
- Vanlige javascript funksjoner bruker`camelCase`
- Variabler bør følge `camelCase` standard.
- Statiske variabler bør bruke stor bokstav versjon av `SNAKE_CASE`
- For attritutter i HTML delen av JSX koden kan du bruke følgende
  - For attributten bruker du `camelCase`
  - For verdier til attributten kan du bruke `kebab-case`

#### Examples

```jsx
// src/components/NamingConventionExample.jsx

export function PascalCaseComponents() {
  const vanligVariabel = "Hello";
  const STATISK_VARIABEL = "jeg kommer ikke til å endre meg";

  function normalJavascriptFunction() {
    console.log("Fun fact, du kan definere funksjoner inni komponenter");
  }

  return (
    <input
      /* Der du pleier å bruke kebab-case så fortsetter du med det */
      id="kebab-case"
      /* I motsetning til vanlig HTML så bruker react camelCase i attribut navn */
      onChange={normalJavascriptFunction}
    />
  );
}
```

## Mappestrukturer

I motsetning til navnekonvensjoner står vi litt mer fritt til valg av prosjekt og mappe-struktur når vi bruker React, men med en gang vi begynner å bruke rammeverk for å produsere applikasjonen vår må vi som oftest følge rammeverket sine regler for mappestruktur. For nå, la oss se på Vite og Next som eksempler

#### Vite (få krav)

Så lenge filene ligger i en mappe i root så has Vite tilgang og kan se dem, fra det punktet bestemmer du selv hvordan mappehierakiet skal se ut. F.eks så kan det se sånn ut:

```
my-vite-app/
└─ src/
   ├─ main.tsx
   ├─ App.tsx
   ├─ styles.css
   ├─ components/
   │  ├─ Button.tsx
   │  └─ Card.tsx
```

#### Next (mer krav)
Next er et rammeverk for å kjøre mer omfattende React prosjekter og kommer med masse nyttige innebygde funksjoner som routing, middleware, server komponenter/actions, og mye mer. De har en strenger [projekt struktur](https://nextjs.org/docs/app/getting-started/project-structure) fordi den henter ut informasjon fra fil/mappe posisjon.

```
my-next-app/
├─ app/             <-- Alle sider (pages) må ligge i denne mappen
│  ├─ layout.tsx
│  ├─ page.tsx      <-- vår index side: www.eksempel.no
│  ├─ loading.tsx   <-- Vises mens data hentes inn, f.eks en spinner
│  ├─ error.tsx     <-- vises hvis siden skal gi en feilkode, f.eks 404 not found
│  └─ marketing/
│     └─ page.tsx   <-- blir om til en underside: www.eksempel.no/marketing
├─ assets/
│  ├─ globals.css
├─ components/
│  ├─ Button.tsx
│  └─ Card.tsx
```

## Vanlige feil

wip

---

<table width="100%">
  <tr>
    <td><a href="./README.md">← README</a></td>
    <td align="right"><a href="./2_static_components.md">Statiske komponenter →</a></td>
  </tr>
</table>
