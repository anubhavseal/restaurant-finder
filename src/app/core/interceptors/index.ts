import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./api-user-key.interceptor";
import { ApiBasePathInterceptor } from "./api-base-path-interceptor";

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiBasePathInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
