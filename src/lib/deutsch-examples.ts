// ============================================================
// ПРИКЛАДИ-РЕНЧЕННЯ — збірний модуль.
// Об'єднує таблиці прикладів з п'яти файлів у одну мапу
// topicId → de-слово → речення { de, uk, ru }.
// Використовується в deutsch-data.ts: withExamples() підтягує
// речення у Word.ex (у «Словах», «Картках» і вікторині).
// Ключі мають точно збігатися з topicId та w.de — це
// перевіряє scripts/test-deutsch.ts (осиротілі ключі = помилка).
// ============================================================

import { EX_A1 } from './deutsch-ex-a1'
import { EX_A2_1 } from './deutsch-ex-a2-1'
import { EX_A2_2 } from './deutsch-ex-a2-2'
import { EX_B1_1 } from './deutsch-ex-b1-1'
import { EX_B1_2 } from './deutsch-ex-b1-2'

export type ExEntry = { de: string; uk: string; ru: string }

export const EXAMPLES: Record<string, Record<string, ExEntry>> = {
  ...EX_A1,
  ...EX_A2_1,
  ...EX_A2_2,
  ...EX_B1_1,
  ...EX_B1_2,
}

/** Кількість слів, для яких є приклади-речення */
export const EXAMPLES_COUNT = Object.values(EXAMPLES).reduce(
  (n, table) => n + Object.keys(table).length,
  0,
)
