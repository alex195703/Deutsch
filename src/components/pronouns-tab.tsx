'use client'

// ============================================================
// Вкладка «Займенники» — таблиці відмінювання в чотирьох
// відмінках (акордеон, як у «Граматиці»). Кожна німецька форма
// — це кнопка: тап = озвучка. Відмінки підсвічені кольором:
// Nominativ зелений, Akkusativ рожевий, Dativ синій, Genitiv
// бурштиновий — ті самі кольори, що й у вкладці «Прийменники».
// ============================================================

import { useState } from 'react'
import { useBi, useL } from '@/lib/i18n'
import { PRON_TABLES } from '@/lib/deutsch-pronouns'
import { speak } from '@/lib/trainer'

/** Кольори відмінків — спільна мова з розділом «Прийменники» */
const CASE_COLOR: Record<string, string> = {
  Nominativ: 'text-emerald-700',
  Akkusativ: 'text-rose-700',
  Dativ: 'text-sky-700',
  Genitiv: 'text-amber-700',
}

export function PronounsTab() {
  const L = useL()
  const B = useBi()
  const [open, setOpen] = useState<Set<string>>(() => new Set([PRON_TABLES[0].id]))

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <div className="space-y-3">
      <p className="mb-1 text-sm leading-relaxed text-zinc-600">
        {L(
          'Займенники в чотирьох відмінках: хто? кого? кому? чий? Розгорніть таблицю і тапайте будь-яку форму — почуєте вимову.',
          'Местоимения в четырёх падежах: кто? кого? кому? чей? Разверните таблицу и нажимайте на любую форму — услышите произношение.',
        )}
      </p>
      {PRON_TABLES.map((t) => {
        const isOpen = open.has(t.id)
        return (
          <article key={t.id} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <button
              type="button"
              onClick={() => toggle(t.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-zinc-50"
            >
              <span className="flex items-center gap-3 font-bold text-zinc-900">
                <span className="text-xl">{t.icon}</span>
                {B(t.title)}
              </span>
              <span className={`text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>
            {isOpen && (
              <div className="border-t border-zinc-100 px-5 py-4">
                {t.intro && <p className="text-sm leading-relaxed text-zinc-600">{B(t.intro)}</p>}
                <div className="mt-3 overflow-x-auto rounded-xl border border-zinc-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-200 bg-zinc-50 text-left">
                        {t.head.map((h, hi) => (
                          <th
                            key={hi}
                            className={`px-3 py-2 text-xs font-bold uppercase tracking-wide ${
                              hi === 0 ? 'text-zinc-500' : CASE_COLOR[Object.keys(CASE_COLOR).find((c) => h.startsWith(c)) ?? ''] ?? 'text-zinc-500'
                            }`}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {t.rows.map((r, ri) => (
                        <tr key={ri} className="border-b border-zinc-100 last:border-0">
                          <td className="px-3 py-1.5 text-xs font-semibold text-zinc-500">{B(r.label)}</td>
                          {r.cells.map((c, ci) => (
                            <td key={ci} className="px-1 py-1">
                              {c === null ? (
                                <span className="px-2 text-zinc-300">—</span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => speak(c)}
                                  aria-label={`${c} · озвучка`}
                                  title={`${c} — ${L('прослухати', 'прослушать')}`}
                                  className="w-full rounded-lg px-2 py-1 text-left font-bold text-zinc-900 transition-colors hover:bg-amber-100 active:bg-amber-200"
                                >
                                  {c}
                                </button>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {t.notes && (
                  <ul className="mt-3 space-y-1.5">
                    {t.notes.map((note, i) => (
                      <li key={i} className="flex gap-2 text-sm leading-relaxed text-zinc-600">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                        <span>{B(note)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}
