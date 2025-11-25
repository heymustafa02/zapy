// import { PrismaClient } from "@prisma/client";
// const prismaClient = new PrismaClient();

// async function main() {
//   // ✅ Delete existing records to avoid duplicate constraint errors
//   await prismaClient.availableTrigger.deleteMany({});
//   await prismaClient.availableAction.deleteMany({});

//   // ✅ Then seed fresh data
//   await prismaClient.availableTrigger.create({
//     data: {
//       id: "webhook",
//       name: "Webhook",
//       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIovxkR9l-OlwpjTXV1B4YNh0W_s618ijxAQ&s",
//     },
//   });

//   await prismaClient.availableAction.createMany({
//     data: [
//       {
//         id: "send-sol",
//         name: "Send Solana",
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT10458YI0Lf1-Zx4fGwhWxI_x4oPCD034xaw&s",
//       },
//       {
//         id: "email",
//         name: "Send Email",
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nd82eFk5SaBPRIeCpmwL7A4YSokA-kXSmw&s",
//       },
//     ],
//   });
// }

// main()
//   .then(() => console.log("✅ Seeded successfully"))
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prismaClient.$disconnect();
//   });

// import { PrismaClient } from "@prisma/client";
// const prismaClient = new PrismaClient();

// async function main() {
//   console.log("🧹 Cleaning existing data in correct order...");

//   // ✅ Step 1: Delete child tables first (depends on AvailableTrigger/Action)
//   await prismaClient.action.deleteMany({});
//   await prismaClient.trigger.deleteMany({});
//   await prismaClient.zap.deleteMany({});
//   await prismaClient.user.deleteMany({});

//   // ✅ Step 2: Then delete the base tables
//   await prismaClient.availableTrigger.deleteMany({});
//   await prismaClient.availableAction.deleteMany({});

//   console.log("🌱 Seeding fresh data...");

//   // ✅ (Optional) Create a test user
//   const user = await prismaClient.user.create({
//     data: {
//       name: "Test User",
//       email: "test@example.com",
//       password: "password123",
//     },
//   });

//   // ✅ Seed triggers & actions
//   await prismaClient.availableTrigger.create({
//     data: {
//       id: "webhook",
//       name: "Webhook",
//       image:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIovxkR9l-OlwpjTXV1B4YNh0W_s618ijxAQ&s",
//     },
//   });

//   await prismaClient.availableAction.createMany({
//     data: [
//       {
//         id: "send-sol",
//         name: "Send Solana",
//         image:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT10458YI0Lf1-Zx4fGwhWxI_x4oPCD034xaw&s",
//       },
//       {
//         id: "email",
//         name: "Send Email",
//         image:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nd82eFk5SaBPRIeCpmwL7A4YSokA-kXSmw&s",
//       },
//       {
//       id: "send-eth",
//       name: "Send Ethereum",
//       image:
//         "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=040",
//     },
//     {
//       id: "send-matic",
//       name: "Send Polygon (MATIC)",
//       image:
//         "https://cryptologos.cc/logos/polygon-matic-logo.png?v=040",
//     },
//     ],
//   });

//   console.log("✅ Seeded successfully with user:", user.email);
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prismaClient.$disconnect();
//   });
import { PrismaClient } from "@prisma/client";
import { PrismaClientExtends } from "@prisma/client/extension";
const prismaClient = new PrismaClient();

async function main() {
  console.log("🧹 Cleaning existing data in correct order...");

  // ✅ Step 1: Delete dependent tables first
  await prismaClient.zapRun.deleteMany({}); // <-- added this first
  await prismaClient.action.deleteMany({});
  await prismaClient.trigger.deleteMany({});

  // ✅ Step 2: Delete parent entities next
  await prismaClient.zap.deleteMany({});
  await prismaClient.user.deleteMany({});

  // ✅ Step 3: Delete base tables (lookup tables)
  await prismaClient.availableTrigger.deleteMany({});
  await prismaClient.availableAction.deleteMany({});

  console.log("🌱 Seeding fresh data...");

  // ✅ Create a test user
  const user = await prismaClient.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    },
  });

  // ✅ Seed available triggers
  await prismaClient.availableTrigger.create({
    data: {
      id: "webhook",
      name: "Webhook",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIovxkR9l-OlwpjTXV1B4YNh0W_s618ijxAQ&s",
    },
  });

  // ✅ Seed available actions (SOL, ETH, MATIC, EMAIL)
  await prismaClient.availableAction.createMany({
    data: [
      {
        id: "send-sol",
        name: "Send Solana",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT10458YI0Lf1-Zx4fGwhWxI_x4oPCD034xaw&s",
      },
      {
        id: "send-eth",
        name: "Send Ethereum",
        image: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=040",
      },
      {
        id: "send-matic",
        name: "Send Polygon (MATIC)",
        image: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=040",
      },
      {
        id: "send-aptos",
        name: "Send Aptos",
        image: "https://cryptologos.cc/logos/aptos-apt-logo.png",
      },
      {
        id: "email",
        name: "Send Email",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nd82eFk5SaBPRIeCpmwL7A4YSokA-kXSmw&s",
      },
    ],
  });

  console.log("✅ Seeded successfully with user:", user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
