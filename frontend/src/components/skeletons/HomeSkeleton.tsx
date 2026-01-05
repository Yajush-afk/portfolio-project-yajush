import { Skeleton } from "@/components/ui/Skeleton";

export default function HomeSkeleton() {
    return (
        <section className="min-h-screen flex flex-col justify-center pt-0 pb-24 relative">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
                <div className="flex-1 space-y-6 text-center md:text-left w-full">
                    <Skeleton className="h-12 md:h-16 w-3/4 mx-auto md:mx-0" />
                    <Skeleton className="h-6 md:h-8 w-1/2 mx-auto md:mx-0" />
                    <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                        <Skeleton className="h-12 w-32 rounded-lg" />
                        <Skeleton className="h-12 w-32 rounded-lg" />
                        <Skeleton className="h-12 w-32 rounded-lg" />
                        <Skeleton className="h-12 w-32 rounded-lg" />
                    </div>
                </div>

                <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                    <Skeleton className="w-full h-full rounded-full md:rounded-2xl" />
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="md:col-span-2 p-6 border border-border/40 rounded-2xl">
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-4 w-32 mt-4" />
                </div>
                <div className="p-6 border border-border/40 rounded-2xl flex flex-col items-center justify-center gap-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-32" />
                </div>
            </div>
        </section>
    );
}
