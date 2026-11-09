'use client'

// ============================================================
// ГЕЙМІФІКАЦІЯ: XP, ранги (траєкторія A1 → B1), досягнення,
// серія днів. Окреме сховище deutsch-gamify-v1; компоненти
// лише повідомляють події (gAnswer / gLearnWord / gChapter),
// а цей модуль рахує XP, відкриває досягнення й тримає стан.
//
// Слова (статистика ✓/✗/★) живуть у trainer.tsx
// (deutsch-progress-v1) — звідси ми її лише ЧИТАЄМО, щоб
// порахувати «вивчені слова» й освоєність тем. Чисті функції
// (rankFor, dailyStreakFrom, buildSnap, checkAchievements)
// експортуються для scripts/test-deutsch.ts.
// ============================================================

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'
import type { Bi } from './i18n'
import { TOPICS, wordKey, type Level } from './deutsch-data'

// ---------- РАНГИ (траєкторія навчання) ----------

export type Rank = {
  min: number      // XP, потрібні для цього рангу
  de: string       // підрівень: A1.1 … B1.3
  emoji: string
  name: Bi
}

export const RANKS: Rank[] = [
  { min: 0,    de: 'A1.1', emoji: '🌱', name: { uk: 'Перші кроки',            ru: 'Первые шаги' } },
  { min: 150,  de: 'A1.2', emoji: '🔤', name: { uk: 'Словниковий старт',      ru: 'Словарный старт' } },
  { min: 400,  de: 'A1.3', emoji: '🟢', name: { uk: 'Твердий A1',             ru: 'Твёрдый A1' } },
  { min: 750,  de: 'A2.1', emoji: '🔵', name: { uk: 'Новий рівень',           ru: 'Новый уровень' } },
  { min: 1200, de: 'A2.2', emoji: '💬', name: { uk: 'Впевнене спілкування',   ru: 'Уверенное общение' } },
  { min: 1800, de: 'A2.3', emoji: '🚀', name: { uk: 'Майстер A2',             ru: 'Мастер A2' } },
  { min: 2500, de: 'B1.1', emoji: '🟣', name: { uk: 'Вхід у середній рівень', ru: 'Вход в средний уровень' } },
  { min: 3400, de: 'B1.2', emoji: '🎓', name: { uk: 'Сильний B1',             ru: 'Сильный B1' } },
  { min: 4500, de: 'B1.3', emoji: '👑', name: { uk: 'Майстерність',           ru: 'Мастерство' } },
]

/** Поточний ранг за XP */
export function rankFor(xp: number): Rank {
  let r = RANKS[0]
  for (const x of RANKS) if (xp >= x.min) r = x
  return r
}

/** Наступний ранг (undefined — якщо досягнуто останній) */
export function nextRank(xp: number): Rank | undefined {
  return RANKS.find((r) => r.min > xp)
}

// ---------- XP ----------

export const XP = {
  answerOk: 3,      // правильна відповідь у вправі
  learnWord: 5,     // слово позначено вивченим (одноразово)
  chapter: 15,      // прочитано розділ книжки (одноразово)
  bookDone: 40,     // бонус за дочитану книжку
  dayVisit: 10,     // перша активність за день
} as const

// ---------- ДОСЯГНЕННЯ ----------

export type Kind = 'quiz' | 'article' | 'plural' | 'verb'

/** Знімок похідних показників (будує buildSnap) */
export type Snap = {
  xp: number
  ansC: number                 // правильних відповідей усього
  bestStreak: number           // найдовша серія правильних
  learned: number              // слів позначено вивченими
  streakDays: number           // поточна серія днів підряд
  totalDays: number            // днів активності загалом
  chapters: number             // прочитано розділів
  booksRead: number            // дочитано книжок
  kinds: Record<Kind, number>  // правильних за типами вправ
  topics: Record<Level, { done: number; total: number }> // освоєні теми
}

