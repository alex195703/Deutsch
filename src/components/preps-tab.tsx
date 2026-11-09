'use client'

// ============================================================
// Вкладка «Прийменники» — групи за відмінком із прикладами
// застосування й озвучкою. Нагорі — швидка підказка «відмінок →
// кольору» (кольори збігаються з чипами прикладів і з таблицею
// займенників). Пастки й дієслівні сполуки — з помаранчевою
// позначкою 💡.
// ============================================================

import { useState } from 'react'
import { useBi, useL } from '@/lib/i18n'
import { PREP_GROUPS, type PrepCase } from '@/lib/deutsch-preps'
import { SpeakBtn } from '@/lib/trainer'

/** Чип відмінка: колір + підпис */
const CASE_CHIP: Record<PrepCase, { chip: string; label: string }> = {
  Akk: { chip: 'border-rose-200 bg-rose-100 text-rose-700', label: 'Akk' },
  Dat: { chip: 'border-sky-200 bg-sky-100 text-sky-700', label: 'Dat' },
  'Akk/Dat': { chip: 'border-violet-200 bg-violet-100 text-violet-700', label: 'Akk/Dat' },
  Gen: { chip: 'border-amber-200 bg-amber-100 text-amber-800', label: 'Gen' },
}

/** Відмінок групи (для чипа); у групи «дієслово + прийменник» чипа немає — відмінок уже в самому прийменнику */
const GROUP_CASE: Partial<Record<string, PrepCase>> = {
  akk: 'Akk',
  dat: 'Dat',
  wechsel: 'Akk/Dat',
  gen: 'Gen',
}

/** Банер групи — світлий фон тону */
const TONE_BG: Record<string, string> = {
  rose: 'bg-rose-50 text-rose-800 border-rose-200',
  sky: 'bg-sky-50 text-sky-800 border-sky-200',
  violet: 'bg-violet-50 text-violet-800 border-violet-200',
  amber: 'bg-amber-50 text-amber-900 border-amber-200',
  emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
}

export function PrepsTab() {
  const L = useL()
  const B = useBi()
  const [open, setOpen] = useState<Set<string>>(() => new Set(['akk']))

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
          'Прийменники зібрано групами за відмінком, який вони вимагають. Головне питання для групи Akk/Dat: КУДИ? → Akkusativ, ДЕ? → Dativ.',
          'Предлоги собраны в группы по падежу, которого они требуют. Главный вопрос для группы Akk/Dat: КУДА? → Akkusativ, ГДЕ? → Dativ.',
        )}
      </p>

      {/* Легенда кольорів відмінків */}
      <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-xs font-bold shadow-sm">
        <span className="text-zinc-500">{L('Кольори відмінків:', 'Цвета падежей:')}</span>
        {(Object.keys(CASE_CHIP) as PrepCase[]).map((c) => (
          <span key={c} className={`rounded-md border px-2 py-0.5 ${CASE_CHIP[c].chip}`}>
            {CASE_CHIP[c].label}
          </span>
        ))}
      </div>

      {PREP_GROUPS.map((g) => {
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
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-bold text-zinc-500">
                  {g.preps.length}
                </span>
              </span>
              <span className={`text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>
            {isOpen && (
              <div className="border-t border-zinc-100 px-5 py-4">
                <p className={`rounded-xl border px-3 py-2 text-sm font-semibold leading-relaxed ${TONE_BG[g.tone]}`}>
                  {B(g.rule)}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {g.preps.map((p) => (
                    <li key={p.de} className="rounded-2xl border border-zinc-100 bg-zinc-50/60 px-3.5 py-3">
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span className="text-base font-black text-zinc-900">{p.de}</span>
                        {GROUP_CASE[g.id] && (
                          <span
                            className={`rounded-md border px-1.5 py-0.5 text-[11px] font-bold uppercase ${CASE_CHIP[GROUP_CASE[g.id] as PrepCase].chip}`}
                          >
                            {CASE_CHIP[GROUP_CASE[g.id] as PrepCase].label}
                          </span>
                        )}
                        <span className="text-sm text-zinc-600">{B(p.meaning)}</span>
                      </div>
                      <div className="mt-2 space-y-1.5">
                        {p.ex.map((ex, i) => (
                          <p key={i} className="rounded-xl bg-white px-3 py-2 text-sm leading-relaxed shadow-sm">
                            <span className="font-semibold text-zinc-800">{ex.de}</span>{' '}
                            <SpeakBtn text={ex.de} className="h-6 w-6 align-middle text-sm" />
                            <br />
                            <span className="text-zinc-500">{ex.uk} / {ex.ru}</span>
                          </p>
                        ))}
                      </div>
                      {p.note && (
                        <p className="mt-2 rounded-xl bg-amber-50 px-3 py-1.5 text-xs leading-relaxed text-amber-800">
                          💡 {B(p.note)}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}
