import React from 'react';

export default function TheShift() {
  return (
    <section className="pt-24 lg:pt-32 pb-0 bg-[#FAFAFC]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              The <span className="text-emerald-500 italic">Shift</span>
            </h2>
          </div>
          <div className="lg:pt-2">
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
              When fragmented factory operations became easier to see, teams could spend less time finding answers and more time acting on them. Hispan gave them a clearer view of performance, faster awareness of issues, and greater confidence in everyday decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
