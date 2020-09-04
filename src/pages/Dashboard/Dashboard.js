import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import ModalView from '../../components/Modal';
import { CopyToClipboard } from "react-copy-to-clipboard";

const path =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://poc-veronica-app.web.app';

export const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);

  const handleSubmit = (value, callBack) => {
    firebase.firestore().collection("clients").add(value).then(function () {
      callBack()
      setModalShow(false)
    })
  }

  function onNext(DocumentSnap) {
    const wrapper = [];
    DocumentSnap.forEach((doc) => {
      const data = doc.data();
      wrapper.push({ ...data, id: doc.id });
    });
    setCustomers(wrapper);
    setLoading(false);
  }

  function onError(error) {
    console.log(error);
  }

  useEffect(() => {
    firebase.firestore().collection('clients').onSnapshot(onNext, onError);
  }, []);

  if (loading) {
    return (
      <div>
        <span>Loding.........</span>
      </div>
    );
  }

  return (
    <div>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th className="text-justify" scope="col">Nombre</th>
            <th scope="col">Compañia</th>
            <th scope="col">Fecha</th>
            <th scope="col">Procentaje</th>
            <th scope="col">Acción</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 && (
            customers.map(custome => {
              return (
                <tr>
                  <td>{custome.name}</td>
                  <td>{custome.company}</td>
                  <td>{custome.date}</td>
                  <td>{custome.percentaje}%</td>
                  <td className="text-center">
                    <button type="button" className="btn btn-warning mr-2">
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        className="bi bi-pencil-square"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                    </button>
                    <button type="button" className="btn btn-danger mr-2">
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        className="bi bi-trash"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fillRule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </button>
                    <CopyToClipboard
                      text={`${path}/${custome.id}`}
                      onCopy={() => console.log("copied")}
                    >
                      <button type="button" className="btn btn-light">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="bi bi-clipboard"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            fillRule="evenodd"
                            d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
                          />
                          <path
                            fillRule="evenodd"
                            d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
                          />
                        </svg>
                      </button>
                    </CopyToClipboard>

                  </td>
                </tr>
              )
            })
          )
          }
        </tbody>
      </table>
      <div className="d-flex flex-row-reverse bd-highlight mr-5">
        <button type="button" className="btn btn-outline-primary" onClick={() => setModalShow(true)}>Crear</button>
      </div>

      <ModalView
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
