import Link from 'next/link'

export const metadata = {
  title: 'Contact - Task 1 | Lab 8',
}

export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">Contact</p>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
          Get In Touch
        </h1>
        <p className="text-gray-500 text-sm max-w-xl mb-8">
          Professional contact form and direct communication details for the project.
          Reach out for any queries related to this lab submission.
        </p>

        <div className="max-w-lg space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:border-gray-500 focus:bg-white transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:border-gray-500 focus:bg-white transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Message</label>
            <textarea
              rows={4}
              placeholder="Your message..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:border-gray-500 focus:bg-white transition resize-none"
            />
          </div>
          <button className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
            Send Message
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-bold text-gray-800 mb-3">Direct Contact</h2>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Student</p>
            <p className="font-medium text-gray-800">Aman Mir — 233002</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Course</p>
            <p className="font-medium text-gray-800">Full Stack Programming (B)</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Institution</p>
            <p className="font-medium text-gray-800">Air University, Islamabad</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Semester</p>
            <p className="font-medium text-gray-800">Spring 2026</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Link href="/task1/home" className="px-4 py-2 border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Back to Home
        </Link>
        <Link href="/task1/about" className="px-4 py-2 border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          About
        </Link>
      </div>

    </div>
  )
}
