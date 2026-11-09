'use client'

// ============================================================
// СИМУЛЯТОР ЕКЗАМЕНУ — 25 питань у пʼяти частинах (Wortschatz,
// Artikel & Plural, Grammatik, Hören, Lesen), таймер 20 хвилин,
// підсумок з розбором помилок і розбивкою за частинами.
// Стиль узгоджений з вікториною (drills.tsx): одне питання на
// екрані, миттєвий фідбек, озвучка німецьких форм.
// ============================================================

import { useCallback, useEffect, useState } from 'react'
import { useBi, useL, useLang } from '@/lib/i18n'
import { buildExam, EXAM_MINUTES, PART_META, type ExamLevel, type ExamPaper, type ExamQ } from '@/lib/deutsch-exam'
import { Bar, SpeakBtn, speak, useTr } from '@/lib/trainer'
import { wordKey } from '@/lib/deutsch-data'
import type { Kind } from '@/lib/gamify'

type RecordFn = (key: string, ok: boolean, kind: Kind) => void
type Phase = 'start' | 'run' | 'done'

type Mistake = {
  part: 1 | 2 | 3 | 4 | 5
  prompt: string
  answer: string
  tr?: string
  deSpeak?: string
}

const LEVEL_DOTS: Record<ExamLevel, string> = { A1: '🟢', A2: '🔵', B1: '🟣' }
const PARTS: (1 | 2 | 3 | 4 | 5)[] = [1, 2, 3, 4, 5]

