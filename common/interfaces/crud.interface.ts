export interface CRUD {
  list?: (limit: number, page: number) => Promise<any>
  listDevelopers?: (nome: string, sexo: string, idade: string, hobby: string, limit: number, page: number,) => Promise<any>
  create: (resource: any) => Promise<any>
  putById: (id: string, resource: any) => Promise<string>
  findById: (id: string) => Promise<any>
  deleteById: (id: string) => Promise<string>
  patchById?: (id: string, resource: any) => Promise<string>
}
