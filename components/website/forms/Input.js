
import React from "react";
import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
// import DatePicker from 'react-modern-calendar-datepicker';
// import Dropzone from "react-dropzone";
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export function Input({
    dataOption,
    dataSelect,
    children,
    name,   // name input
    value,
    typeInput = "text",   // type input ex: "password" || "mail" || "text"
    label = "Please enter props label",      // label Input
    placeholder = "Please enter props placeholder!", // placeholder input
    description,
    validate = false,
    heightInput = "40px",
    widthInput,
    borderRadius = "2px",
    handleOutSide,
    itemRef,
}) {
    const refInputText = itemRef || useRef();
    // const [stateValue, setValue] = useState();
    // useEffect(()=>{
    //     if(value){
    //         setValue(value);
    //     }
    // },[])
    return (
        <>
            {
                (typeInput === "text" || typeInput === "") ? (
                    <div className="content-input">
                        <InputBasic
                            borderRadius={borderRadius}
                            heightInput={heightInput}
                            widthInput={widthInput}
                            value={value}
                            name={name}
                            typeInput={typeInput}
                            label={label}
                            forwardRef={refInputText}
                            ref={refInputText}
                            placeholder={placeholder}
                            description={description}
                            handleOutSide={handleOutSide ? handleOutSide : null}
                        />
                        {children}
                    </div>
                ) : null
            }
            {
                (typeInput === "password") ? (
                    validate === true ?
                        (
                            <div className="content-input">
                                <PasswordInputValidate
                                    borderRadius={borderRadius}
                                    heightInput={heightInput}
                                    widthInput={widthInput}
                                    value={value}
                                    name={name}
                                    typeInput={typeInput}
                                    label={label}
                                    forwardRef={refInputText}
                                    ref={refInputText}
                                    placeholder={placeholder}
                                    description={description}
                                    handleOutSide={handleOutSide ? handleOutSide : null}
                                />
                                {children}
                            </div>
                        ) : (
                            <div className="content-input">
                                <InputBasic
                                    borderRadius={borderRadius}
                                    widthInput={widthInput}
                                    heightInput={heightInput}
                                    value={value}
                                    name={name}
                                    typeInput={typeInput}
                                    label={label}
                                    forwardRef={refInputText}
                                    ref={refInputText}
                                    placeholder={placeholder}
                                    description={description}
                                    handleOutSide={handleOutSide ? handleOutSide : null}
                                />
                                {children}
                            </div>
                        )
                ) : null
            }
            {
                (typeInput === "email") ? (
                    validate === true ?
                        (
                            <div className="content-input">
                                <EmailInputValidate
                                    borderRadius={borderRadius}
                                    widthInput={widthInput}
                                    heightInput={heightInput}
                                    value={value}
                                    name={name}
                                    typeInput={typeInput}
                                    label={label}
                                    forwardRef={refInputText}
                                    ref={refInputText}
                                    placeholder={placeholder}
                                    description={description}
                                    handleOutSide={handleOutSide ? handleOutSide : null}
                                />
                                {children}
                            </div>
                        ) : (
                            <div className="content-input">
                                <InputBasic
                                    borderRadius={borderRadius}
                                    widthInput={widthInput}
                                    heightInput={heightInput}
                                    value={value}
                                    name={name}
                                    typeInput={typeInput}
                                    label={label}
                                    forwardRef={refInputText}
                                    ref={refInputText}
                                    placeholder={placeholder}
                                    description={description}
                                    handleOutSide={handleOutSide ? handleOutSide : null}
                                />
                                {children}
                            </div>
                        )
                ) : null
            }
            {
                (typeInput === "number") ? (
                    <div className="content-input">
                        <InputBasic
                            borderRadius={borderRadius}
                            heightInput={heightInput}
                            widthInput={widthInput}
                            value={value}
                            name={name}
                            typeInput={typeInput}
                            label={label}
                            forwardRef={refInputText}
                            ref={refInputText}
                            placeholder={placeholder}
                            description={description}
                            handleOutSide={handleOutSide ? handleOutSide : null}
                        />
                        {children}
                    </div>
                ) : null
            }
            {
                (typeInput === "textarea") ? (
                    <div className="content-input">
                        <InputTextarea
                            borderRadius={borderRadius}
                            widthInput={widthInput}
                            heightInput={heightInput}
                            value={value}
                            name={name}
                            typeInput={typeInput}
                            label={label}
                            forwardRef={refInputText}
                            ref={refInputText}
                            placeholder={placeholder}
                            description={description}
                            handleOutSide={handleOutSide ? handleOutSide : null}
                        />
                        {children}
                    </div>
                ) : null
            }

            {
                (typeInput === "phone") ? (
                    <div className="content-input">
                        <InputPhone
                            borderRadius={borderRadius}
                            widthInput={widthInput}
                            heightInput={heightInput}
                            value={value}
                            name={name}
                            typeInput={typeInput}
                            label={label}
                            forwardRef={refInputText}
                            ref={refInputText}
                            placeholder={placeholder}
                            description={description}
                            handleOutSide={handleOutSide ? handleOutSide : null}
                        />
                        {children}
                    </div>
                ) : null
            }
           
            {
                (typeInput === "tag") ? (
                    <div className="content-input">
                        <InputTag
                            borderRadius={borderRadius}
                            widthInput={widthInput}
                            heightInput={heightInput}
                            value={value}
                            dataOption={dataOption}
                            dataSelect={dataSelect}
                            name={name}
                            typeInput={typeInput}
                            label={label}
                            forwardRef={refInputText}
                            ref={refInputText}
                            placeholder={placeholder}
                            description={description}
                            handleOutSide={handleOutSide ? handleOutSide : null}
                        ></InputTag>
                        {children}
                    </div>
                ) : null
            }
            {
                typeInput === "selection" ? (
                    <div className="content-input">
                        <InputSelection
                        borderRadius={borderRadius}
                        widthInput={widthInput}
                        heightInput={heightInput}
                        dataOption={dataOption}
                        dataSelect={dataSelect}
                        value={value}
                        name={name}
                        typeInput={typeInput}
                        label={label}
                        forwardRef={refInputText}
                        ref={refInputText}
                        placeholder={placeholder}
                        description={description}
                        handleOutSide={handleOutSide ? handleOutSide : null}
                        >
                        </InputSelection>
                        {children}
                    </div>
                ) : null
            }
            <style jsx>{`
                .content-input{
                    position: relative;
                    width: 100%;
                }
            `}</style>
        </>
    )
}

