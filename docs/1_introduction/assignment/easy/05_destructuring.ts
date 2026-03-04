/**
 * EASY 5: Destructuring – objekter og arrayer
 * 
 * Instruks: Bruk destructuring med fornuftige defaults. Unngå runtime-feil når felt mangler.
 */

// 1) Object-destructuring med defaults og alias
type User = { name?: string; address?: { city?: string } };
export function userSummary(u: User): string {
  // TODO:
  // - hent name med default "Ukjent"
  const { name ="Ukjent"}= u;
  // - hent city fra address med default "Ukjent by"
  const { address: { city = "Ukjent by" } ={}}=u;
  // - bruk sikre defaults på mellomledd (={} / ?? {})
  return `${name} @ ${city}`;
}

// 2) Array-destructuring: hent ut brukernavnet
export function getUsername(user: [string, string, string]): string {
  // TODO
  const [id, username, link] = user;
  return username;
}

// 3) Destructuring i parameter + rest
export function pickIdAndRest(item: { id: number; [k: string]: unknown }) {
  // TODO: plukk ut id, legg resten i 'rest'
  const { id, ...rest } = item;
  return { id, rest };
}

/** -------------------------- Self-check ---------------------------- 
 *  Kjør følgende kommando for å se om koden din kjørte
 *  npx tsx docs/1_introduction/assignment/easy/05_destructuring.ts
 *  ------------------------------------------------------------------
*/

console.log(`Answer: ${userSummary({})}\t\tExpected: Ukjent @ Ukjent by`);
console.log(`Answer: ${userSummary({ name: 'Ada', address: { city: 'Bergen' } })}\t\t\tExpected: Ada @ Bergen`);

console.log(`Answer: ${getUsername(["12", "pålKåre", "/link"])}\t\t\t\tExpected: pålKåre`);

console.log(`Answer: ${JSON.stringify(pickIdAndRest({ id: 7, a: 1, b: 2 }))}\tExpected: { "id":7, "rest":{ "a":1, "b":2 }`);
