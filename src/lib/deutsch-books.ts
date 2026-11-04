// ============================================================
// ЧИТАНКА — книжки для початківців з тап-перекладом.
// Кожне слово або словосполучення в тексті клікабельне:
// внизу зʼявляється картка з перекладом (укр/рос) і озвучкою.
//
// Джерела перекладів (у порядку пріоритету):
//   1) глосарій книжки (deutsch-books-data.ts) — значення
//      саме для цього тексту (напр. kam → «прибув»),
//   2) BASE_GLOSSARY (нижче) — службові слова: займенники,
//      прийменники, сполучники, частки, прислівники,
//   3) словник тренажера (1419 слів тем + 37 дієслів із
//      усіма формами, Präteritum і Partizip II),
//   4) морфологічні здогадки (ge-відру́бка, -e/-en/-n/-t/-st)
//      — щоб і-formen (wohnt, schwarze, kostet) знаходились.
// ============================================================

import { ALL_WORDS } from './deutsch-data'
import { VERBS } from './deutsch-grammar'
import { BOOKS_LIST } from './deutsch-books-data'

export type GlossEntry = { uk: string; ru: string }

export type BookPara = { de: string; uk: string; ru: string }

export type BookChapter = {
  title: { uk: string; ru: string }
  paragraphs: BookPara[]
}

export type Book = {
  id: string
  emoji: string
  level: 'A1' | 'A2' | 'B1'
  title: { uk: string; ru: string }
  /** Короткий опис книжки для картки в списку */
  blurb: { uk: string; ru: string }
  chapters: BookChapter[]
  /** ключі — нижнім регістром; слова й фрази через пробіл */
  glossary: Record<string, GlossEntry>
}

/** Усі абзаци книжки підряд (для тестів і статистики) */
export function bookParas(b: Book): BookPara[] {
  return b.chapters.flatMap((c) => c.paragraphs)
}

export const BOOKS: Book[] = BOOKS_LIST

