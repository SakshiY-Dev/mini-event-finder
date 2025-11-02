import EventList from "../components/EventList";
import EventForm from "../components/EventForm";
import { Plus, CalendarRange } from "lucide-react";
import { useState } from "react";

function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8EDE3] via-[#F5E8D8] to-[#ECDDD0]">
      {/* 🌟 Header */}
      <header className="bg-[#5A2A27] shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-[#F8EDE3] tracking-wide flex gap-3 items-center">
              <CalendarRange className="w-9 h-9 text-[#F3D9CA]" />
              Mini Event Finder
            </h1>
            <p className="text-[#EED6C4] mt-1 text-sm">
              Discover, create and explore events with elegance ✨
            </p>
          </div>

          {/* Create Button */}
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="flex items-center px-5 py-2.5 bg-[#8C3D35] hover:bg-[#702E2A]
             text-[#F8EDE3] font-semibold rounded-lg shadow-lg transition-all duration-300"
          >
            <Plus className="w-5 h-5 mr-2" />
            {showForm ? "Close Form" : "Create Event"}
          </button>
        </div>
      </header>

      {/* 🌙 Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Event Form Card */}
        {showForm && (
          <div
            className="mb-10 p-8 rounded-xl shadow-xl bg-[#F9EDE1] border border-[#D8C1B4] 
           transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-[#5A2A27] mb-4 flex items-center gap-2">
              📝 Create a New Event
            </h2>
            <EventForm />
          </div>
        )}

        {/* Event List Card */}
        <div className="p-8 rounded-xl shadow-xl bg-[#FFF6EF] border border-[#DBC6BA]">
          <h2 className="text-2xl font-bold text-[#5A2A27] mb-5 flex items-center gap-2">
            📅 Upcoming Events
          </h2>
          <EventList />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#5A2A27] mt-16 py-6 shadow-inner">
        <p className="text-center text-[#F8EDE3] text-sm tracking-wide">
          Where creativity meets code — built to inspire and connect ✨
        </p>
      </footer>
    </div>
  );
}

export default Home;
