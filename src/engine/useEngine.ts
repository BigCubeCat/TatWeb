import {useState, useEffect} from 'react';

import {readEngine} from '@/engine/engine';
import {TEngine, TRequest} from '@/engine/types.ts';
import {useAppDispatch, useAppSelector} from '@/store/hooks.ts';
import {
  setEngine,
  setRequests as setReq,
} from '@/store/graphSlice/graphStore.ts';
import {selectConfigStore} from '@/store/confSlice/configStore.ts';

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

type TStatus = 'waiting' | 'ok' | 'invalid engine' | 'invalid requests';

export default function useEngine() {
  const dispatch = useAppDispatch();
  const config = useAppSelector(selectConfigStore);
  const [status, setStatus] = useState<TStatus>('waiting');

  useEffect(() => {
    if (config.topologyFileContent) {
      try {
        dispatch(setEngine(readEngine(config.topologyFileContent)));
        setStatus('ok');
      } catch (e) {
        console.log(e);
        setStatus('invalid engine');
      }
    }
  }, [config.topologyFileContent]);

  useEffect(() => {
    try {
      const requests: TRequest[] = JSON.parse(config.requestsFileContent);
      dispatch(setReq(requests));
    } catch (e) {
      console.log(e);
      setStatus('invalid requests');
    }
  }, [config.requestsFileContent]);

  return {
    status,
  };
}
