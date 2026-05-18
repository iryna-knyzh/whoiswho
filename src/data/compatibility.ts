import type { PartnerCharacter, CompatibilityMetric } from '../types';

export const compatibilityData: Record<PartnerCharacter, CompatibilityMetric[]> = {
prince: [
    { emoji: '🤝', label: 'Взаємна повага', value: 94 },
    { emoji: '📱', label: 'Перевірка онлайну', value: 8 },
    { emoji: '🧘', label: 'Рівень спокою', value: 88 },
    { emoji: '💬', label: 'Якість розмов', value: 91 },
    { emoji: '👑', label: 'Рівень королеви', value: 97 },
    { emoji: '💃', label: 'Бажання ча-ча-ча', value: 777 }, // танцюємо всю ніч
  ],

  frog: [
    { emoji: '👻', label: 'Його присутність', value: 18 },
    { emoji: '💬', label: 'Розмови по душі', value: 14 },
    { emoji: '😶', label: 'Рівень "нормально"', value: 76 },
    { emoji: '📲', label: 'Спроби поговорити', value: 1000 },
    { emoji: '👑', label: 'Рівень королеви', value: 48 },
    { emoji: '💃', label: 'Бажання ча-ча-ча', value: 42 },
  ],

  vampire: [
    { emoji: '🔗', label: 'Співзалежність', value: 91 },
    { emoji: '📱', label: 'Перевірка онлайну', value: 9999 },
    { emoji: '🧠', label: 'Рівень спокою', value: 9 },
    { emoji: '🎢', label: 'Емоційні гойдалки', value: 96 },
    { emoji: '👑', label: 'Рівень королеви', value: 9 },
    { emoji: '💃', label: 'Бажання ча-ча-ча', value: 4 },
  ],

  bread: [
    { emoji: '🍞', label: 'Теплота і затишок', value: 92 },
    { emoji: '🥄', label: 'Кількість борщу', value: 3000 },
    { emoji: '💪', label: 'Ініціативність', value: 31 },
    { emoji: '❓', label: 'Питань "ти їла?"', value: 87 },
    { emoji: '👑', label: 'Рівень королеви', value: 74 },
    { emoji: '💃', label: 'Бажання ча-ча-ча', value: 69 },
  ],

  rollercoaster: [
    { emoji: '🎭', label: 'Рівень драми', value: 99999 },
    { emoji: '🧘', label: 'Рівень спокою', value: 12 },
    { emoji: '🌀', label: '"Треба розібратися"', value: 88 },
    { emoji: '❤️‍🔥', label: 'Пристрасть', value: 93 },
    { emoji: '👑', label: 'Рівень королеви', value: 33 },
    { emoji: '💃', label: 'Бажання ча-ча-ча', value: 18 },
  ],
};
