import { Shield, BookOpen, HelpCircle } from "lucide-react";

export const footerModalData = {
  privacy: {
    title: "Privacy Policy",
    icon: Shield,
    desc: "Our commitment to safeguarding your visual assets.",
    text: `At KaviosPx, we take your visual privacy seriously. This Policy outlines how your metadata, album descriptions, and assets are handled inside our secure hosting framework:

1. Data Ownership: You retain 100% ownership, copyright, and distribution rights of all images loaded into KaviosPx. We do not use your creative files to train external models.
2. Direct Local Persistence: All operations run in a zero-leak sandboxed architecture. Changes are committed dynamically to your container or local cache, keeping your workspace private.
3. Access Control: For shared albums, permissions are controlled strictly by you. Collaborators are authenticated seamlessly to view or update metadata under your direct invitation.`,
  },
  terms: {
    title: "Terms of Service",
    icon: BookOpen,
    desc: "Workspace standards and collaborative responsibilities.",
    text: `Welcome to KaviosPx. By establishing a creative workspace, you agree to these clear, professional guidelines:

1. Acceptable Use: Use this space to curate beautiful imagery, manage team boards, and share visual assets. Please refrain from storing malicious payloads or violating copyright laws.
2. Multi-User Collaboration: Shared album administrators assume full liability for invitees and collaborators. Exercise diligence when provisioning external update links.
3. Service SLA: KaviosPx operates on a high-availability cloud cluster. Workspace metrics and configurations are subject to automated system snapshots.`,
  },
  help: {
    title: "Help Center",
    icon: HelpCircle,
    desc: "Master the KaviosPx editorial platform.",
    text: `Need assistance or looking to optimize your asset workflow? Explore our quick references below:

• Adding Photos: Open any album card and click "Add images" to upload files.
• Collaborative Sharing: Toggle the "Group" action on any album card. Add collaborator email to visualize collective curate boards.
`,
  },
} as const;

export type FooterModalType = keyof typeof footerModalData;