export const InputBasic = React.forwardRef(({
    handleOutSide,
    name, // name 
    value,
    borderRadius,
    widthInput,
    heightInput,  // height input
    typeInput,   // type input
    label,      // label Input
    placeholder, // placeholder input
    description, // description below title
    forwardRef }, { ref }) => {
    
    const [stateValue, setStateValue] = useState("")
    const [passwords, setPassword] = useState("");
    const [statusShow, setStatusShow] = useState(false);
    const [statusChange, setStatusChange] = useState(false);
        
    function onChange(event) {
        setPassword(event.target.value);
        setStateValue(event.target.value);
        if(handleOutSide){
            handleOutSide(event.target.value);
        }    
    }

    function onClick(event){
        setStatusChange(true);
        setStateValue(value);
        if(statusChange===true){
            setStateValue(event.target.value);
        }
    }
   
    const handleStatus = () => setStatusShow(!statusShow);

    return (
        <div ref={forwardRef} style={{position:"relative"}} > 
            <label >{label}</label>
            {description ? (<span className="description-input" style={{marginBottom:"10px"}}>{description}</span>) : null}
            {
                typeInput === "password" ? (
                    statusShow === true ? (
                        <input
                            name={name || "password"}
                            className={"success"}
                            type="text"
                            placeholder={placeholder} value={undefined}
                            onChange={onChange} />
                    ) : (
                            <input
                                
                                name={name || "password"}
                                className={"success"}
                                type="password"
                                placeholder={placeholder} value={undefined}
                                onChange={onChange} />
                        )

                ) : (
                        <input
                            readOnly={false}
                            name={name || ""}
                            className={"success"}
                            type={typeInput} 
                            name={name || ""}
                            placeholder={placeholder} 
                            value={ statusChange === true  ? stateValue : value || ""}
                            onClick={onClick}
                            onChange={onChange}/>
                    )
            }
            {
                typeInput === "password" ? (
                    <div onClick={handleStatus} className={"show-password"}><img src={"../images/icon-eye.png"} /></div>
                ) : null
            }

            <style jsx>{`
                    *:focus {
                        outline: none;
                    }
                    label{
                        font-size: 15px;
                        display: block;
                        margin: 5px 0;
                    }
                    .show-password{
                        position: absolute;
                        width: 15px;
                        right: 15px;
                        top: 60%;
                        cursor: pointer;
                    }
                    input[type="password"],
                    input[type="text"], 
                    input[type="email"],
                    input[type="number"],
                    input[type=""]{
                        display: block;
                        box-sizing: border-box;
                        margin-bottom: 20px;
                        padding: 4px 15px;
                        min-width: ${widthInput||"100px"};
                        width: ${widthInput||"100%"};
                        height: ${heightInput || "40px"};
                        border: 1px solid #E3EBF6;
                        font-weight: 400;
                        font-size: 15px;
                        transition: 0.2s ease;
                        outline: none;
                        border-radius: ${borderRadius || "2px"};
                        ::placeholder{
                            color: #95AAC9;
                        }
                    }
                    input[type="password"]:focus, 
                    input[type="text"]:focus,  
                    input[type="email"]:focus,
                    input[type=""]:focus,
                    input[type="number"]:focus{
                        
                        background-color: #fff;
                        border-color: #2c7be5;
                        outline: 0;
                        box-shadow: transparent;
                    }
                    .error{
                        position: relative;
                    }
                    .error input{
                        position: relative !important;
                        color: #F44336 !important;
                        border-color: red;
                    }
                    .error span{
                        position: absolute !important;
                        color: #F44336 !important;
                        top : auto;
                        bottom: -20px;
                        right : 0;
                        font-size: 10px
                    }
                    .description-input{
                        color: #6E84A3;
                        font-size: 13px; 
                    }
                    .success{
                        position: relative;
                    }
                    .success span{
                        display:none;
                    }
                    .success input{
                        color: #008eff !important;
                    }
                    
            `}</style>
        </div>
    )
})

