import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import Button from '../ui/Button';
import { BRAND } from '@shared/branding/constants.js';

const CTASection = () => {
  return (
    <section className="section-padding bg-gradient-hero text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get Your Web Development Quote
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Ready to transform your business with expert web development? Let's discuss your project and create something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-gray-300 mb-2">Get a response within 24 hours</p>
            <a
              href={`mailto:${BRAND.email}`}
              className="text-brand-accent hover:underline"
            >
              {BRAND.email}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-gray-300 mb-2">Mon-Fri from 9am to 6pm IST</p>
            <a
              href={`tel:${BRAND.phone}`}
              className="text-brand-accent hover:underline"
            >
              {BRAND.phone}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            <p className="text-gray-300 mb-2">Based in India</p>
            <p className="text-brand-accent">Remote & On-site</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-6 text-center">Why Choose Intersites Digital?</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                'Free consultation & project estimation',
                'Dedicated project manager',
                'Agile development methodology',
                'Post-launch support & maintenance',
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="text-center">
              <Link to="/contact">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block px-10 py-4 text-lg font-bold rounded-lg bg-white text-blue-700 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer select-none"
                >
                  Get Started Today
                </motion.span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;