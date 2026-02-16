import React from "react";
import Image from "next/image";
export default function ProRightSide() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const infos = [
    {
      Picture: ["/images/POS_JAVA.png"],
      herf: "https://github.com/Cartooninw/POSProject-JAVASWING",
      companys: ["Java Swing"],
      positions: ["Point of Sale Project"],
      explainations: [
        "Developed a Point of Sale (POS) system using Object-Oriented Programming (OOP) principles, with a desktop user interface built using Java Swing in NetBeans. Designed the system architecture to support scalability and maintainability.",
      ],
      stacks: ["Java", "Java Swing"],
    },
    {
      Picture: ["/images/ChatJAVA.png"],
      herf: "https://github.com/Cartooninw/Simple-Chat_JavaSwing_Socket",
      companys: ["Java Swing"],
      positions: ["Simple Chat "],
      explainations: [
        "Developed a Java Swing client–server chat application supporting real-time messaging and reliable image transfer via Socket connections (java.net) using a structured packet-based protocol.",
      ],
      stacks: ["Java", "Java Swing", "Socket", "java.net"],
    },
    {
      Picture: ["/images/PosPHP.png"],
      herf: "https://github.com/Cartooninw/Booking-project_-PHP",
      companys: ["PHP"],
      positions: ["Booking Project"],
      explainations: [
        "Built a PHP + MySQL booking system end-to-end, designing the relational database, implementing secure authentication (password hashing + session-based authorization), adding availability checks and booking management, and developing an admin dashboard with full CRUD.",
      ],
      stacks: ["PHP", "MYSQL"],
    },
    {
      Picture: ["/icons/experience.png"],
      companys: ["NuxtJS/Elysia"],
      positions: ["Ai Agent Chatbot"],
      explainations: [
        "Developed a containerized chat system with a full CRUD user-management module, REST APIs built with Elysia (Bun), authentication for access control, and an integrated AI Agent API for automated intelligent responses (Docker).",
      ],
      stacks: ["Nuxtjs", "Elysia", "MongoDB", "Docker"],
    },
    {
      Picture: ["/images/noimage.png"],
      herf: "/IImage Classification — Holy Basil vs Thai Basil (CNN).pdf",
      companys: ["tensorflow"],
      positions: ["IImage Classification — Holy Basil vs Thai Basil (CNN)"],
      explainations: [
        "Designed and trained a CNN image-classification model, including data preprocessing, hyperparameter tuning to reduce overfitting, and evaluation using accuracy-based classification metrics.",
      ],
      stacks: ["tensorflow", "AI", "AI fine-tuning"],
    },
    {
      Picture: ["/images/noimage.png"],
      herf: "/Object Detection — Cars (YOLOv5 & Roboflow) .pdf",
      companys: ["Pytorch"],
      positions: ["Object Detection — Cars (YOLOv5 & Roboflow)"],
      explainations: [
        "Built an object-detection pipeline by labeling data in Roboflow and benchmarking multiple YOLOv5 model variants through repeated training experiments and accuracy comparisons.",
      ],
      stacks: ["Pytorch", "AI", "AI fine-tuning"],
    },
  ];
  const width = typeof window === "undefined" ? 0 : window.innerWidth;

  const isMobile = width < 768;

  return (
    <div className="flex flex-col gap-4">
      {infos.map((info, index) => {
        const isActive = index + 1 === activeIndex && !isMobile;
        const isOtherActive = activeIndex !== 0 && !isActive && !isMobile;
        return (
          <article
            key={index}
            onMouseEnter={() => setActiveIndex(index + 1)}
            onFocus={() => setActiveIndex(index + 1)}
            onMouseLeave={() => setActiveIndex(0)}
            tabIndex={0}
            className={[
              "w-full max-w-3xl rounded-xl p-6 transition duration-200 outline-none  ",
              // NOT selected
              !isActive &&
              "border border-transparent bg-transparent hover:opacity-100 hover:border-white/10 hover:bg-white/5 hover:backdrop-blur",
              // SELECTED
              isActive &&
              "border-t border-white/5 bg-white/3 shadow-sm backdrop-blur",
              // SOME OTHER selected
              isOtherActive && "opacity-50",
            ].join(" ")}
          >
            <div className="grid grid-cols-12 gap-6">
              {/* Left date */}
              <div className="col-span-12 md:col-span-3 md:block flex justify-center">
                <Image src={info.Picture[0]} alt="" width={180} height={120} />
              </div>

              {/* Right content */}
              <div className="col-span-12 md:col-span-9">
                <div className="flex items-center gap-2">
                  <a
                    href={info.herf}
                    target="_blank"
                    className={[
                      "text-base font-semibold transition-colors",
                      isActive
                        ? "text-cyan-300 hover:text-cyan-200"
                        : "text-slate-200 hover:text-cyan-200",
                    ].join(" ")}
                  >
                    {info.positions} · {info.companys}
                  </a>
                  <span
                    className={[
                      "transition-colors",
                      isActive ? "text-cyan-300/80" : "text-slate-400/70",
                    ].join(" ")}
                  >
                    ↗
                  </span>
                </div>

                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300/80">
                  {info.explainations}
                </p>

                <ul className="mt-5 flex justify-center md:justify-stretch flex-wrap gap-2">
                  {info.stacks.map((tech: string, i: number) => (
                    <li key={i}>
                      <span
                        className={[
                          "inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                          isActive
                            ? "bg-cyan-400/10 text-cyan-200"
                            : "bg-white/5 text-slate-300/80",
                        ].join(" ")}
                      >
                        {tech}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