export type Achievement = {
  id: string
  emoji: string
  name: Bi
  desc: Bi
  cond: (s: Snap) => boolean
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first',  emoji: '🌱', name: { uk: 'Перша перемога',   ru: 'Первая победа' },
    desc: { uk: '1 правильна відповідь',        ru: '1 правильный ответ' },        cond: (s) => s.ansC >= 1 },
  { id: 'a50',    emoji: '🎯', name: { uk: 'Снайпер',          ru: 'Снайпер' },
    desc: { uk: '50 правильних відповідей',     ru: '50 правильных ответов' },     cond: (s) => s.ansC >= 50 },
  { id: 'a200',   emoji: '🔥', name: { uk: 'Влучний',          ru: 'Меткий' },
    desc: { uk: '200 правильних відповідей',    ru: '200 правильных ответов' },    cond: (s) => s.ansC >= 200 },
  { id: 'a500',   emoji: '💯', name: { uk: 'Маратонець',       ru: 'Марафонец' },
    desc: { uk: '500 правильних відповідей',    ru: '500 правильных ответов' },    cond: (s) => s.ansC >= 500 },
  { id: 'st10',   emoji: '⚡', name: { uk: 'Серія 10',         ru: 'Серия 10' },
    desc: { uk: '10 правильних поспіль',        ru: '10 правильных подряд' },      cond: (s) => s.bestStreak >= 10 },
  { id: 'st25',   emoji: '🚀', name: { uk: 'Серія 25',         ru: 'Серия 25' },
    desc: { uk: '25 правильних поспіль',        ru: '25 правильных подряд' },      cond: (s) => s.bestStreak >= 25 },
  { id: 'w25',    emoji: '⭐', name: { uk: 'Перші 25 слів',    ru: 'Первые 25 слов' },
    desc: { uk: '25 слів позначено вивченими',  ru: '25 слов отмечено выученными' }, cond: (s) => s.learned >= 25 },
  { id: 'w100',   emoji: '🧠', name: { uk: 'Лексикон',         ru: 'Лексикон' },
    desc: { uk: '100 слів у копілці',           ru: '100 слов в копилке' },        cond: (s) => s.learned >= 100 },
  { id: 'w300',   emoji: '📚', name: { uk: 'Ходячий словник',  ru: 'Ходячий словарь' },
    desc: { uk: '300 слів у копілці',           ru: '300 слов в копилке' },        cond: (s) => s.learned >= 300 },
  { id: 'art30',  emoji: '🚦', name: { uk: 'Страж артиклів',   ru: 'Страж артиклей' },
    desc: { uk: '30 правильних артиклів',       ru: '30 правильных артиклей' },    cond: (s) => s.kinds.article >= 30 },
  { id: 'read1',  emoji: '📖', name: { uk: 'Читач',            ru: 'Читатель' },
    desc: { uk: 'перший розділ книжки',         ru: 'первая глава книги' },        cond: (s) => s.chapters >= 1 },
  { id: 'book1',  emoji: '🏅', name: { uk: 'Книголюб',         ru: 'Книголюб' },
    desc: { uk: 'книжку дочитано до кінця',     ru: 'книга дочитана до конца' },   cond: (s) => s.booksRead >= 1 },
  { id: 'day7',   emoji: '📅', name: { uk: 'Тижневик',         ru: 'Неделька' },
    desc: { uk: '7 днів підряд',                ru: '7 дней подряд' },             cond: (s) => s.streakDays >= 7 },
  { id: 'pathA1', emoji: '🟢', name: { uk: 'Шлях A1',          ru: 'Путь A1' },
    desc: { uk: 'усі теми A1 освоєні на 80%',   ru: 'все темы A1 освоены на 80%' },
    cond: (s) => s.topics.A1.total > 0 && s.topics.A1.done === s.topics.A1.total },
  { id: 'pathA2', emoji: '🔵', name: { uk: 'Шлях A2',          ru: 'Путь A2' },
    desc: { uk: 'усі теми A2 освоєні на 80%',   ru: 'все темы A2 освоены на 80%' },
    cond: (s) => s.topics.A2.total > 0 && s.topics.A2.done === s.topics.A2.total },
  { id: 'pathB1', emoji: '🟣', name: { uk: 'Шлях B1',          ru: 'Путь B1' },
    desc: { uk: 'усі теми B1 освоєні на 80%',   ru: 'все темы B1 освоены на 80%' },
    cond: (s) => s.topics.B1.total > 0 && s.topics.B1.done === s.topics.B1.total },
]

// ---------- СЕРІЯ ДНІВ ----------

