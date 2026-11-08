// ============================================================
// ДАНІ + ДВИГУН «МОВНОГО КОНСТРУКТОРА».
// Основові словникові групи — по 10 найчастотніших слів:
//   займенники, дієслова, іменники, прикметники (+ обставини
//   часу). З них двигун збирає граматично правильні речення
//   у трьох часах (Präsens, минуле, Futur I) у ствердженні
//   або запереченні й одразу дає переклад + пояснення граматики.
//
// Модель речень (4 схеми — усі без винятків на рівні A1):
//   P1  sein      → іменник-підмет + sein + прикметник
//                   (Der Kaffee ist gut. / war / wird … sein.)
//   P2  haben     → займенник + haben + (kein) + іменник
//                   (Wir haben keine Zeit. / hatten / werden … haben.)
//   P3  перехідні → займенник + дієслово + час + об'єкт (Akk)
//                   (Ich lese heute das Buch. / habe … gelesen.)
//   P4  руху      → займенник + gehen/kommen + час
//                   (Ich bin gestern gegangen.)
//   P3b brauchen  → займенник + brauchen + (kein) + об'єкт
//                   (Ich brauche Zeit. — переклад «Мені потрібен час»)
// Минулого sein/haben — Präteritum (war/hatte), решти — Perfekt.
// ============================================================

export type Tense = 'praesens' | 'vergangen' | 'zukunft'

// ---------- ЗАЙМЕННИКИ ----------

export type CPron = {
  id: string
  /** як показувати у виборі: «sie (вона)» */
  de: string
  /** чиста німецька форма для речення: «sie» */
  deS: string
  uk: string
  ru: string
  /** малі літери — коли підмет не перший у перекладі: «Сьогодні я…» */
  ukL: string
  ruL: string
  /** граматична особа: 0 ich · 1 du · 2 er/sie/es · 3 wir · 4 ihr · 5 sie/Sie/man */
  idx: number
  /** «у мене / у тебя …» — для схем з haben */
  ukHave: string
  ruHave: string
  /** «мені / тебе …» — для brauchen */
  ukNeed: string
  ruNeed: string
  /** рід для перекладу в минулому: ich/du → «(ла)», решта відома */
  pk: 'm/f' | 'm' | 'f' | 'n' | 'p'
  /** невизначено-особовий (man) — у перекладі додається «тут» */
  man?: 1
}

export const PRONOUNS_C: CPron[] = [
  { id: 'ich', de: 'ich', deS: 'ich', uk: 'Я', ru: 'Я', ukL: 'я', ruL: 'я', idx: 0, ukHave: 'у мене', ruHave: 'у меня', ukNeed: 'мені', ruNeed: 'мне', pk: 'm/f' },
  { id: 'du', de: 'du', deS: 'du', uk: 'Ти', ru: 'Ты', ukL: 'ти', ruL: 'ты', idx: 1, ukHave: 'у тебе', ruHave: 'у тебя', ukNeed: 'тобі', ruNeed: 'тебе', pk: 'm/f' },
  { id: 'er', de: 'er', deS: 'er', uk: 'Він', ru: 'Он', ukL: 'він', ruL: 'он', idx: 2, ukHave: 'у нього', ruHave: 'у него', ukNeed: 'йому', ruNeed: 'ему', pk: 'm' },
  { id: 'sie3', de: 'sie (вона)', deS: 'sie', uk: 'Вона', ru: 'Она', ukL: 'вона', ruL: 'она', idx: 2, ukHave: 'у неї', ruHave: 'у неё', ukNeed: 'їй', ruNeed: 'ей', pk: 'f' },
  { id: 'es', de: 'es', deS: 'es', uk: 'Воно', ru: 'Оно', ukL: 'воно', ruL: 'оно', idx: 2, ukHave: 'у нього', ruHave: 'у него', ukNeed: 'йому', ruNeed: 'ему', pk: 'n' },
  { id: 'wir', de: 'wir', deS: 'wir', uk: 'Ми', ru: 'Мы', ukL: 'ми', ruL: 'мы', idx: 3, ukHave: 'у нас', ruHave: 'у нас', ukNeed: 'нам', ruNeed: 'нам', pk: 'p' },
  { id: 'ihr', de: 'ihr', deS: 'ihr', uk: 'Ви', ru: 'Вы', ukL: 'ви', ruL: 'вы', idx: 4, ukHave: 'у вас', ruHave: 'у вас', ukNeed: 'вам', ruNeed: 'вам', pk: 'p' },
  { id: 'sie6', de: 'sie (вони)', deS: 'sie', uk: 'Вони', ru: 'Они', ukL: 'вони', ruL: 'они', idx: 5, ukHave: 'у них', ruHave: 'у них', ukNeed: 'їм', ruNeed: 'им', pk: 'p' },
  { id: 'Sie', de: 'Sie', deS: 'Sie', uk: 'Ви', ru: 'Вы', ukL: 'ви', ruL: 'вы', idx: 5, ukHave: 'у Вас', ruHave: 'у Вас', ukNeed: 'Вам', ruNeed: 'Вам', pk: 'p' },
  { id: 'man', de: 'man', deS: 'man', uk: 'Тут', ru: 'Тут', ukL: 'тут', ruL: 'тут', idx: 5, ukHave: 'у людей', ruHave: 'у людей', ukNeed: 'тут', ruNeed: 'тут', pk: 'p', man: 1 },
]

// ---------- ІМЕННИКИ ----------

export type GN = 'm' | 'f' | 'n' | 'p'

export type CNoun = {
  id: string
  art: 'der' | 'die' | 'das'
  de: string
  /** підмет: «der Tag» */
  deNp: string
  /** прямий об'єкт з означеним артиклем: «den Tag» */
  akk: string
  /** заперечення kein: «kein Tag» */
  kein: string
  /** іменник у схемі «мати»: 'Zeit' | 'ein Kind' | null — не поєднується */
  habNp: string | null
  uk: string
  ru: string
  ukAkk: string
  ruAkk: string
  /** родовий для заперечення існування: «часу / времени» */
  ukGen: string
  ruGen: string
  /** «був час / было время» — Präteritum від haben */
  ukBe: string
  ruBe: string
  /** рід ПЕРЕКЛАДУ — для узгодження прикметника й «був/буде» */
  g: GN
  /** «потрібен час / нужна книга» — для brauchen */
  ukNeed: string
  ruNeed: string
}