/** Службові слова для всіх книжок одразу */
export const BASE_GLOSSARY: Record<string, GlossEntry> = {
  // --- сполучники, частки ---
  und: { uk: 'і', ru: 'и' },
  aber: { uk: 'але', ru: 'но; однако' },
  oder: { uk: 'або', ru: 'или' },
  denn: { uk: 'бо; адже', ru: 'потому что; ведь' },
  weil: { uk: 'тому що', ru: 'потому что' },
  dass: { uk: 'що', ru: 'что' },
  wenn: { uk: 'коли; якщо', ru: 'когда; если' },
  als: { uk: 'коли (минуле); ніж; як', ru: 'когда (прош.); чем; в качестве' },
  wie: { uk: 'як', ru: 'как' },
  so: { uk: 'так', ru: 'так' },
  noch: { uk: 'ще', ru: 'ещё' },
  schon: { uk: 'вже', ru: 'уже' },
  auch: { uk: 'також', ru: 'тоже' },
  sehr: { uk: 'дуже', ru: 'очень' },
  ganz: { uk: 'цілком; зовсім', ru: 'совсем; целиком' },
  dann: { uk: 'потім', ru: 'потом' },
  danach: { uk: 'після цього', ru: 'после этого' },
  zuerst: { uk: 'спершу', ru: 'сначала' },
  endlich: { uk: 'нарешті', ru: 'наконец' },
  plötzlich: { uk: 'раптом', ru: 'вдруг' },
  gern: { uk: 'з задоволенням; люблю (робити)', ru: 'охотно; люблю (делать)' },
  leider: { uk: 'на жаль', ru: 'к сожалению' },
  vielleicht: { uk: 'можливо', ru: 'может быть' },
  natürlich: { uk: 'звісно', ru: 'конечно' },
  wirklich: { uk: 'справді', ru: 'действительно' },
  zusammen: { uk: 'разом', ru: 'вместе' },
  sofort: { uk: 'одразу', ru: 'сразу' },
  wieder: { uk: 'знову', ru: 'снова' },
  manchmal: { uk: 'іноді', ru: 'иногда' },
  nur: { uk: 'лише', ru: 'только' },
  doch: { uk: 'адже; все ж', ru: 'ведь; всё же' },
  mal: { uk: 'раз (частка)', ru: 'раз (частица)' },
  nicht: { uk: 'не', ru: 'не' },
  kein: { uk: 'жоден; не', ru: 'никакой; не' },
  keine: { uk: 'жодна; не', ru: 'никакая; не' },
  // --- питальні слова ---
  wo: { uk: 'де', ru: 'где' },
  wohin: { uk: 'куди', ru: 'куда' },
  woher: { uk: 'звідки', ru: 'откуда' },
  wann: { uk: 'коли', ru: 'когда' },
  warum: { uk: 'чому', ru: 'почему' },
  wer: { uk: 'хто', ru: 'кто' },
  was: { uk: 'що', ru: 'что' },
  // --- займенники ---
  ich: { uk: 'я', ru: 'я' },
  du: { uk: 'ти', ru: 'ты' },
  er: { uk: 'він', ru: 'он' },
  sie: { uk: 'вона; вони; ви (ввічл.)', ru: 'она; они; вы (вежл.)' },
  es: { uk: 'це; воно', ru: 'это; оно' },
  wir: { uk: 'ми', ru: 'мы' },
  ihr: { uk: 'ви (множ.); її', ru: 'вы (мн.); её' },
  mir: { uk: 'мені', ru: 'мне' },
  dir: { uk: 'тобі', ru: 'тебе' },
  ihm: { uk: 'йому', ru: 'ему' },
  uns: { uk: 'нам; нас', ru: 'нам; нас' },
  euch: { uk: 'вам; вас', ru: 'вам; вас' },
  ihnen: { uk: 'їм; вам (ввічл.)', ru: 'им; вам (вежл.)' },
  mich: { uk: 'мене', ru: 'меня' },
  dich: { uk: 'тебе', ru: 'тебя' },
  sich: { uk: 'себе (-ся)', ru: 'себя (-ся)' },
  mein: { uk: 'мій', ru: 'мой' },
  meine: { uk: 'моя; мої', ru: 'моя; мои' },
  dein: { uk: 'твій', ru: 'твой' },
  deine: { uk: 'твоя; твої', ru: 'твоя; твои' },
  unser: { uk: 'наш', ru: 'наш' },
  unsere: { uk: 'наша; наші', ru: 'наша; наши' },
  ihre: { uk: 'її; їх', ru: 'её; их' },
  ihren: { uk: 'її; їх (Akk)', ru: 'её; их (акк.)' },
  man: { uk: 'безособово: роблять (взагалі)', ru: 'безлично: делают (вообще)' },
  jemand: { uk: 'хтось', ru: 'кто-то' },
  niemand: { uk: 'ніхто', ru: 'никто' },
  jeder: { uk: 'кожен', ru: 'каждый' },
  jede: { uk: 'кожна', ru: 'каждая' },
  jedes: { uk: 'кожне', ru: 'каждое' },
  jeden: { uk: 'кожен (Akk); щоразу', ru: 'каждый (акк.); каждый раз' },
  alle: { uk: 'всі', ru: 'все' },
  alles: { uk: 'все', ru: 'всё' },
  viel: { uk: 'багато', ru: 'много' },
  viele: { uk: 'багато хто; багато', ru: 'многие; много' },
  vieles: { uk: 'багато чого', ru: 'многое' },
  wenig: { uk: 'мало', ru: 'мало' },
  wenige: { uk: 'небагато', ru: 'немногие' },
  mehr: { uk: 'більше', ru: 'больше' },
  weniger: { uk: 'менше', ru: 'меньше' },
  etwas: { uk: 'щось; трохи', ru: 'что-то; немного' },
  nichts: { uk: 'нічого', ru: 'ничего' },
  einige: { uk: 'деякі', ru: 'некоторые' },
  andere: { uk: 'інші; інша', ru: 'другие; другая' },
  // --- прийменники та злиття ---
  mit: { uk: 'з; за допомогою', ru: 'с; при помощи' },
  nach: { uk: 'після; до (міста/додому)', ru: 'после; в (город/домой)' },
  zu: { uk: 'до; занадто', ru: 'к; слишком' },
  von: { uk: 'від; з', ru: 'от; из' },
  bei: { uk: 'біля; при; в (когось)', ru: 'у; при' },
  für: { uk: 'для; за', ru: 'для; за' },
  um: { uk: 'о (час); навколо; щоб', ru: 'в (время); вокруг; чтобы' },
  ohne: { uk: 'без', ru: 'без' },
  gegen: { uk: 'проти; близько', ru: 'против; около' },
  über: { uk: 'над; про; через', ru: 'над; о; через' },
  unter: { uk: 'під', ru: 'под' },
  zwischen: { uk: 'між', ru: 'между' },
  vor: { uk: 'перед; тому назад (час)', ru: 'перед; тому назад' },
  hinter: { uk: 'позаду', ru: 'позади' },
  in: { uk: 'в', ru: 'в' },
  an: { uk: 'на; біля', ru: 'на; у' },
  auf: { uk: 'на', ru: 'на' },
  aus: { uk: 'з (походження)', ru: 'из' },
  im: { uk: 'у (in + dem)', ru: 'в (in + dem)' },
  am: { uk: 'на/у (an + dem)', ru: 'на/у (an + dem)' },
  zum: { uk: 'до (zu + dem)', ru: 'к (zu + dem)' },
  zur: { uk: 'до (zu + der)', ru: 'к (zu + der)' },
  ins: { uk: 'в (in + das)', ru: 'в (in + das)' },
  vom: { uk: 'від (von + dem)', ru: 'от (von + dem)' },
  beim: { uk: 'біля; під час (bei + dem)', ru: 'у; во время (bei + dem)' },
  // --- часті фрази ---
  'zu hause': { uk: 'вдома', ru: 'дома' },
  'nach hause': { uk: 'додому', ru: 'домой' },
  'es gibt': { uk: 'є; наявний', ru: 'есть; имеется' },
  'zum beispiel': { uk: 'наприклад', ru: 'например' },
  'am abend': { uk: 'ввечері', ru: 'вечером' },
  abend: { uk: 'вечір', ru: 'вечер' },
  deutsch: { uk: 'німецька мова', ru: 'немецкий язык' },
  // --- часті прикметники й прислівники ---
  schnell: { uk: 'швидко; швидкий', ru: 'быстро; быстрый' },
  lang: { uk: 'довгий', ru: 'длинный' },
  lange: { uk: 'довго; довгий', ru: 'долго; длинный' },
  kurz: { uk: 'короткий; коротко', ru: 'короткий; коротко' },
  müde: { uk: 'втомлений', ru: 'уставший' },
  toll: { uk: 'чудовий; класний', ru: 'замечательный; классный' },
  eigen: { uk: 'власний', ru: 'собственный' },
  eigene: { uk: 'власна; власні', ru: 'собственная; собственные' },
  nächste: { uk: 'наступна; наступні', ru: 'следующая; следующие' },
  voll: { uk: 'повний; багатолюдний', ru: 'полный; многолюдный' },
  fertig: { uk: 'готовий', ru: 'готов' },
  richtig: { uk: 'правильний', ru: 'правильный' },
  falsch: { uk: 'неправильний; помилковий', ru: 'неправильный; ошибочный' },
  leicht: { uk: 'легкий; легко', ru: 'лёгкий; легко' },
  schwer: { uk: 'важкий; складний', ru: 'тяжёлый; трудный' },
  gerade: { uk: 'зараз; якраз', ru: 'сейчас; как раз' },
  brauchen: { uk: 'потребувати; мати потребу', ru: 'нуждаться' },
  braucht: { uk: 'потрібен; потребує', ru: 'нужен; нуждается' },
  // --- час і місце (загальні) ---
  immer: { uk: 'завжди', ru: 'всегда' },
  heute: { uk: 'сьогодні', ru: 'сегодня' },
  gestern: { uk: 'учора; учорашній день', ru: 'вчера' },
  morgen: { uk: 'завтра; ранок', ru: 'завтра; утро' },
  oft: { uk: 'часто', ru: 'часто' },
  fast: { uk: 'майже', ru: 'почти' },
  da: { uk: 'тут; там', ru: 'здесь; там' },
  dort: { uk: 'там', ru: 'там' },
  dabei: { uk: 'при цьому; поруч', ru: 'при этом; рядом' },
  darin: { uk: 'у ньому (усередині)', ru: 'в нём (внутри)' },
  darauf: { uk: 'на ньому; після цього', ru: 'на нём; после этого' },
  trotzdem: { uk: 'попри це; все одно', ru: 'несмотря на это; всё равно' },
  außerdem: { uk: 'крім того', ru: 'кроме того' },
  laut: { uk: 'голосно; гучний', ru: 'громко; громкий' },
  leise: { uk: 'тихо; тихий', ru: 'тихо; тихий' },
  vorsichtig: { uk: 'обережно', ru: 'осторожно' },
  hinten: { uk: 'ззаду', ru: 'сзади' },
  vorne: { uk: 'спереду', ru: 'впереди' },
  oben: { uk: 'нагорі; зверху', ru: 'наверху; сверху' },
  unten: { uk: 'унизу', ru: 'внизу' },
  draußen: { uk: 'надворі; ззовні', ru: 'на улице; снаружи' },
  drinnen: { uk: 'усередині (приміщення)', ru: 'внутри (помещения)' },
  'guten appetit': { uk: 'смачного!', ru: 'приятного аппетита!' },
  'ein bisschen': { uk: 'трохи', ru: 'немного' },
  'immer wieder': { uk: 'знову і знову', ru: 'снова и снова' },
  // --- артиклі та займенникові форми ---
  der: { uk: 'означений артикль (м. рід)', ru: 'определённый артикль (м. р.)' },
  die: { uk: 'означений артикль (ж. рід; множина)', ru: 'определённый артикль (ж. р.; множ.)' },
  das: { uk: 'означений артикль (с. рід)', ru: 'определённый артикль (ср. р.)' },
  des: { uk: 'означений артикль (Genitiv)', ru: 'определённый артикль (род. падеж)' },
  den: { uk: 'означений артикль (Akk. м. р.)', ru: 'определённый артикль (акк. м. р.)' },
  dem: { uk: 'означений артикль (Dativ)', ru: 'определённый артикль (дат. падеж)' },
  ein: { uk: 'неозначений артикль; один', ru: 'неопределённый артикль; один' },
  eine: { uk: 'неозначений артикль; одна', ru: 'неопределённый артикль; одна' },
  einen: { uk: 'неозначений артикль (Akk. м. р.)', ru: 'неопределённый артикль (акк. м. р.)' },
  einem: { uk: 'неозначений артикль (Dativ)', ru: 'неопределённый артикль (дат. падеж)' },
  einer: { uk: 'неозначений артикль (Dativ ж. р.); один (з)', ru: 'неопределённый артикль (дат. ж. р.); один (из)' },
  eines: { uk: 'неозначений артикль (Genitiv)', ru: 'неопределённый артикль (род. падеж)' },
  ihn: { uk: 'його (Akk.)', ru: 'его (акк.)' },
  seine: { uk: 'його; своя', ru: 'его; своя' },
  seinen: { uk: 'його; свій (Akk.)', ru: 'его; свой (акк.)' },
  seinem: { uk: 'його; своєму (Dativ)', ru: 'его; своему (дат.)' },
  seiner: { uk: 'його; своєї (Dativ ж. р.)', ru: 'его; своей (дат. ж. р.)' },
  seines: { uk: 'його; свого (Genitiv)', ru: 'его; своего (род.)' },
  ihrer: { uk: 'її; їх (Dativ ж. р.)', ru: 'её; их (дат. ж. р.)' },
  ihrem: { uk: 'її; їх (Dativ)', ru: 'её; их (дат.)' },
  meinem: { uk: 'моєму (Dativ)', ru: 'моему (дат.)' },
  // --- часті прислівники, частки, прикметники ---
  ab: { uk: 'геть; від (absteigen — злазити)', ru: 'прочь; с (absteigen — слезать)' },
  hin: { uk: 'туди (hin und zurück — туди й назад)', ru: 'туда (hin und zurück — туда и обратно)' },
  zurück: { uk: 'назад', ru: 'назад' },
  hinaus: { uk: 'надвір; назовні', ru: 'наружу; во двор' },
  entlang: { uk: 'вздовж', ru: 'вдоль' },
  vorbei: { uk: 'повз; минати (vorbeikommen — заходити)', ru: 'мимо; проходить (vorbeikommen — заходить)' },
  durch: { uk: 'через; крізь', ru: 'через; сквозь' },
  frei: { uk: 'вільний; вільно', ru: 'свободный; свободно' },
  genau: { uk: 'точно; саме', ru: 'точно; именно' },
  gemeinsam: { uk: 'разом; спільно', ru: 'вместе; сообща' },
  allein: { uk: 'один; сам', ru: 'один; сам' },
  total: { uk: 'повністю; зовсім', ru: 'полностью; совсем' },
  kaum: { uk: 'ледве; навряд чи', ru: 'едва; вряд ли' },
  erst: { uk: 'лише; спершу; тільки', ru: 'только; сначала; лишь' },
  letzt: { uk: 'останній; минулий', ru: 'последний; прошлый' },
  dritt: { uk: 'третій', ru: 'третий' },
  zweit: { uk: 'другий (за порядком)', ru: 'второй (по порядку)' },
  beide: { uk: 'обидва; обидві', ru: 'оба; обе' },
  zweimal: { uk: 'двічі', ru: 'дважды' },
  überall: { uk: 'усюди', ru: 'везде' },
  genug: { uk: 'досить; достатньо', ru: 'достаточно' },
  vorher: { uk: 'заздалегідь; перед тим', ru: 'заранее; перед этим' },
  hier: { uk: 'тут', ru: 'здесь' },
  still: { uk: 'тихий; нерухомий', ru: 'тихий; неподвижный' },
  ungeduldig: { uk: 'нетерплячий', ru: 'нетерпеливый' },
  warm: { uk: 'теплий', ru: 'тёплый' },
  // --- часті іменники ---
  zeit: { uk: 'час (die Zeit)', ru: 'время (die Zeit)' },
  ende: { uk: 'кінець (zu Ende — до кінця)', ru: 'конец (zu Ende — до конца)' },
  mittagessen: { uk: 'обід', ru: 'обед' },
  frühstück: { uk: 'сніданок', ru: 'завтрак' },
  abendessen: { uk: 'вечеря', ru: 'ужин' },
  mittags: { uk: 'опівдні; у обід', ru: 'в полдень; в обед' },
  abends: { uk: 'увечері', ru: 'вечером' },
  mama: { uk: 'мама', ru: 'мама' },
  eltern: { uk: 'батьки (die Eltern)', ru: 'родители (die Eltern)' },
  foto: { uk: 'фотографія', ru: 'фотография' },
  fotos: { uk: 'фотографії (das Foto)', ru: 'фотографии (das Foto)' },
  eis: { uk: 'морозиво', ru: 'мороженое' },
  saft: { uk: 'сік', ru: 'сок' },
  park: { uk: 'парк', ru: 'парк' },
  see: { uk: 'озеро', ru: 'озеро' },
  ball: { uk: 'мʼяч', ru: 'мяч' },
  fußball: { uk: 'футбол', ru: 'футбол' },
  mathe: { uk: 'математика (розм.)', ru: 'математика (разг.)' },
  sport: { uk: 'фізкультура; спорт', ru: 'физкультура; спорт' },
  caf: { uk: 'кафе (das Café)', ru: 'кафе (das Café)' },
  fernsehen: { uk: 'дивитися телевізор', ru: 'смотреть телевизор' },
  salat: { uk: 'салат; листя салату', ru: 'салат; листья салата' },
  garten: { uk: 'сад', ru: 'сад' },
  ordnung: { uk: 'порядок (in Ordnung — гаразд)', ru: 'порядок (in Ordnung — в порядке)' },
  herr: { uk: 'пан; пан ... (звернення)', ru: 'господин; господин ...' },
  idee: { uk: 'ідея', ru: 'идея' },
  freundin: { uk: 'подруга', ru: 'подруга' },
  // --- часті дієслова (форм у тексті) ---
  steht: { uk: 'встає; стоїть (aufstehen/stehen)', ru: 'встаёт; стоит (aufstehen/stehen)' },
  wartet: { uk: 'чекає (warten)', ru: 'ждёт (warten)' },
  warten: { uk: 'чекати', ru: 'ждать' },
  sagt: { uk: 'каже (sagen)', ru: 'говорит (sagen)' },
  gesagt: { uk: 'сказав (sagen)', ru: 'сказал (sagen)' },
  bekommt: { uk: 'отримує (bekommen)', ru: 'получает (bekommen)' },
  öffnet: { uk: 'відкриває (öffnen)', ru: 'открывает (öffnen)' },
  liegt: { uk: 'лежить; розташований (liegen)', ru: 'лежит; находится (liegen)' },
  sitzt: { uk: 'сидить (sitzen)', ru: 'сидит (sitzen)' },
  ruft: { uk: 'кличе; кричить (rufen)', ru: 'зовёт; кричит (rufen)' },
  bellt: { uk: 'гавкає (bellen)', ru: 'лает (bellen)' },
  schaut: { uk: 'дивиться (schauen)', ru: 'смотрит (schauen)' },
  hört: { uk: 'чує; слухає (hören)', ru: 'слышит; слушает (hören)' },
  lacht: { uk: 'сміється (lachen)', ru: 'смеётся (lachen)' },
  holt: { uk: 'дістає; забирає (holen)', ru: 'достаёт; приносит (holen)' },
  fällt: { uk: 'падає (fallen)', ru: 'падает (fallen)' },
  springt: { uk: 'стрибає (springen)', ru: 'прыгает (springen)' },
  springen: { uk: 'стрибати; стрибають', ru: 'прыгать; прыгают' },
  singen: { uk: 'співати; співають', ru: 'петь; поют' },
  trifft: { uk: 'зустрічає (treffen)', ru: 'встречает (treffen)' },
  zeigt: { uk: 'показує (zeigen)', ru: 'показывает (zeigen)' },
  zeigen: { uk: 'показувати', ru: 'показывать' },
  besuchen: { uk: 'відвідувати', ru: 'посещать' },
  erzählt: { uk: 'розповідає (erzählen)', ru: 'рассказывает (erzählen)' },
  // --- друга хвиля частотних слів ---
  dazu: { uk: 'до цього; додатково', ru: 'к этому; кроме того' },
  halb: { uk: 'пів (часу): halb acht = пів на восьму', ru: 'пол (времени): halb acht = полвосьмого' },
  fern: { uk: 'телевізор (fernsehen — дивитися телевізор)', ru: 'телевизор (fernsehen — смотреть телевизор)' },
  sein: { uk: 'бути; його; свій', ru: 'быть; его; свой' },
  bekommen: { uk: 'отримувати', ru: 'получать' },
  stehen: { uk: 'стояти; стоять (місц.)', ru: 'стоять' },
  jedem: { uk: 'кожному (Dativ)', ru: 'каждому (дат.)' },
  arm: { uk: 'рука (від долоні до плеча); обійми', ru: 'рука (от кисти до плеча); объятия' },
  brötchen: { uk: 'булочка', ru: 'булочка' },
  daneben: { uk: 'поруч; поруч із тим', ru: 'рядом; рядом с этим' },
  wirft: { uk: 'кидає (werfen)', ru: 'бросает (werfen)' },
  gras: { uk: 'трава', ru: 'трава' },
  nachmittags: { uk: 'після обіду; вдень', ru: 'после обеда; днём' },
  schließen: { uk: 'зачиняти; закривати', ru: 'закрывать' },
  tor: { uk: 'ворота; хвіртка', ru: 'ворота; калитка' },
  offen: { uk: 'відчинений; відкритий', ru: 'открытый' },
  sucht: { uk: 'шукає (suchen)', ru: 'ищет (suchen)' },
  hängen: { uk: 'вішати; висіти', ru: 'вешать; висеть' },
  helfen: { uk: 'допомагати', ru: 'помогать' },
  klara: { uk: 'жіноче імʼя (подруга Лени)', ru: 'женское имя (подруга Лены)' },
  klingelt: { uk: 'дзвонить; дзвенить (klingeln)', ru: 'звонит; звенит (klingeln)' },
  bäckerei: { uk: 'пекарня', ru: 'пекарня' },
  tut: { uk: 'робить (tun); tut weh — болить', ru: 'делает (tun); tut weh — болит' },
  weh: { uk: 'біль (weh tun — боліти)', ru: 'боль (weh tun — болеть)' },
  melde: { uk: 'повідомляю (sich melden — давати знати)', ru: 'сообщаю (sich melden — дать знать)' },
  frag: { uk: 'питай (fragen — питати)', ru: 'спроси (fragen — спрашивать)' },
  supermarkt: { uk: 'супермаркет', ru: 'супермаркет' },
  zettel: { uk: 'папірець; записка', ru: 'листок; записка' },
  stock: { uk: 'поверх (im dritten Stock — на третьому поверсі)', ru: 'этаж (im dritten Stock — на третьем этаже)' },
  dank: { uk: 'подяка (zum Dank — на подяку)', ru: 'благодарность (zum Dank — в благодарность)' },
  pizza: { uk: 'піца', ru: 'пицца' },
  lachen: { uk: 'сміятися', ru: 'смеяться' },
  öffnen: { uk: 'відкривати', ru: 'открывать' },
  licht: { uk: 'світло', ru: 'свет' },
  // --- назви ---
  köln: { uk: 'Кельн (місто)', ru: 'Кёльн (город)' },
  münchen: { uk: 'Мюнхен (місто)', ru: 'Мюнхен (город)' },
  berlin: { uk: 'Берлін (столиця Німеччини)', ru: 'Берлин (столица Германии)' },
  deutschland: { uk: 'Німеччина', ru: 'Германия' },
}

