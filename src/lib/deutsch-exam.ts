// ============================================================
// РОЗДІЛ «ЕКЗАМЕН» — симулятор іспиту за зразком Goethe-
// Zertifikat: 25 питань у п'яти частинах (Wortschatz, Artikel
// & Plural, Grammatik, Hören, Lesen), таймер 20 хвилин.
// Питання генеруються з даних тренажера (75 тем · 1502 слова,
// займенники, прийменники, дієслова) + банк текстів для
// читання трьох рівнів. Мова інтерфейсу — Bi.
// ============================================================

import type { Bi } from '@/lib/i18n'
import { ALL_WORDS, NOUNS, displayDe, isPhraseTopic, type Topic, type Word } from './deutsch-data'
import { PRONOUNS, VERBS, type Verb } from './deutsch-grammar'

// ---------- типи ----------

export type ExamLevel = 'A1' | 'A2' | 'B1'

export type ReadingText = {
  id: string
  title: string
  de: string
  uk: string
  ru: string
}

export interface ExamQ {
  /** Частина екзамену 1..5 */
  part: 1 | 2 | 3 | 4 | 5
  /** Питання (німецьке слово/речення або переклад) */
  prompt: string
  /** Hören: німецький текст сховано — тільки озвучка */
  hidePrompt?: boolean
  options: string[]
  correct: number
  /** Показувати кнопку озвучки біля питання */
  speakPrompt?: boolean
  /** Напрямок вікторини (частина 1): німецька→переклад чи переклад→німецька */
  qDir?: 'de-tr' | 'tr-de'
  /** Німецька відповідь для розбору помилок */
  deAnswer?: string
  /** Пояснення після відповіді */
  explain?: { de?: string; uk: string; ru: string }
  /** Слово з словника — відповідь пишеться в прогрес */
  wordRef?: { topicId: string; word: Word }
  recKind?: 'quiz' | 'article' | 'plural'
  /** Текст для читання (частина 5) */
  reading?: ReadingText
}

export interface ExamPaper {
  level: ExamLevel
  questions: ExamQ[]
}

export const EXAM_SIZE = 25
export const EXAM_MINUTES = 20

/** Мета частин — для стартового екрана і чипів над питанням */
export const PART_META: Record<1 | 2 | 3 | 4 | 5, { icon: string; name: Bi; hint: Bi }> = {
  1: {
    icon: '📚',
    name: { uk: 'Wortschatz · лексика', ru: 'Wortschatz · лексика' },
    hint: { uk: 'Переклад урозтріч: слово ⇄ переклад', ru: 'Перевод вперемешку: слово ⇄ перевод' },
  },
  2: {
    icon: '🚦',
    name: { uk: 'Artikel & Plural · артикль і множина', ru: 'Artikel & Plural · артикль и множественное' },
    hint: { uk: 'der/die/das і форма множини', ru: 'der/die/das и форма множественного' },
  },
  3: {
    icon: '🧩',
    name: { uk: 'Grammatik · граматика', ru: 'Grammatik · грамматика' },
    hint: { uk: 'займенники, прийменники, форми дієслів', ru: 'местоимения, предлоги, формы глаголов' },
  },
  4: {
    icon: '🎧',
    name: { uk: 'Hören · аудіювання', ru: 'Hören · аудирование' },
    hint: { uk: 'прослухайте речення і знайдіть переклад', ru: 'прослушайте предложение и найдите перевод' },
  },
  5: {
    icon: '📖',
    name: { uk: 'Lesen · читання', ru: 'Lesen · чтение' },
    hint: { uk: 'короткий текст і 3 питання на розуміння', ru: 'короткий текст и 3 вопроса на понимание' },
  },
}

// ---------- дрібні утиліти ----------

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * 4 унікальні варіанти: правильний + дистрактори.
 * null — унікальних варіантів не хватило (питання пропускаємо).
 */
function buildOptions(correct: string, distractors: string[], n = 4): { opts: string[]; correct: number } | null {
  const seen = new Set([correct])
  const rest: string[] = []
  for (const d of shuffle(distractors)) {
    if (rest.length >= n - 1) break
    if (!seen.has(d)) {
      seen.add(d)
      rest.push(d)
    }
  }
  if (rest.length < n - 1) return null
  const opts = shuffle([correct, ...rest])
  return { opts, correct: opts.indexOf(correct) }
}

// ---------- Частина 1 · Wortschatz ----------

type AW = { topic: Topic; word: Word }

