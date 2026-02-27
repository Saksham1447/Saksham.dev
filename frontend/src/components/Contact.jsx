import { useState, useRef } from "react";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

// ─── API endpoint — uses Vercel serverless function ───────────────────────────
const API_URL = "/api/contact";

// ─── Inline CSS for animations (no extra deps needed) ────────────────────────
const animStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes successPop {
    0%   { transform: scale(0.8); opacity: 0; }
    60%  { transform: scale(1.05); }
    100% { transform: scale(1);   opacity: 1; }
  }
  .anim-fade-up   { animation: fadeInUp 0.45s ease both; }
  .anim-spin      { animation: spin 0.8s linear infinite; }
  .anim-pop       { animation: successPop 0.4s ease both; }
`;

// ─── Tiny validation helpers ──────────────────────────────────────────────────
const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const validateField = (name, value) => {
  if (!value.trim()) return "This field is required.";
  if (name === "name" && value.trim().length < 2)
    return "Name must be at least 2 characters.";
  if (name === "email" && !validateEmail(value))
    return "Please enter a valid email address.";
  if (name === "message" && value.trim().length < 10)
    return "Message must be at least 10 characters.";
  if (name === "message" && value.trim().length > 2000)
    return "Message must not exceed 2000 characters.";
  return "";
};

// ─── Loading Spinner ──────────────────────────────────────────────────────────
const Spinner = () => (
  <span
    className="anim-spin inline-block w-5 h-5 border-[3px] border-white border-t-transparent rounded-full"
    aria-hidden="true"
  />
);

// ─── Contact component ────────────────────────────────────────────────────────
const Contact = () => {
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus]   = useState("idle"); // idle | loading | success | error
  const [serverMsg, setServerMsg] = useState("");
  const successRef = useRef(null);

  // Mark field as touched and validate it
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error as user types (once field has been touched)
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  // Full form validation before submit
  const validateAll = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const msg = validateField(key, form[key]);
      if (msg) newErrors[key] = msg;
    });
    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    setStatus("loading");
    setServerMsg("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // Safely parse response — handle empty or non-JSON bodies
      let data = {};
      const text = await res.text();
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        // Response wasn't JSON
      }

      if (!res.ok) throw new Error(data.error || `Server error (${res.status}). Please try again.`);

      setStatus("success");
      setServerMsg(data.message || "Message sent!");
      setForm({ name: "", email: "", message: "" });
      setTouched({});
      setErrors({});

      // Scroll success message into view
      setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    } catch (err) {
      setStatus("error");
      setServerMsg(err.message || "Failed to send. Please try again.");
    }
  };

  const inputCls = (name) =>
    `bg-gray-800 text-white rounded-lg px-4 py-3 outline-none border transition
     ${
       touched[name] && errors[name]
         ? "border-red-500 focus:ring-2 focus:ring-red-500"
         : touched[name] && !errors[name]
         ? "border-green-500 focus:ring-2 focus:ring-green-500"
         : "border-transparent focus:ring-2 focus:ring-blue-500"
     }`;

  return (
    <>
      <style>{animStyles}</style>

      <section id="contact" className="py-24 bg-gray-950 text-white">
        <div className="max-w-4xl mx-auto px-4">

          {/* ── Section header ── */}
          <div className="text-center mb-14 anim-fade-up">
            <span className="inline-block text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Contact
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Let&apos;s Work Together
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Have a project in mind or just want to say hi? Fill in the form
              below — I&apos;ll get back to you within 24–48 hours.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-10 items-start">

            {/* ── Left: contact info ── */}
            <aside className="md:col-span-2 flex flex-col gap-6 anim-fade-up">
              <div className="bg-gray-900 rounded-2xl p-7 flex flex-col gap-5 shadow-lg">
                <InfoRow icon={<FaEnvelope />} label="Email" value="sakshamwayadande01@gmail.com" />
                <InfoRow icon={<FaPhone />}   label="Phone" value="+91 XXXXX XXXXX" />
                <InfoRow icon={<FaMapMarkerAlt />} label="Location" value="India" />
              </div>

              {/* Social links */}
              <div className="bg-gray-900 rounded-2xl p-7 shadow-lg">
                <p className="text-gray-400 text-sm mb-4 uppercase tracking-wide font-semibold">
                  Find me on
                </p>
                <div className="flex gap-4 text-2xl text-gray-400">
                  <SocialLink href="https://github.com/"   label="GitHub"   hoverCls="hover:text-white">
                    <FaGithub />
                  </SocialLink>
                  <SocialLink href="https://linkedin.com/" label="LinkedIn" hoverCls="hover:text-blue-400">
                    <FaLinkedin />
                  </SocialLink>
                  <SocialLink href="https://twitter.com/"  label="Twitter"  hoverCls="hover:text-sky-400">
                    <FaTwitter />
                  </SocialLink>
                </div>
              </div>
            </aside>

            {/* ── Right: form ── */}
            <div className="md:col-span-3 anim-fade-up">

              {/* Success banner */}
              {status === "success" && (
                <div
                  ref={successRef}
                  className="anim-pop mb-6 bg-green-900/40 border border-green-600/50 rounded-2xl
                             p-6 text-center flex flex-col items-center gap-3"
                >
                  <FaCheckCircle className="text-green-400 text-4xl" />
                  <p className="text-green-300 font-semibold text-lg">Message Sent!</p>
                  <p className="text-green-400/80 text-sm">{serverMsg}</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-2 text-sm text-gray-400 underline hover:text-white transition"
                  >
                    Send another message
                  </button>
                </div>
              )}

              {/* Form */}
              {status !== "success" && (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-gray-900 rounded-2xl p-8 flex flex-col gap-6 shadow-lg"
                >
                  <Field id="name" label="Your Name" error={touched.name && errors.name}>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={status === "loading"}
                      autoComplete="name"
                      className={inputCls("name")}
                    />
                  </Field>

                  <Field id="email" label="Your Email" error={touched.email && errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={status === "loading"}
                      className={inputCls("email")}
                      autoComplete="email"
                    />
                  </Field>

                  <Field id="message" label="Message" error={touched.message && errors.message}>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Tell me about your project…"
                      value={form.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={status === "loading"}
                      className={`${inputCls("message")} resize-none`}
                    />
                    <span className="text-xs text-gray-600 self-end">
                      {form.message.length}/2000
                    </span>
                  </Field>

                  {/* Server-side error */}
                  {status === "error" && (
                    <div className="anim-fade-up bg-red-900/40 border border-red-600/40 rounded-lg
                                    px-4 py-3 flex items-start gap-2 text-red-300 text-sm">
                      <FaExclamationCircle className="shrink-0 mt-0.5" />
                      <span>{serverMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500
                               disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold
                               py-3 rounded-xl transition-all duration-200 active:scale-95"
                  >
                    {status === "loading" ? (
                      <>
                        <Spinner />
                        Sending…
                      </>
                    ) : (
                      "Send Message →"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const Field = ({ id, label, children, error }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="text-sm font-medium text-gray-400">
      {label}
    </label>
    {children}
    {error && (
      <p className="text-red-400 text-xs flex items-center gap-1 mt-0.5">
        <FaExclamationCircle className="shrink-0" /> {error}
      </p>
    )}
  </div>
);

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <span className="text-blue-400 text-xl mt-0.5 shrink-0">{icon}</span>
    <div>
      <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold mb-0.5">{label}</p>
      <p className="text-gray-200 text-sm">{value}</p>
    </div>
  </div>
);

const SocialLink = ({ href, label, hoverCls, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    className={`transition-colors duration-200 ${hoverCls}`}
  >
    {children}
  </a>
);

export default Contact;