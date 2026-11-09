// ============================================================
// ДАНІ: «МОДАЛЬНІ ДІЄСЛОВА» — окремий розділ тренажера.
// Шість модальних дієслів: können, müssen, dürfen, wollen,
// sollen, möchten. Кожне — повні форми Präsens і Präteritum
// (ich / du / er / wir / ihr / sie·Sie), значення, приклади
// з рамковою конструкцією (Satzklammer: модальне дієслово
// на 2-му місці + Infinitiv у кінці) і «пастки» вживання.
//
// Приклад зберігається частинами рамки: pre (до модального)
// + modal (відмінена форма) + mid (середина) + inf (кінець
// рамки з розділовим знаком) — так компонент підсвічує
// дієслівну рамку й одразу може зібрати з цього вправу
// «склади речення».
// ============================================================

export type MBi = { uk: string; ru: string }

export type MExample = {
  /** початок речення до модального дієслова: «Ich» (може бути порожнім, якщо питання починається з дієслова) */
  pre: string
  /** відмінена модальна форма: «kann» */
  modal: string
  /** середина рамки (може бути порожньою): «heute nicht» */
  mid?: string
  /** кінець рамки з розділовим знаком: «schwimmen.» */
  inf: string
  uk: string
  ru: string
  /** коротка примітка до приклада */
  note?: MBi
}

export type ModalVerb = {
  id: string
  /** інфінітив */
  inf: string
  /** відмінена форма у Präsens (6: ich, du, er, wir, ihr, sie/Sie) */
  pr: string[]
  /** відмінена форма у Präteritum (6, той самий порядок) */
  pt: string[]
  /** головне значення */
  meaning: MBi
  /** відтінок: у яких ситуаціях вживається */
  force: MBi
  examples: MExample[]
  /** пастка або важлива примітка про вживання */
  trap?: MBi
}

export const MODAL_PERSONS = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie']