/** Картка перекладу, яку бачить читач */
export type ReaderEntry = {
  /** канонічна форма (Buch для «Bücher», kommen для «kam»); для фраз порожньо */
  de?: string
  uk: string
  ru: string
  art?: 'der' | 'die' | 'das'
  pl?: string
  topic?: { emoji: string; name: { uk: string; ru: string } }
  verb?: { pret3?: string; part?: string; aux?: 'haben' | 'sein' }
}

// ---------- ІНДЕКС СЛОВНИКА ----------

const readerIndex = new Map<string, ReaderEntry>()

for (const { topic, word } of ALL_WORDS) {
  const entry: ReaderEntry = {
    de: word.de,
    uk: word.uk,
    ru: word.ru,
    art: word.art,
    pl: word.pl,
    topic: { emoji: topic.emoji, name: topic.name },
  }
  readerIndex.set(word.de.toLowerCase(), entry)
  if (word.pl) readerIndex.set(word.pl.toLowerCase(), entry)
}
for (const v of VERBS) {
  const entry: ReaderEntry = {
    de: v.inf,
    uk: v.uk,
    ru: v.ru,
    verb: { pret3: v.pret3, part: v.part, aux: v.aux },
  }
  for (const f of v.forms) if (!readerIndex.has(f.toLowerCase())) readerIndex.set(f.toLowerCase(), entry)
  if (v.pret3) readerIndex.set(v.pret3.toLowerCase(), entry)
  if (v.part) readerIndex.set(v.part.toLowerCase(), entry)
}

