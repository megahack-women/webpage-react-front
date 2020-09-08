import React, { createContext, useState, useContext } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [chatState, setChatState] = useState({
    success: true,
    client: {
      id: '',
      name: "",
      nickname: "",
      cpf: "",
      number_rg: null,
      phone: null,
      date_of_birth: null,
      finance: "",
      informal_worker: true,
      receives_payment: null,
      card_companies: null,
      token_myid: null,
      token_company: null,
      bank_used: null,
      loan_reason: null,
      date_register: "",
      calculators: {
        loan_max: '',
        loan_min: '',
        payment_max: '',
        payment_min: '',
        score_serasa: '',
        finance: "",
      },
      calculators_group: {}
    }
  });

  const [messages, setMessages] = useState([
    {
      received: true,
      text: "Olá!",
    },
  ]);

  const [responses, setResponses] = useState({
    inputs: [],
    buttons: [],
    messages: [],
    radio: [],
    checkbox: [],
    responses: [],
  });

  const resetResponses = () => {
    setResponses({
      inputs: [],
      buttons: [],
      messages: [],
      radio: [],
      checkbox: [],
      responses: [],
    });
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        responses,
        setResponses,
        resetResponses,
        setChatState,
        chatState
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useAuth must be used within a ChatProvider");
  const {
    messages,
    setMessages,
    responses,
    setResponses,
    resetResponses,
    setChatState,
    chatState
  } = context;
  return {
    messages,
    setMessages,
    responses,
    setResponses,
    resetResponses,
    setChatState,
    chatState
  };
};

export default ChatProvider;
