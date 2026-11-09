// ============================================================
// РОЗДІЛ «ЗАЙМЕННИКИ» — таблиці відмінювання в чотирьох
// відмінках: Nominativ (хто?), Akkusativ (кого?), Dativ (кому?),
// Genitiv (чий?). Дані — таблиці; кожна німецька форма на сайті
// озвучується тапом. Мова інтерфейсу — uk/ru (Bi).
// ============================================================

import type { Bi } from '@/lib/i18n'

export interface PronRow {
  /** Підпис рядка (укр/рос): «я», «чол. рід (der Mann)» */
  label: Bi
  /** Німецькі форми по відмінках; null — форми немає / не вживається */
  cells: (string | null)[]
}

export interface PronTable {
  id: string
  icon: string
  title: Bi
  intro?: Bi
  /** Заголовки: перший стовпець — підписи рядків, далі — відмінки */
  head: string[]
  rows: PronRow[]
  notes?: Bi[]
}

export const PRON_TABLES: PronTable[] = [
  {
    id: 'personal',
    icon: '🧑',
    title: { uk: 'Особові займенники', ru: 'Личные местоимения' },
    intro: {
      uk: 'Найуживаніші займенники: я, ти, він… Відмінюються як іменники — запамʼятай три стовпці: хто? кого? кому? Genitiv трапляється рідко.',
      ru: 'Самые употребительные местоимения: я, ты, он… Склоняются как существительные — запомни три столбца: кто? кого? кому? Genitiv встречается редко.',
    },
    head: ['Особа', 'Nominativ · хто?', 'Akkusativ · кого?', 'Dativ · кому?', 'Genitiv · чий?'],
    rows: [
      { label: { uk: 'я', ru: 'я' }, cells: ['ich', 'mich', 'mir', 'meiner'] },
      { label: { uk: 'ти', ru: 'ты' }, cells: ['du', 'dich', 'dir', 'deiner'] },
      { label: { uk: 'він', ru: 'он' }, cells: ['er', 'ihn', 'ihm', 'seiner'] },
      { label: { uk: 'вона', ru: 'она' }, cells: ['sie', 'sie', 'ihr', 'ihrer'] },
      { label: { uk: 'воно', ru: 'оно' }, cells: ['es', 'es', 'ihm', 'seiner'] },
      { label: { uk: 'ми', ru: 'мы' }, cells: ['wir', 'uns', 'uns', 'unser'] },
      { label: { uk: 'ви (до групи)', ru: 'вы (к группе)' }, cells: ['ihr', 'euch', 'euch', 'euer'] },
      { label: { uk: 'вони', ru: 'они' }, cells: ['sie', 'sie', 'ihnen', 'ihrer'] },
      { label: { uk: 'Ви (ввічливо)', ru: 'Вы (вежливо)' }, cells: ['Sie', 'Sie', 'Ihnen', 'Ihrer'] },
    ],
    notes: [
      {
        uk: 'Порада: «sie» може означати «вона», «вони» і ввічливе «Ви» — відрізняти допомагає велика буква й форма дієслова.',
        ru: 'Подсказка: «sie» может значить «она», «они» и вежливое «Вы» — различают по заглавной букве и форме глагола.',
      },
      {
        uk: 'Приклади: Ich sehe ihn. · Gib mir das Buch! · Das ist für dich.',
        ru: 'Примеры: Ich sehe ihn. · Gib mir das Buch! · Das ist für dich.',
      },
    ],
  },
  {
    id: 'possessive-map',
    icon: '🤝',
    title: { uk: 'Присвійні: хто → чий', ru: 'Притяжательные: кто → чей' },
    intro: {
      uk: 'Кожній особі відповідає своє присвійне слово. Далі воно відмінюється як звичайний прикметник — див. наступну таблицю.',
      ru: 'Каждому лицу соответствует своё притяжательное слово. Дальше оно склоняется как обычное прилагательное — см. следующую таблицу.',
    },
    head: ['Особа', 'Присвійний займенник'],
    rows: [
      { label: { uk: 'я', ru: 'я' }, cells: ['mein — мій / мой'] },
      { label: { uk: 'ти', ru: 'ты' }, cells: ['dein — твій / твой'] },
      { label: { uk: 'він / воно', ru: 'он / оно' }, cells: ['sein — його / его'] },
      { label: { uk: 'вона', ru: 'она' }, cells: ['ihr — її / её'] },
      { label: { uk: 'ми', ru: 'мы' }, cells: ['unser — наш / наш'] },
      { label: { uk: 'ви (до групи)', ru: 'вы (к группе)' }, cells: ['euer — ваш / ваш'] },
      { label: { uk: 'вони / Ви', ru: 'они / Вы' }, cells: ['ihr / Ihr — їхній / их, Ваш'] },
    ],
    notes: [
      {
        uk: 'Пастка: у euer перед закінченням випадає «e» → eure, euren, eurem.',
        ru: 'Ловушка: у euer перед окончанием выпадает «e» → eure, euren, eurem.',
      },
    ],
  },
  {
    id: 'possessive',
    icon: '🧩',
    title: { uk: 'Присвійні: відмінювання (на прикладі mein-)', ru: 'Притяжательные: склонение (на примере mein-)' },
    intro: {
      uk: 'Усі присвійні (dein-, sein-, ihr-, unser-, euer-) відмінюються однаково — як mein-. Памʼятай рід іменника, а не власника: das Mädchen → seine Adresse.',
      ru: 'Все притяжательные (dein-, sein-, ihr-, unser-, euer-) склоняются одинаково — как mein-. Помни род существительного, а не владельца: das Mädchen → seine Adresse.',
    },
    head: ['Рід', 'Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'],
    rows: [
      { label: { uk: 'чол. рід (Mann)', ru: 'муж. род (Mann)' }, cells: ['mein', 'meinen', 'meinem', 'meines'] },
      { label: { uk: 'жін. рід (Frau)', ru: 'жен. род (Frau)' }, cells: ['meine', 'meine', 'meiner', 'meiner'] },
      { label: { uk: 'сер. рід (Kind)', ru: 'сред. род (Kind)' }, cells: ['mein', 'mein', 'meinem', 'meines'] },
      { label: { uk: 'множина (Leute)', ru: 'мн. число (Leute)' }, cells: ['meine', 'meine', 'meinen', 'meiner'] },
    ],
    notes: [
      {
        uk: 'Закінчення ті самі, що й у неозначеного артикля (ein/kein). Приклади: Ich sehe meinen Vater. · Ich helfe meiner Mutter.',
        ru: 'Окончания те же, что у неопределённого артикля (ein/kein). Примеры: Ich sehe meinen Vater. · Ich helfe meiner Mutter.',
      },
      {
        uk: 'У Dativ множини іменник теж отримує -n: mit meinen Kindern.',
        ru: 'В Dativ множественного числа существительное тоже получает -n: mit meinen Kindern.',
      },
    ],
  },
  {
    id: 'demonstrative',
    icon: '👆',
    title: { uk: 'Вказівні займенники (dieser — цей)', ru: 'Указательные местоимения (dieser — этот)' },
    intro: {
      uk: 'dieser = цей/ця/це. Відмінюється, як визначений артикль. Той самий зразок мають jener (той), jeder (кожен), welcher (який).',
      ru: 'dieser = этот/эта/это. Склоняется как определённый артикль. Тот же образец у jener (тот), jeder (каждый), welcher (который).',
    },
    head: ['Рід', 'Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'],
    rows: [
      { label: { uk: 'чол. рід (Mann)', ru: 'муж. род (Mann)' }, cells: ['dieser', 'diesen', 'diesem', 'dieses'] },
      { label: { uk: 'жін. рід (Frau)', ru: 'жен. род (Frau)' }, cells: ['diese', 'diese', 'dieser', 'dieser'] },
      { label: { uk: 'сер. рід (Kind)', ru: 'сред. род (Kind)' }, cells: ['dieses', 'dieses', 'diesem', 'dieses'] },
      { label: { uk: 'множина (Leute)', ru: 'мн. число (Leute)' }, cells: ['diese', 'diese', 'diesen', 'dieser'] },
    ],
    notes: [
      {
        uk: 'Приклади: Dieser Zug fährt nach Köln. · Ich nehme diesen Pullover. · In diesem Haus wohne ich.',
        ru: 'Примеры: Dieser Zug fährt nach Köln. · Ich nehme diesen Pullover. · In diesem Haus wohne ich.',
      },
      {
        uk: 'der/die/das теж можуть бути вказівними: Ich meine den hier (я маю на увазі цього).',
        ru: 'der/die/das тоже могут быть указательными: Ich meine den hier (я имею в виду этого).',
      },
    ],
  },
  {
    id: 'reflexive',
    icon: '🪞',
    title: { uk: 'Зворотні займенники (sich)', ru: 'Возвратные местоимения (sich)' },
    intro: {
      uk: 'Дія повертається на того, хто діє: sich waschen — митися. В A1 достатньо двох форм: Akkusativ і Dativ.',
      ru: 'Действие возвращается на того, кто действует: sich waschen — мыться. Для A1 достаточно двух форм: Akkusativ и Dativ.',
    },
    head: ['Особа', 'Akkusativ · кого?', 'Dativ · кому?'],
    rows: [
      { label: { uk: 'я', ru: 'я' }, cells: ['mich', 'mir'] },
      { label: { uk: 'ти', ru: 'ты' }, cells: ['dich', 'dir'] },
      { label: { uk: 'він / вона / воно', ru: 'он / она / оно' }, cells: ['sich', 'sich'] },
      { label: { uk: 'ми', ru: 'мы' }, cells: ['uns', 'uns'] },
      { label: { uk: 'ви (до групи)', ru: 'вы (к группе)' }, cells: ['euch', 'euch'] },
      { label: { uk: 'вони / Ви', ru: 'они / Вы' }, cells: ['sich', 'sich'] },
    ],
    notes: [
      {
        uk: 'Akk vs Dat: Ich wasche mich (мию себе). · Ich putze mir die Zähne (чищу собі зуби).',
        ru: 'Akk vs Dat: Ich wasche mich (мою себя). · Ich putze mir die Zähne (чищу себе зубы).',
      },
      {
        uk: 'Часті зворотні дієслова: sich freuen (радіти), sich interessieren (цікавитися), sich treffen (зустрічатися).',
        ru: 'Частые возвратные глаголы: sich freuen (радоваться), sich interessieren (интересоваться), sich treffen (встречаться).',
      },
    ],
  },
  {
    id: 'interrogative',
    icon: '❓',
    title: { uk: 'Питальні займенники (wer? was?)', ru: 'Вопросительные местоимения (wer? was?)' },
    intro: {
      uk: 'wer — про людей, was — про предмети. У was є лише Nominativ та Akkusativ.',
      ru: 'wer — о людях, was — о предметах. У was есть только Nominativ и Akkusativ.',
    },
    head: ['Значення', 'Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'],
    rows: [
      { label: { uk: 'хто? (про людину)', ru: 'кто? (о человеке)' }, cells: ['wer', 'wen', 'wem', 'wessen'] },
      { label: { uk: 'що? (про предмет)', ru: 'что? (о предмете)' }, cells: ['was', 'was', null, null] },
    ],
    notes: [
      {
        uk: 'Приклади: Wen siehst du? · Mit wem gehst du? · Wessen Handy ist das?',
        ru: 'Примеры: Wen siehst du? · Mit wem gehst du? · Wessen Handy ist das?',
      },
      {
        uk: 'welcher? (який?) відмінюється, як dieser: Welchen Film magst du?',
        ru: 'welcher? (какой?) склоняется, как dieser: Welchen Film magst du?',
      },
    ],
  },
  {
    id: 'indefinite',
    icon: '🎲',
    title: { uk: 'Неозначені займенники (чоловічий рід)', ru: 'Неопределённые местоимения (мужской род)' },
    intro: {
      uk: 'Найпотрібніші «слова-замінники». Закінчення збігаються з визначеним артиклем; у жіночому й середньому роді — за зразком dieser.',
      ru: 'Самые нужные «слова-заменители». Окончания совпадают с определённым артиклем; в женском и среднем роде — по образцу dieser.',
    },
    head: ['Значення', 'Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'],
    rows: [
      { label: { uk: 'безособове «кажуть»', ru: 'безличное «говорят»' }, cells: ['man', 'einen', 'einem', null] },
      { label: { uk: 'хтось / один', ru: 'кто-то / один' }, cells: ['einer', 'einen', 'einem', 'eines'] },
      { label: { uk: 'жоден', ru: 'никакой' }, cells: ['keiner', 'keinen', 'keinem', 'keines'] },
      { label: { uk: 'кожен', ru: 'каждый' }, cells: ['jeder', 'jeden', 'jedem', 'jedes'] },
      { label: { uk: 'всі (множина)', ru: 'все (мн. число)' }, cells: ['alle', 'alle', 'allen', 'aller'] },
    ],
    notes: [
      {
        uk: 'Приклади: Man spricht hier Deutsch. · Ich nehme einen. · Keiner kommt. · Jeder Tag ist neu.',
        ru: 'Примеры: Man spricht hier Deutsch. · Ich nehme einen. · Keiner kommt. · Jeder Tag ist neu.',
      },
    ],
  },
]

/** Скільки німецьких форм у всіх таблицях (для підпису вкладки) */
export const PRON_TOTAL: number = PRON_TABLES.reduce(
  (n, t) => n + t.rows.reduce((m, r) => m + r.cells.filter((c) => c !== null).length, 0),
  0,
)
