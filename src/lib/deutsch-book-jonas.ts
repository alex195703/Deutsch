// ============================================================
// КНИЖКА 4 — «Йонас шукає квартиру» (A2). 8 розділів, ~1000 слів.
// Perfekt у розповіді, тематика житла та переїзду.
// ============================================================

import type { Book } from './deutsch-books'

export const JONAS_BOOK: Book = {
  id: 'jonas',
  emoji: '🏠',
  level: 'A2',
  title: { uk: 'Йонас шукає квартиру', ru: 'Йонас ищет квартиру' },
  blurb: {
    uk: 'Студент Йонас мріє про власну квартиру в Мюнхені: оголошення, невдалий перегляд, щасливий випадок, договір і переїзд.',
    ru: 'Студент Йонас мечтает о собственной квартире в Мюнхене: объявления, неудачный просмотр, счастливый случай, договор и переезд.',
  },
  chapters: [
    {
      title: { uk: 'Занадто тісно', ru: 'Слишком тесно' },
      paragraphs: [
        {
          de: 'Jonas studiert im dritten Semester Maschinenbau in München.',
          uk: 'Йонас на третьому семестрі вивчає машинобудування в Мюнхені.',
          ru: 'Йонас на третьем семестре изучает машиностроение в Мюнхене.',
        },
        {
          de: 'Seit einem Jahr wohnt er bei seinem Freund Ben in einer kleinen Wohnung.',
          uk: 'Вже рік він живе у свого друга Бена в маленькій квартирі.',
          ru: 'Уже год он живёт у своего друга Бена в маленькой квартире.',
        },
        {
          de: 'Das Zimmer ist zu klein, und die Möbel von Ben stehen überall.',
          uk: 'Кімната занадто мала, а меблі Бена стоять усюди.',
          ru: 'Комната слишком маленькая, а мебель Бена стоит везде.',
        },
        {
          de: 'Jonas hat genug Geld von seinem Nebenjob gespart: 2400 Euro auf dem Konto.',
          uk: 'Йонас накопичив досить грошей від підробітної роботи: 2400 євро на рахунку.',
          ru: 'Йонас накопил достаточно денег от подработки: 2400 евро на счёте.',
        },
        {
          de: 'Er hat einen Plan: eine kleine eigene Wohnung, maximal 700 Euro Miete.',
          uk: 'У нього є план: маленька власна квартира, оренда максимум 700 євро.',
          ru: 'У него есть план: маленькая собственная квартира, аренда максимум 700 евро.',
        },
      ],
    },
    {
      title: { uk: 'Оголошення', ru: 'Объявления' },
      paragraphs: [
        {
          de: 'Jeden Abend hat Jonas Anzeigen im Internet gelesen und eine Liste gemacht.',
          uk: 'Щовечора Йонас читав оголошення в інтернеті й складав список.',
          ru: 'Каждый вечер Йонас читал объявления в интернете и составлял список.',
        },
        {
          de: 'Viele Wohnungen waren zu teuer oder lagen weit außerhalb der Stadt.',
          uk: 'Багато квартир були задорогі або далеко за межами міста.',
          ru: 'Многие квартиры были слишком дорогие или далеко за пределами города.',
        },
        {
          de: 'Bei drei Wohnungen hat er angerufen. Zwei Vermieter haben nicht zurückgerufen.',
          uk: 'У трьох квартир він подзвонив. Двоє домовласників не передзвонили.',
          ru: 'В три квартиры он позвонил. Двое домовладельцев не перезвонили.',
        },
        {
          de: 'Nur Herr Schmidt hat einen Termin für Samstagvormittag vorgeschlagen.',
          uk: 'Лише пан Шмідт запропонував зустріч у суботу вранці.',
          ru: 'Только господин Шмидт предложил встречу в субботу утром.',
        },
        {
          de: 'Die Wohnung lag in Giesing, zwanzig Minuten mit dem Fahrrad von der Uni.',
          uk: 'Квартира була в Ґізінґу, двадцять хвилин на велосипеді від університету.',
          ru: 'Квартира была в Гизинге, двадцать минут на велосипеде от университета.',
        },
      ],
    },
    {
      title: { uk: 'Перший перегляд', ru: 'Первый просмотр' },
      paragraphs: [
        {
          de: 'Am Samstag hat Jonas die Wohnung angesehen. Sie lag im Erdgeschoss.',
          uk: 'У суботу Йонас подивився квартиру. Вона була на першому поверсі.',
          ru: 'В субботу Йонас посмотрел квартиру. Она была на первом этаже.',
        },
        {
          de: 'Das Zimmer war klein und dunkel, und die Fenster gingen zur lauten Straße hinaus.',
          uk: 'Кімната була маленька й темна, а вікна виходили на шумну вулицю.',
          ru: 'Комната была маленькая и тёмная, а окна выходили на шумную улицу.',
        },
        {
          de: 'Die Küche musste man sich mit drei anderen Mietern teilen.',
          uk: 'Кухнею доводилося ділитися з трьома іншими мешканцями.',
          ru: 'Кухней приходилось делиться с тремя другими жильцами.',
        },
        {
          de: '„Danke, ich melde mich", hat Jonas gesagt. Aber er wusste schon: Das war nichts für ihn.',
          uk: '«Дякую, я дам знати», — сказав Йонас. Але він уже знав: це не для нього.',
          ru: '«Спасибо, я дам знать», — сказал Йонас. Но он уже знал: это не для него.',
        },
        {
          de: 'Am Nachmittag hat er Ben angerufen und frustriert erzählt.',
          uk: 'Після обіду він подзвонив Бену й розчаровано розповів.',
          ru: 'После обеда он позвонил Бену и расстроенно рассказал.',
        },
      ],
    },
    {
      title: { uk: 'Щасливий випадок', ru: 'Счастливый случай' },
      paragraphs: [
        {
          de: 'Am Sonntag hat Ben eine Idee gehabt: „Frag doch an der Pinwand im Supermarkt!"',
          uk: 'У неділю Бен мав ідею: «Запитай на дошці оголошень у супермаркеті!»',
          ru: 'В воскресенье у Бена была идея: «Спроси на доске объявлений в супермаркете!»',
        },
        {
          de: 'Dort hing ein Zettel: „Schöne 1-Zimmer-Wohnung mit Balkon, sofort frei".',
          uk: 'Там висів папірець: «Гарна однокімнатна квартира з балконом, вільна одразу».',
          ru: 'Там висел листок: «Красивая однокомнатная квартира с балконом, свободна сразу».',
        },
        {
          de: 'Die Vermieterin, Frau Wagner, hat den Termin für den nächsten Tag gemacht.',
          uk: 'Домовласниця пані Ваґнер призначила зустріч на наступний день.',
          ru: 'Домовладелица фрау Вагнер назначила встречу на следующий день.',
        },
        {
          de: 'Die Wohnung lag im dritten Stock und hatte große Fenster nach Süden.',
          uk: 'Квартира була на третьому поверсі й мала великі вікна на південь.',
          ru: 'Квартира была на третьем этаже и имела большие окна на юг.',
        },
        {
          de: 'Es gab eine kleine Küche, ein Bad und den versprochenen Balkon.',
          uk: 'Була маленька кухня, ванна кімната й обіцяний балкон.',
          ru: 'Была маленькая кухня, ванная и обещанный балкон.',
        },
        {
          de: '„Von hier kann ich die Berge sehen", hat Jonas staunend gesagt.',
          uk: '«Звідси я можу бачити гори», — сказав Йонас здивовано.',
          ru: '«Отсюда я могу видеть горы», — сказал Йонас с удивлением.',
        },
      ],
    },
    {
      title: { uk: 'Договір', ru: 'Договор' },
      paragraphs: [
        {
          de: 'Die Miete kostete 650 Euro, die Kaution zwei Monatsmieten.',
          uk: 'Оренда коштувала 650 євро, депозит — дві місячні плати.',
          ru: 'Аренда стоила 650 евро, депозит — две месячные платы.',
        },
        {
          de: 'Frau Wagner hat den Vertrag mitgebracht: zwölf Seiten, kleine Schrift.',
          uk: 'Пані Ваґнер принесла договір: дванадцять сторінок, дрібний шрифт.',
          ru: 'Фрау Вагнер принесла договор: двенадцать страниц, мелкий шрифт.',
        },
        {
          de: 'Jonas hat alles zweimal gelesen und zwei Fragen gestellt.',
          uk: 'Йонас прочитав усе двічі й поставив два питання.',
          ru: 'Йонас прочитал всё два раза и задал два вопроса.',
        },
        {
          de: 'Dann haben beide unterschrieben. Jonas war sehr aufgeregt — im positiven Sinn.',
          uk: 'Потім обидва підписали. Йонас був дуже схвильований — у хорошому сенсі.',
          ru: 'Потом оба подписали. Йонас был очень взволнован — в хорошем смысле.',
        },
        {
          de: 'Ersten nächsten Monats konnte er einziehen. Er hat es kaum erwarten können.',
          uk: 'Першого числа наступного місяця він міг вʼїжджати. Він ледве міг дочекатися.',
          ru: 'Первого числа следующего месяца он мог въезжать. Он едва мог дождаться.',
        },
      ],
    },
    {
      title: { uk: 'Переїзд', ru: 'Переезд' },
      paragraphs: [
        {
          de: 'Am Umzugstag hat Ben seinen Bruder mit einem Transporter geholt.',
          uk: 'У день переїзду Бен привіз свого брата з фургоном.',
          ru: 'В день переезда Бен привёз своего брата с фургоном.',
        },
        {
          de: 'Sie haben sechs Kartons, einen Schreibtisch und einen Stuhl transportiert.',
          uk: 'Вони перевезли шість коробок, письмовий стіл і стілець.',
          ru: 'Они перевезли шесть коробок, письменный стол и стул.',
        },
        {
          de: 'Nur die Treppen waren schwierig — dritter Stock ohne Aufzug!',
          uk: 'Тільки сходи були складними — третій поверх без ліфта!',
          ru: 'Только лестницы были сложными — третий этаж без лифта!',
        },
        {
          de: 'Nach drei Stunden stand alles in der neuen Wohnung. Alle drei waren total erschöpft.',
          uk: 'За три години все стояло в новій квартирі. Усі троє були зовсім знесилені.',
          ru: 'Через три часа всё стояло в новой квартире. Все трое были совершенно измотаны.',
        },
        {
          de: 'Als Dank hat Jonas für beide Pizza bestellt. Sie haben auf dem Boden gegessen.',
          uk: 'На подяку Йонас замовив обом піцу. Вони їли на підлозі.',
          ru: 'В благодарность Йонас заказал обоим пиццу. Они ели на полу.',
        },
      ],
    },
    {
      title: { uk: 'Перший вечір', ru: 'Первый вечер' },
      paragraphs: [
        {
          de: 'Abends war Jonas allein. Es war still — zu still für ihn.',
          uk: 'Увечері Йонас був один. Було тихо — занадто тихо для нього.',
          ru: 'Вечером Йонас был один. Было тихо — слишком тихо для него.',
        },
        {
          de: 'Er hat seine Sachen ausgepackt und die Matratze ins Schlafzimmer getragen.',
          uk: 'Він розпакував свої речі й переніс матрац до спальні.',
          ru: 'Он распаковал свои вещи и перенёс матрац в спальню.',
        },
        {
          de: 'Vom Balkon hat er die Lichter der Stadt gesehen und sich gefreut.',
          uk: 'З балкона він бачив вогні міста й радів.',
          ru: 'С балкона он видел огни города и радовался.',
        },
        {
          de: 'Er hat ein Foto an seine Eltern in Hamburg geschickt: „Mein neues Zuhause!"',
          uk: 'Він надіслав фото батькам у Гамбург: «Мій новий дім!»',
          ru: 'Он отправил фото родителям в Гамбург: «Мой новый дом!»',
        },
        {
          de: 'Um Mitternacht hat er in seiner eigenen Wohnung geschlafen.',
          uk: 'Опівночі він заснув у власній квартирі.',
          ru: 'В полночь он заснул в собственной квартире.',
        },
      ],
    },
    {
      title: { uk: 'Новий дім', ru: 'Новый дом' },
      paragraphs: [
        {
          de: 'In den nächsten Wochen hat Jonas die Wohnung eingerichtet.',
          uk: 'У наступні тижні Йонас облаштував квартиру.',
          ru: 'В следующие недели Йонас обустроил квартиру.',
        },
        {
          de: 'Er hat ein gebrauchtes Sofa gekauft und Regale aus dem Baumarkt aufgebaut.',
          uk: 'Він купив вживаний диван і зібрав полиці з будівельного магазину.',
          ru: 'Он купил подержанный диван и собрал полки из строительного магазина.',
        },
        {
          de: 'Pflanzen auf dem Balkon haben das kleine Büro gemütlich gemacht.',
          uk: 'Рослини на балконі зробили маленький кабінет затишним.',
          ru: 'Растения на балконе сделали маленький кабинет уютным.',
        },
        {
          de: 'Zur Einweihung sind Ben und die Freunde von der Uni gekommen.',
          uk: 'На новосілля прийшли Бен і друзі з університету.',
          ru: 'На новоселье пришли Бен и друзья из университета.',
        },
        {
          de: 'Jonas hat kurz gesagt: „Danke, dass ihr da seid. Willkommen in meinem neuen Zuhause!"',
          uk: 'Йонас коротко сказав: «Дякую, що ви тут. Ласкаво просимо в мій новий дім!»',
          ru: 'Йонас коротко сказал: «Спасибо, что вы здесь. Добро пожаловать в мой новый дом!»',
        },
      ],
    },
  ],
  glossary: {
    jonas: { uk: 'чоловіче імʼя (герой книжки)', ru: 'мужское имя (герой книги)' },
    ben: { uk: 'чоловіче імʼя (друг Йонаса)', ru: 'мужское имя (друг Йонаса)' },
    schmidt: { uk: 'прізвище домовласника', ru: 'фамилия домовладельца' },
    wagner: { uk: 'прізвище домовласниці', ru: 'фамилия домовладелицы' },
    semester: { uk: 'семестр', ru: 'семестр' },
    maschinenbau: { uk: 'машинобудування', ru: 'машиностроение' },
    möbel: { uk: 'меблі (die Möbel)', ru: 'мебель (die Möbel)' },
    nebenjob: { uk: 'підробіток', ru: 'подработка' },
    gespart: { uk: 'накопичив (sparen)', ru: 'накопил (sparen)' },
    konto: { uk: 'рахунок (у банку)', ru: 'счёт (в банке)' },
    maximal: { uk: 'максимум; не більше ніж', ru: 'максимум; не более чем' },
    miete: { uk: 'орендна плата; оренда', ru: 'арендная плата; аренда' },
    liste: { uk: 'список', ru: 'список' },
    lagen: { uk: 'містилися; знаходилися (liegen)', ru: 'находились (liegen)' },
    außerhalb: { uk: 'за межами (чогось)', ru: 'за пределами (чего-то)' },
    vermieter: { uk: 'домовласники', ru: 'домовладельцы' },
    zurückgerufen: { uk: 'передзвонили (zurückrufen)', ru: 'перезвонили (zurückrufen)' },
    termin: { uk: 'зустріч; прийом; запис', ru: 'встреча; приём; запись' },
    samstagvormittag: { uk: 'суботній ранок (до обіду)', ru: 'субботнее утро (до обеда)' },
    vorgeschlagen: { uk: 'запропонував (vorschlagen)', ru: 'предложил (vorschlagen)' },
    giesing: { uk: 'Ґізінґ (район Мюнхена)', ru: 'Гизинг (район Мюнхена)' },
    uni: { uk: 'університет (розм.)', ru: 'университет (разг.)' },
    erdgeschoss: { uk: 'перший поверх (Erdgeschoss)', ru: 'первый этаж (Erdgeschoss)' },
    dunkel: { uk: 'темний', ru: 'тёмный' },
    mieter: { uk: 'мешканці; орендарі', ru: 'жильцы; арендаторы' },
    teilen: { uk: 'ділити; ділитися', ru: 'делить; делиться' },
    frustriert: { uk: 'розчарований', ru: 'расстроенный' },
    pinwand: { uk: 'дошка оголошень', ru: 'доска объявлений' },
    hing: { uk: 'висів (hängen)', ru: 'висел (hängen)' },
    balkon: { uk: 'балкон', ru: 'балкон' },
    vermieterin: { uk: 'домовласниця', ru: 'домовладелица' },
    staunend: { uk: 'здивовано', ru: 'с удивлением' },
    kaution: { uk: 'депозит (гарантійний внесок)', ru: 'депозит (гарантийный взнос)' },
    monatsmieten: { uk: 'місячні орендні плати', ru: 'месячные арендные платы' },
    vertrag: { uk: 'договір', ru: 'договор' },
    mitgebracht: { uk: 'принесла (mitbringen)', ru: 'принесла (mitbringen)' },
    seiten: { uk: 'сторінки (die Seite)', ru: 'страницы (die Seite)' },
    schrift: { uk: 'шрифт; письмо', ru: 'шрифт; письмо' },
    unterschrieben: { uk: 'підписали (unterschreiben)', ru: 'подписали (unterschreiben)' },
    aufgeregt: { uk: 'схвильований', ru: 'взволнован' },
    positiven: { uk: 'позитивному (im positiven Sinn — у хорошому сенсі)', ru: 'положительном (im positiven Sinn — в хорошем смысле)' },
    sinn: { uk: 'сенс; зміст', ru: 'смысл; содержание' },
    einziehen: { uk: 'вʼїжджати (до житла)', ru: 'въезжать (в жильё)' },
    umzugstag: { uk: 'день переїзду', ru: 'день переезда' },
    transporter: { uk: 'фургон', ru: 'фургон' },
    kartons: { uk: 'коробки (der Karton)', ru: 'коробки (der Karton)' },
    schreibtisch: { uk: 'письмовий стіл', ru: 'письменный стол' },
    transportiert: { uk: 'перевезли (transportieren)', ru: 'перевезли (transportieren)' },
    treppen: { uk: 'сходи (die Treppe)', ru: 'лестницы (die Treppe)' },
    erschöpft: { uk: 'знесилений; виснажений', ru: 'измотанный; изнурённый' },
    bestellt: { uk: 'замовив (bestellen)', ru: 'заказал (bestellen)' },
    boden: { uk: 'підлога; земля', ru: 'пол; земля' },
    ausgepackt: { uk: 'розпакував (auspacken)', ru: 'распаковал (auspacken)' },
    matratze: { uk: 'матрац', ru: 'матрац' },
    schlafzimmer: { uk: 'спальня', ru: 'спальня' },
    mitternacht: { uk: 'північ (um Mitternacht — опівночі)', ru: 'полночь (um Mitternacht — в полночь)' },
    eingerichtet: { uk: 'облаштував (einrichten)', ru: 'обустроил (einrichten)' },
    gebrauchtes: { uk: 'вживаний (gebrucht — вживати)', ru: 'подержанный (gebraucht — использованный)' },
    sofa: { uk: 'диван', ru: 'диван' },
    regale: { uk: 'полиці (das Regal)', ru: 'полки (das Regal)' },
    baumarkt: { uk: 'будівельний магазин', ru: 'строительный магазин' },
    aufgebaut: { uk: 'зібрав; спорудив (aufbauen)', ru: 'собрал; соорудил (aufbauen)' },
    pflanzen: { uk: 'рослини (die Pflanze)', ru: 'растения (die Pflanze)' },
    einweihung: { uk: 'новосілля (символічне відкриття)', ru: 'новоселье (символическое открытие)' },
    willkommen: { uk: 'ласкаво просимо', ru: 'добро пожаловать' },
    anzeigen: { uk: 'оголошення (die Anzeige)', ru: 'объявления (die Anzeige)' },
    angerufen: { uk: 'подзвонив (anrufen)', ru: 'позвонил (anrufen)' },
    lag: { uk: 'була розташована (liegen — Präteritum)', ru: 'находилась (liegen — прош. вр.)' },
    angesehen: { uk: 'переглянув (ansehen)', ru: 'посмотрел (ansehen)' },
    'zimmer-wohnung': { uk: 'однокімнатна квартира (1-Zimmer-Wohnung)', ru: 'однокомнатная квартира (1-Zimmer-Wohnung)' },
    süden: { uk: 'південь', ru: 'юг' },
    versprochen: { uk: 'обіцяний (versprechen)', ru: 'обещанный (versprechen)' },
    kostete: { uk: 'коштувала (kosten)', ru: 'стоила (kosten)' },
    gestellt: { uk: 'поставив; задав (stellen)', ru: 'поставил; задал (stellen)' },
    monats: { uk: 'місяця (der Monat)', ru: 'месяца (der Monat)' },
    stand: { uk: 'стояло (stehen — Präteritum)', ru: 'стояло (stehen — прош. вр.)' },
    sachen: { uk: 'речі (die Sachen)', ru: 'вещи (die Sachen)' },
    lichter: { uk: 'вогні (das Licht)', ru: 'огни (das Licht)' },
    gefreut: { uk: 'радів (sich freuen)', ru: 'радовался (sich freuen)' },
    hamburg: { uk: 'Гамбург (місто)', ru: 'Гамбург (город)' },
    geschickt: { uk: 'надіслав (schicken)', ru: 'отправил (schicken)' },
    zuhause: { uk: 'домівка; рідний дім', ru: 'дом; родной дом' },
  },
}
