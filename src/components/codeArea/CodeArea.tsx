import * as esbuild from 'esbuild-wasm';
import { useEffect, useRef } from 'react';
import { useState } from 'react';

export default function CodeArea() {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const ref = useRef<any>();
  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: './esbuild.wasm',
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const handleClick = () => {
    if (!ref.current) {
      return;
    }
    console.log(ref.current);
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
}
