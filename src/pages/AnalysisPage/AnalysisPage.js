import React, { useState } from "react";
import { Card } from "../../components/common/Card/Card";
import "./analysis-page.scss";
import { NavLink } from "react-router-dom";
import PartyPopper from "../../icons/party-popper.png";
import { useChat } from '../../context/Chat'
import LogoDinmais from '../../icons/logo-dinmais.svg';
import LoginMeuIdForm from "../../forms/meuid/LoginMeuId";
import { isEmpty } from "lodash";

const MiniResume = ({ label, values = [] }) => {
  return (
    <div className="mini-resume">
      <strong>{label}</strong>
      <div className="values">
        {values.length < 2 ? (
          <p>R$ {values[0]}</p>
        ) : (
          <>
            <p>
              R$ <span>{values[0]}</span>
            </p>{" "}
            até{" "}
            <p>
              R$ <span>{values[1]}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

const adapterChatState = (state) => {
  return {
    income: [state.client.calculators.finance],
    proposal: ['...'],
    loans: [ state.client.calculators.loan_min, state.client.calculators.loan_max ],
    payments: [ state.client.calculators.payment_max, state.client.calculators.payment_min],
    hasGroup: !isEmpty(state.client.calculators_group),
    gincome: [state.client.calculators_group.finance],
    gproposal: ['...'],
    names: state.client.calculators_group.names,
    gloans: [ state.client.calculators_group.loan_min, state.client.calculators_group.loan_max ],
    gpayments: [ state.client.calculators_group.payment_max, state.client.calculators_group.payment_min],
  }
}

const AnalysisPage = () => {
  const { chatState } = useChat()
  const [ chatValues, ] = useState(adapterChatState(chatState))

  return (
    <>
    <header className="header-dinmais">
      <img src={LogoDinmais} alt="logo" />
      <LoginMeuIdForm />
    </header>

    <div className="container analysis-resume">
      <Card>

        <h1>Sua análise de crédito explicada!</h1>

        <div className="page-container">

          <div className="left">
            <img src={PartyPopper} alt="party popper" />
          </div>

          <div className="right">

            <div className="resume">
              <div>
                <MiniResume label="Sua renda mensal média" values={chatValues.income} />
                <MiniResume label="Seu gasto mensal médio" values={chatValues.proposal} />
              </div>
              <div>
                <MiniResume
                  label="Nós recomendamos empréstimos de"
                  values={chatValues.loans}
                />
                <MiniResume
                  label="Recomendamos parcelas que comprometam de 5% a 20% do seu orçamento em 10x a 24x"
                  values={chatValues.payments}
                />
              </div>
            </div>
            
            <div className="options">
              { !chatValues.hasGroup ? <NavLink className="button primary" to="/detail-income">
                Detalhar mais minhas rendas
              </NavLink> : null }
              <NavLink className="button secondary" to="/credit-proposal">
                Ver propostas de crédito
              </NavLink>
            </div>

            { chatValues.hasGroup ? (
              <div className="persons-resume">
                <h2>Seu grupo com a pessoa que residem com você é composto por:</h2>
                <p>Você{ chatValues.names.map(i=> <>, <span>{i}</span></>)}</p>
              </div>) : null }

            { chatValues.hasGroup ? (<div className="resume">
              <div>
                <MiniResume label="Sua renda mensal média" values={chatValues.gincome} />
                <MiniResume label="Seu gasto mensal médio" values={chatValues.gproposal} />
              </div>
              <div>
                <MiniResume
                  label="Nós recomendamos empréstimos de"
                  values={chatValues.gloans}
                />
                <MiniResume
                  label="Recomendamos parcelas que comprometam de 5% a 20% do seu orçamento em 10x a 24x"
                  values={chatValues.gpayments}
                />
              </div>
              </div>): null 
            }

            { !chatValues.hasGroup ? (<div className="agroupment">
              <strong>
                Para tem mais opções de crédito você pode também fazer uma
                análise de crédto em grupo
              </strong>
              <p>
                No crédito em grupo você define a relação do Grupo, como
                "moradores da mesma residência", "trabalhamos no mesmo ramo" ou
                "objetivo em comum". Assim a soma da renda do grupo pode
                aumentar a chance de conseguir empréstimos mais altos.
              </p>
              <NavLink className="button primary" to="/group-analysis">
                Fazer análise de grupo
              </NavLink></div>) : null }

              { chatValues.hasGroup ? <NavLink className="button secondary" to="/analysis-page">
                Fazer proposta de crédito
              </NavLink> : null }
          </div>
        </div>
      </Card>
    </div>
    </>
  );
};

export default AnalysisPage;
