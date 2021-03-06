import { Spectral } from '../../../spectral';
import { commonOasRules } from '../index';

const ruleset = { rules: commonOasRules() };

describe('contact-properties', () => {
  const s = new Spectral();
  s.addRules({
    'contact-properties': Object.assign(ruleset.rules['contact-properties'], {
      enabled: true,
    }),
  });

  test('validate a correct object', async () => {
    const results = await s.run({
      swagger: '2.0',
      paths: {},
      info: {
        contact: {
          name: 'stoplight',
          url: 'stoplight.io',
          email: 'support@stoplight.io',
        },
      },
    });
    expect(results.length).toEqual(0);
  });

  test('return errors if name, url, email are missing', async () => {
    const results = await s.run({
      swagger: '2.0',
      paths: {},
      info: { contact: {} },
    });
    expect(results).toMatchSnapshot();
  });
});
