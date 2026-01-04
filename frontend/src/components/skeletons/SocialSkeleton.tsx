import { Skeleton } from "@/components/ui/Skeleton";

export default function SocialSkeleton() {
    return (
        <section className="min-h-screen flex flex-col justify-center py-20">
            <div className="space-y-4 mb-16">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-6 w-96 max-w-full" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="p-6 rounded-2xl border border-border/40 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <Skeleton className="h-16 w-16 rounded-xl" />
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-6 w-32" />
                                    <Skeleton className="h-5 w-20 rounded-full" />
                                </div>
                                <Skeleton className="h-4 w-48" />
                            </div>
                        </div>
                        <Skeleton className="h-6 w-6 rounded-full" />
                    </div>
                ))}
            </div>
        </section>
    );
}
