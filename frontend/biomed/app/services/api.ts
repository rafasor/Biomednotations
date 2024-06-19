import axios from 'axios';

export interface LoginData {
  ra: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
  };
}

const api = axios.create({
  baseURL: 'https://localhost:9090/api',
});

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/login', data);
  return response.data;
};

export default api;
