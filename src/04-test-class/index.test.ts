// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const newAccount = getBankAccount(20000);
    expect(newAccount.getBalance()).toBe(20000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const newAccount = getBankAccount(500);
    expect(() => newAccount.withdraw(1000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const newAccount = getBankAccount(500);
    const secondAccount = getBankAccount(500);
    expect(() => newAccount.transfer(1000, secondAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const newAccount = getBankAccount(500);
    expect(() => newAccount.transfer(1000, newAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const newAccount = getBankAccount(500);
    newAccount.deposit(1000);
    expect(newAccount.getBalance()).toBe(1500);
  });

  test('should withdraw money', () => {
    const newAccount = getBankAccount(1500);
    newAccount.withdraw(1000);
    expect(newAccount.getBalance()).toBe(500);
  });

  test('should transfer money', () => {
    const newAccount = getBankAccount(1500);
    const newSecondAccount = getBankAccount(1500);
    newAccount.transfer(1000, newSecondAccount);
    expect(newAccount.getBalance()).toBe(500);
    expect(newSecondAccount.getBalance()).toBe(2500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const newAccount = getBankAccount(11000);
    await expect(newAccount.fetchBalance()).resolves.not.toBeNaN();
    newAccount.fetchBalance = jest.fn().mockResolvedValue(11000);
    await expect(newAccount.fetchBalance()).resolves.toBe(11000);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newAccount = getBankAccount(1000);
    newAccount.fetchBalance = jest.fn().mockResolvedValue(2000);
    await expect(newAccount.fetchBalance()).resolves.toBe(2000);
    await newAccount.synchronizeBalance();
    expect(newAccount.getBalance()).toBe(2000);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const newAccount = getBankAccount(1000);
    newAccount.fetchBalance = jest.fn().mockResolvedValue(null);
    await expect(newAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
