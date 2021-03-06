import { IFunction, IFunctionResult, Rule } from '../../../../types';

export const oasOp2xxResponse: IFunction<Rule> = targetVal => {
  const results: IFunctionResult[] = [];

  const responses = Object.keys(targetVal);

  if (responses.filter(response => Number(response) >= 200 && Number(response) < 300).length === 0) {
    results.push({
      message: 'operations must define at least one 2xx response',
    });
  }

  return results;
};
