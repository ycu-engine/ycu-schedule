export interface User {
  name: string
}

export interface GreetingMessage {
  title: string
  description: string
}

export class HelloWorldUseCase {
  public static async hello(user: User): Promise<GreetingMessage> {
    const message = HelloWorldUseCase.createMessage(user)
    return message
  }

  static createMessage(user: User): GreetingMessage {
    return {
      title: `hello, ${user.name}`,
      description: 'my first message.',
    }
  }
}
