import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "lucide-react";

const FormCard = ({ title = "SAMPLE", children }: any) => {
  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-[800px]">
      <h2 className="text-xl font-bold text-blue-500 mb-4">{title}</h2>
      {children}
    </div>
  );
};

const ModalForm = ({ children, isVisible, onClose, title }: any) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-900 rounded-lg p-8 border border-gray-800 max-w-lg w-full relative shadow-lg"
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
              onClick={onClose}
            >
              <XIcon size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4 text-blue-500">{title}</h2>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ActionSection = ({ children }: any) => {
  return (
    <div className="flex items-center justify-end">
      <div className="flex flex-row space-x-2">{children}</div>
    </div>
  );
};

export { FormCard, ActionSection, ModalForm };
