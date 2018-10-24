import constant from '../constant';

test('Const DATETIME_FORMAT should be YYYY-MM-DD HH:mm:ss', () => {
  expect(constant.DATETIME_FORMAT).toBe('YYYY-MM-DD HH:mm:ss');
});

test('Const PAGE_SIZE should', () => {
  expect(constant.PAGE_SIZE).toBe(20);
});