function vocabQ(a: AW, pool: AW[], tr: (w: Word) => string): ExamQ | null {
  const dirDeTr = Math.random() < 0.5
  // дистрактори: спершу та сама тема, потім той самий рівень, потім усе
  const sameTopic: AW[] = a.topic.words
    .filter((w) => w.de !== a.word.de)
    .map((word) => ({ topic: a.topic, word }))
  const others = pool.filter((x) => x.topic.id !== a.topic.id && x.word.de !== a.word.de)
  const all = ALL_WORDS.filter((x) => x.word.de !== a.word.de)
  const cands = [...sameTopic, ...others, ...all]
  const candOpts = dirDeTr ? cands.map((x) => tr(x.word)) : cands.map((x) => displayDe(x.word))
  const correctOpt = dirDeTr ? tr(a.word) : displayDe(a.word)
  const built = buildOptions(correctOpt, candOpts)
  if (!built) return null
  return {
    part: 1,
    prompt: dirDeTr ? displayDe(a.word) : tr(a.word),
    options: built.opts,
    correct: built.correct,
    speakPrompt: dirDeTr,
    qDir: dirDeTr ? 'de-tr' : 'tr-de',
    deAnswer: displayDe(a.word),
    wordRef: { topicId: a.topic.id, word: a.word },
    recKind: 'quiz',
  }
}

// ---------- Частина 2 · Artikel & Plural ----------

function articleQ(a: AW): ExamQ {
  const arts = ['der', 'die', 'das']
  return {
    part: 2,
    prompt: a.word.de,
    options: arts,
    correct: arts.indexOf(a.word.art as 'der' | 'die' | 'das'),
    speakPrompt: false,
    deAnswer: `${a.word.art} ${a.word.de}`,
    wordRef: { topicId: a.topic.id, word: a.word },
    recKind: 'article',
  }
}

function pluralQ(a: AW, all: AW[]): ExamQ | null {
  const correct = a.word.pl as string
  const distractors = all
    .filter((x) => x.word.pl && x.word.pl !== correct && x.word.pl !== '-')
    .map((x) => x.word.pl as string)
  const built = buildOptions(correct, distractors)
  if (!built) return null
  return {
    part: 2,
    prompt: displayDe(a.word),
    options: built.opts.map((o) => `die ${o}`),
    correct: built.opts.indexOf(correct),
    speakPrompt: true,
    deAnswer: `${a.word.art ?? 'die'} ${a.word.de} → die ${correct}`,
    wordRef: { topicId: a.topic.id, word: a.word },
    recKind: 'plural',
  }
}

// ---------- Частина 3 · Grammatik ----------

type GramItem = { cat: 'pron' | 'prep'; prompt: Bi; options: string[]; correct: number }

