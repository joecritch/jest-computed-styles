const { parsePage } = require('../index');

test('it has the correct computed styles', () => {
  expect(parsePage('demo/test.html', 'demo/test.css')).toMatchSnapshot();
});