export const NOUNS_C: CNoun[] = [
  { id: 'tag', art: 'der', de: 'Tag', deNp: 'der Tag', akk: 'den Tag', kein: 'kein Tag', habNp: null,
    uk: 'день', ru: 'день', ukAkk: 'день', ruAkk: 'день', ukGen: 'дня', ruGen: 'дня',
    ukBe: 'був день', ruBe: 'был день', g: 'm', ukNeed: 'потрібен день', ruNeed: 'нужен день' },
  { id: 'zeit', art: 'die', de: 'Zeit', deNp: 'die Zeit', akk: 'die Zeit', kein: 'keine Zeit', habNp: 'Zeit',
    uk: 'час', ru: 'время', ukAkk: 'час', ruAkk: 'время', ukGen: 'часу', ruGen: 'времени',
    ukBe: 'був час', ruBe: 'было время', g: 'm', ukNeed: 'потрібен час', ruNeed: 'нужно время' },
  { id: 'haus', art: 'das', de: 'Haus', deNp: 'das Haus', akk: 'das Haus', kein: 'kein Haus', habNp: 'ein Haus',
    uk: 'дім', ru: 'дом', ukAkk: 'дім', ruAkk: 'дом', ukGen: 'дому', ruGen: 'дома',
    ukBe: 'був дім', ruBe: 'был дом', g: 'm', ukNeed: 'потрібен дім', ruNeed: 'нужен дом' },
  { id: 'buch', art: 'das', de: 'Buch', deNp: 'das Buch', akk: 'das Buch', kein: 'kein Buch', habNp: 'ein Buch',
    uk: 'книга', ru: 'книга', ukAkk: 'книгу', ruAkk: 'книгу', ukGen: 'книги', ruGen: 'книги',
    ukBe: 'була книга', ruBe: 'была книга', g: 'f', ukNeed: 'потрібна книга', ruNeed: 'нужна книга' },
  { id: 'kind', art: 'das', de: 'Kind', deNp: 'das Kind', akk: 'das Kind', kein: 'kein Kind', habNp: 'ein Kind',
    uk: 'дитина', ru: 'ребёнок', ukAkk: 'дитину', ruAkk: 'ребёнка', ukGen: 'дитини', ruGen: 'ребёнка',
    ukBe: 'була дитина', ruBe: 'был ребёнок', g: 'f', ukNeed: 'потрібна дитина', ruNeed: 'нужен ребёнок' },
  { id: 'arbeit', art: 'die', de: 'Arbeit', deNp: 'die Arbeit', akk: 'die Arbeit', kein: 'keine Arbeit', habNp: 'Arbeit',
    uk: 'робота', ru: 'работа', ukAkk: 'роботу', ruAkk: 'работу', ukGen: 'роботи', ruGen: 'работы',
    ukBe: 'була робота', ruBe: 'была работа', g: 'f', ukNeed: 'потрібна робота', ruNeed: 'нужна работа' },
  { id: 'geld', art: 'das', de: 'Geld', deNp: 'das Geld', akk: 'das Geld', kein: 'kein Geld', habNp: 'Geld',
    uk: 'гроші', ru: 'деньги', ukAkk: 'гроші', ruAkk: 'деньги', ukGen: 'грошей', ruGen: 'денег',
    ukBe: 'були гроші', ruBe: 'были деньги', g: 'p', ukNeed: 'потрібні гроші', ruNeed: 'нужны деньги' },
  { id: 'freund', art: 'der', de: 'Freund', deNp: 'der Freund', akk: 'den Freund', kein: 'kein Freund', habNp: 'ein Freund',
    uk: 'друг', ru: 'друг', ukAkk: 'друга', ruAkk: 'друга', ukGen: 'друга', ruGen: 'друга',
    ukBe: 'був друг', ruBe: 'был друг', g: 'm', ukNeed: 'потрібен друг', ruNeed: 'нужен друг' },
  { id: 'stadt', art: 'die', de: 'Stadt', deNp: 'die Stadt', akk: 'die Stadt', kein: 'keine Stadt', habNp: null,
    uk: 'місто', ru: 'город', ukAkk: 'місто', ruAkk: 'город', ukGen: 'міста', ruGen: 'города',
    ukBe: 'було місто', ruBe: 'был город', g: 'n', ukNeed: 'потрібне місто', ruNeed: 'нужен город' },
  { id: 'kaffee', art: 'der', de: 'Kaffee', deNp: 'der Kaffee', akk: 'den Kaffee', kein: 'kein Kaffee', habNp: 'Kaffee',
    uk: 'кава', ru: 'кофе', ukAkk: 'каву', ruAkk: 'кофе', ukGen: 'кави', ruGen: 'кофе',
    ukBe: 'була кава', ruBe: 'был кофе', g: 'f', ukNeed: 'потрібна кава', ruNeed: 'нужен кофе' },
]

// ---------- ПРИКМЕТНИКИ (предикативно — після sein) ----------

export type CAdj = {
  id: string
  de: string
  uk: Record<GN, string>
  ru: Record<GN, string>
}

