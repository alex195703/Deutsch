// ============================================================
// ТЕСТ ДАНИХ ТРЕНАЖЕРА НІМЕЦЬКОЇ (bun scripts/test-deutsch.ts)
// Цілісність словника, дієслів і граматики + гігієна мов:
// в uk-полях не повинно бути російських букв (Э/э, Ы/ы, Ё/ё),
// в ru-полях — українських (Ї, І, Є, Ґ та малих).
// ============================================================
import { TOPICS, ALL_WORDS, NOUNS, TOTAL_WORDS, displayDe, wordKey, isPhraseTopic, type Level } from '../src/lib/deutsch-data'
import { EXAMPLES, EXAMPLES_COUNT } from '../src/lib/deutsch-examples'
import { VERBS, PRONOUNS, GRAMMAR } from '../src/lib/deutsch-grammar'
import { BOOKS, BASE_GLOSSARY, bookParas, tokenize, lookupAt } from '../src/lib/deutsch-books'
import { IDIOM_GROUPS, IDIOM_TOTAL } from '../src/lib/deutsch-idioms'
import {
  ADJS_C, NOUNS_C, PRONOUNS_C, TIMES_C, VERBS_C,
  buildSentence, randomBuilt, ukPastForm, ruPastForm, allowedNouns, slotFor,
} from '../src/lib/deutsch-builder'
import { MODALS, MSENSES, exSentence } from '../src/lib/deutsch-modal'
import { PRON_TABLES, PRON_TOTAL } from '../src/lib/deutsch-pronouns'
import { PREP_GROUPS, PREP_TOTAL } from '../src/lib/deutsch-preps'
import {
  ACHIEVEMENTS, RANKS, XP, TOPIC_DONE,
  rankFor, nextRank, dailyStreakFrom, todayStr, topicMastery,
  buildSnap, type Kind, type Snap,
} from '../src/lib/gamify'

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

// 9. Живі фрази: повнота перекладів, гігієна мов, дублікати
console.log('\n=== Живі фрази ===')
{
  const seen = new Set<string>()
  for (const g of IDIOM_GROUPS) {
    if (!g.items.length) fail(`порожня група фраз: ${g.id}`)
    if (!g.name.uk.trim() || !g.name.ru.trim()) fail(`група без назви: ${g.id}`)
    for (const it of g.items) {
      if (seen.has(it.de)) fail(`дублікат фрази: ${it.de}`)
      seen.add(it.de)
      if (!it.uk.trim() || !it.ru.trim()) fail(`фраза без перекладу: ${g.id}/${it.de}`)
      if (ukBad.test(it.uk)) fail(`рос. літери в uk фрази «${it.de}»: "${it.uk}"`)
      if (ruBad.test(it.ru)) fail(`укр. літери в ru фрази «${it.de}»: "${it.ru}"`)
      if (it.note) {
        if (!it.note.uk.trim() || !it.note.ru.trim()) fail(`неповна нотатка: ${it.de}`)
        if (ukBad.test(it.note.uk)) fail(`рос. літери в uk нотатки «${it.de}»`)
        if (ruBad.test(it.note.ru)) fail(`укр. літери в ru нотатки «${it.de}»`)
      }
    }
  }
  console.log(`Груп: ${IDIOM_GROUPS.length}, фраз: ${IDIOM_TOTAL}`)
}

