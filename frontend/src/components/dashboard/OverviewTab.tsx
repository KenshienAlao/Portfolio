// "use client";

// import { Layers, GraduationCap, Wrench, Inbox, FileText } from "lucide-react";
// import { SKILLS as INITIAL_SKILLS } from "@/config/skills";
// import { PROJECTS as INITIAL_PROJECTS } from "@/config/projects";
// import { EDUCATION as INITIAL_EDUCATION } from "@/config/education";

// interface Message {
//   id: string;
//   name: string;
//   email: string;
//   subject: string;
//   message: string;
//   date: string;
// }

// const INITIAL_MESSAGES: Message[] = [
//   {
//     id: "msg-1",
//     name: "John Doe",
//     email: "john@example.com",
//     subject: "Collaboration Query",
//     message:
//       "Hey Kenshien! I loved your BareSway project. Would love to collaborate on some Wayland client tools.",
//     date: "2026-08-01 14:32",
//   },
//   {
//     id: "msg-2",
//     name: "Alice Smith",
//     email: "alice@company.dev",
//     subject: "Job Opportunity",
//     message:
//       "Hi, we are looking for a fullstack developer with Spring Boot and Next.js experience. Your portfolio looks impressive!",
//     date: "2026-07-31 09:15",
//   },
// ];

// interface OverviewTabProps {
//   setActiveTab?: (tab: any) => void;
// }

// export function OverviewTab({ setActiveTab }: OverviewTabProps) {
//   const projectsCount = INITIAL_PROJECTS.length;
//   const educationCount = INITIAL_EDUCATION.length;
//   const skills = INITIAL_SKILLS;
//   const messages = INITIAL_MESSAGES;
//   const stats = [
//     {
//       label: "Projects",
//       val: projectsCount,
//       icon: Layers,
//       color: "bg-accent/10 text-accent",
//     },
//     {
//       label: "Education Items",
//       val: educationCount,
//       icon: GraduationCap,
//       color: "bg-accent/10 text-accent",
//     },
//     {
//       label: "Total Skills",
//       val: Object.values(skills).flat().length,
//       icon: Wrench,
//       color: "bg-accent/10 text-accent",
//     },
//     {
//       label: "Feedback Inbox",
//       val: messages.length,
//       icon: Inbox,
//       color: "bg-destructive/10 text-destructive",
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         {stats.map((stat, i) => (
//           <div
//             key={i}
//             className="rounded-2xl border border-border bg-surface p-5 flex items-center justify-between"
//           >
//             <div>
//               <div className="text-2xl font-extrabold text-text-primary font-mono">
//                 {stat.val}
//               </div>
//               <p className="font-mono text-[10px] uppercase tracking-widest text-text-secondary mt-1">
//                 {stat.label}
//               </p>
//             </div>
//             <div className={`p-3 rounded-xl ${stat.color}`}>
//               <stat.icon className="h-5 w-5" />
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grid gap-6 md:grid-cols-3">
//         <div className="md:col-span-2 rounded-2xl border border-border bg-surface p-6">
//           <h3 className="font-mono text-base font-bold text-text-primary mb-4 flex items-center gap-2">
//             <FileText className="h-4 w-4 text-accent" /> Recent Messages
//           </h3>
//           {messages.length === 0 ? (
//             <p className="text-sm font-mono text-text-secondary py-4">
//               No recent messages.
//             </p>
//           ) : (
//             <div className="space-y-4">
//               {messages.slice(0, 3).map((msg) => (
//                 <div
//                   key={msg.id}
//                   className="p-4 rounded-xl border border-border bg-background flex flex-col gap-1"
//                 >
//                   <div className="flex justify-between items-start">
//                     <span className="font-semibold text-sm text-text-primary">
//                       {msg.name} ({msg.email})
//                     </span>
//                     <span className="font-mono text-[10px] text-text-secondary">
//                       {msg.date}
//                     </span>
//                   </div>
//                   <span className="font-mono text-xs text-accent font-medium">
//                     {msg.subject}
//                   </span>
//                   <p className="text-xs text-text-secondary mt-1 line-clamp-2">
//                     {msg.message}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="rounded-2xl border border-border bg-surface p-6 flex flex-col justify-between">
//           <div>
//             <h3 className="font-mono text-base font-bold text-text-primary mb-2">
//               System Status
//             </h3>
//             <div className="font-mono text-xs text-text-secondary space-y-2 mt-4">
//               <div className="flex justify-between">
//                 <span>Environment:</span>
//                 <span className="text-accent">Production (Mock)</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Framework:</span>
//                 <span>Next.js 16</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>CSS Engine:</span>
//                 <span>Tailwind v4</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>UI Library:</span>
//                 <span>Shadcn/custom</span>
//               </div>
//             </div>
//           </div>
//           <div className="border-t border-border pt-4 mt-6">
//             <button
//               onClick={() => setActiveTab?.("messages")}
//               className="w-full text-center py-2.5 rounded-lg border border-border text-xs font-semibold hover:border-accent hover:text-accent font-mono transition-colors"
//             >
//               Go to Inbox &rarr;
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
