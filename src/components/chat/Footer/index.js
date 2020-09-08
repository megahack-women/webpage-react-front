import React, { useState } from "react";
import { ButtonPrimary } from "../../common/ButtonPrimary/ButtonPrimary";
import { CheckButton } from "../../common/CheckButton/CheckButton";
import { RadioButton } from "../../common/RadioButton/RadioButton";
import Input from "../../common/Input/Input";
import { useChat } from "../../../context/Chat";
import { formatMessage } from "../../../dictionary/config";
import { getMessage } from "../../../services/chat";
import history from "../../../routes/history";
import { postPerson } from "../../../services/analysis";

const TextForm = ({ type, name, state, messageID, setState, handleClick }) => {
  const isEmpty = () => state[name] === "";

  const validValue = () => {
    if (name === 'cpf') {
      return state.cpf.length !== 11
    }
    if (name === 'amount') {
      return state.amount.length > 8 
    }
    return isEmpty()
  }

  return (
    <>
      <Input
        type={type}
        placeholder={formatMessage(messageID)}
        state={state}
        name={name}
        setState={setState}
      />
      <ButtonPrimary
        label="Enviar"
        onClick={handleClick}
        disabled={validValue()}
      />
    </>
  );
};

const CheckboxForm = ({
  checkboxes,
  state,
  name,
  setState,
  handleChange,
  handleClick,
}) => {
  const onClick = (e) => {
    handleChange(e, name);
  };

  return (
    <>
      {checkboxes.length > 0 ? (
        <div>
          <div className="radio-list-container">
            {checkboxes.map((checkbox, index) => (
              <CheckButton
                key={index}
                name={name}
                value={checkbox.label.title}
                state={state}
                setState={setState}
                handlerChange={onClick}
              >
                {checkbox.label.title}
              </CheckButton>
            ))}
          </div>
          <ButtonPrimary label="Enviar" onClick={handleClick} />
        </div>
      ) : null}
    </>
  );
};

const RadioForm = ({
  radios,
  state,
  name,
  setState,
  handleChange,
  handleClick,
}) => {
  const onClick = (e) => {
    handleChange(e, name);
  };

  return (
    <>
      {radios.length > 0 ? (
        <div>
          <div className="radio-list-container">
            {radios.map((radio, index) => (
              <RadioButton
                key={index}
                name={name}
                value={radio.label.title}
                state={state}
                setState={setState}
                handlerChange={onClick}
              >
                {radio.label.title}
              </RadioButton>
            ))}
          </div>
          <ButtonPrimary label="Enviar" onClick={handleClick} />
        </div>
      ) : null}
    </>
  );
};

const ButtonForm = ({ label, value, display, handleClick }) => {
  const onClick = (e) => {
    handleClick(e, display);
  };

  return <ButtonPrimary value={value} label={label} onClick={onClick} />;
};

const ChoiceInputs = ({
  responses,
  state,
  setState,
  handleClick,
  getMessageUpdate,
  handlerChange,
  handleClickButton,
}) => {
  return (
    <>
      {responses.inputs.map((i, index) => (
        <TextForm
          name={i.name}
          key={index}
          messageID={i.placeholder}
          type={i.type}
          state={state}
          setState={setState}
          handleClick={handleClick}
        />
      ))}

      {
        <CheckboxForm
          checkboxes={responses.checkbox}
          setState={setState}
          name={responses.name}
          state={state}
          handleClick={async () => {
            const values = state[responses.name].map((i) => i.value).join(", ");
            getMessageUpdate(values);
          }}
          handleChange={handlerChange}
        />
      }

      {
        <RadioForm
          radios={responses.radio}
          name={responses.name}
          setState={setState}
          state={state}
          handleClick={async () => {
            const values = state[responses.name].map((i) => i.value).join(", ");
            getMessageUpdate(values);
          }}
          handleChange={handlerChange}
        />
      }

      {responses.buttons.map((i, index) => (
        <ButtonForm
          key={index}
          label={i.label.title}
          display={i.display}
          handleClick={handleClickButton}
        />
      ))}
    </>
  );
};

const EndOfQuestions = ({ state }) => {
  const { setChatState } = useChat();
  const adapterState = () => {
    return {
      name: state.name,
      nickname: state.name,
      cpf: state.cpf,
      finance: state.amount,
      informal_worker: "true",
    }
  };

  const onClick = async (e) => {
    const res = await postPerson(adapterState(state));
    setChatState(res);
    history.push("/analysis-page");
  };

  return <ButtonPrimary label="Encerrar analise!" onClick={onClick} />;
};

export const Footer = ({ reference, setHeight, scrollToBottom }) => {
  const {
    messages,
    setMessages,
    responses,
    setResponses,
    resetResponses,
  } = useChat();
  const [endOfQuestions, setEndOfQuestions] = useState(false);
  const [state, setState] = useState({
    name: "",
    activity: "",
    cpf: "",
    amount: "",
    paymentMethods: [],
    paymentMethodForms: [],
    categories: [],
  });

  const replace = (object) => {
    const r = (string) =>
      string
        .replace("{{name}}", state.name)
        .replace("{{amount}}", state.amount)
        .replace("{{activity}}", state.activity)
        .replace("{{cpf}}", state.cpf);
    return object.responses.map((response) => r(response)).pop();
  };

  const getMessageUpdate = (newResponse) => {
    getMessage(responses.next).then((res) => {
      let msgs = [];
      if (res.messages) {
        msgs = res.messages;
      }
      setMessages([
        ...messages,
        { received: false, text: newResponse },
        ...msgs,
      ]);

      if (msgs.length > 0) {
        setHeight(responses.height);
        resetResponses();
        setResponses(res);
        scrollToBottom();
      } else {
        setEndOfQuestions(true);
      }
    });
  };

  const handleClick = async (e) => {
    getMessageUpdate(replace(responses));
  };

  const handleClickButton = (e, label) => {
    const { value, name } = e.target;
    setState({
      [name]: value,
      ...state,
    });
    getMessageUpdate(label);
  };

  const toggleObject = (array, object, callback) => {
    const sArray = JSON.stringify(array);
    const sObject = JSON.stringify(object);
    console.log(sArray, sObject);
    if (!sArray.includes(sObject)) {
      return [...array, object];
    }
    return array.filter((x) => callback(x, object));
  };

  const handlerChange = (e, nameState) => {
    const { name, value } = e.target;
    let result = toggleObject(
      state[nameState],
      { name, value },
      (x, y) => !(x.name === y.name && x.value === y.value)
    );
    setState({ ...state, [nameState]: result });
  };

  return (
    <footer ref={reference} id="footer-chat" className="chat-bot-footer">
      {!endOfQuestions ? (
        <ChoiceInputs
          {...{
            responses,
            state,
            setState,
            handleClick,
            getMessageUpdate,
            handlerChange,
            handleClickButton,
          }}
        />
      ) : (
        <EndOfQuestions {...{ state }} />
      )}
    </footer>
  );
};