/** Банк граматики: займенники (відмінки) + прийменники */
const GRAM_BANK: Record<ExamLevel, GramItem[]> = {
  A1: [
    { cat: 'pron', prompt: { uk: 'Kennst du ___? («я» у Akkusativ)', ru: 'Kennst du ___? («я» в Akkusativ)' }, options: ['mich', 'ich', 'mir', 'meiner'], correct: 0 },
    { cat: 'pron', prompt: { uk: 'Ich helfe ___ gern. («ти» у Dativ)', ru: 'Ich helfe ___ gern. («ты» в Dativ)' }, options: ['dir', 'dich', 'du', 'deiner'], correct: 0 },
    { cat: 'pron', prompt: { uk: 'Ich sehe ___ jeden Tag. («він» у Akkusativ)', ru: 'Ich sehe ___ jeden Tag. («он» в Akkusativ)' }, options: ['ihn', 'ihm', 'er', 'seiner'], correct: 0 },
    { cat: 'pron', prompt: { uk: 'Gib ___ bitte das Buch! («я» у Dativ)', ru: 'Gib ___ bitte das Buch! («я» в Dativ)' }, options: ['mir', 'mich', 'ich', 'meiner'], correct: 0 },
    { cat: 'prep', prompt: { uk: 'Ich komme ___ Kiew. (звідки — з міста)', ru: 'Ich komme ___ Kiew. (откуда — из города)' }, options: ['aus', 'von', 'nach', 'zu'], correct: 0 },
    { cat: 'prep', prompt: { uk: 'Ich wohne ___ Berlin. (де — у місті)', ru: 'Ich wohne ___ Berlin. (где — в городе)' }, options: ['in', 'an', 'auf', 'nach'], correct: 0 },
    { cat: 'prep', prompt: { uk: 'Der Unterricht beginnt ___ neun Uhr. (час — о)', ru: 'Der Unterricht beginnt ___ neun Uhr. (время — в)' }, options: ['um', 'im', 'an', 'seit'], correct: 0 },
    { cat: 'prep', prompt: { uk: 'Das Geschenk ist ___ dich. (для)', ru: 'Das Geschenk ist ___ dich. (для)' }, options: ['für', 'ohne', 'mit', 'gegen'], correct: 0 },
    { cat: 'prep', prompt: { uk: 'Wir fahren ___ Wochenende ans Meer.', ru: 'Wir fahren ___ Wochenende ans Meer.' }, options: ['am', 'im', 'an', 'auf'], correct: 0 },
  ],
  A2: [
    { cat: 'pron', prompt: { uk: 'Das Geschenk ist für ___ («ми» у Akkusativ)', ru: 'Das Geschenk ist für ___ («мы» в Akkusativ)' }, options: ['uns', 'unser', 'unsere', 'unseren'], correct: 0 },
    { cat: 'pron', prompt: { uk: 'Er hat ___ gestern geholfen. («я» у Dativ)', ru: 'Er hat ___ gestern geholfen. («я» в Dativ)' }, options: ['mir', 'mich', 'ich', 'meiner'], correct: 0 },
    { cat: 'pron', prompt: { uk: 'Wir warten auf ___ («ви» до групи, у Akkusativ)', ru: 'Wir warten auf ___ («вы» к группе, в Akkusativ)' }, options: ['euch', 'euer', 'eure', 'ihr'], correct: 0 },
    { cat: 'pron', prompt: { uk: 'Ich danke ___ für die Hilfe. («вони» у Dativ)', ru: 'Ich danke ___ für die Hilfe. («они» в Dativ)' }, options: ['ihnen', 'ihre', 'ihr', 'sie'], correct: 0 },
    { cat: 'prep', prompt: { uk: 'Ich gehe ___ die Schule. (рух усередину — Akkusativ)', ru: 'Ich gehe ___ die Schule. (движение внутрь — Akkusativ)' }, options: ['in', 'an', 'auf', 'nach'], correct: 0 },
    { cat: 'prep', prompt: { uk: 'Das Buch liegt ___ dem Tisch. (місце — на чому)', ru: 'Das Buch liegt ___ dem Tisch. (место — на чём)' }, options: ['auf', 'an', 'in', 'hinter'], correct: 0 },
    { cat: 'prep', prompt: { uk: 'Ich hänge das Bild ___ die Wand. (на вертикальну поверхню)', ru: 'Ich hänge das Bild ___ die Wand. (на вертикальную поверхность)' }, options: ['an', 'in', 'auf', 'unter'], correct: 0 },
    { cat: 'prep', prompt: { uk: 'Ich warte ___ den Bus. (чекати на)', ru: 'Ich warte ___ den Bus. (ждать)' }, options: ['auf', 'an', 'über', 'für'], correct: 0 },
    { cat: 'prep', prompt: { uk: 'Sie interessiert sich ___ Musik. (цікавитися)', ru: 'Sie interessiert sich ___ Musik. (интересоваться)' }, options: ['für', 'an', 'über', 'mit'], correct: 0 },
  ],
  B1: [
    { cat: 'pron', prompt: { uk: 'Der Chef erklärt ___ die neue Regel. («вони» у Dativ)', ru: 'Der Chef erklärt ___ die neue Regel. («они» в Dativ)' }, options: ['ihnen', 'ihre', 'ihr', 'sie'], correct: 0 },
    { cat: 'pron', prompt: { uk: 'Ich erinnere mich an ___ («ми» у Akkusativ)', ru: 'Ich erinnere mich an ___ («мы» в Akkusativ)' }, options: ['uns', 'unser', 'unsere', 'unseren'], correct: 0 },
    { cat: 'pron', prompt: { uk: '___ hat gestern angerufen? (питальний: хто?)', ru: '___ hat gestern angerufen? (вопросительное: кто?)' }, options: ['Wer', 'Wen', 'Wem', 'Wessen'], correct: 0 },
    { cat: 'pron', prompt: { uk: 'Das ist ___ Schwester. (жінка, Nominativ)', ru: 'Das ist ___ Schwester. (женщина, Nominativ)' }, options: ['meine', 'mein', 'meinen', 'meiner'], correct: 0 },
    { cat: 'prep', prompt: { uk: '___ des Regens gehen wir spazieren. (незважаючи на)', ru: '___ des Regens gehen wir spazieren. (несмотря на)' }, options: ['trotz', 'während', 'wegen', 'statt'], correct: 0 },
    { cat: 'prep', prompt: { uk: '___ der Prüfung darf man nicht sprechen. (протягом)', ru: '___ der Prüfung darf man nicht sprechen. (в течение)' }, options: ['Während', 'Trotz', 'Nach', 'Ohne'], correct: 0 },
    { cat: 'prep', prompt: { uk: 'Er hat ___ der Krankheit nicht gearbeitet. (причина — через хворобу)', ru: 'Er hat ___ der Krankheit nicht gearbeitet. (причина — из-за болезни)' }, options: ['wegen', 'während', 'trotz', 'ohne'], correct: 0 },
    { cat: 'prep', prompt: { uk: 'Ich danke dir ___ deine Hilfe.', ru: 'Ich danke dir ___ deine Hilfe.' }, options: ['für', 'über', 'an', 'mit'], correct: 0 },
    { cat: 'prep', prompt: { uk: 'Sie ärgert sich ___ den Lärm. (сердитися на)', ru: 'Sie ärgert sich ___ den Lärm. (злиться на)' }, options: ['über', 'auf', 'für', 'an'], correct: 0 },
  ],
}