function fmt(sec: number): string {
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`
}

export function ExamTab({ record }: { record: RecordFn }) {
  const L = useL()
  const B = useBi()
  const T = useTr()
  const lang = useLang()
  const [phase, setPhase] = useState<Phase>('start')
  const [level, setLevel] = useState<ExamLevel>('A1')
  const [paper, setPaper] = useState<ExamPaper | null>(null)
  const [idx, setIdx] = useState(0)
  const [chosen, setChosen] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [mistakes, setMistakes] = useState<Mistake[]>([])
  const [secondsLeft, setSecondsLeft] = useState(EXAM_MINUTES * 60)
  const [canSpeak, setCanSpeak] = useState(true)
  const [showTr, setShowTr] = useState(false)

  //SpeechSynthesis є лише в браузері (SSR-гідратація)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- перевірка API можливa лише після монтування
    setCanSpeak(typeof window !== 'undefined' && !!window.speechSynthesis)
  }, [])

  // Таймер: цокає лише під час екзамену
  useEffect(() => {
    if (phase !== 'run') return
    const t = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [phase])

  const start = useCallback(
    (lv: ExamLevel) => {
      setPaper(buildExam(lv, T, B))
      setLevel(lv)
      setIdx(0)
      setChosen(null)
      setScore(0)
      setAnswers([])
      setMistakes([])
      setSecondsLeft(EXAM_MINUTES * 60)
      setShowTr(false)
      setPhase('run')
    },
    [T, B],
  )

  const timedOut = phase === 'run' && secondsLeft === 0
  const showResults = phase === 'done' || timedOut

  if (phase === 'start') {
    return (
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <div className="text-5xl">🎓</div>
        <h2 className="mt-3 text-xl font-black text-zinc-900">{L('Симулятор екзамену', 'Симулятор экзамена')}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-600">
          {L(
            'Повна модель іспиту за зразком Goethe-Zertifikat: 25 питань у пʼяти частинах, таймер 20 хвилин. Для складання треба 60 %. Кожна спроба — новий випадковий варіант.',
            'Полная модель экзамена по образцу Goethe-Zertifikat: 25 вопросов в пяти частях, таймер 20 минут. Для сдачи нужно 60 %. Каждая попытка — новый случайный вариант.',
          )}
        </p>
        <div className="mx-auto mt-5 max-w-md space-y-1.5 text-left">
          {PARTS.map((p) => {
            const m = PART_META[p]
            return (
              <div key={p} className="flex items-center gap-3 rounded-xl bg-zinc-50 px-3 py-2">
                <span className="text-xl">{m.icon}</span>
                <span className="text-sm">
                  <span className="font-bold text-zinc-800">{B(m.name)}</span>
                  <span className="block text-xs text-zinc-500">{B(m.hint)}</span>
                </span>
              </div>
            )
          })}
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-1.5">
          {(['A1', 'A2', 'B1'] as ExamLevel[]).map((lv) => (
            <button
              key={lv}
              type="button"
              onClick={() => setLevel(lv)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                level === lv ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              <span className="mr-1">{LEVEL_DOTS[lv]}</span>
              {lv}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => start(level)}
          className="mt-5 rounded-xl bg-zinc-900 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-zinc-700"
        >
          ▶ {L('Почати екзамен', 'Начать экзамен')}
        </button>
        <p className="mt-3 text-xs text-zinc-400">
          {L('Питання лексики, артиклів і аудіювання пишуться у ваш прогрес слів.', 'Вопросы лексики, артиклей и аудирования пишутся в ваш прогресс слов.')}
        </p>
      </div>
    )
  }

  if (!paper) return null

  const total = paper.questions.length

  if (showResults) {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0
    const passed = pct >= 60
    const verdict = pct >= 90 ? '🏆' : pct >= 75 ? '🎉' : pct >= 60 ? '💪' : '📖'
    const used = EXAM_MINUTES * 60 - secondsLeft
    return (
      <div>
        <div className="rounded-3xl border-2 border-zinc-800 bg-white p-8 text-center shadow-md">
          <div className="text-5xl">{verdict}</div>
          <p className="mt-3 text-3xl font-black text-zinc-900">
            {score} / {total} <span className="text-lg font-bold text-zinc-500">({pct}%)</span>
          </p>
          <p
            className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
              passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}
          >
            {passed ? '✅ Bestanden' : '❌ Nicht bestanden'} · {level} · ⏱ {fmt(used)}
          </p>
          <p className="mt-2 text-sm font-semibold text-zinc-600">
            {pct >= 90
              ? L('Відмінно — іспит складено з відзнакою!', 'Отлично — экзамен сдан с отличием!')
              : pct >= 75
                ? L('Добрий результат — іспит складено!', 'Хороший результат — экзамен сдан!')
                : pct >= 60
                  ? L('Задовільно — іспит складено. Є над чим працювати.', 'Удовлетворительно — экзамен сдан. Есть над чем работать.')
                  : L('Не складено — повторіть теми і спробуйте ще раз.', 'Не сдано — повторите темы и попробуйте ещё раз.')}
          </p>

          <div className="mx-auto mt-5 max-w-md space-y-1.5 text-left">
            {PARTS.map((p) => {
              const qs = paper.questions.map((q, i) => ({ q, i })).filter(({ q }) => q.part === p)
              const ok = qs.filter(({ i }) => answers[i]).length
              const m = PART_META[p]
              return (
                <div key={p} className="rounded-xl bg-zinc-50 px-3 py-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-zinc-800">
                      {m.icon} {B(m.name)}
                    </span>
                    <span className={`font-mono text-xs font-bold ${ok === qs.length ? 'text-emerald-700' : 'text-zinc-500'}`}>
                      {ok} / {qs.length}
                    </span>
                  </div>
                  <div className="mt-1.5">
                    <Bar value={qs.length ? (ok / qs.length) * 100 : 0} tone={ok === qs.length ? 'bg-emerald-500' : 'bg-amber-500'} />
                  </div>
                </div>
              )
            })}
          </div>

          {mistakes.length > 0 ? (
            <div className="mt-5 text-left">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-zinc-400">
                {L('Розбір помилок', 'Разбор ошибок')}
              </p>
              <ul className="space-y-1.5">
                {mistakes.map((m, i) => (
                  <li key={i} className="rounded-xl bg-rose-50 px-3 py-2 text-sm">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-zinc-800">
                        {PART_META[m.part].icon} {m.prompt}
                      </span>
                      {m.deSpeak && <SpeakBtn text={m.deSpeak} className="h-6 w-6 text-sm" />}
                    </div>
                    <div className="mt-0.5 text-emerald-700">✓ {m.answer}</div>
                    {m.tr && <div className="text-xs text-zinc-500">{m.tr}</div>}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-4 text-sm font-semibold text-emerald-700">
              {L('Жодної помилки — бездоганний екзамен!', 'Ни одной ошибки — безупречный экзамен!')}
            </p>
          )}

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => start(level)}
              className="rounded-xl bg-zinc-900 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-zinc-700"
            >
              ↺ {L('Новий варіант', 'Новый вариант')}
            </button>
            <button
              type="button"
              onClick={() => setPhase('start')}
              className="rounded-xl border border-zinc-300 bg-white px-6 py-2.5 text-sm font-bold text-zinc-700 transition-colors hover:bg-zinc-100"
            >
              {L('Змінити рівень', 'Сменить уровень')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ---------- ЕКРАН ПИТАННЯ ----------
  const q: ExamQ = paper.questions[idx]
  const m = PART_META[q.part]
  const isArticlePart = q.part === 2 && q.options.length === 3
  const timeTight = secondsLeft < 120

  const choose = (i: number) => {
    if (chosen !== null) return
    const ok = i === q.correct
    setChosen(i)
    setAnswers((a) => [...a, ok])
    if (ok) setScore((s) => s + 1)
    else
      setMistakes((ms) => [
        ...ms,
        {
          part: q.part,
          prompt: q.prompt,
          answer: q.deAnswer ?? q.options[q.correct],
          tr: q.wordRef ? T(q.wordRef.word) : undefined,
          deSpeak: q.part === 1 || q.part === 4 ? q.deAnswer : undefined,
        },
      ])
    if (q.wordRef && q.recKind) {
      const base = wordKey(q.wordRef.topicId, q.wordRef.word)
      record(q.recKind === 'plural' ? `${base}#pl` : base, ok, q.recKind)
    }
  }

  return (
    <div>
      {/* Шапка екзамену: номер, таймер, дострокова здача */}
      <div className="mb-3 flex items-center justify-between text-sm font-semibold text-zinc-500">
        <span>
          {L('Питання', 'Вопрос')} {idx + 1} / {total} · ✓ {score}
        </span>
        <span className="flex items-center gap-3">
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-xs font-bold ${
            timeTight ? 'bg-rose-100 text-rose-700' : 'bg-zinc-100 text-zinc-600'
          }`}>
            ⏱ {fmt(secondsLeft)}
          </span>
          <button
            type="button"
            onClick={() => setPhase('done')}
            className="text-xs font-semibold text-zinc-400 underline underline-offset-2 hover:text-zinc-700"
          >
            {L('Завершити', 'Завершить')}
          </button>
        </span>
      </div>
      <div className="mb-3">
        <Bar value={((idx + (chosen !== null ? 1 : 0)) / total) * 100} tone="bg-zinc-800" />
      </div>

      <div className="rounded-3xl border-2 border-zinc-800 bg-white p-6 text-center shadow-md sm:p-8">
        {/* Чип частини */}
        <p className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-600">
          {m.icon} {B(m.name)}
        </p>

        {/* Текст для читання (частина 5) — спільний блок над 3 питаннями */}
        {q.reading && (
          <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-left">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-black text-zinc-900">{q.reading.title}</p>
              <SpeakBtn text={q.reading.de} className="h-6 w-6 text-sm" />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-700">{q.reading.de}</p>
            <button
              type="button"
              onClick={() => setShowTr((s) => !s)}
              className="mt-2 text-xs font-semibold text-zinc-400 underline underline-offset-2 hover:text-zinc-700"
            >
              {showTr ? '▾ ' + L('Сховати переклад', 'Скрыть перевод') : '▸ ' + L('Переклад', 'Перевод')}
            </button>
            {showTr && (
              <p className="mt-1 border-t border-zinc-200 pt-2 text-xs leading-relaxed text-zinc-500">
                {lang === 'uk' ? q.reading.uk : q.reading.ru}
              </p>
            )}
          </div>
        )}

        {/* Інструкція частини */}
        <p className="mt-4 text-xs font-bold uppercase tracking-wide text-zinc-400">
          {q.part === 1
            ? q.qDir === 'de-tr'
              ? L('Як це буде українською / російською?', 'Как это будет по-украински / по-русски?')
              : L('Як це буде німецькою?', 'Как это будет по-немецки?')
            : q.part === 2
              ? isArticlePart
                ? L('Оберіть артикль', 'Выберите артикль')
                : L('Оберіть множину', 'Выберите множественное число')
              : q.part === 3
                ? L('Вставте правильне слово', 'Вставьте правильное слово')
                : q.part === 4
                  ? L('Прослухайте і знайдіть переклад', 'Прослушайте и найдите перевод')
                  : L('Дайте відповідь на питання за текстом', 'Ответьте на вопрос по тексту')}
        </p>

        {/* Питання */}
        {q.part === 4 && canSpeak ? (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => speak(q.prompt)}
              className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-3xl text-white shadow-md transition-colors hover:bg-zinc-700"
              aria-label="Audio abspielen"
            >
              🔊
            </button>
            <p className="mt-2 text-xs text-zinc-400">
              {L('Натисніть, щоб прослухати (можна кілька разів)', 'Нажмите, чтобы прослушать (можно несколько раз)')}
            </p>
          </div>
        ) : (
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="text-3xl font-black tracking-tight text-zinc-900">{q.prompt}</span>
            {q.speakPrompt && <SpeakBtn text={q.prompt} />}
          </div>
        )}
        {q.part === 4 && !canSpeak && (
          <p className="mt-2 text-xs text-amber-600">
            {L('Озвучка недоступна у цьому браузері — читайте текст', 'Озвучка недоступна в этом браузере — читайте текст')}
          </p>
        )}

        {/* Варіанти */}
        <div className={`mt-6 grid gap-2 ${isArticlePart ? 'grid-cols-3' : 'sm:grid-cols-2'}`}>
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correct
            const state =
              chosen === null ? 'idle' : isCorrect ? 'correct' : chosen === i ? 'wrong' : 'dim'
            return (
              <button
                key={opt}
                type="button"
                disabled={chosen !== null}
                onClick={() => choose(i)}
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
                <span>{opt}</span>
                {state === 'correct' && <span>✓</span>}
                {state === 'wrong' && <span>✗</span>}
              </button>
            )
          })}
        </div>

        {/* Пояснення після відповіді */}
        {chosen !== null && (
          <div className="mt-5">
            {q.explain && (
              <p className="mb-3 text-sm leading-relaxed text-zinc-500">
                <span className="font-semibold text-zinc-700">{q.explain.de}</span>{' '}
                <SpeakBtn text={q.explain.de ?? ''} className="h-6 w-6 align-middle text-sm" />
                <br />
                <span className="text-zinc-400">
                  {lang === 'uk' ? q.explain.uk : q.explain.ru}
                </span>
              </p>
            )}
            {!q.explain && q.wordRef?.word.ex && (
              <p className="mb-3 text-sm leading-relaxed text-zinc-500">
                <span className="font-semibold text-zinc-700">{q.wordRef.word.ex.de}</span>{' '}
                <SpeakBtn text={q.wordRef.word.ex.de} className="h-6 w-6 align-middle text-sm" />
                <br />
                <span className="text-zinc-400">
                  {q.wordRef.word.ex.uk} / {q.wordRef.word.ex.ru}
                </span>
              </p>
            )}
            {!q.explain && !q.wordRef?.word.ex && q.part !== 5 && (
              <p className="mb-3 text-sm font-semibold text-emerald-700">✓ {q.deAnswer ?? q.options[q.correct]}</p>
            )}
            <button
              type="button"
              onClick={() => {
                setChosen(null)
                setIdx((i) => i + 1)
              }}
              className="rounded-xl bg-zinc-900 px-8 py-2.5 text-sm font-bold text-white transition-colors hover:bg-zinc-700"
            >
              {idx + 1 >= total ? `${L('Підсумок', 'Итог')} →` : `${L('Далі', 'Далее')} →`}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
