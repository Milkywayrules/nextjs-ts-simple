/**
 * Because we fetch data from /people endpoint
 */
export interface PersonAttribute {
  name: string
  url: string
}

interface NotFoundApiResponse {
  detail: string
}

export type ApiResponse = PersonAttribute | NotFoundApiResponse
