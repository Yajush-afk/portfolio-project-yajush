import { Skeleton } from "@/components/ui/Skeleton";

export default function AchievementsSkeleton() {
    return (
        <section className="min-h-screen flex flex-col justify-center py-20">
            <div className="space-y-4 mb-16 text-center flex flex-col items-center">
                <Skeleton className="h-10 w-48" />
            </div>

            <div className="space-y-20">
                <div className="space-y-8">
                    <div className="flex items-center justify-center gap-4">
                        <Skeleton className="h-px w-24" />
                        <Skeleton className="h-8 w-40" />
                        <Skeleton className="h-px w-24" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-full max-w-sm h-full border border-border/40 rounded-xl overflow-hidden">
                                <Skeleton className="h-48 w-full" />
                                <div className="p-5 space-y-3">
                                    <div className="flex justify-between">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                    <Skeleton className="h-6 w-full" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
