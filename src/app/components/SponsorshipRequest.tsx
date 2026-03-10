import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "motion/react";
import { Send, Building2, Mail, Users, FileText } from "lucide-react";

type FormData = {
  organization: string;
  email: string;
  type: string;
  message: string;
};

export const SponsorshipRequest = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    toast.success("Request received! Our team will contact you shortly.");
    reset();
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-black py-16 text-white sm:py-20 lg:py-24"
    >
      {/* Background Elements */}
      <div className="pointer-events-none absolute right-0 top-0 h-[260px] w-[260px] rounded-full bg-red-900/10 blur-[90px] sm:h-[500px] sm:w-[500px] sm:blur-[120px]"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-[260px] w-[260px] rounded-full bg-blue-900/10 blur-[90px] sm:h-[500px] sm:w-[500px] sm:blur-[120px]"></div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-10 text-center sm:mb-16">
          <h2 className="mb-4 text-3xl font-orbitron font-bold uppercase sm:text-4xl md:text-5xl">
            Join the <span className="text-red-600">Circuit</span>
          </h2>
          <p className="font-poppins text-sm text-gray-400 sm:text-base">
            Ready to accelerate your brand? Submit a sponsorship request.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-white/10 bg-zinc-900/50 p-5 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-md sm:p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Organization */}
            <div className="relative group">
              <label className="block text-xs font-orbitron uppercase tracking-wider text-gray-500 mb-2">
                Organization Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                <input
                  {...register("organization", { required: true })}
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-red-500 transition-colors font-poppins placeholder-gray-700"
                  placeholder="Quantum Racing Ltd."
                />
              </div>
              {errors.organization && (
                <span className="text-red-500 text-xs mt-1">Required</span>
              )}
            </div>

            {/* Email */}
            <div className="relative group">
              <label className="block text-xs font-orbitron uppercase tracking-wider text-gray-500 mb-2">
                Contact Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-red-500 transition-colors font-poppins placeholder-gray-700"
                  placeholder="contact@quantum.com"
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">
                  Valid email required
                </span>
              )}
            </div>

            {/* Type */}
            <div className="relative group md:col-span-2">
              <label className="block text-xs font-orbitron uppercase tracking-wider text-gray-500 mb-2">
                Sponsorship Type
              </label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                <select
                  {...register("type", { required: true })}
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-red-500 transition-colors font-poppins appearance-none cursor-pointer"
                >
                  <option value="" className="text-gray-500">
                    Select Tier...
                  </option>
                  <option value="title" className="bg-zinc-900">
                    Title Sponsor (Exclusive)
                  </option>
                  <option value="platinum" className="bg-zinc-900">
                    Platinum Partner
                  </option>
                  <option value="gold" className="bg-zinc-900">
                    Gold Partner
                  </option>
                  <option value="technical" className="bg-zinc-900">
                    Technical Supplier
                  </option>
                </select>
              </div>
              {errors.type && (
                <span className="text-red-500 text-xs mt-1">Required</span>
              )}
            </div>

            {/* Message */}
            <div className="relative group md:col-span-2">
              <label className="block text-xs font-orbitron uppercase tracking-wider text-gray-500 mb-2">
                Message
              </label>
              <div className="relative">
                <FileText className="absolute left-4 top-6 w-5 h-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                <textarea
                  {...register("message")}
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-red-500 transition-colors font-poppins h-32 resize-none placeholder-gray-700"
                  placeholder="Tell us about your brand and goals..."
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden bg-red-600 py-3 text-base font-bold uppercase tracking-[0.22em] text-white transition-all hover:bg-red-700 active:scale-[0.99] sm:py-4 sm:text-lg sm:tracking-widest"
            style={{ clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0% 100%)" }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Submit Request{" "}
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-white/20 skew-x-[-20deg] transition-transform duration-500"></div>
          </button>
        </motion.form>
      </div>
    </section>
  );
};