// 10. Конструктор: граматичний двигун
console.log('\n=== Конструктор ===')
{
  // 10a. Цілісність даних
  const vids = new Set<string>()
  for (const v of VERBS_C) {
    if (vids.has(v.id)) fail(`дублікат дієслова-конструктора: ${v.id}`)
    vids.add(v.id)
    if (v.forms.length !== 6) fail(`${v.inf}: форм ${v.forms.length}, а має 6`)
    for (const f of v.forms) if (!f.trim()) fail(`${v.inf}: порожня форма`)
    if ((v.kind === 'trans' || v.kind === 'move') && (!v.uk6 || v.uk6.length !== 6 || !v.ru6 || v.ru6.length !== 6))
      fail(`${v.inf}: неповні форми перекладу Präsens`)
    if ((v.kind === 'trans' || v.kind === 'move') && (!v.ukFut6 || v.ukFut6.length !== 6))
      fail(`${v.inf}: неповні форми перекладу Futur`)
    if ((v.kind === 'trans' || v.kind === 'move') && (!v.ukPastM || !v.ruPastM || !v.part))
      fail(`${v.inf}: немає Partizip II або перекладу минулого`)
    for (const o of v.obj ?? []) if (!NOUNS_C.some((n) => n.id === o.id)) fail(`${v.inf}: невідомий об'єкт ${o.id}`)
  }
  const nids = new Set<string>()
  for (const n of NOUNS_C) {
    if (nids.has(n.id)) fail(`дублікат іменника-конструктора: ${n.id}`)
    nids.add(n.id)
    if (!n.uk.trim() || !n.ru.trim() || !n.ukAkk.trim() || !n.ruAkk.trim()) fail(`неповний іменник: ${n.id}`)
  }
  for (const a of ADJS_C) {
    for (const g of ['m', 'f', 'n', 'p'] as const) {
      if (!a.uk[g].trim() || !a.ru[g].trim()) fail(`неповний прикметник: ${a.de}/${g}`)
    }
  }
  if (PRONOUNS_C.length < 10 || NOUNS_C.length < 10 || ADJS_C.length < 10 || VERBS_C.length < 10 || TIMES_C.length < 10)
    fail(`групи мають бути не менші ніж 10: ${PRONOUNS_C.length}/${VERBS_C.length}/${NOUNS_C.length}/${ADJS_C.length}/${TIMES_C.length}`)

  // 10b. Точкові перевірки граматики
  const eq = (label: string, got: string, want: string) => {
    if (got !== want) fail(`${label}: "${got}", а очікувалось "${want}"`)
  }
  eq('Präsens ich lesen', buildSentence({ verb: 'lesen', pron: 'ich', noun: 'buch', time: 'heute', tense: 'praesens', neg: false }).de, 'Ich lese heute das Buch.')
  eq('Präsens neg', buildSentence({ verb: 'lesen', pron: 'ich', noun: 'buch', time: 'heute', tense: 'praesens', neg: true }).de, 'Ich lese heute das Buch nicht.')
  eq('Perfekt', buildSentence({ verb: 'lesen', pron: 'ich', noun: 'buch', time: 'gestern', tense: 'vergangen', neg: false }).de, 'Ich habe gestern das Buch gelesen.')
  eq('Perfekt neg', buildSentence({ verb: 'lesen', pron: 'ich', noun: 'buch', time: 'gestern', tense: 'vergangen', neg: true }).de, 'Ich habe gestern das Buch nicht gelesen.')
  eq('Futur', buildSentence({ verb: 'lesen', pron: 'ich', noun: 'buch', time: 'morgen', tense: 'zukunft', neg: false }).de, 'Ich werde morgen das Buch lesen.')
  eq('du sehen', buildSentence({ verb: 'sehen', pron: 'du', noun: 'kind', time: 'heute', tense: 'praesens', neg: false }).de, 'Du siehst heute das Kind.')
  eq('Akk den', buildSentence({ verb: 'sehen', pron: 'er', noun: 'freund', time: 'heute', tense: 'praesens', neg: false }).de, 'Er sieht heute den Freund.')
  eq('sein Präs', buildSentence({ verb: 'sein', noun: 'kaffee', adj: 'gut', tense: 'praesens', neg: false }).de, 'Der Kaffee ist gut.')
  eq('sein Prät', buildSentence({ verb: 'sein', noun: 'kaffee', adj: 'gut', tense: 'vergangen', neg: false }).de, 'Der Kaffee war gut.')
  eq('sein Futur', buildSentence({ verb: 'sein', noun: 'kaffee', adj: 'gut', tense: 'zukunft', neg: false }).de, 'Der Kaffee wird gut sein.')
  eq('sein neg', buildSentence({ verb: 'sein', noun: 'tag', adj: 'schoen', tense: 'praesens', neg: true }).de, 'Der Tag ist nicht schön.')
  eq('haben Präs', buildSentence({ verb: 'haben', pron: 'wir', noun: 'zeit', tense: 'praesens', neg: false }).de, 'Wir haben Zeit.')
  eq('haben kein', buildSentence({ verb: 'haben', pron: 'wir', noun: 'zeit', tense: 'praesens', neg: true }).de, 'Wir haben keine Zeit.')
  eq('haben Prät', buildSentence({ verb: 'haben', pron: 'wir', noun: 'zeit', tense: 'vergangen', neg: false }).de, 'Wir hatten Zeit.')
  eq('haben Futur', buildSentence({ verb: 'haben', pron: 'wir', noun: 'zeit', tense: 'zukunft', neg: false }).de, 'Wir werden Zeit haben.')
  eq('brauchen', buildSentence({ verb: 'brauchen', pron: 'ich', noun: 'zeit', tense: 'praesens', neg: false }).de, 'Ich brauche Zeit.')
  eq('brauchen kein', buildSentence({ verb: 'brauchen', pron: 'ich', noun: 'zeit', tense: 'praesens', neg: true }).de, 'Ich brauche keine Zeit.')
  eq('brauchen Futur', buildSentence({ verb: 'brauchen', pron: 'ich', noun: 'zeit', tense: 'zukunft', neg: false }).de, 'Ich werde Zeit brauchen.')
  eq('gehen Präs', buildSentence({ verb: 'gehen', pron: 'er', time: 'heute', tense: 'praesens', neg: false }).de, 'Er geht heute.')
  eq('gehen Perfekt sein', buildSentence({ verb: 'gehen', pron: 'er', time: 'gestern', tense: 'vergangen', neg: false }).de, 'Er ist gestern gegangen.')
  eq('kommen Futur', buildSentence({ verb: 'kommen', pron: 'sie3', time: 'morgen', tense: 'zukunft', neg: false }).de, 'Sie wird morgen kommen.')
  eq('ihr trinkt', buildSentence({ verb: 'trinken', pron: 'ihr', noun: 'kaffee', time: 'heute', tense: 'praesens', neg: false }).de, 'Ihr trinkt heute Kaffee.')

  eq('trinken kein Akk', buildSentence({ verb: 'trinken', pron: 'ihr', noun: 'kaffee', time: 'heute', tense: 'praesens', neg: true }).de, 'Ihr trinkt heute keinen Kaffee.')
  eq('machen kein Akk', buildSentence({ verb: 'machen', pron: 'wir', noun: 'kaffee', time: 'heute', tense: 'praesens', neg: true }).de, 'Wir machen heute keinen Kaffee.')
  eq('trinken Perfekt kein', buildSentence({ verb: 'trinken', pron: 'ich', noun: 'kaffee', time: 'gestern', tense: 'vergangen', neg: true }).de, 'Ich habe gestern keinen Kaffee getrunken.')
  eq('trinken Futur kein', buildSentence({ verb: 'trinken', pron: 'ich', noun: 'kaffee', time: 'morgen', tense: 'zukunft', neg: true }).de, 'Ich werde morgen keinen Kaffee trinken.')

  // розширення словника (2026-11)
  eq('essen', buildSentence({ verb: 'essen', pron: 'ich', noun: 'brot', time: 'heute', tense: 'praesens', neg: false }).de, 'Ich esse heute Brot.')
  eq('essen kein', buildSentence({ verb: 'essen', pron: 'ich', noun: 'brot', time: 'heute', tense: 'praesens', neg: true }).de, 'Ich esse heute kein Brot.')
  eq('essen Perfekt', buildSentence({ verb: 'essen', pron: 'sie3', noun: 'brot', time: 'gestern', tense: 'vergangen', neg: false }).de, 'Sie hat gestern Brot gegessen.')
  eq('fahren Perfekt sein', buildSentence({ verb: 'fahren', pron: 'er', time: 'gestern', tense: 'vergangen', neg: false }).de, 'Er ist gestern gefahren.')
  eq('fahren Futur', buildSentence({ verb: 'fahren', pron: 'wir', time: 'morgen', tense: 'zukunft', neg: false }).de, 'Wir werden morgen fahren.')
  eq('suchen kein', buildSentence({ verb: 'suchen', pron: 'wir', noun: 'arbeit', time: 'heute', tense: 'praesens', neg: true }).de, 'Wir suchen heute keine Arbeit.')
  eq('finden nicht', buildSentence({ verb: 'finden', pron: 'ich', noun: 'hund', time: 'heute', tense: 'praesens', neg: true }).de, 'Ich finde heute den Hund nicht.')
  eq('schreiben Perfekt', buildSentence({ verb: 'schreiben', pron: 'ihr', noun: 'buch', time: 'gestern', tense: 'vergangen', neg: false }).de, 'Ihr habt gestern das Buch geschrieben.')
  eq('haben kein Auto', buildSentence({ verb: 'haben', pron: 'wir', noun: 'auto', tense: 'praesens', neg: true }).de, 'Wir haben kein Auto.')
  eq('haben Wohnung Perf', buildSentence({ verb: 'haben', pron: 'sie3', noun: 'wohnung', tense: 'vergangen', neg: false }).de, 'Sie hatte eine Wohnung.')
  eq('sein billig', buildSentence({ verb: 'sein', noun: 'auto', adj: 'billig', tense: 'praesens', neg: false }).de, 'Das Auto ist billig.')
  eq('sein schwer Futur', buildSentence({ verb: 'sein', noun: 'schule', adj: 'schwer', tense: 'zukunft', neg: false }).de, 'Die Schule wird schwer sein.')
  eq('brauchen kein Buch', buildSentence({ verb: 'brauchen', pron: 'ich', noun: 'buch', tense: 'praesens', neg: true }).de, 'Ich brauche kein Buch.')
  eq('brauchen Wohnung', buildSentence({ verb: 'brauchen', pron: 'du', noun: 'wohnung', tense: 'praesens', neg: false }).de, 'Du brauchst eine Wohnung.')

  // флексії перекладу
  eq('ukPast пішов(f)', ukPastForm('пішов', 'f'), 'пішла')
  eq('ukPast прочитав(p)', ukPastForm('прочитав', 'p'), 'прочитали')
  eq('ruPast пошёл(f)', ruPastForm('пошёл', 'f'), 'пошла')
  eq('ruPast читал(n)', ruPastForm('читал', 'n'), 'читало')

  // 10c. Повна матриця: кожне дієслово × час × тон у валідних комбінаціях
  let built = 0
  const tenses = ['praesens', 'vergangen', 'zukunft'] as const
  for (const v of VERBS_C) {
    for (const tense of tenses) {
      for (const neg of [false, true]) {
        try {
          if (v.kind === 'sein') {
            for (const n of NOUNS_C) for (const a of ADJS_C) {
              const b = buildSentence({ verb: v.id, noun: n.id, adj: a.id, tense, neg })
              if (!b.de.endsWith('.') || !b.uk.trim() || !b.ru.trim()) fail(`sein ${n.id}/${a.id}/${tense}: неповне речення`)
              built++
            }
          } else if (v.kind === 'move') {
            for (const p of PRONOUNS_C) for (const t of TIMES_C.filter((x) => x.tenses.includes(tense))) {
              const b = buildSentence({ verb: v.id, pron: p.id, time: t.id, tense, neg })
              if (!b.de.endsWith('.') || !b.uk.trim()) fail(`move ${p.id}/${v.id}/${tense}: неповне речення`)
              built++
            }
          } else {
            for (const p of PRONOUNS_C) for (const nid of allowedNouns(v)) {
              const b = buildSentence({ verb: v.id, pron: p.id, noun: nid, time: 'heute', tense, neg })
              if (!b.de.endsWith('.') || !b.uk.trim() || !b.ru.trim()) fail(`${v.kind} ${p.id}/${nid}/${tense}: неповне речення`)
              // слова речення = токени для вправи
              if (b.tokens.join(' ') !== b.de.slice(0, -1)) fail(`${v.id}: токени не збігаються: ${b.de}`)
              built++
            }
          }
        } catch (e) {
          fail(`${v.id}/${tense}/${neg ? 'neg' : 'pos'}: впав двигун — ${e}`)
        }
      }
    }
  }
  console.log(`Зібрано речень у матриці: ${built}`)

  // 10d. Випадкові речення завжди коректні
  for (let i = 0; i < 30; i++) {
    const b = randomBuilt()
    if (!b.de.endsWith('.') || !b.uk.trim() || !b.ru.trim() || !b.tokens.length) fail(`randomBuilt: неповне: ${b.de}`)
  }

  // 10e. Слоти UI
  for (const v of VERBS_C) {
    const s = slotFor(v)
    if (v.kind === 'sein' && s !== 'adj') fail(`sein: slot ${s}`)
    if (v.kind === 'move' && s !== 'none') fail(`move: slot ${s}`)
  }
  console.log(`Групи: займенників ${PRONOUNS_C.length}, дієслів ${VERBS_C.length}, іменників ${NOUNS_C.length}, прикметників ${ADJS_C.length}, обставин ${TIMES_C.length}`)
}

