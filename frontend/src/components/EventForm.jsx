import { useState } from "react";
import { createEvent } from "../services/api";
import toast from "react-hot-toast";
import { Calendar, MapPin, FileText, Users, PlusCircle } from "lucide-react";

function EventForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    maxParticipants: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.location ||
      !formData.date ||
      !formData.maxParticipants
    ) {
      toast.error("⚠️ Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await createEvent(formData);
      toast.success("🎉 Event created successfully!");

      setFormData({
        title: "",
        description: "",
        location: "",
        date: "",
        maxParticipants: "",
      });

      console.log("Created Event:", res);
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("❌ Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8EDE3] via-[#F5E8D8] to-[#ECDDD0] py-12 px-4 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-[#FFF8F3] p-8 rounded-2xl shadow-xl border border-[#E3CFC3] transition-all hover:shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <PlusCircle className="text-[#8C3D35] w-8 h-8 mr-2" />
          <h2 className="text-2xl font-bold text-[#5A2A27] tracking-wide">
            Create a New Event
          </h2>
        </div>

        {/* Title */}
        <div className="mb-5">
          <label className="block text-[#5A2A27] font-medium mb-1">
            Event Title
          </label>
          <div className="relative">
            <FileText
              className="absolute left-3 top-3 text-[#8C3D35]"
              size={18}
            />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              className="w-full pl-10 p-3 border border-[#E3CFC3] rounded-lg focus:ring-2 focus:ring-[#8C3D35] focus:outline-none bg-[#FFF8F3] text-[#5A2A27] placeholder-[#A67B73]"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block text-[#5A2A27] font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write something about your event..."
            rows="3"
            className="w-full p-3 border border-[#E3CFC3] rounded-lg focus:ring-2 focus:ring-[#8C3D35] focus:outline-none bg-[#FFF8F3] text-[#5A2A27] placeholder-[#A67B73]"
          />
        </div>

        {/* Location */}
        <div className="mb-5">
          <label className="block text-[#5A2A27] font-medium mb-1">
            Location
          </label>
          <div className="relative">
            <MapPin
              className="absolute left-3 top-3 text-[#8C3D35]"
              size={18}
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="w-full pl-10 p-3 border border-[#E3CFC3] rounded-lg focus:ring-2 focus:ring-[#8C3D35] focus:outline-none bg-[#FFF8F3] text-[#5A2A27] placeholder-[#A67B73]"
            />
          </div>
        </div>

        {/* Date */}
        <div className="mb-5">
          <label className="block text-[#5A2A27] font-medium mb-1">Date</label>
          <div className="relative">
            <Calendar
              className="absolute left-3 top-3 text-[#8C3D35]"
              size={18}
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full pl-10 p-3 border border-[#E3CFC3] rounded-lg focus:ring-2 focus:ring-[#8C3D35] focus:outline-none bg-[#FFF8F3] text-[#5A2A27]"
            />
          </div>
        </div>

        {/* Max Participants */}
        <div className="mb-6">
          <label className="block text-[#5A2A27] font-medium mb-1">
            Max Participants
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-3 text-[#8C3D35]" size={18} />
            <input
              type="number"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleChange}
              placeholder="Enter max participants"
              className="w-full pl-10 p-3 border border-[#E3CFC3] rounded-lg focus:ring-2 focus:ring-[#8C3D35] focus:outline-none bg-[#FFF8F3] text-[#5A2A27] placeholder-[#A67B73]"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-[#F8EDE3] font-semibold text-lg shadow-md transition-all duration-300 ${
            loading
              ? "bg-[#CBB3A4] cursor-not-allowed"
              : "bg-[#8C3D35] hover:bg-[#702E2A] hover:scale-[1.02]"
          }`}
        >
          <PlusCircle className="w-5 h-5" />
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}

export default EventForm;