export const EmailInputValidate = React.forwardRef(({
    handleOutSide,
    name, // name input
    value,
    borderRadius,
    widthInput,
    heightInput,  // height input
    typeInput,   // type input
    label,      // label Input
    placeholder, // placeholder input
    description,
    forwardRef }, { ref }) => {

    const [stateValue, setValue] = useState("");
    const [error, setError] = useState(false);
    const [msError, setMsError] = useState("");
    const [statusChange, setStatusChange] = useState(false);

    function onClick(event){
        setStatusChange(true);
        setValue(value);
        statusChange === true ? setValue(event.target.value) : null;
    }

    function checkEmailPattern(email) {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }

    function onChangeEmail(event) {
        const checked = checkEmailPattern(event.target.value);
        setValue(event.target.value);
        if (event.target.value.trim() === "") {
            setError(true);
            setMsError("Email không được để trống");
        } else {
            checked === true ? setError(false) : setError(true);
        }
    }

    useEffect(()=>{
        error === true ? setMsError("Email không đúng định dạng") : setMsError("");
    },[error])

    useEffect(()=>{
        if(error !== true){
            handleOutSide ? handleOutSide(stateValue) : null;
        }else{
            handleOutSide ? handleOutSide("") : null;
        }
    },[stateValue])

    return (
        <div ref={forwardRef} className={classNames({ "error": error, "success": !error })}>
            <label>{label}</label>
            {description ? (<span className="description-input">{description}</span>) : null}
            <input
                name={name || "email"}
                className={classNames({ "error": error, "success": !error })}
                type="email"
                placeholder={placeholder} 
                value={ statusChange === true  ? stateValue : value || ""}
                // value={ stateVlaue ||value || undefined}
                onClick={onClick}
                onChange={onChangeEmail} />
            <span>{msError}</span>
            <style jsx>{`
                    input[type="email"]{
                        display: block;
                        box-sizing: border-box;
                        margin-bottom: 20px;
                        padding: 4px 15px;
                        min-width: ${widthInput||"100px"};
                        width: ${widthInput||"100%"};

                        height: ${heightInput || "40px"};
                        border: 1px solid #E3EBF6;
                        font-weight: 400;
                        font-size: 15px;
                        transition: 0.2s ease;
                        outline: none;
                        border-radius: ${borderRadius || "2px"};
                        color: #12263f;
                        ::placeholder{
                            color: #95AAC9;
                        }
                    }
                    label{
                        font-size: 15px;
                        display: block;
                        margin: 5px 0;
                    }
                    input[type="email"]:focus {
                        color: #12263f;
                        background-color: #fff;
                        border-color: #2c7be5;
                        outline: 0;
                        box-shadow: transparent;
                    }
                    .error{
                        position: relative;
                    }
                    .error input{
                        position: relative !important;
                        color: #F44336 !important;
                        border-color: red;
                    }
                    .error span{
                        position: absolute !important;
                        color: #F44336 !important;
                        top : auto;
                        bottom: -20px;
                        right : 0;
                        font-size: 10px;
                        width: 100%;
                    }
                    .description-input{
                        color: #6E84A3;
                        font-size:  13px; 
                    }
                   
                    .success span{
                        display:none;
                    }
                    .success input{
                        /* color: #008eff !important; */
                    }
            `}</style>
        </div>
    )
})

