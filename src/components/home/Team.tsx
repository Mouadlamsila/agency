"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export default function Team() {
    const teamMembers = [
        {
            quote:
                "Leading our product vision with a focus on user-centric design and scalable solutions.",
            name: "Sarah Chen",
            designation: "Product Manager",
            src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                "Architecting robust and secure systems that power our next-generation agency services.",
            name: "Michael Rodriguez",
            designation: "CTO",
            src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                "Ensuring operational excellence and seamless delivery across all our client projects.",
            name: "Emily Watson",
            designation: "Operations Director",
            src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                "Driving technical innovation and mentoring our engineering team to new heights.",
            name: "James Kim",
            designation: "Engineering Lead",
            src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                "Strategizing our technology roadmap to keep us ahead of the curve in a rapidly evolving market.",
            name: "Lisa Thompson",
            designation: "VP of Technology",
            src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ];

    return (
        <section className="py-24 bg-brand-dark relative overflow-hidden" id="team">
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-brand-blue/20 to-transparent" />
            <div className="container px-4 mx-auto mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-linear-to-b from-white to-white/60">
                    Meet the Team
                </h2>
                <p className="mt-4 text-center text-gray-400 max-w-2xl mx-auto">
                    The brilliant minds behind our innovative solutions.
                </p>
            </div>
            <AnimatedTestimonials testimonials={teamMembers} />
        </section>
    );
}