/** Питання на форми дієслів (Präsens, для B1 — і Präteritum) */
function verbQ(level: ExamLevel, praeteritum: boolean): ExamQ | null {
  if (praeteritum) {
    const pool = VERBS.filter((v) => v.pret3)
    const v = shuffle(pool)[0]
    if (!v) return null
    const correct = v.pret3 as string
    const distractors = pool
      .filter((x) => x.inf !== v.inf && x.pret3)
      .map((x) => x.pret3 as string)
    const built = buildOptions(correct, distractors)
    if (!built) return null
    return {
      part: 3,
      prompt: `er/sie/es ___ (${v.inf}, Präteritum)`,
      options: built.opts,
      correct: built.correct,
      deAnswer: `${v.inf} → ${correct}`,
    }
  }
  const combos: { v: Verb; pi: number }[] = []
  for (const v of VERBS) for (let pi = 0; pi < PRONOUNS.length; pi++) combos.push({ v, pi })
  const { v, pi } = shuffle(combos)[0]
  const correct = v.forms[pi]
  const others = v.forms.filter((_, i) => i !== pi)
  const fill = VERBS.filter((x) => x.inf !== v.inf).flatMap((x) => x.forms)
  const built = buildOptions(correct, [...others, ...fill])
  if (!built) return null
  return {
    part: 3,
    prompt: `${PRONOUNS[pi]} ___ (${v.inf}, Präsens)`,
    options: built.opts,
    correct: built.correct,
    deAnswer: `${v.inf}: ${PRONOUNS[pi]} → ${correct}`,
  }
}

function grammarQs(level: ExamLevel, t: (b: Bi) => string): ExamQ[] {
  const bank = shuffle(GRAM_BANK[level])
  const pron = bank.filter((g) => g.cat === 'pron').slice(0, 2)
  const prep = bank.filter((g) => g.cat === 'prep').slice(0, 2)
  const fromBank = [...pron, ...prep].map((g) => ({
    part: 3 as const,
    prompt: t(g.prompt),
    options: g.options,
    correct: g.correct,
    deAnswer: g.options[g.correct],
  }))
  const v2 = level === 'B1' ? [verbQ(level, false), verbQ(level, true)] : [verbQ(level, false), verbQ(level, false)]
  return shuffle([...fromBank, ...v2.filter((x): x is ExamQ => x !== null)])
}

// ---------- Частина 4 · Hören ----------

function hearQ(a: AW, pool: AW[], t: (b: Bi) => string): ExamQ | null {
  const ex = a.word.ex
  if (!ex) return null
  // варіанти — ПОВНІ переклади речень з прикладів інших слів
  const others = pool.filter((x) => x.word.ex && x.word.de !== a.word.de)
  const all = ALL_WORDS.filter((x) => x.word.ex && x.word.de !== a.word.de)
  const built = buildOptions(t(ex), [...others, ...all].map((x) => t(x.word.ex as Bi)))
  if (!built) return null
  return {
    part: 4,
    prompt: ex.de,
    hidePrompt: true,
    options: built.opts,
    correct: built.correct,
    deAnswer: ex.de,
    wordRef: { topicId: a.topic.id, word: a.word },
    recKind: 'quiz',
    explain: { de: ex.de, uk: ex.uk, ru: ex.ru },
  }
}

