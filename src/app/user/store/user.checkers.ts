import { IUser } from './user.reducer';

export const isRegistered = (user: IUser): boolean => {
  return Boolean(user && user.id);
};

export const isGuest = (user: IUser): boolean => {
  return !isRegistered(user);
};
