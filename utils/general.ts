import { DifficultyType } from '~/types/Difficulty';

export const DIFFICULTIES: DifficultyType[] = [
    { id: 1, code: 'Easy', name: 'Легко' },
    { id: 2, code: 'Normal', name: 'Сердне' },
    { id: 3, code: 'Hard', name: 'Тяжело' },
    { id: 4, code: 'Very hard', name: 'Очень тяжело' },
];

export function getFullNameFromNameAndSurname(
    name: string | null,
    surname: string | null,
): string | undefined {
    if (!name && !surname) return undefined;
    return `${name} ${surname}`;
}

export const SCREEN_SIZE = {
    XS: 0,
    SM: 576,
    MD: 768,
    LG: 992,
    XL: 1200,
};