/** Нерегулярні форми, яких немає в VERBS (множина Präteritum тощо) */
const FORMS: Record<string, string> = {
  waren: 'sein',
  hatten: 'haben',
}

// ---------- ТОКЕНІЗАЦІЯ І ПОШУК ----------

const WORD_RE = /[A-Za-zÄÖÜäöüß]/

export type Tok = { text: string; core: string; isWord: boolean }

/** Розбити речення на токени, зберігаючи розділові знаки і пробіли */
export function tokenize(text: string): Tok[] {
  const toks: Tok[] = []
  for (const part of text.split(/(\s+)/)) {
    if (!part) continue
    if (!WORD_RE.test(part)) {
      toks.push({ text: part, core: '', isWord: false })
      continue
    }
    let a = 0
    let b = part.length
    while (a < b && !WORD_RE.test(part[a])) a++
    while (b > a && !WORD_RE.test(part[b - 1])) b--
    toks.push({ text: part, core: part.slice(a, b).toLowerCase(), isWord: true })
  }
  return toks
}

/** Морфологічні варіанти: wohnt → wohnen, schwarze → schwarz, gelesen → lesen, neues → neu */
function candidates(c: string): string[] {
  const out: string[] = []
  const push = (s: string) => {
    if (s.length > 2 && !out.includes(s)) out.push(s)
  }
  push(c)
  if (c.startsWith('ge') && c.length > 5) push(c.slice(2))
  const stems: string[] = []
  const stem = (s: string) => {
    if (s.length > 2 && !stems.includes(s)) stems.push(s)
  }
  if (c.endsWith('en')) stem(c.slice(0, -2))
  if (c.endsWith('e')) stem(c.slice(0, -1))
  if (c.endsWith('n')) stem(c.slice(0, -1))
  if (c.endsWith('st')) stem(c.slice(0, -2))
  if (c.endsWith('t')) stem(c.slice(0, -1))
  if (c.endsWith('es')) stem(c.slice(0, -2))
  if (c.endsWith('er')) stem(c.slice(0, -2))
  if (c.startsWith('ge') && c.length > 5) {
    const g = c.slice(2)
    if (g.endsWith('en')) stem(g.slice(0, -2))
    stem(g)
  }
  for (const s of stems) {
    push(s)
    if (s.endsWith('e')) {
      push(`${s}n`) // koste + n → kosten
    } else {
      push(`${s}e`) // wohn + e → wohne
      push(`${s}en`) // wohn + en → wohnen
    }
  }
  return out
}

