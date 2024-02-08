import path from 'path';
import fs from 'node:fs';
import fsPromises from 'fs/promises';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const cb = jest.fn();
    const timeout = 100;

    doStuffByTimeout(cb, timeout);

    expect(setTimeout).toHaveBeenCalledWith(cb, timeout);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const cb = jest.fn();
    const timeout = 100;

    doStuffByTimeout(cb, timeout);

    expect(setTimeout).toHaveBeenCalledWith(cb, timeout);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const cb = jest.fn();
    const interval = 100;

    doStuffByInterval(cb, interval);

    expect(setInterval).toHaveBeenCalledWith(cb, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const cb = jest.fn();
    const interval = 100;
    const callsCount = 5;

    doStuffByInterval(cb, interval);

    jest.advanceTimersByTime(interval * callsCount);

    expect(cb).toHaveBeenCalledTimes(callsCount);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'filename.txt';
    const join = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);

    expect(join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'filename.txt';
    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'filename.txt';
    const fileContent = 'some file content';
    jest.spyOn(path, 'join');
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    jest.spyOn(fsPromises, 'readFile').mockImplementation(() => {
      return new Promise((resolve) => resolve(fileContent));
    });

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(fileContent);
  });
});
