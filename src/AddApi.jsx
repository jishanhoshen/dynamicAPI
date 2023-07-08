import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function AddApi() {
  const [url, setUrl] = useState()
  const [urlError, setUrlError] = useState(false);
  const [formValue, setFormValue] = useState({ url: '', json: '' });
  const onChangeHandler = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setUrl(formValue.json)
    console.log(formValue);
    addNewUrl(formValue);
  }

  async function addNewUrl(data) {
    console.log(data);
    const res = await axios.post("https://api.ongsho.com/api/testapi/"+data.url, data).then(function (res) {
      console.log(res);
    })
      .catch(function (error) {
        console.log(error);
        console.log(error.response.data.error.url);
        if (error.response.data.error.url) {
          setUrlError(true);
        }
      });
  }

  return (
    <>
      <div className='main-area'>
        <div className='left-side'>
          <form onChange={onChangeHandler} onSubmit={onSubmitHandler}>
            <input type="text" name="url" placeholder='URL' autoFocus />
            {urlError ? <span className='error'> The url has already been taken.</span> : null}
            <br />
            <br />
            <textarea name="json" placeholder='json' ></textarea>
            <br />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className='right-side'>
          <pre>{url}</pre>
        </div>
      </div>
    </>
  )
}

export default AddApi