// 11. Модальні дієслова: форми, рамка, гігієна мов
console.log('\n=== Модальні дієслова ===')
{
  const mids = new Set<string>()
  let exCount = 0
  for (const m of MODALS) {
    if (mids.has(m.id)) fail(`дублікат модального: ${m.id}`)
    mids.add(m.id)
    if (m.pr.length !== 6 || m.pt.length !== 6) fail(`${m.inf}: форм має бути 6 у Präsens і Präteritum`)
    for (const f of [...m.pr, ...m.pt]) if (!f.trim()) fail(`${m.inf}: порожня форма`)
    // модальне правило: ich = er/sie/es без закінчення в обох часах
    if (m.pr[0] !== m.pr[2]) fail(`${m.inf}: pr ich (${m.pr[0]}) ≠ er (${m.pr[2]})`)
    if (m.pt[0] !== m.pt[2]) fail(`${m.inf}: pt ich (${m.pt[0]}) ≠ er (${m.pt[2]})`)
    // wir-форма збігається з інфінітивом у Präsens; у Präteritum — ні
    if (m.pr[3] !== m.inf) fail(`${m.inf}: wir-форма Präsens «${m.pr[3]}» ≠ інфінітиву`)
    if (m.pt[3] === m.inf) fail(`${m.inf}: wir-форма Präteritum не має дорівнювати інфінітиву`)
    if (!m.meaning.uk.trim() || !m.meaning.ru.trim()) fail(`${m.inf}: неповне значення`)
    if (!m.force.uk.trim() || !m.force.ru.trim()) fail(`${m.inf}: неповний відтінок`)
    if (ukBad.test(m.meaning.uk) || ukBad.test(m.force.uk)) fail(`рос. літери в uk полях «${m.inf}»`)
    if (ruBad.test(m.meaning.ru) || ruBad.test(m.force.ru)) fail(`укр. літери в ru полях «${m.inf}»`)
    if (m.trap) {
      if (!m.trap.uk.trim() || !m.trap.ru.trim()) fail(`${m.inf}: неповна пастка`)
      if (ukBad.test(m.trap.uk)) fail(`рос. літери в uk пастки «${m.inf}»`)
      if (ruBad.test(m.trap.ru)) fail(`укр. літери в ru пастки «${m.inf}»`)
    }
    // приклади: рамка збирається, початок — з великої, кінець — розділовий знак,
    // модальна форма належить до форм цього дієслова
    if (!m.examples.length) fail(`${m.inf}: жодного приклада`)
    for (const ex of m.examples) {
      exCount++
      const s = exSentence(ex)
      if (!/^[A-ZÄÖÜ]/.test(s)) fail(`«${m.inf}»: речення не з великої літери: ${s}`)
      if (!/[.?!]$/.test(s)) fail(`«${m.inf}»: немає розділового знака в кінці: ${s}`)
      if (!m.pr.some((f) => f.toLowerCase() === ex.modal.toLowerCase()) && !m.pt.some((f) => f.toLowerCase() === ex.modal.toLowerCase()))
        fail(`«${m.inf}»: форма «${ex.modal}» не належить до форм дієслова`)
      if (!ex.uk.trim() || !ex.ru.trim()) fail(`«${m.inf}»: приклад без перекладу: ${s}`)
      if (ukBad.test(ex.uk)) fail(`рос. літери в uk приклада «${s}»`)
      if (ruBad.test(ex.ru)) fail(`укр. літери в ru приклада «${s}»`)
      if (ex.note) {
        if (!ex.note.uk.trim() || !ex.note.ru.trim()) fail(`«${m.inf}»: неповна нотатка приклада`)
        if (ukBad.test(ex.note.uk)) fail(`рос. літери в uk нотатки «${s}»`)
        if (ruBad.test(ex.note.ru)) fail(`укр. літери в ru нотатки «${s}»`)
      }
    }
  }
  // точкові перевірки ключових форм
  const eq = (label: string, got: string, want: string) => {
    if (got !== want) fail(`${label}: "${got}", а очікувалось "${want}"`)
  }
  eq('können pr ich', MODALS[0].pr[0], 'kann')
  eq('können pt er', MODALS[0].pt[2], 'konnte')
  eq('müssen pr du', MODALS[1].pr[1], 'musst')
  eq('wollen pt ich', MODALS[3].pt[0], 'wollte')
  eq('möchten pr ich', MODALS[5].pr[0], 'möchte')
  eq('рамка können', exSentence(MODALS[0].examples[0]), 'Ich kann gut schwimmen.')
  eq('рамка müssen', exSentence(MODALS[1].examples[0]), 'Ich muss heute arbeiten.')
  eq('рамка dürfen-питання', exSentence(MODALS[2].examples[1]), 'Darf ich fragen?')
  // підказки-сенси: валідні посилання й гігієна
  const idsM = new Set(MODALS.map((m) => m.id))
  for (const s of MSENSES) {
    if (!idsM.has(s.verb)) fail(`сенс «${s.uk}» посилається на невідоме дієслово ${s.verb}`)
    if (!s.uk.trim() || !s.ru.trim()) fail(`порожній сенс: ${s.verb}`)
    if (ukBad.test(s.uk)) fail(`рос. літери в uk сенсу «${s.uk}»`)
    if (ruBad.test(s.ru)) fail(`укр. літери в ru сенсу «${s.ru}»`)
  }
  console.log(`Дієслів: ${MODALS.length}, прикладів: ${exCount}, підказок-сенсів: ${MSENSES.length}`)
}

