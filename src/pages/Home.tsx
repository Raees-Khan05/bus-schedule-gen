import React from 'react';
import { motion } from 'framer-motion';
import { Bus, Calendar, Share2, Download } from 'lucide-react';
import { NeonButton } from '../components/ui/NeonButton';
import { GlassCard } from '../components/ui/GlassCard';

interface HomeProps {
    onStart: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-4xl w-full space-y-8 md:space-y-12 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 mb-4 backdrop-blur-sm">
                        <Bus className="w-8 h-8 text-primary mr-3" />
                        <span className="text-xl font-bold tracking-wide">BUS SCHEDULE PRO</span>
                    </div>

                    <h1 className="text-4xl md:text-7xl font-display font-bold leading-tight">
                        Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-glow">VIP Schedules</span>
                        <br className="hidden md:block" /> in Seconds
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                        The ultimate tool for bus owners. Generate beautiful, high-definition schedule images for your daily routes. Perfect for WhatsApp & Facebook.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <NeonButton size="lg" onClick={onStart} className="mx-auto min-w-[200px] group">
                        Create Schedule
                        <Calendar className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </NeonButton>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pt-8 md:pt-12 pb-10 pt-1"
                >
                    <FeatureCard
                        icon={<Calendar className="w-6 h-6 text-primary" />}
                        title="Daily Schedules"
                        description="Easily input your daily routes, times, and bus numbers."
                    />
                    <FeatureCard
                        icon={<Download className="w-6 h-6 text-secondary" />}
                        title="HD Export"
                        description="Download crystal clear PNGs ready for social media."
                    />
                    <FeatureCard
                        icon={<Share2 className="w-6 h-6 text-accent " />}
                        title="Instant Share"
                        description="One-click sharing to your favorite platforms."
                    />
                </motion.div>
            </div>

            <footer className="absolute bottom-6 text-gray-500 text-sm z-20">
                Build with ❤️ by Raees Awan
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <GlassCard hoverEffect className="text-left space-y-3 p-5">
        <div className="p-3 rounded-xl bg-white/5 w-fit border border-white/10">
            {icon}
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
    </GlassCard>
);

export default Home;
