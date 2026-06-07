"use client";

interface IWantToOption {
  _id: string;
  label: string;
  href: string;
}

export function IWantToKnow({ options }: { options: IWantToOption[] }) {
  return (
    <section className="py-8 bg-crop-gray">
      <div className="max-w-4xl mx-auto px-4">
        <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => { e.preventDefault(); }}>
          <select
            className="flex-1 px-4 py-3.5 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-crop-green focus:border-transparent"
            onChange={(e) => { if (e.target.value) window.location.href = e.target.value; }}
            defaultValue=""
          >
            <option value="" disabled>I would like to know...</option>
            {options.map((o) => (
              <option key={o._id} value={o.href}>{o.label}</option>
            ))}
          </select>
          <button type="submit" className="bg-crop-green text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-crop-green-dark transition-colors">Get Advice</button>
        </form>
      </div>
    </section>
  );
}
