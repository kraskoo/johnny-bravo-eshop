import { createContext } from 'react';

const userValue = { user: null };
const { Consumer: UserConsumer, Provider: UserProvider } = createContext(userValue);

export { UserConsumer, UserProvider, userValue };