// 12. Гейміфікація: ранги, серії днів, досягнення, XP-економіка
console.log('\n=== Гейміфікація ===')

// 12a. Ранги: зростають, без дублікатів, старт із 0
let prevMin = -1
const rankDe = new Set<string>()
for (const r of RANKS) {
  if (r.min <= prevMin) fail(`ранги не зростають: ${r.de} (${r.min})`)
  prevMin = r.min
  if (rankDe.has(r.de)) fail(`дублікат рангу: ${r.de}`)
  rankDe.add(r.de)
  if (!r.name.uk.trim() || !r.name.ru.trim()) fail(`ранг без перекладу: ${r.de}`)
}
if (RANKS[0].min !== 0) fail('перший ранг має починатися з 0 XP')
if (rankFor(0).de !== 'A1.1') fail('rankFor(0) ≠ A1.1')
if (rankFor(RANKS[RANKS.length - 1].min).de !== RANKS[RANKS.length - 1].de) fail('rankFor(max) не останній')
if (nextRank(RANKS[RANKS.length - 1].min) !== undefined) fail('nextRank(max) має бути undefined')
if (nextRank(0)?.de !== RANKS[1].de) fail('nextRank(0) ≠ другий ранг')
console.log(`Ранги: ${RANKS.map((r) => `${r.de}@${r.min}`).join(' → ')}`)

