export interface CRUD {
  list?: (limit: number, page: number) => Promise<any>
  listDevelopers?: (limit: number, page: number, nome:string, sexo: string, idade:string, hobby:string) => Promise<any>
  create: (resource: any) => Promise<any>
  putById: (id: string, resource: any) => Promise<string>
  readById: (id: string) => Promise<any>
  deleteById: (id: string) => Promise<string>
  patchById?: (id: string, resource: any) => Promise<string>
}