export const ADJS_C: CAdj[] = [
  { id: 'gut', de: 'gut', uk: { m: 'добрий', f: 'добра', n: 'добре', p: 'добрі' }, ru: { m: 'хороший', f: 'хорошая', n: 'хорошее', p: 'хорошие' } },
  { id: 'neu', de: 'neu', uk: { m: 'новий', f: 'нова', n: 'нове', p: 'нові' }, ru: { m: 'новый', f: 'новая', n: 'новое', p: 'новые' } },
  { id: 'gross', de: 'groß', uk: { m: 'великий', f: 'велика', n: 'велике', p: 'великі' }, ru: { m: 'большой', f: 'большая', n: 'большое', p: 'большие' } },
  { id: 'klein', de: 'klein', uk: { m: 'малий', f: 'мала', n: 'мале', p: 'малі' }, ru: { m: 'маленький', f: 'маленькая', n: 'маленькое', p: 'маленькие' } },
  { id: 'schoen', de: 'schön', uk: { m: 'гарний', f: 'гарна', n: 'гарне', p: 'гарні' }, ru: { m: 'красивый', f: 'красивая', n: 'красивое', p: 'красивые' } },
  { id: 'schnell', de: 'schnell', uk: { m: 'швидкий', f: 'швидка', n: 'швидке', p: 'швидкі' }, ru: { m: 'быстрый', f: 'быстрая', n: 'быстрое', p: 'быстрые' } },
  { id: 'alt', de: 'alt', uk: { m: 'старий', f: 'стара', n: 'старе', p: 'старі' }, ru: { m: 'старый', f: 'старая', n: 'старое', p: 'старые' } },
  { id: 'einfach', de: 'einfach', uk: { m: 'простий', f: 'проста', n: 'просте', p: 'прості' }, ru: { m: 'простой', f: 'простая', n: 'простое', p: 'простые' } },
  { id: 'wichtig', de: 'wichtig', uk: { m: 'важливий', f: 'важлива', n: 'важливе', p: 'важливі' }, ru: { m: 'важный', f: 'важная', n: 'важное', p: 'важные' } },
  { id: 'richtig', de: 'richtig', uk: { m: 'правильний', f: 'правильна', n: 'правильне', p: 'правильні' }, ru: { m: 'правильный', f: 'правильная', n: 'правильное', p: 'правильные' } },
]

// ---------- ДІЄСЛОВА ----------

export type CVerbKind = 'sein' | 'haben' | 'trans' | 'move' | 'need'

export type CVerb = {
  id: string
  inf: string
  uk: string
  ru: string
  kind: CVerbKind
  /** Präsens: [ich, du, er/sie/es, wir, ihr, sie/Sie] */
  forms: string[]
  /** Partizip II — для Perfekt */
  part?: string
  aux?: 'haben' | 'sein'
  /** дозволені об'єкти: id іменника + конкретна NP цього дієслова */
  obj?: { id: string; np: string }[]
  ruInf?: string
  /** теперішній час перекладу: [я, ти, він, ми, ви, вони] */
  uk6?: string[]
  ru6?: string[]
  /** Perfekt-переклад, чоловіча форма: «зробив» → зробила/зробило/зробили */
  ukPastM?: string
  ruPastM?: string
  /** майбутній переклад: uk — синтетичний «зроблю…»; ru — «пойду…», решта «буду + інфінітив» */
  ukFut6?: string[]
  ruFut6?: string[]
}

export const WERDEN = ['werde', 'wirst', 'wird', 'werden', 'werdet', 'werden']

