import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1600px] px-5 sm:px-6 lg:px-6 xl:px-8 2xl:px-10 ${className}`}>
      {children}
    </div>
  );
}