// 12b. Серія днів: сьогодні/вчора/розриви/7 днів
const T = todayStr()
const dayOffset = (n: number): string => {
  const d = new Date(T + 'T12:00:00')
  d.setDate(d.getDate() + n)
  return todayStr(d)
}
if (dailyStreakFrom([T], T) !== 1) fail('серія 1 день рахується неправильно')
if (dailyStreakFrom([T, dayOffset(-1)], T) !== 2) fail('серія 2 дні рахується неправильно')
if (dailyStreakFrom([dayOffset(-1)], T) !== 1) fail('тільки вчорашній день: серія має бути 1')
if (dailyStreakFrom([T, dayOffset(-2)], T) !== 1) fail('розрив у днях не скидає серію')
const week = Array.from({ length: 7 }, (_, i) => dayOffset(i - 6))
if (dailyStreakFrom(week, T) !== 7) fail('серія 7 днів підряд рахується неправильно')

// 12c. Освоєність тем: порожня карта → 0, повна карта теми → зараховано
const masteryEmpty = topicMastery({})
for (const lv of ['A1', 'A2', 'B1'] as Level[])
  if (masteryEmpty[lv].done !== 0) fail(`порожній прогрес не має давати освоєних тем (${lv})`)
const firstTopic = TOPICS[0]
const fullMap: Record<string, { l?: 1 }> = {}
for (const w of firstTopic.words) fullMap[wordKey(firstTopic.id, w)] = { l: 1 }
const masteryOne = topicMastery(fullMap)
if (masteryOne[firstTopic.level].done < 1) fail(`повністю вивчена тема не зарахована (${firstTopic.id})`)

