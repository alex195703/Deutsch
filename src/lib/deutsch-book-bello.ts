// ============================================================
// КНИЖКА 2 — «Маленький пес Белло» (A1). 10 розділів, ~1000 слів.
// Präsens + простий Perfekt у фіналі, короткі речення.
// ============================================================

import type { Book } from './deutsch-books'

export const BELLO_BOOK: Book = {
  id: 'bello',
  emoji: '🐶',
  level: 'A1',
  title: { uk: 'Маленький пес Белло', ru: 'Маленькая собака Белло' },
  blurb: {
    uk: 'Історія цуценяти Белло: новий дім, перші команди, зникнення під час грози і щасливе воззʼєднання.',
    ru: 'История щенка Белло: новый дом, первые команды, исчезновение во время грозы и счастливое воссоединение.',
  },
  chapters: [
    {
      title: { uk: 'Новий друг', ru: 'Новый друг' },
      paragraphs: [
        {
          de: 'Max hat heute Geburtstag. Er wird acht Jahre alt und wünscht sich schon lange einen Hund.',
          uk: 'У Макса сьогодні день народження. Йому виповнюється вісім років, і він уже давно хоче собі пса.',
          ru: 'У Макса сегодня день рождения. Ему исполняется восемь лет, и он уже давно хочет себе собаку.',
        },
        {
          de: 'Die Eltern bringen ein großes Paket. Etwas bewegt sich darin!',
          uk: 'Батьки приносять великий пакунок. Щось усередині рухається!',
          ru: 'Родители приносят большой пакет. Что-то внутри двигается!',
        },
        {
          de: 'Max öffnet das Paket — und sieht ein kleines braunes Welpengesicht.',
          uk: 'Макс відкриває пакунок — і бачить маленьку мордочку цуценяти.',
          ru: 'Макс открывает пакет — и видит маленькую мордочку щенка.',
        },
        {
          de: '„Er heißt Bello", sagt der Vater. „Er ist erst zwei Monate alt."',
          uk: '«Його звати Белло», — каже тато. «Йому лише два місяці».',
          ru: '«Его зовут Белло», — говорит папа. «Ему всего два месяца».',
        },
        {
          de: 'Max nimmt den kleinen Hund vorsichtig auf den Arm. Bello leckt ihm die Hand.',
          uk: 'Макс обережно бере маленького пса на руки. Белло лиже йому руку.',
          ru: 'Макс осторожно берёт маленькую собаку на руки. Белло лижет ему руку.',
        },
      ],
    },
    {
      title: { uk: 'Белло вдома', ru: 'Белло дома' },
      paragraphs: [
        {
          de: 'Bello bekommt einen Korb im Wohnzimmer. Darin liegt eine weiche Decke.',
          uk: 'Белло отримує кошик у вітальні. У ньому лежить мʼяка ковдра.',
          ru: 'Белло получает корзинку в гостиной. В ней лежит мягкое одеяло.',
        },
        {
          de: 'In der ersten Nacht weint Bello kurz. Dann schläft er ein.',
          uk: 'Першої ночі Белло трохи плаче. Потім він засинає.',
          ru: 'Первой ночью Белло немного плачет. Потом он засыпает.',
        },
        {
          de: 'Max lernt ihn füttern. Bello bekommt zweimal am Tag Futter.',
          uk: 'Макс учиться годувати його. Белло отримує їжу двічі на день.',
          ru: 'Макс учится кормить его. Белло получает еду два раза в день.',
        },
        {
          de: 'Das Wasser muss immer frisch sein, sagt die Mama.',
          uk: 'Вода має бути завжди свіжою, каже мама.',
          ru: 'Вода должна быть всегда свежей, говорит мама.',
        },
        {
          de: 'Nach einer Woche kennt Bello schon seinen Namen. Er kommt, wenn Max ruft.',
          uk: 'За тиждень Белло вже знає своє імʼя. Він приходить, коли Макс кличе.',
          ru: 'Через неделю Белло уже знает своё имя. Он приходит, когда Макс зовёт.',
        },
      ],
    },
    {
      title: { uk: 'Ранок із Белло', ru: 'Утро с Белло' },
      paragraphs: [
        {
          de: 'Um sechs Uhr wacht Bello auf. Er bellt, bis Max aufsteht.',
          uk: 'О шостій годині Белло прокидається. Він гавкає, поки Макс не встане.',
          ru: 'В шесть часов Белло просыпается. Он лает, пока Макс не встанет.',
        },
        {
          de: 'Zuerst geht der Junge mit dem Hund Gassi. Bello schnüffelt an jedem Baum.',
          uk: 'Спершу хлопець іде з псом на прогулянку. Белло нюхає кожне дерево.',
          ru: 'Сначала мальчик идёт с собакой на прогулку. Белло нюхает каждое дерево.',
        },
        {
          de: 'In der Küche wartet schon das Frühstück für Bello: Trockenfutter mit Wasser.',
          uk: 'На кухні вже чекає сніданок для Белло: сухий корм із водою.',
          ru: 'На кухне уже ждёт завтрак для Белло: сухой корм с водой.',
        },
        {
          de: 'Max frühstückt Brötchen mit Honig. Bello sitzt daneben und schaut ihn an.',
          uk: 'Макс сніддає булочки з медом. Белло сидить поруч і дивиться на нього.',
          ru: 'Макс завтракает булочки с мёдом. Белло сидит рядом и смотрит на него.',
        },
        {
          de: 'Dann muss Max in die Schule. Bello bleibt allein zu Hause und schläft.',
          uk: 'Потім Макс мусить іти до школи. Белло залишається вдома один і спить.',
          ru: 'Потом Макс должен идти в школу. Белло остаётся дома один и спит.',
        },
      ],
    },
    {
      title: { uk: 'У парку', ru: 'В парке' },
      paragraphs: [
        {
          de: 'Nach der Schule gehen Max und Bello in den Park. Dort treffen sie andere Hunde.',
          uk: 'Після школи Макс і Белло йдуть у парк. Там вони зустрічають інших собак.',
          ru: 'После школы Макс и Белло идут в парк. Там они встречают других собак.',
        },
        {
          de: 'Ein großer Hund heißt Rex. Er ist dreimal so groß wie Bello, aber ganz friedlich.',
          uk: 'Великого пса звати Рекс. Він утричі більший за Белло, але цілком мирний.',
          ru: 'Большого пса зовут Рекс. Он втрое больше Белло, но совсем мирный.',
        },
        {
          de: 'Die beiden Hunde rennen um die Wette. Rex ist schneller, aber Bello ist flinker.',
          uk: 'Обидва пси біжать наввипередки. Рекс швидший, але Белло спритніший.',
          ru: 'Обе собаки бегут наперегонки. Рекс быстрее, но Белло проворнее.',
        },
        {
          de: 'Max wirft einen Stock, und Bello bringt ihn zurück. Das macht er sehr gern.',
          uk: 'Макс кидає паличку, і Белло приносить її назад. Він дуже любить це робити.',
          ru: 'Макс бросает палочку, и Белло приносит её назад. Он очень любит это делать.',
        },
        {
          de: 'Dann wälzt er sich im Gras und wird ganz schmutzig. Max lacht nur.',
          uk: 'Потім він валяється в траві й стає зовсім брудним. Макс лише сміється.',
          ru: 'Потом он валяется в траве и становится совсем грязным. Макс только смеётся.',
        },
      ],
    },
    {
      title: { uk: 'Белло вчиться', ru: 'Белло учится' },
      paragraphs: [
        {
          de: 'Max will seinem Hund Tricks beibringen. Er liest ein Buch über Hundeerziehung.',
          uk: 'Макс хоче навчити свого пса трюків. Він читає книжку про дресирування.',
          ru: 'Макс хочет научить свою собаку трюкам. Он читает книгу о дрессировке.',
        },
        {
          de: 'Mit Leckerlis übt er „Sitz!" und „Platz!". Bello lernt schnell.',
          uk: 'За допомогою ласих шматочків він тренує «Сидіти!» і «Лежати!». Белло вчиться швидко.',
          ru: 'С помощью лакомств он тренирует «Сидеть!» и «Лежать!». Белло учится быстро.',
        },
        {
          de: 'Nach zwei Wochen gibt Bello die Pfote. Alle in der Familie sind begeistert.',
          uk: 'За два тижні Белло дає лапу. Уся родина у захваті.',
          ru: 'Через две недели Белло даёт лапу. Вся семья в восторге.',
        },
        {
          de: 'Auch „Bringen!" klappt gut. Nur beim „Bleiben!" ist Bello noch ungeduldig.',
          uk: 'І «Принеси!» теж виходить добре. А от із «Чекай!» Белло ще нетерплячий.',
          ru: 'И «Принеси!» тоже получается хорошо. А вот с «Ждать!» Белло ещё нетерпеливый.',
        },
        {
          de: 'Am Ende bekommt der kluge Hund immer eine Belohnung: ein Leckerli oder ein Spiel.',
          uk: 'Наприкінці розумний пес завжди отримує нагороду: ласий шматочок або гру.',
          ru: 'В конце умная собака всегда получает награду: лакомство или игру.',
        },
      ],
    },
    {
      title: { uk: 'Белло зникає', ru: 'Белло исчезает' },
      paragraphs: [
        {
          de: 'Eines Nachmittags ist es sehr heiß. Ein Gewitter kommt auf.',
          uk: 'Одного дня після обіду стає дуже спекотно. Наближається гроза.',
          ru: 'Однажды днём становится очень жарко. Приближается гроза.',
        },
        {
          de: 'Der Vater gießt im Garten die Blumen. Er vergisst das Gartentor zu schließen.',
          uk: 'Тато в саду поливає квіти. Він забуває зачинити садову хвіртку.',
          ru: 'Папа в саду поливает цветы. Он забывает закрыть садовую калитку.',
        },
        {
          de: 'Plötzlich donnert es laut. Bello bekommt Angst und läuft durch das offene Tor.',
          uk: 'Раптом гримить гучний грім. Белло лякається й вибігає у відчинену хвіртку.',
          ru: 'Вдруг громко гремит гром. Белло пугается и выбегает в открытую калитку.',
        },
        {
          de: 'Der Vater ruft und ruft, aber der Hund ist nicht mehr zu sehen.',
          uk: 'Тато кличе і кличе, але пса вже не видно.',
          ru: 'Папа зовёт и зовёт, но собаки уже не видно.',
        },
        {
          de: 'Als Max aus der Schule kommt, sitzt er traurig am Gartentor.',
          uk: 'Коли Макс приходить зі школи, він сумно сидить біля хвіртки.',
          ru: 'Когда Макс приходит из школы, он грустно сидит у калитки.',
        },
        {
          de: 'Die ganze Familie sucht bis in die Nacht. Bello ist nirgendwo.',
          uk: 'Уся родина шукає до самої ночі. Белло немає ніде.',
          ru: 'Вся семья ищет до самой ночи. Белло нет нигде.',
        },
      ],
    },
    {
      title: { uk: 'Пошуки', ru: 'Поиски' },
      paragraphs: [
        {
          de: 'Am nächsten Morgen machen Max und sein Vater Zettel mit einem Foto.',
          uk: 'Наступного ранку Макс із татом роблять папірці з фотографією.',
          ru: 'На следующее утро Макс с папой делают листовки с фотографией.',
        },
        {
          de: 'Sie hängen die Zettel in der Nachbarschaft auf: „Vermisst: kleiner brauner Hund".',
          uk: 'Вони вішають папірці по сусідству: «Зник: маленький коричневий пес».',
          ru: 'Они вешают листовки по соседству: «Пропал: маленькая коричневая собака».',
        },
        {
          de: 'Die Nachbarn helfen mit. Die alte Frau Krause durchsucht den Park.',
          uk: 'Сусіди допомагають. Стара пані Краузе обстежує парк.',
          ru: 'Соседи помогают. Старая фрау Краузе обыскивает парк.',
        },
        {
          de: 'Auch Klara aus Maxs Klasse fragt in ihrer Straße. Niemand hat Bello gesehen.',
          uk: 'Клара з класу Макса теж питає на своїй вулиці. Ніхто не бачив Белло.',
          ru: 'Клара из класса Макса тоже спрашивает на своей улице. Никто не видел Белло.',
        },
        {
          de: 'In der Nacht regnet es. Max kann nicht schlafen und denkt nur an seinen Hund.',
          uk: 'Уночі йде дощ. Макс не може спати і думає тільки про свого пса.',
          ru: 'Ночью идёт дождь. Макс не может спать и думает только о своей собаке.',
        },
      ],
    },
    {
      title: { uk: 'Знахідка', ru: 'Находка' },
      paragraphs: [
        {
          de: 'Am dritten Tag klingelt es an der Tür. Es ist Frau Krause.',
          uk: 'На третій день дзвонять у двері. Це пані Краузе.',
          ru: 'На третий день звонят в дверь. Это фрау Краузе.',
        },
        {
          de: '„Ich habe einen Hund gesehen", sagt sie. „Er sitzt seit gestern bei der Bäckerei."',
          uk: '«Я бачила пса», — каже вона. «Він сидить з учорашнього дня біля пекарні».',
          ru: '«Я видела собаку», — говорит она. «Он сидит со вчерашнего дня у пекарни».',
        },
        {
          de: 'Max und sein Vater laufen so schnell sie können zur Bäckerei.',
          uk: 'Макс і тато біжать, як тільки можуть, до пекарні.',
          ru: 'Макс и папа бегут, как только могут, к пекарне.',
        },
        {
          de: 'Dort, unter einem Tisch, sitzt ein nasser, schmutziger und hungriger Hund: Bello!',
          uk: 'Там, під столом, сидить мокрий, брудний і голодний пес: Белло!',
          ru: 'Там, под столом, сидит мокрая, грязная и голодная собака: Белло!',
        },
        {
          de: '„Bello!", ruft Max. Der Hund springt auf und schleckt ihm das Gesicht.',
          uk: '«Белло!» — кличе Макс. Пес стрибає вгору й лиже йому обличчя.',
          ru: '«Белло!» — зовёт Макс. Собака прыгает вверх и лижет ему лицо.',
        },
        {
          de: 'Der Bäcker hat dem Hund Brot gegeben. „Er hat die ganze Zeit geweint", sagt er.',
          uk: 'Пекар дав псові хліб. «Він увесь час скиглив», — каже він.',
          ru: 'Пекарь дал собаке хлеб. «Он всё время скулил», — говорит он.',
        },
      ],
    },
    {
      title: { uk: 'У ветеринара', ru: 'У ветеринара' },
      paragraphs: [
        {
          de: 'Am Samstag fährt die Familie mit Bello zum Tierarzt.',
          uk: 'У суботу родина їде з Белло до ветеринара.',
          ru: 'В субботу семья едет с Белло к ветеринару.',
        },
        {
          de: 'Der Tierarzt hört das Herz des Hundes ab und schaut in seine Ohren.',
          uk: 'Ветеринар прослуховує серце пса і дивиться в його вуха.',
          ru: 'Ветеринар прослушивает сердце собаки и смотрит в его уши.',
        },
        {
          de: '„Alles in Ordnung", sagt er. „Aber er braucht eine Impfung."',
          uk: '«Усе гаразд», — каже він. «Але йому потрібне щеплення».',
          ru: '«Всё в порядке», — говорит он. «Но ему нужна прививка».',
        },
        {
          de: 'Die Spritze tut kurz weh. Bello jault, aber dann ist alles vorbei.',
          uk: 'Укол коротко болить. Белло скигає, але потім усе минає.',
          ru: 'Укол недолго болит. Белло скулит, но потом всё проходит.',
        },
        {
          de: 'Außerdem bekommt Bello einen Chip mit der Adresse von Maxs Familie.',
          uk: 'Крім того, Белло отримує чіп із адресою родини Макса.',
          ru: 'Кроме того, Белло получает чип с адресом семьи Макса.',
        },
        {
          de: 'Zum Dank bekommt der brave Hund vom Tierarzt ein Leckerli.',
          uk: 'На подяку слухняний пес отримує від ветеринара ласий шматочок.',
          ru: 'В благодарность послушная собака получает от ветеринара лакомство.',
        },
      ],
    },
    {
      title: { uk: 'День на озері', ru: 'День на озере' },
      paragraphs: [
        {
          de: 'Am Sonntag fährt die Familie mit dem Auto an den See. Bello sitzt hinten und schaut aus dem Fenster.',
          uk: 'У неділю родина їде машиною на озеро. Белло сидить ззаду й дивиться у вікно.',
          ru: 'В воскресенье семья едет на машине на озеро. Белло сидит сзади и смотрит в окно.',
        },
        {
          de: 'Am Ufer springt Bello sofort ins Wasser.',
          uk: 'На березі Белло одразу стрибає у воду.',
          ru: 'На берегу Белло сразу прыгает в воду.',
        },
        {
          de: 'Er schwimmt wie ein Profi und holt einen Stock aus dem Wasser.',
          uk: 'Він плаває, як професіонал, і дістає паличку з води.',
          ru: 'Он плавает, как профессионал, и достаёт палочку из воды.',
        },
        {
          de: 'Max lacht und plantscht mit ihm. Auch die Eltern gehen kurz baden.',
          uk: 'Макс сміється і бризкається з ним. Батьки теж недовго купаються.',
          ru: 'Макс смеётся и брызгается с ним. Родители тоже недолго купаются.',
        },
        {
          de: 'Am Abend liegt Bello müde in Maxs Arm. Er ist kein Welpe mehr — er ist der beste Freund.',
          uk: 'Увечері втомлений Белло лежить в обіймах Макса. Він уже не цуценя — він найкращий друг.',
          ru: 'Вечером усталый Белло лежит в объятиях Макса. Он уже не щенок — он лучший друг.',
        },
      ],
    },
  ],
  glossary: {
    max: { uk: 'чоловіче імʼя (господар Белло)', ru: 'мужское имя (хозяин Белло)' },
    bello: { uk: 'кличка пса', ru: 'кличка собаки' },
    rex: { uk: 'кличка великого пса', ru: 'кличка большой собаки' },
    krause: { uk: 'прізвище сусідки', ru: 'фамилия соседки' },
    bewegt: { uk: 'рухається (sich bewegen)', ru: 'двигается (sich bewegen)' },
    welpe: { uk: 'цуценя (Welpengesicht — мордочка цуценяти)', ru: 'щенок (Welpengesicht — мордочка щенка)' },
    monate: { uk: 'місяці (der Monat)', ru: 'месяцы (der Monat)' },
    leckt: { uk: 'лиже (lecken)', ru: 'лижет (lecken)' },
    weiche: { uk: 'мʼяка', ru: 'мягкая' },
    decke: { uk: 'ковдра; покривало', ru: 'одеяло; покрывало' },
    füttern: { uk: 'годувати', ru: 'кормить' },
    futter: { uk: 'корм; їжа (для тварин)', ru: 'корм; еда (для животных)' },
    frisch: { uk: 'свіжий', ru: 'свежий' },
    wacht: { uk: 'прокидається (aufwachen)', ru: 'просыпается (aufwachen)' },
    gassi: { uk: 'прогулянка з псом (Gassi gehen)', ru: 'прогулка с собакой (Gassi gehen)' },
    schnüffelt: { uk: 'нюхає; рицяє', ru: 'нюхает; рыщет' },
    trockenfutter: { uk: 'сухий корм', ru: 'сухой корм' },
    honig: { uk: 'мед', ru: 'мёд' },
    bleibt: { uk: 'залишається (bleiben)', ru: 'остаётся (bleiben)' },
    dreimal: { uk: 'втричі; три рази', ru: 'втрое; три раза' },
    friedlich: { uk: 'мирний; спокійний', ru: 'мирный; спокойный' },
    rennen: { uk: 'біжать (швидко)', ru: 'бегут (быстро)' },
    wette: { uk: 'парі (um die Wette — наввипередки)', ru: 'пари (um die Wette — наперегонки)' },
    flinker: { uk: 'спритніший', ru: 'проворнее' },
    stock: { uk: 'палиця; гілка', ru: 'палка; ветка' },
    wälzt: { uk: 'валяється (sich wälzen)', ru: 'валяется (sich wälzen)' },
    schmutzig: { uk: 'брудний', ru: 'грязный' },
    tricks: { uk: 'трюки (der Trick)', ru: 'трюки (der Trick)' },
    hundeerziehung: { uk: 'дресирування собак', ru: 'дрессировка собак' },
    leckerlis: { uk: 'ласі шматочки; лакомства', ru: 'лакомства' },
    übt: { uk: 'тренує; вправляється (üben)', ru: 'тренирует (üben)' },
    sitz: { uk: 'сидіти! (команда)', ru: 'сидеть! (команда)' },
    platz: { uk: 'лежати! (команда); місце', ru: 'лежать! (команда); место' },
    begeistert: { uk: 'у захваті; захоплений', ru: 'в восторге; восхищён' },
    klappt: { uk: 'виходить; вдається', ru: 'получается' },
    ungeduldig: { uk: 'нетерплячий', ru: 'нетерпеливый' },
    kluge: { uk: 'розумний', ru: 'умный' },
    belohnung: { uk: 'нагорода', ru: 'награда' },
    heiß: { uk: 'спекотно; гарячий', ru: 'жарко; горячий' },
    gewitter: { uk: 'гроза', ru: 'гроза' },
    gießt: { uk: 'поливає (gießen)', ru: 'поливает (gießen)' },
    vergisst: { uk: 'забуває (vergessen)', ru: 'забывает (vergessen)' },
    gartentor: { uk: 'садова хвіртка', ru: 'садовая калитка' },
    donnert: { uk: 'гримить грім (donnern)', ru: 'гремит гром (donnern)' },
    angst: { uk: 'страх (Angst bekommen — злякатися)', ru: 'страх (Angst bekommen — пугаться)' },
    traurig: { uk: 'сумний; смутний', ru: 'грустный; печальный' },
    nirgendwo: { uk: 'ніде; ніде не', ru: 'нигде; нигде не' },
    zettel: { uk: 'папірець; записка', ru: 'листок; записка' },
    nachbarschaft: { uk: 'сусідство; сусідній квартал', ru: 'соседство; соседний квартал' },
    vermisst: { uk: 'зниклий безвісти (vermissen — шукати)', ru: 'пропавший без вести (vermissen — искать)' },
    durchsucht: { uk: 'обстежує; обшукує', ru: 'обыскивает; обследует' },
    regnet: { uk: 'ідете дощ (regnen)', ru: 'идёт дождь (regnen)' },
    nasser: { uk: 'мокрий', ru: 'мокрый' },
    hungriger: { uk: 'голодний', ru: 'голодный' },
    springt: { uk: 'стрибає (springen)', ru: 'прыгает (springen)' },
    schleckt: { uk: 'лиже (schlecken)', ru: 'лижет (schlecken)' },
    bäcker: { uk: 'пекар', ru: 'пекарь' },
    geweint: { uk: 'плакав (weinen)', ru: 'плакал (weinen)' },
    hört: { uk: 'слухає (hören)', ru: 'слушает (hören)' },
    herz: { uk: 'серце', ru: 'сердце' },
    impfung: { uk: 'щеплення', ru: 'прививка' },
    spritze: { uk: 'інʼєкція; укол', ru: 'инъекция; укол' },
    jault: { uk: 'скигає', ru: 'скулит' },
    chip: { uk: 'чіп (мікрочіп тварини)', ru: 'чип (микрочип животного)' },
    adresse: { uk: 'адреса', ru: 'адрес' },
    dank: { uk: 'подяка (zum Dank — на подяку)', ru: 'благодарность (zum Dank — в благодарность)' },
    brave: { uk: 'слухняний; добрий', ru: 'послушный; хороший' },
    ufer: { uk: 'берег', ru: 'берег' },
    profi: { uk: 'професіонал', ru: 'профессионал' },
    plantscht: { uk: 'бризкається', ru: 'брызгается' },
    baden: { uk: 'купатися', ru: 'купаться' },
    arme: { uk: 'обійми; руки (der Arm)', ru: 'объятия; руки (der Arm)' },
    welpengesicht: { uk: 'мордочка цуценяти', ru: 'мордочка щенка' },
    korb: { uk: 'кошик-лежанка пса', ru: 'корзинка-лежанка собаки' },
    namen: { uk: 'імʼя (der Name — Akk.)', ru: 'имя (der Name — акк.)' },
    beibringen: { uk: 'навчати (чогось)', ru: 'обучать (чему-то)' },
    pfote: { uk: 'лапа (gibt die Pfote — дає лапу)', ru: 'лапа (даёт лапу)' },
    leckerli: { uk: 'ласий шматочок; лакомство для пса', ru: 'лакомство для собаки' },
    maxs: { uk: 'Макса (Maxs Klasse — клас Макса)', ru: 'Макса (класс Макса)' },
    tierarzt: { uk: 'ветеринар (лікар тварин)', ru: 'ветеринар (врач животных)' },
    beste: { uk: 'найкращий', ru: 'лучший' },
  },
}
