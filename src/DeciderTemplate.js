import React from 'react';
import { useParams } from 'react-router-dom';
import * as firebase from 'firebase';
import { upperFirst } from 'lodash';
import { Sofia } from './templates/Sofia';
import { Aurora } from './templates/Aurora';

export function DeciderTemplate() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({});
  const { hash } = useParams();

  const handleAccept = React.useCallback(async () => {
    console.log('enter acceptance');
    try {
      await firebase
        .firestore()
        .collection('clients')
        .doc(hash)
        .update({ status: true });

      console.log('Propuesta aceptada con exito');
    } catch (error) {
      console.log(error);
    }
  }, []);

  const templates = React.useMemo(
    () => ({
      Sofia: (
        <Sofia
          name={data?.name}
          accepted={data?.status}
          onAccept={handleAccept}
        />
      ),
      Aurora: (
        <Aurora
          name={data?.name}
          accepted={data?.status}
          onAccept={handleAccept}
        />
      ),
      DefaultTemplate: (
        <div>
          <span>Nothing here</span>
        </div>
      ),
    }),
    [data]
  );

  const typeTemplate = upperFirst(data.template);
  function onNext(DocumentSnap) {
    const document = { ...DocumentSnap.data(), uuid: DocumentSnap.id };
    console.log(document);
    setData(document);
    setLoading(false);
  }

  function onError(error) {
    console.log(error);
  }

  React.useEffect(() => {
    firebase
      .firestore()
      .collection('clients')
      .doc(hash)
      .onSnapshot(onNext, onError);
  }, []);

  if (loading)
    return (
      <div>
        <span>Loadin........</span>
      </div>
    );

  console.log('data', data);
  return templates[typeTemplate] || templates.DefaultTemplate;
}
