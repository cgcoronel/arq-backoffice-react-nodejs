//Include unit testing libs.
const { notFound } = require('../../../src/server/middleware/not-found');

describe('notFound:', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('- Error 404', async () => {
    const jsonStub = jest.fn();
    const res = {
      status: () => ({
        json: jsonStub,
      }),
    };

    await notFound({}, res);

    const errorCompare = {
      error: 'Route not found.',
    };

    expect(jsonStub.mock.calls[0][0]).toStrictEqual(errorCompare);
  });
});
