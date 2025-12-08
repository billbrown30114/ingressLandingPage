import { PrismaClient } from "@prisma/client";
require('dotenv').config();

const prisma = new PrismaClient();

async function checkUserIds() {
  try {
    const users = await prisma.user.findMany();
    console.log("\n📋 All users in database:\n");
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email}`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Name: ${user.name || "Not set"}`);
      console.log("");
    });

    const bookings = await prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        staffUser: {
          select: { email: true, id: true }
        }
      }
    });

    console.log("📅 Recent bookings and their staff user IDs:\n");
    bookings.forEach((booking, index) => {
      console.log(`${index + 1}. ${booking.visitorName} (${booking.visitorEmail})`);
      console.log(`   Staff User ID: ${booking.staffUserId}`);
      console.log(`   Staff User Email: ${booking.staffUser.email}`);
      console.log("");
    });
  } catch (error: any) {
    console.error("Error:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkUserIds();
