# Lister

En fordel med komponenter er at du kan gjennbruke dem lett så du slipper å måtte manuelt repitere koden. La oss bruke en todo-liste som eksempel for å holde det enklest mulig, men ha i tankene at samme teknikken kan brukes på mye mer komplekse komponenter og data typer så lenge lister er involvert.

```html
<h1>Shopping list</h1>
<ul>
  <li>Melk</li>
  <li>Brød</li>
  <li>Ost</li>
  <li>Kaviar</li>
</ul>
```

## Iterasjon med map method

Først må vi konvertere data til et liste format i Javascript, f.eks Array, slik at vi kan itterere over data.

```ts
const shoppingList = ["Melk", "Brød", "Ost", "Kaviar"];
```

Hvis du bruker Array data typen får du tilgang på å bruke .map metoden til å produsere React elementer automatisk ved behov. I eksempelet under mapper vi over hvert element i `shoppingList` og bruker callback funksjonen i `.map` til å lage en `<p>` tag hvor vi sitter inn det aktive elementet i `.map` itterasjonen.

```tsx
function ShoppingList() {
  const shoppingList = ["Melk", "Brød", "Ost", "Kaviar"];
  return (
    <ul>
      {shoppingList.map((todo) => (
        <p>{todo}</p>
      ))}
    </ul>
  );
}
```

Du kan også lagre elementer i en variabel for så å bruke dem i koden din, begge metodene er gyldig.

```tsx
function ShoppingList() {
  const todo = ["Melk", "Brød", "Ost", "Kaviar"];
  const shoppingList = todo.map((todo) => <p>{todo}</p>);
  return <ul>{shoppingList}</ul>;
}
```

## Hvorfor bruker vi key?

Felles for alle eksemplene over er at vi ikke har bruke attributten `key` når vi itterere, dette feltet er alltid nødvendig når vi skal itterere over data for at React skal behandle resultatet skikkelig. Heldigvis er det veldig enkelt å ligge til en `key`, vi må bare forholde oss til disse reglene:

- Keys må aldri kunne endre seg, React er avhengig av at keys er lik mellom renders.
- Keys my være unik mellom søsken, dvs alle elementer generert som følge av `.map` må ha en unik `key` mellom seg.

```tsx
function ShoppingList() {
  const shoppingList = ["Melk", "Brød", "Ost", "Kaviar"];
  return (
    <ul>
      {shoppingList.map((todo) => (
        <p key={todo}>{todo}</p>
      ))}
    </ul>
  );
}
```

I eksempelet over så bruker vi `todo` som `key`, men dette fungerer kun hvis `shoppingList` består av unike verdier. Hvis vi f.eks har lagt til to `"Ost"` i listen med uhell så vill vi få en feilmending i React og den vill ikke kunne klare å endre UI ved behov. Her er noen tips for hvilke verdier du kan bruke som `key`

#### Anbefalte

- Hvis du henter listen din fra en database som har unike ID'er knyttet til hvert objekt kan du bruke dette feltet.
- Hvis data er lokal, men ikke inneholder unik identifikasjon, kan du f.eks bruke [crypto.randomUUID()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID) for å genere inkramentale unike verier som du ligger til før du rendrer listen i React.

#### Unngå

- Index i `.map()` kan bli påvirket og endret som følge av mutasjon av Array, da er ikke `key` lengre permanent. Bruk kun hvis du vet at listen aldri vill endre seg. (mer info [her](https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/))

#### Aldri

- Duplikater - Hvis verdien i `key` kan ende opp med å inneholde en duplikat må du finne en annen verdi du kan bruke

## Tomme lister

Når vi tidligere snakket om loading states i bettinget UI så kom vi innpå det som het fallback-state, det gjelder forsåvidt her også. Ofte kan det være nødvendig å vise et alternativt innhold hvis listen er tom.

```tsx
function ShoppingList() {
  const shoppingList = [];

  if (shoppingList.length) {
    return (
      <ul>
        {shoppingList.map((todo, index) => (
          <li key={todo + index}>{todo}</li>
        ))}
      </ul>
    );
  }

  return <p>Handle listen er tom</p>;
}
```

---

<table width="100%">
  <tr>
    <td><a href="./4_conditionals.md">← Kondisjoner</a></td>
    <td align="right"><a href="../3_hooks/README.md">Neste emne →</a></td>
  </tr>
</table>