export const VERBS_C: CVerb[] = [
  {
    id: 'sein', inf: 'sein', uk: 'бути', ru: 'быть', kind: 'sein',
    forms: ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'],
  },
  {
    id: 'haben', inf: 'haben', uk: 'мати', ru: 'иметь', kind: 'haben',
    forms: ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'],
  },
  {
    id: 'machen', inf: 'machen', uk: 'робити', ru: 'делать', kind: 'trans',
    forms: ['mache', 'machst', 'macht', 'machen', 'macht', 'machen'],
    part: 'gemacht', aux: 'haben',
    obj: [{ id: 'arbeit', np: 'die Arbeit' }, { id: 'kaffee', np: 'Kaffee' }],
    ruInf: 'делать',
    uk6: ['роблю', 'робиш', 'робить', 'робимо', 'робите', 'роблять'],
    ru6: ['делаю', 'делаешь', 'делает', 'делаем', 'делаете', 'делают'],
    ukPastM: 'зробив', ruPastM: 'сделал',
    ukFut6: ['зроблю', 'зробиш', 'зробить', 'зробимо', 'зробите', 'зроблять'],
  },
  {
    id: 'sehen', inf: 'sehen', uk: 'бачити', ru: 'видеть', kind: 'trans',
    forms: ['sehe', 'siehst', 'sieht', 'sehen', 'seht', 'sehen'],
    part: 'gesehen', aux: 'haben',
    obj: [
      { id: 'haus', np: 'das Haus' }, { id: 'buch', np: 'das Buch' },
      { id: 'kind', np: 'das Kind' }, { id: 'freund', np: 'den Freund' },
      { id: 'stadt', np: 'die Stadt' },
    ],
    ruInf: 'видеть',
    uk6: ['бачу', 'бачиш', 'бачить', 'бачимо', 'бачите', 'бачать'],
    ru6: ['вижу', 'видишь', 'видит', 'видим', 'видите', 'видят'],
    ukPastM: 'побачив', ruPastM: 'увидел',
    ukFut6: ['побачу', 'побачиш', 'побачить', 'побачимо', 'побачите', 'побачать'],
  },
  {
    id: 'lesen', inf: 'lesen', uk: 'читати', ru: 'читать', kind: 'trans',
    forms: ['lese', 'liest', 'liest', 'lesen', 'lest', 'lesen'],
    part: 'gelesen', aux: 'haben',
    obj: [{ id: 'buch', np: 'das Buch' }],
    ruInf: 'читать',
    uk6: ['читаю', 'читаєш', 'читає', 'читаємо', 'читаєте', 'читають'],
    ru6: ['читаю', 'читаешь', 'читает', 'читаем', 'читаете', 'читают'],
    ukPastM: 'прочитав', ruPastM: 'прочитал',
    ukFut6: ['прочитаю', 'прочитаєш', 'прочитає', 'прочитаємо', 'прочитаєте', 'прочитають'],
  },
  {
    id: 'trinken', inf: 'trinken', uk: 'пити', ru: 'пить', kind: 'trans',
    forms: ['trinke', 'trinkst', 'trinkt', 'trinken', 'trinkt', 'trinken'],
    part: 'getrunken', aux: 'haben',
    obj: [{ id: 'kaffee', np: 'Kaffee' }],
    ruInf: 'пить',
    uk6: ['пʼю', 'пʼєш', 'пʼє', 'пʼємо', 'пʼєте', 'пʼють'],
    ru6: ['пью', 'пьёшь', 'пьёт', 'пьём', 'пьёте', 'пьют'],
    ukPastM: 'випив', ruPastM: 'выпил',
    ukFut6: ['випʼю', 'випʼєш', 'випʼє', 'випʼємо', 'випʼєте', 'випʼють'],
  },
  {
    id: 'kaufen', inf: 'kaufen', uk: 'купувати', ru: 'покупать', kind: 'trans',
    forms: ['kaufe', 'kaufst', 'kauft', 'kaufen', 'kauft', 'kaufen'],
    part: 'gekauft', aux: 'haben',
    obj: [{ id: 'buch', np: 'das Buch' }, { id: 'kaffee', np: 'Kaffee' }],
    ruInf: 'покупать',
    uk6: ['купую', 'купуєш', 'купує', 'купуємо', 'купуєте', 'купують'],
    ru6: ['покупаю', 'покупаешь', 'покупает', 'покупаем', 'покупаете', 'покупают'],
    ukPastM: 'купив', ruPastM: 'купил',
    ukFut6: ['куплю', 'купиш', 'купить', 'купимо', 'купите', 'куплять'],
  },
  {
    id: 'brauchen', inf: 'brauchen', uk: 'потребувати', ru: 'нуждаться', kind: 'need',
    forms: ['brauche', 'brauchst', 'braucht', 'brauchen', 'braucht', 'brauchen'],
    part: 'gebraucht', aux: 'haben',
    obj: [{ id: 'zeit', np: 'Zeit' }, { id: 'geld', np: 'Geld' }, { id: 'buch', np: 'das Buch' }],
  },
  {
    id: 'gehen', inf: 'gehen', uk: 'іти', ru: 'идти', kind: 'move',
    forms: ['gehe', 'gehst', 'geht', 'gehen', 'geht', 'gehen'],
    part: 'gegangen', aux: 'sein',
    ruInf: 'идти',
    uk6: ['іду', 'ідеш', 'іде', 'ідемо', 'ідете', 'ідуть'],
    ru6: ['иду', 'идёшь', 'идёт', 'идём', 'идёте', 'идут'],
    ukPastM: 'пішов', ruPastM: 'пошёл',
    ukFut6: ['піду', 'підеш', 'піде', 'підемо', 'підете', 'підуть'],
    ruFut6: ['пойду', 'пойдёшь', 'пойдёт', 'пойдём', 'пойдёте', 'пойдут'],
  },
  {
    id: 'kommen', inf: 'kommen', uk: 'приходити', ru: 'приходить', kind: 'move',
    forms: ['komme', 'kommst', 'kommt', 'kommen', 'kommt', 'kommen'],
    part: 'gekommen', aux: 'sein',
    ruInf: 'приходить',
    uk6: ['приходжу', 'приходиш', 'приходить', 'приходимо', 'приходите', 'приходять'],
    ru6: ['прихожу', 'приходишь', 'приходит', 'приходим', 'приходите', 'приходят'],
    ukPastM: 'прийшов', ruPastM: 'пришёл',
    ukFut6: ['прийду', 'прийдеш', 'прийде', 'прийдемо', 'прийдете', 'прийдуть'],
    ruFut6: ['приду', 'придёшь', 'придёт', 'придём', 'придёте', 'придут'],
  },
]

// ---------- ОБСТАВИНИ ЧАСУ ----------

export type CTime = {
  id: string
  de: string
  uk: string
  ru: string
  tenses: Tense[]
  /** у перекладі — на початку речення (інакше — після підмета) */
  first: boolean
}

export const TIMES_C: CTime[] = [
  { id: 'heute', de: 'heute', uk: 'сьогодні', ru: 'сегодня', tenses: ['praesens', 'vergangen', 'zukunft'], first: true },
  { id: 'jetzt', de: 'jetzt', uk: 'зараз', ru: 'сейчас', tenses: ['praesens'], first: true },
  { id: 'immer', de: 'immer', uk: 'завжди', ru: 'всегда', tenses: ['praesens'], first: false },
  { id: 'oft', de: 'oft', uk: 'часто', ru: 'часто', tenses: ['praesens'], first: false },
  { id: 'gestern', de: 'gestern', uk: 'учора', ru: 'вчера', tenses: ['vergangen'], first: true },
  { id: 'morgen', de: 'morgen', uk: 'завтра', ru: 'завтра', tenses: ['zukunft'], first: true },
  { id: 'spaeter', de: 'später', uk: 'пізніше', ru: 'позже', tenses: ['zukunft'], first: true },
  { id: 'bald', de: 'bald', uk: 'незабаром', ru: 'скоро', tenses: ['zukunft'], first: true },
]

export const DEFAULT_TIME: Record<Tense, string> = {
  praesens: 'heute',
  vergangen: 'gestern',
  zukunft: 'morgen',
}

export const TENSE_LABEL: Record<Tense, { uk: string; ru: string }> = {
  praesens: { uk: 'Теперішнє · Präsens', ru: 'Настоящее · Präsens' },
  vergangen: { uk: 'Минуле · Perfekt / Präteritum', ru: 'Прошедшее · Perfekt / Präteritum' },
  zukunft: { uk: 'Майбутнє · Futur I', ru: 'Будущее · Futur I' },
}

// ---------- ДВИГУН ----------

export type Built = {
  de: string
  uk: string
  ru: string
  /** слова німецького речення без крапки — для вправи «збери» */
  tokens: string[]
  notes: { uk: string; ru: string }[]
  key: string
}