// 12d. Досягнення: унікальні id, умови спрацьовують на порозі
const aIds = new Set<string>()
for (const a of ACHIEVEMENTS) {
  if (aIds.has(a.id)) fail(`дублікат досягнення: ${a.id}`)
  aIds.add(a.id)
  if (!a.name.uk.trim() || !a.desc.ru.trim()) fail(`досягнення без перекладу: ${a.id}`)
}
const baseSnap: Snap = {
  xp: 0, ansC: 0, bestStreak: 0, learned: 0, streakDays: 0, totalDays: 0,
  chapters: 0, booksRead: 0,
  kinds: { quiz: 0, article: 0, plural: 0, verb: 0 },
  topics: { A1: { done: 0, total: 1 }, A2: { done: 0, total: 1 }, B1: { done: 0, total: 1 } },
}
const thresholds: [string, Partial<Snap>][] = [
  ['first', { ansC: 1 }], ['a50', { ansC: 50 }], ['a200', { ansC: 200 }], ['a500', { ansC: 500 }],
  ['st10', { bestStreak: 10 }], ['st25', { bestStreak: 25 }],
  ['w25', { learned: 25 }], ['w100', { learned: 100 }], ['w300', { learned: 300 }],
  ['art30', { kinds: { quiz: 0, article: 30, plural: 0, verb: 0 } }],
  ['read1', { chapters: 1 }], ['book1', { booksRead: 1 }], ['day7', { streakDays: 7 }],
  ['pathA1', { topics: { A1: { done: 1, total: 1 }, A2: { done: 0, total: 1 }, B1: { done: 0, total: 1 } } }],
]
for (const [id, patch] of thresholds) {
  const a = ACHIEVEMENTS.find((x) => x.id === id)
  if (!a) { fail(`немає досягнення ${id} для тесту порогу`); continue }
  const at = { ...baseSnap, ...patch } as Snap
  if (!a.cond(at)) fail(`умова ${id} не спрацювала на порозі`)
  if (a.cond(baseSnap)) fail(`умова ${id} спрацювала на порожньому стані`)
}
console.log(`Досягнень: ${ACHIEVEMENTS.length}, рангів: ${RANKS.length}, TOPIC_DONE=${Math.round(TOPIC_DONE * 100)}%`)

