# Kondisjoner

Du vill ofte møte på situasjoner hvor komponentene dine må vise forskjellig innhold avhengig av kondisjoner, React lar deg bruke `if` statements, ternaries og conditions for å oppnå dette.

### If statments

```tsx
function MyComponent({ name, age }: { name: string; age: number }) {
  if (age > 18) {
    return <p>Sorry {name}, you are not old enough</p>;
  }
  return <p>Welcome {name}</p>;
}
```

Du kan også velge å returnere `null` hvis du ønsker at komponentet ikke skal vises

```tsx
function MyComponent({ name }: { name: string }) {
  if (!name) null;
  return <p>Welcome {name}</p>;
}
```

### Ternaries

```tsx
function MyComponent({ name, age }: { name: string; age: number }) {
  return (
    <p>
      {age > 18 ? `Sorry ${name}, you are not old enough` : `Welcome ${name}`}
    </p>
  );
}
```

### Operators

Du kan bruke logiske operatører for å bettinge UI, i dette eksempelet vises kun alder hvis `showAge` er satt til `true`

```tsx
function MyComponent({
  name,
  age,
  showAge,
}: {
  name: string;
  age: number;
  showAge: boolean;
}) {
  return (
    <p>
      {name} - {showAge && age}
    </p>
  );
}
```

## Loading states

Når du skriver komponenter som er avhengig av å hente inn data kan du ikke lengre garantere at komponentet vill motta data, i dette tilfellet trenger vi å sitte opp en loading state og i tillegg en fallback i tilfelle vi ikke får noe data tilbake.

```tsx
async function ProfilePage() {
  /* En funksjon som f.eks finner innlogget bruker sin informasjon */
  const user = await getUser();

  if (!user) return <p>User not found</p>;
  if (user.isLoading) return <p>Loading user data</p>;
  return <p>Welcome back {user.name}</p>;
}
```

React har mange innebygde verktøy som kan hjelpe oss, og i dette tilfellet har React et innebygd komponent og funksjonalitet som heter [Suspense](https://react.dev/reference/react/Suspense) som er ment til å håndtere loading states som dette. Fordelen med denne metoden er av vi kan la den asyncrone koden kun ligge i det komponentet hvor vi bruker data.

```tsx
import { Suspense } from "react";

export default function ProfilePage({ name }) {
  return (
    <Suspense fallback={<Loading />}>
      <UserProfile userName={name} />
    </Suspense>
  );
}

function Loading() {
  return <p>🌀 Loading...</p>;
}
```

---

<table width="100%">
  <tr>
    <td><a href="./3_props.md">← Props</a></td>
    <td align="right"><a href="./5_lists.md">Lister →</a></td>
  </tr>
</table>
