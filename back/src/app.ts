import express, { Express } from "express";
import cors from "cors"
import fileUpload from "express-fileupload"
import EnrtryControllerBase from "./controllers/entry.controller/entry.controller.main";
import UserControllerBase from "./controllers/user.controller/user.controller.main";



export default class App {
  private app: Express;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors())
    this.app.use(fileUpload({}));
    this.app.use(express.static('images'));
    this.app.use('/api/v1/', new EnrtryControllerBase().getRouter())
    this.app.use('/api/v1/', new UserControllerBase().getRouter())
  }

  public init() {
    // const controllersConfig: ControllersConfigType[] = [
    //   {
    //     method: "post",
    //     path: "/register",
    //     middleware: [
    //       body("email").isEmail(),
    //       body("name").isLength({ max: 15, min: 4 }),
    //       body("password").isStrongPassword({ minLength: 4, minNumbers: 2, minUppercase: 1, minSymbols: 0}),
    //       validateMiddleware
    //     ],
    //     controller: new UserControllerRegister(),
    //   },
    //   {
    //     method: "post",
    //     path: "/auth",
    //     middleware: [
    //       body("email").isEmail(),
    //       body("password").isStrongPassword({ minLength: 4, minNumbers: 2, minUppercase: 1, minSymbols: 0}),
    //       validateMiddleware
    //     ],
    //     controller: new UserControllerAuth(),
    //   },

    //   {
    //     method: "post",
    //     path: "/add-entry",
    //     middleware: [
    //       body("text").notEmpty(),
    //       validateMiddleware,
    //       isAuthMiddleware
    //     ],
    //     controller: new UserControllerAddEntry(),
    //   },
    //   {
    //     method: "delete",
    //     path: "/entry",
    //     middleware: [
    //       body("id").isNumeric(),
    //       validateMiddleware,
    //       isAuthMiddleware
    //     ],
    //     controller: new EntryControllerDelete(),
    //   },

    //   {
    //     method: "put",
    //     path: "/entry",
    //     middleware: [
    //       body("id").isNumeric(),
    //       body("text").notEmpty(),
    //       validateMiddleware,
    //       isAuthMiddleware
    //     ],
    //     controller: new EntryControllerUpdate(),
    //   },

      // {
      //   method: "get",
      //   path: "/entry",
      //   middleware: [
      //     query("page").isNumeric(),
      //     validateMiddleware
      //     // isAuthMiddleware
      //   ],
      //   controller: new EntryControllerGetItems(),
      // },

      

    //   {
    //     method: "get",
    //     path: "/entry-count",
    //     middleware: [
    //     ],
    //     controller: new EntryControllerCount(),
    //   },

    //   {
    //     method: "post",
    //     path: "/auth-token",
    //     middleware: [
    //       isAuthMiddleware
    //     ],
    //     controller: new UserControllerToken(),
    //   },
    // ];

    // for (const conttrollerItem of controllersConfig) {
    //   this.app[conttrollerItem.method](
    //     conttrollerItem.path,
    //     ...conttrollerItem.middleware,
    //     conttrollerItem.controller.index.bind(conttrollerItem.controller)
    //   );
    // }

    this.app.listen(process.env.PORT, () => {
      console.log(
        `⚡️[server]: Server is running at http://localhost:${process.env.PORT}`
      );
    });
  }
}