/** Переклад одного слова (нижнім регістром) */
export function lookupWord(core: string, book: Book): ReaderEntry | null {
  const g = book.glossary[core] ?? BASE_GLOSSARY[core]
  if (g) return { de: '', uk: g.uk, ru: g.ru }
  const direct = readerIndex.get(core)
  if (direct) return direct
  const base = FORMS[core]
  if (base) {
    const e = readerIndex.get(base)
    if (e) return e
  }
  // Морфологічні варіанти: спершу глосарії (erste → erst,
  // nassen → nasser), потім словник тренажера (wohnt → wohnen)
  const cands = candidates(core)
  for (const c of cands) {
    const g2 = book.glossary[c] ?? BASE_GLOSSARY[c]
    if (g2) return { de: '', uk: g2.uk, ru: g2.ru }
  }
  for (const c of cands) {
    const e = readerIndex.get(c)
    if (e) return e
  }
  return null
}

/** Статистика книжки: розділи, абзаци, кількість німецьких слів */
export function bookStats(b: Book): { chapters: number; paras: number; words: number } {
  const paras = bookParas(b)
  const words = paras.reduce((n, p) => n + tokenize(p.de).filter((t) => t.isWord).length, 0)
  return { chapters: b.chapters.length, paras: paras.length, words }
}

