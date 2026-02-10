import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaPaperPlane, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      // 1️⃣ Send email to YOU
      await emailjs.send(
        "service_du69d4q",
        "TEMPLATE_TO_YOU",
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        "c_x8cKKjMjN77Zc9y"
      );

      // 2️⃣ Auto-reply to CLIENT
      await emailjs.send(
        "service_du69d4q",
        "AUTO_REPLY_TEMPLATE",
        {
          name: formData.name,
          email: formData.email,
        },
        "c_x8cKKjMjN77Zc9y"
      );

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">

        {/* LEFT INFO */}
        <div>
          <h2 className="text-4xl font-bold mb-4">Let’s Work Together</h2>
          <p className="text-gray-400 mb-8">
            Have a project in mind or want to collaborate?  
            Fill out the form and I’ll get back to you within 24 hours.
          </p>

          <div className="space-y-4 text-gray-300">
            <p className="flex items-center gap-3">
              <FaEnvelope /> yourmail@gmail.com
            </p>
            <p className="flex items-center gap-3">
              <FaPhone /> +91 XXXXX XXXXX
            </p>
            <p className="flex items-center gap-3">
              <FaMapMarkerAlt /> India
            </p>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-8 rounded-xl shadow-lg space-y-6"
        >
          <div>
            <label className="block mb-2 text-sm">Your Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Your Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Subject</label>
            <input
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded font-semibold disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
            <FaPaperPlane />
          </button>

          {/* STATUS MESSAGE */}
          {status === "success" && (
            <p className="text-green-400 text-center">
              ✅ Message sent! I’ll contact you within 24 hours.
            </p>
          )}

          {status === "error" && (
            <p className="text-red-400 text-center">
              ❌ Something went wrong. Please try again later.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