export type BuildInput = {
  pron?: string | null
  verb?: string | null
  noun?: string | null
  adj?: string | null
  time?: string | null
  tense: Tense
  neg: boolean
}

const noun = (id: string) => NOUNS_C.find((n) => n.id === id)
const pron = (id: string) => PRONOUNS_C.find((p) => p.id === id)
const verb = (id: string) => VERBS_C.find((v) => v.id === id)
const adj = (id: string) => ADJS_C.find((a) => a.id === id)
const time = (id: string) => TIMES_C.find((t) => t.id === id)

const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s)

/** «прочитав» → прочитала/прочитало/прочитали; «пішов» → пішла/пішло/пішли */
export function ukPastForm(pastM: string, kind: CPron['pk']): string {
  if (kind === 'm/f') return `${pastM}(ла)`
  if (kind === 'm') return pastM
  if (pastM.endsWith('ов')) {
    const base = pastM.slice(0, -2)
    return base + (kind === 'f' ? 'ла' : kind === 'n' ? 'ло' : 'ли')
  }
  const base = pastM.slice(0, -1)
  return base + (kind === 'f' ? 'ла' : kind === 'n' ? 'ло' : 'ли')
}

/** «читал» → читала/читало/читали; «пошёл» → пошла/пошло/пошли */
export function ruPastForm(pastM: string, kind: CPron['pk']): string {
  if (kind === 'm/f') return `${pastM}(а)`
  if (kind === 'm') return pastM
  if (pastM.endsWith('ёл')) {
    const base = pastM.slice(0, -2)
    return base + (kind === 'f' ? 'ла' : kind === 'n' ? 'ло' : 'ли')
  }
  const base = pastM.slice(0, -1)
  return base + (kind === 'f' ? 'ла' : kind === 'n' ? 'ло' : 'ли')
}

const WAS_UK: Record<GN, string> = { m: 'був', f: 'була', n: 'було', p: 'були' }
const WAS_RU: Record<GN, string> = { m: 'был', f: 'была', n: 'было', p: 'были' }
const BE_FUT_UK: Record<GN, string> = { m: 'буде', f: 'буде', n: 'буде', p: 'будуть' }
const BE_FUT_RU: Record<GN, string> = { m: 'будет', f: 'будет', n: 'будет', p: 'будут' }

/** російський орудний для майбутнього: большой → большим, большая → большой */
function ruInstr(a: string, g: GN): string {
  if (g === 'f') {
    if (a.endsWith('ая')) return a.slice(0, -2) + 'ой'
    if (a.endsWith('яя')) return a.slice(0, -2) + 'ей'
  }
  if (g === 'p') return a.endsWith('ые') ? a.slice(0, -2) + 'ыми' : a.slice(0, -2) + 'ими'
  if (a.endsWith('ой') || a.endsWith('ий')) return a.slice(0, -2) + 'им'
  return a.slice(0, -2) + 'ым'
}

/** kein у Akkusativ для прямого об'єкта: der → keinen, die → keine, das → kein */
function keinAkkFor(n: CNoun): string {
  return n.art === 'der' ? `keinen ${n.de}` : n.art === 'die' ? `keine ${n.de}` : `kein ${n.de}`
}

function ruFut(v: CVerb, idx: number): string {
  if (v.ruFut6) return v.ruFut6[idx]
  const be = ['буду', 'будешь', 'будет', 'будем', 'будете', 'будут'][idx]
  return `${be} ${v.ruInf ?? v.inf}`
}

/**_Helper_: підмет у перекладі (малі літери посеред речення) */
function subjUk(p: CPron): string {
  return p.ukL
}
function subjRu(p: CPron): string {
  return p.ruL
}

// --- P1: sein + прикметник (підмет — іменник) ---

function buildSein(nId: string, aId: string, tense: Tense, neg: boolean): Built {
  const n = noun(nId)
  const a = adj(aId)
  if (!n || !a) throw new Error('sein: потрібні іменник і прикметник')
  const gUk = n.g
  const adjUk = a.uk[gUk]
  const adjRu = a.ru[gUk]
  const adjRuF = tense === 'zukunft' ? ruInstr(a.ru[gUk], gUk) : adjRu
  let de: string
  let uk: string
  let ru: string
  if (tense === 'praesens') {
    de = `${cap(n.deNp)} ist ${neg ? 'nicht ' : ''}${a.de}.`
    uk = `${cap(n.uk)} ${neg ? 'не ' : ''}${adjUk}.`
    ru = `${cap(n.ru)} ${neg ? 'не ' : ''}${adjRu}.`
  } else if (tense === 'vergangen') {
    de = `${cap(n.deNp)} war ${neg ? 'nicht ' : ''}${a.de}.`
    uk = `${cap(n.uk)} ${neg ? 'не ' : ''}${WAS_UK[gUk]} ${adjUk}.`
    ru = `${cap(n.ru)} ${neg ? 'не ' : ''}${WAS_RU[gUk]} ${adjRu}.`
  } else {
    de = `${cap(n.deNp)} wird ${neg ? 'nicht ' : ''}${a.de} sein.`
    uk = `${cap(n.uk)} ${neg ? 'не ' : ''}${BE_FUT_UK[gUk]} ${adjUk}.`
    ru = `${cap(n.ru)} ${neg ? 'не ' : ''}${BE_FUT_RU[gUk]} ${adjRuF}.`
  }
  const notes: { uk: string; ru: string }[] = [
    { uk: 'Прикметник після sein не відмінюється — просто «ist schön».', ru: 'Прилагательное после sein не склоняется — просто «ist schön».' },
  ]
  if (tense === 'vergangen')
    notes.push({ uk: 'Минуле від sein — Präteritum: ist → war.', ru: 'Прошедшее от sein — Präteritum: ist → war.' })
  if (tense === 'zukunft')
    notes.push({ uk: 'Futur I: wird … sein — «sein» йде в кінець.', ru: 'Futur I: wird … sein — «sein» уходит в конец.' })
  if (neg)
    notes.push({ uk: '«nicht» стоїть перед прикметником — заперечуємо ознаку.', ru: '«nicht» стоит перед прилагательным — отрицаем признак.' })
  return { de, uk, ru, tokens: de.replace('.', '').split(' '), notes, key: `build:${n.id}-sein-${a.id}-${tense}-${neg ? 'neg' : 'pos'}` }
}

