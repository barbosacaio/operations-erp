import type { Config } from 'jest';
import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

const config: Config = {
    testEnvironment: 'node',
    testTimeout: 30000,
    clearMocks: true,
    verbose: true,
    transform: {
        ...tsJestTransformCfg,
    },
};

export default config;