export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-cream/80 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        {/* Simple spinning/pulsing loader using brand colors */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-brand-orange/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-brand-orange rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-4 text-brand-charcoal/70 font-sans tracking-widest uppercase text-sm font-bold animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
