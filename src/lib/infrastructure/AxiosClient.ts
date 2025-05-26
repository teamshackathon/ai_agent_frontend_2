import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

import { getFirebaseAuth } from "@/lib/firebase";

export class AxiosClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // リクエストインターセプターを設定
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        // 認証トークンをリクエストに追加
        const token = await this.getFirebaseToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // 401エラーの場合とリトライフラグが立っていない場合
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          // 現在のAuthorizationヘッダーがないかチェック
          const currentAuth = originalRequest.headers?.Authorization;
          if (!currentAuth || !currentAuth.startsWith("Bearer ")) {
            // 新しいトークンを取得
            const token = await this.getFirebaseToken();
            if (token) {
              // 新しいトークンを設定
              originalRequest.headers.Authorization = `Bearer ${token}`;
              // リクエストを再試行
              return this.axiosInstance(originalRequest);
            }
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstance.get<T>(url, this.recequestConfig);
    return response;
  }

  async post<T, U>(url: string, data: T): Promise<AxiosResponse<U>> {
    const response = await this.axiosInstance.post<U>(
      url,
      data,
      this.recequestConfig
    );
    return response;
  }

  async put<T, U>(url: string, data: T): Promise<AxiosResponse<U>> {
    const response = await this.axiosInstance.put<U>(
      url,
      data,
      this.recequestConfig
    );
    return response;
  }

  async delete<T>(url: string): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstance.delete<T>(
      url,
      this.recequestConfig
    );
    return response;
  }

  private baseURL: string =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

  private get recequestConfig(): AxiosRequestConfig {
    return {
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
  }

  private async getFirebaseToken(): Promise<string | null> {
    try {
      const auth = getFirebaseAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        return null;
      }

      const token = await currentUser.getIdToken(true);
      return token;
    } catch (error) {
      console.error("Firebase IDトークン取得エラー:", error);
      return null;
    }
  }
}

export function createAxiosClient(): AxiosClient {
  return new AxiosClient();
}
