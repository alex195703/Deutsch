'use client'

// ============================================================
// Тренажери: Вікторина слів, Артиклі der/die/das, Дієслова.
// Спільна схема: раунд з N питань → відповідь → пояснення →
// підсумок з помилками. Кожна відповідь пишеться в прогрес.
// ============================================================

import { useCallback, useState } from 'react'
import { useBi, useL } from '@/lib/i18n'
import {
  ALL_WORDS, NOUNS, TOPICS, displayDe, wordKey,
  type Topic, type Word,
} from '@/lib/deutsch-data'
import { PRONOUNS, VERBS, type Verb } from '@/lib/deutsch-grammar'
import { ArtChip, SpeakBtn, useTr, shuffle, type ProgressMap } from '@/lib/trainer'

// ---------- спільні дрібниці ----------

function ScopeChips({ scope, setScope }: {
  scope: string
  setScope: (s: string) => void
}) {
  const L = useL()
  const B = useBi()
  return (
    <div className="mb-4 flex flex-wrap gap-1.5">
      <button
        type="button"
        onClick={() => setScope('all')}
        className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
          scope === 'all' ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100'
        }`}
      >
        🌍 {L('Всі теми', 'Все темы')}
      </button>
      {TOPICS.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => setScope(t.id)}
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
            scope === t.id ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100'
          }`}
        >
          {t.emoji} {B(t.name)}
        </button>
      ))}
    </div>
  )
}

