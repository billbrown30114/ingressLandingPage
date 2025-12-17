"use client";

const teamMembers = [
  {
    name: "Bill Brown",
    role: "President & CEO",
    description: "With 25 years of experience in software design and development, primarily in IoT product development, Bill is a proven leader with over 27 awarded US patents. He founded Ingress Software Inc. to help customers grow by leveraging his technical, security, and leadership skills.",
  },
  {
    name: "Vikas Mishra",
    role: "Ingress Development Leader",
    description: "Vikas has 10 years of IoT software development experience, focusing on scalability, reliability, and maintainability. His primary skill sets include Java, JavaScript, and server-side programming, with IoT experience using ClearBlade, AWS IoT, and Azure IoT.",
  }
];

export function TeamSection() {
  return (
    <section className="py-16">
      {/* <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Meet Our Amazing Team</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 text-center">
          Experienced professionals dedicated to delivering exceptional results
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">{member.role}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
}

