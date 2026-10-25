export const tester = (testCases, testFn, settings = {}) => {
  const { additional_fields: additional_fields_keys_array } = settings;

  testCases.forEach(element => {
    const result = testFn(element.input);

    let conclusion = 'Failed :(';

    if (Array.isArray(result) && Array.isArray(element.expect)) {
      const areEqual = result.length === element.expect.length &&
        result.every((item, index) => item === element.expect[index]);
      if (areEqual === true) {
        conclusion = 'Passed.';
      };
    } else {
      if (element.expect === result) {
        conclusion = 'Passed.';
      };
    };

    const printResult = {
      case: element.case_number,
      expect: element.expect,
      result,
      conclusion: `Test ${conclusion}`
    };

    if (settings.additional_fields && settings.additional_fields.length !== 0) {
      additional_fields_keys_array.forEach(key => {
        printResult[key] = element[key]
      })
    }


    console.log(JSON.stringify(printResult));
  });
};