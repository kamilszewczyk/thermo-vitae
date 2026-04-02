import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import path from 'node:path';

const root = process.cwd();
console.log('Keystatic reader root:', root);

export const reader = createReader(root, config);