import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

// Load environment variables
config();

const prisma = new PrismaClient();

async function createAdminUser() {
  const email = process.argv[2] || "billbrown@ingresssoftware.com";
  const name = process.argv[3] || "Bill Brown";

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name,
        defaultAvailability: [
          { dayOfWeek: 1, startTime: "09:00", endTime: "17:00", enabled: true },
          { dayOfWeek: 2, startTime: "09:00", endTime: "17:00", enabled: true },
          { dayOfWeek: 3, startTime: "09:00", endTime: "17:00", enabled: true },
          { dayOfWeek: 4, startTime: "09:00", endTime: "17:00", enabled: true },
          { dayOfWeek: 5, startTime: "09:00", endTime: "17:00", enabled: true },
        ],
      },
    });

    console.log(`✅ Admin user created/updated successfully!`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Name: ${user.name || "Not set"}`);
    console.log(`   ID: ${user.id}`);
    console.log(`\nYou can now sign in with email: ${user.email}`);
    console.log(`Note: Password is not required for now (authentication checks user existence only)`);
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();

