'use client'

// ============================================================
// РОЗДІЛ «МОДАЛЬНІ ДІЄСЛОВА»: три режими.
//   📋 Таблиці   — відмінювання 6 дієслів у Präsens/Präteritum,
//                  значення, відтінок вживання, «пастки».
//   💬 Приклади  — речення з підсвіченою рамкою (Satzklammer:
//                  модальне дієслово на 2-му місці + Infinitiv
//                  у кінці), з озвучкою й перекладом.
//   🎯 Тренувати — змішаний раунд із 8 завдань: правильна
//                  форма, склади речення в рамці, вибір
//                  дієслова за змістом. XP — через record.
// ============================================================

import { useCallback, useState } from 'react'
import { useL } from '@/lib/i18n'
import {
  MODALS, MODAL_PERSONS, MSENSES, exSentence,
  type MExample, type ModalVerb,
} from '@/lib/deutsch-modal'
import { SpeakBtn, shuffle, speak } from '@/lib/trainer'
import type { Kind } from '@/lib/gamify'

type RecordFn = (key: string, ok: boolean, kind: Kind) => void

// ---------- спільне ----------

/** Речення з підсвіченою дієслівною рамкою: модальне (зелений) + кінець рамки (синій) */
function FrameSentence({ ex, big }: { ex: MExample; big?: boolean }) {
  return (
    <span className={big ? 'text-lg leading-relaxed' : 'text-base leading-relaxed'}>
      {ex.pre && <span className="text-zinc-800">{ex.pre} </span>}
      <span className="font-black text-emerald-700">{ex.modal}</span>
      {ex.mid && <span className="text-zinc-600"> {ex.mid}</span>}
      <span className="font-black text-sky-700"> {ex.inf}</span>
    </span>
  )
}

function ExCard({ ex }: { ex: MExample }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <FrameSentence ex={ex} />
        <SpeakBtn text={exSentence(ex)} />
      </div>
      <p className="mt-1.5 text-sm text-zinc-500">
        {ex.uk} / {ex.ru}
      </p>
      {ex.note && (
        <p className="mt-2 rounded-xl bg-amber-50 px-3 py-1.5 text-xs leading-relaxed text-amber-800">
          💡 {ex.note.uk} / {ex.note.ru}
        </p>
      )}
    </div>
  )
}

// ---------- РЕЖИМ «ТАБЛИЦІ» ----------