/** Сьогодні за ЛОКАЛЬним годинником: 'YYYY-MM-DD' */
export function todayStr(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function yesterdayStr(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return todayStr(d)
}

/** Поточна серія днів підряд: рахуємо назад від сьогодні
 *  (або від вчорашнього, якщо сьогодні ще не було активності). */
export function dailyStreakFrom(days: string[], today: string): number {
  const set = new Set(days)
  let cursor = set.has(today) ? today : yesterdayStr()
  if (!set.has(cursor)) return 0
  let n = 0
  for (;;) {
    n++
    const d = new Date(cursor + 'T12:00:00')
    d.setDate(d.getDate() - 1)
    cursor = todayStr(d)
    if (!set.has(cursor)) return n
  }
}

// ---------- СТАН ----------

export type GamifyState = {
  xp: number
  ansC: number
  ansW: number
  bestStreak: number
  curStreak: number
  days: string[]                 // дні активності (без повторів)
  kinds: Record<Kind, number>
  chapters: string[]             // 'bookId/chIdx'
  learnedSeen: string[]          // ключі слів, за які вже нараховано XP
  unlocked: Record<string, string> // id досягнення -> 'YYYY-MM-DD'
}

const STORAGE_KEY = 'deutsch-gamify-v1'
const WORDS_KEY = 'deutsch-progress-v1' // сховище trainer.tsx — читаємо

function emptyState(): GamifyState {
  return {
    xp: 0, ansC: 0, ansW: 0, bestStreak: 0, curStreak: 0,
    days: [], kinds: { quiz: 0, article: 0, plural: 0, verb: 0 },
    chapters: [], learnedSeen: [], unlocked: {},
  }
}

function readWordsLearned(): string[] {
  try {
    if (typeof window === 'undefined') return []
    const raw = localStorage.getItem(WORDS_KEY)
    if (!raw) return []
    const map = JSON.parse(raw) as Record<string, { l?: 1 }>
    return Object.entries(map).filter(([, s]) => s.l).map(([k]) => k)
  } catch {
    return []
  }
}

function readStorage(): GamifyState {
  try {
    if (typeof window === 'undefined') return emptyState()
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...emptyState(), learnedSeen: readWordsLearned() }
    const s = JSON.parse(raw) as Partial<GamifyState>
    return { ...emptyState(), ...s, kinds: { ...emptyState().kinds, ...(s.kinds ?? {}) } }
  } catch {
    return emptyState()
  }
}

function writeStorage(s: GamifyState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
  } catch {
    /* приватний режим — стан лише на сеанс */
  }
}

// ---------- МАГАЗИН (module-level, як i18n) ----------

let state: GamifyState = emptyState()
let justUnlocked: Achievement[] = []
const listeners = new Set<() => void>()
let hydrated = false

function emit(): void {
  listeners.forEach((f) => f())
}

function mutate(fn: (s: GamifyState) => GamifyState): void {
  state = fn(state)
  writeStorage(state)
  // щойно відкриті досягнення (максимум 3 у тостах, решта в панелі)
  const snap = buildSnap(state)
  const fresh: Achievement[] = []
  for (const a of ACHIEVEMENTS) {
    if (state.unlocked[a.id]) continue
    if (a.cond(snap)) {
      state = { ...state, unlocked: { ...state.unlocked, [a.id]: todayStr() } }
      fresh.push(a)
    }
  }
  if (fresh.length) {
    writeStorage(state)
    justUnlocked = [...justUnlocked, ...fresh].slice(-3)
  }
  emit()
}

// ---------- ПОХІДНІ ПОКАЗНИКИ ----------

/** Тема освоєна, якщо ≥80% слів вивчені (★ або ≥2 правильні). */
export const TOPIC_DONE = 0.8

function readTrainerMap(): Record<string, { c?: number; w?: number; l?: 1 }> {
  try {
    if (typeof window === 'undefined') return {}
    const raw = localStorage.getItem(WORDS_KEY)
    return raw ? (JSON.parse(raw) as Record<string, { c?: number; w?: number; l?: 1 }>) : {}
  } catch {
    return {}
  }
}

/** Освоєність тем за статистикою слів trainer'а. */
export function topicMastery(map: Record<string, { c?: number; w?: number; l?: 1 }>): Record<Level, { done: number; total: number }> {
  const out: Record<Level, { done: number; total: number }> = {
    A1: { done: 0, total: 0 }, A2: { done: 0, total: 0 }, B1: { done: 0, total: 0 },
  }
  for (const t of TOPICS) {
    out[t.level].total++
    const done = t.words.filter((w) => {
      const s = map[wordKey(t.id, w)]
      return s?.l || (s?.c ?? 0) >= 2
    }).length
    if (done / t.words.length >= TOPIC_DONE) out[t.level].done++
  }
  return out
}

