/**
 * Génère les journées d'un championnat aller (méthode du cercle).
 * Le premier club reste fixe, les autres tournent ; chaque club joue une fois par journée.
 * Domicile/extérieur : attribué pour équilibrer (pas plus de 2 matchs de suite au même endroit).
 * Retourne, pour chaque journée, des paires [domicile, extérieur].
 */
export function roundRobin(teams: string[], rounds = teams.length - 1): [string, string][][] {
  if (teams.length % 2 !== 0) throw new Error("Nombre de clubs impair : ajoutez un club exempt.");
  const n = teams.length;
  const rotating = teams.slice(1);
  const history = new Map<string, boolean[]>(teams.map((t) => [t, []])); // true = domicile
  const result: [string, string][][] = [];

  // Envie de jouer à domicile : élevée après deux déplacements, nulle après deux réceptions.
  const homeDesire = (team: string) => {
    const h = history.get(team)!;
    const last = h.slice(-2);
    let score = h.filter((x) => !x).length - h.filter(Boolean).length; // retard de matchs à domicile
    if (last.length === 2 && last.every((x) => !x)) score += 100;
    if (last.length === 2 && last.every(Boolean)) score -= 100;
    if (last.length > 0 && !last[last.length - 1]) score += 10;
    return score;
  };

  for (let r = 0; r < Math.min(rounds, n - 1); r++) {
    const order = [teams[0], ...rotating];
    const pairs: [string, string][] = [];
    for (let i = 0; i < n / 2; i++) {
      const a = order[i];
      const b = order[n - 1 - i];
      const da = homeDesire(a);
      const db = homeDesire(b);
      const aHome = da !== db ? da > db : (r + i) % 2 === 0;
      const pair: [string, string] = aHome ? [a, b] : [b, a];
      history.get(pair[0])!.push(true);
      history.get(pair[1])!.push(false);
      pairs.push(pair);
    }
    result.push(pairs);
    rotating.unshift(rotating.pop()!);
  }
  return result;
}
