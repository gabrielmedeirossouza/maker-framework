import { crypto } from '@/helpers/api';

export function randomUUID(): string {
    const uuid = crypto.randomUUID().replaceAll("-", "").toLocaleLowerCase();

    return uuid;
}
