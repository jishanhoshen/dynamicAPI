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
  const [fieldList, setFieldList] = useState(0);

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
      setFieldList(Object.keys(res.data).length);
      console.log(res.data);
      if (res.data) {
        setJson(res.data)
        return res.data;
      }
    })
      .catch(function (error) {

      });
  }

  useEffect(() => {
    dataApi()
  }, [])



  const onClickHandler = () => {
    setFieldList(fieldList + 1);
  };

  return (
    <>
      <div className='main-area'>
        <div className='left-side'>
          <a href="/">Home 🏠</a>
          <br />
          <a href={location.pathname.slice(5)}>Back ⬅️</a>
          <h2>Update Api</h2>
          <input type="text" placeholder='object name' value={location.pathname.slice(6)} name='object_name' onChange={e => setUrl(e.target.value)} />
          <br />
          <br />
          <button onClick={onClickHandler}>Add new Field</button>
          <br />
          <br />
          <form onChange={onChangeHandler} onSubmit={onSubmitHandler}>
            {
              json ?
                Object.keys(json).map((key, index) => {
                  return (
                    <div key={index} >
                      <input type="text" placeholder={index + ".0"} value={key} name="key" data-name='xyz'></input>{" => "}
                      <input type="text" placeholder={index + ".1"} value={json[key]} name="value"></input>
                      <br />
                      <br />
                    </div>)
                })
                : null
            }
            {/* {Array.from(Array(fieldList)).map((c, index) => {
              return (
                <div key={index} >
                  <input type="text" placeholder={index + ".0"} name="key" data-name='xyz'></input>{" => "}
                  <input type="text" placeholder={index + ".1"} name="value"></input>
                  <br />
                  <br />
                </div>)
            })} */}
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

export default EditApi
