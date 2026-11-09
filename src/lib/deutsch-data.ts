// ============================================================
// ДАНІ ТРЕНАЖЕРА НІМЕЦЬКОЇ — A1 + A2 + B1 + фрази (Redemittel).
// Слова беруться з файлів: deutsch-data.ts (A1, тут),
// deutsch-a2-1/2.ts, deutsch-b1-1/2.ts, deutsch-phrases.ts.
// Приклади-речення з файлів deutsch-ex-*.ts підтягуються в
// withExamples() — кожне слово має типове речення ситуації.
// Кожне слово: de — німецькою; art/pl — артикль і множина
// для іменників; uk/ru — переклад; ex — приклад речення.
// Українська — перша мова, російська — друга (шар i18n.tsx).
// ============================================================

import { TOPICS_A2_1 } from './deutsch-a2-1'
import { TOPICS_A2_2 } from './deutsch-a2-2'
import { TOPICS_B1_1 } from './deutsch-b1-1'
import { TOPICS_B1_2 } from './deutsch-b1-2'
import { TOPICS_PHR } from './deutsch-phrases'
import { EXAMPLES } from './deutsch-examples'

export type Ex = { de: string; uk: string; ru: string }

export type Level = 'A1' | 'A2' | 'B1'

export type Word = {
  de: string
  art?: 'der' | 'die' | 'das'
  pl?: string
  uk: string
  ru: string
  ex?: Ex
}

export type Topic = {
  id: string
  emoji: string
  level: Level
  name: { uk: string; ru: string }
  words: Word[]
}

