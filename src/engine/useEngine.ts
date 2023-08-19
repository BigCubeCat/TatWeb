import { useState, useEffect } from 'react';

import { readEngine, updateEngine, } from '@/engine/engine';
import { TEngine, THook, TRequest } from '@/engine/types.ts';

interface IProps {
  hooks: THook[],
}

const defaultEngine: TEngine = {
  tree: {
    nodes: [], links: [],
  },
  hooks: [], history: [], broken: []
};

export default function useEngine(props: IProps) {
  const [engine, setEngine] = useState<TEngine>(defaultEngine);
  const [fileContent, setFileContent] = useState('');
  const [requests, setRequests] = useState<TRequest[]>([]);

  useEffect(() => {
    if (fileContent) {
      try {
        setEngine(readEngine(fileContent));
      } catch (e) {
        console.log(e);
      }
    }

  }, [fileContent]);

  useEffect(() => {
    engine.hooks = props.hooks;
  }, [engine, props.hooks]);

  useEffect(() => {
    requests.forEach(request => {
      updateEngine(engine, request);
    })
  }, [engine, requests]);

  return {
    engine,
    setFileContent,
    setRequests
  };
}
