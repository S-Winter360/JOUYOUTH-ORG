export default function About() {
  return (
    <div className="pt-32 pb-20 container mx-auto px-4 max-w-4xl text-center min-h-[70vh]">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6">About <span className="text-[#a855f7]">Joyouth</span></h1>
      <p className="text-xl text-text-muted leading-relaxed mb-10">
        Empowering Youth, Transforming Communities. Joyouth is a forward-thinking non-profit 
        organization founded by Akanzagisi Norbert (Norlin). Our goal is to equip young 
        people with the skills, mindset, and networks needed to thrive in the modern world.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8 text-left mt-16">
        <div className="glass-card p-8">
          <h3 className="text-2xl font-bold text-[#6366f1] mb-4">Our Mission</h3>
          <p className="text-text-muted">To create inclusive ecosystems of innovation where youth from all backgrounds can discover their potential, develop technical and leadership skills, and drive meaningful community development.</p>
        </div>
        <div className="glass-card p-8">
          <h3 className="text-2xl font-bold text-[#a855f7] mb-4">Our Vision</h3>
          <p className="text-text-muted">A world where every young person has the resources, mentorship, and opportunity to become a changemaker in their own community and beyond.</p>
        </div>
      </div>
    </div>
  );
}
