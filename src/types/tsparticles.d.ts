    // src/types/tsparticles.d.ts

    // This file provides a minimal declaration for @tsparticles/engine
    // to resolve TypeScript errors during build if types are not found automatically.
    // It asserts the module exists and re-exports its expected types.

    declare module '@tsparticles/engine' {
        export * from 'tsparticles'; // Assuming tsparticles is the source of these types
    }

    // You might also need to explicitly declare the react component if issues persist
    declare module '@tsparticles/react' {
        import * as React from 'react';
        import { IParticlesProps } from 'tsparticles-engine'; // Use the actual type path
        const Particles: React.FC<IParticlesProps & { id?: string; className?: string; }>;
        export default Particles;
    }

    declare module '@tsparticles/slim' {
        // You might need to adjust this depending on what loadSlim exports
        import { Engine } from 'tsparticles-engine';
        export function loadSlim(engine: Engine): Promise<void>;
    }

    // If 'tsparticles-engine' itself causes issues, you might need a more generic declaration
    // For now, let's assume the types are implicitly there or brought in by @tsparticles/react
    // if that's the main dependency
    