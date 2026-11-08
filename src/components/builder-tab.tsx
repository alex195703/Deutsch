'use client'

// ============================================================
// ВКЛАДКА «МОВНИЙ КОНСТРУКТОР».
// Два режими:
//   🛠 Збирати — обираєш слово з кожної групи (займенник,
//      дієслово, іменник/прикметник), час і тон — двигун
//      збирає правильне речення + переклад + пояснення.
//   🎯 Тренувати — 8 раундів: переклад → зібрати німецьке
//      речення з перемішаних слів.
// ============================================================

import { useMemo, useState } from 'react'
import { useL } from '@/lib/i18n'
import {
  ADJS_C, DEFAULT_TIME, NOUNS_C, PRONOUNS_C, TIMES_C, TENSE_LABEL, VERBS_C,
  allowedNouns, buildSentence, randomBuilt, slotFor,
  type Built, type Tense,
} from '@/lib/deutsch-builder'
import { SpeakBtn, shuffle } from '@/lib/trainer'

type Mode = 'build' | 'quiz'

const chip = (active: boolean, disabled = false) =>
  `rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
    disabled
      ? 'cursor-not-allowed border-zinc-200 bg-zinc-50 text-zinc-300'
      : active
        ? 'border-zinc-900 bg-zinc-900 text-white'
        : 'border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100'
  }`

// ---------- ПОЯСНЕННЯ ----------

function SentenceCard({ b, extra }: { b: Built; extra?: React.ReactNode }) {
  const L = useL()
  return (
    <div className="rounded-3xl border-2 border-zinc-800 bg-white p-6 shadow-md sm:p-8">
      <div className="flex items-start justify-between gap-2">
        <p className="text-2xl font-black leading-snug tracking-tight text-zinc-900 sm:text-3xl">{b.de}</p>
        <SpeakBtn text={b.de} />
      </div>
      <p className="mt-3 text-base font-bold text-emerald-700">{b.uk}</p>
      <p className="mt-1 text-sm font-semibold text-sky-700">{b.ru}</p>
      {b.notes.length > 0 && (
        <ul className="mt-4 space-y-1.5 border-t border-dashed border-zinc-200 pt-4">
          {b.notes.map((nt, i) => (
            <li key={i} className="rounded-xl bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-800">
              💡 {nt.uk} / {nt.ru}
            </li>
          ))}
        </ul>
      )}
      {extra}
    </div>
  )
}

// ---------- РЕЖИМ «ЗБИРАТИ» ----------

