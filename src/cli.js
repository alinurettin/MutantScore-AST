#!/usr/bin/env node
const MutationEngine = require('./mutation_engine');

console.log('MutantScore-AST: Mutation Testing CLI');
const sample = 'function calc(a, b) { if (a > b) return a + b; return a - b; }';
const mutants = MutationEngine.generateMutants(sample);
console.log('Generated mutants:', mutants);
