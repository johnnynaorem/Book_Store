import React from "react";

export default function Form({
  title,
  handleOnChange,
  handleOnSubmit,
  loginCre,
}) {
  return (
    <main style={{ width: "50%", margin: "auto" }}>
      <h3>{title}</h3>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            onChange={(e) => handleOnChange(e)}
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => handleOnChange(e)}
            type="password"
            name="username"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        {loginCre.email !== "" && loginCre.username !== "" ? (
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        ) : (
          <button disabled type="submit" className="btn btn-primary">
            Submit
          </button>
        )}
      </form>
    </main>
  );
}