export type Hit = { start: number; end: number; matched: string; entry: ReaderEntry }

/**
 * Найкращий збіг, що починається з токена i (спершу фрази 4→2
 * слів із глосаріїв, потім одне слово за всіма джерелами).
 */
export function lookupAt(toks: Tok[], i: number, book: Book): Hit | null {
  if (!toks[i]?.isWord) return null
  // Збираємо сусідні слова через пробіли (до 4): розділові знаки обривають фразу
  const cores: string[] = [toks[i].core]
  const ends: number[] = [i]
  let j = i
  for (;;) {
    let k = j + 1
    while (k < toks.length && !toks[k].isWord && toks[k].text.trim() === '') k++
    if (k >= toks.length || !toks[k].isWord) break
    j = k
    ends.push(j)
    cores.push(toks[j].core)
    if (ends.length >= 4) break
  }
  for (let n = Math.min(4, cores.length); n >= 2; n--) {
    const key = cores.slice(0, n).join(' ')
    const g = book.glossary[key] ?? BASE_GLOSSARY[key]
    if (g)
      return {
        start: i,
        end: ends[n - 1],
        matched: toks.slice(i, ends[n - 1] + 1).map((t) => t.text).join(''),
        entry: { uk: g.uk, ru: g.ru },
      }
  }
  const e = lookupWord(toks[i].core, book)
  return e ? { start: i, end: i, matched: toks[i].text, entry: e } : null
}
