import { motion } from 'framer-motion';

const PageWrapper = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="page-wrapper"
            style={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <div className="page-container">
                {children}
            </div>
        </motion.div>
    );
};

export default PageWrapper;