const TOPICS_A1: Topic[] = [
  {
    id: 'begr',
    emoji: '👋',
    level: 'A1',
    name: { uk: 'Привітання і ввічливість', ru: 'Приветствия и вежливость' },
    words: [
      { de: 'Hallo', uk: 'Привіт', ru: 'Привет', ex: { de: 'Hallo, wie geht es dir?', uk: 'Привіт, як твої справи?', ru: 'Привет, как твои дела?' } },
      { de: 'Guten Morgen', uk: 'Доброго ранку', ru: 'Доброе утро', ex: { de: 'Guten Morgen, Anna!', uk: 'Доброго ранку, Ганно!', ru: 'Доброе утро, Анна!' } },
      { de: 'Guten Tag', uk: 'Добрий день', ru: 'Добрый день', ex: { de: 'Guten Tag, Herr Müller!', uk: 'Добрий день, пане Мюллере!', ru: 'Добрый день, господин Мюллер!' } },
      { de: 'Guten Abend', uk: 'Добрий вечір', ru: 'Добрый вечер' },
      { de: 'Gute Nacht', uk: 'На добраніч', ru: 'Доброй ночи' },
      { de: 'Tschüss', uk: 'Бувай', ru: 'Пока' },
      { de: 'Auf Wiedersehen', uk: 'До побачення', ru: 'До свидания' },
      { de: 'Bitte', uk: 'Будь ласка', ru: 'Пожалуйста', ex: { de: 'Noch ein Wasser, bitte.', uk: 'Ще одну воду, будь ласка.', ru: 'Ещё одну воду, пожалуйста.' } },
      { de: 'Danke', uk: 'Дякую', ru: 'Спасибо', ex: { de: 'Danke für die Hilfe!', uk: 'Дякую за допомогу!', ru: 'Спасибо за помощь!' } },
      { de: 'Entschuldigung', uk: 'Вибачте', ru: 'Извините', ex: { de: 'Entschuldigung, wo ist der Bahnhof?', uk: 'Вибачте, де вокзал?', ru: 'Извините, где вокзал?' } },
      { de: 'Wie geht es dir?', uk: 'Як твої справи?', ru: 'Как твои дела?' },
      { de: 'Ich heiße …', uk: 'Мене звати …', ru: 'Меня зовут …', ex: { de: 'Ich heiße Anna. Und du?', uk: 'Мене звати Анна. А тебе?', ru: 'Меня зовут Анна. А тебя?' } },
    ],
  },
  {
    id: 'familie',
    emoji: '👨‍👩‍👧',
    level: 'A1',
    name: { uk: 'Людина і сімʼя', ru: 'Человек и семья' },
    words: [
      { de: 'Mann', art: 'der', pl: 'Männer', uk: 'чоловік', ru: 'мужчина; муж', ex: { de: 'Das ist mein Mann.', uk: 'Це мій чоловік.', ru: 'Это мой муж.' } },
      { de: 'Frau', art: 'die', pl: 'Frauen', uk: 'жінка', ru: 'женщина; жена', ex: { de: 'Die Frau heißt Petra.', uk: 'Жінку звати Петра.', ru: 'Женщину зовут Петра.' } },
      { de: 'Kind', art: 'das', pl: 'Kinder', uk: 'дитина', ru: 'ребёнок', ex: { de: 'Das Kind spielt im Park.', uk: 'Дитина грається в парку.', ru: 'Ребёнок играет в парке.' } },
      { de: 'Familie', art: 'die', pl: 'Familien', uk: 'сімʼя', ru: 'семья', ex: { de: 'Meine Familie wohnt in Kiew.', uk: 'Моя сімʼя живе в Києві.', ru: 'Моя семья живёт в Киеве.' } },
      { de: 'Vater', art: 'der', pl: 'Väter', uk: 'батько', ru: 'отец' },
      { de: 'Mutter', art: 'die', pl: 'Mütter', uk: 'мати', ru: 'мать', ex: { de: 'Meine Mutter kocht gut.', uk: 'Моя мати добре готує.', ru: 'Моя мать хорошо готовит.' } },
      { de: 'Sohn', art: 'der', pl: 'Söhne', uk: 'син', ru: 'сын' },
      { de: 'Tochter', art: 'die', pl: 'Töchter', uk: 'донька', ru: 'дочь' },
      { de: 'Bruder', art: 'der', pl: 'Brüder', uk: 'брат', ru: 'брат' },
      { de: 'Schwester', art: 'die', pl: 'Schwestern', uk: 'сестра', ru: 'сестра' },
      { de: 'Freund', art: 'der', pl: 'Freunde', uk: 'друг', ru: 'друг', ex: { de: 'Mein Freund kommt morgen.', uk: 'Мій друг приїде завтра.', ru: 'Мой друг приедет завтра.' } },
      { de: 'Oma', art: 'die', pl: 'Omas', uk: 'бабуся', ru: 'бабушка' },
    ],
  },
  {
    id: 'essen',
    emoji: '🍎',
    level: 'A1',
    name: { uk: 'Їжа і напої', ru: 'Еда и напитки' },
    words: [
      { de: 'Brot', art: 'das', uk: 'хліб', ru: 'хлеб', ex: { de: 'Das Brot ist frisch.', uk: 'Хліб свіжий.', ru: 'Хлеб свежий.' } },
      { de: 'Wasser', art: 'das', uk: 'вода', ru: 'вода', ex: { de: 'Ich trinke viel Wasser.', uk: 'Я пʼю багато води.', ru: 'Я пью много воды.' } },
      { de: 'Kaffee', art: 'der', uk: 'кава', ru: 'кофе', ex: { de: 'Am Morgen trinke ich Kaffee.', uk: 'Зранку я пʼю каву.', ru: 'Утром я пью кофе.' } },
      { de: 'Tee', art: 'der', uk: 'чай', ru: 'чай', ex: { de: 'Der Tee ist heiß.', uk: 'Чай гарячий.', ru: 'Чай горячий.' } },
      { de: 'Milch', art: 'die', uk: 'молоко', ru: 'молоко', ex: { de: 'Die Milch ist im Kühlschrank.', uk: 'Молоко в холодильнику.', ru: 'Молоко в холодильнике.' } },
      { de: 'Apfel', art: 'der', pl: 'Äpfel', uk: 'яблуко', ru: 'яблоко', ex: { de: 'Ich esse einen Apfel.', uk: 'Я їм яблуко.', ru: 'Я ем яблоко.' } },
      { de: 'Fleisch', art: 'das', uk: 'мʼясо', ru: 'мясо', ex: { de: 'Ich esse kein Fleisch.', uk: 'Я не їм мʼяса.', ru: 'Я не ем мяса.' } },
      { de: 'Käse', art: 'der', uk: 'сир', ru: 'сыр', ex: { de: 'Ich mag Käse.', uk: 'Я люблю сир.', ru: 'Я люблю сыр.' } },
      { de: 'Suppe', art: 'die', pl: 'Suppen', uk: 'суп', ru: 'суп', ex: { de: 'Die Suppe schmeckt gut.', uk: 'Суп смачний.', ru: 'Суп вкусный.' } },
      { de: 'Kuchen', art: 'der', uk: 'торт; пиріг', ru: 'торт; пирог', ex: { de: 'Der Kuchen schmeckt lecker.', uk: 'Торт дуже смачний.', ru: 'Торт очень вкусный.' } },
      { de: 'Gemüse', art: 'das', uk: 'овочі', ru: 'овощи', ex: { de: 'Gemüse ist gesund.', uk: 'Овочі корисні.', ru: 'Овощи полезны.' } },
      { de: 'Obst', art: 'das', uk: 'фрукти', ru: 'фрукты', ex: { de: 'Ich esse viel Obst.', uk: 'Я їм багато фруктів.', ru: 'Я ем много фруктов.' } },
    ],
  },
  {
    id: 'zahlen',
    emoji: '🔢',
    level: 'A1',
    name: { uk: 'Числа', ru: 'Числа' },
    words: [
      { de: 'eins', uk: 'один', ru: 'один' },
      { de: 'zwei', uk: 'два', ru: 'два', ex: { de: 'Ich habe zwei Kinder.', uk: 'У мене двоє дітей.', ru: 'У меня двое детей.' } },
      { de: 'drei', uk: 'три', ru: 'три' },
      { de: 'vier', uk: 'чотири', ru: 'четыре' },
      { de: 'fünf', uk: 'пʼять', ru: 'пять' },
      { de: 'sechs', uk: 'шість', ru: 'шесть' },
      { de: 'sieben', uk: 'сім', ru: 'семь' },
      { de: 'acht', uk: 'вісім', ru: 'восемь' },
      { de: 'neun', uk: 'девʼять', ru: 'девять' },
      { de: 'zehn', uk: 'десять', ru: 'десять' },
      { de: 'elf', uk: 'одинадцять', ru: 'одиннадцать' },
      { de: 'zwölf', uk: 'дванадцять', ru: 'двенадцать' },
      { de: 'zwanzig', uk: 'двадцять', ru: 'двадцать', ex: { de: 'Mein Bruder ist zwanzig Jahre alt.', uk: 'Моєму брату двадцять років.', ru: 'Моему брату двадцать лет.' } },
      { de: 'hundert', uk: 'сто', ru: 'сто' },
    ],
  },
  {
    id: 'farben',
    emoji: '🎨',
    level: 'A1',
    name: { uk: 'Кольори', ru: 'Цвета' },
    words: [
      { de: 'rot', uk: 'червоний', ru: 'красный', ex: { de: 'Das Auto ist rot.', uk: 'Автомобіль червоний.', ru: 'Машина красная.' } },
      { de: 'blau', uk: 'синій', ru: 'синий', ex: { de: 'Der Himmel ist blau.', uk: 'Небо синє.', ru: 'Небо синее.' } },
      { de: 'grün', uk: 'зелений', ru: 'зелёный', ex: { de: 'Der Wald ist grün.', uk: 'Ліс зелений.', ru: 'Лес зелёный.' } },
      { de: 'gelb', uk: 'жовтий', ru: 'жёлтый' },
      { de: 'schwarz', uk: 'чорний', ru: 'чёрный', ex: { de: 'Die Katze ist schwarz.', uk: 'Кіт чорний.', ru: 'Кот чёрный.' } },
      { de: 'weiß', uk: 'білий', ru: 'белый' },
      { de: 'braun', uk: 'коричневий', ru: 'коричневый' },
      { de: 'grau', uk: 'сірий', ru: 'серый' },
      { de: 'orange', uk: 'помаранчевий', ru: 'оранжевый' },
      { de: 'rosa', uk: 'рожевий', ru: 'розовый' },
    ],
  },
  {
    id: 'zeit',
    emoji: '⏰',
    level: 'A1',
    name: { uk: 'Час', ru: 'Время' },
    words: [
      { de: 'heute', uk: 'сьогодні', ru: 'сегодня', ex: { de: 'Heute bleibe ich zu Hause.', uk: 'Сьогодні я залишаюся вдома.', ru: 'Сегодня я остаюсь дома.' } },
      { de: 'morgen', uk: 'завтра', ru: 'завтра', ex: { de: 'Morgen fahre ich nach Berlin.', uk: 'Завтра я їду до Берліна.', ru: 'Завтра я еду в Берлин.' } },
      { de: 'gestern', uk: 'учора', ru: 'вчера' },
      { de: 'jetzt', uk: 'зараз', ru: 'сейчас', ex: { de: 'Jetzt muss ich lernen.', uk: 'Тепер я мушу вчитися.', ru: 'Теперь я должен учиться.' } },
      { de: 'früh', uk: 'рано', ru: 'рано' },
      { de: 'spät', uk: 'пізно', ru: 'поздно', ex: { de: 'Es ist spät. Gute Nacht!', uk: 'Вже пізно. На добраніч!', ru: 'Уже поздно. Доброй ночи!' } },
      { de: 'Tag', art: 'der', pl: 'Tage', uk: 'день', ru: 'день' },
      { de: 'Woche', art: 'die', pl: 'Wochen', uk: 'тиждень', ru: 'неделя', ex: { de: 'Die Woche hat sieben Tage.', uk: 'Тиждень має сім днів.', ru: 'В неделе семь дней.' } },
      { de: 'Monat', art: 'der', pl: 'Monate', uk: 'місяць', ru: 'месяц' },
      { de: 'Jahr', art: 'das', pl: 'Jahre', uk: 'рік', ru: 'год', ex: { de: 'Das Jahr hat zwölf Monate.', uk: 'Рік має дванадцять місяців.', ru: 'В году двенадцать месяцев.' } },
      { de: 'Stunde', art: 'die', pl: 'Stunden', uk: 'година', ru: 'час' },
      { de: 'Minute', art: 'die', pl: 'Minuten', uk: 'хвилина', ru: 'минута' },
    ],
  },
  {
    id: 'tage',
    emoji: '📅',
    level: 'A1',
    name: { uk: 'Дні тижня', ru: 'Дни недели' },
    words: [
      { de: 'Montag', art: 'der', uk: 'понеділок', ru: 'понедельник', ex: { de: 'Am Montag arbeite ich.', uk: 'У понеділок я працюю.', ru: 'В понедельник я работаю.' } },
      { de: 'Dienstag', art: 'der', uk: 'вівторок', ru: 'вторник' },
      { de: 'Mittwoch', art: 'der', uk: 'середа', ru: 'среда' },
      { de: 'Donnerstag', art: 'der', uk: 'четвер', ru: 'четверг' },
      { de: 'Freitag', art: 'der', uk: 'пʼятниця', ru: 'пятница', ex: { de: 'Am Freitag gehe ich ins Kino.', uk: 'У пʼятницю я йду в кіно.', ru: 'В пятницу я иду в кино.' } },
      { de: 'Samstag', art: 'der', uk: 'субота', ru: 'суббота' },
      { de: 'Sonntag', art: 'der', uk: 'неділя', ru: 'воскресенье' },
      { de: 'Wochenende', art: 'das', pl: 'Wochenenden', uk: 'вихідні', ru: 'выходные', ex: { de: 'Schönes Wochenende!', uk: 'Гарних вихідних!', ru: 'Хороших выходных!' } },
    ],
  },
  {
    id: 'ort',
    emoji: '📍',
    level: 'A1',
    name: { uk: 'Місце: тут, там, вгорі', ru: 'Место: здесь, там, наверху' },
    words: [
      { de: 'hier', uk: 'тут', ru: 'здесь', ex: { de: 'Hier wohnt meine Familie.', uk: 'Тут живе моя родина.', ru: 'Здесь живёт моя семья.' } },
      { de: 'dort', uk: 'там', ru: 'там', ex: { de: 'Dort ist die Küche.', uk: 'Там кухня.', ru: 'Там кухня.' } },
      { de: 'da drüben', uk: 'вон там', ru: 'вон там', ex: { de: 'Die Post ist da drüben.', uk: 'Пошта вон там.', ru: 'Почта вон там.' } },
      { de: 'vorne', uk: 'спереду', ru: 'впереди', ex: { de: 'Der Lehrer steht vorne.', uk: 'Учитель стоїть спереду.', ru: 'Учитель стоит впереди.' } },
      { de: 'hinten', uk: 'позаду', ru: 'сзади', ex: { de: 'Die Kinder sitzen hinten.', uk: 'Діти сидять позаду.', ru: 'Дети сидят сзади.' } },
      { de: 'oben', uk: 'вгорі', ru: 'наверху', ex: { de: 'Das Badezimmer ist oben.', uk: 'Ванна кімната вгорі.', ru: 'Ванная комната наверху.' } },
      { de: 'unten', uk: 'внизу', ru: 'внизу', ex: { de: 'Der Keller ist unten.', uk: 'Підвал внизу.', ru: 'Подвал внизу.' } },
      { de: 'drinnen', uk: 'всередині', ru: 'внутри', ex: { de: 'Wir warten drinnen.', uk: 'Ми чекаємо всередині.', ru: 'Мы ждём внутри.' } },
      { de: 'draußen', uk: 'надворі', ru: 'на улице', ex: { de: 'Die Kinder spielen draußen.', uk: 'Діти граються надворі.', ru: 'Дети играют на улице.' } },
      { de: 'mitten', uk: 'посередині', ru: 'посередине', ex: { de: 'Der Tisch steht mitten im Zimmer.', uk: 'Стіл стоїть посеред кімнати.', ru: 'Стол стоит посередине комнаты.' } },
      { de: 'nebendran', uk: 'поруч', ru: 'рядом', ex: { de: 'Das Café ist nebendran.', uk: 'Кавʼярня поруч.', ru: 'Кафе рядом.' } },
      { de: 'überall', uk: 'скрізь', ru: 'везде', ex: { de: 'Überall liegen Blätter.', uk: 'Скрізь лежить листя.', ru: 'Везде лежат листья.' } },
      { de: 'nirgendwo', uk: 'ніде', ru: 'нигде', ex: { de: 'Ich finde meine Schlüssel nirgendwo.', uk: 'Я ніде не можу знайти свої ключі.', ru: 'Я нигде не могу найти свои ключи.' } },
      { de: 'hierher', uk: 'сюди', ru: 'сюда', ex: { de: 'Komm bitte hierher!', uk: 'Підійди, будь ласка, сюди!', ru: 'Подойди, пожалуйста, сюда!' } },
      { de: 'dorthin', uk: 'туди', ru: 'туда', ex: { de: 'Wie komme ich dorthin?', uk: 'Як мені туди дістатися?', ru: 'Как мне туда добраться?' } },
      { de: 'irgendwo', uk: 'десь', ru: 'где-то', ex: { de: 'Mein Handy ist irgendwo im Zimmer.', uk: 'Мій телефон десь у кімнаті.', ru: 'Мой телефон где-то в комнате.' } },
    ],
  },
  {
    id: 'wann',
    emoji: '⏱️',
    level: 'A1',
    name: { uk: 'Час: спочатку, потім, іноді', ru: 'Время: сначала, потом, иногда' },
    words: [
      { de: 'sofort', uk: 'одразу', ru: 'сразу', ex: { de: 'Ich rufe dich sofort an.', uk: 'Я одразу тобі подзвоню.', ru: 'Я сразу тебе позвоню.' } },
      { de: 'später', uk: 'пізніше', ru: 'позже', ex: { de: 'Später trinken wir Kaffee.', uk: 'Пізніше ми випʼємо кави.', ru: 'Позже мы выпьем кофе.' } },
      { de: 'früher', uk: 'раніше', ru: 'раньше', ex: { de: 'Früher wohnte ich in Kiew.', uk: 'Раніше я жив у Києві.', ru: 'Раньше я жил в Киеве.' } },
      { de: 'dann', uk: 'потім', ru: 'потом', ex: { de: 'Dann fahre ich nach Hause.', uk: 'Потім я їду додому.', ru: 'Потом я еду домой.' } },
      { de: 'danach', uk: 'після цього', ru: 'после этого', ex: { de: 'Wir treffen uns um sechs, danach essen wir.', uk: 'Зустрінемось о шостій, після цього поїмо.', ru: 'Встретимся в шесть, после этого поедим.' } },
      { de: 'zuerst', uk: 'спочатку', ru: 'сначала', ex: { de: 'Zuerst wasche ich die Hände.', uk: 'Спочатку мию руки.', ru: 'Сначала мою руки.' } },
      { de: 'zuletzt', uk: 'наостанок', ru: 'в конце', ex: { de: 'Zuletzt lese ich ein Buch.', uk: 'Наостанок читаю книжку.', ru: 'В конце читаю книгу.' } },
      { de: 'manchmal', uk: 'іноді', ru: 'иногда', ex: { de: 'Manchmal spiele ich Fußball.', uk: 'Іноді я граю у футбол.', ru: 'Иногда я играю в футбол.' } },
      { de: 'täglich', uk: 'щодня', ru: 'ежедневно', ex: { de: 'Ich gehe täglich spazieren.', uk: 'Я щодня гуляю.', ru: 'Я ежедневно гуляю.' } },
      { de: 'morgens', uk: 'вранці', ru: 'по утрам', ex: { de: 'Morgens trinke ich Tee.', uk: 'Вранці я пʼю чай.', ru: 'По утрам я пью чай.' } },
      { de: 'abends', uk: 'увечері', ru: 'по вечерам', ex: { de: 'Abends sehe ich fern.', uk: 'Увечері я дивлюся телевізор.', ru: 'По вечерам я смотрю телевизор.' } },
      { de: 'nachts', uk: 'вночі', ru: 'ночью', ex: { de: 'Nachts lese ich ein wenig.', uk: 'Вночі я трохи читаю.', ru: 'Ночью я немного читаю.' } },
      { de: 'endlich', uk: 'нарешті', ru: 'наконец', ex: { de: 'Endlich ist der Sommer da!', uk: 'Нарешті прийшло літо!', ru: 'Наконец пришло лето!' } },
    ],
  },
  {
    id: 'haus',
    emoji: '🏠',
    level: 'A1',
    name: { uk: 'Дім', ru: 'Дом' },
    words: [
      { de: 'Haus', art: 'das', pl: 'Häuser', uk: 'дім; будинок', ru: 'дом', ex: { de: 'Unser Haus ist groß.', uk: 'Наш дім великий.', ru: 'Наш дом большой.' } },
      { de: 'Wohnung', art: 'die', pl: 'Wohnungen', uk: 'квартира', ru: 'квартира', ex: { de: 'Meine Wohnung ist klein, aber schön.', uk: 'Моя квартира маленька, але гарна.', ru: 'Моя квартира маленькая, но красивая.' } },
      { de: 'Zimmer', art: 'das', pl: 'Zimmer', uk: 'кімната', ru: 'комната' },
      { de: 'Küche', art: 'die', pl: 'Küchen', uk: 'кухня', ru: 'кухня', ex: { de: 'Wir essen in der Küche.', uk: 'Ми їмо на кухні.', ru: 'Мы едим на кухне.' } },
      { de: 'Bad', art: 'das', pl: 'Bäder', uk: 'ванна кімната', ru: 'ванная' },
      { de: 'Bett', art: 'das', pl: 'Betten', uk: 'ліжко', ru: 'кровать', ex: { de: 'Ich gehe ins Bett.', uk: 'Я йду спати.', ru: 'Я иду спать.' } },
      { de: 'Tisch', art: 'der', pl: 'Tische', uk: 'стіл', ru: 'стол' },
      { de: 'Stuhl', art: 'der', pl: 'Stühle', uk: 'стілець', ru: 'стул' },
      { de: 'Tür', art: 'die', pl: 'Türen', uk: 'двері', ru: 'дверь' },
      { de: 'Fenster', art: 'das', pl: 'Fenster', uk: 'вікно', ru: 'окно', ex: { de: 'Mach bitte das Fenster zu!', uk: 'Зачини, будь ласка, вікно!', ru: 'Закрой, пожалуйста, окно!' } },
      { de: 'Lampe', art: 'die', pl: 'Lampen', uk: 'лампа', ru: 'лампа' },
      { de: 'Schlüssel', art: 'der', pl: 'Schlüssel', uk: 'ключ', ru: 'ключ', ex: { de: 'Wo ist mein Schlüssel?', uk: 'Де мій ключ?', ru: 'Где мой ключ?' } },
    ],
  },
  {
    id: 'stadt',
    emoji: '🚋',
    level: 'A1',
    name: { uk: 'Місто і транспорт', ru: 'Город и транспорт' },
    words: [
      { de: 'Stadt', art: 'die', pl: 'Städte', uk: 'місто', ru: 'город', ex: { de: 'Berlin ist eine große Stadt.', uk: 'Берлін — велике місто.', ru: 'Берлин — большой город.' } },
      { de: 'Auto', art: 'das', pl: 'Autos', uk: 'автомобіль', ru: 'машина; автомобиль', ex: { de: 'Mein Auto ist alt.', uk: 'Мій автомобіль старий.', ru: 'Моя машина старая.' } },
      { de: 'Bus', art: 'der', pl: 'Busse', uk: 'автобус', ru: 'автобус', ex: { de: 'Der Bus kommt gleich.', uk: 'Автобус зараз приїде.', ru: 'Автобус сейчас придёт.' } },
      { de: 'Zug', art: 'der', pl: 'Züge', uk: 'потяг', ru: 'поезд', ex: { de: 'Der Zug fährt um acht Uhr.', uk: 'Потяг відправляється о восьмій.', ru: 'Поезд отправляется в восемь.' } },
      { de: 'Fahrrad', art: 'das', pl: 'Fahrräder', uk: 'велосипед', ru: 'велосипед', ex: { de: 'Ich fahre mit dem Fahrrad.', uk: 'Я їду на велосипеді.', ru: 'Я еду на велосипеде.' } },
      { de: 'Straße', art: 'die', pl: 'Straßen', uk: 'вулиця', ru: 'улица' },
      { de: 'Bahnhof', art: 'der', pl: 'Bahnhöfe', uk: 'вокзал', ru: 'вокзал', ex: { de: 'Wo ist der Bahnhof?', uk: 'Де вокзал?', ru: 'Где вокзал?' } },
      { de: 'Fahrkarte', art: 'die', pl: 'Fahrkarten', uk: 'квиток', ru: 'билет', ex: { de: 'Eine Fahrkarte nach Berlin, bitte.', uk: 'Один квиток до Берліна, будь ласка.', ru: 'Один билет до Берлина, пожалуйста.' } },
      { de: 'Taxi', art: 'das', pl: 'Taxis', uk: 'таксі', ru: 'такси' },
      { de: 'Haltestelle', art: 'die', pl: 'Haltestellen', uk: 'зупинка', ru: 'остановка', ex: { de: 'Ich warte an der Haltestelle.', uk: 'Я чекаю на зупинці.', ru: 'Я жду на остановке.' } },
      { de: 'zu Fuß', uk: 'пішки', ru: 'пешком', ex: { de: 'Ich gehe zu Fuß zur Arbeit.', uk: 'Я йду на роботу пішки.', ru: 'Я иду на работу пешком.' } },
      { de: 'Flughafen', art: 'der', pl: 'Flughäfen', uk: 'аеропорт', ru: 'аэропорт' },
    ],
  },
  {
    id: 'arbeit',
    emoji: '📚',
    level: 'A1',
    name: { uk: 'Робота і навчання', ru: 'Работа и учёба' },
    words: [
      { de: 'Arbeit', art: 'die', pl: 'Arbeiten', uk: 'робота', ru: 'работа', ex: { de: 'Ich gehe zur Arbeit.', uk: 'Я йду на роботу.', ru: 'Я иду на работу.' } },
      { de: 'Büro', art: 'das', pl: 'Büros', uk: 'офіс', ru: 'офис' },
      { de: 'Schule', art: 'die', pl: 'Schulen', uk: 'школа', ru: 'школа', ex: { de: 'Meine Tochter geht in die Schule.', uk: 'Моя донька йде до школи.', ru: 'Моя дочь идёт в школу.' } },
      { de: 'Lehrer', art: 'der', pl: 'Lehrer', uk: 'учитель', ru: 'учитель' },
      { de: 'Schüler', art: 'der', pl: 'Schüler', uk: 'учень', ru: 'ученик' },
      { de: 'Buch', art: 'das', pl: 'Bücher', uk: 'книга', ru: 'книга', ex: { de: 'Ich lese ein gutes Buch.', uk: 'Я читаю гарну книгу.', ru: 'Я читаю хорошую книгу.' } },
      { de: 'Stift', art: 'der', pl: 'Stifte', uk: 'ручка; олівець', ru: 'ручка; карандаш' },
      { de: 'Heft', art: 'das', pl: 'Hefte', uk: 'зошит', ru: 'тетрадь' },
      { de: 'Prüfung', art: 'die', pl: 'Prüfungen', uk: 'іспит', ru: 'экзамен', ex: { de: 'Morgen habe ich eine Prüfung.', uk: 'Завтра в мене іспит.', ru: 'Завтра у меня экзамен.' } },
      { de: 'Kollege', art: 'der', pl: 'Kollegen', uk: 'колега', ru: 'коллега' },
      { de: 'Chef', art: 'der', pl: 'Chefs', uk: 'начальник', ru: 'начальник' },
      { de: 'Computer', art: 'der', pl: 'Computer', uk: 'компʼютер', ru: 'компьютер' },
    ],
  },
  {
    id: 'verben',
    emoji: '🏃',
    level: 'A1',
    name: { uk: 'Дієслова на кожен день', ru: 'Глаголы на каждый день' },
    words: [
      { de: 'machen', uk: 'робити', ru: 'делать', ex: { de: 'Was machst du?', uk: 'Що ти робиш?', ru: 'Что ты делаешь?' } },
      { de: 'arbeiten', uk: 'працювати', ru: 'работать', ex: { de: 'Ich arbeite im Büro.', uk: 'Я працюю в офісі.', ru: 'Я работаю в офисе.' } },
      { de: 'lernen', uk: 'вчити; вчитися', ru: 'учить; учиться', ex: { de: 'Ich lerne Deutsch.', uk: 'Я вчу німецьку.', ru: 'Я учу немецкий.' } },
      { de: 'lesen', uk: 'читати', ru: 'читать', ex: { de: 'Er liest ein Buch.', uk: 'Він читає книгу.', ru: 'Он читает книгу.' } },
      { de: 'schreiben', uk: 'писати', ru: 'писать', ex: { de: 'Ich schreibe eine E-Mail.', uk: 'Я пишу електронного листа.', ru: 'Я пишу электронное письмо.' } },
      { de: 'sprechen', uk: 'говорити', ru: 'говорить', ex: { de: 'Sprechen Sie Englisch?', uk: 'Ви говорите англійською?', ru: 'Вы говорите по-английски?' } },
      { de: 'essen', uk: 'їсти', ru: 'есть', ex: { de: 'Wir essen um 13 Uhr.', uk: 'Ми їмо о 13:00.', ru: 'Мы едим в 13:00.' } },
      { de: 'trinken', uk: 'пити', ru: 'пить', ex: { de: 'Ich trinke Tee.', uk: 'Я пʼю чай.', ru: 'Я пью чай.' } },
      { de: 'schlafen', uk: 'спати', ru: 'спать', ex: { de: 'Das Baby schläft.', uk: 'Дитина спить.', ru: 'Ребёнок спит.' } },
      { de: 'gehen', uk: 'іти; йти', ru: 'идти', ex: { de: 'Wir gehen nach Hause.', uk: 'Ми йдемо додому.', ru: 'Мы идём домой.' } },
      { de: 'kommen', uk: 'приходити; приїжджати', ru: 'приходить; приезжать', ex: { de: 'Woher kommst du?', uk: 'Звідки ти?', ru: 'Откуда ты?' } },
      { de: 'fahren', uk: 'їхати', ru: 'ехать', ex: { de: 'Ich fahre mit dem Bus.', uk: 'Я їду автобусом.', ru: 'Я еду на автобусе.' } },
    ],
  },
  {
    id: 'adjektive',
    emoji: '🌡️',
    level: 'A1',
    name: { uk: 'Прикметники', ru: 'Прилагательные' },
    words: [
      { de: 'groß', uk: 'великий', ru: 'большой', ex: { de: 'Unser Haus ist groß.', uk: 'Наш дім великий.', ru: 'Наш дом большой.' } },
      { de: 'klein', uk: 'маленький', ru: 'маленький' },
      { de: 'gut', uk: 'добрий; хороший', ru: 'хороший', ex: { de: 'Das Essen ist gut.', uk: 'Їжа смачна.', ru: 'Еда хорошая.' } },
      { de: 'schlecht', uk: 'поганий', ru: 'плохой' },
      { de: 'neu', uk: 'новий', ru: 'новый' },
      { de: 'alt', uk: 'старий; літній', ru: 'старый', ex: { de: 'Mein Auto ist schon alt.', uk: 'Мій автомобіль уже старий.', ru: 'Моя машина уже старая.' } },
      { de: 'jung', uk: 'молодий', ru: 'молодой' },
      { de: 'schön', uk: 'гарний; красивий', ru: 'красивый', ex: { de: 'Die Stadt ist schön.', uk: 'Місто гарне.', ru: 'Город красивый.' } },
      { de: 'teuer', uk: 'дорогий (про ціну)', ru: 'дорогой', ex: { de: 'Das ist zu teuer.', uk: 'Це задорого.', ru: 'Это слишком дорого.' } },
      { de: 'billig', uk: 'дешевий', ru: 'дешёвый' },
      { de: 'heiß', uk: 'гарячий', ru: 'горячий', ex: { de: 'Der Tee ist heiß.', uk: 'Чай гарячий.', ru: 'Чай горячий.' } },
      { de: 'kalt', uk: 'холодний', ru: 'холодный', ex: { de: 'Das Wasser ist kalt.', uk: 'Вода холодна.', ru: 'Вода холодная.' } },
    ],
  },
  {
    id: 'koerper',
    emoji: '🩺',
    level: 'A1',
    name: { uk: 'Тіло і здоровʼя', ru: 'Тело и здоровье' },
    words: [
      { de: 'Kopf', art: 'der', pl: 'Köpfe', uk: 'голова', ru: 'голова' },
      { de: 'Hand', art: 'die', pl: 'Hände', uk: 'рука (кисть)', ru: 'рука (кисть)' },
      { de: 'Auge', art: 'das', pl: 'Augen', uk: 'око', ru: 'глаз' },
      { de: 'Ohr', art: 'das', pl: 'Ohren', uk: 'вухо', ru: 'ухо' },
      { de: 'Mund', art: 'der', pl: 'Münder', uk: 'рот', ru: 'рот' },
      { de: 'Fuß', art: 'der', pl: 'Füße', uk: 'нога (ступня)', ru: 'нога (ступня)' },
      { de: 'Arzt', art: 'der', pl: 'Ärzte', uk: 'лікар', ru: 'врач', ex: { de: 'Ich muss zum Arzt.', uk: 'Мені треба до лікаря.', ru: 'Мне нужно к врачу.' } },
      { de: 'krank', uk: 'хворий', ru: 'больной', ex: { de: 'Ich bin krank.', uk: 'Я хворий.', ru: 'Я болен.' } },
      { de: 'gesund', uk: 'здоровий', ru: 'здоровый', ex: { de: 'Bleib gesund!', uk: 'Будь здоровий!', ru: 'Будь здоров!' } },
      { de: 'Schmerzen', art: 'die', uk: 'біль; болі', ru: 'боль; боли', ex: { de: 'Ich habe Kopfschmerzen.', uk: 'У мене болить голова.', ru: 'У меня болит голова.' } },
      { de: 'Tablette', art: 'die', pl: 'Tabletten', uk: 'таблетка', ru: 'таблетка' },
      { de: 'Krankenhaus', art: 'das', pl: 'Krankenhäuser', uk: 'лікарня', ru: 'больница' },
    ],
  },
]

