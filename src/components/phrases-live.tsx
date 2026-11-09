'use client'

// ============================================================
// ВКЛАДКА «ЖИВІ ФРАЗИ»: побутові формули, реакції, побажання,
// прислів'я та ідіоми. Режими: Огляд (список з озвучкою) і
// Картки (переверни — перевір себе). Позначка «вивчено» —
// у спільному прогресі тренажера (ключ idiom:<de>).
// ============================================================

import { useMemo, useState } from 'react'
import { useLang, useL } from '@/lib/i18n'
import { IDIOM_GROUPS, IDIOM_TOTAL, type Idiom, type IdiomGroup } from '@/lib/deutsch-idioms'
import { SpeakBtn, shuffle, type ProgressMap } from '@/lib/trainer'

type Scope = string // id групи або 'all'

function translation(item: Idiom, lang: 'uk' | 'ru'): string {
  return lang === 'uk' ? item.uk : item.ru
}

// ---------- ОГЛЯД ----------

function ListView({ groups }: { groups: IdiomGroup[] }) {
  const L = useL()
  const lang = useLang()
  return (
    <div className="space-y-6">
      {groups.map((g) => (
        <section key={g.id}>
          <h3 className="mb-1 flex items-baseline gap-2 text-base font-black text-zinc-900">
            <span className="text-xl">{g.emoji}</span>
            {g.name[lang]}
            <span className="font-mono text-xs font-semibold text-zinc-400">{g.items.length}</span>
          </h3>
          <p className="mb-3 text-xs leading-relaxed text-zinc-500">{g.hint[lang]}</p>
          <ul className="space-y-1.5">
            {g.items.map((it) => (
              <li key={it.de} className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[15px] font-bold leading-snug text-zinc-900">{it.de}</p>
                  <SpeakBtn text={it.de} />
                </div>
                <p className="mt-0.5 text-sm text-zinc-600">{translation(it, lang)}</p>
                {it.note && (
                  <p className="mt-1.5 rounded-xl bg-amber-50 px-2.5 py-1.5 text-xs leading-relaxed text-amber-800">
                    💡 {it.note[lang]}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p className="pt-2 text-center text-xs font-semibold text-zinc-400">
        {IDIOM_TOTAL} {L('фраз і формул — слухай озвучку й повторюй уголос', 'фраз и формул — слушайте озвучку и повторяйте вслух')}
      </p>
    </div>
  )
}

// ---------- КАРТКИ ----------

function CardsView({ items, done, setLearned, again }: {
  items: Idiom[]
  done: number
  setLearned: (key: string, learned: boolean) => void
  again: () => void
}) {
  const L = useL()
  const lang = useLang()
  const [idx, setIdx] = useState(0)
  const [open, setOpen] = useState(false)
  const item = items[idx]
  if (!item) {
    return (
      <div className="rounded-3xl border-2 border-zinc-800 bg-white p-8 text-center shadow-md">
        <div className="text-5xl">🎉</div>
        <p className="mt-3 text-xl font-black text-zinc-900">
          {L('Картки пройдено!', 'Карточки пройдены!')}
        </p>
        <button
          type="button"
          onClick={again}
          className="mt-5 rounded-xl bg-zinc-900 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-zinc-700"
        >
          ↺ {L('Ще раз', 'Ещё раз')}
        </button>
      </div>
    )
  }
  const key = `idiom:${item.de}`
  const next = (learned: boolean) => {
    if (learned) setLearned(key, true)
    setOpen(false)
    setIdx((i) => i + 1)
  }
  return (
    <div>
      <p className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-zinc-400">
        {idx + 1} / {items.length} · ✓ {done}
      </p>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full rounded-3xl border-2 border-zinc-800 bg-white p-8 text-center shadow-md transition-shadow hover:shadow-lg"
      >
        <p className="text-2xl font-black leading-snug text-zinc-900">{item.de}</p>
        <div className="mt-2 flex justify-center">
          <SpeakBtn text={item.de} />
        </div>
        {open ? (
          <div className="mt-4 border-t border-dashed border-zinc-200 pt-4">
            <p className="text-lg font-bold text-emerald-700">{translation(item, lang)}</p>
            {item.note && <p className="mt-2 text-xs leading-relaxed text-amber-800">💡 {item.note[lang]}</p>}
          </div>
        ) : (
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-zinc-400">
            {L('торкни, щоб перевірити себе', 'коснись, чтобы проверить себя')}
          </p>
        )}
      </button>
      {open && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => next(false)}
            className="rounded-xl border-2 border-amber-300 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800 transition-colors hover:bg-amber-100"
          >
            ↺ {L('Повторити ще', 'Повторить ещё')}
          </button>
          <button
            type="button"
            onClick={() => next(true)}
            className="rounded-xl border-2 border-emerald-500 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800 transition-colors hover:bg-emerald-100"
          >
            ✓ {L('Знаю!', 'Знаю!')}
          </button>
        </div>
      )}
    </div>
  )
}

// ---------- ВКЛАДКА ----------

export function PhrasesTab({ map, setLearned }: {
  map: ProgressMap
  setLearned: (key: string, learned: boolean) => void
}) {
  const L = useL()
  const lang = useLang()
  const [scope, setScope] = useState<Scope>('all')
  const [mode, setMode] = useState<'list' | 'cards'>('list')
  const [seed, setSeed] = useState(0)

  const groups = useMemo(
    () => (scope === 'all' ? IDIOM_GROUPS : IDIOM_GROUPS.filter((g) => g.id === scope)),
    [scope],
  )

  const scopeItems = useMemo(() => {
    const all = groups.flatMap((g) => g.items)
    // seed змушує перемішати заново після «Ще раз»
    void seed
    return shuffle(all)
  }, [groups, seed])

  const doneCount = useMemo(() => {
    const keys = new Set(groups.flatMap((g) => g.items.map((it) => `idiom:${it.de}`)))
    return Object.keys(map).filter((k) => keys.has(k) && map[k]?.l).length
  }, [map, groups])

  return (
    <div>
      {/* групи */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setScope('all')}
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
            scope === 'all' ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100'
          }`}
        >
          🌍 {L('Усі фрази', 'Все фразы')} {IDIOM_TOTAL}
        </button>
        {IDIOM_GROUPS.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setScope(g.id)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              scope === g.id ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            {g.emoji} {g.name[lang]}
          </button>
        ))}
      </div>

      {/* режими */}
      <div className="mb-5 flex items-center justify-between gap-2">
        <div className="flex gap-1.5">
          {(
            [
              ['list', `📖 ${L('Огляд', 'Обзор')}`],
              ['cards', `🃏 ${L('Картки', 'Карточки')}`],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setMode(k)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors ${
                mode === k ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <span className="text-xs font-semibold text-emerald-700">✓ {doneCount}</span>
      </div>

      {mode === 'list' ? (
        <ListView groups={groups} />
      ) : (
        <CardsView
          key={`${scope}-${seed}`}
          items={scopeItems}
          done={doneCount}
          setLearned={setLearned}
          again={() => setSeed((s) => s + 1)}
        />
      )}
    </div>
  )
}
