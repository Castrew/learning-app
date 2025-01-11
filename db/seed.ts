import { db } from "./db"; // Assuming you have a db instance configured with drizzle
import {
  userTable,
  treatmentTable,
  staffTable,
  appointmentTable,
  sessionTable,
  treatmentStaffTable,
} from "./schema"; // Your schema file

// Seed function to populate the database
async function seedDatabase() {
  // 1. Insert users
  // await db.insert(userTable).values([
  //   { id: "user1", username: "john_doe", hashedPassword: "hashed_pw1" },
  //   { id: "user2", username: "jane_smith", hashedPassword: "hashed_pw2" },
  // ]);

  // 2. Insert treatments
  await db.insert(treatmentTable).values([
    {
      id: "treatment1",
      title: "Therapy",
      description: "Relaxing therapy",
      duration: "30",
      price: "100",
    },
    {
      id: "treatment2",
      title: "Massage",
      description: "Full body massage",
      duration: "60",
      price: "150",
    },
  ]);

  // 3. Insert staff
  await db.insert(staffTable).values([
    { id: "staff1", name: "Dr. Smith" },
    { id: "staff2", name: "Therapist Johnson" },
  ]);

  // 4. Insert treatment_staff (junction table)
  await db.insert(treatmentStaffTable).values([
    { treatmentId: "treatment1", staffId: "staff1" },
    { treatmentId: "treatment2", staffId: "staff2" },
  ]);

  // 5. Insert appointments
  await db.insert(appointmentTable).values([
    {
      id: "appointment1",
      userId: "user1",
      treatmentId: "treatment1",
      staffId: "staff1",
      date: "09-02-2024",
      start: "10:00",
      groupId: "group1",
    },
    {
      id: "appointment2",
      userId: "user2",
      treatmentId: "treatment2",
      staffId: "staff2",
      date: "09-02-2024",
      start: "12:00",
      groupId: "group2",
    },
  ]);

  // 6. Insert sessions
  //   await db.insert(sessionTable).values([
  //     {
  //       id: "session1",
  //       userId: "user1",
  //       expiresAt: new Date("2024-09-01T15:00:00Z"),
  //     },
  //     {
  //       id: "session2",
  //       userId: "user2",
  //       expiresAt: new Date("2024-09-02T16:00:00Z"),
  //     },
  //   ]);
  // }
}
// Run the seed function
seedDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  });
