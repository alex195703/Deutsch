'use client'

// ============================================================
// ВКЛАДКА «ПРОГРЕС» — гейміфікація тренажера:
//   • картка рангу (поточний рівень володіння: A1.1 … B1.3) + XP
//   • статистика: серія днів, слова, точність, розділи
//   • траєкторія навчання: теми A1 → A2 → B1 з освоєністю
//   • досягнення (відкриті/закриті) і тости про нові нагороди
// Стан — у gamify.ts (localStorage), мова — лише в адресі.
// ============================================================

import { useL, useBi } from '@/lib/i18n'
import { TOPICS, TOTAL_WORDS, wordKey, type Topic } from '@/lib/deutsch-data'
import { type ProgressMap, Bar, LevelBadge } from '@/lib/trainer'
import {
  ACHIEVEMENTS, XP, TOPIC_DONE,
  useGamify, type Achievement,
} from '@/lib/gamify'

// ---------- допоміжне ----------

/** % освоєності теми за статистикою слів trainer'а */
export function topicPct(t: Topic, map: ProgressMap): number {
  const done = t.words.filter((w) => {
    const s = map[wordKey(t.id, w)]
    return s?.l || (s?.c ?? 0) >= 2
  }).length
  return done / t.words.length
}

function fmtDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y.slice(2)}`
}

// ---------- ВКЛАДКА ----------

export function ProgressTab({ map }: { map: ProgressMap }) {
  const L = useL()
  const B = useBi()
  const { s, snap, rank, next, justUnlocked } = useGamify()

  const answers = snap.ansC + s.ansW
  const accuracy = answers ? Math.round((snap.ansC / answers) * 100) : 0
  const toNext = next ? next.min - rank.min : 0
  const inRank = Math.max(0, s.xp - rank.min)
  const rankPct = next ? (inRank / toNext) * 100 : 100

  // поточна позиція на траєкторії — перша неосвоєна тема
  let currentId: string | null = null
  for (const t of TOPICS) {
    if (topicPct(t, map) < TOPIC_DONE) { currentId = t.id; break }
  }

  const stats: { emoji: string; label: string; value: string }[] = [
    { emoji: '🔥', label: L('серія днів', 'серия дней'), value: String(snap.streakDays) },
    { emoji: '⭐', label: L('слів вивчено', 'слов выучено'), value: `${snap.learned} / ${TOTAL_WORDS}` },
    { emoji: '🎯', label: L('точність', 'точность'), value: `${accuracy}%` },
    { emoji: '📖', label: L('розділів прочитано', 'глав прочитано'), value: String(snap.chapters) },
  ]

  return (
    <div className="space-y-5">
      {/* Картка рангу */}
      <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center gap-4 bg-gradient-to-r from-amber-50 via-white to-emerald-50 p-5">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm">
            {rank.emoji}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              {L('Поточний рівень володіння', 'Текущий уровень владения')}
            </p>
            <h2 className="text-2xl font-black tracking-tight text-zinc-900">
              {rank.de} · {B(rank.name)}
            </h2>
            <p className="mt-0.5 text-sm font-semibold text-zinc-500">
              {s.xp} XP
              {next ? (
                <> · {L('до наступного рангу', 'до следующего ранга')} {next.de}: {toNext - inRank} XP</>
              ) : (
                <> · {L('максимальний ранг! 🎉', 'максимальный ранг! 🎉')}</>
              )}
            </p>
          </div>
        </div>
        <div className="px-5 pb-5">
          <Bar value={rankPct} tone="bg-gradient-to-r from-amber-400 to-emerald-500" />
          <p className="mt-2 text-[11px] leading-relaxed text-zinc-400">
            {L(
              `+${XP.answerOk} XP за правильну відповідь · +${XP.learnWord} за вивчене слово · +${XP.chapter} за розділ книжки · +${XP.dayVisit} за щоденне відвідування`,
              `+${XP.answerOk} XP за правильный ответ · +${XP.learnWord} за выученное слово · +${XP.chapter} за главу книги · +${XP.dayVisit} за ежедневное посещение`,
            )}
          </p>
        </div>
      </section>

      {/* Статистика */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((x) => (
          <div key={x.label} className="rounded-2xl border border-zinc-200 bg-white p-4 text-center shadow-sm">
            <p className="text-2xl font-black text-zinc-900">{x.emoji} {x.value}</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">{x.label}</p>
          </div>
        ))}
      </section>

      {/* Траєкторія навчання */}
      <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-black tracking-tight text-zinc-900">
          🗺 {L('Траєкторія навчання', 'Траектория обучения')}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-zinc-500">
          {L(
            `Тема освоєна, коли ${Math.round(TOPIC_DONE * 100)}% її слів вивчені (★ або двічі вгадані у вправах).`,
            `Тема освоена, когда ${Math.round(TOPIC_DONE * 100)}% её слов выучено (★ или дважды угадано в упражнениях).`,
          )}
        </p>
        {(['A1', 'A2', 'B1'] as const).map((lv) => {
          const topics = TOPICS.filter((t) => t.level === lv)
          const done = topics.filter((t) => topicPct(t, map) >= TOPIC_DONE).length
          return (
            <div key={lv} className="mt-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-bold text-zinc-700">
                <LevelBadge level={lv} />
                {L('тем освоєно', 'тем освоено')}: {done} / {topics.length}
              </p>
              <div className="space-y-1.5">
                {topics.map((t) => {
                  const pct = topicPct(t, map)
                  const mastered = pct >= TOPIC_DONE
                  const isCurrent = t.id === currentId
                  return (
                    <div
                      key={t.id}
                      className={`flex items-center gap-3 rounded-xl border p-2.5 transition-colors ${
                        isCurrent
                          ? 'border-amber-400 bg-amber-50 ring-2 ring-amber-200'
                          : mastered
                            ? 'border-emerald-200 bg-emerald-50/60'
                            : 'border-zinc-200 bg-white'
                      }`}
                    >
                      <span className="text-xl">{mastered ? '✅' : t.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-zinc-800">
                          {B(t.name)}
                          {isCurrent && (
                            <span className="ml-2 rounded-md bg-amber-400 px-1.5 py-0.5 text-[10px] font-black text-white">
                              {L('ВИ ТУТ', 'ВЫ ЗДЕСЬ')}
                            </span>
                          )}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <Bar value={pct * 100} tone={mastered ? 'bg-emerald-500' : 'bg-zinc-400'} />
                          <span className="w-9 shrink-0 text-right font-mono text-[10px] text-zinc-400">
                            {Math.round(pct * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
        {!currentId && (
          <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center text-sm font-bold text-emerald-800">
            🎉 {L('Усі теми освоєні — ви пройшли весь шлях!', 'Все темы освоены — вы прошли весь путь!')}
          </p>
        )}
      </section>

      {/* Досягнення */}
      <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-black tracking-tight text-zinc-900">
          🏆 {L('Досягнення', 'Достижения')}
          <span className="ml-2 text-sm font-bold text-zinc-400">
            {Object.keys(s.unlocked).length} / {ACHIEVEMENTS.length}
          </span>
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ACHIEVEMENTS.map((a) => (
            <AchievementCard key={a.id} a={a} unlockedAt={s.unlocked[a.id]} />
          ))}
        </div>
      </section>

      {justUnlocked.length > 0 && <AchievementToast />}
    </div>
  )
}

function AchievementCard({ a, unlockedAt }: { a: Achievement; unlockedAt?: string }) {
  const L = useL()
  const B = useBi()
  const open = !!unlockedAt
  return (
    <div
      className={`rounded-2xl border p-3 transition-colors ${
        open ? 'border-amber-300 bg-gradient-to-br from-amber-50 to-white shadow-sm' : 'border-zinc-200 bg-zinc-50 opacity-60'
      }`}
    >
      <p className={`text-2xl ${open ? '' : 'grayscale'}`}>{open ? a.emoji : '🔒'}</p>
      <p className={`mt-1 text-sm font-black ${open ? 'text-zinc-900' : 'text-zinc-500'}`}>{B(a.name)}</p>
      <p className="mt-0.5 text-[11px] leading-snug text-zinc-500">{B(a.desc)}</p>
      {open && (
        <p className="mt-1 text-[10px] font-bold text-amber-600">
          {L('відкрито', 'открыто')} {fmtDate(unlockedAt!)}
        </p>
      )}
    </div>
  )
}

/** Спливне повідомлення про нове досягнення (закривається вручну) */
export function AchievementToast() {
  const L = useL()
  const B = useBi()
  const { justUnlocked, ackUnlocked } = useGamify()
  if (!justUnlocked.length) return null
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-md flex-col gap-2">
      {justUnlocked.map((a) => (
        <div
          key={a.id}
          className="flex items-center gap-3 rounded-2xl border border-amber-300 bg-white p-4 shadow-xl"
          role="status"
        >
          <span className="text-3xl">{a.emoji}</span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
              🏆 {L('Нове досягнення!', 'Новое достижение!')}
            </p>
            <p className="truncate text-sm font-black text-zinc-900">{B(a.name)}</p>
          </div>
          <button
            type="button"
            onClick={ackUnlocked}
            aria-label={L('Закрити', 'Закрыть')}
            className="rounded-full px-2 py-1 text-lg leading-none text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
