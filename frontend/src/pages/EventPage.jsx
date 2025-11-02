import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, joinEvent } from "../services/api"; // 👈 imported joinEvent
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  UserPlus,
  Loader2,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function EventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
        toast.error("Failed to fetch event details");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  // ✅ UPDATED join handler
  const handleJoin = async () => {
    if (!event) return;
    if (event.currentParticipants >= event.maxParticipants) {
      toast.error("Event is already full!");
      return;
    }

    try {
      setIsJoining(true);
      const updated = await joinEvent(id);
      setEvent(updated.event); // update state from backend response
      toast.success("🎉 You’ve successfully joined the event!");
    } catch (error) {
      console.error("Join failed:", error);
      toast.error("Failed to join event!");
    } finally {
      setIsJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F8EDE3]">
        <Loader2 className="animate-spin text-[#8C3D35]" size={40} />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#F8EDE3] text-[#5A2A27]">
        <p className="text-lg font-medium mb-4">❌ Event not found</p>
        <button
          onClick={() => navigate("/")}
          className="text-[#8C3D35] underline hover:text-[#5A2A27] transition-all"
        >
          Back to Events
        </button>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const isEventFull = event.currentParticipants >= event.maxParticipants;
  const isPastEvent = eventDate < new Date();
  const spotsLeft = event.maxParticipants - event.currentParticipants;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8EDE3] via-[#F5E8D8] to-[#ECDDD0] py-10 px-5">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="fixed top-5 left-5 flex items-center bg-[#8C3D35] text-[#F8EDE3] px-4 py-2 rounded-full shadow-lg hover:bg-[#702E2A] transition-all"
      >
        <ArrowLeft className="mr-2 w-5 h-5" />
        Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-[#FFF8F3] rounded-3xl shadow-2xl border border-[#E3CFC3] overflow-hidden"
      >
        <div className="bg-gradient-to-r from-[#8C3D35] to-[#5A2A27] p-10 text-[#F8EDE3]">
          <h1 className="text-4xl font-extrabold tracking-wide mb-2">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-[#F3D9CA] text-sm">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {eventDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              {eventDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#F5E8D8] p-6 rounded-xl border border-[#E3CFC3]"
          >
            <h2 className="text-xl font-semibold text-[#5A2A27] mb-3 flex items-center">
              📝 About this Event
            </h2>
            <p className="text-[#6B4B3A] leading-relaxed whitespace-pre-wrap">
              {event.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#F5E8D8] p-5 rounded-xl border border-[#E3CFC3] hover:shadow-md transition-all"
            >
              <div className="flex items-start">
                <MapPin className="w-6 h-6 mr-3 text-[#8C3D35] mt-1" />
                <div>
                  <h3 className="font-semibold text-[#5A2A27] mb-1">
                    📍 Location
                  </h3>
                  <p className="text-[#6B4B3A]">{event.location}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#F5E8D8] p-5 rounded-xl border border-[#E3CFC3] hover:shadow-md transition-all"
            >
              <div className="flex items-start">
                <Users className="w-6 h-6 mr-3 text-[#8C3D35] mt-1" />
                <div>
                  <h3 className="font-semibold text-[#5A2A27] mb-1">
                    👥 Participants
                  </h3>
                  <p className="text-[#6B4B3A]">
                    {event.currentParticipants}/{event.maxParticipants} joined
                  </p>
                  {!isEventFull && !isPastEvent && (
                    <p className="text-sm text-[#4A7C59] mt-1">
                      {spotsLeft} {spotsLeft === 1 ? "spot" : "spots"} left
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-between items-center border-t border-[#E3CFC3] pt-6">
            <div>
              {isEventFull && (
                <span className="inline-block px-4 py-2 text-sm font-medium text-[#8C3D35] bg-[#FBEAE6] rounded-full">
                  Event is full
                </span>
              )}
              {isPastEvent && (
                <span className="inline-block px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
                  Event has passed
                </span>
              )}
            </div>

            {!isEventFull && !isPastEvent && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleJoin}
                disabled={isJoining}
                className="flex items-center px-6 py-3 bg-[#8C3D35] text-[#F8EDE3] font-semibold rounded-lg 
                hover:bg-[#702E2A] transition-all duration-300 disabled:bg-[#CBB3A4] disabled:cursor-not-allowed shadow-md"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                {isJoining ? "Joining..." : "Join Event"}
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default EventPage;
