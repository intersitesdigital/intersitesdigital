import { motion } from 'framer-motion';
import Card from '../ui/Card';

const testimonials = [
  {
    quote: "Intersites Digital completely transformed our outdated website into a modern, high-performing platform. Our conversion rates increased by 40% within the first month. Exceptional work!",
    author: "John Doe",
    role: "Founder & CEO",
    company: "Tech Startup Inc.",
  },
  {
    quote: "The team's expertise in both design and development is remarkable. They understood our brand vision perfectly and delivered beyond our expectations. Highly professional service.",
    author: "Jane Smith",
    role: "Digital Marketing Head",
    company: "Creative Agency",
  },
  {
    quote: "Working with Intersites Digital was a game-changer for our product launch. They built a seamless e-commerce platform that our customers love. The attention to detail is impressive.",
    author: "Mike Johnson",
    role: "Product Manager",
    company: "E-Commerce Solutions",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-white dark:bg-dark-bg">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-primary dark:text-dark-text">
            What Our Clients Say
          </h2>
          <p className="text-xl text-brand-muted dark:text-dark-muted max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients about their experience working with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-brand-text dark:text-dark-text mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-semibold text-brand-primary dark:text-dark-text">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-brand-muted dark:text-dark-muted">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
