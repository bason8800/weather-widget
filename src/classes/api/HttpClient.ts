import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export default abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  protected constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  };

  private _handleResponse = ({ data }: AxiosResponse) => data;

  protected _handleError = (error: any) => Promise.reject(error);

  public request<T>(config: AxiosRequestConfig = {}): Promise<T> {
    return this.instance.request(config);
  }
}
