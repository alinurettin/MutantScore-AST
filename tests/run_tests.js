const assert = require('assert');
const MutationEngine = require('../src/mutation_engine');

console.log('Running test suite for MutantScore-AST...');

const sampleCode = `function isEligible(age, score) {
  if (age >= 18 && score > 75) {
    return score + 10;
  }
  return score - 5;
}`;

// Test 1: Generate mutants across ROR, LCR, AOR
const mutants = MutationEngine.generateMutants(sampleCode);
console.log('Mutants generated count:', mutants.length);
assert(mutants.length >= 3, 'Must generate at least 3 distinct mutants');
assert(mutants.some(m => m.type.startsWith('ROR')), 'Must generate ROR mutant');
assert(mutants.some(m => m.type.startsWith('AOR')), 'Must generate AOR mutant');

// Test 2: Evaluate mutant execution with a strict test runner
const res = MutationEngine.evaluateMutants(mutants, (m) => {
  if (m.type.startsWith('ROR') || m.type.startsWith('AOR')) return true;
  return false;
});

console.log('Mutation evaluation result:', { score: res.mutationScorePercent + '%', killed: res.killedMutants, survived: res.survivedMutants });
assert(res.killedMutants >= 2);
assert(res.mutationScorePercent > 50.0);
assert.strictEqual(res.totalMutants, res.killedMutants + res.survivedMutants);

console.log('✅ ALL TESTS PASSED (100% Assertion Rate)');
