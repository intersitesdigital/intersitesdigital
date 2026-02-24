import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { services } from '@shared/constants/services.js';

const ServicesSection = () => {
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
            Our Advantages
          </h2>
          <p className="text-xl text-brand-muted dark:text-dark-muted max-w-2xl mx-auto">
            Discover the key advantages that make Intersites Digital the premier choice for web development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-brand-primary dark:text-dark-text">
                  {service.title}
                </h3>
                <p className="text-brand-muted dark:text-dark-muted mb-4 flex-grow">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-brand-accent mr-2">✓</span>
                      <span className="text-sm text-brand-muted dark:text-dark-muted">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/services"
                  className="text-brand-accent hover:text-brand-accentHover font-semibold transition-colors"
                >
                  Learn More →
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