export const MODALS: ModalVerb[] = [
  {
    id: 'koennen',
    inf: 'können',
    pr: ['kann', 'kannst', 'kann', 'können', 'könnt', 'können'],
    pt: ['konnte', 'konntest', 'konnte', 'konnten', 'konntet', 'konnten'],
    meaning: { uk: 'вміти, мати змогу', ru: 'уметь, иметь возможность' },
    force: {
      uk: 'уміння чи можливість: «я вмію», «тут можна», «можеш мені допомогти?»',
      ru: 'умение или возможность: «я умею», «здесь можно», «можешь мне помочь?»',
    },
    examples: [
      { pre: 'Ich', modal: 'kann', inf: 'gut schwimmen.', uk: 'Я вмію добре плавати.', ru: 'Я умею хорошо плавать.' },
      { pre: '', modal: 'Kannst', mid: 'du mir', inf: 'helfen?', uk: 'Ти можеш мені допомогти?', ru: 'Ты можешь мне помочь?', note: { uk: 'Kannst du…? — найперший ввічливий запит про допомогу', ru: 'Kannst du…? — самый первый вежливый запрос о помощи' } },
      { pre: 'Hier', modal: 'kann', mid: 'man', inf: 'parken.', uk: 'Тут можна паркуватися.', ru: 'Здесь можно парковаться.', note: { uk: 'man — «люди взагалі», універсальний підмет', ru: 'man — «люди вообще», универсальное подлежащее' } },
    ],
    trap: { uk: 'У Präsens ich і er — однакова форма «kann» без закінчення. Це працює для всіх модальних!', ru: 'В Präsens ich и er — одинаковая форма «kann» без окончания. Это работает для всех модальных!' },
  },
  {
    id: 'mussen',
    inf: 'müssen',
    pr: ['muss', 'musst', 'muss', 'müssen', 'müsst', 'müssen'],
    pt: ['musste', 'musstest', 'musste', 'mussten', 'musstet', 'mussten'],
    meaning: { uk: 'бути зобов’язаним, мати потребу', ru: 'быть обязанным, иметь необходимость' },
    force: {
      uk: 'неминучість: «треба», «я зобов’язаний», без цього ніяк',
      ru: 'неизбежность: «надо», «я обязан», без этого никак',
    },
    examples: [
      { pre: 'Ich', modal: 'muss', mid: 'heute', inf: 'arbeiten.', uk: 'Я мушу сьогодні працювати.', ru: 'Я должен сегодня работать.' },
      { pre: 'Du', modal: 'musst', inf: 'schneller gehen.', uk: 'Тобі треба швидше йти.', ru: 'Тебе нужно идти быстрее.' },
      { pre: '', modal: 'Muss', mid: 'ich das wirklich', inf: 'tun?', uk: 'Я справді мушу це робити?', ru: 'Я действительно должен это делать?' },
    ],
    trap: { uk: 'Пастка перекладу: «nicht müssen» = «не потрібно» (можна й не робити), а «nicht dürfen» = «заборонено». Це різні речі!', ru: 'Ловушка перевода: «nicht müssen» = «не нужно» (можно не делать), а «nicht dürfen» = «запрещено». Это разные вещи!' },
  },
  {
    id: 'duerfen',
    inf: 'dürfen',
    pr: ['darf', 'darfst', 'darf', 'dürfen', 'dürft', 'dürfen'],
    pt: ['durfte', 'durftest', 'durfte', 'durften', 'durftet', 'durften'],
    meaning: { uk: 'мати дозвіл; бути дозволеним', ru: 'иметь разрешение; быть разрешённым' },
    force: {
      uk: 'дозвіл і заборона: «можна» (за правилом) або «не можна» (nicht dürfen)',
      ru: 'разрешение и запрет: «можно» (по правилу) или «нельзя» (nicht dürfen)',
    },
    examples: [
      { pre: 'Hier', modal: 'darf', mid: 'man nicht', inf: 'rauchen.', uk: 'Тут курити заборонено.', ru: 'Здесь курить запрещено.' },
      { pre: '', modal: 'Darf', mid: 'ich', inf: 'fragen?', uk: 'Можна спитати?', ru: 'Можно спросить?', note: { uk: 'Darf ich…? — ввічливіший старт, ніж Kann ich…?', ru: 'Darf ich…? — вежливее, чем Kann ich…?' } },
      { pre: 'Kinder', modal: 'dürfen', mid: 'nicht allein', inf: 'schwimmen gehen.', uk: 'Дітям не можна одному йти плавати.', ru: 'Детям нельзя одним идти плавать.' },
    ],
    trap: { uk: 'Darf ich…? звучить офіційніше за Kann ich…? — так питають дозволу за правилами (у лікаря, в аптеці, у відділку).', ru: 'Darf ich…? звучит официальнее, чем Kann ich…? — так спрашивают разрешения по правилам (у врача, в аптеке, в полиции).' },
  },
  {
    id: 'wollen',
    inf: 'wollen',
    pr: ['will', 'willst', 'will', 'wollen', 'wollt', 'wollen'],
    pt: ['wollte', 'wolltest', 'wollte', 'wollten', 'wolltet', 'wollten'],
    meaning: { uk: 'хотіти, мати намір', ru: 'хотеть, иметь намерение' },
    force: {
      uk: 'сильне власне бажання чи намір: «я хочу стати…», «він хоче поїхати»',
      ru: 'сильное собственное желание или намерение: «я хочу стать…», «он хочет поехать»',
    },
    examples: [
      { pre: 'Ich', modal: 'will', inf: 'Lehrer werden.', uk: 'Я хочу стати учителем.', ru: 'Я хочу стать учителем.', note: { uk: 'werden — «стати», стоїть в кінці рамки', ru: 'werden — «стать», стоит в конце рамки' } },
      { pre: 'Was', modal: 'willst', mid: 'du', inf: 'essen?', uk: 'Що ти хочеш їсти?', ru: 'Что ты хочешь есть?' },
      { pre: 'Er', modal: 'will', mid: 'nach Berlin', inf: 'fahren.', uk: 'Він хоче їхати до Берліна.', ru: 'Он хочет поехать в Берлин.' },
    ],
    trap: { uk: '«will» у німецькій ≠ англійське will (майбутній час)! Це «хотіти»: Ich will = я хочу.', ru: '«will» в немецком ≠ английское will (будущее время)! Это «хотеть»: Ich will = я хочу.' },
  },
  {
    id: 'sollen',
    inf: 'sollen',
    pr: ['soll', 'sollst', 'soll', 'sollen', 'sollt', 'sollen'],
    pt: ['sollte', 'solltest', 'sollte', 'sollten', 'solltet', 'sollten'],
    meaning: { uk: 'бути покликаним (чужою волею), слід', ru: 'быть должным (по чужой воле), следует' },
    force: {
      uk: 'доручення, порада чи правило від когось: мама сказала, лікар порадив, закон велить',
      ru: 'поручение, совет или правило от кого-то: мама сказала, врач посоветовал, закон велит',
    },
    examples: [
      { pre: 'Du', modal: 'sollst', inf: 'mehr Wasser trinken.', uk: 'Тобі слід пити більше води.', ru: 'Тебе следует пить больше воды.' },
      { pre: '', modal: 'Sollen', mid: 'wir', inf: 'warten?', uk: 'Нам варто почекати?', ru: 'Нам стоит подождать?', note: { uk: 'Sollen wir…? — питаємо думки або інструкції', ru: 'Sollen wir…? — спрашиваем мнения или инструкции' } },
      { pre: 'Der Arzt sagt, ich', modal: 'soll', inf: 'weniger Kaffee trinken.', uk: 'Лікар каже, мені слід менше пити кави.', ru: 'Врач говорит, мне следует меньше пить кофе.' },
    ],
    trap: { uk: 'müssen = обов’язок: об’єктивно треба; sollen = вимога чи порада від когось іншого. «Sollen» часто звучить м’якше.', ru: 'müssen = обязанность: объективно нужно; sollen = требование или совет от кого-то. «Sollen» часто звучит мягче.' },
  },
  {
    id: 'moegte',
    inf: 'möchten',
    pr: ['möchte', 'möchtest', 'möchte', 'möchten', 'möchtet', 'möchten'],
    pt: ['mochte', 'mochtest', 'mochte', 'mochten', 'mochtet', 'mochten'],
    meaning: { uk: 'хотів би (ввічливо)', ru: 'хотел бы (вежливо)' },
    force: {
      uk: 'ввічлива форма бажання: замовлення в кафе, прохання, запрошення',
      ru: 'вежливая форма желания: заказ в кафе, просьба, приглашение',
    },
    examples: [
      { pre: 'Ich', modal: 'möchte', mid: 'einen Tisch', inf: 'reservieren.', uk: 'Я хотів би замовити столик.', ru: 'Я хотел бы заказать столик.' },
      { pre: '', modal: 'Möchtest', mid: 'du', inf: 'mitkommen?', uk: 'Хочеш піти разом (зі мною)?', ru: 'Хочешь пойти вместе (со мной)?', note: { uk: 'Möchtest du…? — ввічливе запрошення', ru: 'Möchtest du…? — вежливое приглашение' } },
      { pre: 'Wir', modal: 'möchten', mid: 'das Museum', inf: 'besuchen.', uk: 'Ми хотіли б відвідати музей.', ru: 'Мы хотели бы посетить музей.' },
    ],
    trap: { uk: 'möchten — форма від mögen (любити), але вживається як «хотів би». У Präteritum у таблиці — mochte (від mögen); для ввічливості в минулому знову кажуть möchte.', ru: 'möchten — форма от mögen (любить), но употребляется как «хотел бы». В Präteritum в таблице — mochte (от mögen); для вежливости в прошедшем снова говорят möchte.' },
  },
]

