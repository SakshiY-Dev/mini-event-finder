import { useEffect, useState } from "react";
import { getAllEvents } from "../services/api";
import { Loader2, MapPin, Users, Search } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function EventList() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data);
        setFilteredEvents(data);

        if (data.length > 0) {
          toast.success("🎉 Events loaded successfully!");
        } else {
          toast("📭 No events found!");
        }
      } catch (error) {
        toast.error("❌ Failed to load events");
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter) {
      filtered = filtered.filter((event) =>
        event.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [searchTerm, locationFilter, events]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="animate-spin text-[#8C3D35]" size={36} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8EDE3] via-[#F5E8D8] to-[#ECDDD0] py-10 px-5">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-[#5A2A27] mb-8 tracking-wide">
        🌟 Explore Amazing Events
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
        {/* Search by title */}
        <div className="relative w-full sm:w-1/2">
          <Search
            size={18}
            className="absolute left-3 top-3 text-[#8C3D35] opacity-80"
          />
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E3CFC3] bg-[#FFF8F3] text-[#5A2A27] focus:ring-2 focus:ring-[#8C3D35] focus:outline-none transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter by location */}
        <div className="w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Filter by location..."
            className="w-full px-4 py-2.5 rounded-lg border border-[#E3CFC3] bg-[#FFF8F3] text-[#5A2A27] focus:ring-2 focus:ring-[#8C3D35] focus:outline-none transition"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Events List */}
      {filteredEvents.length === 0 ? (
        <p className="text-center text-[#8C3D35] font-medium text-lg">
          No matching events found 😔
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <Link
              to={`/events/${event.id}`}
              key={event.id}
              className="group block bg-[#FFF8F3] border border-[#E3CFC3] rounded-2xl shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#F5E8D8] via-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

              {/* Event Title */}
              <h3 className="text-2xl font-semibold text-[#8C3D35] mb-2 relative z-10">
                {event.title}
              </h3>

              {/* Description */}
              <p className="text-[#6B4B3A] text-sm mb-4 relative z-10 line-clamp-3">
                {event.description}
              </p>

              {/* Event Details */}
              <div className="flex flex-col gap-2 text-[#5A2A27] text-sm relative z-10">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#8C3D35]" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-[#8C3D35]" />
                  <span>
                    {event.currentParticipants}/{event.maxParticipants} joined
                  </span>
                </div>
                <p className="text-xs text-[#8C3D35] font-medium">
                  📅 {event.date}
                </p>
              </div>

              {/* Hover Button */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button className="bg-[#8C3D35] text-[#F8EDE3] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#702E2A] shadow-md">
                  View Details →
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventList;
