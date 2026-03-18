import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFDF0] text-black selection:bg-black selection:text-white font-sans p-4 md:p-8 lg:p-12">
      {/* Container */}
      <div className="max-w-5xl mx-auto space-y-12 md:space-y-20">
        
        {/* Navigation / Header */}
        <nav className="flex items-center justify-between py-4 border-b-4 border-black">
          <div className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
            Eunhee J.
          </div>
          <a 
            href="#contact" 
            className="px-4 py-2 bg-[#FF90E8] border-2 border-black font-bold uppercase hover:translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0_0_#000] hover:shadow-none transition-all"
          >
            Say Hi!
          </a>
        </nav>

        {/* Hero Section */}
        <section className="py-10 md:py-20 flex flex-col items-start gap-6 relative">
          <div className="inline-block px-4 py-2 bg-[#FFC900] border-4 border-black shadow-[6px_6px_0_0_#000] rotate-[-2deg]">
            <span className="font-bold text-lg md:text-xl">UX / UI / VIBE CODER</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tighter mt-4">
            Creating<br/>
            <span className="text-white text-stroke-black relative inline-block pb-2" style={{ WebkitTextStroke: '3px black' }}>
              Badass
            </span><br/>
            Digital<br/>
            Experiences
          </h1>
          <p className="mt-6 md:mt-10 text-xl md:text-3xl font-bold max-w-2xl leading-snug border-l-8 border-black pl-4">
            안녕하세요! 저는 코드로 놀기를 좋아하는 개발자 장은희입니다.
            뻔한 디자인보다는, 강렬하고 기억에 남는 웹 경험을 만드는데 집중합니다.
          </p>
        </section>

        {/* Skills Section */}
        <section className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 border-b-4 border-black inline-block pb-2">
            My Toolkit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Skill Card 1 */}
            <div className="bg-[#B9FF66] border-4 border-black p-8 shadow-[8px_8px_0_0_#000] hover:-translate-y-2 hover:translate-x-2 transition-transform">
              <h3 className="text-2xl font-black uppercase mb-4">Frontend</h3>
              <ul className="space-y-2 font-bold text-lg">
                <li className="flex items-center gap-2"><span className="w-3 h-3 bg-black rounded-full block"></span> React & Next.js</li>
                <li className="flex items-center gap-2"><span className="w-3 h-3 bg-black rounded-full block"></span> Tailwind CSS</li>
                <li className="flex items-center gap-2"><span className="w-3 h-3 bg-black rounded-full block"></span> TypeScript</li>
              </ul>
            </div>
            {/* Skill Card 2 */}
            <div className="bg-[#90E0EF] border-4 border-black p-8 shadow-[8px_8px_0_0_#000] hover:-translate-y-2 hover:translate-x-2 transition-transform">
              <h3 className="text-2xl font-black uppercase mb-4">Design</h3>
              <ul className="space-y-2 font-bold text-lg">
                <li className="flex items-center gap-2"><span className="w-3 h-3 bg-black rounded-full block"></span> Figma</li>
                <li className="flex items-center gap-2"><span className="w-3 h-3 bg-black rounded-full block"></span> UI/UX Prototyping</li>
                <li className="flex items-center gap-2"><span className="w-3 h-3 bg-black rounded-full block"></span> Wireframing</li>
              </ul>
            </div>
            {/* Skill Card 3 */}
            <div className="bg-[#FF90E8] border-4 border-black p-8 shadow-[8px_8px_0_0_#000] hover:-translate-y-2 hover:translate-x-2 transition-transform">
              <h3 className="text-2xl font-black uppercase mb-4">Other Vibe</h3>
              <ul className="space-y-2 font-bold text-lg">
                <li className="flex items-center gap-2"><span className="w-3 h-3 bg-black rounded-full block"></span> AI Prompting</li>
                <li className="flex items-center gap-2"><span className="w-3 h-3 bg-black rounded-full block"></span> Git / GitHub</li>
                <li className="flex items-center gap-2"><span className="w-3 h-3 bg-black rounded-full block"></span> Vercel Deployment</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 border-b-4 border-black inline-block pb-2">
            Selected Work
          </h2>
          <div className="flex flex-col gap-8">
            {/* Project 1 */}
            <div className="flex flex-col md:flex-row border-4 border-black shadow-[10px_10px_0_0_#000] bg-white group hover:shadow-[15px_15px_0_0_#000] transition-all">
              <div className="w-full md:w-2/5 p-8 bg-[#FFC900] border-b-4 md:border-b-0 md:border-r-4 border-black flex flex-col justify-center">
                <h3 className="text-3xl font-black">Neobrutalism UI Kit</h3>
                <p className="mt-2 font-bold text-lg">Open Source</p>
              </div>
              <div className="w-full md:w-3/5 p-8 flex flex-col justify-between items-start gap-4">
                <p className="text-xl font-medium leading-relaxed">
                  디자이너와 개발자를 위한 Neobrutalism 스타일 CSS 프레임워크와 React 컴포넌트 세트를 구축했습니다. 누적 다운로드 10k를 기록했습니다.
                </p>
                <button className="px-6 py-3 bg-white border-4 border-black font-black uppercase hover:bg-black hover:text-white transition-colors">
                  View Case Study →
                </button>
              </div>
            </div>

            {/* Project 2 */}
            <div className="flex flex-col md:flex-row border-4 border-black shadow-[10px_10px_0_0_#000] bg-white group hover:shadow-[15px_15px_0_0_#000] transition-all">
              <div className="w-full md:w-2/5 p-8 bg-[#B9FF66] border-b-4 md:border-b-0 md:border-r-4 border-black flex flex-col justify-center">
                <h3 className="text-3xl font-black">Vibe Player</h3>
                <p className="mt-2 font-bold text-lg">Personal Project</p>
              </div>
              <div className="w-full md:w-3/5 p-8 flex flex-col justify-between items-start gap-4">
                <p className="text-xl font-medium leading-relaxed">
                  사용자의 감정에 맞춰 음악을 파싱하고 시각적인 이퀄라이저를 네오브루탈리즘 스타일로 구현한 웹 애플리케이션입니다.
                </p>
                <button className="px-6 py-3 bg-white border-4 border-black font-black uppercase hover:bg-black hover:text-white transition-colors">
                  View Demo →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section & Footer */}
        <section id="contact" className="py-20">
          <div className="bg-[#90E0EF] border-4 border-black p-10 md:p-20 text-center shadow-[16px_16px_0_0_#000]">
            <h2 className="text-5xl md:text-7xl font-black uppercase mb-6 leading-tight">
              Ready to make<br/>something wild?
            </h2>
            <p className="text-2xl font-bold mb-10">
              흥미로운 아이디어가 있다면 언제든 연락주세요.
            </p>
            <a 
              href="mailto:hello@example.com" 
              className="inline-block px-8 py-4 bg-[#FF90E8] border-4 border-black text-2xl font-black uppercase hover:translate-y-2 hover:-translate-x-2 shadow-[8px_8px_0_0_#000] hover:shadow-none transition-all"
            >
              Let's Talk
            </a>
          </div>
        </section>

        <footer className="py-8 text-center border-t-4 border-black font-bold">
          <p>© {new Date().getFullYear()} EUNHEE J. All rights reserved.</p>
          <p className="mt-2 text-sm italic">Built with Next.js, Tailwind CSS & pure vibe.</p>
        </footer>

      </div>
    </div>
  );
}
