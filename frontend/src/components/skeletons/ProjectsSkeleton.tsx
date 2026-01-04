import { Skeleton } from "@/components/ui/Skeleton";

export default function ProjectsSkeleton() {
    return (
        <section className="min-h-screen flex flex-col justify-center py-20">
            <div className="space-y-4 mb-10">
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-6 w-96 max-w-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="border border-border/40 rounded-xl overflow-hidden flex flex-col">
                        <Skeleton className="h-48 w-full" />
                        <div className="p-6 space-y-4 flex-1 flex flex-col">
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-7 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                            <div className="flex gap-2 pt-4">
                                <Skeleton className="h-6 w-16 rounded-md" />
                                <Skeleton className="h-6 w-16 rounded-md" />
                                <Skeleton className="h-6 w-16 rounded-md" />
                            </div>
                            <div className="flex gap-4 pt-4 border-t border-border/40">
                                <Skeleton className="h-5 w-20" />
                                <Skeleton className="h-5 w-24" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
