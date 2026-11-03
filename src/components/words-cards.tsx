'use client'

// ============================================================
// Вкладки «Слова» (огляд тем + словник) та «Картки» (фліп-картки).
// ============================================================

import { useMemo, useState } from 'react'
import { useBi, useL } from '@/lib/i18n'
import {
  TOPICS, TOTAL_WORDS, displayDe, wordKey,
  type Topic, type Word,
} from '@/lib/deutsch-data'
import { ArtChip, Bar, SpeakBtn, useTr, type ProgressMap, shuffle } from '@/lib/trainer'

// ================= СЛОВА =================

export function WordsTab({ map, setLearned, resetAll, learnedCount }: {
  map: ProgressMap
  setLearned: (key: string, learned: boolean) => void
  resetAll: () => void
  learnedCount: number
}) {
  const L = useL()
  const B = useBi()
  const T = useTr()
  const [openTopic, setOpenTopic] = useState<string | null>(null)

  const topic = TOPICS.find((t) => t.id === openTopic)
  const learnedIn = (t: Topic) => t.words.filter((w) => map[wordKey(t.id, w)]?.l).length

  return (
    <div>
      {/* Загальний прогрес */}
      <div className="mb-5 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold text-zinc-700">
            {L('Вивчено слів', 'Выучено слов')}:{' '}
            <span className="font-black text-emerald-700">{learnedCount}</span> / {TOTAL_WORDS}
          </p>
          <button
            type="button"
            onClick={() => {
              if (window.confirm(L('Скинути весь прогрес?', 'Сбросить весь прогресс?'))) resetAll()
            }}
            className="rounded-lg border border-zinc-300 px-2.5 py-1 text-xs font-semibold text-zinc-500 transition-colors hover:bg-zinc-100"
          >
            ↺ {L('Скинути прогрес', 'Сбросить прогресс')}
          </button>
        </div>
        <div className="mt-2">
          <Bar value={(learnedCount / TOTAL_WORDS) * 100} />
        </div>
      </div>

      {topic ? (
        <>
          <button
            type="button"
            onClick={() => setOpenTopic(null)}
            className="mb-3 inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
          >
            ← {L('Усі теми', 'Все темы')}
          </button>
          <h2 className="mb-4 text-2xl font-black tracking-tight text-zinc-900">
            {topic.emoji} {B(topic.name)}
          </h2>
          <div className="space-y-2">
            {topic.words.map((w) => {
              const key = wordKey(topic.id, w)
              const st = map[key]
              return (
                <div
                  key={w.de}
                  className={`rounded-2xl border bg-white p-4 shadow-sm transition-colors ${
                    st?.l ? 'border-emerald-300 bg-emerald-50/40' : 'border-zinc-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    {w.art && <ArtChip art={w.art} />}
                    <span className="text-lg font-bold text-zinc-900">{w.de}</span>
                    <SpeakBtn text={displayDe(w)} />
                    <span className="flex-1 text-base font-semibold text-zinc-600">{T(w)}</span>
                    {w.pl && (
                      <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] text-zinc-500">
                        die {w.pl}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setLearned(key, !st?.l)}
                      aria-pressed={!!st?.l}
                      title={st?.l ? L('Забрати «вивчено»', 'Убрать «выучено»') : L('Позначити вивченим', 'Пометить выученным')}
                      className="text-xl leading-none transition-transform hover:scale-110"
                    >
                      {st?.l ? '★' : '☆'}
                    </button>
                  </div>
                  {w.ex && (
                    <p className="mt-2 border-l-2 border-zinc-200 pl-3 text-sm leading-relaxed text-zinc-500">
                      {w.ex.de}{' '}
                      <SpeakBtn text={w.ex.de} className="h-6 w-6 align-middle text-sm" />
                      <br />
                      <span className="text-zinc-400">{B({ uk: w.ex.uk, ru: w.ex.ru })}</span>
                    </p>
                  )}
                  {st && (st.c > 0 || st.w > 0) && (
                    <p className="mt-1.5 text-[11px] font-semibold text-zinc-400">
                      ✓ {st.c} · ✗ {st.w}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t) => {
            const learned = learnedIn(t)
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setOpenTopic(t.id)}
                className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
                  {t.emoji}
                </span>
                <h3 className="mt-3 font-bold text-zinc-900">{B(t.name)}</h3>
                <p className="mt-1 flex-1 text-xs text-zinc-500">
                  {t.words.length} {L('слів', 'слов')} · {learned} {L('вивчено', 'выучено')}
                </p>
                <div className="mt-3">
                  <Bar value={(learned / t.words.length) * 100} />
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ================= КАРТКИ =================

export function CardsTab({ map, setLearned }: {
  map: ProgressMap
  setLearned: (key: string, learned: boolean) => void
}) {
  const L = useL()
  const B = useBi()
  const T = useTr()
  const [topicId, setTopicId] = useState(TOPICS[0].id)
  const [shuffled, setShuffled] = useState(false)
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const topic = TOPICS.find((t) => t.id === topicId)!
  // Порядок карток: звичайний або перемішаний — стабільний для обраної теми/режиму
  const words: Word[] = useMemo(
    () => (shuffled ? shuffle(topic.words) : topic.words),
    [topic, shuffled],
  )
  const w = words[Math.min(idx, words.length - 1)]
  const key = wordKey(topic.id, w)
  const learnedInTopic = topic.words.filter((x) => map[wordKey(topic.id, x)]?.l).length

  const goto = (n: number) => {
    setFlipped(false)
    setIdx(Math.max(0, Math.min(words.length - 1, n)))
  }
  const next = () => (idx + 1 >= words.length ? null : goto(idx + 1))

  return (
    <div>
      {/* Вибір теми */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {TOPICS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setTopicId(t.id)
              setIdx(0)
              setFlipped(false)
            }}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              t.id === topicId
                ? 'border-zinc-900 bg-zinc-900 text-white'
                : 'border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            {t.emoji} {B(t.name)}
          </button>
        ))}
      </div>

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-zinc-600">
          {B(topic.name)} · {idx + 1} / {words.length} · ★ {learnedInTopic}/{topic.words.length}
        </p>
        <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-zinc-500">
          <input
            type="checkbox"
            checked={shuffled}
            onChange={(e) => {
              setShuffled(e.target.checked)
              setIdx(0)
              setFlipped(false)
            }}
            className="h-4 w-4 accent-zinc-900"
          />
          {L('Перемішати', 'Перемешать')}
        </label>
      </div>

      {/* Картка */}
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="flex min-h-56 w-full cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-zinc-800 bg-white p-8 text-center shadow-md transition-colors hover:bg-zinc-50"
        aria-live="polite"
      >
        {!flipped ? (
          <>
            {w.art && <ArtChip art={w.art} />}
            <span className="mt-2 text-4xl font-black tracking-tight text-zinc-900">{w.de}</span>
            <span className="mt-3 inline-flex"><SpeakBtn text={displayDe(w)} /></span>
            <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-zinc-400">
              👆 {L('торкнись, щоб перевернути', 'коснись, чтобы перевернуть')}
            </span>
          </>
        ) : (
          <>
            <span className="text-3xl font-black text-emerald-700">{T(w)}</span>
            {w.pl && (
              <span className="mt-2 font-mono text-sm text-zinc-500">
                {L('множина', 'множественное число')}: die {w.pl}
              </span>
            )}
            {w.ex && (
              <span className="mt-4 max-w-md text-sm leading-relaxed text-zinc-600">
                <span className="font-semibold text-zinc-800">{w.ex.de}</span>
                <br />
                <span className="text-zinc-500">{B({ uk: w.ex.uk, ru: w.ex.ru })}</span>
              </span>
            )}
            {w.ex && <span className="mt-2 inline-flex"><SpeakBtn text={w.ex.de} /></span>}
            <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-zinc-400">
              👆 {L('торкнись, щоб перевернути', 'коснись, чтобы перевернуть')}
            </span>
          </>
        )}
      </button>

      {/* Керування */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <button
          type="button"
          onClick={() => goto(idx - 1)}
          disabled={idx === 0}
          className="rounded-xl border border-zinc-300 bg-white py-2.5 text-sm font-bold text-zinc-700 transition-colors hover:bg-zinc-100 disabled:opacity-40"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => {
            setLearned(key, false)
            next()
          }}
          disabled={idx + 1 >= words.length}
          className="rounded-xl border border-amber-300 bg-amber-50 py-2.5 text-sm font-bold text-amber-800 transition-colors hover:bg-amber-100 disabled:opacity-40"
        >
          ↻ {L('Повторити', 'Повторить')}
        </button>
        <button
          type="button"
          onClick={() => {
            setLearned(key, true)
            next()
          }}
          disabled={idx + 1 >= words.length}
          className="rounded-xl bg-emerald-600 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700 disabled:opacity-40"
        >
          ✓ {L('Знаю', 'Знаю')}
        </button>
        <button
          type="button"
          onClick={() => goto(idx + 1)}
          disabled={idx + 1 >= words.length}
          className="rounded-xl border border-zinc-300 bg-white py-2.5 text-sm font-bold text-zinc-700 transition-colors hover:bg-zinc-100 disabled:opacity-40"
        >
          →
        </button>
      </div>

      {idx + 1 >= words.length && (
        <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center">
          <p className="text-sm font-semibold text-emerald-800">
            🎉 {L('Тема пройдена!', 'Тема пройдена!')}{' '}
            {L('Тепер спробуйте вікторину — закріпіть слова.', 'Теперь попробуйте викторину — закрепите слова.')}
          </p>
          <button
            type="button"
            onClick={() => {
              setIdx(0)
              setFlipped(false)
            }}
            className="mt-2 rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100"
          >
            ↺ {L('Картки з початку', 'Карточки с начала')}
          </button>
        </div>
      )}
    </div>
  )
}