// ---------- ВПРАВА «СМІСЛ»: яке дієслово пасує до перекладу ----------

export type MSense = { uk: string; ru: string; verb: string }

export const MSENSES: MSense[] = [
  { uk: 'Я вмію / у мене виходить', ru: 'Я умею / у меня получается', verb: 'koennen' },
  { uk: 'Тут можна (дозволено обставинами)', ru: 'Здесь можно (допустимо по обстоятельствам)', verb: 'koennen' },
  { uk: 'Нікуди не дінешся — треба!', ru: 'Никуда не денешься — надо!', verb: 'mussen' },
  { uk: 'Мені не потрібно (можна не робити)', ru: 'Мне не нужно (можно не делать)', verb: 'mussen' },
  { uk: 'Мені дозволено за правилами', ru: 'Мне разрешено по правилам', verb: 'duerfen' },
  { uk: 'Це суворо заборонено', ru: 'Это строго запрещено', verb: 'duerfen' },
  { uk: 'Я сильно цього хочу (мій намір)', ru: 'Я сильно этого хочу (моё намерение)', verb: 'wollen' },
  { uk: 'Так порадували або вимагають ззовні', ru: 'Так советуют или требуют извне', verb: 'sollen' },
  { uk: 'Я хотів би (ввічливе замовлення)', ru: 'Я хотел бы (вежливый заказ)', verb: 'moegte' },
]

// ---------- ДОПОМІЖНЕ ----------

/** Повний текст речення з частин рамки (для озвучки й вправ) */
export function exSentence(e: MExample): string {
  return [e.pre, e.modal, e.mid, e.inf].filter(Boolean).join(' ')
}

export const MODAL_TOTAL = MODALS.length
