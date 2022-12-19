import { describe, it, expect } from 'vitest';
import { ListenerFn } from '.';

describe('Listener', () => {
    it('should create a listener function with the correct name', () => {
        const listener = new ListenerFn().Create('click', () => {});
        expect(listener.name).toBe('click');
    });

    it('should create a listener function with the correct type', () => {
        const listener = new ListenerFn().Create('click', () => {});
        expect(typeof listener).toBe('function');
    });

    it('should return a function that can be called, named "Create"', () => {
        const listener = new ListenerFn();
        expect(typeof listener.Create).toBe('function');
        expect(listener.Create.name).toBe('Create');
    });

    it('should return a function that can be called, named "Create" that expects 2 arguments', () => {
        const listener = new ListenerFn();
        expect(listener.Create.length).toBe(2);
    });
});