// --- P2: haben + (kein) + іменник ---

const HABEN_AUX = ['habe', 'hast', 'hat', 'haben', 'habt', 'haben']
const HABEN_PRET = ['hatte', 'hattest', 'hatte', 'hatten', 'hattet', 'hatten']
const SEIN_AUX = ['bin', 'bist', 'ist', 'sind', 'seid', 'sind']

function buildHaben(pId: string, nId: string, tense: Tense, neg: boolean): Built {
  const p = pron(pId)
  const n = noun(nId)
  if (!p || !n || !n.habNp) throw new Error('haben: цей іменник не поєднується')
  const obj = neg ? n.kein : n.habNp
  let de: string
  let uk: string
  let ru: string
  if (tense === 'praesens') {
    de = `${cap(p.deS)} ${HABEN_AUX[p.idx]} ${obj}.`
    uk = neg
      ? `${cap(p.ukHave)} немає ${n.ukGen}.`
      : `${cap(p.ukHave)} є ${n.uk}.`
    ru = neg
      ? `${cap(p.ruHave)} нет ${n.ruGen}.`
      : `${cap(p.ruHave)} есть ${n.ru}.`
  } else if (tense === 'vergangen') {
    de = `${cap(p.deS)} ${HABEN_PRET[p.idx]} ${obj}.`
    uk = neg ? `${cap(p.ukHave)} не було ${n.ukGen}.` : `${cap(p.ukHave)} ${n.ukBe}.`
    ru = neg ? `${cap(p.ruHave)} не было ${n.ruGen}.` : `${cap(p.ruHave)} ${n.ruBe}.`
  } else {
    de = `${cap(p.deS)} ${WERDEN[p.idx]} ${obj} haben.`
    uk = neg ? `${cap(p.ukHave)} не буде ${n.ukGen}.` : `${cap(p.ukHave)} ${BE_FUT_UK[n.g]} ${n.uk}.`
    ru = neg ? `${cap(p.ruHave)} не будет ${n.ruGen}.` : `${cap(p.ruHave)} ${BE_FUT_RU[n.g]} ${n.ru}.`
  }
  const notes: { uk: string; ru: string }[] = [
    { uk: 'Кажуть «у мене є…», а в німецькій підмет — ich: ich habe …', ru: 'Говорят «у меня есть…», а в немецком подлежащее — ich: ich habe …' },
  ]
  if (neg)
    notes.push({ uk: 'Заперечення іменника — kein/keine (як артикль): keine Zeit.', ru: 'Отрицание существительного — kein/keine (как артикль): keine Zeit.' })
  if (tense === 'vergangen')
    notes.push({ uk: 'haben у минулому — Präteritum: hatte / hattest / hatte / hatten…', ru: 'haben в прошедшем — Präteritum: hatte / hattest / hatte / hatten…' })
  if (tense === 'zukunft')
    notes.push({ uk: 'Futur I: werde … haben — «haben» у кінці речення.', ru: 'Futur I: werde … haben — «haben» в конце предложения.' })
  return { de, uk, ru, tokens: de.replace('.', '').split(' '), notes, key: `build:${p.id}-haben-${n.id}-${tense}-${neg ? 'neg' : 'pos'}` }
}

// --- P3: перехідне дієслово + час + об'єкт ---

