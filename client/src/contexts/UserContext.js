import { createContext } from 'react';

const { Consumer: UserConsumer, Provider: UserProvider } = createContext({ user: null });

export { UserConsumer, UserProvider };