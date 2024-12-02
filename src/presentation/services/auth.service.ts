import { bcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";



export class AuthService {

    // DI

    constructor() {}

    public async registerUser( registerUserDto: RegisterUserDto) {

        const existUser = await UserModel.findOne({ email: registerUserDto.email});
        if ( existUser ) throw CustomError.badRequest('Email already exist');

        try {
            const user = new UserModel(registerUserDto);
            // Encriptar contraseña

            user.password = bcryptAdapter.hash(registerUserDto.password);
            
            await user.save();

            const { password, ...userEntity } = UserEntity.fromObject(user);

            return { 
                user: userEntity, 
                token: 'ABC'};

        } catch (error) {
            throw CustomError.internalServer(`${ error }`)
        }
    }

    public async loginUser( loginUserDto: LoginUserDto) {

        // FindOne para verificar si existe
        const userFound = await UserModel.findOne({ email: loginUserDto.email});

        if( !userFound )  throw CustomError.badRequest('Usuario y contraseña no válidos');

        const isMatch = await bcryptAdapter.compare(loginUserDto.password, userFound.password)

        if( !isMatch )  throw CustomError.badRequest('La contraseña es incorrecta');
        
        const { password, ...userEntity } = UserEntity.fromObject(userFound);

        const token = await JwtAdapter.generateToken({ id: userFound.id, email: userFound.email });

        if( !token ) throw CustomError.internalServer('Error while creating JWT');

        return {
            user: { ...userEntity },
            token: token,
        }    
       
    }

}