import { forwardRef } from 'react';
import { Clock, Phone, Calendar as CalendarIcon } from 'lucide-react';

export interface BusRoute {
    id: string;
    busNumber: string;
    route: string;
    time: string;
    price?: string;
    driver?: string;
    contact?: string;
}

export interface ScheduleData {
    companyName: string;
    date: string;
    buses: BusRoute[];
}

interface SchedulePreviewProps {
    data: ScheduleData;
}

export const SchedulePreview = forwardRef<HTMLDivElement, SchedulePreviewProps>(({ data }, ref) => {
    const hasPrice = data.buses.some(bus => bus.price);
    const hasContact = data.buses.some(bus => bus.contact);
    const showExtraColumn = hasPrice || hasContact;

    return (
        <div ref={ref} className="bg-slate-950 p-8 rounded-none w-[800px] min-h-[1120px] text-white relative overflow-hidden flex flex-col font-sans">

            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500" />
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-500/5 rounded-full blur-[120px]" />

            {/* Header */}
            <div className="text-center space-y-6 mb-10 relative z-10 pt-8">
                <div className="relative inline-block">
                    <h1 className="text-5xl font-display font-bold uppercase tracking-widest text-white drop-shadow-sm">
                        {data.companyName || "Company Name"}
                    </h1>
                </div>

                <div className="flex items-center justify-center gap-3 text-primary/80 uppercase tracking-[0.2em] text-lg font-medium">
                    <CalendarIcon className="w-5 h-5" />
                    <p>
                        {data.date
                            ? new Date(data.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
                            : "Select Date"}
                    </p>
                </div>
            </div>

            {/* Table Container */}
            <div className="flex-1 relative z-10 mx-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-2xl">

                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-8 py-5 bg-white/5 border-b border-white/10 text-primary font-bold text-sm uppercase tracking-wider">
                        <div className="col-span-2 flex justify-center text-center">Bus No</div>

                        <div className={`${showExtraColumn ? 'col-span-4' : 'col-span-7'} flex justify-center text-center`}>
                            Route
                        </div>

                        <div className="col-span-3 flex justify-center text-center">
                            Timing
                        </div>

                        {showExtraColumn && (
                            <div className="col-span-3 flex justify-center text-center">
                                Details
                            </div>
                        )}
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-white/5">
                        {data.buses.length === 0 ? (
                            <div className="text-center py-24 text-gray-500 text-xl font-light italic">
                                No buses scheduled yet...
                            </div>
                        ) : (
                            data.buses.map((bus) => (
                                <div
                                    key={bus.id}
                                    className="grid grid-cols-12 gap-4 px-8 py-6 items-center hover:bg-white/[0.02] transition-colors"
                                >
                                    {/* Bus No */}
                                    <div className="col-span-2 flex justify-center text-center">
                                        <span className="text-xl font-display font-bold text-white">
                                            {bus.busNumber}
                                        </span>
                                    </div>

                                    {/* Route */}
                                    <div className={`${showExtraColumn ? 'col-span-4' : 'col-span-7'} flex justify-center text-center text-lg text-gray-300 font-medium font-display`}>
                                        {bus.route}
                                    </div>

                                    {/* Timing */}
                                    <div className="col-span-3 flex justify-center text-center">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary font-bold text-sm">
                                            <Clock className="w-5 h-5" />
                                            {formatTime(bus.time)}
                                        </div>
                                    </div>

                                    {/* Details */}
                                    {showExtraColumn && (
                                        <div className="col-span-3 flex flex-col justify-center items-center text-center space-y-1">
                                            {bus.price && (
                                                <div className="text-xl font-display font-bold text-emerald-400">
                                                    {bus.price}
                                                </div>
                                            )}

                                            {bus.contact && (
                                                <div className="flex items-center justify-center gap-2 text-sm text-gray-400 font-medium">
                                                    <Phone className="w-3 h-3" /> {bus.contact}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-8 pb-4 px-8 flex justify-between items-end relative z-10 opacity-60">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">Generated by</p>
                    <p className="text-sm font-bold text-white tracking-wide">Bus Schedule PRO</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Total Buses: {data.buses.length}</p>
                </div>
            </div>
        </div>
    );
});

// Helper for AM/PM
const formatTime = (timeStr: string) => {
    if (!timeStr) return "--:--";
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours, 10);
    if (isNaN(h)) return timeStr;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
};

SchedulePreview.displayName = "SchedulePreview";
