import dotenv from "dotenv";
import App from "./app";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = new App()
app.init()


async function test(){
    const client = new PrismaClient();
    const resCreate = await client.entry.aggregate({_count: {
        id: true
    }})
    console.log(resCreate._count.id);
}
// test()

// async function generateMochData() {
//   const img = faker.image.business();
//   const text = faker.lorem.text();

//   const client = new PrismaClient();
//   //   const resCreate = await client.entry.deleteMany({})
//   const resCreate = await client.entry.create({
//     data: {
//       userId: 1,
//       text,
//       img,
//     },
//   });
//   console.log(resCreate);
// }

// for (let index = 0; index < 23; index++) {
//   generateMochData();
// }
