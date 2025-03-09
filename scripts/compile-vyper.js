import { exec } from 'child_process';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';

async function compileVyper() {
  try {
    // Ensure the contracts directory exists
    const outputDir = 'src/contracts';
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    exec('vyper contracts/Token.vy', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        return;
      }
      
      const bytecode = stdout;
      const abi = JSON.parse(stderr);
      
      const artifact = {
        abi,
        bytecode
      };
      
      writeFileSync('src/contracts/Token.json', JSON.stringify(artifact, null, 2));
      console.log('Contract compiled successfully!');
    });
  } catch (error) {
    console.error('Failed to compile contract:', error);
  }
}

compileVyper();