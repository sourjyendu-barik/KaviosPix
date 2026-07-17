import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { type FooterModalType, footerModalData } from "../data/footerData";
export default function Footer() {
  const [activeModal, setActiveModal] = useState<FooterModalType | null>(null);
  const modal = activeModal ? footerModalData[activeModal] : null;
  const Icon = modal?.icon;

  return (
    <>
      <footer className="glass-nav border-t border-[#e2e2e4] w-full py-10 mt-16">
        <div className="flex flex-col md:flex-row items-center justify-between px-6 max-w-[1200px] mx-auto gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-left">
            <span className="font-sans font-black text-lg tracking-tighter text-[#1d1d1f]">
              KaviosPx
            </span>
            <span className="text-xs text-[#86868b]">
              © {new Date().getFullYear()} KaviosPx. All Rights Reserved.
              Crafted for precision curating.
            </span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-semibold text-[#86868b]">
            <button
              onClick={() => setActiveModal("privacy")}
              className="hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveModal("terms")}
              className="hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => setActiveModal("help")}
              className="hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              Help Center
            </button>
          </div>
        </div>
      </footer>

      {/* Modal Dialog for Legal/Help */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 border border-[#e2e2e4] overflow-hidden flex flex-col max-h-[90vh] z-10"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-full transition-all"
              >
                <X size={18} />
              </button>

              <div className="flex gap-4 items-start pb-4 border-b border-[#e2e2e4]">
                <div className="p-3 bg-neutral-100 rounded-xl shrink-0">
                  {Icon && <Icon size={32} className="text-[#0066cc]" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1d1d1f]">
                    {modal!.title}
                  </h3>
                  <p className="text-xs text-[#86868b] mt-0.5">{modal!.desc}</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-4 text-sm text-neutral-600 space-y-4 leading-relaxed font-sans whitespace-pre-line">
                {modal!.text}
              </div>

              <div className="pt-4 border-t border-[#e2e2e4] flex justify-end">
                <button
                  onClick={() => setActiveModal(null)}
                  className="bg-[#1d1d1f] hover:bg-[#2d2d2f] text-white px-5 py-2 rounded-lg text-xs font-bold transition-all"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
