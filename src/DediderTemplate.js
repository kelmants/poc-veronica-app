import React from "react";
import { useParams } from "react-router-dom";
import * as firebase from "firebase";
import { upperFirst } from "lodash";
import { Sofia } from "./templates/Sofia";
import { Aurora } from "./templates/Aurora";

export function DeciderTemplate() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({});
  const { hash } = useParams();

  const templates = React.useMemo(
    () => ({
      Sofia: <Sofia name={data?.name} />,
      Aurora: <Aurora name={data?.name} />,
      DefaultTemplate: (
        <div>
          <span>Nothing here</span>
        </div>
      ),
    }),
    [data]
  );

  const typeTemplate = upperFirst(data.template);
  console.log(typeTemplate, hash);

  const retrieveData = async () => {
    try {
      setLoading(true);
      const Document = await firebase
        .firestore()
        .collection("projects")
        .doc(hash)
        .get();
      if (Document.exists) {
        const response = { ...Document.data(), uuid: Document.id };
        setData(response);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    retrieveData();
  }, []);

  if (loading)
    return (
      <div>
        <span>Loadin........</span>
      </div>
    );

  console.log("data", data);
  return templates[typeTemplate] || templates.DefaultTemplate;
}
