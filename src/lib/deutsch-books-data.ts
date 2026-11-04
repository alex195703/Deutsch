// ============================================================
// КНИЖКИ ЧИТАНКИ — збірка всіх книжок.
// Кожна книжка лежить в окремому файлі (deutsch-book-*.ts):
//   lena — «День Лени» (A1), bello — «Пес Белло» (A1),
//   berlin — «Вихідні в Берліні» (A2), jonas — «Йонас шукає
//   квартиру» (A2).
// Слова, яких немає в словнику тренажера, описані в глосарії
// книжки: ключ — слово/фраза нижнім регістром, значення — uk/ru.
// Гігієна мов: у uk — без російських букв, у ru — без
// українських (перевіряє scripts/test-deutsch.ts).
// ============================================================

import type { Book } from './deutsch-books'
import { LENA_BOOK } from './deutsch-book-lena'
import { BELLO_BOOK } from './deutsch-book-bello'
import { BERLIN_BOOK } from './deutsch-book-berlin'
import { JONAS_BOOK } from './deutsch-book-jonas'

export const BOOKS_LIST: Book[] = [LENA_BOOK, BELLO_BOOK, BERLIN_BOOK, JONAS_BOOK]
