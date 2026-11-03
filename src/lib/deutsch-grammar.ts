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
  /** er/sie/es у Präteritum — для вправ середнього рівня */
  pret3?: string
  /** Partizip II — для вправ на Perfekt */
  part?: string
  /** допоміжне дієслово для Perfekt */
  aux?: 'haben' | 'sein'
  note?: Bi
}

export const VERBS: Verb[] = [
  {
    inf: 'sein', uk: 'бути', ru: 'быть',
    forms: ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'],
    pret3: 'war', part: 'gewesen', aux: 'sein',
    note: { uk: 'Дуже нерегулярний — учимо напамʼять.', ru: 'Очень нерегулярный — учим наизусть.' },
  },
  {
    inf: 'haben', uk: 'мати', ru: 'иметь',
    forms: ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'],
    pret3: 'hatte', part: 'gehabt', aux: 'haben',
    note: { uk: 'Нерегулярний лише в du та er/sie/es.', ru: 'Нерегулярный только в du и er/sie/es.' },
  },
  {
    inf: 'machen', uk: 'робити', ru: 'делать',
    forms: ['mache', 'machst', 'macht', 'machen', 'macht', 'machen'],
    pret3: 'machte', part: 'gemacht', aux: 'haben',
  },
  {
    inf: 'lernen', uk: 'вчити; вчитися', ru: 'учить; учиться',
    forms: ['lerne', 'lernst', 'lernt', 'lernen', 'lernt', 'lernen'],
    pret3: 'lernte', part: 'gelernt', aux: 'haben',
  },
  {
    inf: 'arbeiten', uk: 'працювати', ru: 'работать',
    forms: ['arbeite', 'arbeitest', 'arbeitet', 'arbeiten', 'arbeitet', 'arbeiten'],
    pret3: 'arbeitete', part: 'gearbeitet', aux: 'haben',
    note: { uk: 'Корінь закінчується на -t/-d → вставне -e-: du arbeitest.', ru: 'Корень оканчивается на -t/-d → вставная -e-: du arbeitest.' },
  },
  {
    inf: 'sprechen', uk: 'говорити', ru: 'говорить',
    forms: ['spreche', 'sprichst', 'spricht', 'sprechen', 'sprecht', 'sprechen'],
    pret3: 'sprach', part: 'gesprochen', aux: 'haben',
    note: { uk: 'Сильне дієслово: голосна змінюється в du та er (e → i).', ru: 'Сильный глагол: гласная меняется в du и er (e → i).' },
  },
  {
    inf: 'lesen', uk: 'читати', ru: 'читать',
    forms: ['lese', 'liest', 'liest', 'lesen', 'lest', 'lesen'],
    pret3: 'las', part: 'gelesen', aux: 'haben',
    note: { uk: 'Сильне дієслово: e → ie в du та er.', ru: 'Сильный глагол: e → ie в du и er.' },
  },
  {
    inf: 'essen', uk: 'їсти', ru: 'есть',
    forms: ['esse', 'isst', 'isst', 'essen', 'esst', 'essen'],
    pret3: 'aß', part: 'gegessen', aux: 'haben',
    note: { uk: 'Сильне дієслово: e → i в du та er.', ru: 'Сильный глагол: e → i в du и er.' },
  },
  {
    inf: 'fahren', uk: 'їхати', ru: 'ехать',
    forms: ['fahre', 'fährst', 'fährt', 'fahren', 'fahrt', 'fahren'],
    pret3: 'fuhr', part: 'gefahren', aux: 'sein',
    note: { uk: 'Сильне дієслово: умлаут a → ä в du та er.', ru: 'Сильный глагол: умлаут a → ä в du и er.' },
  },
  {
    inf: 'nehmen', uk: 'брати', ru: 'брать',
    forms: ['nehme', 'nimmst', 'nimmt', 'nehmen', 'nehmt', 'nehmen'],
    pret3: 'nahm', part: 'genommen', aux: 'haben',
    note: { uk: 'Сильне дієслово: e → i в du та er.', ru: 'Сильный глагол: e → i в du и er.' },
  },
  {
    inf: 'schlafen', uk: 'спати', ru: 'спать',
    forms: ['schlafe', 'schläfst', 'schläft', 'schlafen', 'schlaft', 'schlafen'],
    pret3: 'schlief', part: 'geschlafen', aux: 'haben',
    note: { uk: 'Сильне дієслово: умлаут a → ä в du та er.', ru: 'Сильный глагол: умлаут a → ä в du и er.' },
  },
  {
    inf: 'heißen', uk: 'зватися', ru: 'зваться; называться',
    forms: ['heiße', 'heißt', 'heißt', 'heißen', 'heißt', 'heißen'],
    pret3: 'hieß', part: 'geheißen', aux: 'haben',
  },
  {
    inf: 'kommen', uk: 'приходити', ru: 'приходить',
    forms: ['komme', 'kommst', 'kommt', 'kommen', 'kommt', 'kommen'],
    pret3: 'kam', part: 'gekommen', aux: 'sein',
  },
  {
    inf: 'gehen', uk: 'іти', ru: 'идти',
    forms: ['gehe', 'gehst', 'geht', 'gehen', 'geht', 'gehen'],
    pret3: 'ging', part: 'gegangen', aux: 'sein',
  },
  {
    inf: 'bleiben', uk: 'залишатися', ru: 'оставаться',
    forms: ['bleibe', 'bleibst', 'bleibt', 'bleiben', 'bleibt', 'bleiben'],
    pret3: 'blieb', part: 'geblieben', aux: 'sein',
  },
  {
    inf: 'sehen', uk: 'бачити', ru: 'видеть',
    forms: ['sehe', 'siehst', 'sieht', 'sehen', 'seht', 'sehen'],
    pret3: 'sah', part: 'gesehen', aux: 'haben',
    note: { uk: 'Сильне: e → ie в du та er.', ru: 'Сильный: e → ie в du и er.' },
  },
  {
    inf: 'geben', uk: 'давати', ru: 'давать',
    forms: ['gebe', 'gibst', 'gibt', 'geben', 'gebt', 'geben'],
    pret3: 'gab', part: 'gegeben', aux: 'haben',
  },
  {
    inf: 'finden', uk: 'знаходити', ru: 'находить',
    forms: ['finde', 'findest', 'findet', 'finden', 'findet', 'finden'],
    pret3: 'fand', part: 'gefunden', aux: 'haben',
  },
  {
    inf: 'bringen', uk: 'приносити', ru: 'приносить',
    forms: ['bringe', 'bringst', 'bringt', 'bringen', 'bringt', 'bringen'],
    pret3: 'brachte', part: 'gebracht', aux: 'haben',
  },
  {
    inf: 'denken', uk: 'думати', ru: 'думать',
    forms: ['denke', 'denkst', 'denkt', 'denken', 'denkt', 'denken'],
    pret3: 'dachte', part: 'gedacht', aux: 'haben',
  },
  {
    inf: 'wissen', uk: 'знати', ru: 'знать',
    forms: ['weiß', 'weißt', 'weiß', 'wissen', 'wisst', 'wissen'],
    pret3: 'wusste', part: 'gewusst', aux: 'haben',
    note: { uk: 'Нерегулярний: ich weiß без закінчення -e.', ru: 'Нерегулярный: ich weiß без окончания -e.' },
  },
  {
    inf: 'kennen', uk: 'бути знайомим (з кимось)', ru: 'быть знакомым (с кем-то)',
    forms: ['kenne', 'kennst', 'kennt', 'kennen', 'kennt', 'kennen'],
    pret3: 'kannte', part: 'gekannt', aux: 'haben',
  },
  {
    inf: 'werden', uk: 'ставати; допоміжне (майбутній час)', ru: 'становиться; вспомогательный (будущее время)',
    forms: ['werde', 'wirst', 'wird', 'werden', 'werdet', 'werden'],
    pret3: 'wurde', part: 'geworden', aux: 'sein',
    note: { uk: 'du wirst, er wird — учи окремо.', ru: 'du wirst, er wird — учи отдельно.' },
  },
  {
    inf: 'können', uk: 'могти (уміти)', ru: 'мочь (уметь)',
    forms: ['kann', 'kannst', 'kann', 'können', 'könnt', 'können'],
    pret3: 'konnte', part: 'gekonnt', aux: 'haben',
    note: { uk: 'Модальне: ich та er однакові.', ru: 'Модальный: ich и er одинаковые.' },
  },
  {
    inf: 'müssen', uk: 'бути зобовʼязаним (мусити)', ru: 'быть обязанным (должен)',
    forms: ['muss', 'musst', 'muss', 'müssen', 'müsst', 'müssen'],
    pret3: 'musste', part: 'gemusst', aux: 'haben',
  },
  {
    inf: 'dürfen', uk: 'мати дозвіл (можна)', ru: 'иметь разрешение (можно)',
    forms: ['darf', 'darfst', 'darf', 'dürfen', 'dürft', 'dürfen'],
    pret3: 'durfte', part: 'gedurft', aux: 'haben',
  },
  {
    inf: 'wollen', uk: 'хотіти (маю намір)', ru: 'хотеть (имею намерение)',
    forms: ['will', 'willst', 'will', 'wollen', 'wollt', 'wollen'],
    pret3: 'wollte', part: 'gewollt', aux: 'haben',
  },
  {
    inf: 'sollen', uk: 'мати вказівку (слід)', ru: 'иметь указание (следует)',
    forms: ['soll', 'sollst', 'soll', 'sollen', 'sollt', 'sollen'],
    pret3: 'sollte', part: 'gesollt', aux: 'haben',
  },
  {
    inf: 'mögen', uk: 'любити (щось)', ru: 'любить (что-то)',
    forms: ['mag', 'magst', 'mag', 'mögen', 'mögt', 'mögen'],
    pret3: 'mochte', part: 'gemocht', aux: 'haben',
  },
  {
    inf: 'möchten', uk: 'хотів би (ввічливо)', ru: 'хотел бы (вежливо)',
    forms: ['möchte', 'möchtest', 'möchte', 'möchten', 'möchtet', 'möchten'],
    pret3: 'wollte', part: 'gewollt', aux: 'haben',
    note: { uk: 'Ввічлива форма від mögen.', ru: 'Вежливая форма от mögen.' },
  },
  {
    inf: 'kaufen', uk: 'купувати', ru: 'покупать',
    forms: ['kaufe', 'kaufst', 'kauft', 'kaufen', 'kauft', 'kaufen'],
    pret3: 'kaufte', part: 'gekauft', aux: 'haben',
  },
  {
    inf: 'wohnen', uk: 'жити (проживати)', ru: 'жить (проживать)',
    forms: ['wohne', 'wohnst', 'wohnt', 'wohnen', 'wohnt', 'wohnen'],
    pret3: 'wohnte', part: 'gewohnt', aux: 'haben',
  },
  {
    inf: 'fragen', uk: 'питати', ru: 'спрашивать',
    forms: ['frage', 'fragst', 'fragt', 'fragen', 'fragt', 'fragen'],
    pret3: 'fragte', part: 'gefragt', aux: 'haben',
  },
  {
    inf: 'antworten', uk: 'відповідати', ru: 'отвечать',
    forms: ['antworte', 'antwortest', 'antwortet', 'antworten', 'antwortet', 'antworten'],
    pret3: 'antwortete', part: 'geantwortet', aux: 'haben',
  },
  {
    inf: 'trinken', uk: 'пити', ru: 'пить',
    forms: ['trinke', 'trinkst', 'trinkt', 'trinken', 'trinkt', 'trinken'],
    pret3: 'trank', part: 'getrunken', aux: 'haben',
  },
  {
    inf: 'laufen', uk: 'бігти; іти пішки', ru: 'бежать; идти пешком',
    forms: ['laufe', 'läufst', 'läuft', 'laufen', 'lauft', 'laufen'],
    pret3: 'lief', part: 'gelaufen', aux: 'sein',
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

  // ==================== A2 ====================

  {
    id: 'perfekt',
    icon: '⏳',
    title: { uk: 'Perfekt — розмовне минуле', ru: 'Perfekt — разговорное прошедшее' },
    intro: {
      uk: 'У розмові минуле майже завжди через Perfekt: haben/sein (на 2-му місці) + Partizip II (в кінці).',
      ru: 'В разговоре прошедшее почти всегда через Perfekt: haben/sein (на 2-м месте) + Partizip II (в конце).',
    },
    tables: [
      {
        head: ['Форма', 'Приклад'],
        rows: [
          ['слабкі дієслова', 'ge- + основа + -t: machen → gemacht'],
          ['сильні дієслова', 'ge- + (змінена) основа + -en: sprechen → gesprochen'],
          ['на -ieren (без ge-)', 'studieren → studiert'],
          ['з sein (рух/зміна)', 'gehen → gegangen, aufstehen → aufgestanden'],
        ],
      },
      {
        head: ['Речення', 'Переклад'],
        rows: [
          ['Ich habe Deutsch gelernt.', 'Я вчив німецьку. / Я учил немецкий.'],
          ['Wir sind nach Berlin gefahren.', 'Ми їздили до Берліна. / Мы ездили в Берлин.'],
          ['Hast du das gesehen?', 'Ти це бачив? / Ты это видел?'],
        ],
      },
    ],
    lines: [
      { uk: 'sein — коли є рух (gehen, fahren, fliegen) або зміна стану (aufstehen, einschlafen, werden).', ru: 'sein — когда есть движение (gehen, fahren, fliegen) или изменение состояния (aufstehen, einschlafen, werden).' },
      { uk: 'Віддільні приставки: ge- у середині — anrufen → angerufen.', ru: 'Отделяемые приставки: ge- в середине — anrufen → angerufen.' },
    ],
  },
  {
    id: 'praeteritum',
    icon: '📜',
    title: { uk: 'Präteritum — минуле в розповіді', ru: 'Präteritum — прошедшее в рассказе' },
    intro: {
      uk: 'Письмова/розповідна форма минулого. Найпотрібніші: war, hatte, es gab та модальні.',
      ru: 'Письменная/повествовательная форма прошедшего. Самые нужные: war, hatte, es gab и модальные.',
    },
    tables: [
      {
        head: ['Інфінітив', 'er-форма', 'Значення'],
        rows: [
          ['sein →', 'war', 'був / был'],
          ['haben →', 'hatte', 'мав / имел'],
          ['es geben →', 'es gab', 'було (існувало) / было'],
          ['können →', 'konnte', 'міг / мог'],
          ['müssen →', 'musste', 'мусив / должен'],
          ['wollen →', 'wollte', 'хотів / хотел'],
          ['machen →', 'machte', 'робив / делал'],
          ['sprechen →', 'sprach', 'говорив / говорил'],
        ],
      },
    ],
    lines: [
      { uk: 'Слабкі дієслова: основа + -te (lernte, arbeitete). Сильні — зі зміною кореня (fuhr, kam, las).', ru: 'Слабые глаголы: основа + -te (lernte, arbeitete). Сильные — с изменением корня (fuhr, kam, las).' },
      { uk: 'У розмові Präteritum живе у war/hatte/konnte/musste/wollte — решта через Perfekt.', ru: 'В разговоре Präteritum живёт в war/hatte/konnte/musste/wollte — остальное через Perfekt.' },
    ],
  },
  {
    id: 'dativ-osnovy',
    icon: '🎁',
    title: { uk: 'Dativ — кому? чому?', ru: 'Dativ — кому? чему?' },
    intro: {
      uk: 'Dativ відповідає на питання «кому?». Артикль змінюється в усіх родах, а в множині додається -n.',
      ru: 'Dativ отвечает на вопрос «кому?». Артикль меняется во всех родах, а во множественном добавляется -n.',
    },
    tables: [
      {
        head: ['Рід', 'Nominativ', 'Dativ'],
        rows: [
          ['чоловічий', 'der Mann', 'dem Mann'],
          ['жіночий', 'die Frau', 'der Frau'],
          ['середній', 'das Kind', 'dem Kind'],
          ['множина', 'die Leute', 'den Leuten'],
        ],
      },
      {
        head: ['Займенники', 'Dativ'],
        rows: [
          ['ich →', 'mir'],
          ['du →', 'dir'],
          ['er/es →', 'ihm'],
          ['sie →', 'ihr'],
          ['wir →', 'uns'],
          ['ihr →', 'euch'],
          ['sie/Sie →', 'ihnen/Ihnen'],
        ],
      },
    ],
    lines: [
      { uk: 'Дієслова з Dativ без прийменника: helfen, danken, gefallen, gehören, passen, antworten, gratulieren.', ru: 'Глаголы с Dativ без предлога: helfen, danken, gefallen, gehören, passen, antworten, gratulieren.' },
      { uk: 'Приклад: Ich helfe dem Mann. Das gehört mir. Der Film gefällt mir.', ru: 'Пример: Ich helfe dem Mann. Das gehört mir. Der Film gefällt mir.' },
    ],
  },
  {
    id: 'wechselpr',
    icon: '🔄',
    title: { uk: 'Wechselpräpositionen: in, an, auf …', ru: 'Wechselpräpositionen: in, an, auf …' },
    intro: {
      uk: 'Девʼять прийменників міняють відмінок: куди? → Akkusativ, де? → Dativ.',
      ru: 'Девять предлогов меняют падеж: куда? → Akkusativ, где? → Dativ.',
    },
    tables: [
      {
        head: ['Питання', 'Відмінок', 'Приклад'],
        rows: [
          ['Wohin? (куди?)', 'Akkusativ', 'Ich gehe in die Stadt.'],
          ['Wo? (де?)', 'Dativ', 'Ich bin in der Stadt.'],
        ],
      },
      {
        head: ['Прийменники', 'Переклад'],
        rows: [
          ['in, an, auf', 'в/у, на (при), на'],
          ['hinter, neben, über, unter', 'за, поруч, над, під'],
          ['vor, zwischen', 'перед, між'],
        ],
      },
    ],
    lines: [
      { uk: 'Чоловічий рід: in den (Akk) / in dem = im (Dat). Жіночий: in die / in der. Середній: in das = ins / in dem = im.', ru: 'Мужской род: in den (Akk) / in dem = im (Dat). Женский: in die / in der. Средний: in das = ins / in dem = im.' },
    ],
  },
  {
    id: 'nebensaetze',
    icon: '🧩',
    title: { uk: 'Nebensätze: weil, dass, wenn', ru: 'Nebensätze: weil, dass, wenn' },
    intro: {
      uk: 'У підрядному реченні дієслово йде в САМИЙ КІНЕЦЬ. Сполучник стоїть на першому місці підрядного.',
      ru: 'В придаточном предложении глагол уходит в САМЫЙ КОНЕЦ. Союз стоит на первом месте придаточного.',
    },
    tables: [
      {
        head: ['Сполучник', 'Значення', 'Приклад'],
        rows: [
          ['weil', 'бо (причина)', 'Ich lerne Deutsch, weil ich in Deutschland arbeite.'],
          ['dass', 'що', 'Ich denke, dass das stimmt.'],
          ['wenn', 'коли / якщо', 'Wenn das Wetter schön ist, gehen wir spazieren.'],
          ['obwohl', 'хоча', 'Obwohl es regnet, gehe ich laufen.'],
        ],
      },
    ],
    lines: [
      { uk: 'weil ≠ denn: обидва = «бо», але після denn порядок слів звичайний (denn це «сполучник-позиція 0»).', ru: 'weil ≠ denn: оба = «потому что», но после denn порядок слов обычный (denn — союз «позиции 0»).' },
      { uk: 'Віддільна приставка в підрядному приєднується: …, weil ich früh aufstehe.', ru: 'Отделяемая приставка в придаточном присоединяется: …, weil ich früh aufstehe.' },
    ],
  },
  {
    id: 'komparation',
    icon: '📊',
    title: { uk: 'Ступені порівняння', ru: 'Степени сравнения' },
    intro: {
      uk: 'positive – komparativ (…er) – superlativ (am …sten). Часто з умлаутом.',
      ru: 'positive – komparativ (…er) – superlativ (am …sten). Часто с умлаутом.',
    },
    tables: [
      {
        head: ['Базовий', 'Порівняння', 'Найвищий'],
        rows: [
          ['groß', 'größer', 'am größten'],
          ['gut', 'besser', 'am besten'],
          ['viel', 'mehr', 'am meisten'],
          ['gern', 'lieber', 'am liebsten'],
          ['hoch', 'höher', 'am höchsten'],
          ['nah', 'näher', 'am nächsten'],
          ['schön', 'schöner', 'am schönsten'],
          ['interessant', 'interessanter', 'am interessantesten'],
        ],
      },
    ],
    lines: [
      { uk: 'Порівняння з als: Berlin ist größer als Bonn. Однаковість: so … wie — er ist so groß wie ich.', ru: 'Сравнение с als: Berlin ist größer als Bonn. Равенство: so … wie — er ist so groß wie ich.' },
    ],
  },
  {
    id: 'modal-praet',
    icon: '🕰️',
    title: { uk: 'Модальні в Präteritum', ru: 'Модальные в Präteritum' },
    intro: {
      uk: 'Модальні в минулому зручно брати з Präteritum (не Perfekt): ich konnte, ich musste, ich wollte.',
      ru: 'Модальные в прошедшем удобно брать из Präteritum (не Perfekt): ich konnte, ich musste, ich wollte.',
    },
    tables: [
      {
        head: ['Присутній', 'Минуле (ich/er)', 'Значення'],
        rows: [
          ['können', 'konnte', 'міг / мог'],
          ['müssen', 'musste', 'мусив / должен был'],
          ['dürfen', 'durfte', 'мав дозвіл / имел разрешение'],
          ['wollen', 'wollte', 'хотів / хотел'],
          ['sollen', 'sollte', 'мав зробити / должен был сделать'],
          ['mögen', 'mochte', 'любив / любил'],
        ],
      },
    ],
    lines: [
      { uk: 'Формула: Präteritum + інфінітив у кінці: Ich musste gestern lange arbeiten.', ru: 'Формула: Präteritum + инфинитив в конце: Ich musste gestern lange arbeiten.' },
    ],
  },
  {
    id: 'reflexiv',
    icon: '🪞',
    title: { uk: 'Зворотні дієслова (sich …)', ru: 'Возвратные глаголы (sich …)' },
    intro: {
      uk: 'Дія спрямована на себе: sich freuen — радіти. Займенник узгоджується з підметом.',
      ru: 'Действие направлено на себя: sich freuen — радоваться. Местоимение согласуется с подлежащим.',
    },
    tables: [
      {
        head: ['Підмет', 'Akkusativ-займенник'],
        rows: [
          ['ich', 'mich'],
          ['du', 'dich'],
          ['er/sie/es', 'sich'],
          ['wir', 'uns'],
          ['ihr', 'euch'],
          ['sie/Sie', 'sich'],
        ],
      },
      {
        head: ['Дієслово', 'Значення'],
        rows: [
          ['sich freuen (über)', 'радіти (чомусь)'],
          ['sich treffen (mit)', 'зустрічатися (з)'],
          ['sich waschen', 'митися'],
          ['sich interessieren (für)', 'цікавитися (чимось)'],
          ['sich erholen', 'відпочивати, відновлюватися'],
          ['sich verspäten', 'запізнюватися'],
        ],
      },
    ],
    lines: [
      { uk: 'Ich freue mich. Du freust dich. Er freut sich. Wir freuen uns.', ru: 'Ich freue mich. Du freust dich. Er freut sich. Wir freuen uns.' },
    ],
  },
  {
    id: 'konjunktiv2',
    icon: '🙏',
    title: { uk: 'Konjunktiv II — ввічливість і бажання', ru: 'Konjunktiv II — вежливость и желания' },
    intro: {
      uk: '«Хотів би», «чи не могли б ви», «якби». Форми: wäre, hätte, könnte, würde + інфінітив.',
      ru: '«Хотел бы», «не могли бы вы», «если бы». Формы: wäre, hätte, könnte, würde + инфинитив.',
    },
    tables: [
      {
        head: ['Форма', 'Значення', 'Приклад'],
        rows: [
          ['würde … machen', 'зробив би', 'Ich würde gern mehr reisen.'],
          ['hätte', 'мав би', 'Ich hätte eine Frage.'],
          ['wäre', 'був би', 'Das wäre super!'],
          ['könnte', 'міг би', 'Könnten Sie mir helfen?'],
        ],
      },
    ],
    lines: [
      { uk: 'Ввічливе прохання: Könnten Sie bitte …? / Würden Sie bitte …? — мʼякше за kann/darf.', ru: 'Вежливая просьба: Könnten Sie bitte …? / Würden Sie bitte …? — мягче, чем kann/darf.' },
      { uk: 'Нереальне бажання: Wenn ich Zeit hätte, würde ich mehr lernen.', ru: 'Нереальное желание: Wenn ich Zeit hätte, würde ich mehr lernen.' },
    ],
  },
  {
    id: 'pluralmuster',
    icon: '➕',
    title: { uk: 'Множина: 5 головних моделей', ru: 'Множественное число: 5 главных моделей' },
    intro: {
      uk: 'Пʼять моделей покривають майже всі іменники. Множина завжди з die.',
      ru: 'Пять моделей покрывают почти все существительные. Множественное всегда с die.',
    },
    tables: [
      {
        head: ['Модель', 'Приклади'],
        rows: [
          ['-e (часто з умлаутом)', 'der Tisch → die Tische; der Stuhl → die Stühle'],
          ['-er / ¨-er', 'das Kind → die Kinder; das Buch → die Bücher'],
          ['-(e)n', 'die Frau → die Frauen; die Lampe → die Lampen'],
          ['-s (іншомовні)', 'das Auto → die Autos; das Handy → die Handys'],
          ['без закінчення (умлаут може зʼявитися)', 'der Lehrer → die Lehrer; der Apfel → die Äpfel'],
        ],
      },
    ],
    lines: [
      { uk: 'Слова на -er/-en/-el часто без закінчення. Жіночі на -ung/-heit/-keit/-ion → -en.', ru: 'Слова на -er/-en/-el часто без окончания. Женские на -ung/-heit/-keit/-ion → -en.' },
    ],
  },
  {
    id: 'verben-praep',
    icon: '🔗',
    title: { uk: 'Дієслова з прийменниками', ru: 'Глаголы с предлогами' },
    intro: {
      uk: 'Ці звʼязки треба вчити напамʼять: прийменник визначає відмінок.',
      ru: 'Эти связки надо учить наизусть: предлог определяет падеж.',
    },
    tables: [
      {
        head: ['Дієслово', 'Відмінок', 'Приклад'],
        rows: [
          ['warten auf', 'Akkusativ', 'Ich warte auf den Bus.'],
          ['sich freuen auf', 'Akkusativ', 'Ich freue mich auf den Urlaub.'],
          ['sich ärgern über', 'Akkusativ', 'Er ärgert sich über den Lärm.'],
          ['denken an', 'Akkusativ', 'Ich denke an dich.'],
          ['teilnehmen an', 'Dativ', 'Wir nehmen am Kurs teil.'],
          ['helfen bei', 'Dativ', 'Er hilft mir bei den Hausaufgaben.'],
          ['träumen von', 'Dativ', 'Ich träume von der Reise.'],
          ['abhängen von', 'Dativ', 'Das hängt vom Wetter ab.'],
          ['sich interessieren für', 'Akkusativ', 'Sie interessiert sich für Kunst.'],
          ['sich kümmern um', 'Akkusativ', 'Ich kümmere mich um den Hund.'],
        ],
      },
    ],
  },
  {
    id: 'zeitpraep',
    icon: '🕐',
    title: { uk: 'Часові прийменники: um, am, im', ru: 'Временные предлоги: um, am, im' },
    intro: {
      uk: 'Три головні: um — точний час, am — день/дата, im — місяць/пора року.',
      ru: 'Три главных: um — точное время, am — день/дата, im — месяц/время года.',
    },
    tables: [
      {
        head: ['Прийменник', 'Використання', 'Приклад'],
        rows: [
          ['um', 'година', 'Der Zug fährt um 8 Uhr.'],
          ['am', 'день, дата, частина доби з Artikel', 'am Montag, am 3. Mai, am Abend'],
          ['im', 'місяць, пора року', 'im Juli, im Winter'],
          ['seit', 'з (до цих пір)', 'seit einem Jahr'],
          ['von … bis', 'від … до', 'von Montag bis Freitag'],
          ['vor / nach', 'до / після', 'vor dem Essen, nach der Arbeit'],
        ],
      },
    ],
    lines: [
      { uk: 'Виключення: die Nacht → in der Nacht, але am Abend, am Morgen.', ru: 'Исключение: die Nacht → in der Nacht, но am Abend, am Morgen.' },
    ],
  },

  // ==================== B1 ====================

  {
    id: 'adjdekl',
    icon: '🎨',
    title: { uk: 'Відмінювання прикметників', ru: 'Склонение прилагательных' },
    intro: {
      uk: 'Закінчення прикметника залежить від артикля перед ним. Ключ: чи показує артикль рід/відмінок сам.',
      ru: 'Окончание прилагательного зависит от артикля перед ним. Ключ: показывает ли артикль род/падеж сам.',
    },
    tables: [
      {
        head: ['Тип', 'Nominativ', 'Akkusativ', 'Dativ'],
        rows: [
          ['після der/die/das', 'der gut(e) Mann (немає -er)', 'den guten Mann', 'dem guten Mann'],
          ['після ein/kein/mein', 'ein guter Mann', 'einen guten Mann', 'einem guten Mann'],
          ['без артикля', 'guter Wein', 'guten Wein', 'gutem Wein'],
        ],
      },
      {
        head: ['Жіночий/середній (приклади)'],
        rows: [
          ['die schöne Frau / eine schöne Frau'],
          ['das alte Haus / ein altes Haus'],
          ['mit der schönen Frau / mit einem alten Haus'],
        ],
      },
    ],
    lines: [
      { uk: 'Правило великого пальця: після der/die/das прикметник береться -e/-en; після ein — «артиклеві» закінчення переходять на прикметник (ein guter Mann).', ru: 'Правило большого пальца: после der/die/das прилагательное берёт -e/-en; после ein — «артиклевые» окончания переходят на прилагательное (ein guter Mann).' },
    ],
  },
  {
    id: 'passiv',
    icon: '⚙️',
    title: { uk: 'Passiv — пасивний стан', ru: 'Passiv — пассивный залог' },
    intro: {
      uk: 'Важлива дія, а не той, хто робить: werden + Partizip II (в кінці).',
      ru: 'Важно действие, а не тот, кто делает: werden + Partizip II (в конце).',
    },
    tables: [
      {
        head: ['Час', 'Формула', 'Приклад'],
        rows: [
          ['Präsens', 'wird + Partizip II', 'Das Auto wird repariert.'],
          ['Präteritum', 'wurde + Partizip II', 'Das Auto wurde repariert.'],
          ['Perfekt', 'ist … worden', 'Das Auto ist repariert worden.'],
          ['з модальним', 'muss + Partizip II + werden', 'Das muss morgen gemacht werden.'],
        ],
      },
    ],
    lines: [
      { uk: 'Той, хто виконує дію, — через von (+ Dativ) або durch: Das Haus wird von einem Architekten geplant.', ru: 'Тот, кто выполняет действие, — через von (+ Dativ) или durch: Das Haus wird von einem Architekten geplant.' },
      { uk: 'Безособовий пасив: Hier wird nicht geraucht. (тут не палять)', ru: 'Безличный пассив: Hier wird nicht geraucht. (здесь не курят)' },
    ],
  },
  {
    id: 'relativ',
    icon: '🧵',
    title: { uk: 'Relativsätze — зʼясувальні підрядні', ru: 'Relativsätze — определительные придаточные' },
    intro: {
      uk: 'Der/die/das + закінчення за родом і відмінком СЛОВА, до якого вони стосуються; дієслово — в кінці.',
      ru: 'Der/die/das + окончание по роду и падежу СЛОВА, к которому они относятся; глагол — в конце.',
    },
    tables: [
      {
        head: ['Речення', 'Розбір'],
        rows: [
          ['Der Mann, der dort steht, ist mein Nachbar.', 'der = чол. рід, Nominativ (робить дію)'],
          ['Die Frau, die ich gestern traf, …', 'die = жін. рід, Akkusativ (trifft wen?)'],
          ['Das Buch, das mir gefällt, …', 'das = сер. рід, Dativ (gefällt wem?)'],
        ],
      },
    ],
    lines: [
      { uk: 'Прийменник стає перед відносним займенником: Die Stadt, in der ich wohne, ist klein.', ru: 'Предлог ставится перед относительным местоимением: Die Stadt, in der ich wohne, ist klein.' },
      { uk: 'Для людей часто wer/wen (в розмові) — але базово der/die/das працює і для людей.', ru: 'Для людей часто wer/wen (в разговоре) — но базово der/die/das работает и для людей.' },
    ],
  },
  {
    id: 'genitiv',
    icon: '📚',
    title: { uk: 'Genitiv — чий? чого?', ru: 'Genitiv — чей? чего?' },
    intro: {
      uk: 'Приналежність і після деяких прийменників. Артиклі: des (чол./сер.), der (жін.), der (множ.).',
      ru: 'Принадлежность и после некоторых предлогов. Артикли: des (муж./ср.), der (жен.), der (множ.).',
    },
    tables: [
      {
        head: ['Форма', 'Приклад'],
        rows: [
          ['des + -s (чол./сер. іменник)', 'das Auto des Vaters'],
          ['der (жін.)', 'die Tasche der Frau'],
          ['der (множ.)', 'die Meinung der Leute'],
          ['imens: eines/einer', 'die Farbe eines Hauses'],
        ],
      },
      {
        head: ['Прийменники з Genitiv', 'Значення'],
        rows: [
          ['während', 'під час / во время'],
          ['wegen', 'через / из-за'],
          ['trotz', 'попри / несмотря на'],
          ['außerhalb', 'за межами / вне'],
        ],
      },
    ],
    lines: [
      { uk: 'В розмові Genitiv часто замінюють von + Dativ: das Auto von meinem Vater.', ru: 'В разговоре Genitiv часто заменяют von + Dativ: das Auto von meinem Vater.' },
    ],
  },
  {
    id: 'futuri',
    icon: '🔮',
    title: { uk: 'Futur I — майбутнє', ru: 'Futur I — будущее время' },
    intro: {
      uk: 'werden + інфінітив (в кінці). У розмові майбутнє часто виражають просто Präsens + обставина часу.',
      ru: 'werden + инфинитив (в конце). В разговоре будущее часто выражают просто Präsens + обстоятельство времени.',
    },
    tables: [
      {
        head: ['Форма', 'Приклад'],
        rows: [
          ['ich werde', 'Ich werde morgen kommen.'],
          ['du wirst', 'Du wirst es schaffen.'],
          ['er/sie/es wird', 'Sie wird uns helfen.'],
          ['wir/sie werden', 'Wir werden sehen.'],
        ],
      },
    ],
    lines: [
      { uk: 'Майбутнє без werden: «Morgen fahre ich nach Berlin» — Präsens + morgen.', ru: 'Будущее без werden: «Morgen fahre ich nach Berlin» — Präsens + morgen.' },
      { uk: 'werden + Infinitiv також для припущення: Er wird wohl müde sein.', ru: 'werden + Infinitiv также для предположения: Er wird wohl müde sein.' },
    ],
  },
]
