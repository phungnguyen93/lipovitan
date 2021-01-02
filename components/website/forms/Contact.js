import From from "components/diginext/form/Form";
// import Card, { CardBody } from "components/diginext/containers/Card";
import Button from "components/website/button/Button";
import { useState, useEffect, useRef, useContext } from "react";
import asset from "plugins/assets/asset";
import { Input } from "components/website/forms/Input";
import { useRouter } from "next/router";
import Axios from "axios";
import { MainContent } from "components/website/contexts/MainContent";

import { notification } from 'antd';

export default function ContactUS({
  urlAPI
}) {

  const Language = {
    en: {
      name: "en",
      placeholder: ["Full Name","Phone","Email", "Country", "Content"],
      informSuccess: {
        title : "Success",
        message: "Send complete!",
      },
      informError: {
        title : "Error",
        message : {
          mailError : "Email invalid",
          nameError : "Please enter name!",
          phoneError : "Please enter phone!",
          phoneAndNameError : "Please enter name and phone!",
        }
      },
   
    },
    vi: {
      name: "vi",
      placeholder: ["Tên","Điện thoại","Email", "Country", "Nội dung"],
      informSuccess: {
        title : "Hoàn thành",
        message: "Gửi thành công!"
      },
      informError: {
        title : "Lỗi",
        message : {
          mailError : "Email không hợp lệ",
          nameError : "Vui lòng nhập tên!",
          phoneError : "Vui lòng nhập số điện thoại!",
          phoneAndNameError : "Vui lòng nhập tên và số điện thoại!",
        }
      },
    }
  }

  const [dataFromDefault, setDataFromDefault] = useState();

  const [heightInput, setHeightInput] = useState("50px");
  const [heightTextarea, setHeightTextarea] = useState("105px");

  const router = useRouter();

  const [fullName, setFullName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [country, setCountry] = useState();
  const [content, setContent] = useState();

  const valueLanguageContext = useContext(MainContent);

  const fromRef = useRef();

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const handleNameInput = (value) => setFullName(value);
  const handlePhoneInput = (value) => {
    // console.log(value)
    setPhone(value);
  }

  const handleEmailInput = (value) => setEmail(value);
  const handleCountryInput = (value) => setCountry(value);
  const handleContentInput = (value) => setContent(value);

  const postAPI = async (url, data, callbackFn) => {

    let config = {
      headers: {
        'X-localization': valueLanguageContext.languageCurrent,
        'Content-Type': "application/json"
      }
    }

    await Axios
      .post(`${url}`, data, config)
      .then(function (response) {
        // console.log(response);
        openNotification({ type: "success", title: `${ dataFromDefault ? dataFromDefault.informSuccess.title : ""}`,
         description: `${dataFromDefault ? dataFromDefault.informSuccess.message : ""}` })
        // router.reload("/contact-us");
        reset();
      })
      .catch(function (error) {
        openNotification({ type: "warning", title: `${dataFromDefault ? dataFromDefault.informError.title : ""}`,
         description: `${dataFromDefault ? dataFromDefault.informError.message.mailError : ""}` })
        // console.log(error);
      });
  }

  const openNotification = (data) => {
    console.log('data', data)
    notification[data.type]({
      message: data.title,
      description: data.description,
    });
  };

  useEffect(() => {
  
    if (valueLanguageContext.languageCurrent) {

        setDataFromDefault(Language[`${valueLanguageContext.languageCurrent}`])
     
    }
      
  }, []);


  useEffect(() => {
     
      if (valueLanguageContext.languageCurrent) {

        setDataFromDefault(Language[`${valueLanguageContext.languageCurrent}`])

      }

  }, [valueLanguageContext.languageCurrent]);

  const InitialFormVI = () => (<div style={{ width: "100%", height: "auto" }} ref={fromRef}>
    <div className="Item">
      <Input
        label=""
        placeholder="Tên"
        borderRadius="4px"
        value=""
        heightInput={heightInput}
        handleOutSide={handleNameInput}
        validate={true}
        typeInput="text"
      >
      </Input>
      <Input
        label=""
        handleOutSide={handlePhoneInput}
        // value=""
        placeholder="Điện thoại" //"0xx-xxx-xxxx"
        heightInput={heightInput}
        typeInput="phone"
        validate={false}
      >
      </Input>
    </div>
    <div className="Item">
      <Input
        validate={false}
        handleOutSide={handleEmailInput}
        label=""
        value=""
        heightInput={heightInput}
        placeholder="Email"
        typeInput="email">

      </Input>
      <Input
        label=""
        handleOutSide={handleCountryInput}
        placeholder="Quốc gia"
        heightInput={heightInput}
        borderRadius="4px"
        value=""
        typeInput="text">
      </Input>
    </div>
      <Input
        label=""
        placeholder="Nội dung"
        heightInput="100px"
        borderRadius="4px"
        typeInput="textarea"
        handleOutSide={handleContentInput}
        heightInput={heightTextarea}
        description=""
      ></Input>

    <style jsx>{`
      .Item.btn{
        position: absolute;
        top: 80%; 
      }
      .Item{
            display: flex;
            flex-direction: row;
            justify-content: center;
            padding: 7px 5px;
         }   
         
      `}</style>
  </div>)

   const InitialForm = () => (<div style={{ width: "100%", height: "auto" }} ref={fromRef}>
   <div className="Item">
     <Input
       label=""
       placeholder="Full Name"
       borderRadius="4px"
       value=""
       heightInput={heightInput}
       handleOutSide={handleNameInput}
       validate={true}
       typeInput="text"
     >
     </Input>
     <Input
       label=""
       handleOutSide={handlePhoneInput}
       value=""
       placeholder="Phone" //"0xx-xxx-xxxx"
       heightInput={heightInput}
       typeInput="phone"
       validate={false}
     >
     </Input>
   </div>
   <div className="Item">
     <Input
       validate={false}
       handleOutSide={handleEmailInput}
       label=""
       value=""
       heightInput={heightInput}
       placeholder="Email"
       typeInput="email">

     </Input>
     <Input
       label=""
       handleOutSide={handleCountryInput}
       placeholder="Country"
       heightInput={heightInput}
       borderRadius="4px"
       value=""
       typeInput="text">
     </Input>
   </div>
     <Input
       label=""
       placeholder="Content"
       heightInput="100px"
       borderRadius="4px"
       typeInput="textarea"
       handleOutSide={handleContentInput}
       heightInput={heightTextarea}
       description=""
     ></Input>

   <style jsx>{`
     .Item.btn{
       position: absolute;
       top: 80%; 
     }
     .Item{
           display: flex;
           flex-direction: row;
           justify-content: center;
           padding: 7px 5px;
        }   
        
     `}</style>

 </div>)

  const [form, setForm] = useState(<InitialForm />);
  const [formVi, setFormVi] = useState(<InitialFormVI />);

  const reset = () => {

    setFullName()
    setPhone()
    setEmail()
    setCountry()
    setContent()

    const newForm = <InitialForm />
    const newFormVI = <InitialFormVI />

    setFormVi(newFormVI)
    setForm(newForm)

  }

  // const FormComponent = (Language) => {
  //   let component;

  //   switch (Language) {
  //     case "vi":
  //       component = formVi;
  //       break;

  //     default:
  //       component = form;
  //       break;
  //   }

  //   return component;
  // };



  const handleSubmit = () => {

    if (!phone && !fullName) {
      openNotification({ type: "warning", title: `${dataFromDefault ? dataFromDefault.informError.title : ""}`,
          description: `${dataFromDefault ? dataFromDefault.informError.message.phoneAndNameError : ""}` })
    }

    if (!fullName && phone) {
      openNotification({ type: "warning", title: `${dataFromDefault ? dataFromDefault.informError.title : ""}`,
          description: `${dataFromDefault ? dataFromDefault.informError.message.nameError : ""}` })
    }

    if (!phone && fullName ) {
      openNotification({ type: "warning", title: `${dataFromDefault ? dataFromDefault.informError.title : ""}`,
          description: `${dataFromDefault ? dataFromDefault.informError.message.phoneError : ""}` })
    }

    if (fullName && phone) {
      
      let data;

      if(email){

        data = {
          "name": `${fullName}`,
          "email": `${email}`,
          "phone": `${phone}`,
          "country": `${country}`,
          "content": `${content ? content : ""}`,
        }

      }else{

        data = {
          "name": `${fullName}`,
          "phone": `${phone}`,
          "country": `${country}`,
          "content": `${content ? content : ""}`,
        }
        
      }
      // console.log(data)
      postAPI(
        `https://api.lipovitan.zii.vn/api/v1/frontend/contacts`, data, () => { console.log("post okie") }
      )
    } 
    // else {
        // if(email === "" || email === undefined || email === null){
        //   let elementEmail = Array.from(fromRef.current.getElementsByTagName("INPUT")).find( value => value.type.toLowerCase() == 'email');
        //   elementEmail.focus();
        //   openNotification({title:"Error", description:"Please complete form!"})
        // }else{
          // openNotification({ type: "warning", title: `${dataFromDefault ? dataFromDefault.informError.title : ""}`,
          // description: `${dataFromDefault ? dataFromDefault.informError.message.nameError : ""}` })
        // }
    // }
  }

  return (
    <>
      <From>
        {
          valueLanguageContext.languageCurrent === "en"
          ? form
          : formVi
        }
        {/* {form} */}

        <div className="center">
          <Button
            color={"#fff"}
            background={"#004FC4"}
            imgArrow={asset("/images/icon-arrow-next-white.png")}
            height={"40"}
            cbFunction={handleSubmit}
          >
            {
              valueLanguageContext.languageCurrent === "en"
              ? "Send"
              : "Gửi"
            }
          </Button>
        </div>
      </From>

      <style jsx>{`
            .center{
              padding-top: 20px;
              display: flex;
              justify-content :center;
              align-items:center;
            }
            @media only screen and (max-width: 1366px) {
                  .center{
                    padding-top: 0;
                  }
            }
            `}</style>
    </>
  )
}