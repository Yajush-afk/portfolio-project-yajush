import { Skeleton } from "@/components/ui/Skeleton";

export default function AboutSkeleton() {
    return (
        <section className="min-h-screen flex flex-col justify-center py-20">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                    <Skeleton className="h-10 w-48" />
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>

                    <div className="space-y-4 pt-4">
                        <Skeleton className="h-8 w-40" />
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <Skeleton key={i} className="h-8 w-24 rounded-full" />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 pt-4">
                        <Skeleton className="h-8 w-40" />
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 4].map((i) => (
                                <Skeleton key={i} className="h-8 w-24 rounded-full" />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <Skeleton className="w-full h-64 rounded-xl" />

                    <div className="p-6 rounded-xl border border-border/40 space-y-4">
                        <Skeleton className="h-8 w-48 mx-auto" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-12 w-40 mx-auto rounded-lg" />
                    </div>
                </div>
            </div>
        </section>
    );
}