/** Тема-фраза (Redemittel): слова = цілі фрази, ex їм не потрібен */
export function isPhraseTopic(t: Topic): boolean {
  return t.id.startsWith('ph-')
}

/**
 * Підтягує приклади-речення з таблиць EXAMPLES у слова без власного ex.
 * Ключі: topicId → de-слово (точно як у wordKey).
 */
function withExamples(topics: Topic[]): Topic[] {
  return topics.map((t) => {
    const table = EXAMPLES[t.id]
    if (!table) return t
    return {
      ...t,
      words: t.words.map((w) => (!w.ex && table[w.de] ? { ...w, ex: table[w.de] } : w)),
    }
  })
}

/**
 * Усі теми трьох рівнів + фрази в одному списку.
 * Дві теми обовʼязкових побутових фраз («Треба сказати…», «Обовʼязково
 * відповісти…») ідуть ПЕРШИМИ — це найпотрібніше для реальних ситуацій,
 * їх має бути видно одразу, без гортання списку тем.
 */
const PH_MUST_FIRST = TOPICS_PHR.filter((t) => t.id === 'ph-must' || t.id === 'ph-react')
const PH_REST = TOPICS_PHR.filter((t) => t.id !== 'ph-must' && t.id !== 'ph-react')

export const TOPICS: Topic[] = withExamples([
  ...PH_MUST_FIRST,
  ...TOPICS_A1,
  ...TOPICS_A2_1,
  ...TOPICS_A2_2,
  ...TOPICS_B1_1,
  ...TOPICS_B1_2,
  ...PH_REST,
])

