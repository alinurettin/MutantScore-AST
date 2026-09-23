// MutantScore-AST: AST Mutation Testing Engine
class MutationEngine {
  /**
   * Generates syntactic mutants for a target code snippet
   */
  static generateMutants(sourceCode) {
    const lines = sourceCode.split('\n');
    const mutants = [];
    let mutantId = 1;

    // Operator substitution maps
    const AOR = { '+': '-', '-': '+', '*': '/', '/': '*' };
    const ROR = { '===': '!==', '!==': '===', '>=': '<', '<=': '>', '>': '<=', '<': '>=' };
    const LCR = { '&&': '||', '||': '&&' };

    lines.forEach((line, lineIdx) => {
      // 1. Relational Operator Replacement (ROR)
      for (const [op, replacement] of Object.entries(ROR)) {
        if (line.includes(op)) {
          const mutatedLine = line.replace(op, replacement);
          mutants.push({
            id: 'MUT-' + String(mutantId++).padStart(3, '0'),
            type: 'ROR (Relational Operator Replacement)',
            line: lineIdx + 1,
            original: line.trim(),
            mutated: mutatedLine.trim(),
            status: 'UNTESTED'
          });
          break;
        }
      }

      // 2. Arithmetic Operator Replacement (AOR)
      for (const [op, replacement] of Object.entries(AOR)) {
        const target = ' ' + op + ' ';
        if (line.includes(target)) {
          const mutatedLine = line.replace(target, ' ' + replacement + ' ');
          mutants.push({
            id: 'MUT-' + String(mutantId++).padStart(3, '0'),
            type: 'AOR (Arithmetic Operator Replacement)',
            line: lineIdx + 1,
            original: line.trim(),
            mutated: mutatedLine.trim(),
            status: 'UNTESTED'
          });
        }
      }

      // 3. Logical Connector Replacement (LCR)
      for (const [op, replacement] of Object.entries(LCR)) {
        if (line.includes(op)) {
          const mutatedLine = line.replace(op, replacement);
          mutants.push({
            id: 'MUT-' + String(mutantId++).padStart(3, '0'),
            type: 'LCR (Logical Connector Replacement)',
            line: lineIdx + 1,
            original: line.trim(),
            mutated: mutatedLine.trim(),
            status: 'UNTESTED'
          });
        }
      }
    });

    return mutants;
  }

  /**
   * Evaluate mutants against simulated or actual test assertions
   */
  static evaluateMutants(mutants, testRunnerFn) {
    let killed = 0;
    let survived = 0;

    const evaluated = mutants.map(m => {
      const isKilled = testRunnerFn(m);
      if (isKilled) {
        killed++;
        return { ...m, status: 'KILLED' };
      } else {
        survived++;
        return { ...m, status: 'SURVIVED' };
      }
    });

    const total = mutants.length;
    const score = total === 0 ? 100.0 : parseFloat(((killed / total) * 100).toFixed(2));

    return {
      totalMutants: total,
      killedMutants: killed,
      survivedMutants: survived,
      mutationScorePercent: score,
      verdict: score >= 80.0 ? 'HIGH_TEST_QUALITY' : 'WEAK_TEST_COVERAGE',
      mutants: evaluated
    };
  }
}

module.exports = MutationEngine;