function TableMode() {
  const L = useL()
  const [sel, setSel] = useState(MODALS[0].id)
  const [tense, setTense] = useState<'pr' | 'pt'>('pr')
  const verb = MODALS.find((v) => v.id === sel) as ModalVerb
  const forms = tense === 'pr' ? verb.pr : verb.pt

  return (
    <div>
      {/* вибір дієслова */}
      <div className="mb-2 flex flex-wrap justify-center gap-1.5">
        {MODALS.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setSel(v.id)}
            className={`rounded-full border px-3 py-1.5 text-sm font-bold transition-colors ${
              sel === v.id ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100'
            }`}
          >
            {v.inf}
          </button>
        ))}
      </div>

      {/* вибір часу */}
      <div className="mb-4 flex flex-wrap justify-center gap-1.5">
        {(
          [
            ['pr', '⏱ ' + L('Präsens', 'Präsens')],
            ['pt', '📜 ' + L('Präteritum', 'Präteritum')],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            onClick={() => setTense(k)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              tense === k ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* картка дієслова */}
      <div className="rounded-3xl border-2 border-zinc-800 bg-white p-5 shadow-md sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-2xl font-black text-zinc-900">{verb.inf}</p>
            <p className="mt-0.5 text-sm font-semibold text-zinc-600">
              {verb.meaning.uk} / {verb.meaning.ru}
            </p>
          </div>
          <SpeakBtn text={verb.inf} />
        </div>

        <p className="mt-2 text-xs leading-relaxed text-zinc-500">
          {verb.force.uk} / {verb.force.ru}
        </p>

        {/* таблиця відмінювання — тап по рядку озвучує форму */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200">
          {MODAL_PERSONS.map((person, i) => (
            <button
              key={person}
              type="button"
              onClick={() => speak(person.includes('/') ? forms[i] : `${person} ${forms[i]}`)}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors hover:bg-zinc-50 ${
                i % 2 === 0 ? 'bg-white' : 'bg-zinc-50/60'
              }`}
            >
              <span className="text-sm font-semibold text-zinc-500">{person}</span>
              <span className="flex items-center gap-2 text-base font-black text-zinc-900">
                {forms[i]}
                <span className="text-xs text-zinc-300">🔊</span>
              </span>
            </button>
          ))}
        </div>

        {verb.id === 'moegte' && tense === 'pt' && (
          <p className="mt-2 text-xs text-zinc-400">
            {L('Форми від mögen — так це дієслово звучить в минулому.', 'Формы от mögen — так этот глагол звучит в прошедшем.')}
          </p>
        )}

        {verb.trap && (
          <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-rose-500">
              {L('Зверни увагу', 'Обрати внимание')}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-rose-900">
              {verb.trap.uk} / {verb.trap.ru}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ---------- РЕЖИМ «ПРИКЛАДИ» ----------

function ExamplesMode() {
  const L = useL()
  return (
    <div className="space-y-6">
      <p className="mx-auto max-w-md text-center text-xs leading-relaxed text-zinc-500">
        {L(
          'Рамка речення: модальне дієслово стоїть на 2-му місці (зелений), а інфінітив — у самому кінці (синій). Це правило працює завжди.',
          'Рамка предложения: модальный глагол стоит на 2-м месте (зелёный), а инфинитив — в самом конце (синий). Это правило работает всегда.',
        )}
      </p>
      {MODALS.map((v) => (
        <div key={v.id}>
          <div className="mb-2 flex items-baseline gap-2">
            <p className="text-lg font-black text-zinc-900">{v.inf}</p>
            <p className="text-xs font-semibold text-zinc-400">
              {v.meaning.uk} / {v.meaning.ru}
            </p>
          </div>
          <div className="space-y-2">
            {v.examples.map((ex, i) => (
              <ExCard key={`${v.id}-${i}`} ex={ex} />
            ))}
          </div>
        </div>
      ))}
      <p className="text-center text-xs text-zinc-400">
        {L('Усього прикладів', 'Всего примеров')}:{' '}
        {MODALS.reduce((s, v) => s + v.examples.length, 0)}
      </p>
    </div>
  )
}

// ---------- РЕЖИМ «ТРЕНУВАТИ» ----------

type FormQ = { k: 'forms'; v: ModalVerb; pi: number; tense: 'pr' | 'pt'; options: string[] }
type OrderQ = { k: 'order'; ex: MExample; verbId: string; tokens: string[]; full: string }
type SenseQ = { k: 'sense'; idx: number; uk: string; ru: string; verb: string; options: string[] }
type MQ = FormQ | OrderQ | SenseQ

const ROUNDS = 8

function buildFormQ(): FormQ {
  const v = MODALS[Math.floor(Math.random() * MODALS.length)]
  const tense: 'pr' | 'pt' = Math.random() < 0.6 ? 'pr' : 'pt'
  const pi = Math.floor(Math.random() * 6)
  const correct = (tense === 'pr' ? v.pr : v.pt)[pi]
  const seen = new Set([correct])
  const opts: string[] = []
  // збиваємо: інші форми того самого дієслова, потім форми інших дієслів
  shuffle((tense === 'pr' ? v.pr : v.pt).filter((f) => !seen.has(f))).forEach((f) => {
    if (opts.length < 2 && !seen.has(f)) { opts.push(f); seen.add(f) }
  })
  MODALS.filter((x) => x.id !== v.id).forEach((x) => {
    const f = (tense === 'pr' ? x.pr : x.pt)[pi]
    if (opts.length < 3 && !seen.has(f)) { opts.push(f); seen.add(f) }
  })
  return { k: 'forms', v, pi, tense, options: shuffle([correct, ...opts]) }
}

function buildOrderQ(): OrderQ {
  const v = MODALS[Math.floor(Math.random() * MODALS.length)]
  const vi = Math.floor(Math.random() * v.examples.length)
  const ex = v.examples[vi]
  const full = exSentence(ex)
  return { k: 'order', ex, verbId: v.id, tokens: shuffle(full.split(' ')), full }
}

function buildSenseQ(): SenseQ {
  const idx = Math.floor(Math.random() * MSENSES.length)
  const s = MSENSES[idx]
  const verb = MODALS.find((v) => v.id === s.verb) as ModalVerb
  const others = shuffle(MODALS.filter((v) => v.id !== s.verb)).slice(0, 3).map((v) => v.inf)
  return { k: 'sense', idx, uk: s.uk, ru: s.ru, verb: verb.inf, options: shuffle([verb.inf, ...others]) }
}

function buildRound(): MQ[] {
  return Array.from({ length: ROUNDS }, () => {
    const r = Math.random()
    if (r < 0.45) return buildFormQ()
    if (r < 0.8) return buildOrderQ()
    return buildSenseQ()
  })
}

function DrillMode({ record }: { record: RecordFn }) {
  const L = useL()
  const [round, setRound] = useState<MQ[] | null>(null)
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState<number[]>([])
  const [chosen, setChosen] = useState<string | null>(null)
  const [checked, setChecked] = useState<null | boolean>(null)

  const start = useCallback(() => {
    setRound(buildRound())
    setIdx(0)
    setScore(0)
    setPicked([])
    setChosen(null)
    setChecked(null)
  }, [])

  const q = round !== null && idx < ROUNDS ? round[idx] : undefined

  const check = () => {
    if (!q || checked !== null) return
    let ok = false
    let key = ''
    if (q.k === 'forms') {
      ok = chosen === (q.tense === 'pr' ? q.v.pr : q.v.pt)[q.pi]
      key = `mform:${q.v.id}:${q.tense}:${q.pi}`
    } else if (q.k === 'order') {
      const answerText = picked.map((i) => q.tokens[i]).join(' ')
      ok = answerText === q.full
      key = `mex:${q.verbId}:${q.ex.pre}|${q.ex.inf}`
    } else {
      ok = chosen === q.verb
      key = `msense:${q.idx}`
    }
    setChecked(ok)
    record(key, ok, 'verb')
    if (ok) setScore((s) => s + 1)
  }

  const next = () => {
    if (idx + 1 >= ROUNDS) {
      setIdx(ROUNDS)
      return
    }
    setPicked([])
    setChosen(null)
    setChecked(null)
    setIdx((i) => i + 1)
  }

  if (!round || !q) {
    if (round && idx >= ROUNDS) {
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
            onClick={start}
            className="mt-6 rounded-xl bg-zinc-900 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-zinc-700"
          >
            ↺ {L('Ще раз', 'Ещё раз')}
          </button>
        </div>
      )
    }
    return (
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <div className="text-5xl">🗝️</div>
        <h2 className="mt-3 text-xl font-black text-zinc-900">
          {L('Модальні дієслова', 'Модальные глаголы')}
        </h2>
        <p className="mt-1 text-sm font-semibold text-zinc-500">
          können · müssen · dürfen · wollen · sollen · möchten
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-600">
          {L(
            '8 завдань на раунд: правильна форма, порядок слів у дієслівній рамці та вибір дієслова за змістом. За правильні відповіді нараховується XP.',
            '8 заданий на раунд: правильная форма, порядок слов в глагольной рамке и выбор глагола по смыслу. За правильные ответы начисляется XP.',
          )}
        </p>
        <button
          type="button"
          onClick={start}
          className="mt-6 rounded-xl bg-zinc-900 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-zinc-700"
        >
          ▶ {L('Почати', 'Начать')}
        </button>
      </div>
    )
  }

  const canCheck = q.k === 'order' ? picked.length === q.tokens.length : chosen !== null

  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-zinc-500">
        {L('Завдання', 'Задание')} {idx + 1} / {ROUNDS} · ✓ {score}
      </p>
      <div className="rounded-3xl border-2 border-zinc-800 bg-white p-6 text-center shadow-md sm:p-8">
        {q.k === 'forms' && (
          <>
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">
              {L('Обери правильну форму', 'Выбери правильную форму')}
            </p>
            <p className="mt-3 text-xl font-black text-zinc-900">
              {q.v.inf} · {MODAL_PERSONS[q.pi]}
            </p>
            <p className="text-xs font-semibold text-zinc-400">{q.tense === 'pr' ? 'Präsens' : 'Präteritum'}</p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {q.options.map((o) => (
                <button
                  key={o}
                  type="button"
                  disabled={checked !== null}
                  onClick={() => setChosen(o)}
                  className={`rounded-xl border-2 px-3 py-3 text-lg font-black transition-all ${
                    checked === null
                      ? 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-500 hover:bg-zinc-50'
                      : o === (q.tense === 'pr' ? q.v.pr : q.v.pt)[q.pi]
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : o === chosen
                          ? 'border-rose-500 bg-rose-50 text-rose-800'
                          : 'border-zinc-100 bg-zinc-50 text-zinc-300'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
            {checked !== null && (
              <p className="mt-4 text-sm text-zinc-600">
                <span className="font-bold text-emerald-700">
                  {MODAL_PERSONS[q.pi]} {(q.tense === 'pr' ? q.v.pr : q.v.pt)[q.pi]}
                </span>
                <span className="text-zinc-400"> — {q.v.inf} ({q.v.meaning.uk} / {q.v.meaning.ru})</span>
              </p>
            )}
          </>
        )}

        {q.k === 'order' && (
          <>
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">
              {L('Збери речення — дієслівна рамка!', 'Собери предложение — глагольная рамка!')}
            </p>
            <p className="mt-3 text-xl font-black leading-snug text-zinc-900">{q.ex.uk}</p>
            <p className="mt-0.5 text-sm text-zinc-400">{q.ex.ru}</p>
            <div
              className={`mt-4 min-h-[3.25rem] rounded-2xl border-2 border-dashed p-2 ${
                checked === true ? 'border-emerald-400 bg-emerald-50' : checked === false ? 'border-rose-400 bg-rose-50' : 'border-zinc-300 bg-zinc-50'
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
                      className="rounded-lg border border-zinc-400 bg-white px-2.5 py-1.5 text-sm font-bold text-zinc-800"
                    >
                      {q.tokens[ci]}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {q.tokens.map((w, i) =>
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
            {checked !== null && (
              <div className="mt-4 flex flex-col items-center gap-2">
                <FrameSentence ex={q.ex} big />
                <SpeakBtn text={q.full} />
              </div>
            )}
          </>
        )}

        {q.k === 'sense' && (
          <>
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">
              {L('Яке модальне дієслово пасує?', 'Какой модальный глагол подходит?')}
            </p>
            <p className="mt-3 text-xl font-black leading-snug text-zinc-900">«{q.uk}»</p>
            <p className="mt-0.5 text-sm text-zinc-400">«{q.ru}»</p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {q.options.map((o) => (
                <button
                  key={o}
                  type="button"
                  disabled={checked !== null}
                  onClick={() => setChosen(o)}
                  className={`rounded-xl border-2 px-3 py-3 text-lg font-black transition-all ${
                    checked === null
                      ? 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-500 hover:bg-zinc-50'
                      : o === q.verb
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : o === chosen
                          ? 'border-rose-500 bg-rose-50 text-rose-800'
                          : 'border-zinc-100 bg-zinc-50 text-zinc-300'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
            {checked !== null && (
              <p className="mt-4 text-sm text-zinc-600">
                {L('Наприклад', 'Например')}:{' '}
                <span className="font-bold text-emerald-700">
                  {(() => {
                    const v = MODALS.find((x) => x.inf === q.verb) as ModalVerb
                    return exSentence(v.examples[0])
                  })()}
                </span>
              </p>
            )}
          </>
        )}

        {checked === null ? (
          <button
            type="button"
            disabled={!canCheck}
            onClick={check}
            className={`mt-6 rounded-xl px-8 py-2.5 text-sm font-bold transition-colors ${
              canCheck ? 'bg-zinc-900 text-white hover:bg-zinc-700' : 'cursor-not-allowed bg-zinc-200 text-zinc-400'
            }`}
          >
            ✔ {L('Перевірити', 'Проверить')}
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            className="mt-6 rounded-xl bg-zinc-900 px-8 py-2.5 text-sm font-bold text-white transition-colors hover:bg-zinc-700"
          >
            {idx + 1 >= ROUNDS ? `${L('Підсумок', 'Итог')} →` : `${L('Далі', 'Далее')} →`}
          </button>
        )}
      </div>
    </div>
  )
}

// ---------- ВКЛАДКА ----------

type Mode = 'table' | 'examples' | 'drill'

export function ModalTab({ record }: { record: RecordFn }) {
  const L = useL()
  const [mode, setMode] = useState<Mode>('table')
  return (
    <div>
      <div className="mb-4 flex flex-wrap justify-center gap-1.5">
        {(
          [
            ['table', `📋 ${L('Таблиці', 'Таблицы')}`],
            ['examples', `💬 ${L('Приклади', 'Примеры')}`],
            ['drill', `🎯 ${L('Тренувати', 'Тренировать')}`],
          ] as const
        ).map(([m, label]) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              mode === m ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {mode === 'table' && <TableMode />}
      {mode === 'examples' && <ExamplesMode />}
      {mode === 'drill' && <DrillMode record={record} />}
    </div>
  )
}
