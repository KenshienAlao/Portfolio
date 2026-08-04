export type ApiReponse<TData = void, TMeta = void> = {
  data?: TData; // for mutation
  success: boolean;
  message: string;
  results?: TData; // for query
  meta?: TMeta; // for pagination
};
