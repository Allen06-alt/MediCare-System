import { motion } from "framer-motion";
import ServiceItem from "./ServiceItem";

export default function ServicesColumn({ data, align }) {
  return (
    <motion.div 
  
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2, // Ovvoru item-ukkum 0.2s gap irukkum
          },
        },
      }}
      className="space-y-12 md:space-y-16"
    >
      {data.map((s, i) => (
        <ServiceItem
          key={i}
          title={s.title}
          desc={s.desc}
          align={align}
     
          iconType={s.iconType} 
        />
      ))}
    </motion.div>
  );
}