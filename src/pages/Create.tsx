import React, { useState, useRef, useCallback } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import { Plus, Trash2, Download, ArrowLeft, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NeonButton } from '../components/ui/NeonButton';
import { GlassCard } from '../components/ui/GlassCard';
import { Input } from '../components/ui/Input';
import { SchedulePreview, ScheduleData, BusRoute } from '../features/generator/SchedulePreview';

interface CreateProps {
    onBack: () => void;
}

const Create: React.FC<CreateProps> = ({ onBack }) => {
    const [data, setData] = useState<ScheduleData>({
        companyName: '',
        date: new Date().toISOString().split('T')[0],
        buses: [
            { id: '1', busNumber: '', route: '', time: '', price: '' }
        ]
    });

    const [isGenerating, setIsGenerating] = useState(false);
    const previewRef = useRef<HTMLDivElement>(null);

    const addBus = () => {
        setData(prev => ({
            ...prev,
            buses: [
                ...prev.buses,
                { id: Math.random().toString(36).substr(2, 9), busNumber: '', route: '', time: '', price: '' }
            ]
        }));
    };

    const removeBus = (id: string) => {
        setData(prev => ({
            ...prev,
            buses: prev.buses.filter(b => b.id !== id)
        }));
    };

    const updateBus = (id: string, field: keyof BusRoute, value: string) => {
        setData(prev => ({
            ...prev,
            buses: prev.buses.map(b => b.id === id ? { ...b, [field]: value } : b)
        }));
    };

    const downloadImage = useCallback(async (format: 'png' | 'jpeg') => {
        if (previewRef.current === null) return;

        setIsGenerating(true);
        try {
            const func = format === 'png' ? toPng : toJpeg;
            const dataUrl = await func(previewRef.current, { quality: 0.95, pixelRatio: 2 });

            const link = document.createElement('a');
            link.download = `schedule-${data.companyName || 'bus'}-${data.date}.${format}`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error(err);
        } finally {
            setIsGenerating(false);
        }
    }, [data]);

    return (
        <div className="min-h-screen p-4 md:p-8 flex flex-col md:flex-row gap-8 max-w-[1600px] mx-auto">
            {/* Left Panel: Controls */}
            <div className="w-full md:w-1/3 space-y-6 overflow-y-auto h-[calc(100vh-4rem)] custom-scrollbar pb-20">
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-bold">Edit Schedule</h2>
                </div>

                <GlassCard className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary">Company Details</h3>
                    <Input
                        label="Company Name"
                        placeholder="e.g. Royal Travels"
                        value={data.companyName}
                        onChange={(e) => setData({ ...data, companyName: e.target.value })}
                    />
                    <Input
                        label="Date"
                        type="date"
                        value={data.date}
                        onChange={(e) => setData({ ...data, date: e.target.value })}
                    />
                </GlassCard>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-primary">Buses ({data.buses.length})</h3>
                        <NeonButton size="sm" onClick={addBus} variant="secondary">
                            <Plus className="w-4 h-4 mr-1" /> Add Bus
                        </NeonButton>
                    </div>

                    <AnimatePresence>
                        {data.buses.map((bus) => (
                            <motion.div
                                key={bus.id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="relative"
                            >
                                <GlassCard className="space-y-3 pt-8">
                                    <button
                                        onClick={() => removeBus(bus.id)}
                                        className="absolute top-2 right-2 p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Input
                                            placeholder="Bus No."
                                            value={bus.busNumber}
                                            onChange={(e) => updateBus(bus.id, 'busNumber', e.target.value)}
                                        />
                                        <Input
                                            placeholder="Time"
                                            type="time"
                                            value={bus.time}
                                            onChange={(e) => updateBus(bus.id, 'time', e.target.value)}
                                        />
                                    </div>
                                    <Input
                                        placeholder="Route (From - To)"
                                        value={bus.route}
                                        onChange={(e) => updateBus(bus.id, 'route', e.target.value)}
                                    />
                                    <div className="grid grid-cols-2 gap-3">
                                        <Input
                                            placeholder="Price (Optional)"
                                            value={bus.price}
                                            onChange={(e) => updateBus(bus.id, 'price', e.target.value)}
                                        />
                                        <Input
                                            placeholder="Contact (Optional)"
                                            value={bus.contact}
                                            onChange={(e) => updateBus(bus.id, 'contact', e.target.value)}
                                        />
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Right Panel: Preview */}
            <div className="w-full md:w-2/3 flex flex-col items-center">
                <div className="sticky top-4 z-50 w-full flex justify-end gap-3 mb-4 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-white/10">
                    <NeonButton
                        variant="outline"
                        onClick={() => downloadImage('jpeg')}
                        disabled={isGenerating}
                    >
                        {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                        JPG
                    </NeonButton>
                    <NeonButton
                        onClick={() => downloadImage('png')}
                        disabled={isGenerating}
                    >
                        {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                        Download HD PNG
                    </NeonButton>
                </div>

                <div className="overflow-hidden w-full flex justify-center bg-black/20 p-2 md:p-8 rounded-2xl border border-white/5 shadow-inner min-h-[400px] md:min-h-[800px] relative">
                    <div className="absolute top-4 md:top-8 origin-top scale-[0.3] sm:scale-[0.45] md:scale-[0.6] lg:scale-[0.7] xl:scale-[0.85] 2xl:scale-100 transition-transform duration-500">
                        <SchedulePreview ref={previewRef} data={data} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;