function buildTrans(pId: string, vId: string, nId: string, tId: string, tense: Tense, neg: boolean): Built {
  const p = pron(pId)
  const v = verb(vId)
  const n = noun(nId)
  const t = time(tId)
  if (!p || !v || !n || !t || !v.obj) throw new Error('trans: некоректні дані')
  const o = v.obj.find((x) => x.id === nId)
  if (!o) throw new Error('trans: цей іменник не поєднується з дієсловом')
  const ukObj = n.ukAkk
  const ruObj = n.ruAkk
  const ukT = t.first ? `${cap(t.uk)} ` : ''
  const ukTm = t.first ? '' : ` ${t.uk}`
  const ruT = t.first ? `${cap(t.ru)} ` : ''
  const ruTm = t.first ? '' : ` ${t.ru}`
  const su = subjUk(p)
  const sr = subjRu(p)
  let de: string
  let uk: string
  let ru: string
  // заперечення: неозначений об'єкт → kein (keinen Kaffee), з артиклем → nicht наприкінці
  const definite = /^(der|die|das|den) /.test(o.np)
  const objDe = neg && !definite ? keinAkkFor(n) : o.np
  const nichtEnd = neg && definite
  if (tense === 'praesens') {
    de = `${cap(p.deS)} ${v.forms[p.idx]} ${t.de} ${objDe}${nichtEnd ? ' nicht' : ''}.`
    uk = `${ukT}${cap(su)}${ukTm} ${neg ? 'не ' : ''}${v.uk6?.[p.idx] ?? ''} ${ukObj}.`
    ru = `${ruT}${cap(sr)}${ruTm} ${neg ? 'не ' : ''}${v.ru6?.[p.idx] ?? ''} ${ruObj}.`
  } else if (tense === 'vergangen') {
    const aux = v.aux === 'sein' ? SEIN_AUX[p.idx] : HABEN_AUX[p.idx]
    de = `${cap(p.deS)} ${aux} ${t.de} ${objDe} ${nichtEnd ? 'nicht ' : ''}${v.part}.`
    const ukV = ukPastForm(v.ukPastM ?? '', p.pk)
    const ruV = ruPastForm(v.ruPastM ?? '', p.pk)
    uk = `${ukT}${cap(su)}${ukTm} ${neg ? 'не ' : ''}${ukV} ${ukObj}.`
    ru = `${ruT}${cap(sr)}${ruTm} ${neg ? 'не ' : ''}${ruV} ${ruObj}.`
  } else {
    de = `${cap(p.deS)} ${WERDEN[p.idx]} ${t.de} ${objDe} ${nichtEnd ? 'nicht ' : ''}${v.inf}.`
    uk = `${ukT}${cap(su)}${ukTm} ${neg ? 'не ' : ''}${v.ukFut6?.[p.idx] ?? ''} ${ukObj}.`
    ru = `${ruT}${cap(sr)}${ruTm} ${neg ? 'не ' : ''}${ruFut(v, p.idx)} ${ruObj}.`
  }
  const notes: { uk: string; ru: string }[] = []
  if (tense === 'praesens')
    notes.push({ uk: 'Präsens: дієслово завжди на 2-й позиції (V2).', ru: 'Präsens: глагол всегда на 2-й позиции (V2).' })
  if (tense === 'vergangen' && v.aux === 'sein')
    notes.push({ uk: 'Рух у Perfekt іде з sein: bin … gegangen.', ru: 'Движение в Perfekt идёт с sein: bin … gegangen.' })
  if (tense === 'vergangen' && v.aux === 'haben')
    notes.push({ uk: 'Perfekt = habe/hast/… + … + Partizip II наприкінці (рамка).', ru: 'Perfekt = habe/hast/… + … + Partizip II в конце (рамка).' })
  if (tense === 'zukunft')
    notes.push({ uk: 'Futur I: werde/wirst/… + … + інфінітив наприкінці.', ru: 'Futur I: werde/wirst/… + … + инфинитив в конце.' })
  if (n.art === 'der' && o.np.startsWith('den'))
    notes.push({ uk: `Akkusativ: der → den — ${o.np}.`, ru: `Akkusativ: der → den — ${o.np}.` })
  if (neg && !definite)
    notes.push({ uk: `Заперечення об'єкта — kein (Akkusativ): ${keinAkkFor(n)}.`, ru: `Отрицание объекта — kein (Akkusativ): ${keinAkkFor(n)}.` })
  if (nichtEnd)
    notes.push({ uk: '«nicht» — в кінці речення: заперечуємо всю дію.', ru: '«nicht» — в конце предложения: отрицаем всё действие.' })
  return {
    de, uk, ru,
    tokens: de.replace('.', '').split(' '),
    notes,
    key: `build:${p.id}-${v.id}-${n.id}-${t.id}-${tense}-${neg ? 'neg' : 'pos'}`,
  }
}

// --- P3b: brauchen — переклад «мені потрібен …» ---

function buildNeed(pId: string, vId: string, nId: string, tense: Tense, neg: boolean): Built {
  const p = pron(pId)
  const v = verb(vId)
  const n = noun(nId)
  if (!p || !v || !n) throw new Error('need: некоректні дані')
  const np = v.obj?.find((x) => x.id === nId)?.np ?? n.de
  const keinAkk = n.art === 'der' ? 'keinen' : n.art === 'die' ? 'keine' : 'kein'
  const g = n.g
  const beUk = WAS_UK[g]
  const beRu = WAS_RU[g]
  const futUk = BE_FUT_UK[g]
  const futRu = BE_FUT_RU[g]
  let de: string
  let uk: string
  let ru: string
  if (tense === 'praesens') {
    de = `${cap(p.deS)} brauche ${neg ? `${keinAkk} ` : ''}${np}.`
    uk = `${cap(p.ukNeed)} ${neg ? 'не ' : ''}${n.ukNeed}.`
    ru = `${cap(p.ruNeed)} ${neg ? 'не ' : ''}${n.ruNeed}.`
  } else if (tense === 'vergangen') {
    de = `${cap(p.deS)} brauchte ${neg ? `${keinAkk} ` : ''}${np}.`
    uk = `${cap(p.ukNeed)} ${neg ? 'не ' : ''}${beUk} ${n.ukNeed}.`
    ru = `${cap(p.ruNeed)} ${neg ? 'не ' : ''}${beRu} ${n.ruNeed}.`
  } else {
    de = `${cap(p.deS)} ${WERDEN[p.idx]} ${np} ${neg ? 'nicht ' : ''}brauchen.`
    uk = `${cap(p.ukNeed)} ${neg ? 'не ' : ''}${n.ukNeed.replace(/^(потріб\S+)\s/, `$1 ${futUk} `)}.`
    ru = `${cap(p.ruNeed)} ${neg ? 'не ' : ''}${n.ruNeed.replace(/^(нуж\S+)\s/, `$1 ${futRu} `)}.`
  }
  const notes: { uk: string; ru: string }[] = [
    { uk: 'brauchen перекладається як «мені потрібно»: Ich brauche Zeit.', ru: 'brauchen переводится как «мне нужно»: Ich brauche Zeit.' },
  ]
  if (neg)
    notes.push({ uk: 'Заперечення — kein/keine/keinen перед іменником (Akkusativ).', ru: 'Отрицание — kein/keine/keinen перед существительным (Akkusativ).' })
  if (tense === 'vergangen')
    notes.push({ uk: 'Präteritum: brauchte — brauchen у минулому правильний.', ru: 'Präteritum: brauchte — brauchen в прошедшем правильный.' })
  if (tense === 'zukunft')
    notes.push({ uk: 'Futur I: werde … brauchen — інфінітив наприкінці.', ru: 'Futur I: werde … brauchen — инфинитив в конце.' })
  return {
    de, uk, ru,
    tokens: de.replace('.', '').split(' '),
    notes,
    key: `build:${p.id}-brauchen-${n.id}-${tense}-${neg ? 'neg' : 'pos'}`,
  }
}

// --- P4: рух (gehen / kommen) + час ---

