import { httpClient } from './httpClient';

interface ISignUpDTO {
  name: string;
  email: string;
  password: string;
}

interface ISignInDTO {
  email: string;
  password: string;
}

interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
}

interface ISignUpResponse {
  name: string;
  email: string;
}

interface IRefreshToken extends ISignInResponse {}

export class AuthService {
  static async signUp({ name, email, password }: ISignUpDTO) {
    const { data } = await httpClient.post<ISignUpResponse>('/signup', {
      name,
      email,
      password,
    });

    return data;
  }

  static async signIn({ email, password }: ISignInDTO) {
    const { data } = await httpClient.post<ISignInResponse>('/signin', {
      email,
      password,
    });

    return data;
  }

  static async refreshToken(refreshToken: string) {
    const { data } = await httpClient.post<IRefreshToken>('/refresh-token', {
      refreshToken,
    });

    return data;
  }
}