export const PasswordInputValidate = React.forwardRef(({
    handleOutSide,
    name, // name input
    borderRadius,
    widthInput,
    heightInput,  // height input
    typeInput,   // type input
    label,      // label Input
    placeholder, // placeholder input
    description,
    forwardRef }, { ref }) => {

    const [passwords, setPassword] = useState("");
    const [msError, setMsError] = useState("");
    const [error, setError] = useState(false);
    const [statusShow, setStatusShow] = useState(false);

    function checkPasswordPattern(password) {

        var minMaxLength = /^[\s\S]{8,30}$/,
            upper = /[A-Z]/,
            lower = /[a-z]/,
            number = /[0-9]/,
            special = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

        if (upper.test(password) === false) {
            setMsError("Password phải chưa ký tự viết hoa")
        }
        if (number.test(password) === false) {
            setMsError("Password phải chưa ký tự số")
        }
        if (special.test(password) === false) {
            setMsError("Password phải chứa ký tự đặc biệt")
        }
        if (lower.test(password) === false) {
            setMsError("Password phải chứa ký tự thường")
        }
        if (minMaxLength.test(password) === false) {
            setMsError("Password có từ 8 đến 30 kí tự")
        }
        if (password === "") {
            setMsError("Password không được để trống")
        }
        if (minMaxLength.test(password)
            && upper.test(password)
            && lower.test(password)
            && number.test(password)
            && special.test(password)
        ) {
            return true;
        }
        return false;
    }

    function onChangePassword(event) {
        const checked = checkPasswordPattern(event.target.value);
        setPassword(event.target.value);
        if (checked === true) {
            setError(false);
            if(handleOutSide){
                handleOutSide(event.target.value);
            }
        } else {
            setError(true);
            setPassword(event.target.value);
        }
    }
    useEffect(()=>{
        if(error !== true){
            handleOutSide ? handleOutSide(passwords) : null;
        }
    },[passwords]);
    const handleStatus = () => setStatusShow(!statusShow);

    return (
        <div ref={forwardRef} className={classNames({ "error": error, "success": !error })}>
            <label>{label}</label>
            {description ? (<span className="description-input">{description}</span>) : null}
            {statusShow === true ? (
                <input
                    name={name || "password"}
                    className={classNames({ "error": error, "success": !error })}
                    type="text" name="password"
                    placeholder={placeholder} value={undefined}
                    onChange={onChangePassword} />
            ) : (
                    <input
                        name={name || "password"}
                        className={classNames({ "error": error, "success": !error })}
                        type="password" name="password"
                        placeholder={placeholder} value={undefined}
                        onChange={onChangePassword} />
                )
            }
            <span>{msError}</span>
            <div onClick={handleStatus} className={"show-password"}><img src={"../images/icon-eye.png"} /></div>
            <style jsx>{`
                    *:focus {
                        outline: none;
                    }
                    label{
                        font-size: 15px;
                        display: block;
                        margin: 5px 0;
                    }
                    .show-password{
                        position: absolute;
                        width: 15px;
                        right: 15px;
                        top: 60%;
                        cursor: pointer;
                    }
                    input[type="password"],input[type="text"]{
                        display: block;
                        box-sizing: border-box;
                        margin-bottom: 20px;
                        padding: 4px 15px;
                        min-width: ${widthInput||"310px"};
                        width: ${widthInput||"100%"};
                        height: ${heightInput || "40px"};
                        border: 1px solid #E3EBF6;
                        font-weight: 400;
                        font-size: 15px;
                        transition: 0.2s ease;
                        outline: none;
                        border-radius: ${borderRadius || "2px"};
                        ::placeholder{
                            color: #95AAC9;
                        }
                    }
                    input[type="password"]:focus, input[type="text"]:focus {
                        color: #12263f;
                        background-color: #fff;
                        border-color: #2c7be5;
                        outline: 0;
                        box-shadow: transparent;
                    }
                    .error{
                        position: relative;
                    }
                    .error input{
                        position: relative !important;
                        color: #F44336 !important;
                        border-color: red;
                    }
                    .error span{
                        position: absolute !important;
                        color: #F44336 !important;
                        top : 4px;
                        right : 0;
                        font-size: 10px
                    }
                    .description-input{
                        color: #6E84A3;
                        font-size:  13px; 
                    }
                    .success{
                        position: relative;
                    }
                    .success span{
                        display:none;
                    }
                    .success input{
                        /* color: #008eff !important; */
                    }   
            `}</style>
        </div>
    )
});