// ---------- Частина 5 · Lesen ----------

type RQ = { q: Bi; opts: string[]; correct: number }

const READINGS: Record<ExamLevel, ReadingText[]> = {
  A1: [
    {
      id: 'a1-maria',
      title: 'Marias Tag',
      de: 'Maria wohnt in Köln. Sie ist 24 Jahre alt und arbeitet in einem Büro. Jeden Morgen steht sie um sieben Uhr auf. Sie duscht und frühstückt. Um acht Uhr fährt sie mit dem Bus zur Arbeit. In der Mittagspause isst sie in der Kantine. Am Abend lernt sie Deutsch, denn sie möchte in Deutschland studieren. Um elf Uhr geht sie ins Bett.',
      uk: 'Марія живе в Кельні. Їй 24 роки, і вона працює в офісі. Щоранку вона встає о сьомій годині. Вона приймає душ і снідає. О восьмій годині їде автобусом на роботу. В обідню перерву їсть у їдальні. Увечері вчить німецьку, бо хоче студіювати в Німеччині. Об одинадцятій лягає спати.',
      ru: 'Мария живёт в Кёльне. Ей 24 года, и она работает в офисе. Каждое утро она встаёт в семь часов. Она принимает душ и завтракает. В восемь часов едет на автобусе на работу. В обеденный перерыв ест в столовой. Вечером учит немецкий, потому что хочет учиться в Германии. В одиннадцать ложится спать.',
    },
    {
      id: 'a1-tom',
      title: 'Toms Wochenende',
      de: 'Tom ist Student und studiert Musik in Leipzig. Am Samstag steht er spät auf, um elf Uhr. Dann trifft er seinen Freund Paul im Café. Sie trinken Kaffee und essen Kuchen. Danach gehen sie in den Park und spielen Fußball. Am Abend kocht Tom Spaghetti und hört Musik. Am Sonntag ruft er seine Eltern an und fährt nach Hause, denn seine Eltern wohnen in Dresden.',
      uk: 'Том — студент, вивчає музику в Лейпцигу. У суботу він встає пізно, об одинадцятій. Потім зустрічає свого друга Пауля в кафе. Вони пʼють каву і їдять торт. Після цього ідуть у парк грати у футбол. Увечері Том готує спагетті й слухає музику. У неділю він телефонує батькам і їде додому, бо його батьки живуть у Дрездені.',
      ru: 'Том — студент, изучает музыку в Лейпциге. В субботу он встаёт поздно, в одиннадцать. Потом встречает своего друга Пауля в кафе. Они пьют кофе и едят торт. После этого идут в парк играть в футбол. Вечером Том готовит спагетти и слушает музыку. В воскресенье он звонит родителям и едет домой, потому что его родители живут в Дрездене.',
    },
  ],
  A2: [
    {
      id: 'a2-wohnung',
      title: 'Die neue Wohnung',
      de: 'Anna und Max suchen eine neue Wohnung, denn ihre alte ist zu klein. Im Internet finden sie ein Angebot: drei Zimmer, Küche, Bad, Balkon, 62 Quadratmeter, 850 Euro kalt plus Nebenkosten. Am Montag besichtigen sie die Wohnung in der Goethestraße 12. Die Wohnung ist hell und ruhig, die Nachbarn sind freundlich. Anna gefällt besonders der Balkon, Max gefällt die große Küche. Sie unterschreiben den Mietvertrag und ziehen am ersten August um.',
      uk: 'Анна і Макс шукають нову квартиру, бо стара їм замала. В інтернеті вони знаходять пропозицію: три кімнати, кухня, ванна, балкон, 62 м², 850 євро без комунальних плюс комунальні платежі. У понеділок вони оглядають квартиру на Goethestraße 12. Квартира світла й тиха, сусіди привітні. Анні особливо подобається балкон, Максу — велика кухня. Вони підписують договір оренди й переїжджають першого серпня.',
      ru: 'Анна и Макс ищут новую квартиру, потому что старая им слишком мала. В интернете они находят предложение: три комнаты, кухня, ванная, балкон, 62 м², 850 евро без коммунальных плюс коммунальные платежи. В понедельник они осматривают квартиру на Goethestraße 12. Квартира светлая и тихая, соседи приветливые. Анне особенно нравится балкон, Максу — большая кухня. Они подписывают договор аренды и переезжают первого августа.',
    },
    {
      id: 'a2-arzt',
      title: 'Beim Arzt',
      de: 'Herr Braun ist seit einer Woche erkältet: er hat Husten und starke Kopfschmerzen. Am Donnerstag geht er zu Dr. Weber. Der Arzt untersucht ihn und sagt: «Sie haben eine Grippe. Sie bleiben drei Tage im Bett und trinken viel Tee. Ich schreibe Ihnen ein Rezept für Tabletten. Nehmen Sie zweimal täglich eine Tablette nach dem Essen.» Herr Braun bedankt sich und geht gleich zur Apotheke.',
      uk: 'Пан Браун уже тиждень простуджений: у нього кашель і сильний головний біль. У четвер він іде до доктора Вебера. Лікар оглядає його і каже: «У вас грип. Ви три дні лежите в ліжку і пʼєте багато чаю. Я виписую вам рецепт на таблетки. Приймайте двічі на день по одній таблетці після їжі». Пан Браун дякує й одразу йде в аптеку.',
      ru: 'Господин Браун уже неделю простужен: у него кашель и сильная головная боль. В четверг он идёт к доктору Веберу. Врач осматривает его и говорит: «У вас грипп. Вы три дня лежите в постели и пьёте много чая. Я выписываю вам рецепт на таблетки. Принимайте дважды в день по одной таблетке после еды». Господин Браун благодарит и сразу идёт в аптеку.',
    },
  ],
  B1: [
    {
      id: 'b1-lisa',
      title: 'Lisa findet eine neue Stelle',
      de: 'Lisa hat vor drei Monaten ihre Stelle als Verkäuferin verloren. Zuerst war sie enttäuscht, aber dann beschloss sie, etwas Neues zu beginnen. In den ersten Wochen schrieb sie zwölf Bewerbungen an verschiedene Firmen. Nur zwei Firmen luden sie zum Vorstellungsgespräch ein. Bei der Firma Schneider lief das Gespräch gut: der Personalchef war freundlich und die Fragen waren nicht schwer. Zwei Wochen später bekam Lisa eine E-Mail mit einer Zusage — sie wurde Buchhalterin. Sie war so glücklich, dass sie den ganzen Abend mit ihren Freunden gefeiert hat.',
      uk: 'Три місяці тому Ліза втратила роботу продавчині. Спочатку вона була розчарована, але потім вирішила почати щось нове. У перші тижні вона написала дванадцять заявок до різних фірм. Лише дві фірми запросили її на співбесіду. У фірмі «Шнайдер» розмова пройшла добре: керівник персоналу був привітним, а питання — нескладними. Через два тижні Ліза отримала електронного листа з позитивною відповіддю — вона стала бухгалтеркою. Вона була такою щасливою, що цілий вечір святкувала з друзями.',
      ru: 'Три месяца назад Лиза потеряла работу продавщицы. Сначала она была разочарована, но потом решила начать что-то новое. В первые недели она написала двенадцать заявлений в разные фирмы. Только две фирмы пригласили её на собеседование. В фирме «Шнайдер» разговор прошёл хорошо: начальник отдела кадров был приветливым, а вопросы — несложными. Через две недели Лиза получила электронное письмо с положительным ответом — она стала бухгалтером. Она была так счастлива, что весь вечер праздновала с друзьями.',
    },
    {
      id: 'b1-fahrrad',
      title: 'Peter ohne Auto',
      de: 'Immer mehr Menschen fahren mit dem Fahrrad zur Arbeit. Auch Peter, 34, Ingenieur aus Stuttgart, ist seit einem Jahr ohne Auto unterwegs. «Früher stand ich jeden Tag fast zwei Stunden im Stau. Heute brauche ich zwar dreißig Minuten länger, aber ich bin fitter und spare rund 300 Euro im Monat», sagt er. Seine Firma unterstützt ihre Mitarbeiter: es gibt überdachte Fahrradstellplätze und sogar Duschen. Einzig im Winter, wenn es schneit, nimmt Peter manchmal die S-Bahn.',
      uk: 'Дедалі більше людей їздить на роботу на велосипеді. Петер, 34 роки, інженер зі Штутгарта, вже рік пересувається без автомобіля. «Раніше я щодня стояв у заторах майже дві години. Сьогодні, щоправда, мені треба на тридцять хвилин більше, але я бадьоріший і економлю близько 300 євро на місяць», — каже він. Його фірма підтримує працівників: є криті майданчики для велосипедів і навіть душ. Тільки взимку, коли падає сніг, Петер часом їде міською електричкою.',
      ru: 'Всё больше людей ездит на работу на велосипеде. Петер, 34 года, инженер из Штутгарта, уже год передвигается без автомобиля. «Раньше я каждый день стоял в пробках почти два часа. Сегодня, правда, мне нужно на тридцать минут больше, но я бодрее и экономлю около 300 евро в месяц», — говорит он. Его фирма поддерживает сотрудников: есть крытые площадки для велосипедов и даже душ. Только зимой, когда идёт снег, Петер иногда едет на городской электричке.',
    },
  ],
}

const READING_QS: Record<string, RQ[]> = {
  'a1-maria': [
    { q: { uk: 'Де живе Марія?', ru: 'Где живёт Мария?' }, opts: ['In Köln.', 'In Berlin.', 'In Wien.', 'In Hamburg.'], correct: 0 },
    { q: { uk: 'Коли Марія встає вранці?', ru: 'Когда Мария встаёт утром?' }, opts: ['Um sieben Uhr.', 'Um acht Uhr.', 'Um sechs Uhr.', 'Um neun Uhr.'], correct: 0 },
    { q: { uk: 'Що Марія робить увечері?', ru: 'Что Мария делает вечером?' }, opts: ['Sie lernt Deutsch.', 'Sie sieht fern.', 'Sie geht ins Café.', 'Sie arbeitet im Büro.'], correct: 0 },
  ],
  'a1-tom': [
    { q: { uk: 'Що студіює Том?', ru: 'Что изучает Том?' }, opts: ['Musik', 'Medizin', 'Deutsch', 'Sport'], correct: 0 },
    { q: { uk: 'Кого Том зустрічає в кафе?', ru: 'Кого Том встречает в кафе?' }, opts: ['seinen Freund Paul', 'seine Schwester', 'seine Eltern', 'seinen Lehrer'], correct: 0 },
    { q: { uk: 'Куди Том їде в неділю?', ru: 'Куда Том едет в воскресенье?' }, opts: ['nach Dresden', 'nach Leipzig', 'nach Berlin', 'nach Köln'], correct: 0 },
  ],
  'a2-wohnung': [
    { q: { uk: 'Чому Анна і Макс шукають нову квартиру?', ru: 'Почему Анна и Макс ищут новую квартиру?' }, opts: ['Die alte Wohnung ist zu klein.', 'Die alte Wohnung ist zu teuer.', 'Die Nachbarn sind laut.', 'Sie brauchen mehr Licht.'], correct: 0 },
    { q: { uk: 'Що особливо подобається Максу?', ru: 'Что особенно нравится Максу?' }, opts: ['die große Küche', 'der Balkon', 'die ruhigen Nachbarn', 'das helle Bad'], correct: 0 },
    { q: { uk: 'Коли вони переїжджають?', ru: 'Когда они переезжают?' }, opts: ['am ersten August', 'am ersten Mai', 'am Montag', 'am Ende des Jahres'], correct: 0 },
  ],
  'a2-arzt': [
    { q: { uk: 'Чому пан Браун іде до лікаря?', ru: 'Почему господин Браун идёт к врачу?' }, opts: ['Er hat Husten und Kopfschmerzen.', 'Er braucht ein Rezept für die Reise.', 'Er möchte einen Krankenschein.', 'Er hat eine Tablette vergessen.'], correct: 0 },
    { q: { uk: 'Що має робити пан Браун?', ru: 'Что должен делать господин Браун?' }, opts: ['drei Tage im Bett bleiben und viel Tee trinken', 'zwei Wochen arbeiten und Sport machen', 'sechsmal täglich eine Tablette nehmen', 'sofort wieder zur Arbeit gehen'], correct: 0 },
    { q: { uk: 'Куди пан Браун іде після візиту до лікаря?', ru: 'Куда господин Браун идёт после визита к врачу?' }, opts: ['zur Apotheke', 'zur Arbeit', 'zu seinen Eltern', 'ins Café'], correct: 0 },
  ],
  'b1-lisa': [
    { q: { uk: 'Скільки заявок написала Ліза?', ru: 'Сколько заявлений написала Лиза?' }, opts: ['zwölf', 'zwei', 'zwanzig', 'sechs'], correct: 0 },
    { q: { uk: 'Якою була співбесіда у фірмі «Шнайдер»?', ru: 'Каким было собеседование в фирме «Шнайдер»?' }, opts: ['freundlich und nicht schwer', 'zu lang und anstrengend', 'kurz, aber sehr schwer', 'unfreundlich und nervös'], correct: 0 },
    { q: { uk: 'Що Ліза отримала через два тижні?', ru: 'Что Лиза получила через две недели?' }, opts: ['eine E-Mail mit einer Zusage', 'eine Absage per Telefon', 'eine neue Stelle als Verkäuferin', 'ein zweites Vorstellungsgespräch'], correct: 0 },
  ],
  'b1-fahrrad': [
    { q: { uk: 'Якою раніше була найбільша проблема Петера з автомобілем?', ru: 'Какой раньше была самая большая проблема Петера с автомобилем?' }, opts: ['Er stand jeden Tag im Stau.', 'Das Auto war zu teuer.', 'Er fand keinen Parkplatz.', 'Das Auto war oft kaputt.'], correct: 0 },
    { q: { uk: 'Як фірма підтримує працівників?', ru: 'Как фирма поддерживает сотрудников?' }, opts: ['Fahrradstellplätze und Duschen', 'eine Monatskarte für die S-Bahn', 'mehr Geld für das Auto', 'ein Gratis-Frühstück'], correct: 0 },
    { q: { uk: 'Що Петер узимку робить інакше?', ru: 'Что Петер зимой делает иначе?' }, opts: ['Er nimmt die S-Bahn.', 'Er bleibt zu Hause.', 'Er fährt mit dem Auto.', 'Er läuft zu Fuß.'], correct: 0 },
  ],
}

