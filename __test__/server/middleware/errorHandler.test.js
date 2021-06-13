//Include unit testing libs.
const { errorHandler } = require('../../../src/server/middleware/errorHandler');

describe('errorHandler:', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('- Other error code', async () => {
    const error = {
      statusCode: 502,
      message: 'Mocked error',
    };

    const jsonStub = jest.fn();
    const res = {
      status: () => ({
        json: jsonStub,
      }),
    };

    await errorHandler(error, {}, res, {});

    const errorCompare = {
      status: 502,
      message: 'Mocked error',
      detail: {},
    };

    expect(jsonStub.mock.calls[0][0]).toStrictEqual(errorCompare);
  });

  it('- Error code 500', async () => {
    const error = {
      message: 'Mocked error',
    };

    const jsonStub = jest.fn();
    const res = {
      status: () => ({
        json: jsonStub,
      }),
    };

    await errorHandler(error, {}, res, {});

    const errorCompare = {
      status: 500,
      message: 'Mocked error',
      detail: {},
    };

    expect(jsonStub.mock.calls[0][0]).toStrictEqual(errorCompare);
  });

  it('- Error no message', async () => {
    const error = {};

    const jsonStub = jest.fn();
    const res = {
      status: () => ({
        json: jsonStub,
      }),
    };

    await errorHandler(error, {}, res, {});

    const errorCompare = {
      status: 500,
      message: 'Internal server Error',
      detail: {},
    };

    expect(jsonStub.mock.calls[0][0]).toStrictEqual(errorCompare);
  });
});