function buildMove(pId: string, vId: string, tId: string, tense: Tense, neg: boolean): Built {
  const p = pron(pId)
  const v = verb(vId)
  const t = time(tId)
  if (!p || !v || !t || v.kind !== 'move') throw new Error('move: потрібні займенник, gehen/kommen і час')
  const ukT = t.first ? `${cap(t.uk)} ` : ''
  const ukTm = t.first ? '' : ` ${t.uk}`
  const ruT = t.first ? `${cap(t.ru)} ` : ''
  const ruTm = t.first ? '' : ` ${t.ru}`
  const su = subjUk(p)
  const sr = subjRu(p)
  let de: string
  let uk: string
  let ru: string
  if (tense === 'praesens') {
    de = `${cap(p.deS)} ${v.forms[p.idx]} ${t.de}${neg ? ' nicht' : ''}.`
    uk = `${ukT}${cap(su)}${ukTm} ${neg ? 'не ' : ''}${v.uk6?.[p.idx] ?? ''}.`
    ru = `${ruT}${cap(sr)}${ruTm} ${neg ? 'не ' : ''}${v.ru6?.[p.idx] ?? ''}.`
  } else if (tense === 'vergangen') {
    de = `${cap(p.deS)} ${SEIN_AUX[p.idx]} ${t.de} ${neg ? 'nicht ' : ''}${v.part}.`
    uk = `${ukT}${cap(su)}${ukTm} ${neg ? 'не ' : ''}${ukPastForm(v.ukPastM ?? '', p.pk)}.`
    ru = `${ruT}${cap(sr)}${ruTm} ${neg ? 'не ' : ''}${ruPastForm(v.ruPastM ?? '', p.pk)}.`
  } else {
    de = `${cap(p.deS)} ${WERDEN[p.idx]} ${t.de} ${neg ? 'nicht ' : ''}${v.inf}.`
    uk = `${ukT}${cap(su)}${ukTm} ${neg ? 'не ' : ''}${v.ukFut6?.[p.idx] ?? ''}.`
    ru = `${ruT}${cap(sr)}${ruTm} ${neg ? 'не ' : ''}${ruFut(v, p.idx)}.`
  }
  const notes: { uk: string; ru: string }[] = []
  if (tense === 'praesens')
    notes.push({ uk: 'Просто: підмет + дієслово + обставина часу.', ru: 'Просто: подлежащее + глагол + обстоятельство времени.' })
  if (tense === 'vergangen')
    notes.push({ uk: 'gehen/kommen у Perfekt — завжди з sein: bin … gegangen/gekommen.', ru: 'gehen/kommen в Perfekt — всегда с sein: bin … gegangen/gekommen.' })
  if (tense === 'zukunft')
    notes.push({ uk: 'Futur I: werde … gehen — інфінітив наприкінці.', ru: 'Futur I: werde … gehen — инфинитив в конце.' })
  if (neg)
    notes.push({ uk: '«nicht» наприкінці (перед Partizip II / інфінітивом).', ru: '«nicht» в конце (перед Partizip II / инфинитивом).' })
  return {
    de, uk, ru,
    tokens: de.replace('.', '').split(' '),
    notes,
    key: `build:${p.id}-${v.id}-${t.id}-${tense}-${neg ? 'neg' : 'pos'}`,
  }
}

/** Головна функція: зібрати речення за вибором користувача. */
export function buildSentence(input: BuildInput): Built {
  const v = verb(input.verb ?? '')
  if (!v) throw new Error('Оберіть дієслово')
  if (v.kind === 'sein') return buildSein(input.noun ?? '', input.adj ?? '', input.tense, input.neg)
  if (v.kind === 'haben') return buildHaben(input.pron ?? '', input.noun ?? '', input.tense, input.neg)
  if (v.kind === 'need') return buildNeed(input.pron ?? '', v.id, input.noun ?? '', input.tense, input.neg)
  if (v.kind === 'move')
    return buildMove(input.pron ?? '', v.id, input.time ?? DEFAULT_TIME[input.tense], input.tense, input.neg)
  return buildTrans(input.pron ?? '', v.id, input.noun ?? '', input.time ?? DEFAULT_TIME[input.tense], input.tense, input.neg)
}

// --- допоміжне для UI ---

/** Що вибирає користувач для цього дієслова: 'adj' | 'noun' | 'none' */
export function slotFor(v: CVerb): 'adj' | 'noun' | 'none' {
  if (v.kind === 'sein') return 'adj'
  if (v.kind === 'move') return 'none'
  return 'noun' // haben / trans / need
}

/** Іменники, дозволені з цим дієсловом (порожньо = будь-який) */
export function allowedNouns(v: CVerb): string[] {
  if (v.kind === 'haben') return NOUNS_C.filter((n) => n.habNp).map((n) => n.id)
  if (!v.obj) return []
  return v.obj.map((o) => o.id)
}

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

/** Випадкове граматично коректне речення (для режиму «Тренувати») */
export function randomBuilt(): Built {
  for (let i = 0; i < 60; i++) {
    try {
      const v = pick(VERBS_C)
      const tense = pick<Tense>(['praesens', 'vergangen', 'zukunft'])
      const neg = Math.random() < 0.4
      if (v.kind === 'sein') {
        return buildSentence({ verb: v.id, noun: pick(NOUNS_C).id, adj: pick(ADJS_C).id, tense, neg })
      }
      if (v.kind === 'move') {
        const ts = TIMES_C.filter((t) => t.tenses.includes(tense))
        return buildSentence({ verb: v.id, pron: pick(PRONOUNS_C).id, time: pick(ts).id, tense, neg })
      }
      const allowed = allowedNouns(v)
      if (!allowed.length) continue
      const ts = TIMES_C.filter((t) => t.tenses.includes(tense))
      return buildSentence({
        verb: v.id,
        pron: pick(PRONOUNS_C).id,
        noun: pick(allowed),
        time: pick(ts).id,
        tense,
        neg,
      })
    } catch {
      /* спробувати ще раз */
    }
  }
  return buildSentence({ verb: 'lesen', pron: 'ich', noun: 'buch', time: 'heute', tense: 'praesens', neg: false })
}
