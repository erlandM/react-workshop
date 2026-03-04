# Props

Komponenter er veldig praktisk på egenhånd, men hva hvis vi kan gjøre de endå mer fleksibel og nyttig!

## Hva er props

Props i kontekst av React er en metode komponenter bruker til å kommunisere mellom hverandre, her kan forreldre sende data til barn ved å gi dem props.
Dette kan til tider minne deg på hvordan attributter fungerer i HTML, men med props kan du sende hvilke som helst Javascript type (primitiver og objekter).

Vi begynner med å definere hvilke props vi ønsker å bruke i komponentet vårt, i dette eksempelet ønsker vi å bruke navnet til en innlogget bruker for å vise en velkomst melding.

```jsx
function Greeting({ name }) {
  return <p>Welcome {name}!</p>;
}
```

## Hvordan blir data sent til komponentet?

For å sende data til barn (komponenter) så bruker vi samme teknikk som med attributer, her bruker vi variablen vi satte opp i prop som nøkkel. Her er det veldig viktig at vi bruker samme navn (identifikasjon)

```jsx
function SplashScreen() {
  /* En funksjon som f.eks finner innlogget bruker sin informasjon */
  const user = getUser();

  return (
    <div>
      <Greeting name={user.name} />
    </div>
  );
}
```

## Definere props med type informasjon

> [!IMPORTANT]
> Fram til nå har vi bare sett på JSX, framover kommer vi nå til å bruke TSX for å bruke Typescript sine fordeler.

Når kompleksiteten på komponentet eller prosjektet øker lønner det seg å invisterer i mer robust feilsikkring ved å definere variabler og metoder med Typescript. Dette vill hjelpe oss på flere steder når vi skriver komponenter:

- Vi kan på forhånd ha full oversikt over hvordan data i props ser ut.
- Vi får autocomplete og syntax highlighting når vi skriver komponentet
- Vi får feilmelding hvis vi sender feile props til et komponent.
- Vi kan kjøre tester for CI/CD lettere

#### Definer props med interface

Hvis props inneholder mange felter eller blir brukt mange andre steder kan det være smart å ekstraktere ut informasjonen til en interface som kan exporteres.

```tsx
interface UserDetails {
  name: string;
  userName: string;
  email: string;
}

function UserProfile(user: UserDetails) {
  return (
    <span>
      <p>{user.name}</p>
      <p>{user.userName}</p>
      <p>{user.email}</p>
    </span>
  );
}
```

#### Definer props med inline types

Vi kan gjøre interface eksempelet over om til inline, dette kan være praktisk hvis komponentet bare har enkle props som ikke blir gjenbrukt andre steder.

```tsx
function UserProfile(user: { name: string; userName: string; email: string }) {
  return (
    <span>
      <p>{user.name}</p>
      <p>{user.userName}</p>
      <p>{user.email}</p>
    </span>
  );
}
```

#### Feilmeldinger

Fordelen med typeinformasjon er at vi kan få utfyllende feilmeldinger når vi gjør type feil. Her prøver vi å bruke en innebygd streng metode på et tall, noe som produserer en tserror feil når vi skriver koden og en TypeError hvor `toUpperCase()` metoden ikke eksisterer på data-typen når koden kjører.

```tsx
function UserProfile(user: { name: string; age: number }) {
  return (
    <span>
      <p>{user.name.toUpperCase()}</p>
      <p>{user.age.toUpperCase()}</p>
      {/* Property 'toUpperCase' does not exist on type 'number'. */}
    </span>
  );
}
```

I tillegg vill vi få feilmeldinger hvis vi prøver å sende feile props til et komponent. I dette eksempelet prøver vi å sende `undefined` til en variabel som bare kan motta `number`.

```tsx
function ProfilePage() {
  /**
   * En funksjon som f.eks finner innlogget bruker sin informasjon
   * Vi går ut fra at data ser slik ut:
   * user = { name: "Lars ole", age: undefined }
   **/
  const user = getUser();

  return (
    <div>
      <UserProfile name={user.name} age={user.age} />
      {/* Type 'undefined' is not assignable to type 'number'. */}
    </div>
  );
}
```

## Children slot

I tillegg til props har vi en annen måte å gi data til komponenter på, denne metoden bruker nøkkelordet [children](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) for å neste elementer fra foreldre inn i barnet.

```tsx
function Article({ children, title, }: { children: ReactElement; title: string; }) {
  return (
    <article>
      <h2>{title}</h2>
      {children}
    </article>
  );
}

export function ArticlePage() {
  return (
    <div>
      <Article title="You can still use props!">
        <p>Any tags inside here will be used in the child</p>
      </Article>
    </div>
  );
}
```

## Default mønstre

Ofte kan det være ønskelig å la være å hele tiden sende props til et komponent, du kan istedet sitte default verdier for å unngå dette. Det finnes forskjellige teknikker du kan bruke, f.eks [Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)

```tsx
// Vi definerer props og bruker ? til å markere nøkkel som valgfri
interface MyProps {
  someText?: string;
}

// Du kan bruke default paramters
function MyComponent({ someText = "Default" }: MyProps) {
  return <p>{someText}</p>;
}

// Du kan bruke ternaries eller operators
function MyComponent({ someText }: MyProps) {
  return <p>{someText || "Default"}</p>;
}

// Du kan opprette variabler med defaults
function MyComponent({ someText }: MyProps) {
  const defaultText = someText ? someText : "Default";
  return <p>{defaultText}</p>;
}
```

---

<table width="100%">
  <tr>
    <td><a href="./2_static_components.md">← Statiske komponenter</a></td>
    <td align="right"><a href="./4_conditionals.md">Kondisjoner →</a></td>
  </tr>
</table>
