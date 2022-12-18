import { describe, it, expect } from 'vitest';
import { randomUUID } from '.';

describe(randomUUID.name, () => {
    it('should return a string', () => {
        const uuid = randomUUID();

        expect(typeof uuid).toBe('string');
    });

    it('should return a string of length 32', () => {
        const uuid = randomUUID();

        expect(uuid.length).toBe(32);
    });

    it('should return a string of lowercase characters', () => {
        const uuid = randomUUID();

        expect(uuid).toBe(uuid.toLowerCase());
    });

    it('should return a string without special characters', () => {
        const uuid = randomUUID();

        expect(uuid).toMatch(/^[\da-z]+$/);
    });

    it('should return different strings', () => {
        const uuid1 = randomUUID();
        const uuid2 = randomUUID();

        expect(uuid1).not.toBe(uuid2);
    });
});