function Result({ score, total, mistakes, again }: {
  score: number
  total: number
  mistakes: { de: string; tr: string }[]
  again: () => void
}) {
  const L = useL()
  const pct = Math.round((score / total) * 100)
  const verdict =
    pct === 100 ? '🏆' : pct >= 80 ? '🎉' : pct >= 60 ? '💪' : '📖'
  return (
    <div className="rounded-3xl border-2 border-zinc-800 bg-white p-8 text-center shadow-md">
      <div className="text-5xl">{verdict}</div>
      <p className="mt-3 text-3xl font-black text-zinc-900">
        {score} / {total} <span className="text-lg font-bold text-zinc-500">({pct}%)</span>
      </p>
      {mistakes.length > 0 ? (
        <div className="mt-5 text-left">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-zinc-400">
            {L('Повторити ці слова', 'Повторить эти слова')}
          </p>
          <ul className="space-y-1">
            {mistakes.map((m, i) => (
              <li key={i} className="flex items-center justify-between gap-2 rounded-xl bg-rose-50 px-3 py-2 text-sm">
                <span className="font-bold text-zinc-800">{m.de}</span>
                <span className="text-zinc-600">{m.tr}</span>
                <SpeakBtn text={m.de} className="h-6 w-6 text-sm" />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-3 text-sm font-semibold text-emerald-700">
          {L('Жодної помилки — ідеально!', 'Ни одной ошибки — идеально!')}
        </p>
      )}
      <button
        type="button"
        onClick={again}
        className="mt-6 rounded-xl bg-zinc-900 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-zinc-700"
      >
        ↺ {L('Ще раз', 'Ещё раз')}
      </button>
    </div>
  )
}

// ================= ВІКТОРИНА СЛІВ =================

type QDir = 'de-tr' | 'tr-de'
type Q = { word: Word; topicId: string; dir: QDir; options: Word[] }

function buildRound(pool: { topic: Topic; word: Word }[], n = 10): Q[] {
  const picked = shuffle(pool).slice(0, Math.min(n, pool.length))
  return picked.map(({ topic, word }) => {
    const dir: QDir = Math.random() < 0.5 ? 'de-tr' : 'tr-de'
    const chosen: Word[] = []
    const seen = new Set([word.de])
    const add = (w: Word) => {
      if (!seen.has(w.de) && chosen.length < 3) {
        chosen.push(w)
        seen.add(w.de)
      }
    }
    shuffle(topic.words.filter((x) => x.de !== word.de)).forEach(add)
    if (chosen.length < 3) shuffle(ALL_WORDS.map((a) => a.word)).forEach(add)
    return { word, topicId: topic.id, dir, options: shuffle([word, ...chosen]) }
  })
}

export function QuizTab({ record }: { record: (key: string, ok: boolean) => void }) {
  const L = useL()
  const T = useTr()
  const [scope, setScope] = useState('all')
  const [round, setRound] = useState<Q[] | null>(null)
  const [idx, setIdx] = useState(0)
  const [chosen, setChosen] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [mistakes, setMistakes] = useState<{ de: string; tr: string }[]>([])

  const pool = scope === 'all' ? ALL_WORDS : ALL_WORDS.filter((a) => a.topic.id === scope)

  const start = useCallback(() => {
    setRound(buildRound(pool))
    setIdx(0)
    setChosen(null)
    setScore(0)
    setStreak(0)
    setMistakes([])
  }, [pool])

  const q = round?.[idx]

  return (
    <div>
      <ScopeChips scope={scope} setScope={(s) => { setScope(s); setRound(null) }} />

      {!round ? (
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <div className="text-5xl">🎯</div>
          <h2 className="mt-3 text-xl font-black text-zinc-900">
            {L('Вікторина слів', 'Викторина слов')}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-600">
            {L(
              `10 питань із вибору: ${pool.length} слів у цій вибірці. Німецька → переклад і переклад → німецька, урозтріч. За кожну відповідь — пояснення, помилки зберуться в підсумку.`,
              `10 вопросов на выбор: ${pool.length} слов в этой выборке. Немецкий → перевод и перевод → немецкий, вперемешку. За каждый ответ — пояснение, ошибки соберутся в итоге.`,
            )}
          </p>
          <button
            type="button"
            onClick={start}
            disabled={pool.length < 4}
            className="mt-5 rounded-xl bg-zinc-900 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-zinc-700 disabled:opacity-40"
          >
            ▶ {L('Почати', 'Начать')}
          </button>
        </div>
      ) : !q ? (
        <Result score={score} total={round.length} mistakes={mistakes} again={start} />
      ) : (
        <div>
          <div className="mb-3 flex items-center justify-between text-sm font-semibold text-zinc-500">
            <span>{L('Питання', 'Вопрос')} {idx + 1} / {round.length}</span>
            <span className="flex items-center gap-3">
              {streak >= 3 && <span className="text-amber-600">🔥 {streak}</span>}
              <span>✓ {score}</span>
            </span>
          </div>
          <div className="rounded-3xl border-2 border-zinc-800 bg-white p-6 text-center shadow-md sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">
              {q.dir === 'de-tr'
                ? L('Як це буде українською / російською?', 'Как это будет по-украински / по-русски?')
                : L('Як це буде німецькою?', 'Как это будет по-немецки?')}
            </p>
            <div className="mt-3 flex items-center justify-center gap-2">
              {q.dir === 'de-tr' && q.word.art && <ArtChip art={q.word.art} />}
              <span className="text-3xl font-black tracking-tight text-zinc-900">
                {q.dir === 'de-tr' ? q.word.de : T(q.word)}
              </span>
              {q.dir === 'de-tr' && <SpeakBtn text={displayDe(q.word)} />}
            </div>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {q.options.map((opt, i) => {
                const isCorrect = opt.de === q.word.de
                const state =
                  chosen === null ? 'idle' : isCorrect ? 'correct' : chosen === i ? 'wrong' : 'dim'
                return (
                  <button
                    key={opt.de}
                    type="button"
                    disabled={chosen !== null}
                    onClick={() => {
                      if (chosen !== null) return
                      setChosen(i)
                      const ok = isCorrect
                      record(wordKey(q.topicId, q.word), ok)
                      if (ok) {
                        setScore((s) => s + 1)
                        setStreak((s) => s + 1)
                      } else {
                        setStreak(0)
                        setMistakes((m) => [...m, { de: displayDe(q.word), tr: T(q.word) }])
                      }
                    }}
                    className={`flex items-center justify-between gap-2 rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition-all ${
                      state === 'idle'
                        ? 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50'
                        : state === 'correct'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                          : state === 'wrong'
                            ? 'border-rose-500 bg-rose-50 text-rose-800'
                            : 'border-zinc-100 bg-zinc-50 text-zinc-400'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {opt.art && <ArtChip art={opt.art} />}
                      {q.dir === 'de-tr' ? T(opt) : displayDe(opt)}
                    </span>
                    {state === 'correct' && <span>✓</span>}
                    {state === 'wrong' && <span>✗</span>}
                  </button>
                )
              })}
            </div>
            {chosen !== null && (
              <div className="mt-5">
                {q.word.ex && (
                  <p className="mb-4 text-sm leading-relaxed text-zinc-500">
                    <span className="font-semibold text-zinc-700">{q.word.ex.de}</span>{' '}
                    <SpeakBtn text={q.word.ex.de} className="h-6 w-6 align-middle text-sm" />
                    <br />
                    <span className="text-zinc-400">
                      {q.word.ex.uk} / {q.word.ex.ru}
                    </span>
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setChosen(null)
                    setIdx((i) => i + 1)
                  }}
                  className="rounded-xl bg-zinc-900 px-8 py-2.5 text-sm font-bold text-white transition-colors hover:bg-zinc-700"
                >
                  {idx + 1 >= round.length
                    ? `${L('Підсумок', 'Итог')} →`
                    : `${L('Далі', 'Далее')} →`}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ================= АРТИКЛІ DER/DIE/DAS =================

type AQ = { word: Word; topicId: string }

export function ArticlesTab({ record }: { record: (key: string, ok: boolean) => void }) {
  const L = useL()
  const T = useTr()
  const [round, setRound] = useState<AQ[] | null>(null)
  const [idx, setIdx] = useState(0)
  const [chosen, setChosen] = useState<'der' | 'die' | 'das' | null>(null)
  const [score, setScore] = useState(0)
  const [mistakes, setMistakes] = useState<{ de: string; tr: string }[]>([])

  const start = useCallback(() => {
    setRound(
      shuffle(NOUNS)
        .slice(0, 10)
        .map((a) => ({ word: a.word, topicId: a.topic.id })),
    )
    setIdx(0)
    setChosen(null)
    setScore(0)
    setMistakes([])
  }, [])

  const q = round?.[idx]

  return (
    <div>
      {!round ? (
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <div className="text-5xl">🚦</div>
          <h2 className="mt-3 text-xl font-black text-zinc-900">
            {L('Артиклі der / die / das', 'Артикли der / die / das')}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-600">
            {L(
              'Головний боль A1: рід іменника. 10 слів — виберіть артикль. Кольори-підказки: der — синій, die — рожевий, das — зелений. Відповідь пишеться в прогрес слів.',
              'Главная боль A1: род существительного. 10 слов — выберите артикль. Цвета-подсказки: der — синий, die — розовый, das — зелёный. Ответ пишется в прогресс слов.',
            )}
          </p>
          <button
            type="button"
            onClick={start}
            className="mt-5 rounded-xl bg-zinc-900 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-zinc-700"
          >
            ▶ {L('Почати', 'Начать')}
          </button>
        </div>
      ) : !q ? (
        <Result score={score} total={round.length} mistakes={mistakes} again={start} />
      ) : (
        <div>
          <p className="mb-3 text-sm font-semibold text-zinc-500">
            {L('Слово', 'Слово')} {idx + 1} / {round.length} · ✓ {score}
          </p>
          <div className="rounded-3xl border-2 border-zinc-800 bg-white p-6 text-center shadow-md sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">
              {L('Оберіть артикль', 'Выберите артикль')}
            </p>
            <p className="mt-3 text-3xl font-black tracking-tight text-zinc-900">{q.word.de}</p>
            <p className="mt-1 text-sm font-semibold text-zinc-500">{T(q.word)}</p>

            <div className="mt-6 grid grid-cols-3 gap-2">
              {(['der', 'die', 'das'] as const).map((a) => {
                const isCorrect = a === q.word.art
                const state =
                  chosen === null ? 'idle' : isCorrect ? 'correct' : chosen === a ? 'wrong' : 'dim'
                return (
                  <button
                    key={a}
                    type="button"
                    disabled={chosen !== null}
                    onClick={() => {
                      if (chosen !== null) return
                      setChosen(a)
                      const ok = isCorrect
                      record(wordKey(q.topicId, q.word), ok)
                      if (ok) setScore((s) => s + 1)
                      else setMistakes((m) => [...m, { de: `${q.word.art} ${q.word.de}`, tr: T(q.word) }])
                    }}
                    className={`rounded-xl border-2 px-4 py-4 text-lg font-black uppercase transition-all ${
                      state === 'idle'
                        ? 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50'
                        : state === 'correct'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                          : state === 'wrong'
                            ? 'border-rose-500 bg-rose-50 text-rose-800'
                            : 'border-zinc-100 bg-zinc-50 text-zinc-400'
                    }`}
                  >
                    {a}
                  </button>
                )
              })}
            </div>

            {chosen !== null && (
              <div className="mt-5">
                <p className="text-sm text-zinc-600">
                  <span className="font-bold text-emerald-700">{q.word.art} {q.word.de}</span>
                  {q.word.pl && (
                    <span className="ml-2 font-mono text-xs text-zinc-500">die {q.word.pl}</span>
                  )}
                </p>
                {q.word.ex && (
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                    <span className="font-semibold text-zinc-700">{q.word.ex.de}</span>{' '}
                    <SpeakBtn text={q.word.ex.de} className="h-6 w-6 align-middle text-sm" />
                    <br />
                    <span className="text-zinc-400">
                      {q.word.ex.uk} / {q.word.ex.ru}
                    </span>
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setChosen(null)
                    setIdx((i) => i + 1)
                  }}
                  className="mt-4 rounded-xl bg-zinc-900 px-8 py-2.5 text-sm font-bold text-white transition-colors hover:bg-zinc-700"
                >
                  {idx + 1 >= round.length ? `${L('Підсумок', 'Итог')} →` : `${L('Далі', 'Далее')} →`}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ================= ДІЄСЛОВА =================

type VQ = { verb: Verb; pi: number; options: string[] }

function buildVerbRound(n = 8): VQ[] {
  const combos: { v: Verb; pi: number }[] = []
  for (const v of VERBS) for (let pi = 0; pi < PRONOUNS.length; pi++) combos.push({ v, pi })
  return shuffle(combos).slice(0, n).map(({ v, pi }) => {
    const correct = v.forms[pi]
    const seen = new Set([correct])
    const opts: string[] = []
    const add = (s: string) => {
      if (!seen.has(s) && opts.length < 3) {
        opts.push(s)
        seen.add(s)
      }
    }
    shuffle(v.forms.filter((_, i) => i !== pi)).forEach(add)
    if (opts.length < 3)
      shuffle(VERBS.filter((x) => x.inf !== v.inf).flatMap((x) => x.forms)).forEach(add)
    return { verb: v, pi, options: shuffle([correct, ...opts]) }
  })
}

export function VerbsTab() {
  const L = useL()
  const T = useTr()
  const [mode, setMode] = useState<'drill' | 'table'>('drill')

  // Таблиця
  const [sel, setSel] = useState(VERBS[0].inf)
  const verb = VERBS.find((v) => v.inf === sel)!

  // Тренування
  const [round, setRound] = useState<VQ[] | null>(null)
  const [idx, setIdx] = useState(0)
  const [chosen, setChosen] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [mistakes, setMistakes] = useState<{ de: string; tr: string }[]>([])

  const start = useCallback(() => {
    setRound(buildVerbRound(8))
    setIdx(0)
    setChosen(null)
    setScore(0)
    setMistakes([])
  }, [])

  const q = round?.[idx]

  return (
    <div>
      <div className="mb-4 flex gap-1.5">
        {(
          [
            ['drill', '⚡ ' + L('Тренування', 'Тренировка')],
            ['table', '📋 ' + L('Таблиці форм', 'Таблицы форм')],
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

      {mode === 'drill' ? (
        !round ? (
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
            <div className="text-5xl">⚡</div>
            <h2 className="mt-3 text-xl font-black text-zinc-900">
              {L('Відмінювання дієслів у Präsens', 'Спряжение глаголов в Präsens')}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-600">
              {L(
                `${VERBS.length} дієслів, включно з sein, haben і сильними. 8 форм на раунд: займенник + інфінітив → оберіть правильну форму.`,
                `${VERBS.length} глаголов, включая sein, haben и сильные. 8 форм на раунд: местоимение + инфинитив → выберите правильную форму.`,
              )}
            </p>
            <button
              type="button"
              onClick={start}
              className="mt-5 rounded-xl bg-zinc-900 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-zinc-700"
            >
              ▶ {L('Почати', 'Начать')}
            </button>
          </div>
        ) : !q ? (
          <Result score={score} total={round.length} mistakes={mistakes} again={start} />
        ) : (
          <div>
            <p className="mb-3 text-sm font-semibold text-zinc-500">
              {L('Форма', 'Форма')} {idx + 1} / {round.length} · ✓ {score}
            </p>
            <div className="rounded-3xl border-2 border-zinc-800 bg-white p-6 text-center shadow-md sm:p-8">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">
                {L('Оберіть правильну форму', 'Выберите правильную форму')}
              </p>
              <p className="mt-3 text-2xl font-black tracking-tight text-zinc-900">
                {PRONOUNS[q.pi]} + <span className="text-sky-700">{q.verb.inf}</span>
              </p>
              <p className="mt-1 text-sm font-semibold text-zinc-500">
                {q.verb.uk} / {q.verb.ru}
              </p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {q.options.map((opt) => {
                  const isCorrect = opt === q.verb.forms[q.pi]
                  const state =
                    chosen === null ? 'idle' : isCorrect ? 'correct' : chosen === opt ? 'wrong' : 'dim'
                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={chosen !== null}
                      onClick={() => {
                        if (chosen !== null) return
                        setChosen(opt)
                        if (isCorrect) setScore((s) => s + 1)
                        else
                          setMistakes((m) => [
                            ...m,
                            { de: `${PRONOUNS[q.pi]} ${q.verb.forms[q.pi]} (${q.verb.inf})`, tr: `${q.verb.uk} / ${q.verb.ru}` },
                          ])
                      }}
                      className={`rounded-xl border-2 px-4 py-3 text-base font-bold transition-all ${
                        state === 'idle'
                          ? 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50'
                          : state === 'correct'
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                            : state === 'wrong'
                              ? 'border-rose-500 bg-rose-50 text-rose-800'
                              : 'border-zinc-100 bg-zinc-50 text-zinc-400'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
              {chosen !== null && (
                <div className="mt-5">
                  <p className="text-sm font-semibold text-emerald-700">
                    {PRONOUNS[q.pi]} {q.verb.forms[q.pi]}
                  </p>
                  {q.verb.note && (
                    <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                      💡 {q.verb.note.uk} / {q.verb.note.ru}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setChosen(null)
                      setIdx((i) => i + 1)
                    }}
                    className="mt-4 rounded-xl bg-zinc-900 px-8 py-2.5 text-sm font-bold text-white transition-colors hover:bg-zinc-700"
                  >
                    {idx + 1 >= round.length ? `${L('Підсумок', 'Итог')} →` : `${L('Далі', 'Далее')} →`}
                  </button>
                </div>
              )}
            </div>
          </div>
        )
      ) : (
        <div>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {VERBS.map((v) => (
              <button
                key={v.inf}
                type="button"
                onClick={() => setSel(v.inf)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  v.inf === sel ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                {v.inf}
              </button>
            ))}
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-baseline gap-2">
              <h3 className="text-2xl font-black text-zinc-900">
                <span className="text-sky-700">{verb.inf}</span>
              </h3>
              <span className="text-sm font-semibold text-zinc-500">
                — {verb.uk} / {verb.ru}
              </span>
              <SpeakBtn text={verb.inf} />
            </div>
            <table className="mt-4 w-full max-w-md text-sm">
              <tbody>
                {PRONOUNS.map((p, i) => (
                  <tr key={p} className="border-b border-zinc-100 last:border-0">
                    <td className="py-2 pr-4 font-semibold text-zinc-500">{p}</td>
                    <td className="py-2 font-black text-zinc-900">{verb.forms[i]}</td>
                    <td className="py-2 text-right">
                      <SpeakBtn text={`${p.split('/')[0].trim()} ${verb.forms[i]}`} className="h-7 w-7 text-sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {verb.note && (
              <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-800">
                💡 {verb.note.uk} / {verb.note.ru}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
