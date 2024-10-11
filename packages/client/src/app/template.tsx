"use client";

import { motion } from "framer-motion";

import { DefaultLayout } from "@/components/layouts/default-layout";
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <DefaultLayout>
      <motion.div
        layout={true}
        className={"w-full h-full flex flex-col flex-auto"}
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
      >
        {children}
      </motion.div>
    </DefaultLayout>
  );
}
