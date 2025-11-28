import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, HTMLMotionProps } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface NeonButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

export function NeonButton({
    children,
    className,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    ...props
}: NeonButtonProps) {

    const variants = {
        primary: "bg-primary text-black font-bold hover:shadow-neon-blue hover:bg-cyan-400 border-transparent",
        secondary: "bg-secondary text-white font-bold hover:shadow-neon-purple hover:bg-violet-400 border-transparent",
        outline: "bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white/40"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={cn(
                "relative rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border",
                variants[variant],
                sizes[size],
                fullWidth && "w-full",
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
}
