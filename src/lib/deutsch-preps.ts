// ============================================================
// РОЗДІЛ «ПРИЙМЕННИКИ» — групи за відмінком (Akkusativ, Dativ,
// Akk/Dat — Wechselpräpositionen, Genitiv) + часті сполуки
// «дієслово + прийменник». Кожен прийменник — із прикладами
// застосування (de + uk/ru) й озвучкою. Мова інтерфейсу — Bi.
// ============================================================

import type { Bi } from '@/lib/i18n'

export type PrepCase = 'Akk' | 'Dat' | 'Akk/Dat' | 'Gen'

export interface PrepEx {
  de: string
  uk: string
  ru: string
  /** Підказка-чип прикладу: який відмінок тут використано */
  tag?: PrepCase
}

export interface Preposition {
  /** Німецький прийменник або сполука: «mit», «warten auf» */
  de: string
  /** Значення українською/російською */
  meaning: Bi
  /** Приклади застосування (1–2) */
  ex: PrepEx[]
  /** Додаткова порада/пастка */
  note?: Bi
}

export interface PrepGroup {
  id: string
  icon: string
  title: Bi
  /** Правило групи одним реченням */
  rule: Bi
  tone: 'rose' | 'sky' | 'violet' | 'amber' | 'emerald'
  preps: Preposition[]
}

