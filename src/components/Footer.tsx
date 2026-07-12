import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Shield, BookOpen, HelpCircle } from "lucide-react";

export default function Footer() {
  const [activeModal, setActiveModal] = useState<
    "privacy" | "terms" | "help" | null
  >(null);

  const modalContent = {
    privacy: {
      title: "Privacy Policy",
      icon: <Shield size={32} className="text-[#0066cc]" />,
      desc: "Our commitment to safeguarding your visual assets.",
      text: `At KaviosPx, we take your visual privacy seriously. This Policy outlines how your metadata, album descriptions, and assets are handled inside our secure hosting framework:

1. Data Ownership: You retain 100% ownership, copyright, and distribution rights of all images loaded into KaviosPx. We do not use your creative files to train external models.
2. Direct Local Persistence: All operations run in a zero-leak sandboxed architecture. Changes are committed dynamically to your container or local cache, keeping your workspace private.
3. Access Control: For shared albums, permissions are controlled strictly by you. Collaborators are authenticated seamlessly to view or update metadata under your direct invitation.`,
    },
    terms: {
      title: "Terms of Service",
      icon: <BookOpen size={32} className="text-[#0066cc]" />,
      desc: "Workspace standards and collaborative responsibilities.",
      text: `Welcome to KaviosPx. By establishing a creative workspace, you agree to these clear, professional guidelines:

1. Acceptable Use: Use this space to curate beautiful imagery, manage team boards, and share visual assets. Please refrain from storing malicious payloads or violating copyright laws.
2. Multi-User Collaboration: Shared album administrators assume full liability for invitees and collaborators. Exercise diligence when provisioning external update links.
3. Service SLA: KaviosPx operates on a high-availability cloud cluster. Workspace metrics and configurations are subject to automated system snapshots.`,
    },
    help: {
      title: "Help Center",
      icon: <HelpCircle size={32} className="text-[#0066cc]" />,
      desc: "Master the KaviosPx editorial platform.",
      text: `Need assistance or looking to optimize your asset workflow? Explore our quick references below:

• Adding Photos: Open any album card and click "Add images" to insert mock URLs or upload files.
• Collaborative Sharing: Toggle the "Group" action on any album card. Add collaborator email avatars to visualize collective curate boards.
• Global Gallery: Use the "All Photos" link in the top navigation bar to review every single photo across all albums in an immersive masonry grid.
• Editorial Palette: The interface relies on a custom Apple-inspired off-white canvas with high-contrast Inter display typography and responsive state animations.`,
    },
  };

  return (
    <>
      <footer className="bg-white border-t border-[#e2e2e4] w-full py-10 mt-16">
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
                  {modalContent[activeModal].icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1d1d1f]">
                    {modalContent[activeModal].title}
                  </h3>
                  <p className="text-xs text-[#86868b] mt-0.5">
                    {modalContent[activeModal].desc}
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-4 text-sm text-neutral-600 space-y-4 leading-relaxed font-sans whitespace-pre-line">
                {modalContent[activeModal].text}
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