// 12e. XP-економіка: максимум з реальних джерел має покривати найвищий ранг
const chaptersTotal = BOOKS.reduce((n, b) => n + b.chapters.length, 0)
const maxReal = TOTAL_WORDS * XP.learnWord + chaptersTotal * XP.chapter + BOOKS.length * XP.bookDone
const topRank = RANKS[RANKS.length - 1].min
if (maxReal < topRank) fail(`максимальний ранг ${topRank} XP недосяжний без вправ (максимум із слів/книжок ${maxReal})`)
console.log(`XP: слів ${TOTAL_WORDS}×${XP.learnWord} + розділів ${chaptersTotal}×${XP.chapter} + книжок ${BOOKS.length}×${XP.bookDone} = ${maxReal} (топ-ранг ${topRank})`)

// 12f. buildSnap на порожньому стані не падає (поза браузером)
const emptySnap = buildSnap({
  xp: 0, ansC: 0, ansW: 0, bestStreak: 0, curStreak: 0, days: [],
  kinds: { quiz: 0, article: 0, plural: 0, verb: 0 }, chapters: [], learnedSeen: [], unlocked: {},
})
if (emptySnap.xp !== 0 || emptySnap.learned < 0) fail('buildSnap повертає сміття на порожньому стані')
void (['quiz', 'article', 'plural', 'verb'] as Kind[]) // перевірка типу Kind існує

