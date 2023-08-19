import {useState, useEffect} from 'react';

import {readEngine} from '@/engine/engine';
import {TEngine, TRequest} from '@/engine/types.ts';
import {useAppDispatch} from '@/store/hooks.ts';
import {
  setEngine,
  setRequests as setReq,
} from '@/store/graphSlice/graphStore.ts';

export const defaultEngine: TEngine = {
  tree: {
    nodes: [],
    links: [],
  },
  hooks: [],
  history: [],
  broken: [],
  signalHooks: [],
};

export default function useEngine() {
  const dispatch = useAppDispatch();
  const [fileContent, setFileContent] = useState('');
  const [requests, setRequests] = useState<TRequest[]>([]);

  useEffect(() => {
    if (fileContent) {
      try {
        dispatch(setEngine(readEngine(fileContent)));
      } catch (e) {
        console.log(e);
      }
    }
  }, [fileContent]);

  useEffect(() => {
    dispatch(setReq(requests));
  }, [requests]);

  return {
    setFileContent,
    setRequests,
  };
}
