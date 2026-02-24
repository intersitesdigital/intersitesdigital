import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const ProcessSection = () => {
  const buildToWin = [
    'Strategic planning & architecture',
    'Scalable & maintainable codebase',
    'Performance-first optimization',
    'Enterprise-grade security',
    'Comprehensive testing & QA',
    'Long-term support & evolution',
  ];

  const buildToRush = [
    'Rushed implementation without planning',
    'Limited scalability and flexibility',
    'Poor performance optimization',
    'Security vulnerabilities',
    'High long-term maintenance costs',
    'Technical debt accumulation',
  ];

  return (
    <section className="section-padding bg-brand-bg dark:bg-dark-card">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-primary dark:text-dark-text">
            Development Philosophy
          </h2>
          <p className="text-xl text-brand-muted dark:text-dark-muted max-w-2xl mx-auto">
            Quality Over Speed
          </p>
          <p className="text-lg text-brand-muted dark:text-dark-muted mt-4 max-w-3xl mx-auto">
            We believe in building digital solutions that last, not just solutions that launch fast.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Build to Win */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card border-2 border-brand-accent"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-brand-primary dark:text-dark-text">
                Build to Win
              </h3>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold">
                Recommended
              </span>
            </div>
            <p className="text-brand-muted dark:text-dark-muted mb-6">
              Strategic, sustainable, and growth-focused development
            </p>
            <ul className="space-y-3 mb-6">
              {buildToWin.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-brand-text dark:text-dark-text">{item}</span>
                </li>
              ))}
            </ul>
            <div className="text-sm font-semibold text-green-600 dark:text-green-400">
              Sustainable success
            </div>
          </motion.div>

          {/* Build to Rush */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card border-2 border-gray-300 dark:border-dark-muted opacity-75"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-brand-primary dark:text-dark-text">
                Build to Rush
              </h3>
            </div>
            <p className="text-brand-muted dark:text-dark-muted mb-6">
              Quick, cheap, and risky development
            </p>
            <ul className="space-y-3 mb-6">
              {buildToRush.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0">✗</span>
                  <span className="text-brand-text dark:text-dark-text line-through">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <div className="text-sm font-semibold text-red-600 dark:text-red-400">
              Short-term thinking
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