// 13. Займенники: таблиці відмінків
console.log('\n=== Займенники ===')
const pronIds = new Set<string>()
for (const t of PRON_TABLES) {
  if (pronIds.has(t.id)) fail(`дублікат таблиці займенників: ${t.id}`)
  pronIds.add(t.id)
  if (t.head.length < 2) fail(`заголовок таблиці ${t.id} закороткий`)
  if (!t.rows.length) fail(`порожня таблиця: ${t.id}`)
  if (ukBad.test(t.title.uk) || ukBad.test(t.intro?.uk ?? '')) fail(`рос. літери в uk-тексті таблиці ${t.id}`)
  if (ruBad.test(t.title.ru) || ruBad.test(t.intro?.ru ?? '')) fail(`укр. літери в ru-тексті таблиці ${t.id}`)
  for (const [ri, r] of t.rows.entries()) {
    if (r.cells.length !== t.head.length - 1)
      fail(`рядок ${ri} таблиці ${t.id}: клітинок ${r.cells.length}, очікувано ${t.head.length - 1}`)
    if (!r.cells.some((c) => c !== null)) fail(`рядок ${ri} таблиці ${t.id} порожній`)
    if (ukBad.test(r.label.uk)) fail(`рос. літери в uk-мітці ${t.id} рядок ${ri}`)
    if (ruBad.test(r.label.ru)) fail(`укр. літери в ru-мітці ${t.id} рядок ${ri}`)
  }
}
console.log(`Таблиць: ${PRON_TABLES.length}, німецьких форм: ${PRON_TOTAL}`)

// 14. Прийменники: групи, приклади застосування, гігієна мов
console.log('\n=== Прийменники ===')
const groupIds = new Set<string>()
for (const g of PREP_GROUPS) {
  if (groupIds.has(g.id)) fail(`дублікат групи прийменників: ${g.id}`)
  groupIds.add(g.id)
  if (g.preps.length < 3) fail(`у групі ${g.id} менше ніж 3 прийменники`)
  if (ukBad.test(g.title.uk) || ukBad.test(g.rule.uk)) fail(`рос. літери в uk-тексті групи ${g.id}`)
  if (ruBad.test(g.title.ru) || ruBad.test(g.rule.ru)) fail(`укр. літери в ru-тексті групи ${g.id}`)
  const deSeen = new Set<string>()
  for (const p of g.preps) {
    if (deSeen.has(p.de)) fail(`дублікат прийменника в групі ${g.id}: ${p.de}`)
    deSeen.add(p.de)
    if (!p.ex.length) fail(`немає прикладів застосування: ${p.de}`)
    if (ukBad.test(p.meaning.uk)) fail(`рос. літери в uk-значенні «${p.de}»`)
    if (ruBad.test(p.meaning.ru)) fail(`укр. літери в ru-значенні «${p.de}»`)
    for (const [i, ex] of p.ex.entries()) {
      if (!ex.de.trim() || !ex.uk.trim() || !ex.ru.trim()) fail(`порожнє поле прикладу ${i} у «${p.de}»`)
      if (ukBad.test(ex.uk)) fail(`рос. літери в uk-прикладі «${ex.de}»: "${ex.uk}"`)
      if (ruBad.test(ex.ru)) fail(`укр. літери в ru-прикладі «${ex.de}»: "${ex.ru}"`)
    }
    if (p.note) {
      if (ukBad.test(p.note.uk)) fail(`рос. літери в uk-ноті «${p.de}»`)
      if (ruBad.test(p.note.ru)) fail(`укр. літери в ru-ноті «${p.de}»`)
    }
  }
}
console.log(`Груп: ${PREP_GROUPS.length}, прийменників і сполук: ${PREP_TOTAL}`)

console.log(errors === 0 ? '\nOK — усі перевірки пройдено ✔' : `\nПОМИЛОК: ${errors} ✘`)
if (errors > 0) process.exit(1)
