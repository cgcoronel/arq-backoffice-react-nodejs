//Include unit testing libs.
const health = require('../../../src/server/controller/health');

describe('health controller - test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('health controller', async () => {
    const jsonStub = jest.fn();
    const res = {
      status: () => ({
        json: jsonStub,
      }),
    };

    await health({}, res);
    const messageCompare = { health: 'OK' };

    expect(jsonStub.mock.calls[0][0]).toStrictEqual(messageCompare);
  });
});
