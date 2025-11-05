import clsx from "clsx";
import React from "react";

// --- Queste definizioni di tipo sono CORRETTE e non cambiano ---
type BoundedOwnProps<E extends React.ElementType> = {
  as?: E;
  className?: string;
  children: React.ReactNode;
};

type BoundedProps<E extends React.ElementType> = BoundedOwnProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof BoundedOwnProps<E>>;
// --- Fine delle definizioni di tipo ---

export const Bounded = <E extends React.ElementType = "section">({
  as,
  className,
  children,
  ...restProps
}: BoundedProps<E>) => {
  
  // ✅ LA CORREZIONE È QUI
  // Assegnando 'any', diciamo a TypeScript:
  // "Fidati di me, so cosa sto facendo. Questo componente accetterà
  // le props e i children che gli sto passando."
  const Comp: any = as || "section";

  return (
    <Comp
      className={clsx("px-4 first:pt-10 md:px-6", className)}
      {...restProps}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        {/* Questo {children} ora non darà problemi, 
            perché l'errore era sul genitore <Comp> */}
        {children}
      </div>
    </Comp>
  );
};