// ---------- збірка варіанта ----------

/**
 * Зібрати повний варіант екзамену: 25 питань у 5 частинах.
 * tr — перекладач слів (useTr), t — перекладач двомовних полів (useBi).
 */
export function buildExam(level: ExamLevel, tr: (w: Word) => string, t: (b: Bi) => string): ExamPaper {
  const pool = ALL_WORDS.filter((a) => a.topic.level === level && !isPhraseTopic(a.topic))
  const wide = ALL_WORDS.filter((a) => !isPhraseTopic(a.topic))
  const questions: ExamQ[] = []

  // Частина 1 · Wortschatz — 8
  for (const a of shuffle(pool.length >= 10 ? pool : wide)) {
    if (questions.length >= 8) break
    if (questions.some((q) => q.wordRef?.word.de === a.word.de)) continue
    const q = vocabQ(a, pool.length >= 10 ? pool : wide, tr)
    if (q) questions.push(q)
  }

  // Частина 2 · Artikel & Plural — 5 (3 артиклі + 2 множини)
  const nounsLvl = NOUNS.filter((a) => a.topic.level === level)
  const nouns = nounsLvl.length >= 6 ? nounsLvl : NOUNS
  for (const a of shuffle(nouns)) {
    if (questions.length - 8 >= 3) break
    if (questions.some((q) => q.wordRef?.word.de === a.word.de)) continue
    questions.push(articleQ(a))
  }
  const plPool = nouns.filter((a) => a.word.pl && a.word.pl !== '-')
  const plAll = NOUNS.filter((a) => a.word.pl && a.word.pl !== '-')
  for (const a of shuffle(plPool.length >= 4 ? plPool : plAll)) {
    if (questions.length - 11 >= 2) break
    if (questions.some((q) => q.wordRef?.word.de === a.word.de)) continue
    const q = pluralQ(a, plAll)
    if (q) questions.push(q)
  }

  // Частина 3 · Grammatik — 6
  questions.push(...grammarQs(level, t))

  // Частина 4 · Hören — 3 (речення з прикладами)
  const hearPool = pool.filter((a) => a.word.ex)
  const hearWide = wide.filter((a) => a.word.ex)
  for (const a of shuffle(hearPool.length >= 6 ? hearPool : hearWide)) {
    if (questions.length - 19 >= 3) break
    if (questions.some((q) => q.wordRef?.word.de === a.word.de)) continue
    const q = hearQ(a, hearPool.length >= 6 ? hearPool : hearWide, t)
    if (q) questions.push(q)
  }

  // Частина 5 · Lesen — 1 текст + 3 питання
  const text = shuffle(READINGS[level])[0]
  for (const rq of READING_QS[text.id]) {
    questions.push({
      part: 5,
      prompt: t(rq.q),
      options: rq.opts,
      correct: rq.correct,
      deAnswer: rq.opts[rq.correct],
      reading: text,
    })
  }

  return { level, questions }
}

/** Німецька «сирість» слова для озвучки варіантів відповіді */
export function optionSpeak(o: string): string {
  return o.replace(/^die\s+/, '')
}
