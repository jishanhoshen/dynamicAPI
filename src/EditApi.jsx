import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function EditApi() {
  const [urlError, setUrlError] = useState(false);
  const [json, setJson] = useState();
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setJson(e.target.value)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(json);
    updateApi(json);
  }

  async function updateApi(data) {
    // console.log(data);
    const res = await axios.post("https://api.ongsho.com/api/testapi/edit/" + location.pathname.slice(6), { "json": data }).then(function (res) {
      // console.log(res);
      if (res.data.status) {
        navigate(location.pathname.slice(5));
      }
    })
      .catch(function (error) {
        // console.log(error);
        // console.log(error.response.data.error.url);
        if (error.response.data.error.url) {
          setUrlError(true);
        }
      });
  }

  async function dataApi() {
    const res = await axios.get("https://api.ongsho.com/api/testapi" + location.pathname.slice(5)).then(function (res) {
      // console.log(res);
      setJson(res.data);
      return res.data;
    })
      .catch(function (error) {

      });
  }

  useEffect(() => {
    dataApi();
  }, []);

  return (
    <>
      <div className='main-area'>
        <div className='left-side'>
          <a href="/">Home 🏠</a>
          <br />
          <a href={location.pathname.slice(5)}>Back ⬅️</a>
          <h2>Update Api</h2>
          <form onChange={onChangeHandler} onSubmit={onSubmitHandler}>
            <input type="text" name="url" placeholder='URL' value={location.pathname.slice(6)} disabled />
            {urlError ? <span className='error'> The url has already been taken.</span> : null}
            <br />
            <br />
            <textarea name="json" placeholder='json' value={json} onChange={onChangeHandler} autoFocus></textarea>
            <br />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </>
  )
}

export default EditApi
