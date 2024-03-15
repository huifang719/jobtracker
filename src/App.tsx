/* eslint-disable react-hooks/exhaustive-deps */
import PageHeader from "./components/inc/PageHeader";
import "./App.css";
import { FieldValues } from "react-hook-form";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listingJob, reset } from "./features/jobSlice";
import JobBoard from "./components/JobBoard";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import { Routes, Route, useNavigate } from "react-router-dom";
import { removeUser, setUser } from "./features/userSlice";
import { setSavedJob } from "./features/savedJobList";

const App: React.FC = (): JSX.Element => {
  const loggedInEmail = useSelector((state: any) => state.user.value.email);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logIn = async (data: FieldValues) => {
    const response = await fetch(
      "https://jobtracker-typescript.onrender.com/api/sessions",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    ).then((res) => res.json());

    if (response.error) return setErrorMessage(response.error);
    await dispatch(setUser({ email: response }));
    await setErrorMessage(null);
    await navigate("/");
  };

  const getSavedJobList = async () => {
    if (!loggedInEmail) return dispatch(reset());

    const response = await fetch(
      `https://jobtracker-typescript.onrender.com/api/save/${loggedInEmail}`
    ).then((res) => res.json());

    if (response.error) return console.log(response.error);

    return await dispatch(setSavedJob(response));
  };

  useEffect(() => {
    getSavedJobList();
    checkSession();
  }, [loggedInEmail]);

  const checkSession = async () => {
    const response = await fetch(
      "https://jobtracker-typescript.onrender.com/api/sessions"
    ).then((res) => res.json());

    if (response.error) return console.log(response.error);

    return await dispatch(setUser({ email: response }));
  };

  const signUp = async (data: FieldValues) => {
    const response = await fetch(
      "https://jobtracker-typescript.onrender.com/api/users",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    ).then((res) => res.json());

    if (response.error) return setErrorMessage(response.error);
    await setErrorMessage(null);
    await navigate("/login");
  };

  const logOut = async () => {
    const response = await fetch(
      "https://jobtracker-typescript.onrender.com/api/sessions",
      {
        method: "DELETE",
      }
    ).then((res) => res.json());

    if (!response.error) return dispatch(removeUser({ email: null }));
  };
  const handleSearch = async (data: FieldValues) => {
    if (!loggedInEmail) {
      navigate("/login");
      return setErrorMessage("Please login first");
    }

    dispatch(reset());

    const api_key = await fetch(
      "https://jobtracker-typescript.onrender.com/api/search"
    ).then((res) => res.json());

    const { title, location } = data;
    const response = await fetch(
      `https://api.adzuna.com/v1/api/jobs/au/search/1?app_id=6fe66bca&app_key=${api_key}&title_only=${title}&where=${location}`
    ).then((res) => res.json());
    if (response.error) return console.log("miao");

    await response.results.forEach((job: any) => {
      const { title, location, description, redirect_url, company } = job;
      dispatch(
        listingJob({
          title: title,
          location: location["display_name"],
          description: description,
          url: redirect_url,
          company: company["display_name"],
        })
      );
    });
    await navigate("/jobboard");
  };

  return (
    <div className="App">
      <header className="App-header me-0">
        <PageHeader logOut={logOut} handleSearch={handleSearch} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={<SignUp signUp={signUp} errorMessage={errorMessage} />}
          />
          <Route
            path="/login"
            element={<LogIn logIn={logIn} errorMessage={errorMessage} />}
          />
          <Route path="/jobboard" element={<JobBoard />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
