// ============================================================
// ТЕСТ ДАНИХ ТРЕНАЖЕРА НІМЕЦЬКОЇ (bun scripts/test-deutsch.ts)
// Цілісність словника, дієслів і граматики + гігієна мов:
// в uk-полях не повинно бути російських букв (Э/э, Ы/ы, Ё/ё),
// в ru-полях — українських (Ї, І, Є, Ґ та малих).
// ============================================================
import { TOPICS, ALL_WORDS, NOUNS, TOTAL_WORDS, displayDe, isPhraseTopic } from '../src/lib/deutsch-data'
import { EXAMPLES, EXAMPLES_COUNT } from '../src/lib/deutsch-examples'
import { VERBS, PRONOUNS, GRAMMAR } from '../src/lib/deutsch-grammar'
import { BOOKS, BASE_GLOSSARY, bookParas, tokenize, lookupAt } from '../src/lib/deutsch-books'

let errors = 0
function fail(msg: string): void {
  errors++
  console.log('  FAIL:', msg)
}

console.log('=== Тест даних Deutsch A1 ===')

// 1. Теми та слова
const ids = new Set<string>()
for (const t of TOPICS) {
  if (ids.has(t.id)) fail(`дублікат теми: ${t.id}`)
  ids.add(t.id)
  if (!t.words.length) fail(`порожня тема: ${t.id}`)
  const deSet = new Set<string>()
  for (const w of t.words) {
    if (deSet.has(w.de)) fail(`дублікат слова в темі ${t.id}: ${w.de}`)
    deSet.add(w.de)
    if (!w.uk.trim()) fail(`порожній uk: ${t.id}/${w.de}`)
    if (!w.ru.trim()) fail(`порожній ru: ${t.id}/${w.de}`)
    if (w.ex) {
      if (!w.ex.de.trim() || !w.ex.uk.trim() || !w.ex.ru.trim())
        fail(`неповний приклад: ${t.id}/${w.de}`)
    }
  }
}
console.log(`Теми: ${TOPICS.length}, слів усього: ${TOTAL_WORDS}, іменників: ${NOUNS.length}`)

// 1b. Розбивка за рівнями + глобальні дублікати між темами (попередження)
const byLevel: Record<string, number> = {}
for (const t of TOPICS) byLevel[t.level] = (byLevel[t.level] ?? 0) + t.words.length
console.log('За рівнями:', Object.entries(byLevel).map(([k, v]) => `${k}=${v}`).join(', '))

const globalDe = new Map<string, string>()
let globalDupes = 0
for (const { topic, word } of ALL_WORDS) {
  if (globalDe.has(word.de)) {
    globalDupes++
    if (globalDupes <= 12) console.log(`  WARN: слово «${word.de}» у темах ${globalDe.get(word.de)} і ${topic.id}`)
  } else globalDe.set(word.de, topic.id)
}
if (globalDupes) console.log(`  Увага: глобальних повторів: ${globalDupes}`)

// 2. Гігієна мов: uk без Э/Ы/Ё, ru без Ї/І/Є/Ґ
const ukBad = /[ЭэЫыЁё]/
const ruBad = /[ЇїІіЄєҐґ]/
for (const { topic, word } of ALL_WORDS) {
  const fields: [string, string][] = [['uk', word.uk], ['ru', word.ru]]
  if (word.ex) fields.push(['ex.uk', word.ex.uk], ['ex.ru', word.ex.ru])
  for (const [name, val] of fields) {
    if (name.startsWith('uk') && ukBad.test(val))
      fail(`рос. літери в uk-полі ${topic.id}/${word.de} (${name}): "${val}"`)
    if (name.startsWith('ru') && ruBad.test(val))
      fail(`укр. літери в ru-полі ${topic.id}/${word.de} (${name}): "${val}"`)
  }
}

// 2b. Приклади-речення: у звичайних темах кожне слово має ex;
// у таблицях EXAMPLES немає осиротілих ключів (прив'язка точна)
let noEx = 0
for (const { topic, word } of ALL_WORDS) {
  if (!isPhraseTopic(topic) && !word.ex) {
    noEx++
    if (noEx <= 10) fail(`немає прикладу-речення: ${topic.id}/${word.de}`)
  }
}
if (noEx) fail(`усього слів без прикладу: ${noEx}`)

let orphans = 0
for (const [topicId, table] of Object.entries(EXAMPLES)) {
  const topic = TOPICS.find((t) => t.id === topicId)
  if (!topic) {
    orphans++
    fail(`EXAMPLES для неіснуючої теми: ${topicId}`)
    continue
  }
  const deSet = new Set(topic.words.map((w) => w.de))
  for (const de of Object.keys(table)) {
    if (!deSet.has(de)) {
      orphans++
      if (orphans <= 10) fail(`осиротілий ключ прикладу: ${topicId}/${de}`)
    }
  }
}
if (orphans) fail(`усього осиротілих ключів: ${orphans}`)
console.log(`Приклади-речення в таблицях: ${EXAMPLES_COUNT}, слова без прикладу: ${noEx}, осиротілих ключів: ${orphans}`)

// 3. Іменники: артикль валідний
for (const { word } of NOUNS) {
  if (word.art !== 'der' && word.art !== 'die' && word.art !== 'das')
    fail(`невалідний артикль: ${word.de}`)
}