export const InputTextarea = React.forwardRef(({
    handleOutSide,
    name,
    value,
    borderRadius,
    widthInput,
    heightInput,  // height input
    typeInput,   // type input
    label,      // label Input
    placeholder, // placeholder input
    description,
    forwardRef }, { ref }) => {

    const [valueInside, setValueInside] = useState("");

    function onChange(event) {
        setValueInside(event.target.value);
    }

    useEffect(()=>{
        handleOutSide ? handleOutSide(valueInside) : null;
    },[valueInside]);

    return (
        <div ref={forwardRef} >
            <label>{label}</label>
            {description ? (<span className="description-input">{description}</span>) : null}
            <textarea
                name={name || ""}
                className={"success"}
                name="Textarea"
                placeholder={placeholder} value={value || undefined}
                onChange={onChange}
            />
            <style jsx>{`
                    *:focus {
                        outline: none;
                    }
                    label{
                        font-size: 15px;
                        display: block;
                        margin: 5px 0;
                    }
                    .show-password{
                        position: absolute;
                        width: 15px;
                        right: 10px;
                        top: 60%;
                        cursor: pointer;
                    }
                    textarea{
                        display: block;
                        box-sizing: border-box;
                        margin-bottom: 20px;
                        padding: 4px 15px;
                        min-width: ${widthInput||"200px"};
                        width: ${widthInput||"100%"};
                        height: ${heightInput || "40px"};
                        border: 1px solid #E3EBF6;
                        font-weight: 400;
                        font-size: 15px;
                        transition: 0.2s ease;
                        outline: none;
                        border-radius: ${borderRadius || "2px"};
                        ::placeholder{
                            color: #95AAC9;
                        }
                    }
                    textarea:focus{
                        background-color: #fff;
                        border-color: #2c7be5;
                        outline: 0;
                        box-shadow: transparent;
                    }
                    .description-input{
                        color: #6E84A3;
                        font-size:  13px; 
                    }
                    .success{
                        position: relative;
                    }
                    .success span{
                        display:none;
                    }
                    .success input{
                        color: #008eff !important;
                    }
            `}</style>
        </div>
    )
})

export const InputPhone = React.forwardRef(({

    handleOutSide,
    name, // name input
    value,
    borderRadius,
    widthInput,
    heightInput,  // height input
    typeInput,   // type input
    label,      // label Input
    placeholder, // placeholder input
    description,
    forwardRef }, { ref }) => {

    const [error, setError] = useState(false);
    const [msError, setMsError] = useState("");
    const [valueInSide, setValueInside] = useState("")


    function checkPhonePattern(phone) {
        const regex = /0[0-9]{9}$/;
        return regex.test(phone);
    }

    function onChange(event) {
        const value = event.target.value.trim();
        let newValue = value.replace(/[^0-9]/g, "");
        setValueInside(newValue);
        event.target.value = newValue;
        if (newValue) {
            event.target.value = newValue;
            // setValueInside(event.target.value);
            const checked = checkPhonePattern(event.target.value);
            checked === true ? setError(false) : setError(true);
        }
    }
    useEffect(()=>{

        error === true ? setMsError("Phone không đúng") : setMsError("");

    },[error]);

    useEffect(()=>{
        if(error === false){
            handleOutSide ? handleOutSide(valueInSide) : null;
        }
        if(error === true){
            handleOutSide ? handleOutSide("") : null;
        }
    },[valueInSide])

    return (
        <div ref={forwardRef} className={classNames({ "error": error, "success": !error })}>
            <label>{label}</label>
            {description ? (<span className="description-input">{description}</span>) : null}
            <input
                className={"success"}
                name={name || "phone"}
                type="text"
                maxLength="10"
                placeholder={placeholder || "0xx-xxx-xxxx"}
                value={value || undefined}
                onChange={onChange}
            />
            {error ? (<span>{msError}</span>) : <></>}
            
            <style jsx>{`
                    *:focus {
                        outline: none;
                    }
                    label{
                        font-size: 15px;
                        display: block;
                        margin: 5px 0;
                    }
                    .show-password{
                        position: absolute;
                        width: 15px;
                        right: 10px;
                        top: 60%;
                        cursor: pointer;
                    }
                    input[type="text"],input[type="number"]{
                        display: block;
                        box-sizing: border-box;
                        margin-bottom: 20px;
                        padding: 4px 15px;
                        min-width: ${widthInput||"100px"};
                        width: ${widthInput||"100%"};
                        height: ${heightInput || "40px"};
                        border: 1px solid #E3EBF6;
                        font-weight: 400;
                        font-size: 15px;
                        transition: 0.2s ease;
                        outline: none;
                        border-radius: ${borderRadius || "2px"};
                        ::placeholder{
                            color: #95AAC9;
                        }
                    }
                    input[type="text"]:focus, input[type="number"]{
                        background-color: #fff;
                        border-color: #2c7be5;
                        outline: 0;
                        box-shadow: transparent;
                    }
                    .description-input{
                        color: #6E84A3;
                        font-size:  13px; 
                    }
                    .success{
                        position: relative;
                    }
                    .success span{
                        display:none;
                    }
                    .success input{
                       
                    }
                    .error{
                        position: relative;
                    }
                    .error input{
                        position: relative !important;
                        color: #F44336 !important;
                        border-color: red;
                    }
                    .error span{
                        position: absolute !important;
                        color: #F44336 !important;
                        top : 4px;
                        right : 0;
                        font-size: 10px
                    }
            `}</style>
        </div>
    )
})

