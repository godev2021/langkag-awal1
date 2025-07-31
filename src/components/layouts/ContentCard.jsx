export default function ContentCard() {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md text-center max-w-3xl mx-auto mt-8">
        <img src="/desk-illustration.png" alt="desk" className="mx-auto h-40 mb-6" />
        <h2 className="text-xl font-bold text-primary">Halo, Alfian Purnomo</h2>
        <p className="mt-2 text-sm text-gray-600">Tunggu fitur Desklab terbaru!</p>
        <p className="text-xs mt-10 text-right text-gray-400">
          Version Number 1.10.0 (production - edts) | <a href="#" className="underline">EDTS</a> © 2025 Technology Division.
        </p>
      </div>
    );
  }
  