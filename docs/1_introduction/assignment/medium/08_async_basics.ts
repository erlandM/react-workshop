/**
 * MEDIUM: Async – sleep, sekvens vs parallell, enkel feil-håndtering
 * Ingen nettverk – vi simulerer med timeouts/promises.
 */

// 1) sleep(ms): promise som fullfører etter ms
export const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

// 2) fetchValue(label, ms): vent ms og returner label
export async function fetchValue(label: string, ms: number): Promise<string> {
  // TODO: bruk sleep, returner label etterpå
  await sleep(ms);
  return label;
}

// 3) seqAB: hent "A"(300ms) og deretter "B"(300ms) SEKVENSIELT (ca. 600ms)
export async function seqAB(): Promise<string[]> {
  // TODO: await fetchValue('A',300); så await 'B'
  const a = await fetchValue('A', 300);
  const b = await fetchValue('B', 300);
  return [a, b];
}

// 4) parAB: hent "A" og "B" PARALLELT (ca. 300ms) med Promise.all
export async function parAB(): Promise<string[]> {
  // TODO
  const [a, b] = await Promise.all([fetchValue('A', 300), fetchValue('B', 300)]);
  return [a, b];
}

// 5) sometimesFails(shouldFail): reject ved shouldFail=true
export async function sometimesFails(label: string, shouldFail: boolean): Promise<string> {
  // TODO: hvis shouldFail -> throw Error(label), ellers returner label etter 100ms
  if (shouldFail){
    throw Error(label);
  }
  else{
    await sleep(100)
    return label
  }
}

// 6) safeRun: kjør en async funksjon med try/catch og returner "ok:<value>" eller "error:<msg>"
export async function safeRun(task: () => Promise<string>): Promise<string> {
  // TODO: try/catch
  try {
    return await task().then(value => `ok:${value}`);
  }
  catch (error) {
    return await task().then(msg=> `error:${msg}`);
  }
}

/** -------------------------- Self-check ----------------------------
 *  Kjør følgende kommando for å se om koden din kjørte
 *  npx tsx tasks/js-recap/medium/02_async_basics.ts
 *  npx tsx docs/1_introduction/assignment/medium/08_async_basics.ts
 *  ------------------------------------------------------------------
*/
(async () => {
  const seq = await seqAB();
  console.log(`Answer: ${JSON.stringify(seq)}\t\t\tExpected: ["A","B"]`);

  const par = await parAB();
  console.log(`Answer: ${JSON.stringify(par)}\t\t\tExpected: ["A","B"]`);

  const ok = await safeRun(() => sometimesFails('YAY', false));
  console.log(`Answer: ${ok}\t\t\tExpected: ok:YAY`);

  const bad = await safeRun(() => sometimesFails('NOPE', true));
  console.log(`Answer: ${bad}\t\t\tExpected: error:NOPE`);
})();
