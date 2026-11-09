// ============================================================
// ПРИКЛАДИ-РЕНЧЕННЯ: A1 (заповнює слова без власного прикладу).
// Структура: topicId → de-слово → речення { de, uk, ru }.
// Зливається у Word.ex у deutsch-data.ts (withExamples) —
// власні приклади слів мають пріоритет над цими.
// ============================================================

import type { ExEntry } from './deutsch-ex-a2-1'

export const EX_A1: Record<string, Record<string, ExEntry>> = {
  'begr': {
    'Guten Abend': { de: 'Guten Abend, Frau Wagner!', uk: 'Добрий вечір, пані Вагнер!', ru: 'Добрый вечер, госпожа Вагнер!' },
    'Gute Nacht': { de: 'Gute Nacht und schlaf gut!', uk: 'На добраніч і солодких снів!', ru: 'Доброй ночи и сладких снов!' },
    'Tschüss': { de: 'Tschüss, bis morgen!', uk: 'Бувай, до завтра!', ru: 'Пока, до завтра!' },
    'Auf Wiedersehen': { de: 'Auf Wiedersehen und danke für alles!', uk: 'До побачення і дякую за все!', ru: 'До свидания и спасибо за всё!' },
    'Wie geht es dir?': { de: 'Wie geht es dir heute?', uk: 'Як ти сьогодні?', ru: 'Как ты сегодня?' },
  },
  'familie': {
    'Vater': { de: 'Mein Vater liest die Zeitung.', uk: 'Мій батько читає газету.', ru: 'Мой отец читает газету.' },
    'Sohn': { de: 'Mein Sohn geht in die Schule.', uk: 'Мій син ходить до школи.', ru: 'Мой сын ходит в школу.' },
    'Tochter': { de: 'Meine Tochter ist sechs Jahre alt.', uk: 'Моїй доньці шість років.', ru: 'Моей дочке шесть лет.' },
    'Bruder': { de: 'Mein Bruder wohnt in Hamburg.', uk: 'Мій брат живе в Гамбурзі.', ru: 'Мой брат живёт в Гамбурге.' },
    'Schwester': { de: 'Meine Schwester lernt Klavier.', uk: 'Моя сестра вчиться грати на піаніно.', ru: 'Моя сестра учится играть на пианино.' },
    'Oma': { de: 'Oma kocht den besten Kuchen.', uk: 'Бабуся готує найсмачніший торт.', ru: 'Бабушка готовит самый вкусный торт.' },
  },
  'zahlen': {
    'eins': { de: 'Eins, zwei, drei — los!', uk: 'Раз, два, три — почали!', ru: 'Раз, два, три — начали!' },
    'drei': { de: 'Das Zimmer hat drei Fenster.', uk: 'У кімнаті три вікна.', ru: 'В комнате три окна.' },
    'vier': { de: 'Die Wohnung hat vier Zimmer.', uk: 'У квартирі чотири кімнати.', ru: 'В квартире четыре комнаты.' },
    'fünf': { de: 'Eine Woche hat fünf Arbeitstage.', uk: 'Тиждень має пʼять робочих днів.', ru: 'Неделя имеет пять рабочих дней.' },
    'sechs': { de: 'Der Zug fährt um sechs Uhr.', uk: 'Потяг відходить о шостій.', ru: 'Поезд отходит в шесть.' },
    'sieben': { de: 'Eine Woche hat sieben Tage.', uk: 'Тиждень має сім днів.', ru: 'В неделе семь дней.' },
    'acht': { de: 'Der Laden öffnet um acht Uhr.', uk: 'Крамниця відкривається о восьмій.', ru: 'Магазин открывается в восемь.' },
    'neun': { de: 'Der Film beginnt um neun.', uk: 'Фільм починається о девʼятій.', ru: 'Фильм начинается в девять.' },
    'zehn': { de: 'Ich brauche zehn Minuten bis zum Bahnhof.', uk: 'Мені треба десять хвилин до вокзалу.', ru: 'Мне нужно десять минут до вокзала.' },
    'elf': { de: 'Es ist schon elf Uhr.', uk: 'Вже одинадцята година.', ru: 'Уже одиннадцать часов.' },
    'zwölf': { de: 'Mittags essen wir um zwölf.', uk: 'Обідаємо ми о дванадцятій.', ru: 'Обедаем мы в двенадцать.' },
    'hundert': { de: 'Die Straße ist hundert Meter lang.', uk: 'Вулиця завдовжки сто метрів.', ru: 'Улица длиной сто метров.' },
  },
  'farben': {
    'gelb': { de: 'Die Banane ist gelb.', uk: 'Банан жовтий.', ru: 'Банан жёлтый.' },
    'weiß': { de: 'Der Schnee ist weiß.', uk: 'Сніг білий.', ru: 'Снег белый.' },
    'braun': { de: 'Der Bär ist braun.', uk: 'Ведмідь коричневий.', ru: 'Медведь коричневый.' },
    'grau': { de: 'Die Maus ist grau.', uk: 'Мишка сіра.', ru: 'Мышка серая.' },
    'orange': { de: 'Die Jacke ist orange.', uk: 'Куртка помаранчева.', ru: 'Куртка оранжевая.' },
    'rosa': { de: 'Die Blume ist rosa.', uk: 'Квітка рожева.', ru: 'Цветок розовый.' },
  },
  'zeit': {
    'gestern': { de: 'Gestern war ich beim Arzt.', uk: 'Учора я був у лікаря.', ru: 'Вчера я был у врача.' },
    'früh': { de: 'Heute essen wir früh zu Abend.', uk: 'Сьогодні ми вечеряємо рано.', ru: 'Сегодня мы ужинаем рано.' },
    'Tag': { de: 'Der Tag hat vierundzwanzig Stunden.', uk: 'День має двадцять чотири години.', ru: 'День имеет двадцать четыре часа.' },
    'Monat': { de: 'Der Monat hat etwa dreißig Tage.', uk: 'Місяць має близько тридцяти днів.', ru: 'Месяц имеет около тридцати дней.' },
    'Stunde': { de: 'Eine Stunde hat sechzig Minuten.', uk: 'Година має шістдесят хвилин.', ru: 'Час имеет шестьдесят минут.' },
    'Minute': { de: 'Warte eine Minute, bitte!', uk: 'Зачекай хвилинку, будь ласка!', ru: 'Подожди минутку, пожалуйста!' },
  },
  'tage': {
    'Dienstag': { de: 'Am Dienstag gehe ich einkaufen.', uk: 'У вівторок я йду за покупками.', ru: 'Во вторник я иду за покупками.' },
    'Mittwoch': { de: 'Am Mittwoch habe ich Deutschkurs.', uk: 'У середу в мене курс німецької.', ru: 'В среду у меня курс немецкого.' },
    'Donnerstag': { de: 'Am Donnerstag besuche ich Oma.', uk: 'У четвер я відвідую бабусю.', ru: 'В четвер я навещаю бабушку.' },
    'Samstag': { de: 'Am Samstag schlafe ich länger.', uk: 'У суботу я сплю довше.', ru: 'В субботу я сплю дольше.' },
    'Sonntag': { de: 'Am Sonntag essen wir bei Oma.', uk: 'У неділю ми їмо в бабусі.', ru: 'В воскресенье мы едим у бабушки.' },
  },
  'haus': {
    'Zimmer': { de: 'Mein Zimmer ist hell.', uk: 'Моя кімната світла.', ru: 'Моя комната светлая.' },
    'Bad': { de: 'Das Bad ist klein, aber modern.', uk: 'Ванна кімната маленька, але сучасна.', ru: 'Ванная комната маленькая, но современная.' },
    'Tisch': { de: 'Das Essen steht auf dem Tisch.', uk: 'Їжа стоїть на столі.', ru: 'Еда стоит на столе.' },
    'Stuhl': { de: 'Der Stuhl ist bequem.', uk: 'Стілець зручний.', ru: 'Стул удобный.' },
    'Tür': { de: 'Mach bitte die Tür zu!', uk: 'Зачини, будь ласка, двері!', ru: 'Закрой, пожалуйста, дверь!' },
    'Lampe': { de: 'Stell die Lampe an!', uk: 'Увімкни лампу!', ru: 'Включи лампу!' },
  },
  'stadt': {
    'Straße': { de: 'Unsere Straße ist sehr ruhig.', uk: 'Наша вулиця дуже тиха.', ru: 'Наша улица очень тихая.' },
    'Taxi': { de: 'Zum Flughafen nehme ich ein Taxi.', uk: 'До аеропорту я беру таксі.', ru: 'До аэропорта я беру такси.' },
    'Flughafen': { de: 'Der Flughafen ist weit vom Zentrum.', uk: 'Аеропорт далеко від центру.', ru: 'Аэропорт далеко от центра.' },
  },
  'arbeit': {
    'Büro': { de: 'Das Büro öffnet um neun.', uk: 'Офіс відкривається о девʼятій.', ru: 'Офис открывается в девять.' },
    'Lehrer': { de: 'Der Lehrer erklärt die Aufgabe.', uk: 'Учитель пояснює завдання.', ru: 'Учитель объясняет задание.' },
    'Schüler': { de: 'Der Schüler hört aufmerksam zu.', uk: 'Учень уважно слухає.', ru: 'Ученик внимательно слушает.' },
    'Stift': { de: 'Der Stift liegt auf dem Buch.', uk: 'Ручка лежить на книзі.', ru: 'Ручка лежит на книге.' },
    'Heft': { de: 'Schreib das ins Heft!', uk: 'Запиши це в зошит!', ru: 'Запиши это в тетрадь!' },
    'Kollege': { de: 'Mein Kollege hilft mir im Büro.', uk: 'Колега допомагає мені в офісі.', ru: 'Коллега помогает мне в офисе.' },
    'Chef': { de: 'Der Chef kommt um zehn.', uk: 'Начальник прийде о десятій.', ru: 'Начальник придёт в десять.' },
    'Computer': { de: 'Der Computer ist neu und schnell.', uk: 'Компʼютер новий і швидкий.', ru: 'Компьютер новый и быстрый.' },
  },
  'adjektive': {
    'klein': { de: 'Meine Schwester ist noch klein.', uk: 'Моя сестра ще маленька.', ru: 'Моя сестра ещё маленькая.' },
    'schlecht': { de: 'Das Wetter ist heute schlecht.', uk: 'Погода сьогодні погана.', ru: 'Погода сегодня плохая.' },
    'neu': { de: 'Das Auto ist neu.', uk: 'Автомобіль новий.', ru: 'Машина новая.' },
    'jung': { de: 'Sie ist jung und voller Energie.', uk: 'Вона молода й повна енергії.', ru: 'Она молодая и полная энергии.' },
    'billig': { de: 'Auf dem Markt ist das Obst billig.', uk: 'На ринку фрукти дешеві.', ru: 'На рынке фрукты дешёвые.' },
  },
  'koerper': {
    'Kopf': { de: 'Mein Kopf tut weh.', uk: 'У мене болить голова.', ru: 'У меня болит голова.' },
    'Hand': { de: 'Meine Hand ist kalt.', uk: 'Моя рука холодна.', ru: 'Моя рука холодная.' },
    'Auge': { de: 'Sie hat grüne Augen.', uk: 'Вона має зелені очі.', ru: 'Она имеет зелёные глаза.' },
    'Ohr': { de: 'Mein Ohr tut weh.', uk: 'У мене болить вухо.', ru: 'У меня болит ухо.' },
    'Mund': { de: 'Öffne den Mund!', uk: 'Відкрий рот!', ru: 'Открой рот!' },
    'Fuß': { de: 'Mein Fuß tut nach dem Lauf weh.', uk: 'Після бігу болить нога.', ru: 'После бега болит нога.' },
    'Tablette': { de: 'Nimm die Tablette mit Wasser.', uk: 'Прийми таблетку з водою.', ru: 'Прими таблетку с водой.' },
    'Krankenhaus': { de: 'Oma liegt im Krankenhaus.', uk: 'Бабуся лежить у лікарні.', ru: 'Бабушка лежит в больнице.' },
  },
}
