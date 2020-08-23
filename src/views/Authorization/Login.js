import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CInvalidFeedback,
  CSpinner
} from '@coreui/react'
import { MdPerson, MdLock } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux'
import { login } from "../../actions/authAction";
import  validator from 'validator';

  const Login = () => {
  const dispatch = useDispatch();
  const msg = useSelector(state => state.msg);
  useEffect(()=>{
    if(msg.error){
      setLoading(false);
    setFormState((formState) => ({
      ...formState,
        errors: {
          ...formState.errors,
          email: msg.object.type === "email" ? true : false,
          password: msg.object.type === "password" ? true : false,
        }
      }));
    }else if(msg.open){
      setLoading(false);
      setFormState((formState) => ({
        ...formState,
          errors: {
            ...formState.errors,
            email: false,
            password: false
          }
        }));
      setRedirect(true);
    }
  },[msg])
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [formState, setFormState] = useState({
    values: {
        email: "",
        password: ""
    },
    errors: {
        email: false,
        password: false
    },
  });
  const handleChange = (event) => {
    event.persist();
    setFormState((formState) => ({
    ...formState,
    values: {
        ...formState.values,
        [event.target.name]: event.target.value,
      },
    }));
  };
  const loginUser = () => {
    setLoading(true);
    let errors = false;
    let email = false;
    let password = false;
    if(validator.isEmpty(formState.values.email) || !validator.isEmail(formState.values.email)){
      email = true;
      errors = true;
    }
    if(validator.isEmpty(formState.values.password)){
      password = true;
      errors = true;
    }
    if(errors){
      setFormState((formState) => ({
        ...formState,
        errors: {
            ...formState.values,
            email: email,
            password: password
          },
        }));
        setLoading(false);
        return;
    } else {
      let data = {
        email: formState.values.email,
        password: formState.values.password
      }
      dispatch(login(data));
    }
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      {redirect ? <Redirect to="/dashboard" />:""}
      
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your Kyrio account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <MdPerson />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="email" invalid={formState.errors.email ? validator.isEmpty(formState.values.email) ? true : !validator.isEmail(formState.values.email) ? true : formState.errors.email :  false } placeholder="email" autoComplete="email" name="email" value={formState.values.email} onChange={(e)=>handleChange(e)} />
                      {validator.isEmpty(formState.values.email) ? <CInvalidFeedback>This cannot be blank</CInvalidFeedback> : !validator.isEmail(formState.values.email) ? <CInvalidFeedback>Address is not correct</CInvalidFeedback>: msg.object.type === "email" ? <CInvalidFeedback>{msg.message}</CInvalidFeedback> : ""}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <MdLock />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" invalid={formState.errors.password ? validator.isEmpty(formState.values.email) ? true : formState.errors.password : false} placeholder="Password" autoComplete="current-password" name="password" value={formState.values.password} onChange={(e)=>handleChange(e)} />
                      {validator.isEmpty(formState.values.password) ? <CInvalidFeedback>This cannot be blank</CInvalidFeedback> : msg.object.type === "password" ? <CInvalidFeedback>{msg.object.message}</CInvalidFeedback> : ""}
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={loginUser}>Login {loading ? <CSpinner size="sm"/> : "" }</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Create Your Free Kyrio Account</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now! </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
