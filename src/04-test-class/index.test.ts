// Uncomment the code below and write your tests
import lodash from 'lodash';
import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);

    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(100);

    expect(() => account.withdraw(200)).toThrow(
      'Insufficient funds: cannot withdraw more than 100',
    );
  });

  test('should throw error when transferring more than balance', () => {
    const testAccount = getBankAccount(100);
    const targetAccount = getBankAccount(200);

    expect(() => testAccount.transfer(500, targetAccount)).toThrow(
      'Insufficient funds: cannot withdraw more than 100',
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);

    expect(() => account.transfer(50, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(500);

    expect(account.getBalance()).toBe(600);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(20);

    expect(account.getBalance()).toBe(80);
  });

  test('should transfer money', () => {
    const account = getBankAccount(100);
    const targetAccount = getBankAccount(250);

    account.transfer(50, targetAccount);

    expect(targetAccount.getBalance()).toBe(300);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    jest.spyOn(lodash, 'random').mockReturnValue(25);
    const balance = await account.fetchBalance();

    expect(balance).toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    jest.spyOn(lodash, 'random').mockReturnValue(25);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(25);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    jest.spyOn(lodash, 'random').mockReturnValue(0);

    expect(account.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