export const PREP_GROUPS: PrepGroup[] = [
  {
    id: 'akk',
    icon: '🚶',
    title: { uk: 'Завжди Akkusativ', ru: 'Всегда Akkusativ' },
    rule: {
      uk: 'Ці прийменники ВСЕГДА вимагають Akkusativ — незалежно від руху чи місця. Їх найлегше запамʼятати: «durch-für-gegen-ohne-um» — собаче правило DOGFU.',
      ru: 'Эти предлоги ВСЕГДА требуют Akkusativ — независимо от движения или места. Их легче всего запомнить: «durch-für-gegen-ohne-um».',
    },
    tone: 'rose',
    preps: [
      {
        de: 'durch',
        meaning: { uk: 'крізь, через', ru: 'сквозь, через' },
        ex: [
          { de: 'Wir fahren durch die Stadt.', uk: 'Ми їдемо через місто.', ru: 'Мы едем через город.', tag: 'Akk' },
        ],
      },
      {
        de: 'für',
        meaning: { uk: 'для, за', ru: 'для, за' },
        ex: [
          { de: 'Das Geschenk ist für dich.', uk: 'Цей подарунок — для тебе.', ru: 'Этот подарок — для тебя.', tag: 'Akk' },
          { de: 'Danke für die Hilfe!', uk: 'Дякую за допомогу!', ru: 'Спасибо за помощь!', tag: 'Akk' },
        ],
      },
      {
        de: 'gegen',
        meaning: { uk: 'проти; приблизно (час)', ru: 'против; примерно (время)' },
        ex: [
          { de: 'Er ist gegen den Plan.', uk: 'Він проти цього плану.', ru: 'Он против этого плана.', tag: 'Akk' },
          { de: 'Gegen elf Uhr bin ich frei.', uk: 'Близько одинадцятої я вільний.', ru: 'Примерно в одиннадцать я свободен.', tag: 'Akk' },
        ],
      },
      {
        de: 'ohne',
        meaning: { uk: 'без', ru: 'без' },
        ex: [
          { de: 'Kaffee ohne Milch und ohne Zucker, bitte.', uk: 'Кава без молока і без цукру, будь ласка.', ru: 'Кофе без молока и без сахара, пожалуйста.', tag: 'Akk' },
        ],
      },
      {
        de: 'um',
        meaning: { uk: 'о (час); навколо', ru: 'в (время); вокруг' },
        ex: [
          { de: 'Der Kurs beginnt um neun Uhr.', uk: 'Курс починається о девʼятій.', ru: 'Курс начинается в девять.', tag: 'Akk' },
          { de: 'Der Laden ist um die Ecke.', uk: 'Магазин за рогом.', ru: 'Магазин за углом.', tag: 'Akk' },
        ],
      },
      {
        de: 'bis',
        meaning: { uk: 'до (часу/місця)', ru: 'до (времени/места)' },
        ex: [
          { de: 'Ich bleibe bis Freitag hier.', uk: 'Я залишаюся тут до пʼятниці.', ru: 'Я остаюсь здесь до пятницы.', tag: 'Akk' },
        ],
        note: {
          uk: '«bis zu + Dativ»: Der Bus fährt bis zum Bahnhof — тут вже Dativ через zu.',
          ru: '«bis zu + Dativ»: Der Bus fährt bis zum Bahnhof — здесь уже Dativ из-за zu.',
        },
      },
      {
        de: 'entlang',
        meaning: { uk: 'вздовж (після іменника)', ru: 'вдоль (после существительного)' },
        ex: [
          { de: 'Wir spazieren den Fluss entlang.', uk: 'Ми гуляємо вздовж річки.', ru: 'Мы гуляем вдоль реки.', tag: 'Akk' },
        ],
      },
    ],
  },
  {
    id: 'dat',
    icon: '🏠',
    title: { uk: 'Завжди Dativ', ru: 'Всегда Dativ' },
    rule: {
      uk: 'Ці прийменники завжди Dativ — здебільшого «статичні»: місце, супровід, час. Шпаргалка: aus-bei-mit-nach-seit-von-zu.',
      ru: 'Эти предлоги всегда Dativ — в основном «статичные»: место, сопровождение, время. Шпаргалка: aus-bei-mit-nach-seit-von-zu.',
    },
    tone: 'sky',
    preps: [
      {
        de: 'aus',
        meaning: { uk: 'з (звідки, походження)', ru: 'из (откуда, происхождение)' },
        ex: [
          { de: 'Ich komme aus der Ukraine.', uk: 'Я з України.', ru: 'Я из Украины.', tag: 'Dat' },
          { de: 'Sie trinkt gern Wasser aus der Flasche.', uk: 'Вона любить пити воду з пляшки.', ru: 'Она любит пить воду из бутылки.', tag: 'Dat' },
        ],
      },
      {
        de: 'bei',
        meaning: { uk: 'біля, при, у (когось)', ru: 'у, при (у кого-то)' },
        ex: [
          { de: 'Ich wohne bei meinen Eltern.', uk: 'Я живу в батьків.', ru: 'Я живу у родителей.', tag: 'Dat' },
          { de: 'Er arbeitet bei einer Bank.', uk: 'Він працює в банку.', ru: 'Он работает в банке.', tag: 'Dat' },
        ],
      },
      {
        de: 'mit',
        meaning: { uk: 'з (спільно); на (транспорт)', ru: 'с (вместе); на (транспорт)' },
        ex: [
          { de: 'Ich fahre mit dem Bus zur Arbeit.', uk: 'Їду на роботу автобусом.', ru: 'Еду на работу на автобусе.', tag: 'Dat' },
          { de: 'Kommt ihr mit uns ins Kino?', uk: 'Ви підете з нами в кіно?', ru: 'Вы пойдёте с нами в кино?', tag: 'Dat' },
        ],
      },
      {
        de: 'nach',
        meaning: { uk: 'після; у (місто, країна)', ru: 'после; в (город, страна)' },
        ex: [
          { de: 'Nach dem Essen gehe ich spazieren.', uk: 'Після їжі я піду на прогулянку.', ru: 'После еды я пойду гулять.', tag: 'Dat' },
          { de: 'Am Samstag fahren wir nach Berlin.', uk: 'У суботу ми їдемо до Берліна.', ru: 'В субботу мы едем в Берлин.', tag: 'Dat' },
        ],
      },
      {
        de: 'seit',
        meaning: { uk: 'з (часу) — і досі', ru: 'с (времени) — и до сих пор' },
        ex: [
          { de: 'Ich lerne Deutsch seit einem Jahr.', uk: 'Я вчу німецьку вже рік.', ru: 'Я учу немецкий уже год.', tag: 'Dat' },
        ],
      },
      {
        de: 'von',
        meaning: { uk: 'від, з (належність, джерело)', ru: 'от, из (принадлежность)' },
        ex: [
          { de: 'Das ist ein Geschenk von meiner Oma.', uk: 'Це подарунок від моєї бабусі.', ru: 'Это подарок от моей бабушки.', tag: 'Dat' },
        ],
      },
      {
        de: 'zu',
        meaning: { uk: 'до (на шляху до когось/чогось)', ru: 'к (по пути к кому-то/чему-то)' },
        ex: [
          { de: 'Wir müssen morgen zum Arzt.', uk: 'Завтра нам треба до лікаря.', ru: 'Завтра нам нужно к врачу.', tag: 'Dat' },
          { de: 'Zum Geburtstag wünsche ich dir alles Gute.', uk: 'З днем народження — всього найкращого!', ru: 'С днём рождения — всего хорошего!', tag: 'Dat' },
        ],
        note: {
          uk: 'zu + dem = zum, zu + der = zur.',
          ru: 'zu + dem = zum, zu + der = zur.',
        },
      },
      {
        de: 'gegenüber',
        meaning: { uk: 'навпроти (після іменника)', ru: 'напротив (после существительного)' },
        ex: [
          { de: 'Die Apotheke ist gegenüber der Bank.', uk: 'Аптека навпроти банку.', ru: 'Аптека напротив банка.', tag: 'Dat' },
        ],
      },
      {
        de: 'ab',
        meaning: { uk: 'з, від (початок часу/місця)', ru: 'с, от (начало времени/места)' },
        ex: [
          { de: 'Ab Montag habe ich frei.', uk: 'З понеділка я вільний.', ru: 'С понедельника я свободен.', tag: 'Dat' },
        ],
      },
    ],
  },
  {
    id: 'wechsel',
    icon: '🔀',
    title: { uk: 'Akkusativ ЧИ Dativ? (Wechselpräpositionen)', ru: 'Akkusativ ИЛИ Dativ? (Wechselpräpositionen)' },
    rule: {
      uk: 'Питання-ключ: КУДИ рухаєшся? → Akkusativ. ДЕ знаходишся? → Dativ. Умова: in-an-auf-hinter-neben-über-unter-vor-zwischen.',
      ru: 'Вопрос-ключ: КУДА движешься? → Akkusativ. ГДЕ находишься? → Dativ. Условие: in-an-auf-hinter-neben-über-unter-vor-zwischen.',
    },
    tone: 'violet',
    preps: [
      {
        de: 'in',
        meaning: { uk: 'в, у', ru: 'в' },
        ex: [
          { de: 'Ich gehe in die Schule.', uk: 'Я йду до школи.', ru: 'Я иду в школу.', tag: 'Akk' },
          { de: 'Ich bin in der Schule.', uk: 'Я в школі.', ru: 'Я в школе.', tag: 'Dat' },
        ],
      },
      {
        de: 'an',
        meaning: { uk: 'біля, на (вертикальна поверхня)', ru: 'у, на (вертикальная поверхность)' },
        ex: [
          { de: 'Häng das Bild an die Wand!', uk: 'Повісь картину на стіну!', ru: 'Повесь картину на стену!', tag: 'Akk' },
          { de: 'Das Bild hängt an der Wand.', uk: 'Картина висить на стіні.', ru: 'Картина висит на стене.', tag: 'Dat' },
        ],
      },
      {
        de: 'auf',
        meaning: { uk: 'на (горизонтальна поверхня)', ru: 'на (горизонтальная поверхность)' },
        ex: [
          { de: 'Ich lege das Buch auf den Tisch.', uk: 'Я кладу книгу на стіл.', ru: 'Я кладу книгу на стол.', tag: 'Akk' },
          { de: 'Das Buch liegt auf dem Tisch.', uk: 'Книга лежить на столі.', ru: 'Книга лежит на столе.', tag: 'Dat' },
        ],
      },
      {
        de: 'über',
        meaning: { uk: 'над; про', ru: 'над; о' },
        ex: [
          { de: 'Wir fliegen über die Alpen.', uk: 'Ми летимо над Альпами.', ru: 'Мы летим над Альпами.', tag: 'Akk' },
          { de: 'Die Lampe hängt über dem Tisch.', uk: 'Лампа висить над столом.', ru: 'Лампа висит над столом.', tag: 'Dat' },
        ],
        note: {
          uk: '«про» — завжди Akk: Wir sprechen über den Film.',
          ru: '«о» — всегда Akk: Wir sprechen über den Film.',
        },
      },
      {
        de: 'unter',
        meaning: { uk: 'під', ru: 'под' },
        ex: [
          { de: 'Die Katze kriecht unter das Bett.', uk: 'Кішка лізе під ліжко.', ru: 'Кошка лезет под кровать.', tag: 'Akk' },
          { de: 'Die Katze schläft unter dem Bett.', uk: 'Кішка спить під ліжком.', ru: 'Кошка спит под кроватью.', tag: 'Dat' },
        ],
      },
      {
        de: 'vor',
        meaning: { uk: 'перед', ru: 'перед' },
        ex: [
          { de: 'Ich stelle das Auto vor das Haus.', uk: 'Я ставлю машину перед будинком.', ru: 'Я ставлю машину перед домом.', tag: 'Akk' },
          { de: 'Das Auto steht vor dem Haus.', uk: 'Машина стоїть перед будинком.', ru: 'Машина стоит перед домом.', tag: 'Dat' },
        ],
      },
      {
        de: 'hinter',
        meaning: { uk: 'за, позаду', ru: 'за, позади' },
        ex: [
          { de: 'Der Hund läuft hinter das Haus.', uk: 'Собака біжить за будинок.', ru: 'Собака бежит за дом.', tag: 'Akk' },
          { de: 'Der Hund wartet hinter dem Haus.', uk: 'Собака чекає за будинком.', ru: 'Собака ждёт за домом.', tag: 'Dat' },
        ],
      },
      {
        de: 'neben',
        meaning: { uk: 'поруч із, біля', ru: 'рядом с' },
        ex: [
          { de: 'Setz dich neben mich!', uk: 'Сядь поруч зі мною!', ru: 'Сядь рядом со мной!', tag: 'Akk' },
          { de: 'Ich sitze neben dir.', uk: 'Я сиджу поруч із тобою.', ru: 'Я сижу рядом с тобой.', tag: 'Dat' },
        ],
      },
      {
        de: 'zwischen',
        meaning: { uk: 'між', ru: 'между' },
        ex: [
          { de: 'Ich hänge den Spiegel zwischen die Fenster.', uk: 'Я вішаю дзеркало між вікнами.', ru: 'Я вешаю зеркало между окнами.', tag: 'Akk' },
          { de: 'Der Spiegel hängt zwischen den Fenstern.', uk: 'Дзеркало висить між вікнами.', ru: 'Зеркало висит между окнами.', tag: 'Dat' },
        ],
      },
    ],
  },
  {
    id: 'gen',
    icon: '📜',
    title: { uk: 'З Genitivом', ru: 'С Genitiv' },
    rule: {
      uk: 'Genitiv — це книжна мова (час, причина). У розмовній німецькій його часто замінюють на «von + Dativ».',
      ru: 'Genitiv — книжная речь (время, причина). В разговорном немецком его часто заменяют на «von + Dativ».',
    },
    tone: 'amber',
    preps: [
      {
        de: 'wegen',
        meaning: { uk: 'через, з-за', ru: 'из-за' },
        ex: [
          { de: 'Wegen des Regens bleiben wir zu Hause.', uk: 'Через дощ ми залишаємося вдома.', ru: 'Из-за дождя мы остаёмся дома.', tag: 'Gen' },
        ],
        note: { uk: 'Розмовно: wegen dem Regen (Dativ).', ru: 'Разговорно: wegen dem Regen (Dativ).' },
      },
      {
        de: 'während',
        meaning: { uk: 'під час', ru: 'во время' },
        ex: [
          { de: 'Während der Pause trinke ich Kaffee.', uk: 'Під час перерви я пʼю каву.', ru: 'Во время перерыва я пью кофе.', tag: 'Gen' },
        ],
      },
      {
        de: 'trotz',
        meaning: { uk: 'незважаючи на', ru: 'несмотря на' },
        ex: [
          { de: 'Trotz des Wetters gehen wir spazieren.', uk: 'Незважаючи на погоду, ми йдемо гуляти.', ru: 'Несмотря на погоду, мы идём гулять.', tag: 'Gen' },
        ],
      },
      {
        de: 'statt',
        meaning: { uk: 'замість', ru: 'вместо' },
        ex: [
          { de: 'Statt des Fleisches nehme ich Fisch.', uk: 'Замість мʼяса я візьму рибу.', ru: 'Вместо мяса я возьму рыбу.', tag: 'Gen' },
        ],
      },
    ],
  },
  {
    id: 'verb',
    icon: '🔗',
    title: { uk: 'Дієслово + прийменник (запамʼятати разом)', ru: 'Глагол + предлог (учить вместе)' },
    rule: {
      uk: 'У цих сполук прийменник не перекладається дослівно — він визначає відмінок. Вчать їх парами, як слова.',
      ru: 'У этих сочетаний предлог не переводится дословно — он определяет падеж. Их учат парами, как слова.',
    },
    tone: 'emerald',
    preps: [
      {
        de: 'warten auf + Akk',
        meaning: { uk: 'чекати на', ru: 'ждать' },
        ex: [
          { de: 'Ich warte auf den Bus.', uk: 'Я чекаю на автобус.', ru: 'Я жду автобус.', tag: 'Akk' },
        ],
      },
      {
        de: 'sich freuen auf + Akk',
        meaning: { uk: 'радіти (чомусь майбутньому)', ru: 'радоваться (чему-то будущему)' },
        ex: [
          { de: 'Ich freue mich auf das Wochenende.', uk: 'Чекаю не дочекаюся вихідних.', ru: 'Жду не дождусь выходных.', tag: 'Akk' },
        ],
      },
      {
        de: 'denken an + Akk',
        meaning: { uk: 'думати про', ru: 'думать о' },
        ex: [
          { de: 'Ich denke an dich.', uk: 'Я думаю про тебе.', ru: 'Я думаю о тебе.', tag: 'Akk' },
        ],
      },
      {
        de: 'sich interessieren für + Akk',
        meaning: { uk: 'цікавитися', ru: 'интересоваться' },
        ex: [
          { de: 'Ich interessiere mich für Musik.', uk: 'Я цікавлюся музикою.', ru: 'Я интересуюсь музыкой.', tag: 'Akk' },
        ],
      },
      {
        de: 'sich ärgern über + Akk',
        meaning: { uk: 'злитися через', ru: 'злиться из-за' },
        ex: [
          { de: 'Er ärgert sich über den Lärm.', uk: 'Він злиться через шум.', ru: 'Он злится из-за шума.', tag: 'Akk' },
        ],
      },
      {
        de: 'teilnehmen an + Dat',
        meaning: { uk: 'брати участь у', ru: 'принимать участие в' },
        ex: [
          { de: 'Ich nehme am Kurs teil.', uk: 'Я беру участь у курсі.', ru: 'Я участвую в курсе.', tag: 'Dat' },
        ],
      },
      {
        de: 'helfen bei + Dat',
        meaning: { uk: 'допомагати з', ru: 'помогать с' },
        ex: [
          { de: 'Kannst du mir bei den Hausaufgaben helfen?', uk: 'Допоможеш мені з домашнім завданням?', ru: 'Поможешь мне с домашним заданием?', tag: 'Dat' },
        ],
      },
      {
        de: 'träumen von + Dat',
        meaning: { uk: 'мріяти про', ru: 'мечтать о' },
        ex: [
          { de: 'Sie träumt von der Reise nach Italien.', uk: 'Вона мріє про подорож до Італії.', ru: 'Она мечтает о поездке в Италию.', tag: 'Dat' },
        ],
      },
      {
        de: 'sprechen mit + Dat',
        meaning: { uk: 'розмовляти з', ru: 'разговаривать с' },
        ex: [
          { de: 'Ich spreche mit dem Lehrer.', uk: 'Я розмовляю з учителем.', ru: 'Я разговариваю с учителем.', tag: 'Dat' },
        ],
      },
    ],
  },
]

/** Скільки прийменників/сполук у розділі (для підпису вкладки) */
export const PREP_TOTAL: number = PREP_GROUPS.reduce((n, g) => n + g.preps.length, 0)
