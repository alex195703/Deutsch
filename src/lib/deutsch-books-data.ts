// ============================================================
// КНИЖКИ ЧИТАНКИ — тексти, переклади абзаців і глосарії.
// Слова, яких немає в словнику тренажера, описані тут:
// ключ — слово/фраза нижнім регістром, значення — uk/ru.
// Гігієна мов: у uk — без російських букв, у ru — без
// українських (перевіряє scripts/test-deutsch.ts).
// ============================================================

import type { Book } from './deutsch-books'

export const BOOKS_LIST: Book[] = [
  {
    id: 'lena',
    emoji: '🌞',
    level: 'A1',
    title: { uk: 'День Лени', ru: 'День Лены' },
    paragraphs: [
      {
        de: 'Lena ist zehn Jahre alt. Sie wohnt in Köln mit ihrer Mutter und ihrem Bruder Paul. Jeden Morgen steht sie um sieben Uhr auf.',
        uk: 'Лені десять років. Вона живе в Кельні зі своєю мамою і братом Полем. Щоранку вона встає о сьомій годині.',
        ru: 'Лене десять лет. Она живёт в Кёльне со своей мамой и братом Паулем. Каждое утро она встаёт в семь часов.',
      },
      {
        de: 'Zum Frühstück isst sie ein Brot mit Käse. Dazu trinkt sie warmen Tee.',
        uk: 'На сніданок вона їсть хліб із сиром. До цього вона пʼє теплий чай.',
        ru: 'На завтрак она ест хлеб с сыром. К этому она пьёт тёплый чай.',
      },
      {
        de: 'Um halb acht geht Lena zur Schule. Sie fährt mit dem Fahrrad. Die Schule ist nicht weit.',
        uk: 'О пів на восьму Лена йде до школи. Вона їде на велосипеді. Школа недалеко.',
        ru: 'В полвосьмого Лена идёт в школу. Она едет на велосипеде. Школа недалеко.',
      },
      {
        de: 'In der Schule hat Lena Deutsch, Mathe und Sport. Ihr Lieblingsfach ist Sport, denn sie läuft sehr gern.',
        uk: 'У школі в Лени німецька мова, математика і фізкультура. Її улюблений предмет — фізкультура, бо вона дуже любить бігати.',
        ru: 'В школе у Лены немецкий язык, математика и физкультура. Её любимый предмет — физкультура, потому что она очень любит бегать.',
      },
      {
        de: 'Nach dem Mittagessen macht sie ihre Hausaufgaben. Ihr Bruder Paul spielt im Garten mit dem Ball.',
        uk: 'Після обіду вона робить свої домашні завдання. Її брат Поль грається в саду з мʼячем.',
        ru: 'После обеда она делает свои домашние задания. Её брат Пауль играет в саду с мячом.',
      },
      {
        de: 'Am Abend isst die Familie zusammen. Danach sehen sie fern oder lesen Bücher.',
        uk: 'Увечері сімʼя їсть разом. Після цього вони дивляться телевізор або читають книжки.',
        ru: 'Вечером семья ест вместе. После этого они смотрят телевизор или читают книги.',
      },
      {
        de: 'Um neun Uhr geht Lena ins Bett. Sie ist müde und schläft schnell.',
        uk: 'О девʼятій годині Лена йде спати. Вона втомлена і швидко засинає.',
        ru: 'В девять часов Лена идёт спать. Она устала и быстро засыпает.',
      },
    ],
    glossary: {
      halb: { uk: 'пів (часу): halb acht = пів на восьму', ru: 'пол (времени): halb acht = полвосьмого' },
      frühstück: { uk: 'сніданок', ru: 'завтрак' },
      warmen: { uk: 'теплий', ru: 'тёплый' },
      dazu: { uk: 'до цього; додатково', ru: 'к этому; кроме того' },
      steht: { uk: 'встає (aufstehen)', ru: 'встаёт (aufstehen)' },
      mathe: { uk: 'математика (розм.)', ru: 'математика (разг.)' },
      sport: { uk: 'фізкультура; спорт', ru: 'физкультура; спорт' },
      lieblingsfach: { uk: 'улюблений предмет', ru: 'любимый предмет' },
      mittagessen: { uk: 'обід', ru: 'обед' },
      spielt: { uk: 'грає', ru: 'играет' },
      garten: { uk: 'сад', ru: 'сад' },
      ball: { uk: 'мʼяч', ru: 'мяч' },
      fern: { uk: 'телевізор (fernsehen — дивитися телевізор)', ru: 'телевизор (fernsehen — смотреть телевизор)' },
      ihrer: { uk: 'її', ru: 'её' },
      ihrem: { uk: 'її (Dativ)', ru: 'её (дат. падеж)' },
    },
  },
  {
    id: 'bello',
    emoji: '🐶',
    level: 'A1',
    title: { uk: 'Маленький пес Белло', ru: 'Маленькая собака Белло' },
    paragraphs: [
      {
        de: 'Max hat einen kleinen Hund. Der Hund heißt Bello und ist schon ein Jahr alt.',
        uk: 'У Макса є маленький пес. Пса звати Белло, і йому вже один рік.',
        ru: 'У Макса есть маленькая собака. Собаку зовут Белло, и ей уже один год.',
      },
      {
        de: 'Bello ist braun und weiß. Er hat lange Ohren und eine schwarze Nase.',
        uk: 'Белло коричнево-білий. У нього довгі вуха і чорний ніс.',
        ru: 'Белло коричнево-белый. У него длинные уши и чёрный нос.',
      },
      {
        de: 'Jeden Tag spielt Max mit Bello im Park. Bello läuft schnell und springt über die Bänke.',
        uk: 'Щодня Макс грається з Белло в парку. Белло швидко бігає і стрибає через лави.',
        ru: 'Каждый день Макс играет с Белло в парке. Белло быстро бегает и прыгает через лавки.',
      },
      {
        de: 'Bello kann schon vieles: Er sitzt, gibt die Pfote und bringt den Ball.',
        uk: 'Белло вже багато вміє: він сидить, дає лапу і приносить мʼяч.',
        ru: 'Белло уже многое умеет: он сидит, даёт лапу и приносит мяч.',
      },
      {
        de: 'Abends schläft Bello in seinem Korb neben dem Sofa.',
        uk: 'Увечері Белло спить у своєму кошику-лежанці біля дивана.',
        ru: 'Вечером Белло спит в своей корзинке-лежанке рядом с диваном.',
      },
      {
        de: 'Am Samstag geht Max mit Bello zum Tierarzt. Bello findet das nicht so toll.',
        uk: 'У суботу Макс із Белло йде до ветеринара. Белло не дуже це любить.',
        ru: 'В субботу Макс с Белло идёт к ветеринару. Белло это не очень любит.',
      },
      {
        de: 'Am Sonntag fährt die Familie mit Bello an den See. Bello schwimmt und Max lacht.',
        uk: 'У неділю сімʼя з Белло їде на озеро. Белло плаває, а Макс сміється.',
        ru: 'В воскресенье семья с Белло едет на озеро. Белло плавает, а Макс смеётся.',
      },
    ],
    glossary: {
      spielt: { uk: 'грає', ru: 'играет' },
      ball: { uk: 'мʼяч', ru: 'мяч' },
      park: { uk: 'парк', ru: 'парк' },
      springt: { uk: 'стрибає', ru: 'прыгает' },
      bänke: { uk: 'лави (Bank — лава)', ru: 'лавки (Bank — лавка)' },
      sitzt: { uk: 'сидить', ru: 'сидит' },
      pfote: { uk: 'лапа (gibt die Pfote — дає лапу)', ru: 'лапа (даёт лапу)' },
      korb: { uk: 'кошик-лежанка', ru: 'корзинка-лежанка' },
      tierarzt: { uk: 'ветеринар (лікар тварин)', ru: 'ветеринар (врач животных)' },
      see: { uk: 'озеро', ru: 'озеро' },
      lacht: { uk: 'сміється', ru: 'смеётся' },
      abends: { uk: 'увечері', ru: 'вечером' },
      seinem: { uk: 'своєму; його', ru: 'своему; его' },
    },
  },
  {
    id: 'berlin',
    emoji: '🚄',
    level: 'A2',
    title: { uk: 'Вихідні в Берліні', ru: 'Выходные в Берлине' },
    paragraphs: [
      {
        de: 'Letztes Wochenende war Anna in Berlin. Sie ist am Samstag früh mit dem Zug gefahren.',
        uk: 'Минулі вихідні Анна була в Берліні. У суботу рано вона поїхала потягом.',
        ru: 'Прошлые выходные Анна была в Берлине. В субботу рано она поехала на поезде.',
      },
      {
        de: 'Der Zug kam um zehn Uhr am Hauptbahnhof an. Annas Freundin Lisa hat sie abgeholt.',
        uk: 'Потяг прибув о десятій на головний вокзал. Подруга Анни Ліза зустріла її.',
        ru: 'Поезд прибыл в десять на главный вокзал. Подруга Анны Лиза встретила её.',
      },
      {
        de: 'Zuerst sind sie zum Brandenburger Tor gegangen. Es war sehr voll, aber schön.',
        uk: 'Спершу вони пішли до Бранденбурзьких воріт. Там було дуже багато людей, але красиво.',
        ru: 'Сначала они пошли к Бранденбургским воротам. Там было очень многолюдно, но красиво.',
      },
      {
        de: 'Danach haben sie im Museum alte Bilder gesehen. Anna hat viele Fotos gemacht.',
        uk: 'Після цього вони дивилися в музеї старі картини. Анна зробила багато фотографій.',
        ru: 'После этого они смотрели в музее старые картины. Анна сделала много фотографий.',
      },
      {
        de: 'Am Abend sind sie in ein Restaurant gegangen. Anna hat Currywurst probiert — lecker!',
        uk: 'Увечері вони пішли в ресторан. Анна спробувала каррі-ковбаску — смачно!',
        ru: 'Вечером они пошли в ресторан. Анна попробовала карри-колбаску — вкусно!',
      },
      {
        de: 'Am Sonntag haben sie Souvenirs gekauft. Anna kaufte auch eine Tasse für ihre Mutter.',
        uk: 'У неділю вони купили сувеніри. Анна також купила чашку для своєї мами.',
        ru: 'В воскресенье они купили сувениры. Анна также купила чашку для своей мамы.',
      },
      {
        de: 'Am Abend ist Anna nach Hause gefahren. Es war ein tolles Wochenende!',
        uk: 'Увечері Анна поїхала додому. Це були чудові вихідні!',
        ru: 'Вечером Анна поехала домой. Это были отличные выходные!',
      },
    ],
    glossary: {
      letztes: { uk: 'минулий (letztes Wochenende — минулі вихідні)', ru: 'прошлый (прошлые выходные)' },
      hauptbahnhof: { uk: 'головний вокзал', ru: 'главный вокзал' },
      freundin: { uk: 'подруга', ru: 'подруга' },
      abgeholt: { uk: 'зустріла; забрала (abholen)', ru: 'встретила; забрала (abholen)' },
      'brandenburger tor': { uk: 'Бранденбурзькі ворота (памʼятка Берліна)', ru: 'Бранденбургские ворота (достопримечательность Берлина)' },
      bilder: { uk: 'картини (Bild)', ru: 'картины (Bild)' },
      fotos: { uk: 'фотографії (Foto)', ru: 'фотографии (Foto)' },
      currywurst: { uk: 'каррі-ковбаска (страва Берліна)', ru: 'карри-колбаска (берлинское блюдо)' },
      probiert: { uk: 'спробувала (probieren)', ru: 'попробовала (probieren)' },
      souvenirs: { uk: 'сувеніри', ru: 'сувениры' },
      tasse: { uk: 'чашка', ru: 'чашка' },
      tolles: { uk: 'чудові (tolles Wochenende — чудові вихідні)', ru: 'отличные (отличные выходные)' },
    },
  },
  {
    id: 'jonas',
    emoji: '🏠',
    level: 'A2',
    title: { uk: 'Йонас шукає квартиру', ru: 'Йонас ищет квартиру' },
    paragraphs: [
      {
        de: 'Jonas studiert in München und braucht eine eigene Wohnung. Er wohnt gerade noch bei einem Freund.',
        uk: 'Йонас навчається в Мюнхені й потребує власної квартири. Зараз він ще живе в друга.',
        ru: 'Йонас учится в Мюнхене и нуждается в собственной квартире. Сейчас он ещё живёт у друга.',
      },
      {
        de: 'Er hat im Internet viele Anzeigen gelesen. Eine Wohnung war klein, aber günstig.',
        uk: 'Він прочитав в інтернеті багато оголошень. Одна квартира була маленька, але недорога.',
        ru: 'Он прочитал в интернете много объявлений. Одна квартира была маленькая, но недорогая.',
      },
      {
        de: 'Jonas hat beim Vermieter angerufen und einen Termin gemacht.',
        uk: 'Йонас подзвонив домовласнику й призначив зустріч.',
        ru: 'Йонас позвонил домовладельцу и назначил встречу.',
      },
      {
        de: 'Der Vermieter war freundlich. Die Wohnung hat einen Balkon und eine kleine Küche.',
        uk: 'Домовласник був привітний. У квартирі є балкон і маленька кухня.',
        ru: 'Домовладелец был приветливый. В квартире есть балкон и маленькая кухня.',
      },
      {
        de: 'Die Miete kostet 650 Euro. Das ist viel, aber München ist sehr teuer.',
        uk: 'Оренда коштує 650 євро. Це багато, але Мюнхен дуже дорогий.',
        ru: 'Аренда стоит 650 евро. Это много, но Мюнхен очень дорогой.',
      },
      {
        de: 'Jonas hat die Wohnung sofort genommen. Er hat den Vertrag auch schon unterschrieben.',
        uk: 'Йонас одразу взяв квартиру. Він уже і договір підписав.',
        ru: 'Йонас сразу взял квартиру. Он и договор уже подписал.',
      },
      {
        de: 'Nächste Woche zieht er ein. Er freut sich sehr auf sein neues Zuhause!',
        uk: 'Наступного тижня він переїжджає. Він дуже чекає на свій новий дім!',
        ru: 'На следующей неделе он переезжает. Он очень ждёт свой новый дом!',
      },
    ],
    glossary: {
      anzeigen: { uk: 'оголошення (Anzeige)', ru: 'объявления (Anzeige)' },
      günstig: { uk: 'недорогий; вигідний', ru: 'недорогой; выгодный' },
      angerufen: { uk: 'подзвонив (anrufen)', ru: 'позвонил (anrufen)' },
      unterschrieben: { uk: 'підписав (unterschreiben)', ru: 'подписал (unterschreiben)' },
      zieht: { uk: 'переїжджає (einziehen — вʼїжджати)', ru: 'переезжает (einziehen — въезжать)' },
      'freut sich': { uk: 'радіє; чекає (sich freuen auf)', ru: 'радуется; ждёт (sich freuen auf)' },
      freut: { uk: 'радіє', ru: 'радуется' },
      zuhause: { uk: 'домівка; рідний дім', ru: 'дом; родной дом' },
      sein: { uk: 'свій', ru: 'свой' },
    },
  },
]
