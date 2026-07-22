declare module 'mongoose' {
  export type Schema = any;
  export type Document = any;
  export const Schema: any;
  export const models: any;
  export function model<T = any>(name: string, schema?: any): any;
  export function connect(uri: string, options?: any): Promise<any>;

  interface Mongoose {
    connect(uri: string, options?: any): Promise<any>;
    models: any;
    model<T = any>(name: string, schema?: any): any;
    Schema: any;
  }

  const mongoose: Mongoose;
  export default mongoose;
}
