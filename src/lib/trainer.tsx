'use client'

// ============================================================
// Спільні утиліти тренажера:
//   • прогрес у localStorage (правильні/хибні відповіді, «вивчено»)
//   • озвучка німецьких слів через браузерний SpeechSynthesis
//   • перемішування та загальні дрібні компоненти
// Прогрес — ігровий стан у браузері, до вибору мови стосунку
// не має (мова живе лише в адресі — див. i18n.tsx).
// ============================================================

import { useCallback, useEffect, useState } from 'react'
import { useLang, useL } from './i18n'
import { ART_STYLE, type Word } from './deutsch-data'
import { gAnswer, gLearnWord, gReset, type Kind } from './gamify'

// ---------- ПРОГРЕС ----------

export type Stat = { c: number; w: number; l?: 1 }
export type ProgressMap = Record<string, Stat>

const STORAGE_KEY = 'deutsch-progress-v1'

function readStorage(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ProgressMap) : {}
  } catch {
    return {}
  }
}

function writeStorage(map: ProgressMap): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
  } catch {
    /* приватний режим — прогрес лише на сеанс */
  }
}

export function useProgress() {
  const [map, setMap] = useState<ProgressMap>({})
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setMap(readStorage())
    setReady(true)
  }, [])

  const record = useCallback((key: string, ok: boolean, kind: Kind = 'quiz') => {
    gAnswer(ok, kind) // XP/серії/досягнення — у gamify.ts
    setMap((prev) => {
      const s = prev[key] ?? { c: 0, w: 0 }
      const next: ProgressMap = { ...prev, [key]: { c: s.c + (ok ? 1 : 0), w: s.w + (ok ? 0 : 1), l: s.l } }
      writeStorage(next)
      return next
    })
  }, [])

  const setLearned = useCallback((key: string, learned: boolean) => {
    if (learned) gLearnWord(key) // XP лише за перше «вивчено» (dedupe всередині)
    setMap((prev) => {
      const s = prev[key] ?? { c: 0, w: 0 }
      const next: ProgressMap = { ...prev, [key]: { c: s.c, w: s.w, l: learned ? 1 : undefined } }
      writeStorage(next)
      return next
    })
  }, [])

  const resetAll = useCallback(() => {
    gReset() // скидає XP/досягнення (deutsch-gamify-v1)
    setMap({})
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* нічого */
    }
  }, [])

  const learnedCount = Object.values(map).filter((s) => s.l).length

  return { map, ready, record, setLearned, resetAll, learnedCount }
}

// ---------- ОЗВУЧКА ----------

export function speak(text: string): void {
  try {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    const synth = window.speechSynthesis
    synth.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'de-DE'
    u.rate = 0.9
    const voice = synth.getVoices().find((v) => v.lang?.toLowerCase().startsWith('de'))
    if (voice) u.voice = voice
    synth.speak(u)
  } catch {
    /* без озвучки — не критично */
  }
}

// ---------- ДРІБНИЦІ ----------

/** Переклад слова поточною мовою: const T = useTr(); T(word) */
export function useTr(): (w: Word) => string {
  const lang = useLang()
  return useCallback((w: Word) => (lang === 'uk' ? w.uk : w.ru), [lang])
}

export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Кнопка озвучки: зупиняє клік, щоб не перевернути картку */
export function SpeakBtn({ text, className = '' }: { text: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        speak(text)
      }}
      aria-label="Aussprache · Вимова"
      title="Вимова / Произношение"
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base transition-colors hover:bg-zinc-200 active:bg-zinc-300 ${className}`}
    >
      🔊
    </button>
  )
}

/** Кольоровий чип артикля der/die/das */
export function ArtChip({ art }: { art: 'der' | 'die' | 'das' }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-md px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${ART_STYLE[art].chip}`}
    >
      {art}
    </span>
  )
}

/** Смуга прогресу */
export function Bar({ value, tone = 'bg-emerald-500' }: { value: number; tone?: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200">
      <div className={`h-2 rounded-full ${tone} transition-all`} style={{ width: `${Math.max(2, Math.min(100, value))}%` }} />
    </div>
  )
}

// ---------- РІВНІ ----------

import { LEVELS, type Level } from './deutsch-data'

export type LevelFilter = Level | 'all'

const LEVEL_BADGE: Record<Level, string> = {
  A1: 'bg-emerald-100 text-emerald-800',
  A2: 'bg-sky-100 text-sky-800',
  B1: 'bg-violet-100 text-violet-800',
}

/** Кольоровий чип рівня A1/A2/B1 */
export function LevelBadge({ level, className = '' }: { level: Level; className?: string }) {
  return (
    <span className={`inline-flex shrink-0 items-center rounded-md px-1.5 py-0.5 text-[10px] font-black tracking-wide ${LEVEL_BADGE[level]} ${className}`}>
      {level}
    </span>
  )
}

/** Чипи-фільтр рівнів: Усі / A1 / A2 / B1 */
export function LevelChips({ value, onChange, counts }: {
  value: LevelFilter
  onChange: (l: LevelFilter) => void
  counts?: Partial<Record<LevelFilter, number>>
}) {
  const L = useL()
  const items: { id: LevelFilter; label: string }[] = [
    { id: 'all', label: L('Усі рівні', 'Все уровни') },
    ...LEVELS.map((lv) => ({ id: lv as LevelFilter, label: lv })),
  ]
  return (
    <div className="mb-4 flex flex-wrap items-center gap-1.5">
      {items.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
            value === id
              ? 'border-zinc-900 bg-zinc-900 text-white'
              : 'border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100'
          }`}
        >
          {id !== 'all' && <span className="mr-1 font-black">{id === 'A1' ? '🟢' : id === 'A2' ? '🔵' : '🟣'}</span>}
          {label}
          {counts?.[id] !== undefined && (
            <span className={`ml-1.5 font-mono text-[10px] ${value === id ? 'text-zinc-300' : 'text-zinc-400'}`}>
              {counts[id]}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
