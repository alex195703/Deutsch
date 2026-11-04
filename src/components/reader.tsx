'use client'

// ============================================================
// Вкладка «Читанка» — книжки для початківців із тап-перекладом:
// торкніться слова або словосполучення — унизу зʼявиться
// картка з перекладом (укр/рос), граматичними нотатками
// і озвучкою. Словник = усі слова тренажера + глосарій книжки.
// ============================================================

import { Fragment, useMemo, useState, type ReactNode } from 'react'
import { useBi, useL, useLang } from '@/lib/i18n'
import { BOOKS, lookupAt, tokenize, type Book, type Hit, type Tok } from '@/lib/deutsch-books'
import { ArtChip, LevelBadge, SpeakBtn } from '@/lib/trainer'

type TapFn = (h: Hit) => void

export function BooksTab() {
  const L = useL()
  const B = useBi()
  const [openId, setOpenId] = useState<string | null>(null)
  const book = BOOKS.find((b) => b.id === openId)

  if (!book) {
    return (
      <div>
        <p className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
          💡 {L(
            'Торкніться будь-якого слова або словосполучення в тексті — знизу з’явиться переклад і озвучка.',
            'Коснитесь любого слова или словосочетания в тексте — снизу появится перевод и озвучка.',
          )}
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {BOOKS.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setOpenId(b.id)}
              className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
                {b.emoji}
              </span>
              <h3 className="mt-3 flex flex-wrap items-center gap-2 font-bold text-zinc-900">
                {B(b.title)} <LevelBadge level={b.level} />
              </h3>
              <p className="mt-1 flex-1 text-xs leading-relaxed text-zinc-500">
                {b.paragraphs[0]?.de.split('. ')[0]}.
              </p>
              <p className="mt-2 text-xs font-semibold text-amber-700 group-hover:underline">
                {b.paragraphs.length} {L('абзаців', 'абзацев')} · {L('читати →', 'читать →')}
              </p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return <Reader book={book} onBack={() => setOpenId(null)} />
}

// ---------- ЧИТАННЯ ----------

function Reader({ book, onBack }: { book: Book; onBack: () => void }) {
  const L = useL()
  const B = useBi()
  const lang = useLang()
  const [showTrans, setShowTrans] = useState(false)
  const [hit, setHit] = useState<Hit | null>(null)

  const paras = useMemo(() => book.paragraphs.map((p) => tokenize(p.de)), [book])

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
      >
        ← {L('Усі книжки', 'Все книги')}
      </button>

      <h2 className="mt-3 flex flex-wrap items-center gap-2 text-2xl font-black tracking-tight text-zinc-900">
        {book.emoji} {B(book.title)} <LevelBadge level={book.level} />
      </h2>

      <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50">
        <input
          type="checkbox"
          checked={showTrans}
          onChange={(e) => setShowTrans(e.target.checked)}
          className="h-4 w-4 accent-zinc-900"
        />
        {L('Показувати переклад абзаців', 'Показывать перевод абзацев')}
      </label>

      <div className="mt-4 space-y-4">
        {paras.map((toks, pi) => (
          <div key={pi} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-[1.05rem] leading-loose text-zinc-800">
              {renderTokens(toks, book, (h) => setHit(h))}
              <SpeakBtn text={book.paragraphs[pi].de} className="ml-1 h-7 w-7 align-middle text-sm" />
            </p>
            {showTrans && (
              <p className="mt-2 border-l-2 border-amber-300 pl-3 text-sm leading-relaxed text-zinc-500">
                {lang === 'uk' ? book.paragraphs[pi].uk : book.paragraphs[pi].ru}
              </p>
            )}
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-zinc-400">
        {L('Торкніться підкреслених слів — покажеться переклад.', 'Коснитесь подчёркнутых слов — покажется перевод.')}
      </p>

      {hit && <WordSheet hit={hit} onClose={() => setHit(null)} />}
    </div>
  )
}

/** Розмалювати абзац: клікабельні слова/фрази + звичайний текст */
function renderTokens(toks: Tok[], book: Book, onTap: TapFn): ReactNode[] {
  const out: ReactNode[] = []
  let i = 0
  let k = 0
  while (i < toks.length) {
    const t = toks[i]
    if (!t.isWord) {
      out.push(<Fragment key={k++}>{t.text}</Fragment>)
      i++
      continue
    }
    const r = lookupAt(toks, i, book)
    if (r) {
      out.push(
        <button
          key={k++}
          type="button"
          onClick={() => onTap(r)}
          className="cursor-pointer rounded-sm underline decoration-dotted decoration-sky-400 underline-offset-4 transition-colors hover:bg-sky-50"
        >
          {r.matched}
        </button>,
      )
      i = r.end + 1
    } else {
      out.push(<Fragment key={k++}>{t.text}</Fragment>)
      i++
    }
  }
  return out
}

// ---------- КАРТКА ПЕРЕКЛАДУ (знизу) ----------

function WordSheet({ hit, onClose }: { hit: Hit; onClose: () => void }) {
  const L = useL()
  const B = useBi()
  const e = hit.entry
  const matched = hit.matched.trim()
  const canonical = (e.de ?? '').trim()
  const showCanon = canonical && canonical.toLowerCase() !== matched.toLowerCase()

  return (
    <>
      <div className="fixed inset-0 z-20 bg-zinc-900/20" onClick={onClose} />
      <div className="fixed inset-x-0 bottom-0 z-30">
        <div className="mx-auto max-w-3xl rounded-t-3xl border border-b-0 border-zinc-200 bg-white p-5 shadow-2xl">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="break-words text-2xl font-black tracking-tight text-zinc-900">{matched}</p>
              {showCanon && (
                <p className="mt-0.5 text-sm font-semibold text-zinc-400">
                  → {e.art ? `${e.art} ${canonical}` : canonical}
                </p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <SpeakBtn text={e.art ? `${e.art} ${e.de ?? matched}` : (e.de || matched)} />
              <button
                type="button"
                onClick={onClose}
                aria-label={L('Закрити', 'Закрыть')}
                className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
              >
                ✕
              </button>
            </div>
          </div>

          {e.art && (
            <div className="mt-2 flex items-center gap-2">
              <ArtChip art={e.art} />
              {e.pl && (
                <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] text-zinc-500">
                  die {e.pl}
                </span>
              )}
            </div>
          )}

          <p className="mt-2 text-lg font-bold text-emerald-700">{e.uk}</p>
          <p className="text-sm font-semibold text-zinc-500">{e.ru}</p>

          {e.topic && (
            <p className="mt-2 text-xs font-semibold text-zinc-400">
              {e.topic.emoji} {B(e.topic.name)}
            </p>
          )}
          {e.verb?.part && (
            <p className="mt-1 font-mono text-xs text-zinc-400">
              Präteritum: {e.verb.pret3 ?? '—'} · Perfekt: {e.verb.aux ?? 'hat'} {e.verb.part}
            </p>
          )}
        </div>
      </div>
    </>
  )
}
