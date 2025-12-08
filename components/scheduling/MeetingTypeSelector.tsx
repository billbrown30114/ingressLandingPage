"use client";

type MeetingType = {
  id: string;
  title: string;
  duration: number;
  description: string | null;
};

type Props = {
  meetingTypes: MeetingType[];
  onSelect: (meetingType: MeetingType) => void;
};

export function MeetingTypeSelector({ meetingTypes, onSelect }: Props) {
  // Ensure meetingTypes is always an array
  const safeMeetingTypes = Array.isArray(meetingTypes) ? meetingTypes : [];

  if (safeMeetingTypes.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-2">Select a Meeting Type</h1>
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
          <p className="font-semibold mb-2">No meeting types available</p>
          <p className="text-sm">
            Please configure meeting types in the admin portal or check your database connection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
        Select a Meeting Type
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Choose the type of AI consultation that best fits your needs
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {safeMeetingTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelect(type)}
            className="group relative bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-left hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border-orange-400 dark:hover:border-orange-600"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-blue-500 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{type.title}</h2>
              <div className="inline-block px-3 py-1 mb-3 bg-gradient-to-r from-orange-100 to-blue-100 dark:from-orange-900 dark:to-blue-900 rounded-full">
                <span className="text-sm font-bold text-orange-700 dark:text-orange-300">
                  {type.duration} minutes
                </span>
              </div>
            {type.description && (
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{type.description}</p>
            )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

