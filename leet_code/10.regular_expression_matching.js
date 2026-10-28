import { tester } from './tester.js';
const regular_expression_matching = ({ s, p }) => {

  const ruleSymbols = new Set(['.', '*']);

  let i = 0; // Для шаблона
  let j = 0; // Для строки

  while (j < s.length && i < p.length) {
    const currentTemplateSymbol = p[i];
    const currentStringSymbol = s[j];

    if (!ruleSymbols.has(currentTemplateSymbol)) {
      if (currentTemplateSymbol === currentStringSymbol) {
        i++;
        j++;
      } else {
        return false;
      }
    } else {
      if (currentTemplateSymbol === '.') {
        i++;
        j++;
      } else {
        // rule * logic
      }
    }
  }
return i === p.length && j === s.length;
};
const testCases = [
  // { case_number: 1, input: { s: 'aa', p: 'a' }, expect: false },
  // { case_number: 2, input: { s: 'aa', p: 'a*' }, expect: true },
  // { case_number: 3, input: { s: 'ab', p: '.*' }, expect: true },
  // { case_number: 4, input: { s: 'aab', p: 'c*a*b' }, expect: true },
  // { case_number: 5, input: { s: 'mississippi', p: 'mis*is*p*.' }, expect: false },
  { case_number: 6, input: { s: 'cat', p: 'c.t' }, expect: true },
  // { case_number: 7, input: { s: 'cat', p: 'car' }, expect: false },
  // { case_number: 8, input: { s: 'cat', p: 'ca' }, expect: false },
  // { case_number: 9, input: { s: '', p: '' }, expect: true },
  // { case_number: 10, input: { s: '', p: 'a*' }, expect: true },
  // { case_number: 11, input: { s: '', p: '.' }, expect: false },
  // { case_number: 12, input: { s: 'a', p: 'ab*' }, expect: true },
  // { case_number: 13, input: { s: 'aaa', p: 'a*a' }, expect: true },
  // { case_number: 14, input: { s: 'aaa', p: 'ab*a' }, expect: true },
  // { case_number: 15, input: { s: 'ab', p: '.*c' }, expect: false },
  // { case_number: 16, input: { s: 'aaa', p: 'a*a' }, expect: true },
  // { case_number: 17, input: { s: 'abcd', p: 'd*' }, expect: false },
  // { case_number: 18, input: { s: 'bbbba', p: '.*a*a' }, expect: true },
  // { case_number: 19, input: { s: 'a', p: 'ab*' }, expect: true },
  // { case_number: 20, input: { s: 'ab', p: '.*..' }, expect: true },
];
tester(testCases, regular_expression_matching);