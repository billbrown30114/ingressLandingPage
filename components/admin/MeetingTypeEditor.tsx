"use client";

import { useState, useEffect } from "react";

type MeetingType = {
  id: string;
  title: string;
  duration: number;
  description: string | null;
  location: string | null;
};

export function MeetingTypeEditor() {
  const [meetingTypes, setMeetingTypes] = useState<MeetingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    duration: 30,
    description: "",
    location: "Google Meet",
  });

  useEffect(() => {
    fetchMeetingTypes();
  }, []);

  const fetchMeetingTypes = async () => {
    try {
      const res = await fetch("/api/admin/meeting-types");
      const data = await res.json();
      setMeetingTypes(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch meeting types:", error);
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await fetch("/api/admin/meeting-types", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchMeetingTypes();
        setFormData({ title: "", duration: 30, description: "", location: "Google Meet" });
      }
    } catch (error) {
      console.error("Failed to create meeting type:", error);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/meeting-types/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchMeetingTypes();
        setEditing(null);
        setFormData({ title: "", duration: 30, description: "", location: "Google Meet" });
      }
    } catch (error) {
      console.error("Failed to update meeting type:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this meeting type?")) return;
    try {
      const res = await fetch(`/api/admin/meeting-types/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchMeetingTypes();
      }
    } catch (error) {
      console.error("Failed to delete meeting type:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Meeting Types</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editing ? "Edit Meeting Type" : "Create New Meeting Type"}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <select
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="Google Meet">Google Meet</option>
              <option value="Phone">Phone</option>
            </select>
          </div>
          <button
            onClick={() => (editing ? handleUpdate(editing) : handleCreate())}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            {editing ? "Update" : "Create"}
          </button>
          {editing && (
            <button
              onClick={() => {
                setEditing(null);
                setFormData({ title: "", duration: 30, description: "", location: "Google Meet" });
              }}
              className="ml-2 bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {meetingTypes.map((type) => (
          <div
            key={type.id}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 border flex justify-between items-start"
          >
            <div>
              <h3 className="text-lg font-semibold">{type.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Duration: {type.duration} minutes
              </p>
              {type.description && (
                <p className="text-sm text-gray-500 mt-2">{type.description}</p>
              )}
              {type.location && (
                <p className="text-sm text-gray-500">Location: {type.location}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditing(type.id);
                  setFormData({
                    title: type.title,
                    duration: type.duration,
                    description: type.description || "",
                    location: type.location || "Google Meet",
                  });
                }}
                className="text-blue-600 hover:text-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(type.id)}
                className="text-red-600 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

