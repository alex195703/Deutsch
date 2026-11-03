// ============================================================
// ДАНІ: дієслова для тренажера відмінювання + шпаргалка
// з граматики A1. Таблиці — звичайні рядки (де uk/ru різняться,
// там «укр / рус» через слеш), пояснення — двомовні поля Bi.
// ============================================================

import type { Bi } from './i18n'

// ---------- ДІЄСЛОВА ----------

export const PRONOUNS = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'] as const

export type Verb = {
  inf: string
  uk: string
  ru: string
  /** форми за PRONOUNS: [ich, du, er/sie/es, wir, ihr, sie/Sie] */
  forms: string[]
  note?: Bi
}

export const VERBS: Verb[] = [
  {
    inf: 'sein', uk: 'бути', ru: 'быть',
    forms: ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'],
    note: { uk: 'Дуже нерегулярний — учимо напамʼять.', ru: 'Очень нерегулярный — учим наизусть.' },
  },
  {
    inf: 'haben', uk: 'мати', ru: 'иметь',
    forms: ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'],
    note: { uk: 'Нерегулярний лише в du та er/sie/es.', ru: 'Нерегулярный только в du и er/sie/es.' },
  },
  {
    inf: 'machen', uk: 'робити', ru: 'делать',
    forms: ['mache', 'machst', 'macht', 'machen', 'macht', 'machen'],
  },
  {
    inf: 'lernen', uk: 'вчити; вчитися', ru: 'учить; учиться',
    forms: ['lerne', 'lernst', 'lernt', 'lernen', 'lernt', 'lernen'],
  },
  {
    inf: 'arbeiten', uk: 'працювати', ru: 'работать',
    forms: ['arbeite', 'arbeitest', 'arbeitet', 'arbeiten', 'arbeitet', 'arbeiten'],
    note: { uk: 'Корінь закінчується на -t/-d → вставне -e-: du arbeitest.', ru: 'Корень оканчивается на -t/-d → вставная -e-: du arbeitest.' },
  },
  {
    inf: 'sprechen', uk: 'говорити', ru: 'говорить',
    forms: ['spreche', 'sprichst', 'spricht', 'sprechen', 'sprecht', 'sprechen'],
    note: { uk: 'Сильне дієслово: голосна змінюється в du та er (e → i).', ru: 'Сильный глагол: гласная меняется в du и er (e → i).' },
  },
  {
    inf: 'lesen', uk: 'читати', ru: 'читать',
    forms: ['lese', 'liest', 'liest', 'lesen', 'lest', 'lesen'],
    note: { uk: 'Сильне дієслово: e → ie в du та er.', ru: 'Сильный глагол: e → ie в du и er.' },
  },
  {
    inf: 'essen', uk: 'їсти', ru: 'есть',
    forms: ['esse', 'isst', 'isst', 'essen', 'esst', 'essen'],
    note: { uk: 'Сильне дієслово: e → i в du та er.', ru: 'Сильный глагол: e → i в du и er.' },
  },
  {
    inf: 'fahren', uk: 'їхати', ru: 'ехать',
    forms: ['fahre', 'fährst', 'fährt', 'fahren', 'fahrt', 'fahren'],
    note: { uk: 'Сильне дієслово: умлаут a → ä в du та er.', ru: 'Сильный глагол: умлаут a → ä в du и er.' },
  },
  {
    inf: 'nehmen', uk: 'брати', ru: 'брать',
    forms: ['nehme', 'nimmst', 'nimmt', 'nehmen', 'nehmt', 'nehmen'],
    note: { uk: 'Сильне дієслово: e → i в du та er.', ru: 'Сильный глагол: e → i в du и er.' },
  },
  {
    inf: 'schlafen', uk: 'спати', ru: 'спать',
    forms: ['schlafe', 'schläfst', 'schläft', 'schlafen', 'schlaft', 'schlafen'],
    note: { uk: 'Сильне дієслово: умлаут a → ä в du та er.', ru: 'Сильный глагол: умлаут a → ä в du и er.' },
  },
  {
    inf: 'heißen', uk: 'зватися', ru: 'зваться; называться',
    forms: ['heiße', 'heißt', 'heißt', 'heißen', 'heißt', 'heißen'],
  },
]

