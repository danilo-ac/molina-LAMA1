import bcrypt from "bcryptjs";

export class HashManager {
   public hash = jest.fn(async (s: string): Promise<string> => {
      return 'senha encriptada'
   })

   public compare = jest.fn(async (s: string, hash: string): Promise<boolean> => {
      return true
   })
}