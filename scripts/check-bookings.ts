import { PrismaClient } from "@prisma/client";
require('dotenv').config();

const prisma = new PrismaClient();

async function checkBookings() {
  try {
    const count = await prisma.booking.count();
    console.log(`\n📊 Total bookings in database: ${count}\n`);

    if (count > 0) {
      const bookings = await prisma.booking.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          meetingType: {
            select: { title: true, duration: true }
          }
        }
      });

      console.log("Recent bookings:");
      bookings.forEach((booking, index) => {
        console.log(`\n${index + 1}. ${booking.visitorName} (${booking.visitorEmail})`);
        console.log(`   Meeting: ${booking.meetingType.title}`);
        console.log(`   Date: ${booking.startTime.toLocaleString()}`);
        console.log(`   Status: ${booking.status}`);
        console.log(`   Created: ${booking.createdAt.toLocaleString()}`);
      });
    } else {
      console.log("No bookings found in database.");
    }
  } catch (error: any) {
    console.error("Error checking bookings:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkBookings();
