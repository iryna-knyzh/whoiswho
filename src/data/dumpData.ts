export type DumpableCharacter = 'frog' | 'vampire';

export interface DumpScenario {
  buttonText: string;
  dumpingMessages: { emoji: string; text: string }[];
  successTitle: string;
  farewellQuote: string;
}

export const dumpData: Record<DumpableCharacter, DumpScenario> = {
  frog: {
    buttonText: '🚮 Викинути жабу',
    dumpingMessages: [
      { emoji: '🌿', text: 'Осушуємо болото...' },
      { emoji: '🧠', text: 'Повертаємо ваші нерви...' },
      { emoji: '👑', text: 'Завантажуємо почуття власної цінності...' },
      { emoji: '✨', text: 'Активуємо режим королеви...' },
    ],
    successTitle: '🎉 Жабу успішно випущено у природне середовище',
    farewellQuote: 'Зачекайте... а хто тепер буде казати: «Поживемо — побачимо?»',
  },
  vampire: {
    buttonText: '🚮 Викинути вампіра',
    dumpingMessages: [
      { emoji: '🧠', text: 'Повертаємо ваші нерви...' },
      { emoji: '💔', text: 'Забираємо почуття провини...' },
      { emoji: '🔍', text: 'Зменшуємо аналіз слова "ок"...' },
      { emoji: '✨', text: 'Активуємо режим королеви...' },
    ],
    successTitle: '🎉 Ваші нерви успішно повернуто',
    farewellQuote: 'Почекайте... а хто тепер буде казати: «Ти занадто гостро реагуєш?»',
  },
};

export const DUMP_SIDE_EFFECTS = [
  '☑️ більше вільного часу',
  '☑️ менше перевірок онлайну',
  '☑️ зменшення детективних розслідувань',
  '☑️ раптове бажання танцювати ча-ча-ча',
];
