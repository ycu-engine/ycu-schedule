import { HelloWorldUseCase } from '~/server/hello-world'

test('createMessage', () => {
  const expected = {
    title: 'hello, Bob',
    description: 'my first message.',
  }
  expect(HelloWorldUseCase.createMessage({ name: 'Bob' })).toEqual(expected)
})

// test('createMessage fail', () => {
//   const expected = {
//     title: 'hello, lambda',
//     description: 'my second message.',
//   }
//   expect(HelloWorldUseCase.createMessage({ name: 'Bob' })).toEqual(expected)
// })
