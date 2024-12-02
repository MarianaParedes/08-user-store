import { Router } from 'express';
import { Authroutes } from './auth/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth', Authroutes.routes );
    // router.use('/login', /*TodoRoutes.routes */ );
    // router.use('/register', /*TodoRoutes.routes */ );


    // router.use('/validate-email/:token', /*TodoRoutes.routes */ );



    return router;
  }


}