export const InputTag = React.forwardRef(({
    handleOutSide,
    name, // name input
    widthInput,
    dataOption=["text 1", "text 2"],
    dataSelect=[],
    borderRadius,
    heightInput,  // height input
    typeInput,   // type input
    label,      // label Input
    placeholder, // placeholder input
    description,
    forwardRef }, { ref }) => {

    const refInput = useRef();
    const refSelect = useRef()
    const refContentItems = useRef();

    const [listItemsSelect, setListItemsSelect] = useState(dataSelect);
    const [listItemsDefault, setListItemsDefault] = useState(dataOption);
    const [lisItemsSearch, setLisItemsSearch] = useState(dataOption);
    const [clearAllItems, setClearAllItems] = useState(false);
    const [clearOneItem, setClearOneItem] = useState(false);
    const [valueSearch, setValueSearch] = useState(null);
    const [statusInput, setStatusInput] = useState(false);

    const handleInputSelect = () => refInput.current.focus();
    const handleClearAll = () => setClearAllItems(true);

    const handleClearOneItem = (e)=> {
        const value = e.target.parentNode.textContent;
        setListItemsDefault([...listItemsDefault,value]);
        setListItemsSelect(listItemsSelect.filter((item) => item !== value));
        setClearOneItem(true)
    };
    
    const handleSearch = (word) => {
        if(listItemsDefault){
          let newData = listItemsDefault.filter((value)=>{
            if(value.toString().toLowerCase().indexOf(word) !== -1)
              return value;
          });
          setLisItemsSearch(newData);
        }
    }

    function hasClass(element, className) {
        return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
    }

    const handleChange = (e) => {
        setValueSearch(e.target.value);
        setStatusInput(true);
    };

    const handleLeaveInput = (e)=>{
        setStatusInput(false);
    }

    // them 1 item
    const onClickItems = (e) => {
        if(hasClass(e.target, "select-item") === true){
            const value = e.target.textContent;
            if(listItemsSelect.indexOf(value) === -1){
                setListItemsSelect([...listItemsSelect,e.target.textContent])
                setListItemsDefault(listItemsDefault.filter((item) => item !== value))
                setLisItemsSearch(lisItemsSearch.filter((item) => item !== value))
                if(listItemsDefault.length===0){
                    setStatusInput(false);
                }
            }
        }
    }

    useEffect(()=>{
        if(statusInput=== true){
            refInput.current.focus();
        }
    }, [statusInput])

    // tim cac item
    useEffect(() => {
        handleSearch(valueSearch);
    },[valueSearch])

    // xoa tat ca cac item
    useEffect(()=>{
        if( clearAllItems === true ){
            setListItemsSelect([]);
            setListItemsDefault(dataOption);
            refInput.current.value="";
            setClearAllItems(false);
        }
    },[clearAllItems]);

    /// xoa 1 item da chon
    useEffect( () =>{
        if( clearOneItem === true ){
            refInput.current.value = "";
            setClearOneItem(false);
        }
    },[clearOneItem]);

    useEffect(()=>{
        handleOutSide ? handleOutSide(listItemsSelect) : null;
    },[listItemsSelect])

    return(
        <div className={"container-select"} onMouseLeave={handleLeaveInput}onClick={handleChange}>
            <label>{label}</label>
            {description ? (<span className="description-input" >{description}</span>) : null}
            <div className={"content-select"} style={{marginTop:"10px"}}>
                <div onClick={handleInputSelect} ref={refSelect} className="selection-control">
                    {listItemsDefault ? (
                        listItemsSelect.map((value, index)=>(
                            <div key={index}
                                className="select-item"
                                >
                                {value}
                                <span onClick={handleClearOneItem}></span>
                            </div>
                        ))
                    ):(<></>)}
                    {
                        statusInput === true ? (
                        <input
                            defaultValue=""
                            ref={refInput}
                            type="text"
                            onChange={handleChange}
                            onClick={handleChange}
                            
                        />
                        ) : (
                        <input
                            ref={refInput}
                            type="text"
                            onChange={handleChange}
                            style={{display:"none"}}
                        />)
                    }
                    <input
                        onChange={()=>{console.log("")}}
                        defaultValue={undefined}
                        name={ name || "list-tag" }
                        value={listItemsSelect}
                        style={{display:"none"}}
                    />
                    { 
                        statusInput === true ? (
                            <span onClick={handleClearAll} className={"clear"}></span>
                        ) : (<></>)
                    }
                    <span className={"open"}></span>
                </div>
            </div>
            <div ref={refContentItems} className={ statusInput === true? "content-value active" : "content-value" }>
                {
                    statusInput === true ? (
                        lisItemsSearch.length !== 0 ? (
                            lisItemsSearch.map((value, index)=>(
                                <div key={index}
                                    className="select-item"
                                    onClick={onClickItems}
                                >
                                    {value}
                                </div>
                            ))
                        ) : (
                                listItemsDefault.map((value, index)=>(
                                    <div key={index}
                                        className="select-item"
                                        onClick={onClickItems}
                                    >
                                        {value}
                                    </div>))
                            )
                    ) : (<></>)
                }
            </div>
            
            <style jsx>{`
               
                .description-input{
                    color: #6E84A3;
                    font-size:  13px; 
                }
                label{
                    font-size: 15px;
                    display: block;
                    margin: 5px 0;
                }
                .content-select{
                    position: relative;
                    border: 1px solid #E3EBF6;
                    border-radius: ${ borderRadius || "2px"};
                    min-height: ${heightInput || "40px"};
                    background-color:#fff;
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    flex-direction: row;
                    input[type="text"]{
                        outline: none;
                        display: flex;
                        flex: 1;
                        border:none;
                        height:22px;
                        margin: 2px 0;
                    }
                    .selection-control{
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        padding: 5px 40px 5px 10px;
                        width: 100%;
                        height: 100%;
                    }
                    .select-item{
                        display: flex;
                        margin: 2px 5px;
                        align-items: center;
                        padding-left: .375rem;
                        padding-right: .375rem;
                        margin: 0 .25rem .25rem 0;
                        font-size: .8125rem;
                        background-color: #edf2f9;
                        border-radius: .1875rem;
                        span{
                            position: relative;
                            width: 15px;
                            height: 100%;
                            transition: 0.5s;
                            cursor: pointer;
                            &::after, &::before{
                                content:"";
                                position: absolute;
                                top: 47%;
                                left: 40%;
                                width: 8px;
                                height : 2px;
                                border-radius: 1px;
                                background-color: #c2c3c3;
                            }
                            &:hover::after, &:hover::before{
                                background-color: red;
                            
                            }
                            &::after{
                                transform: rotate(45deg);
                            }
                            &::before{
                                transform: rotate(-45deg);
                            }
                        }
                    }
                }
                .container-select{
                    position: relative;
                    width: ${widthInput || "100%"};
                    margin-bottom: 20px;
                }
                .content-value{
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    
                    .add{
                        display: none;
                    }
                    .select-item{
                        color: #6e84a3;
                        cursor: pointer;
                        font-size: .9375rem;
                        &:hover{
                            color: #12263f;
                        }
                    }
                }
                .content-value.active{
                    max-height: 325px;
                    width: 100%;
                    max-width: 100%;
                    top:100%;
                    right:0;
                    background-color: #fff;
                    overflow: hidden;
                    overflow-y: auto;
                    height: auto;
                    z-index: 2;
                    box-shadow: 0px 2px 9px 5px #ececec;
                    border-radius: 5px;
                    padding: 5px 10px;
                    border: solid 10px white;
                    border-right: 0;
                    border-left: 0;
                }
                .clear{
                        position: absolute;
                        right: 10px;
                        top: 50%;
                        width: 20px;
                        height: 30px;
                        transform: translate(0,-50%);
                        transition: 0.5s;
                        cursor: pointer;
                        &::after, &::before{
                          content:"";
                          position: absolute;
                          top:13px;
                          left:0;
                          width:15px;
                          height : 3px;
                          border-radius: 2px;
                          background-color: #c2c3c3;
                        }
                        &:hover::after, &:hover::before{
                          background-color: red;
                          
                        }
                        &::after{
                          transform: rotate(45deg);
                        }
                        &::before{
                          transform: rotate(-45deg);
                        }
                }
               `}</style>
           </div>
    )
})