// ---------- ГРАМАТИКА (шпаргалка) ----------

export type GTable = { head: string[]; rows: string[][] }

export type GrammarCard = {
  id: string
  icon: string
  title: Bi
  intro?: Bi
  tables?: GTable[]
  lines?: Bi[]
  examples?: { de: string; tr: string }[]
}

export const GRAMMAR: GrammarCard[] = [
  {
    id: 'pronomen',
    icon: '👤',
    title: { uk: 'Особисті займенники', ru: 'Личные местоимения' },
    intro: {
      uk: 'Три особи однини, три особи множини — плюс ввічливе Sie, яке пишеться з великої літери.',
      ru: 'Три лица единственного числа, три лица множественного — плюс вежливое Sie, которое пишется с большой буквы.',
    },
    tables: [
      {
        head: ['Німецькою', 'Переклад'],
        rows: [
          ['ich', 'я'],
          ['du', 'ти'],
          ['er / sie / es', 'він / вона / воно'],
          ['wir', 'ми'],
          ['ihr', 'ви (група знайомих)'],
          ['sie', 'вони'],
          ['Sie', 'Ви (ввічливе звертання)'],
        ],
      },
    ],
  },
  {
    id: 'sein-haben',
    icon: '⭐',
    title: { uk: 'sein і haben — два головні дієслова', ru: 'sein и haben — два главных глагола' },
    intro: {
      uk: '«Бути» і «мати» потрібні всюді: вік, професія, настрій, наявність речей.',
      ru: '«Быть» и «иметь» нужны везде: возраст, профессия, настроение, наличие вещей.',
    },
    tables: [
      {
        head: ['sein — бути / быть', ''],
        rows: [
          ['ich', 'bin'],
          ['du', 'bist'],
          ['er/sie/es', 'ist'],
          ['wir', 'sind'],
          ['ihr', 'seid'],
          ['sie/Sie', 'sind'],
        ],
      },
      {
        head: ['haben — мати / иметь', ''],
        rows: [
          ['ich', 'habe'],
          ['du', 'hast'],
          ['er/sie/es', 'hat'],
          ['wir', 'haben'],
          ['ihr', 'habt'],
          ['sie/Sie', 'haben'],
        ],
      },
    ],
    examples: [
      { de: 'Ich bin Student.', tr: 'Я студент.' },
      { de: 'Wir haben Zeit.', tr: 'У нас є час. / У нас есть время.' },
    ],
  },
  {
    id: 'praesens',
    icon: '🧩',
    title: { uk: 'Präsens: закінчення дієслів', ru: 'Präsens: окончания глаголов' },
    intro: {
      uk: 'Одна теперішня форма для «я роблю», «я робитиму» і навіть «я робив щойно» — беремо інфінітив, відкидаємо -en і додаємо закінчення.',
      ru: 'Одна настоящая форма для «я делаю», «я сделаю» и даже «я только что делал» — берём инфинитив, отбрасываем -en и добавляем окончание.',
    },
    tables: [
      {
        head: ['Особа', 'Закінчення', 'machen'],
        rows: [
          ['ich', '-e', 'mache'],
          ['du', '-st', 'machst'],
          ['er/sie/es', '-t', 'macht'],
          ['wir', '-en', 'machen'],
          ['ihr', '-t', 'macht'],
          ['sie/Sie', '-en', 'machen'],
        ],
      },
    ],
    lines: [
      {
        uk: 'Корінь на -t/-d → вставне -e-: du arbeitest, er arbeitet, du findest.',
        ru: 'Корень на -t/-d → вставная -e-: du arbeitest, er arbeitet, du findest.',
      },
      {
        uk: 'Сильні дієслова міняють голосну в du та er: sprechen → er spricht, lesen → er liest, essen → er isst, fahren → er fährt, schlafen → er schläft, nehmen → er nimmt.',
        ru: 'Сильные глаголы меняют гласную в du и er: sprechen → er spricht, lesen → er liest, essen → er isst, fahren → er fährt, schlafen → er schläft, nehmen → er nimmt.',
      },
    ],
  },
  {
    id: 'artikel',
    icon: '🚦',
    title: { uk: 'Артиклі та рід іменників', ru: 'Артикли и род существительных' },
    intro: {
      uk: 'Рід у німецької часто не вгадається — його вчать разом зі словом: не «Tisch», а «der Tisch».',
      ru: 'Род в немецком часто не угадывается — его учат вместе со словом: не «Tisch», а «der Tisch».',
    },
    tables: [
      {
        head: ['Рід', 'Артикль', 'Приклад'],
        rows: [
          ['чоловічий / мужской', 'der', 'der Mann'],
          ['жіночий / женский', 'die', 'die Frau'],
          ['середній / средний', 'das', 'das Kind'],
          ['множина / множественное число', 'die', 'die Männer'],
        ],
      },
    ],
    lines: [
      {
        uk: 'Неозначений артикль: ein Mann, eine Frau, ein Kind. Для множини неозначеного артикля немає.',
        ru: 'Неопределённый артикль: ein Mann, eine Frau, ein Kind. Для множественного числа неопределённого артикля нет.',
      },
      {
        uk: 'Підказки роду: -ung, -heit, -keit, -schaft, -tion → зазвичай die; -chen, -lein → завжди das; -er (особи), -ling → часто der.',
        ru: 'Подсказки рода: -ung, -heit, -keit, -schaft, -tion → обычно die; -chen, -lein → всегда das; -er (лица), -ling → часто der.',
      },
    ],
  },
  {
    id: 'akkusativ',
    icon: '🎯',
    title: { uk: 'Akkusativ — прямий додаток', ru: 'Akkusativ — прямое дополнение' },
    intro: {
      uk: 'Що? Кого? Прямий додаток. Змінюється тільки чоловічий рід — der → den, ein → einen.',
      ru: 'Что? Кого? Прямое дополнение. Меняется только мужской род — der → den, ein → einen.',
    },
    tables: [
      {
        head: ['Рід / Род', 'Nominativ', 'Akkusativ'],
        rows: [
          ['чоловічий / мужской', 'der / ein', 'den / einen'],
          ['жіночий / женский', 'die / eine', 'die / eine'],
          ['середній / средний', 'das / ein', 'das / ein'],
          ['множина / множественное число', 'die', 'die'],
        ],
      },
    ],
    examples: [
      { de: 'Ich sehe den Mann.', tr: 'Я бачу чоловіка. / Я вижу мужчину.' },
      { de: 'Ich lese ein Buch.', tr: 'Я читаю книгу.' },
    ],
    lines: [
      {
        uk: 'Після прийменників durch, für, ohne, um, gegen, bis — завжди Akkusativ: für dich, ohne mich, um die Ecke.',
        ru: 'После предлогов durch, für, ohne, um, gegen, bis — всегда Akkusativ: für dich, ohne mich, um die Ecke.',
      },
    ],
  },
  {
    id: 'dativ',
    icon: '🧭',
    title: { uk: 'Dativ і прийменники mit, nach, aus…', ru: 'Dativ и предлоги mit, nach, aus…' },
    intro: {
      uk: 'Кому? З ким? Де? Прийменники mit, nach, aus, zu, von, bei, seit вимагають Dativ.',
      ru: 'Кому? С кем? Где? Предлоги mit, nach, aus, zu, von, bei, seit требуют Dativ.',
    },
    tables: [
      {
        head: ['Рід / Род', 'Nominativ', 'Dativ'],
        rows: [
          ['чоловічий / мужской', 'der / ein', 'dem / einem'],
          ['жіночий / женский', 'die / eine', 'der / einer'],
          ['середній / средний', 'das / ein', 'dem / einem'],
          ['множина / множественное число', 'die', 'den (+ -n)'],
        ],
      },
    ],
    examples: [
      { de: 'Ich fahre mit dem Bus.', tr: 'Їду автобусом. / Еду на автобусе.' },
      { de: 'Sie wohnt bei den Eltern.', tr: 'Вона живе в батьків. / Она живёт у родителей.' },
    ],
    lines: [
      {
        uk: 'Злиті форми: zum = zu dem, zur = zu der, beim = bei dem, vom = von dem.',
        ru: 'Слитные формы: zum = zu dem, zur = zu der, beim = bei dem, vom = von dem.',
      },
    ],
  },
  {
    id: 'negation',
    icon: '🚫',
    title: { uk: 'nicht чи kein?', ru: 'nicht или kein?' },
    intro: {
      uk: 'kein заперечує іменник («немає чогось»), nicht — усе інше.',
      ru: 'kein отрицает существительное («нет чего-то»), nicht — всё остальное.',
    },
    tables: [
      {
        head: ['Форми kein', 'Приклад'],
        rows: [
          ['der → kein', 'Das ist kein Hund.'],
          ['die → keine', 'Ich habe keine Zeit.'],
          ['das → kein', 'Das ist kein Problem.'],
          ['множина / множественное число → keine', 'Wir haben keine Fragen.'],
        ],
      },
    ],
    examples: [
      { de: 'Ich habe kein Auto.', tr: 'У мене немає машини. / У меня нет машины.' },
      { de: 'Er kommt nicht.', tr: 'Він не приходить. / Он не приходит.' },
      { de: 'Das Auto ist nicht neu.', tr: 'Автомобіль не новий. / Машина не новая.' },
    ],
  },
  {
    id: 'wortstellung',
    icon: '🔀',
    title: { uk: 'Порядок слів і питання', ru: 'Порядок слов и вопросы' },
    intro: {
      uk: 'Головне правило: у твердженні дієслово завжди на другому місці, у питанні — на першому.',
      ru: 'Главное правило: в утверждении глагол всегда на втором месте, в вопросе — на первом.',
    },
    lines: [
      {
        uk: 'Твердження: Heute lerne ich Deutsch. — «Heute» перше, тож дієслово друге, а підмет іде після нього.',
        ru: 'Утверждение: Heute lerne ich Deutsch. — «Heute» первое, поэтому глагол второй, а подлежащее идёт после него.',
      },
      {
        uk: 'Питання так/ні: дієслово перше — Kommst du morgen?',
        ru: 'Вопрос да/нет: глагол первый — Kommst du morgen?',
      },
      {
        uk: 'W-питання: W-слово перше, дієслово друге — Wo wohnst du?',
        ru: 'W-вопрос: W-слово первое, глагол второй — Wo wohnst du?',
      },
      {
        uk: 'W-словник: Was? (що), Wo? (де), Wohin? (куди), Woher? (звідки), Wann? (коли), Wer? (хто), Wie? (як), Warum? (чому), Wie viel? (скільки).',
        ru: 'W-словарь: Was? (что), Wo? (где), Wohin? (куда), Woher? (откуда), Wann? (когда), Wer? (кто), Wie? (как), Warum? (почему), Wie viel? (сколько).',
      },
    ],
    examples: [
      { de: 'Wann beginnt der Kurs?', tr: 'Коли починається курс? / Когда начинается курс?' },
    ],
  },
  {
    id: 'modal',
    icon: '🚪',
    title: { uk: 'Модальні дієслова', ru: 'Модальные глаголы' },
    intro: {
      uk: 'Модальне дієслово стоїть на другому місці, а основне — в самому кінці у формі інфінітива.',
      ru: 'Модальный глагол стоит на втором месте, а основной — в самом конце в форме инфинитива.',
    },
    tables: [
      {
        head: ['Особа', 'können (могти / мочь)', 'müssen (мусити / должен)', 'wollen (хотіти / хотеть)', 'möchten (хотів би / хотел бы)'],
        rows: [
          ['ich', 'kann', 'muss', 'will', 'möchte'],
          ['du', 'kannst', 'musst', 'willst', 'möchtest'],
          ['er/sie/es', 'kann', 'muss', 'will', 'möchte'],
          ['wir', 'können', 'müssen', 'wollen', 'möchten'],
          ['ihr', 'könnt', 'müsst', 'wollt', 'möchtet'],
          ['sie/Sie', 'können', 'müssen', 'wollen', 'möchten'],
        ],
      },
    ],
    examples: [
      { de: 'Ich kann gut kochen.', tr: 'Я вмію добре готувати. / Я умею хорошо готовить.' },
      { de: 'Du musst heute arbeiten.', tr: 'Ти сьогодні мусиш працювати. / Ты сегодня должен работать.' },
    ],
    lines: [
      {
        uk: 'Ще два на майбутнє: dürfen (можна, дозволено) — ich darf, та mögen (любити) — ich mag.',
        ru: 'Ещё два на будущее: dürfen (можно, разрешено) — ich darf, и mögen (любить) — ich mag.',
      },
    ],
  },
  {
    id: 'plural',
    icon: '📦',
    title: { uk: 'Множина іменників', ru: 'Множественное число' },
    intro: {
      uk: 'Єдине правило: у множині всі іменники з артиклем die. А самі форми доводиться запамʼятовувати.',
      ru: 'Единое правило: во множественном числе все существительные с артиклем die. А сами формы приходится запоминать.',
    },
    tables: [
      {
        head: ['Тип', 'Приклад'],
        rows: [
          ['-e', 'der Tisch → die Tische'],
          ['-er (+ умлаут)', 'das Kind → die Kinder'],
          ['-n / -en', 'die Frau → die Frauen'],
          ['-s (іноземні слова / иностранные слова)', 'das Auto → die Autos'],
          ['без зміни / без изменения', 'der Lehrer → die Lehrer'],
        ],
      },
    ],
    examples: [{ de: 'die Kinder spielen', tr: 'діти граються / дети играют' }],
  },
  {
    id: 'zahlen',
    icon: '🔢',
    title: { uk: 'Числа від 1 до 100', ru: 'Числа от 1 до 100' },
    intro: {
      uk: '1–12 — база, далі числа будуються за чіткими схемами.',
      ru: '1–12 — база, дальше числа строятся по чётким схемам.',
    },
    lines: [
      {
        uk: '1–12 учимо напамʼять: eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn, elf, zwölf.',
        ru: '1–12 учим наизусть: eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn, elf, zwölf.',
      },
      {
        uk: '13–19: + zehn → dreizehn (13), vierzehn (14), fünfzehn (15) …',
        ru: '13–19: + zehn → dreizehn (13), vierzehn (14), fünfzehn (15) …',
      },
      {
        uk: 'Десятки: zwanzig (20), dreißig (30 — з ß!), vierzig (40), fünfzig (50) …',
        ru: 'Десятки: zwanzig (20), dreißig (30 — с ß!), vierzig (40), fünfzig (50) …',
      },
      {
        uk: '21+: одиниці + und + десятки, одним словом: einundzwanzig (21), dreiundvierzig (43), achtundsechzig (68).',
        ru: '21+: единицы + und + десятки, одним словом: einundzwanzig (21), dreiundvierzig (43), achtundsechzig (68).',
      },
      {
        uk: 'Телефон читають парами цифр: 25 87 → fünfundzwanzig siebenundachtzig.',
        ru: 'Телефон читают парами цифр: 25 87 → fünfundzwanzig siebenundachtzig.',
      },
    ],
  },
]
