import React from 'react';
import Slider from 'react-slick';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
  {
    id: 1,
    name: "Alex 'The Flash' Mercer",
    role: "Season 1 Champion",
    quote: "The intensity of the competition is unmatched. Every millisecond counts, and the platform delivers pure speed.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1711356026974-d233a588e365?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBkcml2ZXIlMjBoZWxtZXQlMjBwb3J0cmFpdCUyMGRhcmt8ZW58MXx8fHwxNzcxNDE3NzA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    name: "Sarah 'Vortex' Chen",
    role: "Pro Sim Racer",
    quote: "Incredible physics and track fidelity. It feels just like being in the cockpit of a real F1 car.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1763805508094-901f2a79ff77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJib24lMjBmaWJlciUyMHRleHR1cmUlMjBkYXJrfGVufDF8fHx8MTc3MTM4Mjc2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" // Placeholder
  },
  {
    id: 3,
    name: "Marcus 'Drift' Johnson",
    role: "Team Principal, Redline",
    quote: "We scout our best talent here. The ranking system is fair, competitive, and brutal in the best way.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1760456015398-c0119ffb0593?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmMSUyMHJhY2luZyUyMGNhciUyMHNwZWVkaW5nfGVufDF8fHx8MTc3MTQxNzcxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" // Placeholder
  }
];

export const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    customPaging: (i: number) => (
      <div className="w-2 h-2 bg-white/20 rounded-full mt-4 hover:bg-red-600 transition-colors"></div>
    )
  };

  return (
    <section className="py-24 relative overflow-hidden bg-zinc-900">
      {/* Blurred Background */}
      <div 
        className="absolute inset-0 z-0 blur-sm opacity-30 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1686426781747-7cd27a8e05a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwcmFjZSUyMHRyYWNrJTIwbmlnaHQlMjBsaWdodHN8ZW58MXx8fHwxNzcxNDE3NzA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')" }}
      ></div>
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-16 uppercase">
            Racer <span className="text-red-600">Voices</span>
        </h2>
        
        <Slider {...settings} className="testimonial-slider">
            {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="outline-none px-4">
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-2xl relative">
                        <Quote className="absolute top-8 left-8 w-12 h-12 text-red-600/20" />
                        
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-red-600 mb-4 shadow-[0_0_15px_rgba(255,0,0,0.4)]">
                                <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-2xl font-orbitron font-bold text-white">{testimonial.name}</h3>
                            <p className="text-red-500 font-poppins text-sm uppercase tracking-widest">{testimonial.role}</p>
                        </div>

                        <p className="text-gray-300 font-poppins text-lg italic leading-relaxed mb-6">
                            "{testimonial.quote}"
                        </p>

                        <div className="flex justify-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star 
                                    key={i} 
                                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`} 
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
      </div>
    </section>
  );
};