export const InputSelection = React.forwardRef(({
    
    name, // name 
    value,
    dataOption=["Data test 1","Data test 2", "Data test 3"],
    dataSelect,
    borderRadius,
    widthInput,
    heightInput,  // height input
    typeInput,   // type input
    label,      // label Input
    placeholder, // placeholder input
    description, // description below title
    forwardRef }, { ref }) => {

    const [listItemsSelect, setListItemsSelect] = useState( dataOption || []);
    const [statusShow, setStatusShow] = useState(false);
    const [valueLocal,setValueLocal] = useState("Select role");
    const [statusChange, setStatusChange] = useState(false);
    const refInput = useRef();

    const handleStatus = () => {
        setStatusShow(!statusShow);
        setStatusChange(true);
    };
    const handleClickItem = (e) => {
        setStatusShow(false)
        if(e.target.textContent){
            setValueLocal(e.target.textContent);
        }
    }
    useEffect(()=>{
        if(statusShow === true){
            refInput.current.focus()
        }
    },[statusShow]);

    function onChange(event) {
        setStateValue(event.target.value);
        // console.log(value, "value");
        // console.log(stateValue, "stateValue");
        
    }

    return (
        <div ref={forwardRef} className="input-selection" onMouseLeave={()=>setStatusShow(false)} > 
            <label >{label}</label>
            {description ? (<span className="description-input" style={{marginBottom:"10px"}}>{description}</span>) : null}
            <div className="content-input-select">
                <input
                    ref={refInput}
                    readOnly={true}
                    name={ name || ""}
                    className={"success"}
                    defaultValue={undefined}
                    type={"text"}
                    onChange={()=>null}
                    placeholder={placeholder} 
                    value={ statusChange === true ? valueLocal : value || ""}
                    onClick={handleStatus}
                />
                <div className="show-list-items" onClick={handleStatus}><img src="../images/ar-ft.png"/></div>
            </div>
                   
            <div className={`${statusShow === true ? "content-list-items-select active" : "content-list-items-select"}`} >
                {dataOption.length > 0 ? (
                    <ul>
                        {
                            dataOption.map((value,index)=>(
                                <li 
                                    key={index}
                                    onClick={handleClickItem}
                                >
                                    {statusShow === true ? value : null}
                                </li>
                            ))
                        }
                    </ul>
                ): null}
                
            </div>
            
            <style jsx>{`
                    *:focus {
                        outline: none;
                    }
                    .input-selection{
                        position: relative;
                    }
                    .show-list-items{
                        position: absolute;
                        width: 10px;
                        right: 15px;
                        top: 50%;
                        cursor: pointer;
                        opacity: 0.5;
                        transform: translate(0,-50%);
                        transition: 0.3s;
                    }
                    .content-input-select{
                        position: relative;
                        min-width: ${widthInput||"200px"};
                        width: ${widthInput||"100%"};
                    }
                    .content-list-items-select{
                        display: flex;
                        min-width: ${widthInput||"200px"};
                        width: ${widthInput||"100%"};
                        transition: 0.3s ease-in-out;
                        overflow: hidden;
                        ul{
                            display: flex;
                            width: 100%;
                            flex-direction: column;
                            z-index: -1;
                            height: 0;
                            opacity: 0;
                            box-shadow: 0px 2px 9px 5px #ececec;
                            transition: 0.3s ease-in-out;
                        }
                        li{
                            padding: 5px;
                            transition: 0.3s ease-in-out;
                        }
                    }
                   
                    .content-list-items-select.active{
                        transition: 0.3s ease-in-out;
                        overflow: unset;
                        ul{
                            height: auto;
                            z-index: auto;
                            opacity: 1;
                            padding: 10px;
                            box-shadow: 0px 2px 9px 5px #ececec;
                            max-height: 250px;
                            overflow: auto;
                            transition: 0.3s ease-in-out;
                        }
                        li{
                            margin: 10px 0;
                            margin-top:0;
                            cursor: pointer;
                            transition: 0.3s ease-in-out;
                            &:hover{
                                background-color: #ececec;
                               
                            }
                        }
                    }
                    label{
                        font-size: 15px;
                        display: block;
                        margin: 5px 0;
                    }
                   
                    input{
                        display: block;
                        box-sizing: border-box;
                        margin-bottom: 20px;
                        padding: 4px 15px;
                        min-width: ${widthInput||"310px"};
                        width: ${widthInput||"100%"};
                        height: ${heightInput || "40px"};
                        border: 1px solid #E3EBF6;
                        font-weight: 400;
                        font-size: 15px;
                        transition: 0.2s ease;
                        outline: none;
                        border-radius: ${borderRadius || "2px"};
                        ::placeholder{
                            color: #95AAC9;
                        }
                        &::after{
                            content: "";
                            position: absolute;
                            width: 15px;
                            height: 15px;
                            color : red;
                            z-index: 5;
                        }
                    }
                    input:focus,{
                        background-color: #fff;
                        border-color: #2c7be5;
                        outline: 0;
                        box-shadow: transparent;
                    }
                    .description-input{
                        color: #6E84A3;
                        font-size: 13px; 
                    }
                    .success{
                        position: relative;
                    }
                    .success span{
                        display:none;
                    }
                    .success input{
                        color: #008eff !important;
                    }
                    
            `}</style>
        </div>
    )
})
