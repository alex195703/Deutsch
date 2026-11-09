'use client'

// ============================================================
// DEUTSCH A1 — тренажер німецької мови для початківців.
// ------------------------------------------------------------
// Одинадцять вкладок: Слова (73 теми трьох рівнів · 1 473 слова
// з прикладами-реченнями), Картки (фліп-картки з озвучкою), Вікторина (переклад
// урозтріч), Артиклі (der/die/das), Дієслова (Präsens),
// Модальні (6 модальних дієслів — таблиці, рамка, вправи),
// Живі фрази (побутові формули, прислів'я, ідіоми),
// Конструктор (речення у трьох часах, ствердження/заперечення),
// Граматика (шпаргалка), Читанка (книжки, де тап по слову
// показує переклад) і Прогрес (ранги A1.1→B1.3, XP,
// траєкторія тем і досягнення — gamify.ts). Прогрес — у
// браузері (localStorage), вибір мови — лише в адресі (?lang).
// ============================================================

import { useState } from 'react'
import { LangSwitch, useL, useTitle } from '@/lib/i18n'
import { NOUNS, TOTAL_WORDS } from '@/lib/deutsch-data'
import { GRAMMAR, VERBS } from '@/lib/deutsch-grammar'
import { useProgress } from '@/lib/trainer'
import { useGamify } from '@/lib/gamify'
import { BOOKS } from '@/lib/deutsch-books'
import { CardsTab, WordsTab } from '@/components/words-cards'
import { ArticlesTab, QuizTab, VerbsTab } from '@/components/drills'
import { ModalTab } from '@/components/modal-verbs'
import { MODAL_TOTAL } from '@/lib/deutsch-modal'
import { GrammarTab } from '@/components/grammar'
import { BooksTab } from '@/components/reader'
import { ProgressTab, AchievementToast } from '@/components/progress-panel'
import { PhrasesTab } from '@/components/phrases-live'
import { BuilderTab } from '@/components/builder-tab'
import { IDIOM_TOTAL } from '@/lib/deutsch-idioms'

type Tab = 'words' | 'cards' | 'quiz' | 'articles' | 'verbs' | 'modal' | 'phrases' | 'builder' | 'grammar' | 'books' | 'progress'

export default function DeutschTrainer() {
  const L = useL()
  useTitle('Німецька A1 — тренажер професора Орлова О.В.', 'Немецкий A1 — тренажёр профессора Орлова А.В.')
  const { map, record, setLearned, resetAll, learnedCount } = useProgress()
  const { rank, s: g } = useGamify()
  const [tab, setTab] = useState<Tab>('words')

  const TABS: { id: Tab; label: string }[] = [
    { id: 'words', label: `📚 ${L('Слова', 'Слова')} ${TOTAL_WORDS}` },
    { id: 'cards', label: `🃏 ${L('Картки', 'Карточки')}` },
    { id: 'quiz', label: `🎯 ${L('Вікторина', 'Викторина')}` },
    { id: 'articles', label: `🚦 ${L('Артиклі', 'Артикли')} ${NOUNS.length}` },
    { id: 'verbs', label: `⚡ ${L('Дієслова', 'Глаголы')} ${VERBS.length}` },
    { id: 'modal', label: `🗝️ ${L('Модальні', 'Модальные')} ${MODAL_TOTAL}` },
    { id: 'phrases', label: `🗣️ ${L('Живі фрази', 'Живые фразы')} ${IDIOM_TOTAL}` },
    { id: 'builder', label: `🧩 ${L('Конструктор', 'Конструктор')}` },
    { id: 'grammar', label: `📖 ${L('Граматика', 'Грамматика')} ${GRAMMAR.length}` },
    { id: 'books', label: `📕 ${L('Читанка', 'Книги')} ${BOOKS.length}` },
    { id: 'progress', label: `🏆 ${L('Прогрес', 'Прогресс')}` },
  ]

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      {/* Перемикач мови — праворуч зверху */}
      <div className="absolute right-4 top-4 z-20">
        <LangSwitch />
      </div>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-10">
        {/* Шапка */}
        <header className="pb-4 pt-12 text-center">
          <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 text-4xl shadow-lg">
            🇩🇪
          </div>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-900">
            Deutsch A1{' '}
            <span className="text-2xl font-bold text-zinc-500">
              {L('· тренажер', '· тренажёр')}
            </span>
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-zinc-600 sm:text-base">
            {L(
              'Слова з прикладами й озвучкою, картки, вікторина, артиклі, дієслова, модальні дієслова, живі фрази і прислівʼя, конструктор речень у трьох часах, шпаргалка з граматики та читанка, де кожне слово показує переклад за торканням. Прогрес зберігається у вашому браузері.',
              'Слова с примерами и озвучкой, карточки, викторина, артикли, глаголы, модальные глаголы, живые фразы и пословицы, конструктор предложений в трёх временах, шпаргалка по грамматике и книжки, где каждое слово показывает перевод по касанию. Прогресс сохраняется в вашем браузере.',
            )}
          </p>
          <p className="mt-2 text-xs font-semibold text-emerald-700">
            ✅ {learnedCount} / {TOTAL_WORDS} {L('слів позначено вивченими', 'слов помечено выученными')}
          </p>
          <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
            {rank.emoji} {rank.de} · {g.xp} XP · 🔥 {g.days.length}
          </p>
        </header>

        {/* Вкладки */}
        <nav aria-label={L('Розділи тренажера', 'Разделы тренажёра')} className="mb-6">
          <div className="flex flex-wrap justify-center gap-1.5 rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-sm">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-current={tab === t.id ? 'page' : undefined}
                className={`whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-bold transition-colors ${
                  tab === t.id ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </nav>

        {tab === 'words' && (
          <WordsTab map={map} setLearned={setLearned} resetAll={resetAll} learnedCount={learnedCount} />
        )}
        {tab === 'cards' && <CardsTab map={map} setLearned={setLearned} />}
        {tab === 'quiz' && <QuizTab record={record} />}
        {tab === 'articles' && <ArticlesTab record={record} />}
        {tab === 'verbs' && <VerbsTab />}
        {tab === 'modal' && <ModalTab record={record} />}
        {tab === 'phrases' && <PhrasesTab map={map} setLearned={setLearned} />}
        {tab === 'builder' && <BuilderTab record={record} />}
        {tab === 'grammar' && <GrammarTab />}
        {tab === 'books' && <BooksTab />}
        {tab === 'progress' && <ProgressTab map={map} />}
      </main>

      {/* Тости про нові досягнення — поверх будь-якої вкладки */}
      <AchievementToast />

      <footer className="mt-auto border-t border-zinc-200 bg-white py-4">
        <p className="px-4 text-center text-xs leading-relaxed text-zinc-500">
          Deutsch A1 · {L('прогрес — у вашому браузері · озвучка — засобами браузера',
                             'прогресс — в вашем браузере · озвучка — средствами браузера')}
          {' · '}
          <a
            href="https://igroteka-umber.vercel.app"
            className="font-semibold text-zinc-700 underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-600"
          >
            ← {L('Ігротека', 'Игротека')}
          </a>
        </p>
        <p className="mt-1 px-4 text-center text-xs font-semibold text-zinc-600">
          🎓 {L('Автор і розробник — професор Орлов О.В.', 'Автор и разработчик — профессор Орлов А.В.')}
        </p>
      </footer>
    </div>
  )
}
