import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact Us | Happy Food",
  description: "Get in touch with Happy Food for product enquiries, partnerships, distribution opportunities and more.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-cream overflow-hidden pb-24 md:pb-32">
      <ContactHero />
      
      <section className="container mx-auto px-6 max-w-[85rem] relative z-20 mt-16 md:mt-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          <div className="lg:col-span-5 xl:col-span-4">
            <ContactInfo />
          </div>
          
          <div className="lg:col-span-7 xl:col-span-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