// 4. Дієслова: 6 форм, без порожніх, інфінітив унікальний
const infs = new Set<string>()
for (const v of VERBS) {
  if (infs.has(v.inf)) fail(`дублікат дієслова: ${v.inf}`)
  infs.add(v.inf)
  if (v.forms.length !== PRONOUNS.length)
    fail(`${v.inf}: форм ${v.forms.length}, а має ${PRONOUNS.length}`)
  for (const f of v.forms) if (!f.trim()) fail(`${v.inf}: порожня форма`)
}

// 5. Граматика: таблиці прямокутні, у кожної картки є заголовок
const gids = new Set<string>()
for (const g of GRAMMAR) {
  if (gids.has(g.id)) fail(`дублікат картки граматики: ${g.id}`)
  gids.add(g.id)
  if (!g.title.uk || !g.title.ru) fail(`картка без перекладу: ${g.id}`)
  for (const t of g.tables ?? []) {
    const n = t.head.length
    if (!n) fail(`порожня шапка таблиці в ${g.id}`)
    for (const r of t.rows) if (r.length !== n) fail(`нерівна таблиця в ${g.id}: рядок «${r[0]}» має ${r.length} клітинок проти ${n}`)
  }
}

// 6. Дисплей з артиклем
const mann = TOPICS.find((t) => t.id === 'familie')!.words.find((w) => w.de === 'Mann')!
if (displayDe(mann) !== 'der Mann') fail(`displayDe(Mann) = "${displayDe(mann)}", а не "der Mann"`)

// 7. Розкид іменників для тренажера артиклів: усі три роди мають бути представлені
const arts = new Set(NOUNS.map((n) => n.word.art))
for (const a of ['der', 'die', 'das']) if (!arts.has(a as 'der' | 'die' | 'das')) fail(`немає іменників роду ${a}`)

// 8. Читанка: книжки, розділи, глосарії, гігієна мов і покриття перекладом
console.log('\n=== Читанка ===')
const ukBad2 = /[ЭэЫыЁё]/
const ruBad2 = /[ЇїІіЄєҐґ]/
for (const [k, g] of Object.entries(BASE_GLOSSARY)) {
  if (!g.uk.trim() || !g.ru.trim()) fail(`базовий глосарій, порожній переклад: ${k}`)
  if (ukBad2.test(g.uk)) fail(`рос. літери в базовому глосарії uk «${k}»: "${g.uk}"`)
  if (ruBad2.test(g.ru)) fail(`укр. літери в базовому глосарії ru «${k}»: "${g.ru}"`)
}
const bids = new Set<string>()
for (const b of BOOKS) {
  if (bids.has(b.id)) fail(`дублікат книжки: ${b.id}`)
  bids.add(b.id)
  if (!b.title.uk.trim() || !b.title.ru.trim()) fail(`книжка без перекладу назви: ${b.id}`)
  if (!b.blurb?.uk.trim() || !b.blurb?.ru.trim()) fail(`книжка без опису: ${b.id}`)
  if (ukBad2.test(b.blurb.uk)) fail(`рос. літери в описі uk: ${b.id}`)
  if (ruBad2.test(b.blurb.ru)) fail(`укр. літери в описі ru: ${b.id}`)
  if (!b.chapters.length) fail(`книжка без розділів: ${b.id}`)
  const bad = (name: string, uk: string, ru: string) => {
    if (!uk.trim() || !ru.trim()) fail(`неповний переклад: ${b.id}/${name}`)
    if (ukBad2.test(uk)) fail(`рос. літери в uk «${b.id}/${name}»: "${uk}"`)
    if (ruBad2.test(ru)) fail(`укр. літери в ru «${b.id}/${name}»: "${ru}"`)
  }
  let total = 0
  let hitCount = 0
  const miss: string[] = []
  b.chapters.forEach((ch, ci) => {
    bad(`р${ci + 1}.назва`, ch.title.uk, ch.title.ru)
    if (!ch.paragraphs.length) fail(`порожній розділ ${ci + 1}: ${b.id}`)
    ch.paragraphs.forEach((p, pi) => {
      bad(`р${ci + 1}/абзац${pi + 1}`, p.uk, p.ru)
      const toks = tokenize(p.de)
      let i = 0
      while (i < toks.length) {
        if (!toks[i].isWord) {
          i++
          continue
        }
        const r = lookupAt(toks, i, b)
        total++
        if (r) {
          hitCount++
          i = r.end + 1
        } else {
          miss.push(toks[i].core)
          i++
        }
      }
    })
  })
  for (const [k, g] of Object.entries(b.glossary)) bad(`глосарій:${k}`, g.uk, g.ru)

  const pct = total ? Math.round((hitCount / total) * 100) : 0
  const paras = bookParas(b)
  const words = paras.reduce((n, p) => n + tokenize(p.de).filter((t) => t.isWord).length, 0)
  console.log(
    `${b.emoji} ${b.id} (${b.level}): ${b.chapters.length} розділів, ${paras.length} абзаців, ~${words} слів, покриття перекладом ${pct}%`,
  )
  const uniqMiss = [...new Set(miss)]
  if (uniqMiss.length) console.log(`  без перекладу (${uniqMiss.length}): ${uniqMiss.slice(0, 200).join(', ')}`)
  if (pct < 85) fail(`низьке покриття книжки ${b.id}: ${pct}%`)
}

console.log(errors === 0 ? '\nOK — усі перевірки пройдено ✔' : `\nПОМИЛОК: ${errors} ✘`)
if (errors > 0) process.exit(1)
