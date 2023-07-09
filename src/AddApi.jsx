import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddApi() {
  const [url, setUrl] = useState()
  const [urlError, setUrlError] = useState(false);
  // const [formValue, setFormValue] = useState({ url: '', json: '' });
  const [formValue, setFormValue] = useState();
  const navigate = useNavigate();
  const [fieldList, setFieldList] = useState(0);
  const [json, setJson] = useState()

  const onChangeHandler = (e) => {
    // setFormValue({ ...formValue, [e.target.name]: e.target.value })
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
    console.log(formValue);
    const sizeOfForm = (array) => {
      let size = 0
      for (let key in array) {
        if (array.hasOwnProperty(key)) {
          size++
        }
      }
      return size
    }

    console.log("size:" + sizeOfForm(formValue));
    let Field = 0;

    Object.keys(formValue).map(key => {

      Field++
    })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let myKey = [];
    let myValue = [];
    console.log(e.target.length);
    for (let i = 0; i < e.target.length; i++) {
      const element = e.target[i];
      if (element.getAttribute('name') == "key") {
        myKey.push(element.value);
      }

      if (element.getAttribute('name') == "value") {
        myValue.push(element.value);
      }
    }
    console.log(myKey);
    console.log(myValue);
    let a = 0;
    let data = [];
    myKey.forEach((d) => {
      {
        myKey[a] : myValue[a]
      }

      data.push({ ${d} : myValue[a] });
      a++;
    })
    console.log(data);
  }

  async function addNewUrl(data) {
    console.log(data);
    const res = await axios.post("https://api.ongsho.com/api/testapi", { "url": data.url, "json": data.json }).then(function (res) {
      // console.log(res);
      if (res.data.status) {
        navigate(location.pathname.slice(5));
      }
    })
      .catch(function (error) {
        console.log(error);
        console.log(error.response.data.error.url);
        if (error.response.data.error.url) {
          setUrlError(true);
        }
      });
  }

  function InputField() {
    return (
      <>
        <div>
          <input type="text" placeholder='name' />{"=>"}
          <input type="text" placeholder='value' />
        </div>
      </>
    )
  }

  const onClickHandler = () => {
    setFieldList(fieldList + 1);
  };

  return (
    <>
      <div className='main-area'>
        <div className='left-side'>
          <a href="/">Home</a>
          <h2>Add New Api</h2>
          {/* <form onChange={onChangeHandler} onSubmit={onSubmitHandler}>
            <input type="text" name="url" placeholder='URL' autoFocus />
            {urlError ? <span className='error'> The url has already been taken.</span> : null}
            <br />
            <br />
            <textarea name="json" placeholder='json' ></textarea>
            <br />
            <br />
            <input type="submit" value="Submit" />
          </form> */}
          <input type="text" placeholder='object name' onChange={e => setJson(e.target.value)} />
          <br />
          <br />
          <button onClick={onClickHandler}>Add new Field</button>
          <br />
          <br />
          <form onChange={onChangeHandler} onSubmit={onSubmitHandler}>
            {Array.from(Array(fieldList)).map((c, index) => {
              return (
                <div key={index} >
                  <input type="text" placeholder={index + ".0"} name="key" data-name='xyz'></input>{" => "}
                  <input type="text" placeholder={index + ".1"} name="value"></input>
                  <br />
                  <br />
                </div>)
            })}
            <button onClick={() => setFieldList(fieldList - 1)} type='button'>remove</button>
            <br />
            <br />
            <button >Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddApi
