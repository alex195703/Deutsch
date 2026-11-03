'use client'

// ============================================================
// Вкладка «Граматика» — шпаргалка A1: акордеон з картками,
// таблицями, прикладами й озвучкою.
// ============================================================

import { useState } from 'react'
import { useBi, useL } from '@/lib/i18n'
import { GRAMMAR } from '@/lib/deutsch-grammar'
import { SpeakBtn } from '@/lib/trainer'

export function GrammarTab() {
  const L = useL()
  const B = useBi()
  const [open, setOpen] = useState<Set<string>>(() => new Set([GRAMMAR[0].id]))

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
          'Стисла довідка A1: те, що найчастіше стане в пригоді. Розгорніть картку — усередині таблиці й приклади з озвучкою.',
          'Краткая справка A1: то, что чаще всего пригодится. Разверните карточку — внутри таблицы и примеры с озвучкой.',
        )}
      </p>
      {GRAMMAR.map((g) => {
        const isOpen = open.has(g.id)
        return (
          <article key={g.id} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <button
              type="button"
              onClick={() => toggle(g.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-zinc-50"
            >
              <span className="flex items-center gap-3 font-bold text-zinc-900">
                <span className="text-xl">{g.icon}</span>
                {B(g.title)}
              </span>
              <span className={`text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>
            {isOpen && (
              <div className="border-t border-zinc-100 px-5 py-4">
                {g.intro && <p className="text-sm leading-relaxed text-zinc-600">{B(g.intro)}</p>}
                {g.tables && g.tables.length > 0 && (
                  <div className={`mt-3 grid gap-3 ${g.tables.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                    {g.tables.map((t, ti) => (
                      <div key={ti} className="overflow-x-auto rounded-xl border border-zinc-200">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-zinc-200 bg-zinc-50 text-left">
                              {t.head.map((h, hi) => (
                                <th key={hi} className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-zinc-500">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {t.rows.map((r, ri) => (
                              <tr key={ri} className="border-b border-zinc-100 last:border-0">
                                {r.map((cell, ci) => (
                                  <td
                                    key={ci}
                                    className={`px-3 py-1.5 ${ci === 0 ? 'font-semibold text-zinc-500' : 'font-bold text-zinc-900'}`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                )}
                {g.lines && (
                  <ul className="mt-3 space-y-1.5">
                    {g.lines.map((line, i) => (
                      <li key={i} className="flex gap-2 text-sm leading-relaxed text-zinc-600">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                        <span>{B(line)}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {g.examples && (
                  <div className="mt-3 space-y-1.5">
                    {g.examples.map((ex, i) => (
                      <p key={i} className="rounded-xl bg-zinc-50 px-3 py-2 text-sm leading-relaxed">
                        <span className="font-semibold text-zinc-800">{ex.de}</span>{' '}
                        <SpeakBtn text={ex.de} className="h-6 w-6 align-middle text-sm" />
                        <br />
                        <span className="text-zinc-500">{ex.tr}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}
