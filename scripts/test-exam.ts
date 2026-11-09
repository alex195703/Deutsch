// ============================================================
// Тест симулятора екзамену: генеруємо варіанти для трьох
// рівнів і перевіряємо структуру (25 питань, 5 частин),
// унікальність, валідність відповідей і гігієну мов uk/ru.
// Запуск: bun scripts/test-exam.ts
// ============================================================

import { buildExam, PART_META, EXAM_SIZE, type ExamQ } from '../src/lib/deutsch-exam'
import { ALL_WORDS, displayDe, type Word } from '../src/lib/deutsch-data'

const ukBad = /[ЭэЫыЁё]/
const ruBad = /[ЇїІіЄєҐґ]/

const trUk = (w: Word) => w.uk
const trRu = (w: Word) => w.ru
const tUk = (b: { uk: string; ru: string }) => b.uk
const tRu = (b: { uk: string; ru: string }) => b.ru

let failures = 0
function fail(msg: string) {
  failures++
  console.error(`✗ ${msg}`)
}

function checkPaper(level: 'A1' | 'A2' | 'B1', tr: (w: Word) => string, t: (b: { uk: string; ru: string }) => string, lang: 'uk' | 'ru') {
  for (let run = 1; run <= 5; run++) {
    const paper = buildExam(level, tr, t)
    const qs = paper.questions

    if (qs.length !== EXAM_SIZE) fail(`${level} #${run}: питань ${qs.length}, очікували ${EXAM_SIZE}`)

    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    for (const q of qs) counts[q.part]++
    const expect = { 1: 8, 2: 5, 3: 6, 4: 3, 5: 3 }
    for (const p of [1, 2, 3, 4, 5]) {
      if (counts[p] !== expect[p as keyof typeof expect]) fail(`${level} #${run}: частина ${p} — ${counts[p]} питань, очікували ${expect[p as keyof typeof expect]}`)
    }

    const prompts = new Set<string>()
    for (const q of qs) {
      if (!q.options.length) fail(`${level} #${run}: порожні варіанти: ${q.prompt}`)
      if (q.correct < 0 || q.correct >= q.options.length) fail(`${level} #${run}: некоректний індекс відповіді: ${q.prompt}`)
      if (new Set(q.options).size !== q.options.length) fail(`${level} #${run}: дублікати варіантів: ${q.options.join(' | ')}`)
      if (q.part === 2 && q.options.length === 3 && !['der', 'die', 'das'].every((a) => q.options.includes(a)))
        fail(`${level} #${run}: артиклеві варіанти неповні: ${q.options.join(' | ')}`)
      if (lang === 'uk' && ukBad.test(q.prompt)) fail(`${level} #${run}: рос. літери в uk-промпті: "${q.prompt}"`)
      if (lang === 'ru' && ruBad.test(q.prompt)) fail(`${level} #${run}: укр. літери в ru-промпті: "${q.prompt}"`)
      prompts.add(q.prompt)
    }
    if (prompts.size !== qs.length) fail(`${level} #${run}: повтори промптів (${prompts.size}/${qs.length})`)

    // читання: 3 питання мають посилатися на той самий текст
    const readings = new Set(qs.filter((q) => q.part === 5).map((q) => q.reading?.id))
    if (readings.size !== 1) fail(`${level} #${run}: у частині 5 різні тексти: ${[...readings].join(',')}`)

    // прогрес: у wordRef-питань валідний ключ
    for (const q of qs) {
      if (q.wordRef && !q.recKind) fail(`${level} #${run}: wordRef без recKind: ${q.prompt}`)
    }
  }
}

// метадані частин — гігієна мов
for (const p of [1, 2, 3, 4, 5] as const) {
  const m = PART_META[p]
  if (ukBad.test(m.name.uk) || ukBad.test(m.hint.uk)) fail(`PART_META ${p}: рос. літери в uk`)
  if (ruBad.test(m.name.ru) || ruBad.test(m.hint.ru)) fail(`PART_META ${p}: укр. літери в ru`)
}

checkPaper('A1', trUk, tUk, 'uk')
checkPaper('A1', trRu, tRu, 'ru')
checkPaper('A2', trUk, tUk, 'uk')
checkPaper('A2', trRu, tRu, 'ru')
checkPaper('B1', trUk, tUk, 'uk')
checkPaper('B1', trRu, tRu, 'ru')

// розміри пулів — щоб було видно запас питань
const byLevel = (lv: string) => ALL_WORDS.filter((a) => a.topic.level === lv).length
const nounsByLevel = (lv: string) => ALL_WORDS.filter((a) => a.topic.level === lv && a.word.art).length
const exByLevel = (lv: string) => ALL_WORDS.filter((a) => a.topic.level === lv && a.word.ex).length
console.log('Пули слів: A1 =', byLevel('A1'), '· A2 =', byLevel('A2'), '· B1 =', byLevel('B1'))
console.log('Іменники:  A1 =', nounsByLevel('A1'), '· A2 =', nounsByLevel('A2'), '· B1 =', nounsByLevel('B1'))
console.log('З прикладами (Hören): A1 =', exByLevel('A1'), '· A2 =', exByLevel('A2'), '· B1 =', exByLevel('B1'))

// демонстраційний друк одного варіанту A1 (uk)
const demo: ExamQ[] = buildExam('A1', trUk, tUk).questions
console.log('\n--- Демо-варіант A1 (uk), промпти ---')
demo.forEach((q, i) => console.log(`${i + 1}. [Ч${q.part}] ${q.prompt} → ✓ ${q.options[q.correct]}`))

if (failures > 0) {
  console.error(`\nПОМИЛОК: ${failures}`)
  process.exit(1)
}
console.log('\nOK — симулятор екзамену працює коректно ✔')
