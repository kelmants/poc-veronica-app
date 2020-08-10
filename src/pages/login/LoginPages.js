import React from "react";
import "./styles.css";
import { useHistory } from "react-router-dom";
import * as firebase from "firebase";
import { isEmpty } from "lodash";
export function LoginPages() {
  const history = useHistory();

  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    email: "admin@test.com",
    password: 1234567,
  });

  const onChangeUser = React.useCallback(
    (user) => {
      console.log(user);
      if (!user) {
        history.replace("/dashboard");
      }
    },
    [history]
  );

  React.useEffect(() => {
    const suscribe = firebase.auth().onAuthStateChanged(onChangeUser);
    return suscribe();
  }, [onChangeUser]);

  const handleChange = (event) => {
    const { target } = event;
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  };
  const handleLogin = async (event) => {
    console.log("Quiero cuca con olor a saca punta ");
    event.preventDefault();

    const { email, password } = form;
    setLoading(true);
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password.toString());
      setForm({});
      history.replace("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="bg">
      <div className="container">
        <div className="row box">
          <div className="col-md-offset-5 col-md-4 col-xs-10 col-xs-offset-0 text-center">
            <h1 className="text-white">Varonica's consulting</h1>
            <div className="form-login">
              <br />
              <h4>Secure Login</h4>
              <br />
              <form onSubmit={handleLogin}>
                <input
                  value={form?.email}
                  type="email"
                  id="email"
                  className="form-control input-sm chat-input"
                  placeholder="Email"
                  onChange={handleChange}
                />
                <br />
                <input
                  type="password"
                  id="password"
                  value={form?.password}
                  className="form-control input-sm chat-input"
                  placeholder="password"
                  onChange={handleChange}
                />
                <br />
                <div className="wrapper">
                  <span className="group-btn">
                    <button className="btn btn-primary btn-md" type="submit">
                      {loading ? (
                        <span>Loading..</span>
                      ) : (
                        <span>
                          login <i className="fa fa-sign-in"></i>
                        </span>
                      )}
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    </main>
  );
}