/** Рівні для фільтра (порядок = порядок у UI) */
export const LEVELS = ['A1', 'A2', 'B1'] as const

/** Німецьке слово для показу: з артиклем, якщо він є */
export function displayDe(w: Word): string {
  return w.art ? `${w.art} ${w.de}` : w.de
}

/** Ключ слова для збереження прогресу */
export function wordKey(topicId: string, w: Word): string {
  return `${topicId}/${w.de}`
}

export const ALL_WORDS: { topic: Topic; word: Word }[] = TOPICS.flatMap((topic) =>
  topic.words.map((word) => ({ topic, word })),
)

/** Тільки іменники — для тренажера артиклів */
export const NOUNS: { topic: Topic; word: Word }[] = ALL_WORDS.filter((a) => a.word.art)

export const TOTAL_WORDS = ALL_WORDS.length

/** Кольори артиклів — класичне мнемонічне кодування der/die/das */
export const ART_STYLE: Record<'der' | 'die' | 'das', { chip: string; text: string }> = {
  der: { chip: 'bg-sky-100 text-sky-800', text: 'text-sky-700' },
  die: { chip: 'bg-rose-100 text-rose-800', text: 'text-rose-700' },
  das: { chip: 'bg-emerald-100 text-emerald-800', text: 'text-emerald-700' },
}
