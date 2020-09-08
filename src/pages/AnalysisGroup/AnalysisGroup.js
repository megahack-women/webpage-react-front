import React, { useState } from "react";
import { CardIcon } from "../../components/common/CardIcon/CardIcon";
import { useChat } from '../../context/Chat'
import LogoDinmais from '../../icons/logo-dinmais.svg';
import { InputText } from "../../components/common/InputText/InputText";
import { ButtonPrimary } from "../../components/common/ButtonPrimary/ButtonPrimary";
import { postGroup } from '../../services/analysis'
import "../AnalysisPage/analysis-page.scss";
import { NavLink } from 'react-router-dom'

const adapterChatState = (state) => {
  const {
    id,
    finance,
    loan_max,
    loan_min,
    payment_max,
    payment_min
  } = state.client.calculators
  return {
    id,
    income: [finance],
    proposal: ['...'],
    loans: [ loan_min, loan_max ],
    payments: [ payment_max, payment_min]
  }
}

const AnalysisGroup = () => {
  const { chatState, setChatState } = useChat()
  const [ chatValues, ] = useState(adapterChatState(chatState))
  const [form, setForm] = useState()

  const onClick = async (e) => {
    const res = await postGroup({
      id: chatValues.id,
      group: form.split(',').map(i => i.trim())
    })
    setChatState(res)
  }

  return (
    <>
    <header className="header-dinmais">
      <img src={LogoDinmais} alt="logo" />
    </header>
    <div className="container analysis-resume">
      <CardIcon>
        <h1>Adicione CPFs de pessoas da sua confiança!</h1>
        <InputText label="Seu grupo com pessoas que residem com você, é composto por:" placeholder="Ex.: 000.000.000-00, 000.000.000-00" state={form} setState={setForm} />
        <p className="obs">Obs.: Separe os CPFs por vírgula</p>
        <ButtonPrimary label="Enviar CPFs" onClick={onClick} />
      </CardIcon>
      <p><NavLink to="/analysis-page">Voltar</NavLink></p>
    </div>
    </>
  );
};

export default AnalysisGroup;
