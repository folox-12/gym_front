export function getFullNameFromNameAndSurname(
    name: string | undefined,
    surname: string | undefined
): string {
    if(!name && !surname) return "Фамилия или имя отсутствует"
    return `${name} ${surname}`;
}