/** Знімок показників для досягнень (чиста функція від стану). */
export function buildSnap(s: GamifyState): Snap {
  const map = readTrainerMap()
  const learned = new Set([...s.learnedSeen, ...Object.entries(map).filter(([, v]) => v.l).map(([k]) => k)])
  const chaptersByBook = new Map<string, Set<string>>()
  for (const c of s.chapters) {
    const [bid] = c.split('/')
    if (!chaptersByBook.has(bid)) chaptersByBook.set(bid, new Set())
    chaptersByBook.get(bid)!.add(c)
  }
  let booksRead = 0
  for (const [, set] of chaptersByBook) {
    // повноту книжки перевіряє gChapter під час запису (позначає 'bookId/DONE')
    if (set.has('DONE')) booksRead++
  }
  const t = todayStr()
  return {
    xp: s.xp,
    ansC: s.ansC,
    bestStreak: s.bestStreak,
    learned: learned.size,
    streakDays: dailyStreakFrom(s.days, t),
    totalDays: s.days.length,
    chapters: s.chapters.filter((c) => !c.endsWith('/DONE')).length,
    booksRead,
    kinds: s.kinds,
    topics: topicMastery(map),
  }
}

// ---------- ПОДІЇ (викликають компоненти) ----------

function touchDay(s: GamifyState, out: { bonus: number }): GamifyState {
  const t = todayStr()
  if (!s.days.includes(t)) {
    out.bonus = XP.dayVisit
    return { ...s, days: [...s.days, t].slice(-500) }
  }
  return s
}

/** Відповідь у вправі: quiz / article / plural / verb. */
export function gAnswer(ok: boolean, kind: Kind): void {
  if (!hydrated) hydrate()
  const d: { bonus: number } = { bonus: 0 }
  mutate((s0) => {
    let s = touchDay(s0, d)
    const cur = ok ? s.curStreak + 1 : 0
    s = {
      ...s,
      xp: s.xp + (ok ? XP.answerOk : 0) + d.bonus,
      ansC: s.ansC + (ok ? 1 : 0),
      ansW: s.ansW + (ok ? 0 : 1),
      curStreak: cur,
      bestStreak: Math.max(s.bestStreak, cur),
      kinds: { ...s.kinds, [kind]: s.kinds[kind] + (ok ? 1 : 0) },
    }
    return s
  })
}

/** Слово позначено вивченим: XP лише першого разу. */
export function gLearnWord(key: string): void {
  if (!hydrated) hydrate()
  if (state.learnedSeen.includes(key)) return
  const d: { bonus: number } = { bonus: 0 }
  mutate((s0) => {
    let s = touchDay(s0, d)
    s = {
      ...s,
      xp: s.xp + XP.learnWord + d.bonus,
      learnedSeen: [...s.learnedSeen, key],
    }
    return s
  })
}

/** Розділ книжки прочитано. totalChapters — для бонусу за книжку. */
export function gChapter(bookId: string, chIdx: number, totalChapters: number): void {
  if (!hydrated) hydrate()
  const key = `${bookId}/${chIdx}`
  const doneKey = `${bookId}/DONE`
  if (state.chapters.includes(key)) return
  const d: { bonus: number } = { bonus: 0 }
  mutate((s0) => {
    let s = touchDay(s0, d)
    const chapters = [...s.chapters, key]
    let xp = s.xp + XP.chapter + d.bonus
    // дочитана книжка? усі індекси 0..total-1 наявні
    const seen = new Set(chapters)
    let all = true
    for (let i = 0; i < totalChapters; i++) if (!seen.has(`${bookId}/${i}`)) { all = false; break }
    if (all && !chapters.includes(doneKey)) {
      chapters.push(doneKey)
      xp += XP.bookDone
    }
    s = { ...s, xp, chapters }
    return s
  })
}

/** Повне скидання (кнопка «Скинути прогрес»). */
export function gReset(): void {
  state = emptyState()
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch { /* нічого */ }
  justUnlocked = []
  emit()
}

// ---------- HOOK ----------

function subscribe(f: () => void): () => void {
  listeners.add(f)
  return () => { listeners.delete(f) }
}

function getSnapshot(): GamifyState {
  return state
}

function hydrate(): void {
  hydrated = true
  state = readStorage()
}

/** Реактивний стан гейміфікації для компонентів. */
export function useGamify(): {
  s: GamifyState
  snap: Snap
  rank: Rank
  next?: Rank
  justUnlocked: Achievement[]
  ackUnlocked: () => void
} {
  const s = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const [, force] = useState(0)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage доступний лише на клієнті після монтування (SSR-гідратація)
    if (!hydrated) { hydrate(); force((n) => n + 1) }
  }, [])
  const snap = buildSnap(s)
  const ackUnlocked = useCallback(() => {
    if (!justUnlocked.length) return
    justUnlocked = []
    emit()
  }, [])
  return { s, snap, rank: rankFor(s.xp), next: nextRank(s.xp), justUnlocked, ackUnlocked }
}