function BuildMode() {
  const L = useL()
  const [pron, setPron] = useState<string | null>('ich')
  const [verb, setVerb] = useState<string | null>('lesen')
  const [noun, setNoun] = useState<string | null>('buch')
  const [adj, setAdj] = useState<string | null>('gut')
  const [time, setTime] = useState<string | null>('heute')
  const [tense, setTense] = useState<Tense>('praesens')
  const [neg, setNeg] = useState(false)

  const v = VERBS_C.find((x) => x.id === verb) ?? null
  const slot = v ? slotFor(v) : 'noun'

  const chooseVerb = (id: string) => {
    setVerb(id)
    const nv = VERBS_C.find((x) => x.id === id)
    if (!nv) return
    const s = slotFor(nv)
    if (s === 'adj') {
      setNoun(null)
      setAdj((a) => a ?? 'gut')
      setPron(null) // sein-речення — про речі: підмет-іменник
    } else {
      setAdj(null)
      setPron((p) => p ?? 'ich')
      const allowed = allowedNouns(nv)
      if (!allowed.includes(noun ?? '')) {
        const first = allowed[0]
        setNoun(first ?? null)
      }
      if (nv.kind !== 'trans' && nv.kind !== 'move') setTime(null)
      else setTime((t) => t ?? DEFAULT_TIME[tense])
    }
  }

  const allowed = v ? allowedNouns(v) : []
  const timesForTense = TIMES_C.filter((t) => t.tenses.includes(tense))

  const built = useMemo(() => {
    try {
      return buildSentence({ pron, verb, noun, adj, time: time ?? DEFAULT_TIME[tense], tense, neg })
    } catch {
      return null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pron, verb, noun, adj, time, tense, neg])

  const randomize = () => {
    const nv = VERBS_C[Math.floor(Math.random() * VERBS_C.length)]
    const t: Tense = (['praesens', 'vergangen', 'zukunft'] as const)[Math.floor(Math.random() * 3)]
    setTense(t)
    setNeg(Math.random() < 0.4)
    setVerb(nv.id)
    const s = slotFor(nv)
    if (s === 'adj') {
      setPron(null)
      setAdj(ADJS_C[Math.floor(Math.random() * ADJS_C.length)].id)
      setNoun(NOUNS_C[Math.floor(Math.random() * NOUNS_C.length)].id)
    } else if (s === 'none') {
      setPron(PRONOUNS_C[Math.floor(Math.random() * PRONOUNS_C.length)].id)
      setNoun(null)
      const ts = TIMES_C.filter((x) => x.tenses.includes(t))
      setTime(ts[Math.floor(Math.random() * ts.length)].id)
    } else {
      setPron(PRONOUNS_C[Math.floor(Math.random() * PRONOUNS_C.length)].id)
      const al = allowedNouns(nv)
      setNoun(al[Math.floor(Math.random() * al.length)] ?? null)
      if (nv.kind === 'trans') {
        const ts = TIMES_C.filter((x) => x.tenses.includes(t))
        setTime(ts[Math.floor(Math.random() * ts.length)].id)
      } else {
        setTime(null)
      }
    }
  }

  return (
    <div className="space-y-4">
      {/* дієслово */}
      <div>
        <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-zinc-400">
          1️⃣ {L('Дієслово', 'Глагол')}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {VERBS_C.map((x) => (
            <button key={x.id} type="button" onClick={() => chooseVerb(x.id)} className={chip(verb === x.id)}>
              {x.inf}
            </button>
          ))}
        </div>
        {v && (
          <p className="mt-1 text-xs font-semibold text-zinc-500">
            {v.uk} / {v.ru}
            {slot === 'adj' && ` · ${L('sein — речення про речі: підметом буде іменник', 'sein — предложение о вещах: подлежащее-существительное')}`}
            {slot === 'none' && ` · ${L('рух: додай обставину часу', 'движение: добавь обстоятельство времени')}`}
          </p>
        )}
      </div>

      {/* займенник */}
      {slot !== 'adj' && (
        <div>
          <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-zinc-400">
            2️⃣ {L('Займенник', 'Местоимение')}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {PRONOUNS_C.map((x) => (
              <button key={x.id} type="button" onClick={() => setPron(x.id)} className={chip(pron === x.id)}>
                {x.de}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* іменник або прикметник */}
      {slot === 'adj' && (
        <div>
          <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-zinc-400">
            3️⃣ {L('Прикметник', 'Прилагательное')}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {ADJS_C.map((x) => (
              <button key={x.id} type="button" onClick={() => setAdj(x.id)} className={chip(adj === x.id)}>
                {x.de}
              </button>
            ))}
          </div>
        </div>
      )}
      {slot === 'noun' && (
        <div>
          <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-zinc-400">
            3️⃣ {L('Іменник', 'Существительное')}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {NOUNS_C.map((x) => {
              const ok = allowed.length === 0 || allowed.includes(x.id)
              return (
                <button
                  key={x.id}
                  type="button"
                  disabled={!ok}
                  onClick={() => setNoun(x.id)}
                  className={chip(noun === x.id, !ok)}
                  title={ok ? x.deNp : L('З цим дієсловом не поєднується', 'С этим глаголом не сочетается')}
                >
                  {x.art} {x.de}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* час (для перехідних і рухових) */}
      {(v?.kind === 'trans' || v?.kind === 'move') && (
        <div>
          <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-zinc-400">
            4️⃣ {L('Коли?', 'Когда?')}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {timesForTense.map((t) => (
              <button key={t.id} type="button" onClick={() => setTime(t.id)} className={chip(time === t.id)}>
                {t.de}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* час дієслова + тон */}
      <div className="flex flex-wrap items-center gap-1.5">
        {(['praesens', 'vergangen', 'zukunft'] as const).map((t) => (
          <button key={t} type="button" onClick={() => { setTense(t); setTime(DEFAULT_TIME[t]) }} className={chip(tense === t)}>
            {t === 'praesens' ? '⏱' : t === 'vergangen' ? '📜' : '⏭'} {L(TENSE_LABEL[t].uk, TENSE_LABEL[t].ru)}
          </button>
        ))}
        <span className="mx-1 h-5 w-px bg-zinc-200" />
        <button type="button" onClick={() => setNeg(false)} className={chip(!neg)}>
          ✓ {L('ствердження', 'утверждение')}
        </button>
        <button type="button" onClick={() => setNeg(true)} className={chip(neg)}>
          ✗ {L('заперечення', 'отрицание')}
        </button>
      </div>

      {/* результат */}
      {built ? (
        <SentenceCard
          b={built}
          extra={
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={randomize}
                className="rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-zinc-700"
              >
                🎲 {L('Випадкове речення', 'Случайное предложение')}
              </button>
            </div>
          }
        />
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-white p-8 text-center">
          <p className="text-sm font-semibold text-zinc-400">
            {L('Оберіть дієслово і слово до нього — речення з’явиться тут.', 'Выберите глагол и слово к нему — предложение появится здесь.')}
          </p>
        </div>
      )}
    </div>
  )
}

// ---------- РЕЖИМ «ТРЕНУВАТИ» ----------

const ROUNDS = 8

function QuizMode({ record }: { record: (key: string, ok: boolean) => void }) {
  const L = useL()
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [item, setItem] = useState<Built>(() => randomBuilt())
  const [chips, setChips] = useState<string[]>(() => shuffle(item.tokens))
  const [picked, setPicked] = useState<number[]>([])
  const [checked, setChecked] = useState<null | boolean>(null)

  const answer = picked.map((i) => chips[i]).join(' ')

  const next = () => {
    if (round + 1 >= ROUNDS) {
      setRound(ROUNDS)
      return
    }
    const b = randomBuilt()
    setItem(b)
    setChips(shuffle(b.tokens))
    setPicked([])
    setChecked(null)
    setRound((r) => r + 1)
  }

  const restart = () => {
    const b = randomBuilt()
    setRound(0)
    setScore(0)
    setItem(b)
    setChips(shuffle(b.tokens))
    setPicked([])
    setChecked(null)
  }

  if (round >= ROUNDS) {
    const pct = Math.round((score / ROUNDS) * 100)
    const verdict = pct === 100 ? '🏆' : pct >= 80 ? '🎉' : pct >= 60 ? '💪' : '📖'
    return (
      <div className="rounded-3xl border-2 border-zinc-800 bg-white p-8 text-center shadow-md">
        <div className="text-5xl">{verdict}</div>
        <p className="mt-3 text-3xl font-black text-zinc-900">
          {score} / {ROUNDS} <span className="text-lg font-bold text-zinc-500">({pct}%)</span>
        </p>
        <button
          type="button"
          onClick={restart}
          className="mt-6 rounded-xl bg-zinc-900 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-zinc-700"
        >
          ↺ {L('Ще раз', 'Ещё раз')}
        </button>
      </div>
    )
  }

  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-zinc-500">
        {L('Речення', 'Предложение')} {round + 1} / {ROUNDS} · ✓ {score}
      </p>
      <div className="rounded-3xl border-2 border-zinc-800 bg-white p-6 text-center shadow-md sm:p-8">
        <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">
          {L('Збери німецьке речення за перекладом', 'Собери немецкое предложение по переводу')}
        </p>
        <p className="mt-3 text-xl font-black leading-snug text-zinc-900">{item.uk}</p>

        {/* лінія відповіді */}
        <div
          className={`mt-5 min-h-[3.25rem] rounded-2xl border-2 border-dashed p-2 ${
            checked === true
              ? 'border-emerald-400 bg-emerald-50'
              : checked === false
                ? 'border-rose-400 bg-rose-50'
                : 'border-zinc-300 bg-zinc-50'
          }`}
        >
          {picked.length === 0 ? (
            <p className="px-2 py-2 text-xs font-semibold text-zinc-400">…</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-1.5">
              {picked.map((ci, pos) => (
                <button
                  key={`${ci}-${pos}`}
                  type="button"
                  disabled={checked !== null}
                  onClick={() => setPicked((ps) => ps.filter((_, i) => i !== pos))}
                  className={`rounded-lg border px-2.5 py-1.5 text-sm font-bold transition-colors ${
                    checked === true
                      ? 'border-emerald-500 bg-white text-emerald-800'
                      : checked === false
                        ? 'border-rose-500 bg-white text-rose-800'
                        : 'border-zinc-400 bg-white text-zinc-800 hover:bg-zinc-100'
                  }`}
                >
                  {chips[ci]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* банк слів */}
        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
          {chips.map((w, i) =>
            picked.includes(i) ? (
              <span key={i} className="rounded-lg border border-zinc-100 bg-zinc-50 px-2.5 py-1.5 text-sm font-bold text-transparent select-none">
                {w}
              </span>
            ) : (
              <button
                key={i}
                type="button"
                disabled={checked !== null}
                onClick={() => setPicked((ps) => [...ps, i])}
                className="rounded-lg border-2 border-zinc-300 bg-white px-2.5 py-1.5 text-sm font-bold text-zinc-800 transition-colors hover:border-zinc-500 hover:bg-zinc-50"
              >
                {w}
              </button>
            ),
          )}
        </div>

        {checked !== null ? (
          <div className="mt-5">
            <p className={`text-sm font-bold ${checked ? 'text-emerald-700' : 'text-rose-700'}`}>
              {checked ? L('Правильно!', 'Правильно!') : L('Майже! Правильний порядок:', 'Почти! Правильный порядок:')}
            </p>
            {!checked && (
              <p className="mt-1 text-base font-black text-zinc-900">{item.de}</p>
            )}
            <div className="mt-2 flex justify-center">
              <SpeakBtn text={item.de} />
            </div>
            {item.notes[0] && (
              <p className="mx-auto mt-2 max-w-md rounded-xl bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-800">
                💡 {item.notes[0].uk} / {item.notes[0].ru}
              </p>
            )}
            <button
              type="button"
              onClick={next}
              className="mt-4 rounded-xl bg-zinc-900 px-8 py-2.5 text-sm font-bold text-white transition-colors hover:bg-zinc-700"
            >
              {round + 1 >= ROUNDS ? `${L('Підсумок', 'Итог')} →` : `${L('Далі', 'Далее')} →`}
            </button>
          </div>
        ) : (
          <button
            type="button"
            disabled={picked.length !== item.tokens.length}
            onClick={() => {
              const ok = answer === item.tokens.join(' ')
              setChecked(ok)
              if (ok) setScore((s) => s + 1)
              record(item.key, ok)
            }}
            className={`mt-5 rounded-xl px-8 py-2.5 text-sm font-bold transition-colors ${
              picked.length === item.tokens.length
                ? 'bg-zinc-900 text-white hover:bg-zinc-700'
                : 'cursor-not-allowed bg-zinc-200 text-zinc-400'
            }`}
          >
            ✔ {L('Перевірити', 'Проверить')}
          </button>
        )}
      </div>
    </div>
  )
}

// ---------- ВКЛАДКА ----------

export function BuilderTab({ record }: { record: (key: string, ok: boolean) => void }) {
  const L = useL()
  const [mode, setMode] = useState<Mode>('build')
  return (
    <div>
      <div className="mb-5 flex justify-center gap-1.5">
        {(
          [
            ['build', `🛠 ${L('Збирати', 'Собирать')}`],
            ['quiz', `🎯 ${L('Тренувати', 'Тренировать')}`],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            onClick={() => setMode(k)}
            className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
              mode === k ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {mode === 'build' ? <BuildMode /> : <QuizMode record={record} />}
    </div>
  )
}
