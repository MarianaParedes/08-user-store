import { CustomError } from "../errors/custom.error";
import { UserEntity } from "./user.entity";



export class CategoryEntity {
    constructor(
        public id: string,
        public name: string,
        public available: boolean,
        public user?: object //object
    ){}

    static fromObject( object:{[key:string]:any}){
        // const { id } = object;

        // if(!id){
            // return new CategoryEntity( _id || id, name, available, user)
        // }

        
    }
}