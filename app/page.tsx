import { dummyLinks, profileData } from "@/data/links";
import { Card } from "@/components/ui/card";
import { IconUser, IconArrowUpRight } from "@tabler/icons-react";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-x-hidden">
      <div className="flex w-full max-w-lg flex-col gap-10 mt-12 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Profile Section */}
        <section className="flex flex-col items-center gap-5">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white dark:bg-zinc-800 shadow-xl shadow-indigo-100/50 dark:shadow-none border border-zinc-100 dark:border-zinc-700/50">
            <IconUser className="h-10 w-10 text-zinc-400" stroke={1.5} />
          </div>
          <div className="text-center space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
              {profileData.displayName}
            </h1>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {profileData.bio}
            </p>
          </div>
        </section>

        {/* Links Section */}
        <section className="flex flex-col gap-3.5 w-full px-2">
          {dummyLinks.map((link) => {
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-xl transition-all"
              >
                <Card className="flex flex-row items-center gap-4 !p-4 transition-all duration-300 border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-md shadow-sm hover:shadow-lg hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10 hover:-translate-y-1 overflow-hidden relative">
                  {/* Subtle hover background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 dark:to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 p-1.5 ring-1 ring-zinc-200 dark:ring-zinc-700">
                    <img
                      src={`https://s2.googleusercontent.com/s2/favicons?domain=${link.url}&sz=64`}
                      alt={link.title}
                      className="h-6 w-6 rounded-sm bg-transparent"
                      width={24}
                      height={24}
                    />
                  </div>
                  <span className="relative z-10 flex-1 font-semibold text-zinc-700 dark:text-zinc-200 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {link.title}
                  </span>
                  <IconArrowUpRight 
                    className="relative z-10 h-5 w-5 text-zinc-400 transition-all duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
                    stroke={1.5}
                  />
                </Card>
              </a>
            );
          })}
        </section>
      </div>
    </main>
  );
}
