/**
 * Dice Sum Matching Game — game engine
 *
 * Pure, framework-agnostic game logic so it can later be moved to a real
 * backend/API without rewriting the UI. Nothing here trusts the client for
 * rewards — the page component treats `earn()` as the single source of
 * truth and gates it behind `isWinningCombo` + a persisted completion record.
 */

export type DiceTask = {
  /** Stable, unique task id (used as the completion / anti-duplicate key). */
  id: string
  /** 1-based position of this task in the level set. */
  index: number
  /** The number the player must match. */
  target: number
  /** How many dice are shown per combination. */
  diceCount: number
  /** All selectable dice combinations for this task. Exactly one (or more) sums to `target`. */
  combos: number[][]
  /** Reward credited on first correct submission, in the app's currency. */
  reward: number
}

export const TOTAL_TASKS = 10
export const COMBOS_PER_TASK = 8
export const REWARD_PER_TASK = 150

/** Minimal seeded PRNG (mulberry32) so a session's puzzles are reproducible
 *  while still being different every time the player restarts. */
function mulberry32(seed: number) {
  let a = seed
  return function rand() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function randInt(rand: () => number, min: number, max: number) {
  return Math.floor(rand() * (max - min + 1)) + min
}

/** Build one random dice combination (length = count) whose values sum to `target`.
 *  Requires count <= target <= count * 6. */
function diceSummingTo(rand: () => number, count: number, target: number): number[] {
  const values = Array(count).fill(1)
  let remaining = target - count
  while (remaining > 0) {
    const bumpable = values.map((v, i) => (v < 6 ? i : -1)).filter((i) => i !== -1)
    const i = bumpable[randInt(rand, 0, bumpable.length - 1)]
    values[i] += 1
    remaining -= 1
  }
  // shuffle so the correct combo doesn't visually stand out
  for (let i = values.length - 1; i > 0; i--) {
    const j = randInt(rand, 0, i)
    ;[values[i], values[j]] = [values[j], values[i]]
  }
  return values
}

function randomDiceCombo(rand: () => number, count: number): number[] {
  return Array.from({ length: count }, () => randInt(rand, 1, 6))
}

/** Generates the full set of tasks for a play session. `seed` changes on Restart
 *  so the player gets a fresh puzzle set, but stays stable during play. */
export function generateDiceTasks(seed: number): DiceTask[] {
  const rand = mulberry32(seed)
  const tasks: DiceTask[] = []

  for (let i = 0; i < TOTAL_TASKS; i++) {
    const diceCount = 5
    const target = randInt(rand, diceCount + 5, diceCount * 6 - 5) // keeps mid-range, avoids trivial 5s/30s
    const correctIndex = randInt(rand, 0, COMBOS_PER_TASK - 1)

    const combos: number[][] = []
    for (let c = 0; c < COMBOS_PER_TASK; c++) {
      if (c === correctIndex) {
        combos.push(diceSummingTo(rand, diceCount, target))
      } else {
        let combo = randomDiceCombo(rand, diceCount)
        // avoid accidental extra winners so most levels have exactly one solution
        let guard = 0
        while (combo.reduce((a, b) => a + b, 0) === target && guard < 10) {
          combo = randomDiceCombo(rand, diceCount)
          guard++
        }
        combos.push(combo)
      }
    }

    tasks.push({
      id: `dice-task-${seed}-${i + 1}`,
      index: i + 1,
      target,
      diceCount,
      combos,
      reward: REWARD_PER_TASK,
    })
  }

  return tasks
}

export function comboSum(combo: number[]): number {
  return combo.reduce((a, b) => a + b, 0)
}

export function isWinningCombo(combo: number[], target: number): boolean {
  return comboSum(combo) === target
}
